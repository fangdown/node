const moment = require('moment')
const { addWeatherApi, getWeatherApi, getAllWeatherApi, deleteWeatherApi } = require('../service/weather')

const addWeather = async (ctx) => {
  const createTime = moment().format('YYYY-MM-DD')
  let res = await addWeatherApi(createTime);
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
  const createTime = ctx.request.body.createTime
  const id = ctx.request.body.id
  let res = await deleteWeatherApi(createTime, id);
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