import { Duration, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import {
    BlockDeviceVolume,
    EbsDeviceVolumeType,
    Instance,
    InstanceType,
    IVpc,
    MachineImage,
    Peer,
    Port,
    SecurityGroup,
    Subnet,
    SubnetType,
    Vpc,
} from "aws-cdk-lib/aws-ec2";
import { ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import returnSatisfactoryUserData from "./returnSatisfactoryUserData";
import IsatisfactoryServerStackProps from "./IsatisfactoryServerStackProps";

/**
 * Represents a fully featured Satisfactory server deployment.
 * @experimental
 */
export class SatisfactoryServer extends Construct {
    public vpc: IVpc;
    public server: Instance;

    constructor(scope: Construct, id: string, props: IsatisfactoryServerStackProps) {
        super(scope, id);

        // prefix for all resources in this stack
        const prefix = props.prefix;

        //////////////////////////////////////////
        // Configure server, network and security
        //////////////////////////////////////////

        this.vpc = props.vpcId
            ? Vpc.fromLookup(this, "importedVpc", { vpcId: props.vpcId })
            : Vpc.fromLookup(this, "defaultVpc", { isDefault: true });

        const vpcSubnets =
            props.subnetId && props.availabilityZone
                ? {
                      subnets: [
                          Subnet.fromSubnetAttributes(this, `${prefix}ServerSubnet`, {
                              availabilityZone: props.availabilityZone,
                              subnetId: props.subnetId,
                          }),
                      ],
                  }
                : { subnetType: SubnetType.PUBLIC };

        // configure security group to allow ingress access to game ports
        const securityGroup = new SecurityGroup(this, `${prefix}ServerSecurityGroup`, {
            vpc: this.vpc,
            description: "Allow Satisfactory client to connect to server",
        });

        securityGroup.addIngressRule(Peer.anyIpv4(), Port.udp(7777), "Game port");
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.udp(15000), "Beacon port");
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.udp(15777), "Query port");

        this.server = new Instance(this, `${prefix}Server`, {
            // 2 vCPU, 8 GB RAM should be enough for most factories
            instanceType: new InstanceType("m5a.large"),
            // get exact ami from parameter exported by canonical
            // https://discourse.ubuntu.com/t/finding-ubuntu-images-with-the-aws-ssm-parameter-store/15507
            machineImage: MachineImage.fromSsmParameter(
                "/aws/service/canonical/ubuntu/server/20.04/stable/current/amd64/hvm/ebs-gp2/ami-id"
            ),
            // storage for steam, satisfactory and save files
            blockDevices: [
                {
                    deviceName: "/dev/sda1",
                    volume: BlockDeviceVolume.ebs(15, { volumeType: EbsDeviceVolumeType.GP3 }),
                },
            ],
            // server needs a public ip to allow connections
            vpcSubnets,
            userDataCausesReplacement: true,
            vpc: this.vpc,
            securityGroup,
        });

        // Add Base SSM Permissions, so we can use AWS Session Manager to connect to our server, rather than external SSH.
        this.server.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"));

        //////////////////////////////
        // Configure save bucket
        //////////////////////////////

        // allow server to read and write save files to and from save bucket
        const savesBucket = props.backupBucket
            ? Bucket.fromBucketName(this, `${prefix}SavesBucket`, props.backupBucket)
            : new Bucket(this, `${prefix}SavesBucket`);
        savesBucket.grantReadWrite(this.server.role);

        //////////////////////////////
        // Configure instance startup
        //////////////////////////////

        // add aws cli
        // needed to download install script asset and
        // perform backups to s3
        this.server.userData.addCommands("sudo apt-get install unzip -y");
        this.server.userData.addCommands(
            'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install'
        );
        this.server.userData.addCommands(returnSatisfactoryUserData());

        //////////////////////////////
        // Add api to start server
        //////////////////////////////

        if (props.restartApi) {
            const startServerLambda = new NodejsFunction(this, `${prefix}StartServerLambda`, {
                entry: "./server-hosting/lambda/index.ts",
                description: "Restart game server",
                timeout: Duration.seconds(10),
                environment: {
                    INSTANCE_ID: this.server.instanceId,
                },
            });

            startServerLambda.addToRolePolicy(
                new PolicyStatement({
                    actions: ["ec2:StartInstances"],
                    resources: [`arn:aws:ec2:*:${Stack.of(this).account}:instance/${this.server.instanceId}`],
                })
            );

            new LambdaRestApi(this, `${prefix}StartServerApi`, {
                handler: startServerLambda,
                description: "Trigger lambda function to start server",
            });
        }
    }
}
