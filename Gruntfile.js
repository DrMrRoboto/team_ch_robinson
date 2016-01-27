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
          "angular/angular.min.js.map",
          "angular-route/angular-route.min.js",
          "bootstrap/dist/css/bootstrap.css",
          "angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css",
          "angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js",
          "angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
          "angular-animate/angular-animate.min.js",
          "interact.js/dist/interact.min.js",
          "moment/min/moment.min.js",
          "bootstrap-ui-datetime-picker/dist/datetime-picker.min.js"
        ],
        "dest": "client/public/vendors/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};