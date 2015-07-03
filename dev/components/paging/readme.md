### ajax分页组件

设计参数：
```
    // 总共多少条数据
    itemTotal: 2000,

    // 每页生成多少条
    pageItem: 6,
    // 显示的按钮的数量
    showBtns: 16,
    // 缓存当前页之后多少条数据
    cache: 10,
    url: "",
    parent: $('body'),
    disabledCls : "disable",
    currentCls: "current",
    current: 1,
    // 分页按钮模版
    htmlTpl: "<li class=\"btn\">$</li>",
    // 添加一个内部标识符，用于事件监听时判定
    innerClass: "innerClass-" + tools.random(100, 1000, 2).join(""),
    // prev的内容
    prevText: "上一页",
    nextText: "下一页",
    success: function (data) {
    },
    error: function (msg) {
    }
```
调用方法
```
    require(['paging'], function(Page){
        console.log(new Page({
            parent:$('#page')
        });
    });
```
