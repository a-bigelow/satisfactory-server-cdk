import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SatisfactoryServer } from "../src";
import { Template } from "aws-cdk-lib/assertions";

describe("SatisfactoryStack", () => {
    test("synthesizes the way we expect", () => {
        const app = new cdk.App();
        const serverStack = new cdk.Stack(app, "TopicsStack");

        new SatisfactoryServer(serverStack, "Topic1", {
            prefix: "SatisfactoryHosting",
            restartApi: false, // TODO implement this during tests so we can validate the code packaging
            useExperimentalBuild: false,
        })

        // Prepare the stack for assertions.
        Template.fromStack(serverStack);
    });
});
