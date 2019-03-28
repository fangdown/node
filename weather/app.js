const axios = require('axios')
const cheerio = require('cheerio')

axios.get('http://www.weather.com.cn/weather/101280601.shtml').then(response => {
  const $ = cheerio.load(response.data)
  const data = []
  console.log('$', $)
  $('#7d .t li').each(function () {
    let $this = $(this)
    data.push({
      title: trim($this.find('.sky h1').text()),
      wea: trim($this.find('.sky .wea').text()),
      leg: trim($this.find('.sky .tem span').text()) + '/' + trim($this.find('.sky .tem i').text()),
      win: trim($this.find('.sky .win i').text())
    })
  })
  function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  console.log('data', data)
})