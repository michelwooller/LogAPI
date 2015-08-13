module.exports = function(name, config) {
	var config = config;
	this.name = name;

	var level_names = new Array("TRACE", "LOG", "INFO", "WARN", "ERROR");

	this.write = function(record) {
		if (record.isError) {
			console.log(record.time + " [" + level_names[record.level - 1] + "] [" + record.logger + "] >> ");
			console.log(record.message.stack.split("\n"));
		} else {
			console.log(record.time + " [" + level_names[record.level - 1] + "] [" + record.logger + "] >> " + record.message);
		}
	};

	return this;
};
