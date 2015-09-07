/*
var logAPI = require("../index.js");
var appenders_config = require("./appenders_config_example.json");

logAPI.loadAppenderConfig(appenders_config);

var logger = logAPI.createLogger("test.logger.mine");

logger.error(new Error("error test"));
try{
	throw new Error("exception test");
}catch(e){
	logger.error(e);
}

logger.warn("warning teste");
logger.info("information teste");
logger.log("logging teste");
logger.trace("tracing teste");


setTimeout(function(){
	logger.error("last Log");	
}, 5000); 

*/