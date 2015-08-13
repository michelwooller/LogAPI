var Logger = require("./Logger.js");
var Level = require("./Level.js");
var PrintPattern = require("./PrintPattern.js");

module.exports = (function() {
	/* STATE VARIABLES */

	// OUT configuration
	var OUT_INTERVAL = 1000; // 1sec
	var OUT_SIZE = 1000;

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

	// --------------------------------------------------------------------------
	/* METHODS */

	// add a logger to the map
	// logger_name should be something like group.subgroup.name
	var createLogger = function(logger_name) {
		if (loggers[logger_name] == undefined) {
			loggers[logger_name] = new Logger(logger_name, records);
		}

		return loggers[logger_name];
	}

	// create the appender objects
	// the appender_config should be something like
	// [{ 
	// 		"name": "appender name",            
	//		"type": "appender implementation",  
	//		"level": "level that appender listens", 
	//		"loggers": ["logger1", "logger2", "group.logger3"], 
	// Follows the optional attributes --------------------------------------------------	
	//		"print_pattern": "[{y}/{M}/{d} {w} {h}:{m}:{s}.{ms}] [{lvl}] [{lg}] {out}",
	//		"config": {...[appender exclusive configuration]} 
	// }, ...]
	var loadAppenderConfig = function(appender_configs) {
		for (var i in appender_configs) {
			// get an appender config
			var appender_config = appender_configs[i];

			// create appender object
			var AppenderType = require("./appender/" + appender_config.type + "Appender.js");
			var appender_object = new AppenderType(appender_config.name,
				new PrintPattern(appender_config.print_pattern), appender_config.config);

			for (var l in appender_config.loggers) {
				var listened_logger = appender_config.loggers[l];

				// initialize listened logger appender list
				if (appenders[Level[appender_config.level]][listened_logger] == undefined) {
					appenders[Level[appender_config.level]][listened_logger] = new Array();
				}
				appenders[Level[appender_config.level]][listened_logger].push(appender_object);
			}
		}
	}

	setInterval(function() {
		for (var i = 0; i < OUT_SIZE; i++) {
			// getting message record
			var record = records[i];

			// stop the loop when ther record list is empty;
			if (record == undefined) {
				break;
			}

			// the record should be logged on all appender that listen the same level or the appenders that listen lower levels
			for (var level = record.level; level >= 1; level--) {
				// getting appender list by level
				var level_appenders = appenders[level];

				// try to catch all appenders as possible 
				var logger_composition = record.logger.split(".");
				var logger_name = undefined;
				for (var lc = 0; lc < logger_composition.length; lc++) {
					// logger name rebuild process
					if (logger_name == undefined) {
						logger_name = logger_composition[lc];
					} else {
						logger_name = logger_name + "." + logger_composition[lc];
					}

					// getting appender list by logger	
					var logger_appenders = level_appenders[logger_name];

					// using appender
					if (logger_appenders != undefined) {
						for (a in logger_appenders) {
							var appender = logger_appenders[a];
							appender.write(record);
						}
					}
				}
			}
		}
		records.splice(0, OUT_SIZE);
	}, OUT_INTERVAL);

	return {
		"createLogger": createLogger,
		"loadAppenderConfig": loadAppenderConfig
	}
})();
