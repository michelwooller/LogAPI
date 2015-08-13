module.exports = function(name, config) {	
	var config = config;
	this.name = name;
	
	var level_names = new Array("TRACE", "LOG", "INFO", "WARN", "ERROR");
	
	this.write = function(record){
		
		console.log(record.time + " ["+ level_names[record.level - 1] + "] [" + record.logger + "] >> " + record.message );
//		"isError": (message instanceof Error)
		
	};
	
	return this;
};
