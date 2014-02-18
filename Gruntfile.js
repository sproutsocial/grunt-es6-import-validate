'use strict';

var path = require('path');

module.exports = function (grunt) {

	var cfg = {
		'validate-imports': {
			ok: {
				files: [{
					expand: true,
					cwd: path.join(__dirname, 'tests', 'fixtures'),
					src: ['foo.js', 'bar.js']
				}]
			},
			renamed: {
				options: {
					moduleName: function (filePath) {
						return 'appkit/' + filePath;
					}
				},
				files: [{
					expand: true,
					cwd: path.join(__dirname, 'tests', 'fixtures', 'renamed'),
					src: ['foo.js', 'bar.js']
				}]
			},
			whitelisted: {
				options: {
					whitelist: {
						foo: ['default', 'missing'],
						resolver: ['default']
					}
				},
				files: [{
					expand: true,
					cwd: path.join(__dirname, 'tests', 'fixtures'),
					src: ['*.js']
				}]
			},
			fail: {
				files: [{
					expand: true,
					cwd: path.join(__dirname, 'tests', 'fixtures'),
					src: ['*.js']
				}]
			}
		}
	};

	grunt.loadTasks('tasks');

	grunt.initConfig(cfg);

	grunt.registerTask('validate', ['validate-imports:ok', 'validate-imports:renamed', 'validate-imports:whitelisted']);

	grunt.registerTask('default', ['validate-imports']);
};