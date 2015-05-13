var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./server/routes/index');


var app = express();

// app.use(express.bodyParser());
// app.use(express.methodOverrider());
// app.use(express.cookieParser());


app.use(express.Router());

app.all('*', function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "GET, POST, DELETE, PUT",
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Max-Age': "60"  
  })
  next();
});

//身份认证
app.get('/api/authenticate', function(req, res){
  // console.log(1, __dirname);
  // res.sendfile('dev/index.html');  

  if (!req.query.name || !req.query.password){
    res.send({"state":"failure"});
    return;
  }
  var data = {
      "message": "success",
      "type": "json",
      "data": {
        "password": null,
        "username": "s2",      
        "userType": 1, 
        "companyId": 273835,
        "userId": 1303191,
        //权限
        "permission": {
          "main": true,
          "set": true,
          "goods": true,
        },
        "token" : 123
      },      
      "status": "success",
      "errorCode": null
    }
  res.send(data);
});

//获取买家个人资料
app.get('/api/getUserInfo', function(req, res){
  
  //验证token
  var token = req.query.token;

  if (token == 123) {
    //获取该用户信息
    var data = {
      "message": "success",
      "type": "json",
      "data": {
        "password": null,
        "username": "s2",      
        "userType": 1, 
        "companyId": 273835,
        "photo": "http://static.acfun.tv/dotnet/artemis/u/cms/www/default/avatarNone.jpg",
        "userId": 1303191,
        "mobile": 18679633373,
        "city": '中国',
        "address": "广东广州市海珠区城区琶洲",
        "postcode": 336600,
        "fax": 368448544,
        "msn": '',
        "qq": 191815416,
        //权限
        "permission": {
          "main": true,
          "set": true,
          "goods": true,
        },
        "token" : 123
      },      
      "status": "success",
      "errorCode": null
    }
    res.send(data);
  } else {
    var data = {
      "message": "账号或者密码错误",
      "type": "json",
      "data": {},      
      "status": "error",
      "errorCode": null
    }
    res.send(data);
  }
  
});

//修改邮箱
app.get('/Modifyemail', function(req, res){
  if('123456@qq.com' === req.query.odd) {
    var data = {
      "message": "验证信已发送到您的邮箱 " + req.query.new+ " ，请点击验证信中的“确认修改邮箱”，即可完成修改。",
      "type": "json",
      "data": {},      
      "status": "success",
      "errorCode": null
    }
    res.send(data);
  } else {
    var data = {
      "message": "修改失败",
      "type": "json",
      "data": {},      
      "status": "error",
      "errorCode": null
    }
    res.send(data);
  }
})

app.get('/getCode', function(req, res) {
  if (req.query.mobile) {
    var data = {
      "message": "验证码已经发到 " + req.query.mobile+ " 中，360秒内有效。",
      "type": "json",
      "data": {},      
      "status": "success",
      "errorCode": null
    }
    res.send(data);
  } else {
    var data = {
      "message": "验证码发送失败",
      "type": "json",
      "data": {},      
      "status": "error",
      "errorCode": null
    }
    res.send(data);
  }
})
app.get('/modifymobile', function(req, res) {
  if (req.query.cur && req.query.code && req.query.new && req.query.code == 123456) {
    var data = {
      "message": "修改手机成功",
      "type": "json",
      "data": {},      
      "status": "success",
      "errorCode": null
    }
    res.send(data);
  } else {
    var data = {
      "message": "修改手机失败",
      "type": "json",
      "data": {},      
      "status": "error",
      "errorCode": null
    }
    res.send(data);
  }
})
//添加/更新买家个人资料
app.post('/buyer/saveBuyerInfo', function(req, res){
  var data = {
      "message": "保存成功",
      "type": "json",
      "data": {},      
      "status": "success",
      "errorCode": null
    }
    res.send(data);
})

// //添加/更新买家公司信息
// app.post('/buyer/saveBuyerCompInfo', function(req, res){

// })

// //获取卖家公司信息
// app.get('/buyer/getBuyerComp', function(req, res){

// })

// //添加买家地址
// app.post('/buyer/saveBuyerAddr', function(req, res){

// })

// //获取买家收货地址
// app.get('/buyer/getBuyerComp', function(req, res){
//   var data = {
//     "message": "", 
//     "type": null, 
//     "data": [
//         {
//           "name" : "周",
//           "area" : "广东广州市海珠区城区",   
//           "address" : "凤浦中路679号广交会大厦",
//           "mobile" : "18679966673"
//           "email": "191815416@qq.com"   
//         },
//         {
//           "name" : "赵",
//           "area" : "广东广州市海珠区城区",   
//           "address" : "凤浦中路679号广交会大厦",
//           "mobile" : "18679966673"
//           "email": "191815416@qq.com"   
//         },
//         {
//           "name" : "李",
//           "area" : "广东广州市海珠区城区",   
//           "address" : "凤浦中路679号广交会大厦",
//           "mobile" : "18679966673"
//           "email": "191815416@qq.com"   
//         },
//         {
//           "name" : "王",
//           "area" : "广东广州市海珠区城区",   
//           "address" : "凤浦中路679号广交会大厦",
//           "mobile" : "18679966673"
//           "email": "191815416@qq.com"   
//         }
//     ], 
//     "status": "success", 
//     "errorCode": null, 
//     "page": {
//         "total": 0, 
//         "page": 1, 
//         "pageSize": 10, 
//         "maxPage": 0
//     }
//   };

//   res.send(data)
// })

app.listen(3000);
module.exports = app;