/**
 * 选择类目
 * time
 */

define('selectCategory', ['jquery', 'event', 'artTemplate'], function($, Event, artTemplate) {
  var template = '<div class="level">'
  +                '<ul>'
  +                  '{{ each list}}'
  +                  '<li data-indusid="{{$value.indusId}}" > {{$value.indusName}} <span class="ico-nx-stage"> > </span></li>'
  +                  '{{/each}}'
  +                '</ul>'
  +               '</div>';
  var template2 = '{{ each list as slist}}'
  +                '<div class="level level-son" data-level="{{$index}}">'
  +                '<ul>'
  +                  '{{ each slist}}'
  +                  '<li data-parentid="{{$value.categoryId}}"> {{$value.categoryName}} {{if $value.categoryType != 3 }} <span class="ico-nx-stage"> > </span> {{/if}} </li>'
  +                  '{{/each}}'
  +                '</ul>'
  +               '</div>'
  +               '{{/each}}';

  var selectCategory = Event.extend({
    //路径面包屑
    crumbs: function(){
      return this.crumbs;
    },
    //绑定事件
    bind: function() {
      var self = this;
      //容器
      var container = this.get('id');
      container.html('<div class="panel-container"></div>');
      this.container = this.get('id').find('.panel-container');
      //顶级类目接口
      var api = self.get('api');
      //当前获取的类目
      //顶级类目
      this.topModel = [];
      //中间类目
      this.middleModel = [];
      //是否顶级类目
      this.topLevel = true;
      //面包屑
      this.crumbs = [];


      //获取顶级类目数据
      $.ajax({
        type: 'GET',
        url: api[0],
        async: false,
        dataType: 'json',
        success:function(data){
          if ('success' === data.status) {
            self.topModel = data.data;
          }
        }
      });

      container.on('click', 'li', function(){
        var indusId = $(this).data('indusid');
        var parentId = $(this).data('parentid');
        var level = 0;
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');

        self.topLevel = false;
        var index = $(this).index();

        //判断是一级类目， 还是中间类目;
        var id = indusId ? indusId : parentId;
        var type = indusId ? 'indusId' : 'parentId';
        var api = indusId ? self.get('api')[1] : self.get('api')[2];


        //生成面包屑
        if ('parentId' === type) {
          //中间类目
          level = parseInt($(this).parents('.level').data('level')) + 1;
          self.crumbs.splice(level);
          self.crumbs.push(self.middleModel[level - 1][index]);
          self.fire('cateChang',self.middleModel[level - 1][index]);

        } else {
          //顶级类目
          self.crumbs = [];
          self.crumbs.push(self.topModel[index]);
          self.fire('cateChang',self.topModel[index]);
        }

        if (self.get('isOneLevel') && level === 1) {
          return false;
        }


        //判断是否最后一级类目
        if (level && self.middleModel[level - 1][index].categoryType === 3) {
          return false;
        }

        //获取中间层级类目
        $.get(api + '?' + type + '=' + id, function(data){
          self.middleModel.splice(level);
          self.middleModel.push(data.data);
          self.render();
        },'json');
        self.container.width(self.container.find('.level').outerWidth() * (level + 2));

      });
    },

    //渲染视图
    render: function() {
      //第一次渲染
      var initTemplate = this.topLevel ?　template : template2;
      var model = this.topLevel ? this.topModel : this.middleModel;


      var render = artTemplate.compile(initTemplate);
      var html = render({
        list: model
      });
      if (this.topLevel) {
        this.container.html(html);
      } else {
        this.container.find('.level-son').remove();
        this.container.append(html);
      }

    },
    getContent: function() {

    }
  });

  return selectCategory;
});