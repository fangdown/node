const moment = require('moment')
const { addWeatherApi, getWeatherApi, getAllWeatherApi, deleteWeatherApi } = require('../service/weather')

const addWeather = async (ctx) => {
  let res = await addWeatherApi();
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '新增成功',
    data: res
  };
}
const getWeather = async (ctx) => {
  const createTime = moment().format('YYYY-MM-DD')
  let res = await getWeatherApi(createTime);
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '查询成功',
    data: res
  };
}
const getAllWeather = async (ctx) => {
  let res = await getAllWeatherApi();
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '查询成功',
    data: res
  };
}
const deleteWeather = async (ctx) => {
  let res = await deleteWeatherApi('2019-03-29');
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: '删除成功',
    data: res
  };
}
module.exports = {
  addWeather,
  getWeather,
  getAllWeather,
  deleteWeather
}