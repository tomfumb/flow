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
        compile: {
          options: {
            baseUrl: "js",
            mainConfigFile: "js/app-en.js",
            name: "app",
            out: "js/dist/<%= pkg.name %>-en.js",
            optimize: "none"
          }
        }
      },
      french: {
        compile: {
          options: {
            baseUrl: "js",
            mainConfigFile: "js/app-fr.js",
            name: "app",
            out: "js/dist/<%= pkg.name %>-fr.js",
            optimize: "none"
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
        'index-en.htm',
        'index-fr.htm'
        /* ignoring template .html files as lint tool cannot handle snippets without body tag or underscore _.template variables e.g. <%= ...  %>  */
      ]
    },
    replace: {
      urlVersion: {
        src: ['index-en.htm', 'index-fr.htm', 'css/**/*.css', '!css/lib/*'],
        overwrite: true,
        replacements: [{
          from: /flow\-v=\d+\.\d+\.\d+/ig,
          to: 'flow-v=<%= pkg.version %>'
        }]
      },
      development: {
        src: ['index-en.htm', 'index-fr.htm'],
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
        src: ['index-en.htm', 'index-fr.htm'],
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
          src: 'index.php',
          dest: 'dist/'
        },{
          src: 'index-en.htm',
          dest: 'dist/'
        },{
          src: 'index-fr.htm',
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
  grunt.registerTask('r-en', ['requirejs:english']);
  grunt.registerTask('r-fr', ['requirejs:french']);
  grunt.registerTask('html', ['lint5']);
  grunt.registerTask('version', ['replace:urlVersion']);
  grunt.registerTask('development', ['replace:development']);
  grunt.registerTask('live', ['lint', 'html', 'r-en', 'r-fr', 'version', 'replace:live']);
  
  grunt.registerTask('deploy', ['copy', 'chmod', 'ftp-deploy', 'development']);

  grunt.registerTask('default', ['live']);
};
