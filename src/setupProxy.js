const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://cms.at-com.vn',
      changeOrigin: true,
    })
  );
};
