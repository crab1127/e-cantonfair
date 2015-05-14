define(['app', './menus'], function(app){ 

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider, menus) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $urlRouterProvider.otherwise('/index');

    $stateProvider
      //首页
      .state('index', {
        url: '/index',
        templateUrl: './components/controller/index/index.html'
      })
      //登入
      .state('login', {
        url: '/login',
        templateUrl: './components/controller/login/login.html',
        controller: 'loginCtrl'
      })
      //账号设置
      .state('set', {
        url: '/set',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@set' : {
            templateUrl: './view/template/menu.html'
          },
          'main@set': {
            templateUrl : './components/controller/set/account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      //资料设置
      .state('sets', {
        url: '/sets',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@sets' : {
            templateUrl: './view/template/menu.html'
          },
          'main@sets': {
            templateUrl : './components/controller/set/user.html',
            controller: 'UserCtrl'
          }
        }
      })
       //收货地址
      .state('address', {
        url: '/address',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@address' : {
            templateUrl: './view/template/menu.html'
          },
          'main@address': {
            templateUrl : './components/controller/address/index.html',
            controller: 'AddressCtrl'
          }
        }
      })
      //卖家申请
      .state('applySeller', {
        url: '/applySeller',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@applySeller' : {
            templateUrl: './view/template/menu.html'
          },
          'main@applySeller': {
            templateUrl : './components/controller/applySeller/index.html'
          }
        }
      })
      //商品
      .state('goods', {
        url: '/goods',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@goods' : {
            templateUrl: './view/template/menu.html'
          },
          'main@goods': {
            templateUrl : './components/controller/goods/index.html'
          }
        }
      });
    
    angular.forEach(menus, function(menu){
      //设置子分类
      if ('set' === menu.path) {
        angular.forEach(menu.items, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@set': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
        angular.forEach(menu.hideItems, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@set': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
      }
      //设置子分类
      if ('sets' === menu.path) {
        angular.forEach(menu.items, function(nav){
          $stateProvider.state('sets.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@sets': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
        angular.forEach(menu.hideItems, function(nav){
          $stateProvider.state('sets.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@sets': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
      }
      //商品子分类
      if ('goods' === menu.path) {
        angular.forEach(menu.items, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@goods': {
                templateUrl : './components/controller/'+ nav.template
              }
            }
          })
        })
      }
    })

  })

});