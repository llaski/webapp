'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        scss: [
            'assets/bower_components/normalize.scss/_normalize.scss',
            'assets/bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap.scss',
            'assets/scss/**/*.scss',
            'assets/scss/*.scss'
        ],
        js: [
            'assets/bower_components/jquery/dist/jquery.js',
            'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/*.js',
            'assets/js/*.js'
        ],
        pub: 'public'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: '<%= config.js %>',
                dest: 'public/js/app.js',
            }
        },

        compass: {
            options: {
                sassDir: 'assets/scss',
                cssDir: 'public/css',
                imagesDir: 'public/img',
                fontsDir: 'public/fonts',

                httpImagesPath: '/img',
                httpFontsPath: '/fonts',

                relativeAssets: false,
                outputStyle: 'compressed',
                noLineComments: true
            },
            dist: {}
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['assets/bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'],
                        dest : 'public/fonts',
                        filter: 'isFile'
                    }
                ]
            }
        },

        uglify: {
            dist: {
                src: '<%= config.pub %>/js/app.js',
                dest:'<%= config.pub %>/js/app.min.js'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: '<%= config.js %>',
                options: {
                    livereload: true
                }
            },
            sass: {
                files: '<%= config.scss %>',
                tasks: ['compass:dist']
            },
            css: {
                files: '<%= config.pub %>/css/*.css',
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        //Empties folders to start fresh
        clean: {
            dist: [
                '<%= config.pub %>/js/*.js',
                '<%= config.pub %>/css/*.css'
            ]
        },

        imageoptim: {
            options: {
                jpegMini: false,
                imageAlpha: false,
                imageOptim: true,
                quitAfter: true
            },
            allImgs: {
                src: '<%= config.pub%>/img',
            }
        }

    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify',
        'copy',
        'compass:dist'
    ]);

    grunt.registerTask('prod-build', [
        'build',
        'imageoptim'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};
