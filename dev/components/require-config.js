//模块配置
require.config({
  //baseUrl: 'http://crab.e-cantonfair.com:3333',
  paths: {
    'jquery': 'http://crab.e-cantonfair.com:3333/components_module/jquery/jquery',
    //生态模块
    'validation': 'http://crab.e-cantonfair.com:3333/components_module/jquery-validation/dist/jquery.validate',
    'validation-lang': 'http://crab.e-cantonfair.com:3333/components_module/jquery-validation/src/localization/messages_zh',
    'umeditor': 'http://crab.e-cantonfair.com:3333/components_module/umeditor/dist/utf8-jsp/umeditor',
    'umeditor-config': 'http://crab.e-cantonfair.com:3333/components_module/umeditor/dist/utf8-jsp/umeditor.config',
    'umeditor-lang': 'http://crab.e-cantonfair.com:3333/components_module/umeditor/dist/utf8-jsp/lang/zh-cn/zh-cn',
    'umeditor-css': 'http://crab.e-cantonfair.com:3333/components_module/umeditor/dist/utf8-jsp/themes/default/css/umeditor',
    'artTemplate': 'http://crab.e-cantonfair.com:3333/components_module/artTemplate/dist/template',
    'highcharts': 'http://crab.e-cantonfair.com:3333/components_module/highcharts/highcharts',

    //自己的模块
    'uploader': 'http://crab.e-cantonfair.com:3333/dev/components/upload/uploader',
    'dialog': 'http://crab.e-cantonfair.com:3333/dev/components/dialog/dialog',
    'swfobject': 'http://crab.e-cantonfair.com:3333/dev/components/upload/swfobject',
    'paging': 'http://crab.e-cantonfair.com:3333/dev/components/paging/paging',
    'cookie': 'http://crab.e-cantonfair.com:3333/dev/components/cookie/cookie',
    'tools': 'http://crab.e-cantonfair.com:3333/dev/components/tools/tools',
    'md5': 'http://crab.e-cantonfair.com:3333/dev/components/md5/md5',
    'class': 'http://crab.e-cantonfair.com:3333/dev/components/class/class',
    'base': 'http://crab.e-cantonfair.com:3333/dev/components/base/base',
    'event': 'http://crab.e-cantonfair.com:3333/dev/components/event/event',
    'selectCategory':'http://crab.e-cantonfair.com:3333/dev/components/selectCategory/index',
    'webupload': 'http://crab.e-cantonfair.com:3333/dev/components/webUpload/WebUploader',
    'calendar': 'http://crab.e-cantonfair.com:3333/dev/components/calendar/laydate.dev'
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
      'css': 'http://crab.e-cantonfair.com:3333/components_module/require-css/css.js'
    }
  }
});