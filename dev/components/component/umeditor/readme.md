# ueditor

写一个富文本编辑器工程实在太过浩大， 就直接引用第三方编辑器。  

UEditor是由百度web前端研发部开发所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码  

UEditor优点
* 功能全面
* 开源免费
* 专业稳定

## 快速上手

html
    
        
    <script type="text/plain" id="myEditor" style="width:1000px;height:240px;">
        <p>这里我可以写一些输入提示</p>
    </script>   
        

js
    
    //定义别名   
    require.config({
    paths: {
        'jquery' : '/components_module/jquery/jquery',
        'umeditor': '/components_module/umeditor/dist/utf8-jsp/umeditor',
        'umeditor-config': '/components_module/umeditor/dist/utf8-jsp/umeditor.config',
        'umeditor-lang': '/components_module/umeditor/dist/utf8-jsp/lang/zh-cn/zh-cn',
        'umeditor-css' : '/components_module/umeditor/dist/utf8-jsp/themes/default/css/umeditor'
    },
    shim: {
        jquery:{
          exports: '$',
        },        
        umeditor : {
          exports: 'UM',
          deps: ['jquery']
        },
        'umeditor-lang' : {
          deps: ['umeditor']
        },
        'umeditor-config' : {
          deps: ['umeditor']
        }
      },
      map: {
        '*' : {
          'css': '/components_module/require-css/css.js'
        }
      }
    });
        
    //实例化
    require(['jquery', 'umeditor', 'umeditor-config', 'umeditor-lang', 'css!umeditor-css'], function($, UM){        
        var um = UM.getEditor('myEditor');
    })

## api 

> 见范例与官网     

[api](http://ueditor.baidu.com/doc)

## 附

使用范例  
[例子](/dev/components/component/umeditor/index.html)

官网  
[http://ueditor.baidu.com/website/index.html](http://ueditor.baidu.com/website/index.html)
