var Record = require("./Record.js");
var Level = require("./Level.js");

module.exports = function(name, add_record_closure){
	this.register = function(level, msg){
		add_record_closure(new Record(name, level, msg));
	};
	
	this.trace = function(msg){
		add_record_closure(new Record(name, Level.trace, msg));
	}

	this.log = function(msg){
		add_record_closure(new Record(name, Level.log, msg));
	}

	this.info = function(msg){
		add_record_closure(new Record(name, Level.info, msg));
	}

	this.warn = function(msg){
		add_record_closure(new Record(name, Level.warn, msg));
	}

	this.error = function(msg){
		add_record_closure(new Record(name, Level.error, msg));
	}
	
	return this;
}