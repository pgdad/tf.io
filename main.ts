import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";
import { S3Bucket } from './.gen/modules/s3-bucket';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new S3Bucket(this, id + '-bucket', { providers: [
      new AwsProvider(this, id + '-aws-provider',
      { region: 'us-east-1', stsRegion: 'us-east-1',})
    ]
    });
    new TerraformOutput(this, id + '-var', { value: 'value1' });
  }
}

const app = new App();
const stack = new MyStack(app, "tf-io");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "example-org-fc85b8",
  workspaces: new NamedCloudWorkspace("tf-io")
});
app.synth();
