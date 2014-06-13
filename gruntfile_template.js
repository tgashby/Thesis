module.exports = function(grunt) {
	// Configure Grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			npm: {
				command: 'npm update',
				options: {
					stdout: true
				}
			},
			istanbul: {
				command: 'istanbul cover _mocha -- PATH_TO_TESTS -R spec', // Edit Me
				options: {
					stdout: true
				}
			}
		},
		watch: {
			test: {
				options: {
					spawn: false // So watch actually works!
				},
				files: ['**/*.js'],
				tasks: ['mochaTest']
			},
			coverage: {
				options: {
					spawn: false // So watch actually works!
				},
				files: ['**/*.js'],
				tasks: ['shell:istanbul']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					clearRequireCache: true
				},
				src: ['ABSOLUTE_PATH_TO_TESTS'] // Edit Me
			}
		}
	});
	var defaultTestSrc = grunt.config('mochaTest.test.src');
	grunt.event.on('watch', function(action, filepath) {
		grunt.config('mochaTest.test.src', defaultTestSrc);
		if (filepath.match('RELATIVE_PATH_TO_TESTS')) { // Edit Me
			grunt.config('mochaTest.test.src', filepath);
		}
	});
	// Load libs
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-shell');
	// Register the default tasks
	grunt.registerTask('default', ['mochaTest']);
	// Register update task
	grunt.registerTask('update', ['shell:npm']);
	// Register the mocha test task
	grunt.registerTask('test', ['mochaTest', 'watch:test']);
	// Register the code coverage task
	grunt.registerTask('test_with_coverage', ['shell:istanbul', 'watch:coverage']);
};