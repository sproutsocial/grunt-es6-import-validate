'use strict';

var _ = require('lodash-node'),
	Promise = require('bluebird');

var ES6ModuleFile = require('es6-import-validate').ES6ModuleFile;

var defaultModuleNamer = function (name) {
	return name;
};

module.exports = function (grunt) {
	grunt.registerMultiTask('validate-imports', function () {
		var done = this.async(),
			opts = this.options({
				moduleName: defaultModuleNamer,
				whitelist: {}
			}),
			// Group everything by cwd value
			moduleFiles = this.files.reduce(function (all, file) {
				all[file.orig.cwd] = all[file.orig.cwd] || [];
				all[file.orig.cwd] = all[file.orig.cwd].concat(file.src);
				
				return all;
			}, {}),
			// Create a customized ES6ModuleFile that allows custom module name to be set
			TaskES6ModuleFile = function () {
				ES6ModuleFile.apply(this, _.toArray(arguments));
			};

		// Inherit from ES6ModuleFile
		TaskES6ModuleFile.prototype = Object.create(ES6ModuleFile.prototype);

		// Allow the moduleName option to customize the module name
		TaskES6ModuleFile.prototype.getModuleName = function (filePath) {
			var name = ES6ModuleFile.prototype.getModuleName.apply(this, _.toArray(arguments));

			return opts.moduleName(name);
		};

		// Validate each grouping (usually only one)
		var allValidations = _.map(moduleFiles, function (files, cwd) {
				return ES6ModuleFile.validateImports(files, {
						cwd: cwd,
						ES6ModuleFile: TaskES6ModuleFile,
						whitelist: opts.whitelist
					})
					.then(function (info) {
						grunt.log.ok('' + files.length + ' files validated.');
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