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
    await ctx.render('home/login', {
      btnName: '登录'
    })
  },
  register: async (ctx) => {
    console.log('ctx.request.body', ctx.request.body)
    let { name, password } = ctx.request.body
    let data = await HomeService.register(name, password)
    console.log('data', data)
    ctx.response.body = data
  }
}