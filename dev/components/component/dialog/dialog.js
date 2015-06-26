/**
 * Dialog组件，提供`alert`, `confirm`, `propmpt`三种组件。
 *
 * 另外开放一个基础的`Dialog`，包含`header`, `body`, `footer` 三个基础的Dom结构
 * 并提供一个`devoperCallBack`函数，将三个基础Dom结构作为回调的参数传入
 *
 * */


/**
 * 理一理设计：
 * 如果扩展性要好，那么可制定程度就要很高才行。
 * 一个dom元素可能出现的操作大致分为：属性、内容、事件。对应配置的key设置attr\content\event
 * 如果这三个可以完全定制的话，再将生成后的Dom对象开放给调用者，那么可扩展性就高很多了。
 *
 * 用户如何配置：
 * 传入的参数中，至少要包含一个parent，作为dialog的容器。
 * 且dialog, box, header, body, footer这五个Element用户也可能要自定义。
 * 为了保持Dom结构完整，用户能够操作的，只有header, body, footer这三个节点。
 *
 * 配置参数大致的形式如下：
 * {
 *   parent : Element,
 *   // 基础Dom节点配置，只可配置属性值和事件，不可配置内容
 *   baseConf : {
 *      dialog : {attr : "",event : {type : fn}},
 *      box : {attr : "",event : {type : fn}},
 *      header : {attr : "",  event : {type : fn}},
 *      body : {attr : "",  event : {type : fn}},
 *      footer : {attr : "",  event : {type : fn}},
 *   },
 *
 *   // 自定义节点，只能自定义header\body\footer三个dom中的内容
 *   customConf : {
 *      // 表示是向header中添加内容
 *      header : {
 *        title : {attr : 'class="title"', content : "this is a simple title"}
 *        closeBtn : {attr : 'class="btn icon-close"' content : "", event : {"click", function(){this.close()}}
 *      },
 *
 *      //
 *      body : {},
 *      //
 *      footer : {}
 *   }
 * }
 */

