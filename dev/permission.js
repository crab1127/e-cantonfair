// 身份验证
// 权限控制

define(['app'], function(app){
  //var permissionList = localStorage.userinfo;
  app.run(function(permissions){
    permissions.setPermissions(localStorage.userinfo);
  })

  //用户
  app.factory('userService', function(){
    var userInfo = JSON.parse(localStorage.userInfo),
        user = {};
    if ('success' !== userInfo.status) {
      user.isLogin = false;
    } else {

      user = userInfo.data
      user.name = userInfo.data.username;
      user.isLogin = true;
    }
    return user
  })

  //在取得当前用户的权限集合后,我们将这个集合存档到对应的一个service中
  app.factory('permissions', ['$rootScope', function($rootScope){
    var permissionList;
    return {
      setPermissions : function(permissions) {
        permissionList = permissions;
        //通过$broadcast广播事件,当权限发生变更的时候.
        $rootScope.$broadcast('permissionsChanged')
      }
    }
  }]);

  //

})

