const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VERSION } = require('./src/env');

module.exports = {
  webpack(config, env) {
    // prod, static file
    if (env === 'production') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "analyzer.html",
            reportTitle: () => `anf-app: ${VERSION}`,
          }),
        ],
        // https://webpack.js.org/configuration/performance/
        // rozmiar: parsed, NIE gzipped
        performance: {
          hints: false, // 'warning' | 'error' | false
          maxEntrypointSize: 250000, // entry - sumarycznie wszystkie pliki ładowane przy wejściu na dane entry
        }
      }
    }

    // non-prod
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new BundleAnalyzerPlugin({
          analyzerPort: 8890,
          reportTitle: () => `anf-app: ${VERSION}`,
        }),
      ],
    };
  },
}
