/*
var ConsoleAppender = require("../appender/ConsoleAppender.js");
var PrintPattern = require("../PrintPattern.js");
var Level = require("../Level.js");
var Record = require("../Record.js");

var print = console.log;
var assert = console.assert;

/*
###########################################################
###########################################################
TODO review this test from head to tail. Something is wrong
###########################################################
###########################################################
TODO review this test from head to tail. Something is wrong
###########################################################
###########################################################
TODO review this test from head to tail. Something is wrong
###########################################################
###########################################################
TODO review this test from head to tail. Something is wrong
###########################################################
###########################################################
*/


/*
print("\n########################################################################");
print(" LOG-API: console appender tests");
print("########################################################################\n\n");

var console_appender = new ConsoleAppender("ConsoleAppender", new PrintPattern("{out}"));
var e = new Error("message");

var out_assertion_listener = function(data) {
	print(">>>" + data);
	assert("message" == data, "the output should be equals to 'message'");
}

var err_assertion_listener = function(data) {
	print(data);
	assert(e.stack == data, "the output should be equals to '" + e.stack + "'");
}

process.stdout.on("data", out_assertion_listener);
process.stderr.on("data", err_assertion_listener);
// -------------
// -------------
// -------------
var record = new Record("test.logger", Level.trace, "message");
console_appender.write(record);
// -------------
// -------------
// -------------
record = new Record("test.logger", Level.trace, e);
console_appender.write(record);
// -------------
// -------------
// -------------
process.stdout.removeListener("data", out_assertion_listener);
process.stderr.removeListener("data", err_assertion_listener);

//print("console appender is ok");
print("------------------------------------------------------------------------");
*/