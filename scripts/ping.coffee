# Description:
#   こんにちは
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   None
#

responses = [
  "わかんない",
  "ふよ〜",
  "なるほどね",
  "そうにゃんか",
  "ほげ〜",
  "にゃんぺろ",
  "むむ",
  "ふつうです"
]

module.exports = (robot) ->
  robot.respond /こんにち(は|わ)/, (msg) ->
    msg.send "こんにちは〜"

  robot.respond /おはよう/, (msg) ->
    msg.send "おはよう"

  robot.respond /こんばん(は|わ)/, (msg) ->
    msg.send "こんばんわ"

  robot.respond /元気/, (msg) ->
    msg.send msg.random responses

  robot.respond /梅雨/, (msg) ->
    msg.send "本格的♂梅雨到来"

  robot.respond /(もくもく|おみくじ)/, (msg) ->
    randnum = 1 + Math.floor(Math.random()*40)
    baseUrl = "http://www.starico-01.com/stamp/detail_5/a141592/"
    # http://hogehoge/012.png
    msg.send baseUrl + ("00" + randnum).slice(-3) + ".png"

