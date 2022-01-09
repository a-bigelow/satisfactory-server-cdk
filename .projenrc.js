const { awscdk } = require("projen");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Adam Bigelow",
  authorAddress: "adam@adambigelow.com",
  cdkVersion: "2.4.0",
  defaultReleaseBranch: "main",
  name: "satisfactory-server-cdk",
  repositoryUrl: "https://github.com/a-bigelow/satisfactory-server-cdk.git",
  eslint: false,
  prettier: true,
  prettierOptions: {
    settings: {
      useTabs: true,
      tabWidth: 4,
      printWidth: 120,
    },
  },
  release: false,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.setScript('format', 'prettier -w "src/**/*.ts"');
project.synth();
