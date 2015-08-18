module.exports = function(logger, level, message) {
	if(logger == undefined || level == undefined){
		return new Error("logger and level cannot be undefined");
	}

	if(logger.trim() == ""){
		return new Error("logger cannot be empty");
	}

	return {
		"time": new Date(),
		"logger": logger,
		"level": level,
		"message": message,
		"isError": (message instanceof Error)
	}
}
