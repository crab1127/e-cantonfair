/**
 * Created by sam on 2015/4/8.
 *
 */
define(['jquery','uploadify'],function(){
    /**
     * 用于生成上传文件的id
     * @type {Number}
     */
    var _nId = 0;

    var console = window['console'] || {
        log: function(){}
    };

    /**
     * 上传基类
     * @author vfasky
     * @date   2013-08-09
     * @param  {Object} oArgs 参数
     * @return {Void}
     */
    var UploadBase = function(oArgs){

        /**
         * 参数
         * @type {Object}
         */
        this.oArgs = oArgs || {};

        /**
         * 上传框
         * @type {JQselector}
         */
        this.$FileInput = this.oArgs.fileInput;

        /**
         * 上传地址
         * @type {String}
         */
        this.sUploadURL = this.oArgs.uploader || '';

        this.isDisable = false;

        /**
         * 事件默认值
         * @type {Object}
         */
        this.oEvents = $.extend({
            // 选择文件失败
            'ON_SELECT_ERROR'    : function(){},
            // 文件上传失败
            'ON_UPLOAD_ERROR'    : function(){},
            // 文件上传成功
            'ON_UPLOAD_SUCCESS'  : function(){},
            // 文件的上传进度
            'ON_UPLOAD_PROGRESS' : function(){},
            // 准备上传一个文件
            'ON_UPLOAD_BEFORE'   : function(){},
            // 上传组件就绪
            'ON_UPLOADER_READY'  : function(){}
        }, this.oArgs.events || {});

        this.sElId = this.$FileInput.attr('id');

        this.$El = $(
            '<div class="uploadify"></div>'
        ).insertBefore(this.$FileInput);

        this.$Queue = $(
                '<div id="' + this.sElId + '-queue" class="uploadify-queue"></div>'
        ).insertAfter(this.$El);


        this.$El.attr({
            'id'   : this.sElId
        }).css({
            width  : this.oArgs.width ,
            height : this.oArgs.height
        });
        this.$FileInput.attr('id', '').prependTo(this.$El);

        /**
         * 是否禁用上传
         * @author vfasky
         * @date   2013-08-14
         * @param  {Boolean} bType [description]
         * @return {[type]} [description]
         */
        this.disable = function(bType, xUndef){
            bType = bType == xUndef ? true : bType;

            var $Block = this.$El.find('.block');

            //启用
            if(false === bType){
                this.isDisable = false;
                $Block.hide();
            }
            else{ //禁用
                this.isDisable = true;
                if($Block.length === 0){
                    $Block = $('<div class="block"></div>');
                    $Block.css({
                        width: this.oArgs.width + 2,
                        height: this.oArgs.height + 5,
                        zIndex: 10,
                        opacity: 0.4,
                        background: '#fff',
                        top: 0,
                        left: 0,
                        position: 'absolute'
                    }).appendTo(this.$El);
                }
                $Block.show();
            }
        };

        /**
         * 生成不生重复的文件id
         * @author vfasky
         * @date   2013-08-12
         * @return {String} 文件id
         */
        this.getFileId = function(){
            _nId ++;
            return 'UF_' + _nId;
        };
    };

    /**
     * Iframe 方式上传
     * @author vfasky
     * @date   2013-08-09
     * @param  {Object} oArgs
     *   必填参数：uploadURL, fileInput , events
     * @return {Void}
     */
    var IframeUpload = function(oArgs){
        UploadBase.call(this, oArgs);

        var self = this;

        var $El = this.$El;



        // create iframe
        var $Iframe = $('<iframe src="javascript:false" name="hide-upload" scrolling="no" frameborder="0" style="display: inline-block;"></iframe>');
        $Iframe.css({
            width  : self.oArgs.width ,
            height : self.oArgs.height
        }).appendTo($El);

        //console.log(this)

        // 构造上传表单
        var fBuildForm = function(){
            var oIO  = $Iframe[0];

            var oFile = {
                name : 'UNKNOWN',
                id   : self.getFileId()
            };

            var xTime = setInterval(function(){
                var oDoc = oIO.contentWindow ? oIO.contentWindow.document : oIO.contentDocument ? oIO.contentDocument : oIO.document;
                if(oDoc){
                    clearInterval(xTime);
                    oDoc.write(
                            '<form enctype="multipart/form-data" method="post" action="' +
                            self.sUploadURL + '?fieldName=not-flash">' +
                            '<input class="file-input" type="file" name="not-flash" onchange="this.form.submit()" />' +
                            '<button class="btn btn-s12" type="button">' + self.oArgs.buttonText + '</button>' +
                            '</form>'
                    );

                    oDoc.body.style.cssText = 'margin:0;';

                    var $IFBody = $(oDoc.body);

                    $IFBody.find('form').css({
                        position : 'relative',
                        width    : self.oArgs.width ,
                        height   : self.oArgs.height
                    }).find('.btn').css({
                        position  : 'absolute',
                        zIndex    : 1,
                        top       : 0,
                        left      : 0,
                        width     : self.oArgs.width ,
                        height    : self.oArgs.height
                    });

                    //开始上传
                    $IFBody.find('.file-input').bind('change.IframeUpload', function(){
                        self.oEvents.ON_UPLOAD_BEFORE(oFile, self);
                    }).css({
                        position  : 'absolute',
                        zIndex    : 2,
                        top       : 0,
                        left      : 0,
                        width     : self.oArgs.width ,
                        height    : self.oArgs.height,
                        opacity   : 0,
                        cursor    : 'pointer',
                        size      : 1
                    });
                }
            }, 20);

            return oFile;
        };

        var _oFile = fBuildForm();

        //绑定上传完成事件
        $Iframe.bind('load', function () {
            var sHtml = $.trim(this.contentWindow.document.body.innerHTML);
            if(sHtml.indexOf("{") === 0){
                try{
                    var jData = $.parseJSON(sHtml);

                    if(jData){
                        if (jData.status && jData.status === 'success') {
                            //上传完成事件
                            _oFile.fileName     = jData.data.url;
                            _oFile.fileFullName = jData.data.abslouteUrl;
                            _oFile.title        = _oFile.name;
                            self.oEvents.ON_UPLOAD_SUCCESS(jData.data, _oFile, self);
                        }
                        else {
                            //上传失败
                            self.oEvents.ON_UPLOAD_ERROR(jData.message, _oFile, self, jData.data);
                        }
                        //重新生成一个上传实例
                        _oFile = fBuildForm();
                    }

                }
                catch(e){
                    //上传失败
                    //self.oEvents.ON_UPLOAD_ERROR('Unknown error', _oFile, self);
                }

            }
        });
        self.oEvents.ON_UPLOADER_READY(self);
        self.$FileInput.hide();
    };

    /**
     * 拖拉上传助手 helper
     * @author vfasky
     * @date   2013-08-19
     * @return {[type]} [description]
     */
    var fDragHelper = {};
    (function(fDragHelper){
        /**
         * 存放拖拉的监听的对象
         * @type {Array}
         */
        var _aHandlers = [];

        var _aEls  = [];

        fDragHelper.add = function(oHandler){
            _aHandlers.push(oHandler);
        };

        fDragHelper.remove = function(oHandler){
            var nIndex = $.inArray(oHandler, _aHandlers);
            if(nIndex != -1){
                _aHandlers.splice(nIndex, 1);
                return true;
            }
            return false;
        };

        fDragHelper.hide = function(){
            $.each(_aEls, function(k, v){
                v.hide();
            });
        };
        /**
         * 判断对象是否有效
         * @author vfasky
         * @date   2013-08-19
         * @param  {Object} oHandler [上传对象]
         * @return {Boolean} [是否有效]
         */
        fDragHelper.isValid = function(oHandler){
            return oHandler.isDisable === false && oHandler.$FileInput.is(':visible');
        };

        $(function(){
            var _oBody = $(document.body);

            _oBody.on('dragenter.fDragHelper',function(){
                _aEls = [];
                $.each(_aHandlers, function(k,v){
                    if(fDragHelper.isValid(v)){
                        v.$Drop.show();
                        _aEls.push(v.$Drop);
                    }
                });
            }).on('click.fDragHelper', function(){
                fDragHelper.hide();
            });
        });

    })(fDragHelper);

    /**
     * 剪贴板上传助手
     * @type {Object}
     */
    var fClipboardHelper = {};
    (function(helper){

        /**
         * 监听的对象
         * @type {Array}
         */
        var _aHandlers = [];

        var _aEls  = [];

        helper.file = false;

        helper.add = function(oHandler){
            _aHandlers.push(oHandler);
        };

        helper.remove = function(oHandler){
            var nIndex = $.inArray(oHandler, _aHandlers);
            if(nIndex != -1){
                _aHandlers.splice(nIndex, 1);
                return true;
            }
            return false;
        };

        helper.hide = function(){
            $.each(_aEls, function(k, v){
                v.hide();
            });
        };

        helper.isValid = function(oHandler){
            return oHandler.isDisable === false && oHandler.$FileInput.is(':visible');
        };

        $(function(){
            if(!document.body.addEventListener){
                return;
            }
            //监听粘贴
            document.body.addEventListener('paste', function(e){
                var clipboardData = e.clipboardData;
                if(!clipboardData){
                    return;
                }


                helper.file = false;
                $.each(clipboardData.items, function(k,v){
                    if(v.kind=='file'){
                        helper.file = v.getAsFile();
                        return false;
                    }
                });
                if(helper.file){
                    _aEls = [];
                    $.each(_aHandlers, function(k,v){
                        if(fDragHelper.isValid(v)){
                            v.$ClEl.show();
                            _aEls.push(v.$ClEl);
                            var setTitle = v.$ClEl.data('setTitle');
                            setTitle('type:' + helper.file.type + ' size:' + (helper.file.size / 1024 / 1024).toFixed(2) + ' Mb');
                        }
                    });
                }
            });
        });
    })(fClipboardHelper);


    /**
     * XMLHttpRequest 方式上传
     * @author vfasky
     * @date   2013-08-09
     * @param  {Object} oArgs
     *   必填参数：uploadURL, fileInput , events
     * @return {Void}
     */
    var XHRUpload = function(oArgs){
        UploadBase.call(this, oArgs);

        var self       = this;
        var $FileInput = this.$FileInput;
        var $El        = this.$El.append('<div class="uploadify-button"><span class="uploadify-button-text">'+ self.oArgs.buttonText +'</span></div>');

        /**
         * 初始化剪贴板上传
         * @author vfasky
         * @date   2013-08-19
         * @return {Function} [description]
         */
        var fInitClipboardUpload = function(){
            var $ClEl  = $('<div>'+
                '<div class="c-name"></div>' +
                '<div class="c-bottons">'+
                '<button type="button" class="btn btn-s12 cancel">'+ Can.msg.BUTTON.CANCEL +'</button>' +
                '<button type="button" class="btn btn-s11 upload">'+ Can.msg.BUTTON.UPLOAD +'</button>' +
                '</div>' +
                '</div>');
            self.$ClEl = $ClEl;
            $ClEl.css({
                textAlign: 'center',
                background: '#fff',
                position: 'relative',
                borderRadius: 20,
                border: '4px dotted #efefef',
                zIndex: 8,
                boxShadow: '0 0 8px #999'
            }).find('.c-name').css({
                height: 50,
                lineHeight: '50px'
            });
            var nWidth  = 220;
            var nHeight = 85;
            if(self.oArgs.width < nWidth){
                $ClEl.width(nWidth);
            }
            else{
                $ClEl.width(self.oArgs.width);
            }

            if(self.oArgs.height < nHeight){
                $ClEl.height(nHeight);
            }
            else{
                $ClEl.height(self.oArga.height);
            }
            $ClEl.css({
                top : - $ClEl.height() / 2 - self.oArgs.height
            });

            $ClEl.find('.cancel').click(function(){
                fClipboardHelper.hide();
                return false;
            });

            $ClEl.find('.upload').click(function(){
                if(fClipboardHelper.file){
                    fUploadFile(fClipboardHelper.file);
                }
                fClipboardHelper.hide();
                return false;
            });

            $ClEl.data('setTitle', function(sTitle){
                $ClEl.find('.c-name').html(sTitle);
            });

            $ClEl.hide();
            $ClEl.appendTo($El);

            //加入粘贴上传
            fClipboardHelper.add(self);
        };

        $(function(){
            if(document.body.addEventListener){
                fInitClipboardUpload();
            }
        });


        /**
         * 初始化拖拉上传
         * @author vfasky
         * @date   2013-08-16
         * @return {Function} [description]
         */
        var fInitDropUpload = function(){
            var $Drop  = $('<div>'+ Can.msg.UPLOADER.DRAG_TIPS +'</div>');
            self.$Drop = $Drop;
            $Drop.css({
                textAlign: 'center',
                background: '#fff',
                position: 'relative',
                borderRadius: 20,
                border: '4px dotted #efefef',
                zIndex: 9,
                boxShadow: '0 0 8px #999'
            });
            var nWidth  = 200;
            var nHeight = 120;
            if(self.oArgs.width < nWidth){
                $Drop.width(nWidth);
            }
            else{
                $Drop.width(self.oArgs.width);
            }

            if(self.oArgs.height < nHeight){
                $Drop.height(nHeight);
            }
            else{
                $Drop.height(self.oArga.height);
            }
            $Drop.css({
                top : - $Drop.height() / 2 - self.oArgs.height,
                lineHeight: $Drop.height().toString() + 'px'
            });

            $Drop.hide();
            $Drop.appendTo($El);
            $Drop.on('dragenter.dropUpload', function(){
                $Drop.css({
                    background: '#fcffe4'
                });
            }).on('dragleave.dropUpload', function(){
                $Drop.css({
                    background: '#fff'
                });
            });
            var oDrop = $Drop[0];
            oDrop.addEventListener('dragover', function(e){
                e.stopPropagation();
                e.preventDefault();
                return false;
            }, false);
            oDrop.addEventListener('drop', function(e){
                e.stopPropagation();
                e.preventDefault();

                $Drop.css({
                    background: '#fff'
                });

                fDragHelper.hide();

                var files = e.dataTransfer.files;
                /*if (fCheckFiles(files)) {
                 $.each(files, function(k, v) {
                 fUploadFile(v);
                 });
                 }*/
                processUploadFiles(files);
                return false;
            }, false);


            //加入监听
            fDragHelper.add(self);
        };

        /**
         * 判断是否兼容拖放上传
         */
        if (window.FileReader) {
            fInitDropUpload();
        }

        /**
         * 上传单个文件
         * @author vfasky
         * @date   2013-08-12
         * @param  {Mixin} xFile 要上传的html5 file对象
         * @return {void}
         */
        var fUploadFile = function(xFile){
            var oFormData = new FormData();
            if(xFile.name){
                oFormData.append(self.oArgs.fileObjName, xFile);
            }
            else{
                oFormData.append(self.oArgs.fileObjName, xFile, 'x.' + xFile.type.split('/').pop());
            }


            for(var v in self.oArgs.formData){
                oFormData.append(v, self.oArgs.formData[v]);
            }

            var oFile = {
                name : xFile.name,
                id   : self.getFileId()
            };

            // 开始上传
            self.oEvents.ON_UPLOAD_BEFORE(oFile, self);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', self.sUploadURL, true);

            // 上传进度
            xhr.upload.addEventListener("progress", function(e){
                self.oEvents.ON_UPLOAD_PROGRESS( Math.round((e.loaded * 100) / e.total), oFile, self);
            });
            // 上传完成
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4){
                    try{
                        var jData = $.parseJSON(xhr.responseText);

                        if (jData.status && jData.status === 'success') {
                            oFile.fileName     = jData.data.url;
                            oFile.fileFullName = jData.data.abslouteUrl;
                            oFile.title        = oFile.name;
                            //console.log($FileInput);
                            $FileInput.val('');
                            self.oEvents.ON_UPLOAD_SUCCESS(jData.data, oFile, self);
                        }
                        else {
                            self.oEvents.ON_UPLOAD_ERROR(jData.message, oFile, self);
                        }
                    }
                    catch(e){
                        self.oEvents.ON_UPLOAD_ERROR('Unknown error', oFile, self);
                    }
                    return false;
                }
            };
            xhr.send(oFormData);
        };

        /**
         * 处理上传文件:检查文件是否合法,如果合法则可以上传,否则跳过不处理.
         * @author gangw
         * @date   2014-07-23
         * @param  files 待处理上传的html5 files对象
         * @return {void}
         */
        var processUploadFiles = function(files) {
            var aFileExts = [];
            var aFileType = self.oArgs.fileTypeExts || '';

            //Check the number of flies that can be uploaded
            if (files.length > self.oArgs.uploadLimit) {
                self.oEvents.ON_UPLOAD_ERROR('ERR_UPLOAD_100', {}, self);
                return ;
            }

            $.each(aFileType.split(';'), function(k,v){
                var ext = $.trim(v.split('.').pop()).toLowerCase();
                aFileExts.push(ext);
            });

            for(var i = 0; i < files.length; i++) {
                var file = files[i];

                if(file.name){
                    var ext = $.trim(file.name.split('.').pop()).toLowerCase();
                }else{
                    var ext = $.trim(file.type.split('/').pop()).toLowerCase();
                }

                switch(ext){
                    case 'jpge':
                        ext = 'jpg';
                        break;
                    case 'x-flv':
                        ext = 'flv';
                        break;
                }

                var oFile = {name: file.name, size: file.size, id: self.getFileId()};

                // Check file size
                if(file.size / 1024 > self.oArgs.fileSizeLimit){
                    self.oEvents.ON_UPLOAD_ERROR('ERR_UPLOAD_110', oFile, self);
                    continue;
                }
                // Check file type
                if($.inArray('*', aFileExts) < 0 && $.inArray(ext, aFileExts) < 0 ){
                    self.oEvents.ON_UPLOAD_ERROR('ERR_UPLOAD_130', oFile, self);
                    continue;
                }
                //upload
                fUploadFile(file);
            }
        };
        //构造 dom
        $El.css({
            position : 'relative'
        }).find('.uploadify-button').css({
            position  : 'relative',
            zIndex    : 1,
            width     : self.oArgs.width,
            height    : self.oArgs.height,
            padding   : 0,
            margin    : 0,
            textAlign : 'center',
            lineHeight: self.oArgs.height.toString() + 'px'
        }).attr({
            'class' : 'uploadify-button ' + self.oArgs.buttonClass
        });

        $FileInput.css({
            opacity   : 0,
            cursor    : 'pointer',
            position  : 'absolute',
            textAlign : 'right',
            size      : 1,
            zIndex    : 2,
            width     : self.oArgs.width,
            height    : self.oArgs.height,
            top       : 0,
            left      : 0
        }).change(function() {
            if($FileInput.val() === ''){
                return;
            }
            /*if(fCheckFiles(this.files)){
             $.each(this.files, function(k,v){
             fUploadFile(v);
             });
             } */
            processUploadFiles(this.files);
        });

        self.oEvents.ON_UPLOADER_READY(self);
    };


    /**
     * 使用 flash 上传
     * @author vfasky
     * @date   2013-08-12
     * @param  {Object} oArgs
     *   必填参数：uploadURL, fileInput , events
     * @return {Void}
     */
    var FlashUpload = function(oArgs){
        UploadBase.call(this, oArgs);

        var self       = this;
        var $FileInput = this.$FileInput;

        var oIdMap = {};

        var fGetFileId = function(sId){
            if(!oIdMap[sId]){
                oIdMap[sId] = self.getFileId();
            }

            return oIdMap[sId];
        };

        var oOptions = $.extend(oArgs, {
            swf: Can.util.Config.uploader.swf,
            itemTemplate: '<div></div>',
            onSWFReady : function(){
                self.oEvents.ON_UPLOADER_READY(self);
                self.$El.find('.uploadify-button').css({
                    overflow: 'hidden',
                    padding: 0,
                    textAlign: 'center'
                });
            },
            onFallback : function(){
                // 使用 iframe 上传
                var Onew = new IframeUpload(oArgs);
                self.disable = function(bType){
                    Onew.disable(bType);
                };
            },
            onSelect : function(file){
                var oFile = {
                    name : file.name ,
                    id   : fGetFileId(file.id)
                };
                self.oEvents.ON_UPLOAD_BEFORE(oFile, self);
            },
            onSelectError: function (file, code) {
                self.oEvents.ON_SELECT_ERROR('ERR_UPLOAD_' + Math.abs(code), file, self);
            },
            onUploadError: function (file, code ) {
                self.oEvents.ON_UPLOAD_ERROR('ERR_UPLOAD_' + Math.abs(code), file, self);
            },
            onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                var oFile = {
                    name : file.name ,
                    id   : fGetFileId(file.id)
                };
                self.oEvents.ON_UPLOAD_PROGRESS( Math.round((totalBytesUploaded * 100) / totalBytesTotal), oFile, self);
            },
            onUploadSuccess: function (file, sData, isSuccess) {
                var oFile = {
                    name : file.name ,
                    id   : fGetFileId(file.id)
                };
                if (isSuccess) {
                    try{
                        var jData = $.parseJSON(sData);

                        if (jData.status && jData.status === 'success') {
                            oFile.fileName     = jData.data.url;
                            oFile.fileFullName = jData.data.abslouteUrl;
                            oFile.title        = oFile.name;
                            self.oEvents.ON_UPLOAD_SUCCESS(jData.data, oFile, self);
                        }
                        else {
                            self.oEvents.ON_UPLOAD_ERROR(jData.message, oFile, self);
                        }
                    }
                    catch(e){
                        self.oEvents.ON_UPLOAD_ERROR('Unknown error', oFile, self);
                    }
                }
                else{
                    self.oEvents.ON_UPLOAD_ERROR('Unknown error', oFile, self);
                }
            }
        });

        //等待dom加载
        $FileInput.attr('id', self.sElId + '-input');
        //console.log($FileInput.attr('id'));
        var xTime = setInterval(function(){
            if($FileInput.length > 0){
                clearInterval(xTime);
                $FileInput.uploadify(oOptions);
            }
        }, 100);
    };


    /**
     * 上传助手
     * @author vfasky
     * @date   2013-08-09
     * @param  {Object} oArgs
     *   必填参数：uploadURL, ( fileInput || file ), events
     * @return {UploadBase}
     */
    var uploadHelper = function(oArgs){
        /**
         * 是否支持html5的文件api
         * @type {Boolean}
         */
        var isFileAPI = window['FormData'] && window['XMLHttpRequest'] || false;

        if($.browser.msie){
            return new FlashUpload(oArgs);
        }

        //return new IframeUpload(oArgs);
        //retutn new XHRUpload(oArgs);
        //return new FlashUpload(oArgs);
        //使用 html5 上传
        if(isFileAPI){
            return new XHRUpload(oArgs);
        }
        //使用 flash 上传(注： 如不支持flash, 会自动降级成 iframe)
        else{
            return new FlashUpload(oArgs);
        }
    };

})