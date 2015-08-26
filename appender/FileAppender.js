var FileSystem = require("fs");
var Path = require('path');

// config example
/*
{
	"file": {
		"path": "folder/that/contains/the/file",
		"name": "filename.extension"
	},
	"rotation" : {
		"size" : 1, //byte or: kib mib gib, k, m, g (max file size)
		"time" : 1, // second: or m, h, d (max file duration)		
	}
}
*/
module.exports = function(name, print_pattern, config) {

	// variables
	this.name = name;
	var _filename = undefined;
	var _folder = undefined;
	
	/* initialization block */	
	{
		// initialize file location properties
		if(config.file.path == undefined){
			_folder = Path.normalize(Path.join(Path.resolve("./")));
		} else {
			_folder = Path.normalize(Path.join(Path.resolve(config.file.path)));
		}
		_filename = Path.normalize(Path.join(_folder, config.file.name));
	}
	
	// internal methods
	
	/* create directory if needed */
	function createLogDir(directory){
		if (!FileSystem.existsSync(directory)) {
			FileSystem.mkdirSync(directory, 0777);
		}
	}

	// public methods
	this.write = function(record) {
		createLogDir(_folder);
		
		FileSystem.appendFile(_filename, print_pattern.parse(record) + "\n", function (e) {
			if(e){
				throw e;
			}
		});
	};

	this.release = function() {
		write_stream.end();
		write_stream = undefined;
	}

	return this;
};

/*
-- Testa acesso 
access(path, FileSystem.R_OK | FileSystem.W_OK, callback) // accessSync
-- testa existencia  
exists(path, callback) // existsSync
-- le arquivo
readFile(path, {"encoding" : "utf-8"}, callback(err, data)) // readFileSync
-- 

  read: [Function],
  readSync: [Function],
  write: [Function],
  writeSync: [Function],
  rename: [Function],
  renameSync: [Function],
  truncate: [Function],
  truncateSync: [Function],
  ftruncate: [Function],
  ftruncateSync: [Function],
  rmdir: [Function],
  rmdirSync: [Function],
  fdatasync: [Function],
  fdatasyncSync: [Function],
  fsync: [Function],
  fsyncSync: [Function],
  mkdir: [Function],
  mkdirSync: [Function],
  readdir: [Function],
  readdirSync: [Function],
  fstat: [Function],
  lstat: [Function],
  stat: [Function],
  fstatSync: [Function],
  lstatSync: [Function],
  statSync: [Function],
  readlink: [Function],
  readlinkSync: [Function],
  symlink: [Function],
  symlinkSync: [Function],
  link: [Function],
  linkSync: [Function],
  unlink: [Function],
  unlinkSync: [Function],
  fchmod: [Function],
  fchmodSync: [Function],
  lchmod: [Function],
  lchmodSync: [Function],
  chmod: [Function],
  chmodSync: [Function],
  lchown: [Function],
  lchownSync: [Function],
  fchown: [Function],
  fchownSync: [Function],
  chown: [Function],
  chownSync: [Function],
  _toUnixTimestamp: [Function: toUnixTimestamp],
  utimes: [Function],
  utimesSync: [Function],
  futimes: [Function],
  futimesSync: [Function],
  writeFile: [Function],
  writeFileSync: [Function],
  appendFile: [Function],
  appendFileSync: [Function],
  watch: [Function],
  watchFile: [Function],
  unwatchFile: [Function],
  realpathSync: [Function: realpathSync],
  realpath: [Function: realpath],
  createReadStream: [Function],
  ReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  FileReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  createWriteStream: [Function],
  WriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } },
  FileWriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } },
  SyncWriteStream: 
   { [Function: SyncWriteStream]
     super_: 
      { [Function: Stream]
        super_: [Object],
        Readable: [Object],
        Writable: [Object],
        Duplex: [Object],
        Transform: [Object],
        PassThrough: [Object],
        Stream: [Circular] } } }
*/
