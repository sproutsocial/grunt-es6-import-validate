grunt-es6-import-validate
=========================

A Grunt task for validating ES6 Module import statements.

[![Build Status](https://travis-ci.org/sproutsocial/grunt-es6-import-validate.svg)](https://travis-ci.org/sproutsocial/grunt-es6-import-validate)

## Example

```javascript
// Gruntfile.js
module.exports = function (grunt) {

	var cfg = {
		'validate-imports': {
			ok: {
				files: [{
					expand: true,
					cwd: 'scripts',
					src: ['**/*.js']
				}]
			}
		}
	};

	grunt.loadNpmTasks('grunt-es6-import-validate');

	grunt.initConfig(cfg);

	grunt.registerTask('default', ['validate-imports']);
};
```

### Options

- `whitelist`

Supply an object with keys representing the name of the module and values representing their exports.

```js
var cfg = {
	'validate-imports': {
		options: {
			whitelist: {
				'custommodule': ['default', 'named1', 'named2']
			}
		},
		ok: {
			files: [{
				expand: true,
				cwd: path.join(__dirname, 'scripts'),
				src: ['*.js']
			}]
		}
	}
};
```

Now import statements like 

    import { named1 } from 'custommodule';

will resolve correctly.

- `moduleName`

Supply a function that resolves the module name based on a relative filePath from the current working directory.

```js
var cfg = {
	'validate-imports': {
		renamed: {
			options: {
				moduleName: function (filePath) {
					// 'foo' -> 'appkit/foo'
					// 'other/bar' -> 'appkit/other/bar'
					return 'appkit/' + filePath;
				}
			},
			files: [{
				expand: true,
				cwd: 'scripts',
				src: ['foo.js', 'bar.js']
			}]
		}
	}	
};
```

### License

The MIT License (MIT)

Copyright (c) 2014 [Sprout Social](http://sproutsocial.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
