/*
var Record = require("../Record.js");
var print = console.log;
var assert = console.assert;

print("\n########################################################################");
print(" LOG-API: record tests");
print("########################################################################\n\n");

var record = undefined;

record = new Record();
assert(record instanceof Error, "should not be possible create a record without information: [logger, level, message]");

record = new Record(null, null, null);
assert(record instanceof Error, "should not be possible create a record with null logger parameter or null level parameter ");

record = new Record("", "", null);
assert(record instanceof Error, "should not be possible create a record with empty logger parameter or empty level parameter ");

print("Record is ok");
print("------------------------------------------------------------------------");
*/