var through = require('through2');
var split = require('split');

var count = 0;
function transform(buffer, _, next){
	count++;
	if (count % 2 !== 0) {
		this.push(buffer.toString().toLowerCase() + '\n');
		next();
	}
	else {
		this.push(buffer.toString().toUpperCase() + '\n');
		next();
	}
}

process.stdin
.pipe(split())
.pipe(through(transform))
.pipe(process.stdout);