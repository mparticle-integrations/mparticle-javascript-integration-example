import base from "./node_modules/@mparticle/web-kit-wrapper/rollup.base";

const { ENVIRONMENT } = process.env;

const productionBuilds = {
  iife: {
    input: base.production.input,
    output: {
      ...base.production.output,
      format: "iife",
      file: "dist/NAMEOFKIT-Kit.iife.js",
      // name should be in the format mpNAMEOFKIT
      name: "mpNAMEOFKITKit"
    },
    plugins: [...base.production.plugins]
  },
  cjs: {
    input: base.production.input,
    output: {
      ...base.production.output,
      format: "cjs",
      file: "dist/NAMEOFKIT-Kit.common.js",
      // name should be in the format mpNAMEOFKIT
      name: "mpNAMEOFKITKit"
    },
    plugins: [...base.production.plugins]
  }
};

const testEndToEndBuild = {
  testEndToEnd: {
    input: base.testEndToEnd.input,
    output: {
      ...base.testEndToEnd.output,
      format: "iife",
      file: "test/end-to-end-testapp/build/compilation.js",
      name: "mpEndToEndTests"
    },
    plugins: [...base.testEndToEnd.plugins]
  }
};

let selectedBuilds = [];
if (ENVIRONMENT === "production") {
  selectedBuilds.push(productionBuilds.iife, productionBuilds.cjs);
} else if (ENVIRONMENT === "testEndToEnd") {
  selectedBuilds.push(testEndToEndBuild);
}

export default selectedBuilds;
