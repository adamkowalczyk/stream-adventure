var through = require('through2');
var stream = through(write, end);

function write(buffer, encoding, next) {
	var string = buffer.toString();
	this.push(string.toUpperCase() );
	next();
}

function end(done) {
	done();
}

process.stdin.pipe(stream).pipe(process.stdout);