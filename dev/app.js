define(['angular'], function(angular) { 

  var app = angular.module('webapp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'webapp.Ctrl']);
  // app.config(function ($httpProvider) {
  //    $httpProvider.defaults.transformRequest = function(data){
  //        if (data === undefined) {
  //            return data;
  //        }
  //        return $.param(data);
  //    }
  //    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  // });
  // app.config(function($httpProvider) {
  //   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  //   $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  //   var param = function(obj) {
  //     var query = '',
  //       name, value, fullSubName, subName, subValue, innerObj, i;

  //     for (name in obj) {
  //       value = obj[name];

  //       if (value instanceof Array) {
  //         for (i = 0; i subValue = value[i]; fullSubName = name + '[' + i + ']'; innerObj = {}; innerObj[fullSubName] = subValue; query += param(innerObj) + '&';
  //         }
  //       } else if (value instanceof Object) {
  //         for (subName in value) {
  //           subValue = value[subName];
  //           fullSubName = name + '[' + subName + ']';
  //           innerObj = {};
  //           innerObj[fullSubName] = subValue;
  //           query += param(innerObj) + '&';
  //         }
  //       } else if (value !== undefined && value !== null)
  //         query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  //     }

  //     return query.length ? query.substr(0, query.length - 1) : query;
  //   };
  //   $httpProvider.defaults.transformRequest = [function(data) {
  //     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  //   }];
  // });
  return app
})

