var zlib = require('zlib');
var combine = require('stream-combiner');
var split = require('split');
var throguh = require('through2');

module.exports = function() {
	var sort = throguh(write, end);
	var outputLine;

	function write(data, encoding, next) {
		if (data.length === 0 ) { return next(); }

		var line = JSON.parse(data);

		if (line.type === 'genre') {
			if (outputLine) {
				this.push(JSON.stringify(outputLine) + '\n' );
			}
			outputLine = {name: line.name, books: []};
		}
		else if (line.type === 'book') {
			outputLine.books.push(line.name);
		}
		next();
	}

	function end(done) {
		if (outputLine) {
				this.push(JSON.stringify(outputLine) + '\n' );
			}
		done();
	}

	return combine( split(), sort, zlib.createGzip() );
};