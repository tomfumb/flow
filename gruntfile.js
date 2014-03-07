module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['js/**/*.js', '!js/lib/*'],
      options: {
        globals: {
		  $: true,
		  _: true,
		  Backbone: true,
          console: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['jshint']);
};
