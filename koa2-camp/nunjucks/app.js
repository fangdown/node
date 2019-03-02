const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const nunjucks = require('koa-nunjucks-2') // 模板引擎
const app = new Koa()
const router = require('./router')

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))
app.use(bodyParser())
router(app)
app.listen(3000, () => {
  console.log('app  run at port 3000')
})
