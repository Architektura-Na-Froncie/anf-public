const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;

const buildDate = new Date().toLocaleString();

module.exports = function override(config, env) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new ModuleFederationPlugin({
        name: "shell",
        remotes: {
          "@anf-mfe/employees": "employees@http://localhost:3041/remoteEntry.js",
          "@anf-mfe/settings": "settings@http://localhost:3042/remoteEntry.js",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
    ]
  };
}
