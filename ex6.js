var concat = require('concat-stream');

process.stdin.pipe(concat(function(data){
	process.stdout.write(data.toString().split('').reverse().join('') );
}));