var level = require("../Level.js");
var print = console.log;
var assert = console.assert;

print("\n########################################################################");
print(" LOG-API: level tests");
print("########################################################################\n\n");
// trace should be the lowest level
assert(level.trace < level.log, "trace bigger or equals a log");
assert(level.trace < level.info, "trace bigger or equals a info");
assert(level.trace < level.warn, "trace bigger or equals a warn");
assert(level.trace < level.error, "trace bigger or equals a error");

// log should be greater than trace and lower than the others levels


assert(level.log < level.info, "log bigger or equals a info");
assert(level.log < level.warn, "log bigger or equals a warn");
assert(level.log < level.error, "log bigger or equals a error");

// info should be greater than [trace, log] and lower than the others levels
assert(level.info < level.warn, "info bigger or equals a warn");
assert(level.info < level.error, "info bigger or equals a error");

// warn should be greater than [trace, log, info] and lower than error
assert(level.warn < level.error, "warn bigger or equals a error");

// error should be ther greater level
print("Level is ok");
print("------------------------------------------------------------------------");
