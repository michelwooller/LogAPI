var logAPI = require("../index.js");
var appenders_config = require("./appenders_config_example.json");

console.log(logAPI);
console.log(appenders_config);

logAPI.loadAppenderConfig(appenders_config);
