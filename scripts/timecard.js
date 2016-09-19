// Description:
//
//
// Commands:
//

var moment = require('moment');

module.exports = function(robot) {
  robot.respond(/はじめます/, function(msg) {
      var name = msg.match[1];
      start(name);
  });

  robot.respond(/おわります/, function(msg) {
    var name = msg.match[1];
    end(name);
  });

  robot.respond(/list/i, function(msg) {
    var name = msg.match[1];
    list(name);
  });

  start = function(name) {
    var key = 'start.' + name;
    robot.branin.set(key, moment());
    robot.send('記録をとります');
  }

  end = function(name) {
    var key = 'start.' + name;
    var startTime = robot.brain.get(key);
    if (startTime === undefined) {
      robot.send('作業を開始していなかったよ');
    } else {
      var diff = moment().subtract(startTime).format('h:mm');
      var message = diff + ' 作業したよ';
      robot.send(message);
      save(name, diff);
    }
  }

  save = function(name, mmnt) {
    var key = name + '.' + mmnt.format('YYYY-MM-DD');
    robot.brain.set(key, mmnt.format('h:mm'));
  }

  list = function(name) {
    var today = moment();
    var messages = [];
    for(var i = 0; i < 7; i++) {
      var target = today.subtract(i, 'days').format('YYYY-MM-DD');
      var key = name + '.' + target;
      var value = robot.brain.get(key);
      messages.push(target + ': ' + value);
    }
    var message = messages.join('\n');
    robot.send(message);
  }
}
