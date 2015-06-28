var trumpet = require('trumpet');
var tr = trumpet();
var through = require('through2');

function transform(data, encoding, next) {
	this.push(data.toString().toUpperCase());
	next();
}


process.stdin.pipe(tr).pipe(process.stdout);

var html = tr.select('.loud').createStream();
html.pipe(through(transform)).pipe(html);
