'use strict';
var ConsoleAppender = require('../appender/ConsoleAppender.js');
var PrintPattern = require('../PrintPattern.js');
var Record = require('../Record.js');
var Level = require('../Level.js');
var FileSystem = require('fs');
var Path = require('path');

var test = require('unit.js');
var should = test.should;

var record, print_pattern = new PrintPattern('{out}');

describe('Suite de testes do ConsoleAppender.', function() {
	describe('Testes construção.', function() {
		describe('Dado uma instância do ConsoleAppender', function() {
			var console_appender = new ConsoleAppender('SimpleConsoleAppender', print_pattern);
			
			describe('quando criada de forma simples', function() {
				it('então deve conter a interface básica exigida para ser uma Appender.', function() {
					should(console_appender.name).be.equal('SimpleConsoleAppender');
					should(console_appender.write).be.type('function');
					should(console_appender.writeSync).be.type('function');
				});
			});
			
			describe('quando escrito um record de level menor que error', function() {
				it('então a mensagem deveria sair no stream de saída do sistema operacional.', function() {
					var original_out = process.stdout.write;
					process.stdout.write = function(chunk) {
						process.stdout.write = original_out;
						should(chunk).be.equal('mensagem_out\n');
					}

					record = new Record('test.logger', Level.trace, 'mensagem_out');
					console_appender.writeSync(record);
				});
			});
			
			describe('quando escrito um record de level igual a error', function() {
				it('então a mensagem deveria sair no stream de erro do sistema operacional.', function() {
					var original_err = process.stderr.write;
					var error = new Error('mensagem_err')
					process.stderr.write = function(chunk) {
						process.stderr.write = original_err;
						should(chunk).be.equal(error.stack + '\n');
					}

					record = new Record('test.logger', Level.error, error);
					console_appender.writeSync(record);
				});
			});
		});
	});
});
