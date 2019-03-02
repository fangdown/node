const Koa = require('koa')
const app = new Koa()


app.use(async (ctx, next) => {
  let stime = new Date().getTime()
  await next()
  let etime = new Date().getTime()
  ctx.response.body = `<h1>hello, world</h1><h4>响应时间${etime - stime}ms</h4>`
})
app.use(async (ctx, next) => {
  console.log('中间件1-start')
  await next()
  console.log('中间件1- end')
})
app.use(async (ctx, next) => {
  console.log('中间件2-start')
  await next()
  console.log('中间件2- end')
})
app.use(async (ctx, next) => {
  console.log('中间件3-start')
  await next()
  console.log('中间件3- end')
})
app.listen(3000, () => {
  console.log('app run at 3000')
})