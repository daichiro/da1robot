cronJob = require('cron').CronJob

module.exports = (robot) =>
  task = new cronJob('0 0 3 * * 1-5', () ->
    days = countDown
    if (days > 0)
      envelope = room: "bot_test"
      robot.send envelope, days
  )
  task.start()

  countDown = ->
    target = new Date '2015-10-18 00:00:00'
    today = new Date
    diff = target - today
    daySec = 24 * 60 * 60 * 1000
    day = Math.floor (diff / daySec)
