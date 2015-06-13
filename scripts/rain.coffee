# Description
#   今雨が降ってるかどうかを調べる
#
# Commands:
#   降ってる？ - 歌舞伎座に雨が降ってるかどうかを調べる
#   ame me <area> - <area> に雨が降ってるかどうかを調べる
#

module.exports = (robot) ->
  unless process.env.HUBOT_YAHOO_APP_ID?
    robot.logger.warning 'Required HUBOT_YAHOO_APP_ID environment.'
    return

  robot.respond /(降|振)ってる？/, (msg) ->
    getRainfall msg, '139.767985,35.669743'

  robot.respond /(雨|ame( me)?) (.*)/i, (msg) ->
    getCoordinates msg, msg.match[3]

  decideRainfall = (rainfall) ->
    return "降ってないよ :sunny:"           if rainfall <= 0
    return "小雨です :cloud:"               if rainfall <= 1
    return "降ってる :cloud: :sweat_drops:" if rainfall <= 5
    return "ザーザー :umbrella:"            if rainfall <= 10
    return "それなりに"                     if rainfall <= 20
    return "かなり降ってる"                 if rainfall <= 30
    return "はげしい"                       if rainfall <= 50
    return "やばい"                         if rainfall <= 80
    return "死にそう"

  getRainfall = (msg, coordinates) ->
    msg.http('http://weather.olp.yahooapis.jp/v1/place')
      .query({
        appid: process.env.HUBOT_YAHOO_APP_ID
        coordinates: coordinates
        output: 'json'
      })
      .get() (err, res, body) ->
        json = JSON.parse body
        unless json.Feature?
          return msg.send('わかんない')
        rainfall = json.Feature[0].Property.WeatherList.Weather[0].Rainfall
        msg.send decideRainfall rainfall
  
  getCoordinates = (msg, location) ->
    msg.http('https://maps.googleapis.com/maps/api/geocode/json')
      .query({address: location})
      .get() (err, res, body) ->
        json = JSON.parse body
        location = json.results[0].geometry.location
        getRainfall msg, "#{location.lng},#{location.lat}"

