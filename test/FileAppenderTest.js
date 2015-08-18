function l() {
	console.log(arguments[0]);
}


var file_system = require("fs");

var file = undefined;
var config = {
	"file_name": "./out.log",
	"rotation": {
		"enabled": true, // true, false
		"size": 30, // n (bytes), nK, nM, nKib, nMib
		"date": "day", // hour, day, month
		"startup": true //  true, false
	}
}

var fileUtil = {
	"renew": function() {
		if (file == undefined) {
			fileUtil.create();
		} else {
			// check size
			// if size is too much
			//		create new file
		}
	},
	"create": function() {
		l(config.file_name);
		file_system.exists(config.file_name, function(exists) {
			if (exists) {
				file_system.stat(config.file_name, function(err, stats) {
					// bytes
					l(stats.size);
					l(stats.ctime);
				});
			}
		});
	}
}

fileUtil.renew();

/*
     F_OK: 0,
     R_OK: 4,
     W_OK: 2,
     X_OK: 1,
     access: [Function],
     exists: [Function],
     readFile: [Function],
     close: [Function],
     open: [Function],
     read: [Function],
     write: [Function],
     rename: [Function],
     truncate: [Function],
     ftruncate: [Function],
     rmdir: [Function],
     fdatasync: [Function],
     fsync: [Function],
     mkdir: [Function],
     readdir: [Function],
     fstat: [Function],
     lstat: [Function],
     stat: [Function],
     readlink: [Function],
     symlink: [Function],
     link: [Function],
     unlink: [Function],
     fchmod: [Function],
     lchmod: [Function],
     chmod: [Function],
     lchown: [Function],
     fchown: [Function],
     chown: [Function],
     utimes: [Function],
     futimes: [Function],
     writeFile: [Function],
     appendFile: [Function],
     watch: [Function],
     watchFile: [Function],
     unwatchFile: [Function],
     realpath: [Function: realpath],
     // without Sync version
	 createReadStream: [Function],
     createWriteStream: [Function],
*/
