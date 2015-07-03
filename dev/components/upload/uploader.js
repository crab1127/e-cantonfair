/**
 * Upload
 * 参数定义大致如下：
 * {
 *   parent : element,  // 装入form的容器
 *   action : 'action?upladerImg',
 *   fieldName : 'files', // input的name属性
 *   checkReg :　/.+?[jpg|png]/, // 验证规则
 *   error : function(msg){console.log(msg)},   // 错误信息，可以是后端返回，也可以是前端检测错误
 *   success：function(msg){console.log(msg)}, // 成功的回调，后端显示
 *   preview: element, // 是否回显，默认为null。如果要回显，又需要做兼容。要么前端显示文件，要么后端上传之后显示文件。
 *   changeEvent : fn, // input.onchange事件
 *   maxSize : 2MB,  // 最大文件大小,
 *   isBlank : true, // 是否需要跳转页面
 *   isMulti : true  // 是否多文件上传。如果多文件上传，就在组件内兼容。
 * }
 *
 * 该组件不用扩展，所以对外只有一个Uploader函数。
 */

define(['swfobject'], function(swfobject){

    function Upload(conf){
        this.version = '0.1.0.20150617_beta';
        this.timer = new Date * 1;
        this.DEFAULT_CONFIG = {
            parent : document.body || document.documentElement.body,
            action : "",
            fieldName: "files",
            checkReg : /\.jpg|png|jpeg|gif/,
            error : function(msg){console.log(msg)},
            success : function(msg){console.log(msg)},
            changeEvent : function(val){console.log(val)},
            preview : null,
            isMulti : true,

            // 内部配置
            inputId : 'upload' + this.timer,
            formId : 'form' + this.timer,
            iframeId : 'iframe' + this.timer,
            crossOrigin : false,
            parentId : null
        };

        this.cache = {
            doms : {}
        };
        this.config = {};
        this.init(conf || {});
        this.init = null;
    }

    Upload.prototype.init = function(conf){
        var _this = this,
            _conf = this.config,
            _doms = this.cache.doms;

        // 混淆参数
        this.config = Upload.mixConfig(conf, this.DEFAULT_CONFIG);
        // 生成html
        Upload.generateHtml(this.config);
        // 选出需要操作的dom元素，比如file, preview的Dom
        Upload.getDoms(this.config, this.cache);
        // 绑定事件
        Upload.bindDomEvent(this.cache.doms, {
            "input" : { "change" : function(){
                    _this.config.changeEvent(this.files);
                    _this.cache.doms.form.submit();
                }
            },

            "iframe" : { "load" : function(data) {
                     _this.config.success(Upload.getResponsText(_this.cache.doms.iframe));
                    Upload.removeDom(_this.config.parent, {"iframe" : _doms.iframe});
                },
                "error" : function(data){
                    console.log('erorr debug');
                    _this.config.error(Upload.getResponsText(_this.cache.doms.iframe));
                }
            }
        });
    };

    Upload.generateHtml = function(conf){

        // 创建单文件上传form或多文件上传
        Upload["generate" + (conf.isMulti ? "Multi" : "Sigle") + "FilesHtml"](conf);
    };

    Upload.getDoms = function(conf, cache){
        var props = {"input":null, "form" : null, "iframe" : null};
        for(var prop in props){
            if(!props.hasOwnProperty(prop)) continue;
            cache.doms[prop] = document.getElementById(conf[prop + 'Id']);
        }
    };

    Upload.bindDomEvent = function(doms, events){
        for(var key in events){
            if(!events.hasOwnProperty(key)) continue;
            for(var _key in events[key]){
                if(!events[key].hasOwnProperty(_key)) continue;
                doms[key]["on" + _key] = events[key][_key];
            }
        }
    };

    Upload.generateMultiFilesHtml = function(conf){
        // 如果是多文件上传，需要判断浏览器是否支持多文件上传
        // 检测浏览器是否支持multiple属性
        var file = document.createElement("input"),
            supportMultiple = "multiple" in file,
            html = [];

        // 如果浏览器支持multiple，就用multiple。
        // 否则用flash替代方案
        if(supportMultiple){
            // 这里设计得有点问题，这个方法名应该改下
            // 因为如果支持html5的话，只需要改变mutiple属性即可，不需要另建立一个方法
            Upload.generateSigleFilesHtml(conf);
        }else{
            showFlash(conf);
        }
    };

    Upload.generateSigleFilesHtml = function(conf){
        return Upload.generateForm(conf, Upload.generateInput(conf));
    };

    Upload.generateForm = function(conf, content){
        return (conf.parent.innerHTML = '<form action="' + conf.action
               + '" enctype="multipart/form-data"'
               + ' id="' + conf.formId + '"'
               + ' target="' + conf.iframeId + '"'
               + ' method="post" accept-charset="utf-8">'
               + content
               + '</form>'
               // iframe，阻止页面跳转
               + '<iframe id="' + conf.iframeId + '" name="'+ conf.iframeId
               + '" src="about:blank" style="position:absolute;visibility:hidden;"></iframe>');
    };

    Upload.generateInput = function(conf){
        return '<input type="file" id="'
               + conf.inputId + '" name="'
               + conf.fieldName
               + (conf.isMulti ? '" multiple="multiple"' : "")
               + '"/>';
    };

    Upload.mixConfig = function(conf, defConf){
        for(var key in defConf){
            if(!defConf.hasOwnProperty(key)) continue;
            conf[key] = conf.hasOwnProperty(key)
                ? conf[key]
                : defConf[key];
        }
        conf.parentId = conf.parent.id
            || (conf.parent.id = 'parentId' + new Date * 1);
        return conf;
    };

    Upload.getResponsText = function(iframe){
        var data = {}, contentProp;
        if(iframe === null)
            return data;

        contentProp = iframe.contentWindow
            ? "contentWindow" : "contentDocument";
        data.responseText = iframe[contentProp].document.body
            ? iframe[contentProp].document.body.innerHTML : null;

        return data;
    };

    Upload.removeDom = function(context, cache){
        if(!(context && context.removeChild)) return;

        for(var prop in cache){
            if(!cache.hasOwnProperty(prop)) continue;
            try{
                context.removeChild(cache[prop]);
            }catch(e){
                console.log(e);
            }
        }
    };

    /* 引入false兼容低版本浏览器 */

    function showFlash(conf) {
        var params = {
            serverUrl: conf.action,
            jsFunction: "flashReturn",
            imageWidth: 300,
            // filter: '',
            maxFileCount: 10,
            maxFileSize: 2048 * 1024,
            imageHeight: 186,
            imageQuality: 80,
            uploadText: '上传文件',
            cancelText: '取消',
            labelFormat: '已上传{%}'
        };
        swfobject.embedSWF("mFileUpload.swf", conf.parentId, "80", "30", "10.0.0", "expressInstall.swf", params);
    }

    function flashReturn(type, str) {
        console.log(type, str);
    }

    return Upload;
});