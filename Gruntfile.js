'use strict';

module.exports = function (grunt) {

    var babelify = require('babelify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["./build"],

        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        "expand": true,
                        "cwd": "./",
                        "src": ["server.js"],
                        "dest": "./build/",
                        "ext": ".js"
                    },
                    {
                        "expand": true,
                        "cwd": "./server/",
                        "src": ["**/*.js"],
                        "dest": "./build/server/",
                        "ext": ".js"
                    },
                    {
                        "expand": true,
                        "cwd": "./shared/",
                        "src": ["**/*.js"],
                        "dest": "./build/shared/",
                        "ext": ".js"
                    },
                    {
                        "expand": true,
                        "cwd": "./test/",
                        "src": ["**/*.js"],
                        "dest": "./build/test/",
                        "ext": ".js"
                    }
                ]
            }
        },
        browserify: {
            options: {
                transform: [babelify]
            },
            all: {
                files: {
                    'build/client/scripts/app.js': ['client/scripts/app.js']
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: ['server/**/*.js', 'test/**/*.js', '*.js']
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false
            },
            all: {src: ['build/test/**/*.js']}
        },
        sync: {
            main: {
                files: [{
                        expand: true,
                        cwd: './',
                        src: 'client/index.html',
                        dest: 'build/'
                    }, {
                        expand: true,
                        cwd: './',
                        src: 'client/images/**/*',
                        dest: 'build/'
                    }
                ]
            }
        },
        watch: {
            sync: {
                files: ['./*.html', './img/**/*'],
                tasks: ['sync']
            },
            babel: {
                files: ['./server/**/*.js', './shared/**/*.js'],
                tasks: ['clean', 'babel', 'simplemocha', 'jshint']
            }
        },
        nodemon: {
            dev: {
                script: './build/server.js'
            }
        },
        concurrent: {
            dev: ['babel', 'sync', 'nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Test task executes mocka tests and runs jshint
    grunt.registerTask('test', ['clean', 'babel', 'browserify', 'simplemocha', 'jshint']);

    // Default task executes concurrent target. Watching for changes to execute tests and restart server.
    grunt.registerTask('default', ['clean', 'babel', 'browserify', 'sync', 'concurrent:dev']);

    // start server
    grunt.registerTask('build', ['clean', 'babel', 'browserify', 'sync']);
};
