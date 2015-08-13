module.exports = function(name, print_pattern, config) {
	var config = config;
	this.name = name;
	var print_pattern = print_pattern;

	this.write = function(record) {
		console.log(print_pattern.parse(record));
	};

	return this;
};
