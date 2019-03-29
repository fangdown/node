var schedule = require('node-schedule');
const axios = require('axios')
function scheduleCronstyle () {
  schedule.scheduleJob('1 1 3 * * *', function () {
    axios.get('http://148.70.216.46/weather/add')
  });
}
scheduleCronstyle();