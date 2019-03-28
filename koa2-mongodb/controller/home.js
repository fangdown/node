const { findAllUsers, findUser, addUser, findOneAndDelete, findUserList } = require('../service/home')

const home = async (ctx) => {
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    msg: '这里是nodejs+mongodb编写restfulAPI的笔记！',
    data: null
  }
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
const getUserList = async (ctx) => {
  const username = ctx.request.body.username
  const page = ctx.request.body.page
  const size = ctx.request.body.size
  const res = await findUserList(username, page, size)
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '查询成功',
    data: res
  }
}
// 注册
const register = async (ctx) => {
  const username = ctx.request.body.name
  const password = ctx.request.body.password
  let res = await findUser(username)
  if (res) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      msg: '用户名已经存在',
      data: null
    }
  } else {
    let res = await addUser(username, password)
    if (res) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '创建成功',
        data: null
      }
    }
  }
}
const delUser = async (ctx) => {
  const id = ctx.request.body.id
  try {
    let res = await findOneAndDelete(id)
    console.log('res', res)
    if (res) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '删除成功',
        data: null
      }
    }
  } catch (e) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      msg: '删除失败',
      data: null
    }
  }
}
module.exports = {
  home,
  register,
  findUser,
  allUser,
  delUser,
  getUserList
}