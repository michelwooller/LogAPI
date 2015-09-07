var FileSystem = require('fs');
var Path = require('path');

// config example
var config_example = {
    'file' : {
        'path' : 'folder/that/contains/the/file',
        'name' : 'filename.extension'
    },
    'rotation' : {
        'size' : 1, // byte or: kib mib gib, k, m, g (max file size)
        'time' : 1
    // seconds or: m, h, d (max file duration)
    }
}

var functions = {
    /* create the log directory if needs */
    'createDirectory' : function(directory) {
	    if (!FileSystem.existsSync(directory)) {
		    FileSystem.mkdirSync(directory, 0777);
	    }
    },
    /* append on end of the file extension a date and time of the roation */
    'rotateFile' : function(filename, rotation_size, rotation_time) {
	    var now = new Date();
	    
	    var target_filename = filename;
	    var rotate = function() {
		    target_filename += '.' + now.getFullYear() + ('0' + now.getMonth()).slice(-2) + ('0' + now.getDate()).slice(-2);
		    target_filename += '_' + ('0' + now.getHours()).slice(-2) + ('0' + now.getMinutes()).slice(-2) + ('0' + now.getSeconds()).slice(-2);
		    
		    FileSystem.renameSync(filename, target_filename);
		    
	    };
	    
	    if (FileSystem.existsSync(filename)) {
		    var stats = FileSystem.statSync(filename);
		    if (stats.size > rotation_size) {
			    return rotate();
		    } else if (stats.birthtime != undefined) {
			    var btime_milli = stats.birthtime.getTime();
			    var now_milli = now.getTime();
			    if ((now_milli - btime_milli) > rotation_time) {
				    return rotate();
			    }
		    }
	    }
    },
    /* write the record on file */
    'write' : function(message, filename) {
	    FileSystem.appendFileSync(filename, message);
    }
};

module.exports = function(name, print_pattern, config) {
	
	// variables
	var that = this;
	var _filename = undefined;
	var _folder = undefined;
	var _rotation_size = undefined;
	var _rotation_time = undefined;
	var _rotation_enabled = undefined;
	//
	//
	// construction
	//
	//
	
	// initialize filename and folder properties
	if (config.file.path == undefined) {
		_folder = Path.normalize(Path.join(Path.resolve('./')));
	} else {
		_folder = Path.normalize(Path.join(Path.resolve(config.file.path)));
	}
	_filename = Path.normalize(Path.join(_folder, config.file.name));
	
	// initialize rotaion properties
	if (config.rotation == undefined) {
		_rotation_enabled = false;
	} else {
		_rotation_enabled = true;
		
		// initialize rotation size property
		if (config.rotation.size != undefined) {
			_rotation_size = config.rotation.size;
			
			var index = 0;
			if (!isNaN(_rotation_size) && isFinite(_rotation_size)) {
				_rotation_size = parseInt(_rotation_size);
			} else if ((index = _rotation_size.indexOf('kib')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1024);
			} else if ((index = _rotation_size.indexOf('mib')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1024 * 1024);
			} else if ((index = _rotation_size.indexOf('gib')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1024 * 1024 * 1024);
			} else if ((index = _rotation_size.indexOf('k')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1000);
			} else if ((index = _rotation_size.indexOf('m')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1000 * 1000);
			} else if ((index = _rotation_size.indexOf('g')) > -1) {
				_rotation_size = parseInt(_rotation_size.substring(0, index) * 1000 * 1000 * 1000);
			}
		}
		
		// initialize rotation time property
		if (config.rotation.time != undefined) {
			_rotation_time = config.rotation.time;
			
			var index = 0;
			if (!isNaN(_rotation_time) && isFinite(_rotation_time)) {
				_rotation_time = parseInt(_rotation_time);
			} else if ((index = _rotation_time.indexOf('m')) > -1) {
				_rotation_time = parseInt(_rotation_time.substring(0, index) * 60);
			} else if ((index = _rotation_time.indexOf('h')) > -1) {
				_rotation_time = parseInt(_rotation_time.substring(0, index) * 60 * 60);
			} else if ((index = _rotation_time.indexOf('d')) > -1) {
				_rotation_time = parseInt(_rotation_time.substring(0, index) * 60 * 60 * 24);
			}
		}
	}
	//
	//
	// public interface
	//
	//
	
	this.name = name;
	this.writeSync = function(record) {
		functions.createDirectory(_folder);
		functions.rotateFile(_filename, _rotation_size, _rotation_time);
		functions.write(print_pattern.parse(record) + '\n', _filename);
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
	
	this.rotation_size = _rotation_size;
	this.rotation_time = _rotation_time;
	this.rotation_enabled = _rotation_enabled;
	
	return this;
};
