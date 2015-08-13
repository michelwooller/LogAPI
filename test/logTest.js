var logAPI = require("../index.js");
var appenders_config = require("./appenders_config_example.json");


logAPI.loadAppenderConfig(appenders_config);


var logger1 = logAPI.createLogger("test.exec1");
var logger2 = logAPI.createLogger("test.exec2");

logger1.trace("[1] should not log");
setTimeout(function(){
	logger2.warn("[2] should log");
	setTimeout(function(){
		logger1.log("[1] should not log again");
		setTimeout(function(){
			logger2.info("[2] should log again");
			setTimeout(function(){
				logger1.info("[1] should log");
				setTimeout(function(){
					logger2.log("[2] should not log");
					setTimeout(function(){
						logger1.warn("[1] should log again");
						setTimeout(function(){
							logger2.trace("[2] should not log again");
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);
}, 1000);


try{
	throw new Error("[2] it's a catched error");
}catch(e){
	logger2.error(e);
}

logger2.error(new Error("[2] it's a common error "));
