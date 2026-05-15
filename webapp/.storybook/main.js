const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  staticDirs: [
    "../public",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // When rendering Controls addon omit props inherited from external libraries,(e.g. styled-components)
        const skilPropsWithName = ["as", "forwardedAs", "theme", "ref"];
        if (skilPropsWithName.includes(prop.name)) {
          return false;
        }
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config

    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    config.plugins.push(new NodePolyfillPlugin());

    return config;
  },
}
