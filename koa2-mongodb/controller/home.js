const HomeService = require('../service/home')
const User = require('../models/db').User
//用于密码加密
const sha1 = require('sha1')
//createToken
const { createToken } = require('../token/token')
const home = async (ctx) => {
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    msg: '这里是nodejs+mongodb编写restfulAPI的笔记！',
    data: null
  }
}
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
const findAllUsers = async () => {
  return  new Promise((resolve, reject) => {
    User.find({ }, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
const allUser = async (ctx) => {
  let res = await findAllUsers();
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '成功',
    data: res
  };
}
const register = async (ctx) => {
  let user = new User({
    username: ctx.request.body.name,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username)
  })
  let res = await findUser(user.username)
  if (res) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      msg: '用户名已经存在',
      data: null
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save(err => {
        if (err) reject(err)
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '创建成功',
      data: null
    }
  }
}

module.exports = {
  home,
  register,
  findUser,
  allUser
}