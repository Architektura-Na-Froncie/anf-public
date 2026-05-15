/*
 * Dev server proxy relies on https://github.com/chimurai/http-proxy-middleware
 * which is a middleware for https://github.com/http-party/node-http-proxy
 * The proxy config below itself is a middleware, so there's no way to add yet another middlewares
 * but it's possible from the direct webpack devServer's config
 */
function createProxyConfig() {
  return [
    {
      path: '/api',
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
      secure: false,
      changeOrigin: true,
      proxyTimeout: 1000 * 60 * 5, // response timeout
      timeout: 1000 * 60 * 5, // request timeout
    }
  ];
}

module.exports = {
  createProxyConfig
}
