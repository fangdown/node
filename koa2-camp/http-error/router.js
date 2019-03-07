const router = require('koa-router')()
const HomeController = require('./controller/home')
module.exports = (app) => {
  router.get('/', HomeController.index)
  router.get('/home', HomeController.home)
  router.get('/home/:id/:name', HomeController.homeParams)
  router.get('/user', HomeController.login)
  router.post('/user/register', HomeController.register)
  router.get('/500', HomeController.page500)
  router.get('*', HomeController.page404)
  app.use(router.routes())
    .use(router.allowedMethods())
}


