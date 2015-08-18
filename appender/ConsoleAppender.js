module.exports = function(name, print_pattern, config) {
	// no custom config
	var config = config;

	this.name = name;
	var print_pattern = print_pattern;

	this.write = function(record) {
		if (record.isError) {
			process.stderr.write(print_pattern.parse(record) + "\n");
		} else {
			process.stdout.write(print_pattern.parse(record) + "\n");
		}
	};

	this.release = function() {
		// nothing to release
	}

	return this;
};
