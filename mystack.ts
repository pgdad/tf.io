import { Construct } from "constructs";
import { TerraformOutput, TerraformStack } from "cdktf";
import { Eks } from 'mypackage/modules/eks';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

export class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new Eks(this, id + '-eks', { providers: [
      //this.createProvider(id + '-aws-provider'),
      new AwsProvider(this, id + '-aws-provider',
      { region: 'us-east-1', stsRegion: 'us-east-1',})
    ]
    });
    new TerraformOutput(this, id + '-var', { value: 'value1' });
  }
}
