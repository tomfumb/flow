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
          baseUrl: "js",
          mainConfigFile: "js/app.js",
          name: "app",
          out: "js/dist/<%= pkg.name %>.js",
          optimize: "none"
        }
      },
      css: {
        options: {
          optimizeCss: 'standard',
          cssIn: 'css/src/ccij.css',
          out: 'css/dist/<%= pkg.name %>.css'
        }
      }
    },
    lint5: {
      dirPath: ".",
      templates: [
        "index.htm"
        /* ignoring template .html files as lint tool cannot handle snippets without body tag or underscore _.template variables e.g. <%= ...  %>  */
      ]
    },
    replace: {
      urlVersion: {
        src: ['index.htm', 'css/**/*.css', '!css/lib/*'],
        overwrite: true,
        replacements: [{
          from: /\flow\-v=\d\.\d\.\d/ig,
          to: 'flow-v=<%= pkg.version %>'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-lint5');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('r', ['requirejs']);
  grunt.registerTask('html', ['lint5']);
  grunt.registerTask('version', ['replace']);

  grunt.registerTask('default', ['jshint', 'lint5', 'requirejs', 'version']);
};
