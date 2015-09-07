/*
var PrintPattern = require("../PrintPattern.js");
var Record = require("../Record.js");
var Level = require("../Level.js");
var print = console.log;
var assert = console.assert;

print("\n########################################################################");
print(" LOG-API: print pattern tests");
print("########################################################################\n\n");

var record = undefined;
var pattern = undefined;
var now = undefined;

// level output test
pattern = new PrintPattern("{lvl}");
record = new Record("print.pattern.test", Level.trace, "message");
assert(("TRC" === pattern.parse(record)), "should be write 'TRC'");
record = new Record("print.pattern.test", Level.log, "message");
assert(("LOG" === pattern.parse(record)), "should be write 'LOG'");
record = new Record("print.pattern.test", Level.info, "message");
assert(("INF" === pattern.parse(record)), "should be write 'INF'");
record = new Record("print.pattern.test", Level.warn, "message");
assert(("WRN" === pattern.parse(record)), "should be write 'WRN'");
record = new Record("print.pattern.test", Level.error, "message");
assert(("ERR" === pattern.parse(record)), "should be write 'ERR'");

// logger output test
pattern = new PrintPattern("{lg}");
record = new Record("print.pattern.test", Level.trace, "message");
assert(("print.pattern.test" == pattern.parse(record)), "should be write 'print.pattern.test'");

// message output test
pattern = new PrintPattern("{out}");
record = new Record("print.pattern.test", Level.trace, "message");
assert(("message" == pattern.parse(record)), "should be write 'message'");

// year output test
pattern = new PrintPattern("{y}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
assert((now.getFullYear() == pattern.parse(record)), "should be write '" + now.getFullYear() + "'");

// month output test
pattern = new PrintPattern("{M}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
assert((now.getMonth() == pattern.parse(record)), "should be write '" + now.getMonth() + "'");

// month output test
pattern = new PrintPattern("{w}");
now = new Date();
var week_names = new Array("sun", "mon", "tue", "wed", "thu", "fri", "sat");
record = new Record("print.pattern.test", Level.trace, "message");
assert((week_names[now.getDay()] == pattern.parse(record)), "should be write '" + week_names[now.getDay()] + "'");

// day output test
pattern = new PrintPattern("{d}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
var day = ("0" + now.getDate()).slice(-2);
assert((day == pattern.parse(record)), "should be write '" + day + "'");

// hour output test
pattern = new PrintPattern("{h}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
var hours = ("0" + now.getHours()).slice(-2);
assert((hours == pattern.parse(record)), "should be write '" + hours + "'");

// minutes output test
pattern = new PrintPattern("{m}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
var minutes = ("0" + now.getMinutes()).slice(-2);
assert((minutes == pattern.parse(record)), "should be write '" + minutes + "'");

// seconds output test
pattern = new PrintPattern("{s}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
var seconds = ("0" + now.getSeconds()).slice(-2);
assert((seconds == pattern.parse(record)), "should be write '" + seconds + "'");

// milliseconds output test
pattern = new PrintPattern("{ms}");
now = new Date();
record = new Record("print.pattern.test", Level.trace, "message");
assert(/[0-9]{3}/.test((pattern.parse(record) + "000").slice(0,3)) && pattern.parse(record).length == 3, "should be write 3 digits ");

// many repeated output test
pattern = new PrintPattern("{out} - {out}");
record = new Record("print.pattern.test", Level.trace, "message");
assert(("message - message" == pattern.parse(record)), "should be write 'message - message'");

// error stack output test
pattern = new PrintPattern("{out}");
var e = new Error("message");
record = new Record("print.pattern.test", Level.trace, e);
assert((e.stack == pattern.parse(record)), "should be write '" + e.stack + "'");

print("PrintPattern is ok");
print("------------------------------------------------------------------------");
*/