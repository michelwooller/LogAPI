var Logger = require("./Logger.js");
var Level = require("./Level.js");

module.exports = (function() {
	// logger objects
	var loggers = {};

	// appender list
	var appenders = {};
	appenders[Level.trace] = {};
	appenders[Level.log] = {};
	appenders[Level.info] = {};
	appenders[Level.warn] = {};
	appenders[Level.error] = {};

	// information to log
	var records = new Array();

	var createLogger = function(logger_name) {
		if (loggers[logger_name] == undefined) {
			loggers[logger_name] = new Logger(records);
		}

		return loggers[logger_name];
	}

	var loadAppenderConfig = function(appender_configs) {
		// Xlevel Xname Xtype config
		for (var i in appender_configs) {
			var appender_config = appender_configs[i];
			var AppenderType = require("./appender/" + appender_config.type + "Appender.js");
//			if()
			appenders[Level[appender_config.level]][appender_config.name] = new AppenderType(appender_config.config);
		}
	}

	return {
		"createLogger": createLogger,
		"records": records,
		"loadAppenderConfig": loadAppenderConfig
		"records": records
	}
})();
