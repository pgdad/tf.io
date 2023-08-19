clone https://github.com/pgdad/cdktf-get-all

The above is a fork, the change is that it only generates source for typescript and only for the eks module.
It also has an additional script, run: yarn compmodule

"compmodule": "cat package.json | sed 's/mypackage/mypackage/g' > modules/typescript/package.json && cd modules/typescript && sudo npm link"

In other words, compmodule takes the typescript generated cdktf code and makes it available locally, I did this on ubuntu,
so the 'mypackage' ended up in /usr/lib/node_modules/mypackage (as a link).

Next use this package here in this project.

Then running: npx ts-node main.ts
results in this error:

TSError: ⨯ Unable to compile TypeScript:
mystack.ts:13:7 - error TS2322: Type 'AwsProvider' is not assignable to type 'TerraformProvider | TerraformModuleProvider'.
  Type 'AwsProvider' is not assignable to type 'TerraformProvider'.
    Property 'synthesizeAttributes' is protected but type 'AwsProvider' is not a class derived from 'TerraformProvider'.

13       new AwsProvider(this, id + '-aws-provider',
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
14       { region: 'us-east-1', stsRegion: 'us-east-1',})


I do not know enough typescript (or javascript) to figure this out.
This same setup works if the module code is generated locally (meaning the mystack.ts import the code from .gen rather than the
'generated code from mypackage'.

If I do this same setup in java (i.e. create a java maven package with the generated code, and use that) works like you would expect.
