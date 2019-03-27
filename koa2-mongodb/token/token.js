const jwt = require('jsonwebtoken');

//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
const token = {
  //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
  createToken: function(user_id){
      const token = jwt.sign({user_id: user_id}, 'fangdown', {expiresIn: '60s'});
      return token;
    },
    checkToken: async function(ctx, next){
      const authorization = ctx.get('Authorization');
      if (authorization === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization');
      }
      const token = authorization.split(' ')[1];
      let tokenContent;
      try {
        tokenContent = await jwt.verify(token, 'fangdown');     //如果token过期或验证失败，将抛出错误
      } catch (err) {
        ctx.throw(401, 'invalid token');
      }
      await next();
    }
}
module.exports = token