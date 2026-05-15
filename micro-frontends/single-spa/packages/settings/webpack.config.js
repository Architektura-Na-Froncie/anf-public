const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

// config webpackowy dostarczany przez single-spa oznacza wszystkie moduły z namespace'u organizacji
// (u nas @anf-mfe) jako webpack externals
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "anf-mfe",
    projectName: "settings",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
