const moment = require('moment')

var mongoose = require('mongoose'); //引入mongoose依赖
// 线上数据库
// const address = '148.70.216.46'
const address = 'localhost'
mongoose.connect(`mongodb://${address}/xiaochengxu`);

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function () {
  console.log('数据库连接出错！');
});
db.on('open', function () {
  console.log('数据库连接成功！');
});


//声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: { type: Date, default: +Date.now() }
});
const weatherSchema = mongoose.Schema({
  data: Array,
  createTime: { type: String, default: moment().format('YYYY-MM—DD') }
});
//根据schema生成model
const model = {
  User: mongoose.model('User', userSchema),
  Weather: mongoose.model('weatherSchema', weatherSchema)

};
module.exports = model;
