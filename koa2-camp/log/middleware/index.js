const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2') // 模板引擎
const staticFile = require('koa-static') // 静态文件
const ip = require('ip')
const miSend = require('./mi-send')
// 引入日志中间件
const miLog = require('./mi-log')
// const miLog = require('./mi-log/logger')
module.exports = app => {
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-fangdown',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(staticFile(path.resolve(__dirname, '../public')))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }))
  app.use(bodyParser())
  app.use(miSend())
}