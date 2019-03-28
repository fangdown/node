const router = require('koa-router')()
const { home, register, allUser, delUser, getUserList } = require('./controller/home')
module.exports = (app) => {
  router.get('/', home)
  router.post('/register', register)
  router.get('/allUser', allUser)
  router.post('/delUser', delUser)
  router.post('/getUserList', getUserList)

  app.use(router.routes())
    .use(router.allowedMethods())
}


