### Upload文件上传控件

#### 用法：

```
require(["uploader"], function(Upload){
    var load = new Upload({
        parent : document.querySelector('.upload'),
        action : "http://192.168.200.234:8082/seller_center/fdfsUpload/uploadSingleImage.cf",
        success : function(data){console.log(data)}
    });
    console.log(load);
});
```
### 该组件不用扩展，所以对外只有一个Uploader函数，所有的方法内部隐藏。不提供给实例对象。如有可能，下一个迭代版本中实现html5 webSocket或postMessage处理跨域的iframe信息。鉴于兼容性问题，该版本不考虑。

#### 参数配置
* `!` 必须
* `~` 可选
* `#` 该版本未实现

```
{
  // 装入form的容器 !
  parent : element,
  // action地址，不支持跨域，若要跨域，需要后端接口支持 !
  action : 'action?upladerImg',
  // input的name属性 ~
  fieldName : 'files', 
  // 验证规则 #
  checkReg :　/.+?[jpg|png]/, 
  // 错误信息，可以是后端返回，也可以是前端检测错误 #
  error : function(msg){console.log(msg)},
  // 成功的回调，后端显示~   
  success：function(msg){console.log(msg)}, 
  // 是否回显，默认为null。如果要回显，又需要做兼容。要么前端显示文件，要么后端上传之后显示文件。 #
  preview: element, 
  // input.onchange事件 ~
  changeEvent : fn, 
  // 最大文件大小 #
  maxSize : 2MB,  
  // 是否需要跳转页面 #
  isBlank : true, 
  // 是否多文件上传。如果多文件上传，就在组件内兼容。~
  isMulti : true  
}
```

* 重要说明：
  + 时间原因，该版本只提供了基础功能，用于项目可能需要经过多次版本迭代。
  + 由于低版本浏览器的flash引用的是第三方，所以根本不了解其代码，隐患很大，使用过程需要多次测试。
  + 最好的建议是在低版本中设计isMulti为false。
  + 有时间再去找第三方的成熟的解决方案。
