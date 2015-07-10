/**
 * 看图模式
 */

define('seaimg', ['jquery', 'event', 'artTemplate'], function($, Event, artTemplate) {
  var template = '  <div class="seaimg-container">' +
  '<div class="seaimg-body">' +
  '<div class="seaimg-body-img">' +
  '<img src="" alt="">' +
  '</div>' +
  '<a class="btn-prev-seaimg"></a>' +
  '<a class="btn-next-seaimg"></a>' +
  '<div class="seaimg-body-desc">' +
  '<div class="seaimg-page"><a href="{{list[0].img}}" class="fr" target="_blank">查看大图</a> <span class="page-count">1</span> / {{list.length}} <strong>{{list[0].title}}</strong></div>' +
  '</div>' +
  '</div>' +
  '<div class="seaimg-nav-wrap"><div class="seaimg-nav">' +
  '<div class="seaimg-nav-prev"><</div>' +
  '<div class="seaimg-nav-main">' +
  '<ul class="cc">' + '{{ each list}}' +
  '<li>' +
  '<img src="{{$value.smImg}}" alt="" width="100" height="100" alt="{{$value.title}}">' +
  '</li>' +
  '{{/each}}' +
  '</ul>' +
  '</div>' +
  '<div class="seaimg-nav-next">></div>' +
  '</div>'+
  '</div>' +
  '</div>';


  var seaimg = Event.extend({
      //执行绑定的函数
      bind: function() {
        var self = this;
        //保存
        this.model = this.get('model');
        //当前索引
        this.dataIndex = 0;
        //数据长度
        this.len = this.model.length;

        $('body').on('click', '.btn-prev-seaimg', function(){
          clearInterval(self.tiemr);
          if(self.dataIndex === 0){
            return false;
          }
          self.dataIndex = self.dataIndex - 1;
          var index = self.dataIndex,width;
          if(self.dataIndex > 5 && (self.dataIndex < self.len - 6) ){
            width = -self.navItmeWidth * (index - 5);
          } else if( self.dataIndex <= 5) {
            width = 0;
          } else if(self.dataIndex >= (self.len - 6)) {
            width = -self.navItmeWidth * (self.len - 11);
          }
          self.navSlide(width);
          self.slideTo();
          self.autoPlay();
        }).on('click', '.btn-next-seaimg', function(){
          clearInterval(self.tiemr);
          if(self.dataIndex === self.len - 1){
            return false;
          }
          self.dataIndex = self.dataIndex + 1;
          var index = self.dataIndex,width;
          if(self.dataIndex > 5 && (self.dataIndex < self.len - 6) ){
            width = -self.navItmeWidth * (index - 5);
          } else if( self.dataIndex <= 5) {
            width = 0;
          } else if(self.dataIndex >= (self.len - 6)) {
            width = -self.navItmeWidth * (self.len - 11);
          }
          self.navSlide(width);
          self.slideTo();
          self.autoPlay();
        }).on('click', '.seaimg-nav-main li', function() {
          //直接点击菜单
          var index = $(this).index(),width;
          self.dataIndex = index;

          if(self.dataIndex > 5 && (self.dataIndex < self.len - 6) ){
            width = -self.navItmeWidth * (index - 5);
          } else if( self.dataIndex <= 5) {
            width = 0;
          } else if(self.dataIndex >= (self.len - 6)) {
            width = -self.navItmeWidth * (self.len - 11);
          }
          self.navSlide(width);
          self.slideTo();

        }).on('click', '.seaimg-nav-next', function(){
          var index = self.dataIndex,
              left = parseInt($('body').find('.seaimg-nav-main ul').css('left')),
              navWidth = self.len * self.navItmeWidth,
              navW = self.navItmeWidth * 11,
              w;

          if ((navWidth - navW - Math.abs(left)) >= navW) {
            w = navW;
          } else if((navWidth - navW - Math.abs(left)) <= 0){
            w = navWidth - navW
          }else{
            w = navWidth - navW - Math.abs(left)
          }
          self.navSlide(-w);
          $('body').find('.seaimg-nav-prev').show();
          $('body').find('.seaimg-nav-next').show();
        }).on('click', '.seaimg-nav-prev', function(){
          //获取
          var index = self.dataIndex,
              left = parseInt($('body').find('.seaimg-nav-main ul').css('left')),
              navWidth = self.len * self.navItmeWidth,
              navW = self.navItmeWidth * 11,
              w;

          if (Math.abs(left) - navW >= 0) {
            w = navW;
          } else {
            w = 0;
          }
          self.navSlide(-w);
          $('body').find('.seaimg-nav-prev').show();
          $('body').find('.seaimg-nav-next').show();
        });

        $(window).on('resize', function(){
          setTimeout(self.size(),100)
        });

        this.autoPlay();
      },
      autoPlay: function() {
        var time = this.get('time') || 8000;
        if(this.get('isAutoPlay')) {
          clearInterval(this.tiemr);
          this.tiemr = setInterval(function(){
            $('.btn-next-seaimg').trigger('click');
          }, time)
        }
      },
      //绚烂函数
      render: function() {
        var render = artTemplate.compile(template);
        var html = render({
          list: this.get('model')
        });
        $('body').html(html);
        this._initLoadImg();
        $('body').find('.seaimg-body-img img').attr('src', this.model[0].img)
        this.size();

        this.initNav();
        this.show();

      },
      //初次加载图片
      _initLoadImg: function() {
        var self = this, i;
        for(i = -2; i < 1; i++) {
          setTimeout(function(){
            self._preloadImg(i)
          },200);
        }

      },
      //预加载图片
      _preloadImg: function(dataIndex) {
        var len = this.len;
        var idx = dataIndex;
        var self = this;
        var loadImg = function(index) {
          if (!self.model[index].loaded) {
            var preloadImg = new Image();
            // preloadImg.onload = function(){
            //   self.model[index].width = preloadImg.width;
            //   self.model[index].height = preloadImg.height;
            // }
            preloadImg.src = self.model[index].img;
            self.model[index].loaded = 1;
          }
        };
        var nextIndex = idx + 2 > len - 1 ? (idx + 2) % len : idx + 2;
        loadImg(nextIndex);
      },
      //设置图片尺寸
      size: function() {
        var navHeight = $('.seaimg-nav').height(),
            width = $(window).width(),
            height = $(window).height() - navHeight - 60,
            imgDate = this.model[this.dataIndex];
            imgSize = function(img) {
              if (width > height) {
                if (img.width > img.height) {
                  if (width / height > img.width / img.height) {
                    h = height;
                    w = Math.round(img.width * (height / img.height));
                  } else {
                    w = width;
                    h = Math.round(img.height * (width / img.width));
                  }
                } else {
                  h = height;
                  w = Math.round(img.width * (height / img.height));
                }
              } else {
                if (img.width > img.height) {
                  w = width;
                  h = Math.round(img.height * (width / img.width));
                } else {
                  if (height / width > img.height / img.width) {
                    w = width;
                    h = Math.round(img.height * (width / img.width));
                  } else {
                    h = height;
                    w = Math.round(img.width * (height / img.height));

                  }
                }
              }
              return {
                width: w,
                height: h
              }
            },
            size = imgSize(imgDate);

        $('body').find('.seaimg-body').height(height + 40);
        $('body').find('.seaimg-body-img img').attr({
          'width': size.width,
          'height': size.height
        }).css({
          'marginLeft': -size.width / 2,
          'marginTop': -size.height / 2,
        }).fadeIn(600);
      },


      //图片切换函数
      slideTo: function() {
        $('body').find('.seaimg-body-img img').attr('src', this.model[this.dataIndex].img);
        this.size();
        this._preloadImg(this.dataIndex);
        this.show();
        //高亮
        $('body').find('.seaimg-nav li').removeClass('active').eq(this.dataIndex).addClass('active');
        //分也
        $('body').find('.seaimg-page .page-count').text(this.dataIndex + 1);
        $('body').find('.seaimg-page strong').text(this.model[this.dataIndex].title);
        $('body').find('.seaimg-page .page-count').attr('href', this.model[this.dataIndex].img);
      },
      //初始菜单
      initNav: function(){
        var con = $('body');
        this.navItmeWidth = con.find('.seaimg-nav li').outerWidth();
        $('body').find('.seaimg-nav ul').width(this.navItmeWidth*this.len + 10);
        $('body').find('.seaimg-nav li').eq(0).addClass('active');
      },
      //菜单滑动
      navSlide: function(width) {
        clearInterval(this.timer)
        this.timer = setTimeout(function(){
          $('body').find('.seaimg-nav-main ul').animate({left:width}, 600);
        },2)
      },
      show: function() {
        var dataIndex = this.dataIndex;
        if (dataIndex <= 5) {
          $('body').find('.seaimg-nav-prev').hide();
        } else if(dataIndex >= this.len - 6) {
          $('body').find('.seaimg-nav-next').hide();
        } else{
          $('body').find('.seaimg-nav-prev').show();
          $('body').find('.seaimg-nav-next').show();
        }
      }
    })
    //help
    //修改图片名
    //
  return seaimg;
});