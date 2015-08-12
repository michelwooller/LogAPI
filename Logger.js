var Record = require("./Record.js");
var Level = require("./Level.js");

module.exports = function(records){
	
	this.register = function(level, msg){
		records.push(new Record(level, msg));
	};
	
	this.trace = function(msg){
		records.push(new Record(Level.trace, msg));
	}
	this.log = function(msg){
		records.push(new Record(Level.log, msg));
	}
	this.info = function(msg){
		records.push(new Record(Level.info, msg));
	}
	this.warn = function(msg){
		records.push(new Record(Level.warn, msg));
	}
	this.error = function(msg){
		records.push(new Record(Level.error, msg));
	}
	
	return this;
}