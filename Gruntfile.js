module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            main: {
                src: 'js/app.js',
                dest: 'public/main.js'
            }
        },

        jshint: {
            files: ['js/**/*.js'],
            options: {
                strict: true,
                smarttabs: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    exports: true
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['jshint', 'browserify:main']
            }
        }

    });


    // Loading Grunt Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');


    // Tasks
    grunt.registerTask('default', ['jshint', 'browserify', 'watch']);

    grunt.registerTask('bund', ['jshint', 'browserify']);

};