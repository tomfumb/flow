module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['js/**/*.js', '!js/lib/*', '!js/dist/*'],
      options: {
        globals: {
		  $: true,
		  _: true,
		  Backbone: true,
          console: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          paths: {
            'jquery': 'empty:',
            'jquery-ui': 'empty:',
            'jquery-mobile': 'empty:',
            'underscore': 'empty:',
            'backbone': 'empty:',
            'bootstrap': 'empty:'
          },
          mainConfigFile: "js/app.js",
          name: "init",
          out: "js/dist/<%= pkg.name %>-<%= pkg.version %>.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('r', ['requirejs']);
  grunt.registerTask('default', ['jshint', 'requirejs']);
};
