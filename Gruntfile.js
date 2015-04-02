'use strict';

module.exports = function (grunt) {
  //加载grunt插件
  require('load-grunt-tasks')(grunt);

  //在cmd显示任务执行时间
  require('time-grunt')(grunt);

  //配置工程路径
  var appConfig = {
    app: 'dev_assets',
    dist: 'dist',
    version: '0.0.0'
  };

  grunt.initConfig({

    cfec : appConfig,

    //grunt/grunt-contrib-connect 启动一个静态web服务器
    //git: https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      options: {
        port: 9002,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/components_module',
                connect.static('./components_module')
              ),
              connect().use(
                '/dev_assets/static',
                connect.static('./dev_assets/static')
              ),
              connect.static(appConfig.app)
            ] 
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= cfec.app %>'
        }
      }
    },

    //图片压缩
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfec.app%>/static/images',
          src: '**/*.{png,jpg,gif,jpeg}',
          dest: '<%= cfec.dist%>/static/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfec.app%>/static',
          src: '**/*.svg',
          dest: '<%= cfec.dist%>/static'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= cfec.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= cfec.dist %>'
        }]
      }
    },




  });


  /**
   * 提供3个自定义任务
   * server - 本地开发
   *  - less编译， 文件监听， 自动刷新， 启动本地服务器
   *  
   * build -上线部署
   *  - 请求合并，压缩，校验，加md5戳，发布到指定目录
   *
   * test - 测试代码
   */
  grunt.registerTask('server', 'compile then start a connect web server', function (target) {
    
  });

  grunt.registerTask('build', [])

  grunt.registerTask('test', [])
}