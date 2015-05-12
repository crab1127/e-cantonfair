'use strict';

require.config({
  urlArgs: "_=" + (new Date()).getTime(),
  paths: {
    'jquery': '/components_module/jquery/dist/jquery',
    'angular': '/components_module/angular/angular',
    'ui-route' : '/components_module/angular-ui-router/release/angular-ui-router',
    'animate' : '/components_module/angular-animate/angular-animate',
    'app' : './app',
    'route' : './route'
  },
  shim: {
    jquery : {
      exports: '$'
    },
    angular: {
      exports: 'angular'
    },
    'ui-route' : {
      deps: ['angular'],
      exports: 'ui-route'
    },
    'animate':{
      deps: ['angular'],
      exports: 'ngAnimate'
    },
    app : {
      exports: 'app',
      deps: ['angular']
    }
  }
});

require([  
  'jquery'
  ,'angular'
  ,'ui-route'
  ,'animate'
  ,'route'
  ,'./components/controller/controller'
  ,'./permission'  
  ,'app'], function(app, anguler) {

  //在Angular运行之前获取到用户的permission的映射关系
  var path = 'http://127.0.0.1:3000/api';
  $.get(path + '/getUserInfo', {token: localStorage.token}, function(data){    
    //把用户数据缓存在本地
    localStorage.userInfo = JSON.stringify(data);
    angular.bootstrap(document, ['webapp']);
  })  

});