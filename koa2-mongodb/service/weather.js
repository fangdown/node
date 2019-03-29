const axios = require('axios')
const cheerio = require('cheerio')
const Weather = require('../models/db').Weather
const { trim } = require('../utils/index')

// 添加天气
const addWeatherApi = async (createTime) => {
  let data = await getWeather7d()
  let params = {
    data,
    createTime: createTime
  }
  let weather = new Weather(params)
  return new Promise((resolve, reject) => {
    weather.save(err => {
      if (err) reject(err)
      resolve('success')
    })
  })
}

const getWeather7d = async () => {
  return new Promise((resolve, reject) => {
    axios.get('http://www.weather.com.cn/weather/101280601.shtml').then(response => {
      const $ = cheerio.load(response.data)
      const data = []
      $('#7d .t li').each(function () {
        let $this = $(this)
        data.push({
          title: trim($this.find('.sky h1').text()),
          wea: trim($this.find('.sky .wea').text()),
          leg: trim($this.find('.sky .tem span').text()) + '/' + trim($this.find('.sky .tem i').text()),
          win: trim($this.find('.sky .win i').text())
        })
      })
      resolve(data)
    })
  })
}
// 查找一个
const getWeatherApi = (createTime) => {
  return new Promise((resolve, reject) => {
    Weather.findOne({ createTime }, (err, res) => {
      if (err) reject(err)
      console.log('res', res)
      resolve(res)
    })
  })
}
// 查找所有
const getAllWeatherApi = () => {
  return new Promise((resolve, reject) => {
    Weather.find({}, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
// 删除
const deleteWeatherApi = async (createTime, id) => {
  return new Promise((resolve, reject) => {
    Weather.deleteMany({ createTime: createTime }, (err) => {
      if (err) reject(err)
      resolve('success')
    })
  })
}
module.exports = {
  addWeatherApi,
  getWeatherApi,
  getAllWeatherApi,
  deleteWeatherApi
}