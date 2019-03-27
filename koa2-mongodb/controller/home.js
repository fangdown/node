const HomeService = require('../service/home')
const User = require('../models/user')
module.exports = {
  index: async (ctx) => {
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      msg: '这里是nodejs+mongodb编写restfulAPI的笔记！',
      data: null
    }
  },
  setup: async (ctx) => {
    try {
      console.log('-----setup')
      //创建一个管理员
      var admin = new User({
        username: 'fangdown',
        password: '12345',
        token: ''
      })
      const res = await admin.save()
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: res
      }
    } catch (err) {
      console.log('err', err)
      ctx.body = {
        code: -1,
        msg: '添加失败',
        data: null
      }
    }

  }
}