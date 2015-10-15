cronJob = require('cron').CronJob

module.exports = (robot) =>
  task = new cronJob('0 0 10 * * 1-5', () ->
    days = countDown()
    if (days >= 0)
      envelope = room: "bot_test"
      robot.send envelope, "ボーナスまであと" + days + "日だよ"
  )
  task.start()

  countDown = () ->
    target = new Date '2015-12-10 10:00:00'
    today = new Date
    diff = target - today
    daySec = 24 * 60 * 60 * 1000
    day = Math.floor (diff / daySec)
