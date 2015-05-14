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
      'title' : '账号设置',
      'desc' : '卖家信息设置',
      'path': 'set',
      'menberType' : 0,
      'template': 'set/account.html',
      'controller': 'AccountCtrl',
      'items': [
        {
          'id' : 25,
          'title': '安全问题',
          'path': 'securityissue',
          'template': 'set/securityissue.html',
          'controller' : 'SecurityissueCtrl'
        },
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
        }
      ],
      'hideItems' : [
        {
          'id' : 21,
          'title': '找回安全问题',
          'path': 'safetyproblem',
          'template': 'set/safetyproblem.html',
          'controller' : 'SafetyproblemCtrl'
        }
      ]
    }, 
    {
      'id' : 3,
      'title' : '资料设置',
      'desc' : '卖家信息设置',
      'path': 'sets',
      'menberType' : 0,
      'template': 'set/user.html',
      'controller': 'User1Ctrl',
      'items': [
  
        {
          'id' : 31,
          'title': '个人资料',
          'path': 'user',
          'template': 'set/user.html',
          'controller' : 'UserCtrl'
        },
        {
          'id' : 32,
          'title': '公司资料',
          'path': 'company',
          'template': 'set/company.html',
          'controller' : 'CompanyCtrl'
        },
        {
          'id' : 25,
          'title': '商业规则',
          'path': 'sygz',
          'template': 'set/sygz.html',
          'controller' : 'SygzCtrl'
        }
      ]      
    },
     {
      'id' : 5,
      'title': '收货地址',
      'path': 'address',
      'template': 'set/address.html',
      'controller' : 'AddressCtrl'
    },  
    {
      'id' : 4,
      'title': '店铺管理',
      'path': 'shop-manage',
      'template': 'set/shop-manage.html',
      'controller' : 'ShopmanageCtrl'
    },   
   
    {
      'id' : 6,
      'title' : '申请卖家',
      'desc': '卖家身份认证申请',
      'path': 'applySeller',
      'menberType': 0,
      'template': 'applySeller/index.html',
      'controller': 'ApplyCtrl',
    },
    {
      'id' : 7,
      'title': '上传商品',
      'desc' : '商品上传及管理',
      'path': 'goods',
      'menberType': 0,
      'template': 'goods/index.html',
      'controller': 'GoodsCtrl',
      'items': [
        {
          'id': 71,
          'title': '添加新商品',
          'desc' : '商品上传及管理',
          'path': 'add',
          'menberType': 0,
          'template': 'goods/add.html',
          'controller': 'GoodsAddCtrl',
        },
        {
          'id': 72,
          'title': '修改商品',
          'desc' : '商品上传及管理',
          'path': 'modify',
          'menberType': 0,
          'template': 'goods/modify.html',
          'controller': 'GoodsModifyCtrl',
        },
        {
          'id': 73,
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