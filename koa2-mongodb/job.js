var schedule = require('node-schedule');
function scheduleCronstyle () {
  schedule.scheduleJob('5 * * * * *', function () {
    console.log('scheduleCronstyle:' + new Date());
  });
}
scheduleCronstyle();
