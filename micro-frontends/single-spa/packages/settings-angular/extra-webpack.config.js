const webpack = require('webpack');

const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin');


module.exports = (config, options, target) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // We need polyfills (with zone.js) back
  singleSpaWebpackConfig.entry.polyfills = __dirname + '/src/polyfills.ts';

  // Remove zone.js from externals, otherwise it won't be included in polyfills
  singleSpaWebpackConfig.externals = singleSpaWebpackConfig.externals.filter((entry) => entry !== 'zone.js');

  // Add project namespace to externals, similarly to what webpack-config-single-spa does
  singleSpaWebpackConfig.externals.push(new RegExp(`^@anf-mfe/`));

  // Base href has to be compiled in main.js
  singleSpaWebpackConfig.plugins.push(
    new webpack.DefinePlugin({ 'WEBPACK_APP_BASE_HREF': JSON.stringify(options.baseHref || '/') }),
  );

  // The plugins below require options.index in angular.json to be set to "", otherwise both
  // AngularWebpackPlugin and HtmlWebpackPlugin will try to write to index.html.
  singleSpaWebpackConfig.plugins.push(
    new HtmlWebpackPlugin({ scriptLoading: 'blocking' }),
    new StandaloneSingleSpaPlugin({
      // required
      appOrParcelName: "settings-angular",

      // optional - useful for enabling cross-microfrontend imports
      // importMapUrl: new URL("https://my-cdn.com/importmap.json"),

      // optional - useful for adding an additional, local-only import map
      importMap: {
        imports: {
          "@anf-mfe/pubsub": "//localhost:9004/anf-mfe-pubsub.js",
        },
      },

      // optional - you can disable the plugin by passing in this boolean
      disabled: target.configuration !== 'standalone',

      // optional - the standalone plugin relies on optionalDependencies in the
      // package.json. If this doesn't work for you, pass in your HtmlWebpackPlugin
      // to ensure the correct one is being referenced
      HtmlWebpackPlugin,

      // optional - defaults to true - turns on or off import-map-overrides.
      importMapOverrides: true,

      // optional - defaults to null. This allows you to hide the import-map-overrides UI
      // unless a local storage key is set. See more info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/ui.md#enabling-the-ui
      importMapOverridesLocalStorageKey: null,

      // optional - defaults to turning urlRerouteOnly on
      // The options object passed into single-spa's start() function.
      // See https://single-spa.js.org/docs/api#start
      startOptions: {
        urlRerouteOnly: true
      }
    }),
  );

  return singleSpaWebpackConfig;
};
