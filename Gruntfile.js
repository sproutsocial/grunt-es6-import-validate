'use strict';

var path = require('path');

module.exports = function (grunt) {

	var cfg = {
		'validate': {
			ok: {
				files: [{
					expand: true,
					cwd: path.join(__dirname, 'tests', 'fixtures'),
					src: ['foo.js', 'bar.js']
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

	grunt.registerTask('default', ['validate']);
};