'use strict';

module.exports = function (grunt) {
  // 载入使用到的通过NPM安装的模块
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);//grunt.loadNpmTasks('grunt-contrib-compass');

  var config = {
    # app:'app/build',
    app: require ('./bower.json').appPath || 'app/assets_src'
  };
  
  grunt.initConfig({
    config:config,
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      startRailsServer : {
        command : 'rails server',
        options : {async : true}
      }
    },
    yeoman: config,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'tmp',
            '<%= pkg.dist %>/**/*',
            '!<%= pkg.dist %>/.git*'
          ]
          //filter:function(filePath){
          //  return (!grunt.isFile.isDir(filePath));
          //}
        }]     
      },
      server: 'tmp'
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= pkg.src %>/',
          dest: '<%= pkg.dist %>/',
          src: [
            '*.{ico,png}',
            'images/{,*/}*.*',
            'stylesheets/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= pkg.src %>/',
          dest: '<%= pkg.dist %>/',
          src: 'javascripts/{,*/}*.js'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= pkg.src %>/stylesheets/',
        dest: 'tmp/stylesheets/',
        src: '{,*/}*.css'
      }
    },
    compass: {                                   // task
      dist: {                                    // target
        options: {                               // target options
          sassDir: '<%= pkg.src %>/sass',
          cssDir : 'tmp/stylesheets',
          generatedImagesDir: 'tmp/images/generated',
          imagesDir: '<%= pkg.src %>/images',
          javascriptsDir: '<%= pkg.src %>/javascripts',
          importPath: './bower_components',
          httpImagesPath: '/images',
          httpGeneratedImagesPath: '/images/generated',
          httpFontsPath: '/stylesheets/fonts',
          relativeAssets: false,
          assetCacheBuster: false,
          raw: 'Sass::Script::Number.precision = 10\n',
          assetCacheBuster: false
        }
      },
      sprite: {                                  // another target
        options: {
          sassDir: '<%= pkg.src %>/sass',
          specify: '<%= pkg.src %>/sprite.sass',
          cssDir : 'tmp/stylesheets',
          imagesDir: "tmp/images",
          //httpPath:"http://res.yofogo.com",
          assetCacheBuster: false
        }
      },
      spriteX2: {
        options: {
          sassDir: '<%= pkg.src %>/sass',
          specify: '<%= pkg.src %>/sprite-x2.sass',
          cssDir : '<%= pkg.src %>/stylesheets',
          imagesDir: "<%= pkg.src %>/images",
          assetCacheBuster: false
        }
      }
    },
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= pkg.dist %>/javascripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= pkg.dist %>/javascripts/{,*/}*.js',
            '<%= pkg.dist %>/stylesheets/{,*/}*.css',
            '!<%= pkg.dist %>/javascripts/vendor/*'
          ]
        },
        uglify: true
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'tmp/stylesheets/',
          src: '{,*/}*.css',
          dest: 'tmp/stylesheets/'
        }]
      }
    },
    filerev: {
      dist: {
        files: {
          src: {
            '<%= pkg.dist %>/javascripts/{,*/}*.js',
            '<%= pkg.dist %>/stylesheets/{,*/}*.css',
            '<%= pkg.dist %>/images/{,*/}*.*',
            '<%= pkg.dist %>/stylesheets/fonts/{,*/}*.*',
            '<%= pkg.dist %>/*.{ico,png}'
          }
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= pkg.dist %>'
      },
      html: '<%= pkg.pages %>/{,*/}*.html.erb'
    },
    usemin: {
      options: {
        assetsDirs: [
          '<%= pkg.dist %>',
          '<%= pkg.dist %>/images',
          '<%= pkg.dist %>/stylesheets'
        ]
      },
      html: ['<%= pkg.pages %>/{,*/}*.html.erb'],
      css: ['<%= pkg.dist %>/javascripts/{,*/}*.css']
    },
    cssmin: {
      build: {
        expand: true,
        cwd: '<%= pkg.dist %>/stylesheets/',
        src: ['{,*/}*.css', '!*.min.css'],
        dest: '<%= pkg.dist %>/stylesheets/',
        ext: '.min.css'
      },
      dist: {
       files: {
         '<%= pkg.dist %>/styles/main.css': [
           'tmp/styles/{,*/}*.css',
           '<%= pkg.src %>/styles/{,*/}*.css'
         ]
       }
     }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.src %>/images/',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= pkg.dist %>/images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= pkg.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= pkg.pages %>/',
          src: '{,*/}*.html.erb',
          dest: '<%= pkg.pages %>/'
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        expand: true,
        cwd: '<%= pkg.src %>/javascripts/',
        src: ['zepto.min.js', 'respond.min.js', 'excanvas.js'],
        dest: '<%= pkg.dist %>/javajavascripts/core.min.js'
      },
      zepto: {
        options: {
          banner: '/* Zepto v1.0 - polyfill zepto detect event ajax form fx - zeptojs.com/license */\n',
          dir: 'src/zepto/src/'
        },
        // polyfill zepto detect event ajax form fx
        src: [
          '<%= concat.zepto.options.dir %>polyfill.js',
          '<%= concat.zepto.options.dir %>zepto.js',
          '<%= concat.zepto.options.dir %>detect.js',
          '<%= concat.zepto.options.dir %>event.js',
          '<%= concat.zepto.options.dir %>ajax.js',
          '<%= concat.zepto.options.dir %>form.js',
          '<%= concat.zepto.options.dir %>fx.js'
        ],
        dest: '<%= pkg.dist %>/javajavascripts/zepto.js'
      }
    },
    jshint: {
      options: {
        jshintrc:'.jshintrc',
        reporter:require('jshint-stylish')
      },
      files: [
        'Gruntfile.js',
        '<%= pkg.src %>/javascripts/{,*/}*.js',
        '!<%= pkg.src %>/javascripts/vendor/*',
        'spec/{,*/}*.js'
      ]
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %><%= pkg.author %><%= grunt.template.today("yyyy-mm-dd") %>*/',
        beautify:{
          //中文ascii化，防止中文乱码
          ascii_only:true
        },
        mangle: false
      },
      build: {
        expand: true,
        cwd: '<%= pkg.src %>/javascripts/',
        src: '*.js',
        dest: '<%= pkg.dist %>/javajavascripts/'
      }
    },
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= pkg.pages %>/views/layouts/application.html.erb'],
        exclude: ['bower_components/bootstrap-sass-official/assets/javajavascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= pkg.src %>/sass/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },
    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html.erb']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      bower : {
        files : ['bower.json'],
        tasks : ['wiredep']
      },
      js : {
        files : ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks : ['newer:jshint:all'],
        options : {
          livereload : '<%= connect.options.livereload %>'
        }
      },
      jstest : {
        files : ['spec/{,*/}*.js'],
        tasks : ['newer:jshint:test','test:watch']
      },
      compass: {
        #files: ['<%= pkg.src %>/sass/*.scss'],
        #tasks: ['compass']
        files : ['<%= yeoman.app %>/stylesheets/{,*/}*.{scss,sass}'],
        tasks : ['compass:server', 'autoprefixer']
      },
      gruntfile : {
        files : ['Gruntfile.js']
      },
      autoprefixer:{
        files:'<%= pkg.src %>/stylesheets/*',
        tasks:['autoprefixer']
      },
      cssmin:{
        files:'<%= pkg.src %>/stylesheets/{,*/}*.css',
        tasks:['cssmin']
      },
      styles:{
        files:['<%= pkg.src %>/stylesheets/{,*/}*.css'],
        tasks:['newer:cop:styles','autoprefixer']
      },
      jshint:{
        files:'<%= pkg.src %>/javascripts/{,*/}*.js',
        tasks:['jshint']
      },
      uglify:{
        files:'<%= pkg.src %>/javascripts/{,*/}*.js',
        tasks:['uglify']
      },
      concat:{
        files:'<%= pkg.src %>/javascripts/{,*/}*.js',
        tasks:['concat']
      },
      livereload : {
        options : {
          livereload : '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.pages %>/{,*/}*.html.erb',
          'tmp/stylesheets/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      proxies: [
        {
          context: '/api',
          host: 'localhost',
          port: 3000
        }
      ],
      livereload: {
        options: {
          open: true,
          middleware: function(connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            // Setup the proxy
            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static('tmp'),
              connect().use('/bower_components',connect.static('./bower_components')),
              connect.static(pkg.src)
            ];
 
            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));
 
            return middlewares;
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(pkg.src)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= pkg.dist %>',
          livereload: false
        }
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });
  


  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('sprite', ['compass:spriteX2']);

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'shell:startRailsServer',
      'autoprefixer',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'configureProxies',
        'connect:test'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'compass',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',    
    'modernizr',
    'filerev',
    'usemin',
    'htmlmin'
  ]);  
  grunt.registerTask('default', ['newer:jshint','test','build']);
};