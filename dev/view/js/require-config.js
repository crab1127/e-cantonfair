//模块配置
require.config({
  baseUrl: 'http://crab.e-cantonfair.com:3333',
  paths: {
    'jquery': '/components_module/jquery/jquery',
    //生态模块
    'validation': '/components_module/jquery-validation/dist/jquery.validate',
    'validation-lang': '/components_module/jquery-validation/src/localization/messages_zh',
    'umeditor': '/components_module/umeditor/dist/utf8-jsp/umeditor',
    'umeditor-config': '/components_module/umeditor/dist/utf8-jsp/umeditor.config',
    'umeditor-lang': '/components_module/umeditor/dist/utf8-jsp/lang/zh-cn/zh-cn',
    'umeditor-css': '/components_module/umeditor/dist/utf8-jsp/themes/default/css/umeditor',
    'artTemplate': '/components_module/artTemplate/dist/template',
    'highcharts': '/components_module/highcharts/highcharts',

    //自己的模块
    'uploader': '/dev/components/component/upload/uploader',
    'paging': '/dev/components/component/paging/paging',
    'cookie': '/dev/components/component/cookie/cookie',
    'tools': '/dev/components/component/tools/tools',
    'md5': '/dev/components/component/md5/md5'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'validation': {
      deps: ['jquery']
    },
    'validation-lang': {
      deps: ['jquery', 'validation']
    },
    'umeditor': {
      exports: 'UM',
      deps: ['jquery']
    },
    'umeditor-lang': {
      deps: ['umeditor']
    },
    'umeditor-config': {
      deps: ['umeditor']
    },
    'highcharts': {
      deps: ['jquery'],
      exports: 'highcharts'
    }

  },
  map: {
    '*': {
      'css': '/components_module/require-css/css.js'
    }
  }
});