define(['jquery'], function($){

    function isType(type){
        return function(obj){
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }

    function noop(){}

    /* 建立一个缓存对象，用于缓存生成的Dialog对象 */
    var dialogs = {
        version : '0.1.0.20150615_beta',
        // dialog的通用标题
        title : window.location.hostname + '的提示信息',
        // alert\confirm\prompt通用parent
        parent : $('body'),
        // 清除缓存
        clean : function(key){
            if(dialogs[key]){
                dialogs[key] = null;
                delete dialogs[key];
            }
        }
    };

    var util = {
        isArray : isType("Array"),

        isObjectLiterals : function(obj){
            return obj && isType("Object")(obj);
        },

        isFunction : isType("Function"),

        isString : isType("String"),

        createDiv : function(attr, content, callback){
            var ret =  $("<div"
                    + (util.isString(attr) ? " " + attr : "")
                    + ">"
                    + "</div>");
            ret.append(content ? content : "");
            util.isFunction(callback) && callback();
            return ret;
        },

        /**
         * 混淆两个对象源
         * 规则：
         * 如果dest中没有origin中的key，则添加origin中对应的数据
         * 所以dest中的key都不会被覆盖，只是被补充。
         * @param origin
         * @param dest
         * @returns {object}
         */

        mix : function(origin, dest){
            util.ergodic(origin, function(key, val){
                dest[key] = dest.hasOwnProperty(key) ? dest[key] : val;
            }, null);
            return dest;
        },

        /**
         * callback的返回值为false的时候，停止遍历。
         * 返回undefined的时候，不会停止
         * @param obj
         * @param callback
         * @param scope
         * @returns {undefined}
         */

        ergodic : function(obj, callback, scope){
            if(!(util.isObjectLiterals(obj) || util.isArray(obj))
               || !util.isFunction(callback)){
                return undefined;
            }

            for(var key in obj){
                if(!obj.hasOwnProperty(key)) continue;
                if(callback.call(scope, key, obj[key], obj) === false){
                    break;
                }
            }
        },

        /**
         * config 要包含BaseDom的属性信息，格式如下
         * {
         *      dialog : {},
         *      box : {},
         *      header : {
         *        attr : 'class="color-red" data-attr="testAttr"',
         *        content : "some simple text here",
         *        fn : {"click", function(){//todo}}
         *      },
         *      body:{...},
         *      footer:{...}
         * }
         * @param {?Object} conf
         */

        createBaseDom : function(conf){
            var baseDom = {}, cur;

            util.ergodic(conf, function(key, val){
                cur = util.createDiv(val.attr, val.content, null);
                cur && cur.on(val.fn);
                baseDom[key] = cur;
            }, null);

            baseDom.dialog.append(baseDom.box).hide();
            baseDom.box.append(baseDom.header);
            baseDom.box.append(baseDom.body);
            baseDom.box.append(baseDom.footer);
            return baseDom;
        },

        createCustomDom : function(conf){
            var customDom = {}, cur;
            util.ergodic(conf, function(key, val){
                customDom[key] = util.createDiv(
                    val.attr || "",
                    val.content || "",
                    noop
                );
            }, null);
            return customDom;
        },

        /**
         * 向一组elements中添加内容
         * @param elements - 一个数组或者object。保存的是Jquery对象的element。
         * @param contents - 一个数组或者object。存储的是Jquery对象的append方法能够接收的参数。
         */
        append : function(elements, contents){
            if(!(
                (util.isArray(elements)
                 || util.isObjectLiterals(elements))
                && contents)){
                return elements;
            }

            util.ergodic(elements, function(key, val){
                val && val.append && val.append(contents[key] || "");
            }, null);
        },

        /**
         * 建立config对象，每一个对象的key一致
         * @param attr
         * @param con - 如果为null，则不会生成content属性
         * @param eventObj
         * @returns {{attr: *, content: *, fn: *}}
         */

        createConfig : function(attr, con, eventObj){
            var ret = {};
            ret.attr = util.isString(attr) ? attr : "";
            ret.event = util.isObjectLiterals(eventObj) ? eventObj : {};
            if(con != null){
                ret.content = con;
            }

            return ret;
        },


        /**
         * 获取一个对象字面量的key的层级关系，并将其传给回调。
         * @param obj - 基准对象，用于递归传参
         * @param callback - 回调函数
         * @param recor - 记录key的对象，为一个Array对象
         * @param baseObj - 基准对象，用于传给回调
         * @param compObj - 比较对象，传结回调调用
         */
        getObjKeysCascade : function(obj, callback, recor, baseObj, compObj){
            var key, cur;
            if(!util.isFunction(callback)) return;

            if(obj && typeof obj === "object"){
                for(key in obj){
                    if(!obj.hasOwnProperty(key)) continue;
                    recor.push(key);
                    cur = obj[key];
                    if(cur && typeof obj === "object"){
                        util.getObjKeysCascade(cur, callback, recor, baseObj, compObj);
                    }
                    // 将记录的层级关系数组传入回调
                    callback(baseObj, compObj, recor);
                    recor.pop();
                }
            }
        },

        /**
         * 比较函数：如果compObj中不包含baseObj中的值，则将baseObj的值赋给compObj。
         * @param baseObj
         * @param compObj
         * @param keyArr - 表示子父级关系的key的对象
         */
        compare : function(baseObj, compObj, keyArr){
            var base = baseObj, comp = compObj, i, len, key;
            for( i = 0, len = keyArr.length; i < len; i++){
                key = keyArr[i];
                // 如果比较对象没有基准对象对应的key，将基准对象的值赋值给比较对象
                // 并跳出循环
                if(!comp.hasOwnProperty(key)){
                    comp[key] = base[key];
                    break;
                }
                // 比较下一个
                comp = comp[key];
                base = base[key];
            }
        },

        mixConfig : function(obj, recor, baseObj, compObj){
            return util.getObjKeysCascade(obj, util.compare, recor, baseObj, compObj) || compObj;
        },

        /**
         * alert\comfirm的通用配置
         * @param msg
         * @returns {{parent: *, baseConf: {dialog: (*|{attr: *, content: *, fn: *}), header: (*|{attr: *, content: *, fn: *}), body: (*|{attr: *, content: *, fn: *})}, customConf: {header: (*|{attr: *, content: *, fn: *}), body: (*|{attr: *, content: *, fn: *}), footer: (*|{attr: *, content: *, fn: *})}}}
         */
        createCommonConf : function(msg){
            return {
                parent : dialogs.parent,
                baseConf : {
                    dialog : util.createConfig('class="dialog alert"', null, {}),
                    header : util.createConfig('class="header"', "", {}),
                    body : util.createConfig('class="body text-center"', null, {})
                },
                customConf : {
                    header : util.createConfig('class="icon-close"', dialogs.title, {}),
                    body : util.createConfig('class="text-box"', msg, {}),
                    footer : util.createConfig("", "", {})
                }
            }
        }
    };


    /**
     * Dialog提供最基础的组件函数，有的可以规划成一些接口。边写边设计。
     * @constructor
     */

    function Dialog(conf){
        if(!this instanceof Dialog) return;

        // 默认配置
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

        // 混淆之后的配置
        this.resultConf = {
            baseConf : {},
            customConf : {}
        };

        this.config = conf || {};

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
    }

    Dialog.prototype = {
        constructor : Dialog,

        init : function(){
            // 建立缓存
            var doms = this.cache.doms,
                events = this.cache.events;

            // dom缓存
            this.resultConf = this.mixConfig(this.config);
            doms.baseDom = util.createBaseDom(this.resultConf.baseConf);
            doms.customDom = util.createCustomDom(this.resultConf.customConf);

            // event缓存
            events.baseEvent = this.getBaseDomEvent();
            events.customEvent = this.getCustomDomEvent();
            // 添加元素到parent中
            this.resultConf.parent.append(doms.baseDom.dialog);
            // 添加customDom到baseDom中
            this.fillDoms(doms.customDom);
            // 执行domCreateCallback
            this.domCreatedCallBack(doms);
            // 绑定事件
            this.bindDomEvent(doms.baseDom, events.baseEvent);
            this.bindDomEvent(doms.customDom, events.customEvent);
            return this;
        },

        // 显示组件，执行回调
        show : function(fn){
            return this.animate(this.cache.doms.baseDom.dialog).show(util.isFunction(fn) ? fn : noop);
        },

        // 隐藏组件，执行回调
        hide : function(fn){
            return this.cache.doms.baseDom.dialog.hide(util.isFunction(fn) ? fn : noop);
        },

        // 关闭组件。从内存中删除，执行回调。
        close : function(fn){
            var _this = this;
            this.cache.doms.baseDom.dialog.remove();
            // 删除this上的所有数据
            util.ergodic(this, function(key, val){
                _this[key] = null;
            }, null);
            util.isFunction(fn) && fn();
        },


        /**
         * 如果config中有自己配置的项，不要覆盖了
         * 如果没有，就用DEFAULT_CONFIG
         * @param conf
         */

        mixConfig : function(conf){
            var DEFAULT_CONFIG = this.DEFAULT_CONFIG,
                resultConf = this.resultConf;

            // 如果传入了配置参数，就混淆配置参数和默认的配置参数
            if(util.isObjectLiterals(conf)){
                resultConf.baseConf = util.mixConfig(DEFAULT_CONFIG.BASE_CONF,
                    [], DEFAULT_CONFIG.BASE_CONF, conf.baseConf || {});

                resultConf.customConf = util.mixConfig(DEFAULT_CONFIG.CUSTOM_CONF,
                    [], DEFAULT_CONFIG.CUSTOM_CONF, conf.customConf || {});
            }else{
                resultConf.baseConf = DEFAULT_CONFIG.BASE_CONF;
                resultConf.customConf = DEFAULT_CONFIG.CUSTOM_CONF;
            }
            resultConf.parent = conf.parent || DEFAULT_CONFIG.parent;
            return resultConf;
        },

        /**
         * 自定义动画函数
         * @param wrap - baseDom.dialog
         */

        animate : function(wrap){
            return wrap && wrap["fadeIn"] && wrap["fadeIn"]();
        },

        getEventMap : function(conf){
            var events = {};
            util.ergodic(conf, function(key, val){
                events[key] = val["event"] || {};
            }, null);
            return events;
        },

        /**
         * 将customDom添加到BaseDom中去
         */

        fillDoms : function(conf){
            util.ergodic(this.cache.doms.baseDom, function(key, val){
                val.append(conf[key]);
            }, null);
        },

        getBaseDomEvent : function(){
            return this.getEventMap(this.resultConf.baseConf);
        },

        getCustomDomEvent : function(){
            return this.getEventMap(this.resultConf.customConf);
        },

        bindDomEvent : function(doms, events){
            util.ergodic(doms, function(key, val){
                // 直接调用jq中的on方法绑定事件
                val && val.on && val.on(events[key]);
            }, null);
        },

        /**
         * 该接口主要给开发者调用，会在init完之后调用
         * 该函数调用时，所有的dom都已经创建完毕
         * 开发者可以在此函数中操作dom。比如绑定一个拖拽事件...
         * @params doms - 所有生成的dom。
         */
        domCreatedCallBack : function(doms){

        }
    };

    /**
     * 模拟window.alert。只弹出一个提示信息，没有回调。
     * 且不能像alert那样暂停javascript执行
     * 该对象采用单例设计模式
     */

    function alert(msg, callback){
        return dialogs["dialog"] || (dialogs["dialog"] = new Alert(msg, callback));
    }

    function Alert(msg, callback){
        if(!this instanceof Alert) return;

        var _this = this;
        this.config = util.createCommonConf(msg);

        this.callback = callback;
        this.init();
        this.show();
    }
    Alert.prototype = new Dialog();
    Alert.prototype.domCreatedCallBack = function(doms){
        var _this = this;
        // 向body中添加一个btn
        var btn = $('<input type="button" value="确定" class="btn btn-default btn-xs" />');

        btn.on("click", function(){
            _this.close(function(){
                dialogs.clean("dialog");
                util.isFunction(_this.callback) && _this.callback(_this);
            });
        });
        doms.baseDom.body.append(btn);
    };

    function confirm(msg, callback){
        return dialogs["dialog"] || (dialogs["dialog"] = new Confrim(msg, callback));
    }

    function Confrim(msg, callback){
        if(!this instanceof Confrim) return;

        this.config = util.createCommonConf(msg);
        this.callback = callback;
        this.init();
        this.show();
    }
    Confrim.prototype = new Dialog();
    Confrim.prototype.domCreatedCallBack = function(doms){
        var _this = this;
        // 向body中添加一个btn
        var btn = $('<input type="button" value="确定" class="btn btn-default btn-xs" style="margin-right:10px;" />'),
            _btn = $('<input type="button" value="取消" class="btn btn-default btn-xs" />');
        doms.baseDom.body.append(btn);
        doms.baseDom.body.append(_btn);
        doms.baseDom.body.delegate(".btn", "click", [], function(e){
            var elem = this;
            _this.close(function(){
                dialogs.clean("dialog");
                elem.value === "确定" && util.isFunction(_this.callback) && _this.callback();
            });
        });
    };

    function prompt(msg, defaultText, callback){
        return dialogs["dialog"] || (dialogs["dialog"] = new Prompt(msg, defaultText, callback));
    }

    function Prompt(msg, defaultText, callback){
        if(!this instanceof Prompt) return;
        this.config = util.createCommonConf(msg);
        this.callback = callback;
        this.defaultText = defaultText;
        this.init();
        this.show();
        console.log(window.dialog = this);
    }

    Prompt.prototype = new Dialog();
    Prompt.prototype.domCreatedCallBack = function(doms){
        var _this = this;
        // 向body中添加一个btn
        var input = $('<input type="text" placeholder="' + _this.defaultText + '" class="form-control" style="margin-bottom:20px;" />'),
            btn = $('<input type="button" value="确定" class="btn btn-default btn-xs" style="margin-right:10px;" />'),
            _btn = $('<input type="button" value="取消" class="btn btn-default btn-xs" />');

        doms.baseDom.body.append(input);
        doms.baseDom.body.append(btn);
        doms.baseDom.body.append(_btn);
        doms.baseDom.body.delegate(".btn", "click", [], function(e){
            var elem = this;
            _this.close(function(){
                dialogs.clean("dialog");
                elem.value === "确定" && util.isFunction(_this.callback) && _this.callback(input.val() || _this.defaultText);
            });
        });
    };

    return {
        Dialog : Dialog,
        alert : alert,
        confirm : confirm,
        prompt : prompt,
        $ : $
    }
});