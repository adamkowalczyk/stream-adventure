var crypto = require('crypto');
var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);


var zlib = require('zlib');
var gunzip = zlib.createGunzip();

var tar = require('tar');
var parser = tar.Parse();

var concat = require('concat-stream');


parser.on('entry', function (e) {
	if (e.type !== 'File') {return;}
	var hashStream = crypto.createHash('md5', {encoding: 'hex'});
	e.pipe(hashStream).pipe(concat(function(hash) {
		console.log(hash + ' ' + e.path);
	}));

});

process.stdin
.pipe(decipher)
.pipe(gunzip)
.pipe(parser);