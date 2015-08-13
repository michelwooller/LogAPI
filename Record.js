module.exports = function(logger, level, message) {
	return {
		"time" : new Date(),
		"logger": logger,
		"level": level,
		"message": message,
		"isError": (message instanceof Error)
	}
}
