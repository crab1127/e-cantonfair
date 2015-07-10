### Dialog组件文档
[Demo链接](/dev/components/dialog/index.html)

* 依赖：`require.js` `dialog.css` 
* 调用方式：
```
  require(['dialog'], function (dialog){
     dialog.alert(msg, fn);
  }
```

该文档分为两部份：
* 用户文档：用于调用者查看
* 开发者文档：用于二次开发或扩展查看

### 用户文档
* `alert(msg, fn)`：模拟原生`window.alert`方法
> 参数说明
  * @params {String} msg - 显示在弹出窗口上的内容
  * @params { ? Function} fn - 点击`确定`按钮之后的回调

* `confirm(msg, fn)`：模拟原生`window.confirm`方法
> 参数说明
  * @params {String} msg - 显示在弹出窗口上的内容
  * @params { ? Function} fn - 点击`确定`按钮之后的回调
  
* `prompt(msg, defaultVal, fn)`：模拟原生`window.prompt`方法
> 参数说明
  * @params {String} msg - 显示在弹出窗口上的内容
  * @params {String} defaultVal - 默认值
  * @params { ? Function} fn - 点击`确定`按钮之后的回调。组件会将用户输入的值传回给回调函数，使用者在回调函数中操作用户输入的值。
  
-----------

### 开发者文档
* 版本号：0.1.0.20150615_beta
> 目前主版本是0，次版本是1，修正版本0。当前版本是测试版，如要用于项目，请反复测试不同环境下是否有问题。
* 开发过程测试环境：__ chrom 43.0.2357.124 m __

* 设计说明：  
所有基于`Dialog`的组件的Dom都由两个部份组成：`baseDom`和`customDom`。皆缓存在`cache.doms`对象上:

```
 this.cache = {
     doms:{
         baseDom : {},
         customDom : {}
     },
     events:{
         baseEvent : {},
         customEvent: {}
     }
 };
```

+ `baseDom`表示其基本结构，原则上来说，不允许修改这些Dom的。在后面的版本迭代中，可能会隐藏baseDom，
所以开发者不要去操作这些dom，只能通过开放的api和配置参数去操作。任何一个`Dialog`都有这些基本结构：
  * `dialog` : 最外层的容器
  * `box` : 该容器主要用于css设计
  * `header` : 头部
  * `body` : 主体
  * `footer` : 底部
  
><div style="border:1px dotted #0cc;text-align:center;">
>   <div>header</div>
>   <div style="border-top:1px dotted #ccc;padding:50px 0;">body</div>
>   <div style="border-top:1px dotted #ccc;">footer</div>   
><div>

#### Notes: dialog和box在最外层，html结构为：.dialog > .box > .header + .body + .footer

+ `customDom`是开放给开发者配置，__ 每一个配置参数，默认都生成的是`div`元素。后期版本中会开放一个属性，用于设置`tagName` __。
  * header ： `{attr : 'class="aa" data-tt="tt"', content : "", event:{"click" : function(){//do sth}}}`
  * body : 同上
  * footer : 同上
  * 属性值说明：  
  >  * attr : 设置元素的属性
  >  * content : 设置元素的内容。目前只支持Jquery.append方法能够支持的参数。在下一个__修订版本__中，会支持子集元素配置。
  >   ```
  >    {attr : 'class="aa"', content : {
  >        child_1 : {attr : 'class="aa"', content : {}, event : {}}
  >    }, event : {}}
  >   ```
  >  * event : 接受 `Jquery.on` 方法的参数

events对象在该版本中，并没有收集用户定义的event。主要是因为该版本提供的3个组件，都没有自定义的事件函数啊...  
开发者基于该组件创建其他组件的时候，这个cache就有用了。  

该组件目前只有一个基类`Dialog`。开发者可以通过该类快速生成一个Dialog组件的Dom。只需传入一个配置参数即可。  
组件会将生成的Dom缓存下来，保存在该对象上，给开发者使用。  

其默认的配置参数如下：

```
	this.DEFAULT_CONFIG = {
      parent : $("body"),
      // 基础结构配置
      BASE_CONF : {
          dialog : util.createConfig('class="dialog"', null, {}),
          box : util.createConfig('class="box"', null, {}),
          header : util.createConfig('class="header"', null, {}),
          body : util.createConfig('class="body"', null, {}),
          footer : util.createConfig('class="footer"', null, {})
      },
      // 自定义配置
      CUSTOM_CONF : {
          header : util.createConfig('class="header"', "header content", {}),
          body : util.createConfig('class="body"', "body content", {}),
          footer : util.createConfig('class="footer"', "footer content", {})
      }
  };
  // util.createConfig代码如下
  // 返回一个配置参数的对象{attr:attr, event : {}, ? content : ""}
  function(attr, con, eventObj){
      var ret = {};
      ret.attr = util.isString(attr) ? attr : "";
      ret.event = util.isObjectLiterals(eventObj) ? eventObj : {};
      if(con != null){
          ret.content = con;
      }
      return ret;
  }
```
* 调用方法

```
    require(['dialog'], function( dialog ){
        var Dialog = dialog.Dialog,
            $ = dialog.$;
        var conf = {
            parent : $('.dialog'),
            customConf:{
                header : {
                    attr : "class=\"a\"",                   // 属性
                    // content可以为htmp碎片，Dom节点
                    content : "123",                        // 内容
                    event : { click, function(){//do sth}}  // 事件
                },
                body : {},
                footer : {}
            }
        };
        var dialog = new Dialog(conf);
        dialog.init();  // 初始化组件，生成html、绑定事件，执行回调等
        dialog.show();  // 显示组件
    });
```

* 开放API
  + animate(wrap)
    > 设置弹出动画。开发者可以复写该函数，用于改变默认的动画效果。该函数必须返回wrap，否则报错。
    > wrap为`baseDom.dialog`
    
  + bindDomEvent(doms, events)
    > 绑定事件
    > doms为一个对象{header : jqueryObj}
    > events 为一个对象 {header : {"click" : function(){}}}
    > 也可以用数组存储doms和events，但是需要下标一一对应
    
  + close(fn)
    > 关闭组件，与hide方法不同，hide只是用样式隐藏掉dom。close是从内存和缓存上直接删除该对象
    > 删除完成后，执行fn
    
  + domCreatedCallback(doms)
    > 开发者最重要的函数
    > 在一个组件init之后调用，此时，组件所有的dom都已创建完成
    > doms包含了baseDom和customDom
    
  + fillDoms(conf)
    > 填充baseDom，具体调用方法看源码
    
  + getBaseDomEvent()
    > 获取baseDom定义的事件函数的map
    
  + getCustomDomEvent()
    > 获取customDom定义的事件函数的map

  + getEventMap(conf)
    > 返回配置参数中的event对应的map
    
  + hide(fn)
    > 隐藏面版，执行回调
  + init()
    > 初始化一个组件，具体内容看源码
    
  + mixConfig(conf)
    > 根据conf混淆参数，如果conf中没有配置，则以this.DEFAULT_CONFG为准。
    
  + show(fn)
    > 显示组件

#### 【所有的dialog组件都需要手动init之后，再调用show方法，才会显示在页面上】



