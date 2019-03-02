const HomeService = require('../service/home')
module.exports = {
  index: async (ctx) => {
    ctx.response.body = `<h1>index page</h1>`
  },
  home: async (ctx) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = `<h1> home page</h1>`
  },
  homeParams: async (ctx) => {
    console.log(ctx.params)
    ctx.response.body = `<h1> home/:id/:name</h1>`
  },
  login: async (ctx, next) => {
    ctx.response.body =
      `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button type="submit">GoGoGo</button>
      </form>
    `
  },
  register: async (ctx) => {
    console.log('ctx.request.body', ctx.request.body)
    let { name, password } = ctx.request.body
    let data = await HomeService.register(name, password)
    console.log('data', data)
    ctx.response.body = data
  }
}