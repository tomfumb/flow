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
          from: /flow\-v=\d+\.\d+\.\d+/ig,
          to: 'flow-v=<%= pkg.version %>'
        }]
      },
      development: {
        src: ['index.htm'],
        overwrite: true,
        replacements: [{
          from: 'href="css/dist/<%= pkg.name %>.css',
          to: 'href="css/src/ccij.css'
        },
        {
		  from: 'data-main="js/dist/ccij-flow"',
		  to: 'data-main="js/app"'
		}]
      },
      live: {
        src: ['index.htm'],
        overwrite: true,
        replacements: [{
          from: 'href="css/src/ccij.css',
          to: 'href="css/dist/<%= pkg.name %>.css'
        },
        {
		  from: 'data-main="js/app"',
		  to: 'data-main="js/dist/ccij-flow"'
		}]
      }
    },
    remove: {
      fileList: 'dist/**/*',
      dirList: 'dist'
    },
    copy: {
      main: {
		files: [{
          src: 'index.htm',
          dest: 'dist/'
        },{
          src: 'js/dist/*.js',
          dest: 'dist/'
        },{
          src: 'js/lib/require*.js',
          dest: 'dist/'
        },{
          src: 'css/print.css',
          dest: 'dist/'
        },{
          src: 'css/dist/*.css',
          dest: 'dist/'
        },{
          cwd: 'css/lib/',
          expand: true,
          src: '**',
          dest: 'dist/css/lib/'
        },{
          src: 'images/*',
          dest: 'dist/'
        },{
          src: '*.php',
          dest: 'dist/'
        },{
          src: 'feedback/*.php',
          dest: 'dist/'
        },{
          src: 'results/*.php',
          dest: 'dist/'
        }]
      },
    },
    chmod: {
      static: {
        options: {
          mode: '0644'
        },
        src: ['dist/**/*.htm', 'dist/**/*.js', 'dist/**/*.css', 'dist/images/*']
      },
      dynamic: {
        options: {
          mode: '0755'
        },
        src: ['dist/**/*.php']
      }
    },
    "ftp-deploy": {
      build: {
        auth: {
          host: 'ccij.ca',
          port: 21,
          authKey: 'ccij'
        },
        src: 'dist',
        dest: '/public_html/test'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-lint5');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('r', ['requirejs']);
  grunt.registerTask('html', ['lint5']);
  grunt.registerTask('version', ['replace:urlVersion']);
  grunt.registerTask('development', ['replace:development']);
  grunt.registerTask('live', ['replace:live']);
  
  grunt.registerTask('deploy', ['lint', 'html', 'r', 'version', 'replace:live', 'copy', 'chmod', 'ftp-deploy', 'development']);

  grunt.registerTask('default', ['lint', 'html', 'r', 'version', 'live']);
};
