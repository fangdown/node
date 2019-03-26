const router = require('koa-router')()
const HomeController = require('./controller/home')
module.exports = (app) => {
  router.get('/', HomeController.index)
  router.get('/setup', HomeController.setup)
 
  app.use(router.routes())
    .use(router.allowedMethods())
}


