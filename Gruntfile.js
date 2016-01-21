/**
 * Created by chottinger on 1/21/16.
 */
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: [
          "angular/angular.min.js",
          "bootstrap/dist/css/bootstrap.css"
        ],
        "dest": "client/public/vendors/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};