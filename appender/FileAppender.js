var file_system = require("fs");

// config example
/*
{
	
}
*/
module.exports = function(name, print_pattern, config) {

	// variables
	var config = config;

	this.name = name;
	var print_pattern = print_pattern;

	var file = undefined;

	// methods
	var fileUtil = {
		"renew": function() {
			if (file = undefined) {
				fileUtil.create();
			} else {
				// check size
				// if size is too much
				//		create new file
			}
		},
		"create" : function(){
			
		}
	}


	this.write = function(record) {
		fileUtil.renew();

		file.write(print_pattern.parse(record));
	};

	this.release = function() {
		// nothing to release
	}

	return this;
};
