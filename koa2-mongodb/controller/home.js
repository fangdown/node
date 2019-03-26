const HomeService = require('../service/home')
const User = require('../models/user')
module.exports = {
  index: async (ctx) => {
    await ctx.render("home/index", { title: "fangdown欢迎您" })
    ctx.send({
      data: '这里是nodejs+mongodb编写restfulAPI的笔记！'
    })
  },
  setup: async (ctx) => {
    console.log('-----setup')
    //创建一个管理员
    var admin = new User({
      name: 'fangdown',
      password: '12345',
      admin: true
    })
    console.log('-----admin', admin)
    //加入数据库，并判断是否成功
    admin.save(function (err) {
      console.log('-----save')
      ctx.response.status = 200
      ctx.status = 200
      if (err) {
        ctx.send({
          success: false,
          message: '管理员创建失败'
        });
      }
      ctx.send({ success: true, message: "管理员创建成功" })
    })          
  }
}