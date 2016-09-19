// Description:
//  ping
//
// Commands:
//  こんにちは
//

module.exports = function(robot) {
  robot.respond(/こんにち(は|わ)/, function(msg) {
    robot.send('こんにちは');
  });
}
