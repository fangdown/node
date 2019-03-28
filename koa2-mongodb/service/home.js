const User = require('../models/db').User
//用于密码加密
const sha1 = require('sha1')
//createToken
const { createToken } = require('../token/token')
// 查找一个用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
// 查找所有用户
const findAllUsers = async () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
// 添加用户
const addUser = async (username, password) => {
  let user = new User({
    username,
    password: sha1(password),
    token: createToken(this.username)
  })
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err)
      resolve('success')
    })
  })
}
// 删除用户
const findOneAndDelete = async (id) => {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({ _id: id }, (err) => {
      if (err) reject(err)
      resolve('success')
    })
  })
}
/**
 * 查找列表
 * @param {*} username  关键词
 * @param {*} page 页码
 * @param {*} size 每页显示条数
 * 返回总条数，条数
 */
const findUserList = async (username, page = 1, size = 10) => {
  let query = User.find({ username: { $regex: new RegExp(username) } })
  query.skip(Number((page - 1) * size))
  query.limit(Number(size))
  return new Promise((resolve, reject) => {
    query.exec((err, rs) => {
      if (err) {
        reject(err)
      }
      User.find({ username: { $regex: new RegExp(username) } }, (err, res) => {
        if (err) reject(err)
        resolve({
          rows: rs,
          total: res.length
        })
      })
    })
  })
}
module.exports = {
  findUser,
  findAllUsers,
  addUser,
  findOneAndDelete,
  findUserList
}