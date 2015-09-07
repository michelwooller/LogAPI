/*
var Logger = require("../Logger.js");
var Level = require("../Level.js");

var print = console.log;
var assert = console.assert;

print("\n########################################################################");
print(" LOG-API: logger tests");
print("########################################################################\n\n");

var logger = undefined;
var records = new Array();

logger = new Logger("test.logger", function(record) {
	records.push(record)
});

var log_levels = [Level.trace, Level.trace, Level.log, Level.info, Level.warn, Level.error, Level.error];
var log_msgs = ["register", "trace", "log", "info", "warn", "error", new Error("erro object")];
var log_is_error = [false, false, false, false, false, false, true];
logger.register(Level.trace, log_msgs[0]);
logger.trace(log_msgs[1]);
logger.log(log_msgs[2]);
logger.info(log_msgs[3]);
logger.warn(log_msgs[4]);
logger.error(log_msgs[5]);
logger.error(log_msgs[6]);

// validations below
assert(records.length == 7, "should exists 7 records");
for (i in records) {
	assert(records[i].logger == "test.logger", "the logger name should be 'test.logger'");
	assert(records[i].time != undefined, "the record time should be not null");
	assert(records[i].level == log_levels[i], "the record leve should be '" + log_levels[i] + "'");
	assert(records[i].message == log_msgs[i], "the record message should be '" + log_msgs[i] + "'");
	assert(records[i].isError == log_is_error[i], "the record.isError should be '" + log_is_error[i] + "'");
}

print("Logger is ok");
print("------------------------------------------------------------------------");
*/