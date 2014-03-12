module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            main: {
                src: 'js/app.js',
                dest: 'public/js/main.js'
            }
        },

        jshint: {
            files: ['js/**/*.js'],
            options: {
                force: true,
                strict: true,
                smarttabs: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['browserify:main']
            }
        }

    });


    // Loading Grunt Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');


    // Tasks
    grunt.registerTask('default', ['browserify', 'watch']);

    grunt.registerTask('bund', ['jshint', 'browserify']);

};