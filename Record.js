module.exports = function(level, message) {
	return {
		"level": level,
		"message": message,
		"isError": (message instanceof Error)
	}
}
