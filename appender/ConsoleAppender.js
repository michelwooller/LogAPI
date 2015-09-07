module.exports = function(name, print_pattern, config) {
	// no custom config
	var that = this;
	var config = config;
	var print_pattern = print_pattern;
	
	this.name = name;
	
	this.writeSync = function(record) {
		if (record.isError) {
			process.stderr.write(print_pattern.parse(record) + "\n");
		} else {
			process.stdout.write(print_pattern.parse(record) + "\n");
		}
	};
	
	this.write = function(record, callback) {
		process.nextTick(function() {
			try {
				that.writeSync(record, directory);
				callback(undefined);
			} catch (e) {
				callback(e);
			}
		});
		
	};
	
	return this;
};
