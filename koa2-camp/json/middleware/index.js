const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2') // 模板引擎
const staticFile = require('koa-static') // 静态文件
const miSend = require('./mi-send')

module.exports = app => {
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