var mongoose = require('mongoose'); //引入mongoose依赖

mongoose.connect('mongodb://localhost/vue-login');
 
let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
 
db.on('error', function(){
  console.log('数据库连接出错！');
});
db.on('open', function(){
  console.log('数据库连接成功！');
});


//声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: {type: Date, default: +Date.now()}
});
//根据schema生成model
const User = mongoose.model('User', userSchema)
module.exports = User;
