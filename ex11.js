var duplex = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
	var cp = spawn(cmd, args);
	return duplex(cp.stdin, cp.stdout);
};