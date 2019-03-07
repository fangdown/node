const Path = require('path')
const nunjucks = require('nunjucks')

module.exports = (opts = {}) => {
  // 增加环境变量，用来传入到视图中，方便调试
  const env = opts.env || process.env.NODE_ENV || 'development'

  const folder = opts.errorPageFolder
  const templatePath = Path.resolve(__dirname, './error.html')
  let fileName = 'other'
  return async (ctx, next) => {
    try {
      await next()
      /**
        * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
        */
      console.log('next')
      if (ctx.response.status === 404 && !ctx.response.body) {
        console.log('next22')

        ctx.throw(404)
      }
    } catch (e) {
      console.log('status', status)
      let status = parseInt(e.status)
      const message = e.message
      if (status > 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            fileName = status
            break;
          default:
            fileName = 'other'
        }
      } else {
        status = 500
        fileName = status
      }
      const filePath = folder ? Path.join(folder, `${fileName}.html`) : templatePath
      console.log('filePath', filePath)
      // 渲染对应错误类型的视图，并传入参数对象
      try {
        // 指定视图目录
        nunjucks.configure(folder ? folder : __dirname)
        const data = await nunjucks.render(filePath, {
          env: env, // 指定当前环境参数
          status: e.status || e.message, // 如果错误信息中没有 status，就显示为 message
          error: e.message, // 错误信息
          stack: e.stack // 错误的堆栈信息
        })
        // 赋值给响应体
        ctx.status = status
        ctx.body = data
      } catch (e) {
        // 如果中间件存在错误异常，直接抛出信息，由其他中间件处理
        ctx.throw(500, `错误页渲染失败:${e.message}`)
      }
    }
  }
}