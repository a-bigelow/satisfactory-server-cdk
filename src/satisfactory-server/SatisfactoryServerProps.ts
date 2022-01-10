export interface SatisfactoryServerProps {
    /**
     * prefix for all resources in this app
     */
    readonly prefix: string;
    /**
     * Whether to create the server restart API.
     */
    readonly restartApi: boolean;
    /**
     * Whether to use the experimental build of Satisfactory.
     * @default - false
     */
    readonly useExperimentalBuild?: boolean;
    /**
     * S3 Bucket to use for backups.
     * @default - A new S3 bucket is automatically created.
     */
    readonly backupBucket?: string;
    /**
     * VPC ID to use for a `Vpc.fromLookup()` call. Only needs to be used if you have an existing VPC that you intend to use for your server.
     * @default - A fresh public-only VPC is created.
     */
    readonly vpcId?: string;
    /**
     * Specific subnet to use for server placement. Will cause conflict if assigned alongside `availabilityZone` and the two do not match.
     * @default - A random subnet is chosen from the available public subnets.
     */
    readonly subnetId?: string;
    /**
     * Specific subnet to use for server placement. Will cause conflict if assigned alongside `subnetId` and the two do not match.
     * @default - A random AZ is chosen from the available public subnets.
     */
    readonly availabilityZone?: string;
}
