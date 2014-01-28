'use strict';

var _ = require('lodash-node'),
	Promise = require('bluebird');

var ES6ModuleFile = require('es6-import-validate').ES6ModuleFile;

module.exports = function (grunt) {
	grunt.registerMultiTask('validate-imports', function () {
		var done = this.async(),
			// Group everything by cwd value
			moduleFiles = this.files.reduce(function (all, file) {
				all[file.orig.cwd] = all[file.orig.cwd] || [];
				all[file.orig.cwd] = all[file.orig.cwd].concat(file.src);
				
				return all;
			}, {});

		// Validate each grouping (usually only one)
		var allValidations = _.map(moduleFiles, function (files, cwd) {
				return ES6ModuleFile.validateImports(files, {
						cwd: cwd
					})
					.then(function (info) {
						grunt.log.write('>> '.green + files.length + ' files validated...').ok();
					});
			});

		// Wait for them to resolve
		Promise.all(allValidations)
			.then(function () {
				done();
			})
			.catch(function (errors) {
				// Show messages if failures
				errors.forEach(function (err) {
					grunt.log.error(err.name.yellow + ': '.red + err.message.yellow);
				});

				grunt.log.writeln();
				grunt.fail.warn('Validation errors found in modules.');

				done();
			});
	});
};