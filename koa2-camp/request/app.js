const Koa = require('koa')
const Router = require('koa-router')
const Http = require('http')
const Querystring = require('querystring')

const app = new Koa()
const router = new Router()
// 服务端可获取api接口数据
const Service = {
  search: async (kw = '') => {
    return new Promise((resolve, reject) => {
      Http.request({
        hostname: 'apis.juhe.cn',
        path: '/simpleWeather/query?city=' + encodeURI(kw) + '&key=83d18c71b518b4935ede668af54fde79'
      }, (res) => {
        res.setEncoding('utf8')
        let data = []
        res.on('data', chunk => {
          console.log('chunk', chunk)
          data.push(chunk)
        }).on('end', () => {
          // console.log('da', data)
          resolve(data.join(''))
        })
      }).end()
    })
  }
}

router.get('/', async (ctx, next) => {
  let { kw } = ctx.query
  let data = await Service.search(kw)
  // console.log('data' + data)
  ctx.body = 'data:' + data
})

app.use(router.routes())
  .listen(3000, () => {
    console.log('run at 3000')
  })