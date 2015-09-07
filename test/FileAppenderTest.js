'use strict';
var FileAppender = require('../appender/FileAppender.js');
var PrintPattern = require('../PrintPattern.js');
var Record = require('../Record.js');
var Level = require('../Level.js');
var FileSystem = require('fs');
var Path = require('path');

var test = require('unit.js');
var should = test.should;

var record = new Record('test.logger', Level.trace, 'mensagem'), print_pattern = new PrintPattern('{out}');

describe('Suite de testes do FileAppender.', function() {
	describe('Testes construção.', function() {
		describe('Dado uma instância do FileAppender', function() {
			describe('quando criada de forma simples', function() {
				var file_appender = new FileAppender('SimpleFileAppender', print_pattern, {
					'file' : {
					    'path' : 'test/logs',
					    'name' : 'out.log'
					}
				});
				it('então deve conter a interface básica exigida para ser uma Appender.', function() {
					should(file_appender.write).be.type('function');
					should(file_appender.name).be.equal('SimpleFileAppender');
					should(file_appender.writeSync).be.type('function');
				});
			});
			describe('quando criada sem configurações de rotação', function() {
				var file_appender = new FileAppender('SimpleFileAppender', print_pattern, {
					'file' : {
					    'path' : 'test/logs',
					    'name' : 'out.log'
					}
				});
				it('então deve ter a rotação desabilitada.', function() {
					should(file_appender.rotation_enabled).be.equal(false);
					should(file_appender.rotation_size).be.type('undefined');
					should(file_appender.writerotation_time).be.type('undefined');
				});
			});
			describe('quando criada cem configurações de rotação', function() {
				var file_appender = new FileAppender('SimpleFileAppender', print_pattern, {
				    'file' : {
				        'path' : 'test/logs',
				        'name' : 'out.log'
				    },
				    'rotation' : {
				        'size' : 1,
				        'time' : 1
				    }
				});
				it('então deve ter a rotação habilitada', function() {
					should(file_appender.rotation_enabled).be.equal(true);
				});
				it('e também deve expor os valores de rotação de arquivo por ser um FileAppender.', function() {
					should(file_appender.rotation_size).be.type('number');
					should(file_appender.rotation_time).be.type('number');
				});
			});
			describe('quando para a rotação por tamanho, for informado um número (bytes), kib, mib, gib, k, m ou g', function() {
				var config = {
				    'file' : {
				        'path' : 'test/logs',
				        'name' : 'out.log'
				    },
				    'rotation' : {
					    'size' : '1'
				    }
				};
				var file_appender;
				it('então o FileAppender deve expor o mesmo número proporcional a sigla indicada (múltiplos de 1024).', function() {
					config.rotation.size = '1';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1);
					
					config.rotation.size = '1kib';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1024);
					
					config.rotation.size = '1mib';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1024 * 1024);
					
					config.rotation.size = '1gib';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1024 * 1024 * 1024);
					
					config.rotation.size = '1k';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1000);
					
					config.rotation.size = '1m';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1000 * 1000);
					
					config.rotation.size = '1g';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_size).be.equal(1 * 1000 * 1000 * 1000);
				});
			});
			describe('quando para a rotação por tempo, for informado um número (segundos), m, h ou d', function() {
				var config = {
				    'file' : {
				        'path' : 'test/logs',
				        'name' : 'out.log'
				    },
				    'rotation' : {
					    'time' : '1'
				    }
				};
				var file_appender;
				it('então o FileAppender deve expor o mesmo número proporcional a sigla indicada (múltiplos de tempo).', function() {
					config.rotation.time = '1';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_time).be.equal(1);
					
					config.rotation.time = '1m';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_time).be.equal(1 * 60);
					
					config.rotation.time = '1h';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_time).be.equal(1 * 60 * 60);
					
					config.rotation.time = '1d';
					file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
					should(file_appender.rotation_time).be.equal(1 * 60 * 60 * 24);
					
				});
			});
		});
	});
	describe('Testes de rotaçao.', function() {
		describe('Dado uma instância do FileAppender', function() {
			describe('quando logado um record além do tempo de rotação', function() {
				var config = {
				    'file' : {
				        'path' : 'test/logs',
				        'name' : 'out.log'
				    },
				    'rotation' : {
					    'time' : 1
				    }
				};
				
				// exclude log files
				try {
					var files = FileSystem.readdirSync(config.file.path);
					
					if (files.length > 0)
						for (var i = 0; i < files.length; i++) {
							var filePath = config.file.path + '/' + files[i];
							if (FileSystem.statSync(filePath).isFile())
								FileSystem.unlinkSync(filePath);
						}
				} catch (e) {
				}
				
				var file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
				file_appender.writeSync(record);
				
				it('então o FileAppender deverá rotacionar o arquivo por tempo.', function(done) {
					setTimeout(function() {
						file_appender.writeSync(record);
						
						var files = FileSystem.readdirSync(config.file.path);
						should(files.length).be.equal(2);
						done();
					}, 1000);
				});
			});
			describe('quando logado um record além do tamanho máximo para rotação', function() {
				var config = {
				    'file' : {
				        'path' : 'test/logs',
				        'name' : 'out.log'
				    },
				    'rotation' : {
					    'size' : 2
				    }
				};
				
				// exclude log files
				try {
					var files = FileSystem.readdirSync(config.file.path);
					
					if (files.length > 0)
						for (var i = 0; i < files.length; i++) {
							var filePath = config.file.path + '/' + files[i];
							if (FileSystem.statSync(filePath).isFile())
								FileSystem.unlinkSync(filePath);
						}
				} catch (e) {
				}
				
				var file_appender = new FileAppender('SimpleFileAppender', print_pattern, config);
				file_appender.writeSync(record);
				
				it('então o FileAppender deverá rotacionar o arquivo por tempo.', function() {
					file_appender.writeSync(record);
					
					var files = FileSystem.readdirSync(config.file.path);
					should(files.length).be.equal(2);
				});
			});
			
		});
	});
});