const Koa = require('koa')
const Router = require('koa-router')
const Http = require('http')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.response.body = `
    <link rel ="stylesheet" href="form.css" />
    <form action='/user/login' method='post'>
      <input name="user" type="text" placeholde="请输入用户名" /><br>
      <input name="password" type="password" placeholder="请输入密码" />
      <button type="submit" class="btn">登录</button>
    </form>
  `
})

router.post('/user/login', async (ctx, next) => {
  let { user, password } = ctx.request.body
  console.log('user', user)
  console.log('password', password)
  if (user === 'fangdown' && password === '123456') {
    ctx.response.body = `hello, ${user}`
  } else {
    ctx.response.body = '账户密码不对'
  }
})

app
  .use(bodyParser())
  // .use(static(path.join(__dirname)))
  .use(router.routes())
  .listen(3000, () => {
    console.log('form.js run at 3000')
  })


