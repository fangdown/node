var schedule = require('node-schedule');
const axios = require('axios')
function scheduleCronstyle () {
  schedule.scheduleJob('* * 18 * * *', function () {
    axios.post('http://http://148.70.216.46:3000/weather/add')
  });
}
scheduleCronstyle();