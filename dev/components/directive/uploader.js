/**
 * Created by sam on 2015/4/8.
 *
 */
define(['angular','jquery','uploadify'],function(){
    angular.module('webapp.ui.uploader',[])
        .directive('uploader', function() {
            return {
                restrict : 'EA',
                replace:true,
                transclude : true,
                template:'<button>上传</button>',
                link:function(scope, element, attrs){
                    $("#"+attrs['id']).uploadify({
                        height        : 30,
                        swf           : '/components_module/uploadify/uploadify.swf',
                        uploader      : '/components_module/uploadify/uploadify.php',
                        width         : 120,
                        buttonClass: '',
                        buttonText: 'SELECT FILES',
                        checkExisting: false,
                        fileObjName: 'FileData',
                        fileTypeDesc: 'All Files',
                        fileTypeExts: '*.*',
                        removeCompleted:false,
                        imgTemplate : '<div id="${fileID}" data-dd="ds" class="exist-file file-item">'+
                            '<div class="preview">' +
                            '<img class="up-photo" src="${previewUrl}" alt="${fileName}">' +
                            '</div>'+
                            '<a ${deleteBind} class="exist-close" href="javascript:;" cantitle="Delete"></a>' +
                            '</div>',

                        itemTemplate :  '<div id="${fileID}"  data-dd="ds" class="file-item">' +
                            '   <label class="name">${fileName} (${fileSize})</label>' +
                            '   <a ${deleteBind} class="close" href="javascript:;"></a>' +
                            '</div>',

                        flvTemplate : '<div id="${fileID}" class="exist-file file-item">'+
                            '<embed width="${previewWidth}" height="${previewHeight}" wmode="transparent" type="application/x-shockwave-flash" quality="high" src="${flyPlayer}">' +
                            '<a ${deleteBind} class="exist-close" href="javascript:;" cantitle="Delete"></a>' +
                            '</div>'
                    });
                }
            };
        });


})