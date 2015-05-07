define(['app'], function(app){
  app.constant('menus', [
    {
      'id' : 1,
      'title' : '首页',
      'path' : 'index',
      'menberType' : 2, //0：采购商 1：经销商  2：通用 
      'template': 'index/index.html',
      'controller': 'IndexCtrl'
    },    
    {
      'id' : 2,
      'title' : '设置',
      'desc' : '卖家信息设置',
      'path': 'set',
      'menberType' : 0,
      'template': 'set/index.html',
      'controller': 'SetCtrl',
      'items': [
        {
          'id' : 21,
          'title': '账号设置',
          'path': 'account',
          'template': 'set/account.html',
          'controller' : 'AccountCtrl'
        },
        {
          'id' : 22,
          'title': '个人资料',
          'path': 'user',
          'template': 'set/user.html',
          'controller' : 'UserCtrl'
        },
        {
          'id' : 23,
          'title': '公司资料',
          'path': 'company',
          'template': 'set/company.html',
          'controller' : 'CompanyCtrl'
        },
        {
          'id' : 24,
          'title': '收货地址',
          'path': 'address',
          'template': 'set/address.html',
          'controller' : 'AddressCtrl'
        }
      ],
      'hideItems' : [
        {
          'id' : 26,
          'title': '修改邮箱',
          'path': 'modifyemail',
          'template': 'set/changEmail.html',
          'controller' : 'ModifyemailCtrl'
        },
        {
          'id' : 27,
          'title': '修改手机',
          'path': 'modifymobile',
          'template': 'set/changMobile.html',
          'controller' : 'ModifymobileCtrl'
        },
        {
          'id' : 28,
          'title': '修改密码',
          'path': 'modifypassword',
          'template': 'set/changPassword.html',
          'controller' : 'ModifypassCtrl'
        },
      ]
    },    
    {
      'id' : 3,
      'title' : '申请卖家',
      'desc': '卖家身份认证申请',
      'path': 'applySeller',
      'menberType': 0,
      'template': 'applySeller/index.html',
      'controller': 'ApplyCtrl',
    },
    {
      'id' : 4,
      'title': '上传商品',
      'desc' : '商品上传及管理',
      'path': 'goods',
      'menberType': 0,
      'template': 'goods/index.html',
      'controller': 'GoodsCtrl',
      'items': [
        {
          'id': 41,
          'title': '添加新商品',
          'desc' : '商品上传及管理',
          'path': 'add',
          'menberType': 0,
          'template': 'goods/add.html',
          'controller': 'GoodsAddCtrl',
        },
        {
          'id': 42,
          'title': '修改商品',
          'desc' : '商品上传及管理',
          'path': 'modify',
          'menberType': 0,
          'template': 'goods/modify.html',
          'controller': 'GoodsModifyCtrl',
        },
        {
          'id': 43,
          'title': '商品管理',
          'desc' : '商品上传及管理',
          'path': 'manage',
          'menberType': 0,
          'template': 'goods/manage.html',
          'controller': 'GoodsManageCtrl',
        }
      ]
    }
  ])
})