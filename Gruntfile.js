module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      build: {
        options: {jshintrc: '.jshintrc'},
        src: ['Gruntfile.js']
      },
      source: {
        options: {jshintrc: 'src/.jshintrc'},
        src: ['src/**/*.js']
      }
    },
    watch: {
      main: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'requirejs'],
        options: {}
      }
    },
    requirejs: {
      unmin: {
        options: {
          baseUrl: '.',
          findNestedDependencies: true,
          include: ['src/app'],
          onBuildWrite: function( name, path, contents ) {
            return require('amdclean').clean({
              code: contents,
              escodegen: {
                'comment': true,
                'format': {
                  'indent': {
                    'style': '  ',
                    'adjustMultilineComment': true
                  }
                }
              }
            });
          },
          optimize: 'none',
          out: 'lib/cKit.js',
          paths: {
            'app': 'src/app',
            'core': 'src/core/core',
            'constants': 'src/core/constants',
            'CPoint': 'src/elements/CPoint',
            'Vector': 'src/elements/Vector',
            'PedalFlower': 'src/shapes/PedalFlower'
          },
          useStrict: true,
          wrap: {
            start: '/*! cKit.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */\n',
            end: ''
          }
        }
      },
      min: {
        options: {
          baseUrl: '.',
          findNestedDependencies: true,
          include: ['src/app'],
          onBuildWrite: function( name, path, contents ) {
            return require('amdclean').clean(contents);
          },
          optimize: 'uglify2',
          out: 'lib/cKit.min.js',
          paths: '<%= requirejs.unmin.options.paths %>',
          useStrict: true,
          wrap: {
            start: '/*! cKit.min.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */\n',
            end: ''
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['jshint', 'requirejs']);
};