const HomeService = require('../service/home')
module.exports = {
  index: async (ctx) => {
    await ctx.render("home/index", { title: "fangdown欢迎您" })
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
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name, password)
    if (res.status == "-1") {
      await ctx.render("home/login", res.data)
    } else {
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}