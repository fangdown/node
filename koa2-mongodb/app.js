const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
app.use(bodyParser())
router(app)
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '8888'
app.listen(PORT, () => {
  console.log(`app run at ${HOST}:${PORT}`)
})
