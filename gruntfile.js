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
      english: {
        options: {
          baseUrl: "js",
          mainConfigFile: "js/app-en.js",
          name: "app-en",
          out: "js/dist/<%= pkg.name %>-en.js",
          uglify: {
            no_mangle: true
          }
        }
      },
      french: {
        options: {
          baseUrl: "js",
          mainConfigFile: "js/app-fr.js",
          name: "app-fr",
          out: "js/dist/<%= pkg.name %>-fr.js",
          uglify: {
            no_mangle: true
          }
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
      dirPath: '.',
      templates: [
        'index-en.php',
        'index-fr.php'
        /* ignoring template .html files as lint tool cannot handle snippets without body tag or underscore _.template variables e.g. <%= ...  %>  */
      ]
    },
    replace: {
      urlVersion: {
        src: ['index-en.php', 'index-fr.php', 'css/**/*.css', '!css/lib/*'],
        overwrite: true,
        replacements: [{
          from: /flow\-v=\d((\.\d+)+)?/ig,
          to: 'flow-v=<%= pkg.version %>'
        }]
      },
      development: {
        src: ['index-en.php', 'index-fr.php'],
        overwrite: true,
        replacements: [{
          from: 'href="css/dist/<%= pkg.name %>.css',
          to: 'href="css/src/ccij.css'
        },
        {
		  from: 'data-main="js/dist/ccij-flow',
		  to: 'data-main="js/app'
		}]
      },
      live: {
        src: ['index-en.php', 'index-fr.php'],
        overwrite: true,
        replacements: [{
          from: 'href="css/src/ccij.css',
          to: 'href="css/dist/<%= pkg.name %>.css'
        },
        {
		  from: 'data-main="js/app',
		  to: 'data-main="js/dist/ccij-flow'
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
          src: 'index.php',
          dest: 'dist/'
        },{
          src: 'index-en.php',
          dest: 'dist/'
        },{
          src: 'index-fr.php',
          dest: 'dist/'
        },{
          src: 'auth/*.php',
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
        },{
          src: 'identity/*.php',
          dest: 'dist/'
        }]
      }
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
        dest: '/public_html/ofj'
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
  grunt.registerTask('r-en', ['requirejs:english', 'requirejs:css']);
  grunt.registerTask('r-fr', ['requirejs:french', 'requirejs:css']);
  //not happy with PHP tags within index files
  //grunt.registerTask('html', ['lint5']);
  grunt.registerTask('version', ['replace:urlVersion']);
  grunt.registerTask('development', ['replace:development']);
  grunt.registerTask('live', ['lint'/*, 'html'*/, 'version', 'requirejs', 'replace:live']);
  grunt.registerTask('dist', ['live', 'copy:main', 'chmod']);
  grunt.registerTask('bootstrap', ['copy:bootstrap']);

  grunt.registerTask('deploy', ['dist', 'ftp-deploy']);

  grunt.registerTask('default', ['live']);
};
