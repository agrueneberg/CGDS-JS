module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            cgds: {
                src: "lib/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.js",
                options: {
                    alias: "lib/<%= pkg.name %>.js:<%= pkg.name %>"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask("default", ["browserify"]);

};
