# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### SatisfactoryServer <a name="satisfactory-server-cdk.SatisfactoryServer" id="satisfactoryservercdksatisfactoryserver"></a>

Represents a fully featured Satisfactory server deployment.

#### Initializers <a name="satisfactory-server-cdk.SatisfactoryServer.Initializer" id="satisfactoryservercdksatisfactoryserverinitializer"></a>

```typescript
import { SatisfactoryServer } from 'satisfactory-server-cdk'

new SatisfactoryServer(scope: Construct, id: string, props: SatisfactoryServerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#satisfactoryservercdksatisfactoryserverparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#satisfactoryservercdksatisfactoryserverparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#satisfactoryservercdksatisfactoryserverparameterprops)<span title="Required">*</span> | [`satisfactory-server-cdk.SatisfactoryServerProps`](#satisfactory-server-cdk.SatisfactoryServerProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServer.parameter.scope" id="satisfactoryservercdksatisfactoryserverparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServer.parameter.id" id="satisfactoryservercdksatisfactoryserverparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServer.parameter.props" id="satisfactoryservercdksatisfactoryserverparameterprops"></a>

- *Type:* [`satisfactory-server-cdk.SatisfactoryServerProps`](#satisfactory-server-cdk.SatisfactoryServerProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`server`](#satisfactoryservercdksatisfactoryserverpropertyserver)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.Instance`](#aws-cdk-lib.aws_ec2.Instance) | *No description.* |
| [`vpc`](#satisfactoryservercdksatisfactoryserverpropertyvpc)<span title="Required">*</span> | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |

---

##### `server`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServer.property.server" id="satisfactoryservercdksatisfactoryserverpropertyserver"></a>

```typescript
public readonly server: Instance;
```

- *Type:* [`aws-cdk-lib.aws_ec2.Instance`](#aws-cdk-lib.aws_ec2.Instance)

---

##### `vpc`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServer.property.vpc" id="satisfactoryservercdksatisfactoryserverpropertyvpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---


## Structs <a name="Structs" id="structs"></a>

### SatisfactoryServerProps <a name="satisfactory-server-cdk.SatisfactoryServerProps" id="satisfactoryservercdksatisfactoryserverprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { SatisfactoryServerProps } from 'satisfactory-server-cdk'

const satisfactoryServerProps: SatisfactoryServerProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`prefix`](#satisfactoryservercdksatisfactoryserverpropspropertyprefix)<span title="Required">*</span> | `string` | prefix for all resources in this app. |
| [`restartApi`](#satisfactoryservercdksatisfactoryserverpropspropertyrestartapi)<span title="Required">*</span> | `boolean` | Whether to create the server restart API. |
| [`availabilityZone`](#satisfactoryservercdksatisfactoryserverpropspropertyavailabilityzone) | `string` | Specific subnet to use for server placement. |
| [`backupBucket`](#satisfactoryservercdksatisfactoryserverpropspropertybackupbucket) | `string` | S3 Bucket to use for backups. |
| [`subnetId`](#satisfactoryservercdksatisfactoryserverpropspropertysubnetid) | `string` | Specific subnet to use for server placement. |
| [`useExperimentalBuild`](#satisfactoryservercdksatisfactoryserverpropspropertyuseexperimentalbuild) | `boolean` | Whether to use the experimental build of Satisfactory. |
| [`vpcId`](#satisfactoryservercdksatisfactoryserverpropspropertyvpcid) | `string` | VPC ID to use for a `Vpc.fromLookup()` call. Only needs to be used if you have an existing VPC that you intend to use for your server. |

---

##### `prefix`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.prefix" id="satisfactoryservercdksatisfactoryserverpropspropertyprefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* `string`

prefix for all resources in this app.

---

##### `restartApi`<sup>Required</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.restartApi" id="satisfactoryservercdksatisfactoryserverpropspropertyrestartapi"></a>

```typescript
public readonly restartApi: boolean;
```

- *Type:* `boolean`

Whether to create the server restart API.

---

##### `availabilityZone`<sup>Optional</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.availabilityZone" id="satisfactoryservercdksatisfactoryserverpropspropertyavailabilityzone"></a>

```typescript
public readonly availabilityZone: string;
```

- *Type:* `string`
- *Default:* A random AZ is chosen from the available public subnets.

Specific subnet to use for server placement.

Will cause conflict if assigned alongside `subnetId` and the two do not match.

---

##### `backupBucket`<sup>Optional</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.backupBucket" id="satisfactoryservercdksatisfactoryserverpropspropertybackupbucket"></a>

```typescript
public readonly backupBucket: string;
```

- *Type:* `string`
- *Default:* A new S3 bucket is automatically created.

S3 Bucket to use for backups.

---

##### `subnetId`<sup>Optional</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.subnetId" id="satisfactoryservercdksatisfactoryserverpropspropertysubnetid"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* `string`
- *Default:* A random subnet is chosen from the available public subnets.

Specific subnet to use for server placement.

Will cause conflict if assigned alongside `availabilityZone` and the two do not match.

---

##### `useExperimentalBuild`<sup>Optional</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.useExperimentalBuild" id="satisfactoryservercdksatisfactoryserverpropspropertyuseexperimentalbuild"></a>

```typescript
public readonly useExperimentalBuild: boolean;
```

- *Type:* `boolean`
- *Default:* false

Whether to use the experimental build of Satisfactory.

---

##### `vpcId`<sup>Optional</sup> <a name="satisfactory-server-cdk.SatisfactoryServerProps.property.vpcId" id="satisfactoryservercdksatisfactoryserverpropspropertyvpcid"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* `string`
- *Default:* A fresh public-only VPC is created.

VPC ID to use for a `Vpc.fromLookup()` call. Only needs to be used if you have an existing VPC that you intend to use for your server.

---



