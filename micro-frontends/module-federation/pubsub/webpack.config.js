const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 3043,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "@anf-mfe/pubsub",
      library: { type: "var", name: "anf_mfe_pubsub" },
      filename: "remoteEntry.js",
      exposes: {
        ".": "./src",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};
