module.exports = function() {	
	this.write = function(record){
		console.log(record);
	};
	
	return this;
};
