/*regisPage*/
require.config({
      //baseUrl: "http://192.168.200.15:3333",
      paths: {
          'jquery': 'http://192.168.200.15:3333/components_module/jquery/jquery',
          'validation' : 'http://192.168.200.15:3333/components_module/jquery-validation/dist/jquery.validate',
          'validation-lang' : 'http://192.168.200.15:3333/components_module/jquery-validation/src/localization/messages_zh'
      },
      shim: {
          jquery : {
            exports: '$'
          },
          'validation': {
            deps: ['jquery']
          },
          'validation-lang': {
            deps: ['jquery', 'validation']
          }
        }
    });

require(['jquery', 'validation','validation-lang'], function($){
     $('#form-registerPage').validate({
        rules:{
          name: "required",
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 6
          },
          confirmPwd: {
            required: true,
            minlength: 6,
            equalTo: "#password"
          }
        },
        messages: {
          name: "请输入姓名",
          email: {
            required: "请输入Email地址",
            email: "请输入正确的email地址"
          },
          password: {
            required: "请输入密码",
            minlength: $.validator.format("密码不能小于{0}个字符")
          },
          confirmPwd: {
            required: "请输入确认密码",
            minlength: "确认密码不能小于6个字符",
            equalTo: "两次输入密码不一致不一致"
          }
        }
     });

     $('#form-phoneNumTest').validate({
        rules: {
          country: "required",
          phone: "required",
          mobile: "required",
          code: "required"
        },
        messages: {
          country: "请选择国家",
          phone: "请输入号码",
          mobile: "请输入手机号码",
          code: "请输入号码"
        }
     });

     $('#form-loginNewPage').validate({
        rules: {
          name: "required",
          password: "required",
          code: "required"
        },
        messages: {
          name: "请输入名字",
          password: "请输入密码",
          code: "请输入验证码"
        }
     });

     $('#form-verifyMailbox').validate({
        rules: {
          email: "required",
          code: "required"
        },
        messages: {
          email: "请输入Email地址",
          code: "请输入验证码"
        }
     });

     $('#form-forgetPwd4').validate({
        rules: {
          password: {
            required: true,
            minlength: 6
          },
          confirmPwd: {
            required: true,
            minlength: 6,
            equalTo: "#password"
          }
        },
        messages: {
          password: {
            required: "请输入密码",
            minlength: $.validator.format("密码不能小于{0}个字符")
          },
          confirmPwd: {
            required: "请输入确认密码",
            minlength: "确认密码不能小于6个字符",
            equalTo: "两次输入密码不一致不一致"
          }
        }
     });

     $('#form-forgetPwd').validate({
        rules: {
          name: "required",
          code: "required"
        },
        messages: {
          name: "请输入姓名",
          code: "请输入验证码"
        }
     });
})
