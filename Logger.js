var Record = require("./Record.js");
var Level = require("./Level.js");

module.exports = function(name, records){
	this.register = function(level, msg){
		records.push(new Record(name, level, msg));
	};
	
	this.trace = function(msg){
		records.push(new Record(name, Level.trace, msg));
	}

	this.log = function(msg){
	}

	this.info = function(msg){
		records.push(new Record(name, Level.info, msg));
	}

	this.warn = function(msg){
		records.push(new Record(name, Level.warn, msg));
	}

	this.error = function(msg){
		records.push(new Record(name, Level.error, msg));
	}
	
	return this;
}