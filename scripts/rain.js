// Description:
//  今雨が降っているか調べる
//
// Commands:
//  降ってる？ - 歌舞伎座に雨が降っているかどうかを調べる
//  ame me <area> - <area> に雨が降っているかどうかを調べる
//

module.exports = function(robot) {
  if(!process.env.HUBOT_YAHOO_APP_ID) {
    robot.logger.warning("Required HUBOT_YAHOO_APP_ID environment.");
    return;
  }

  robot.respond(/(降|振)ってる(\?|？)/, function(msg) {
    getRainfall(msg, '139.767985,35.669743');
    getImage(msg);
  })

  robot.respond(/(雨|ame( me)?) (.*)/i, function(msg) {
    getCoordinates(msg, msg.match[3]);
  });

  decideRainfall = function(rainfall) {
    if (rainfall <= 0) {
      return "降ってないよ :cloud:";
    } else if (rainfall <= 1) {
      return "小雨です :cloud:";
    } else if (rainfall <= 5) {
      return "降ってる :cloud: :sweat_drops:";
    } else if (rainfall <= 10) {
      return "ザーザー :umbrella:";
    } else if (rainfall <= 20) {
      return "それなりに :umbrella::sweat_drops:";
    } else if (rainfall <= 30) {
      return "かなり降ってる :umbrella: :umbrella:";
    } else if (rainfall <= 50) {
      return "はげしい :zap: :umbrella:";
    } else if (rainfall <= 80) {
      return "やばい :zap: :japanese_goblin: :zap:";
    } else {
      return "死にそう";
    }
  }

  getRainfall = function(msg, coordinates) {
    msg.http("http://weather.olp.yahooapis.jp/v1/place")
      .query({
        appid: process.env.HUBOT_YAHOO_APP_ID,
        coordinates: coordinates,
        output: 'json'
      })
      .get()(function(err, res, body) {
        if (err) {
          msg.send("だめでした");
          return;
        }
        var json = JSON.parse(body);
        var rainfall = json.Feature[0].Property.WeatherList.Weather[0].Rainfall;
        if (rainfall === undefined) {
          msg.send("わかんない");
          return;
        }
        msg.send(decideRainfall(rainfall));
        var forecast = json.Feature[0].Property.WeatherList.Weather[6].Rainfall;
        if (forecast === undefined) {
          return;
        }
        msg.send("1時間後は" + decideRainfall(forecast));
      });
  }

  getCoordinates = function(msg, location) {
    msg.http('https://maps.googleapis.com/maps/api/geocode/json')
      .query({address: location})
      .get(function(err, res, body) {
        var json = JSON.parse(body);
        if (err) {
          msg.send("だめでした");
          return;
        }
        if (json.status == "ZERO_RESULTS") {
          msg.send("どこだろう");
          return;
        }
        var location = json.results[0].geometry.location;
        getRainfall(msg, "#{location.lng},#{location.lat}");
      });
  }

  getImage = function(msg) {
    var base = "http://img.weather.c.yimg.jp/weather/zoomradar/img.png?lat=35.67146993521358&lon=139.8131925548817&z=12";
    var date = new Date();
    var hours = date.getHours();
    date.setHours(hours + 9);
    var yyyy = date.getFullYear();
    var mm = ("0" + (date.getMonth()+1)).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    var hh = ("0" + date.getHours()).slice(-2);
    var mi = ("0" + date.getMinutes()).slice(-2);
    var dateString = yyyy + mm + dd + hh + mi;
    var urlString = base + "&t=" + dateString;
    msg.send(urlString);
  }
}
