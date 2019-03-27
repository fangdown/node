const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2') // 模板引擎
const staticFile = require('koa-static') // 静态文件
const ip = require('ip')
const miSend = require('./mi-send')
const miHttpError = require('./mi-http-error')
// 引入日志中间件
const miLog = require('./mi-log')
// const miLog = require('./mi-log/logger')
module.exports = app => {
  // app.use(miHttpError({
  //   errorPageFolder: path.resolve(__dirname, '../errorPage')
  // }))
  // app.use(miLog({
  //   env: app.env,  // koa 提供的环境变量
  //   projectName: 'koa2-fangdown',
  //   appLogLevel: 'debug',
  //   dir: 'logs',
  //   serverIp: ip.address()
  // }))
  app.use(bodyParser())
  app.use(miSend())
  // 增加错误的监听处理
  // app.on("error", (err, ctx) => {
  //   console.log('ctx.status', ctx.status)
  //   if (ctx && !ctx.headerSent && ctx.status < 500) {
  //     ctx.status = 500
  //   }
  //   if (ctx && ctx.log && ctx.log.error) {
  //     if (!ctx.state.logged) {
  //       ctx.log.error(err.stack)
  //     }
  //   }
  // })
}