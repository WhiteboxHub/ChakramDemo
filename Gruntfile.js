module.exports = function(grunt) {
    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false
                },
<<<<<<< 100f69fd48c38d2eca40eb46d9730b39c54488de
                src: ['test/*.js']
=======
                src: ['test/**/*.js']
>>>>>>> Venkatesh
            }
        }
    });

    grunt.registerTask('default', 'mochaTest');
};