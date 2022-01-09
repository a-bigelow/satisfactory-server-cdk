import { EC2Client, StartInstancesCommand, StartInstancesCommandOutput } from '@aws-sdk/client-ec2';

const instanceId = process.env.INSTANCE_ID
const client = new EC2Client({ region: process.env.AWS_REGION });
const command = new StartInstancesCommand({ InstanceIds: [instanceId!] });

exports.handler = async function (event: any) {

    console.log(`Received event: ${event}`)

    console.log("Attempting to start game server", instanceId);

    return client.send(command)
        .then((res: StartInstancesCommandOutput) => {
            console.log(JSON.stringify(res));
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/json" },
                body: JSON.stringify({ message: "Started satisfactory server", response: JSON.stringify(res) })
            }
        })
        .catch((err: any) => {
            console.log(JSON.stringify(err));
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/json" },
                body: JSON.stringify({ message: "Failed to start satisfactory server", response: JSON.stringify(err) })
            }
        });
}