const { createProxyConfig } = require('./proxy-config');

function devServer(configFunction) {
  const config = configFunction();
  config.proxy = createProxyConfig();

  config.setupMiddlewares = (middlewares, devServer) => {
    require('./setup-server')(devServer.app);
    return middlewares;
  }

  return (proxy, allowedHost) => {
    return config;
  }
};

module.exports = {
  devServer
};
