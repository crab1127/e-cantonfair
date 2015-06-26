define(['app'], function(app){
  app.constant('menus', {
    "base": [
      {
        "id" : 0,
        "title" : "Class",
        "desc" : "提供 OO 实现",
        "isFinish" : false
      }
    ],
    "util": [
      {
        "id" : 1,
        "title" : "cookie",
        "desc" : "提供cookie操作方法",
        "isFinish" : true
      },
      {
        "id" : 2,
        "title" : "template",
        "desc" : "模板渲染,一些ajax，ui控件的渲染",
        "isFinish" : true
      },
      {
        "id" : 3,
        "title" : "upload",
        "desc" : "上传，提供h5与falsh方式",
        "isFinish" : true
      },
      {
        "id" : 4,
        "title" : "md5",
        "desc" : "加密",
        "isFinish" : true
      },
      {
        "id" : 5,
        "title" : "validation",
        "desc" : "表单验证",
        "isFinish" : true
      },
      {
        "id" : 6,
        "title" : "delayload",
        "desc" : "延迟加载",
        "isFinish" : false
      },
      {
        "id" : 7,
        "title" : "highcharts",
        "desc" : "图表库",
        "isFinish" : true
      },
      {
        "id" : 8,
        "title" : "umeditor",
        "desc" : "编辑器",
        "isFinish" : true
      },
      // {
      //   "id" : 9,
      //   "title" : "rq",
      //   "desc" : "生成二维码",
      //   "isFinish" : false
      // },
      // {
      //   "id" : 10,
      //   "title" : "browser",
      //   "desc" : "浏览器升级提示",
      //   "isFinish" : false
      // },
      {
        "id" : 13,
        "title" : "req",
        "desc" : "获取路径的参数",
        "isFinish" : true
      },
        {
            "id" : 15,
            "title" : "tools",
            "desc" : "工具函数",
            "isFinish" : true
        }
    ],
    "ui" : [
      {
        "id" : 11,
        "title" : "dialog",
        "desc" : "弹窗",
        "isFinish" : true
      },
      {
        "id" : 12,
        "title" : "tab",
        "desc" : "选项卡",
        "isFinish" : false
      }, {
        "id" : 13,
        "title" : "slide",
        "desc" : "幻灯片",
        "isFinish" : true
      },
      {
        "id" : 14,
        "title" : "paging",
        "desc" : "ajax分页",
        "isFinish" : true
      }
    ]
  })
})