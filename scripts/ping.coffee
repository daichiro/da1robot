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

module.exports = (robot) ->
    robot.respond /こんにちは/i, (msg) ->
        msg.send "こんにちは〜"

