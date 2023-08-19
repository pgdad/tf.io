import { App, CloudBackend, NamedCloudWorkspace } from "cdktf";
import { MyStack } from './mystack';

const app = new App();
const stack = new MyStack(app, "tf-io");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "example-org-fc85b8",
  workspaces: new NamedCloudWorkspace("tf-io")
});
app.synth();
