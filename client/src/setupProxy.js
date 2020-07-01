const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // target: 'https://pacific-coast-97072.herokuapp.com',
      // target: " http://7e6687d4.ngrok.io",
      changeOrigin: true,
    })
  )
}
