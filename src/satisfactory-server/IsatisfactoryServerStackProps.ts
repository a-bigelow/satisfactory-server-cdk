import { StackProps } from "aws-cdk-lib";

export default interface IsatisfactoryServerStackProps extends StackProps {
    /**
     * prefix for all resources in this app
     */
    prefix: string;
    /**
     * Whether to create the server restart API.
     */
    restartApi: boolean;
    /**
     * Whether to use the experimental build of Satisfactory.
     * @default - false
     */
    useExperimentalBuild?: boolean;
    /**
     * S3 Bucket to use for backups.
     * @default - A new S3 bucket is automatically created.
     */
    backupBucket?: string;
    /**
     * VPC ID to use for a `Vpc.fromLookup()` call. Only needs to be used if you have an existing VPC that you intend to use for your server.
     * @default - The "Default" Vpc is used. This default behavior will fail if the default VPC has been deleted.
     */
    vpcId?: string;
    /**
     * Specific subnet to use for server placement. Will cause conflict if assigned alongside `availabilityZone` and the two do not match.
     * @default - A random subnet is chosen from the available public subnets.
     */
    subnetId?: string;
    /**
     * Specific subnet to use for server placement. Will cause conflict if assigned alongside `subnetId` and the two do not match.
     * @default - A random AZ is chosen from the available public subnets.
     */
    availabilityZone?: string;
}
