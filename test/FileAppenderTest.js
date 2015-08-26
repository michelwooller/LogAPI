var FileAppender = require("../appender/FileAppender.js");
var PrintPattern = require("../PrintPattern.js");
var Record = require("../Record.js");
var Level = require("../Level.js");
var FileSystem = require("fs");
var Path = require('path');

var print = console.log;
var assert = console.assert;

print("\n########################################################################");
print(" LOG-API: logger tests");
print("########################################################################\n\n");

var print_pattern = new PrintPattern("{out}"),
file = null,
config = {
	"file": {
		"path": "test/logs",
		"name": "out.log"
	},
	"rotation" : {
		"size" : 100, // kib mib gib, k, m, g (max file size - default bytes)
		"time" : 60, // m, h, d (max file duration - default seconds)		
	}
};

var file_abs_path = Path.normalize(Path.join(config.file.path, config.file.name));

function removeFile(full_path){
	if (FileSystem.existsSync(full_path)) {
		FileSystem.unlinkSync(full_path);
	}
}

function writeLog(msg){
	var record = new Record("test.logger", Level.trace, msg);
	var file_appender = new FileAppender("FileAppenderName", print_pattern, config);
	file_appender.write(record);	
}

/* validate the file content */
removeFile(file_abs_path);
writeLog("message");

FileSystem.readFile(file_abs_path, "utf8", function(e, data) {
	if (e) {
		throw e;
	} else {
		assert("message" === data.trim(), "should be traced 'message'");
	}
});

writeLog("message");

FileSystem.readFile(file_abs_path, "utf8", function(e, data) {
	if (e) {
		throw e;
	} else {
		assert("message\nmessage" === data.trim(), "should be traced 'message'");
	}
});

/* checks the file rotaion */



print("FileAppender is ok");
print("------------------------------------------------------------------------");
