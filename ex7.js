var through = require('through2');
var http = require('http');
var fs = require('fs');


function tr(data, encoding, next) {
	this.push(data.toString().toUpperCase() );
	next();
}

var server = http.createServer(function (req, res) {
	req.pipe(through(tr)).pipe(res);
	// res.on('data', function(data){
	// 	res.send(data+'\n');
	// });
	// res.on('end', function(){
	// 	res.end();
	// });
});

server.listen(process.argv[2]);