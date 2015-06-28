var duplex = require('duplexer2');
var through = require('through2').obj;

module.exports = function(counter) {
	var count = {};
	var input =  through(write, end);

	function write(data, encoding, next) {
		count[data.country] = (count[data.country] || 0) + 1;
		next();
	}

	function end(done) {
		counter.setCounts(count);
		done();
	}

	return duplex(input, counter);
};