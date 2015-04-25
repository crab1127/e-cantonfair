# validation

Validate 插件为表单提供了强大的验证功能，让客户端表单验证变得更简单，同时提供了大量的定制选项，满足应用程序各种需求。该插件捆绑了一套有用的验证方法，包括 URL 和电子邮件验证，同时提供了一个用来编写用户自定义方法的 API。  

Validation组件使用生态组件，依赖jquery。

## 最佳实践
提供2种调用方式
* DOM。 验证匹配规则写在html
* js。  验证匹配规则写在js

### DOM调用
HTML
        
      
    <form action="" id="form">
      <div class="form-group">
        <label for="email">email</label>
        <input type="text" class="form-control" id="email" name="email" placeholder="请填写正确的邮箱">
      </div>
      <div class="form-group">
        <label for="phone">电话</label>
        <input type="text" class="form-control" id="phone" name="phone" placeholder="请填写手机号码">
      </div>
      ...
      <div class="form"><button class="btn">提交</button></div>
    </form>      
      

JS 

      
    require(['jquery', 'validation'], function($){
      $('#form').validate();
    })
        

### JS调用
      
    require(['jquery', 'validation'], function($){
      $('#form').validate({
        rules: {
          firstname: "required",
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 5
          },
          confirm_password: {
            required: true,
            minlength: 5,
            equalTo: "#password"
          }
        },
        messages: {
          firstname: "请输入姓名",
          email: {
            required: "请输入Email地址",
            email: "请输入正确的email地址"
          },
          password: {
            required: "请输入密码",
            minlength: jQuery.format("密码不能小于{0}个字 符")
          },
          confirm_password: {
            required: "请输入确认密码",
            minlength: "确认密码不能小于5个字符",
            equalTo: "两次输入密码不一致不一致"
          }
        }
      });
    })

## 参数说明
校验规则   

    (1)、required:true               必输字段
    (2)、remote:"remote-valid.jsp"   使用ajax方法调用remote-valid.jsp验证输入值
    (3)、email:true                  必须输入正确格式的电子邮件
    (4)、url:true                    必须输入正确格式的网址
    (5)、date:true                   必须输入正确格式的日期，日期校验ie6出错，慎用
    (6)、dateISO:true                必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
    (7)、number:true                 必须输入合法的数字(负数，小数)
    (8)、digits:true                 必须输入整数
    (9)、creditcard:true             必须输入合法的信用卡号
    (10)、equalTo:"#password"        输入值必须和#password相同
    (11)、accept:                    输入拥有合法后缀名的字符串（上传文件的后缀）
    (12)、maxlength:5                输入长度最多是5的字符串(汉字算一个字符)
    (13)、minlength:10               输入长度最小是10的字符串(汉字算一个字符)
    (14)、rangelength:[5,10]         输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
    (15)、range:[5,10]               输入值必须介于 5 和 10 之间
    (16)、max:5                      输入值不能大于5
    (17)、min:10                     输入值不能小于10

添加规则

     
      //添加一个手机的规则
      $.validator.addMethod('mobile', function(value, element){
        var length = value.length;
        var mobile = /^1[3458]{1}\d{9}$/;
        return this.optional(element) || (length === 11 && mobile.test(value));
      }, '手机号码格式错误')


## 附
*例子*
[例子](/dev/components/component/validation/index.html)

*参考文档*
[jQuery Validate](http://www.tuicool.com/articles/y6fyme)



