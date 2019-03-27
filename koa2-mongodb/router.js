const router = require('koa-router')()
const {home, register, allUser} = require('./controller/home')
module.exports = (app) => {
  router.get('/', home)
  router.post('/register', register)
  router.get('/allUser', allUser)
 
  app.use(router.routes())
    .use(router.allowedMethods())
}


