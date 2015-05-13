define(['angular'], function(angular) { 

  var app = angular.module('webapp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'webapp.Ctrl']);

  // var path = 'http://127.0.0.1:3000/api';

  // app.factory('userinfo', ['$http', '$q', function($http, $q){
  //   var userinfo = {};
  //   $.ajax({
  //     url: path + '/getUserInfo',
  //     async: false,
  //     cache: false,
  //     success: function (jData) {
  //       if (jData.status && jData.status === 'success') {
  //         userinfo = jData;          
  //       }        
  //     }
  //   });
  //   return userinfo
  // }]);

  // app.run('name', ['', function(){
    
  // }])

  return app		
})