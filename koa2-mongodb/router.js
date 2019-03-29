const router = require('koa-router')()
const { home, register, allUser, delUser, getUserList } = require('./controller/home')
const { addWeather, getWeather, getAllWeather, deleteWeather } = require('./controller/weather')
module.exports = (app) => {
  router.get('/', home)
  router.post('/register', register)
  router.get('/allUser', allUser)
  router.post('/delUser', delUser)
  router.post('/getUserList', getUserList)
  router.post('/weather/add', addWeather)
  router.get('/weather/get', getWeather)
  router.get('/weather/all', getAllWeather)
  router.post('/weather/delete', deleteWeather)

  app.use(router.routes())
    .use(router.allowedMethods())
}


