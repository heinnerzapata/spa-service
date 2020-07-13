const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/cmms-gateway-ms/*",
    createProxyMiddleware({
      target: "https://api.dev.vol7er.com",
      changeOrigin: false,
    })
  );
};
