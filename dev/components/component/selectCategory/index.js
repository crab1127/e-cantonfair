/**
 * 选择类目
 * time
 */

define('selectCategory', ['jquery', 'event', 'artTemplate'], function($, Event, artTemplate) {
  var template = '<div class="level">'
  +                '<ul>' 
  +                  '{{ each list}}'
  +                  '<li cid="{{$index}}"> {{$value}} {{if $value}}<span class="ico-nx-stage"></span> {{/if}}</li>'
  +                  '{{/each}}'
  +                '</ul>'
  +               '</div>';


  var selectCategory = Event.extend({
    //绑定事件
    bind: function() {
      var self = this;      
      var container = this.get('id');
      container.on('click', 'li', function(){
        var cid = $(this).attr('cid');
        self.fire('cateChang',self.get('model')[cid]);
      });
    },

    //渲染视图
    render: function() {
      //第一次渲染
      var render = artTemplate.compile(template);
      var html = render({
        list: this.get('model')
      });
      this.get('id').html(html);
    },
    getContent: function() {

    }
  })

  return selectCategory;
});


// define('selectCategory', ['jquery', 'event'], function($, Event){
// //类目选择
//  var selectCategory = Event.extend({
//    //
//    _getNum: function () {
//      return this.get('input').val().length;
//      // body...
//    },
//    bind: function(){
//      var self = this;
//      self.get('input').on('keyup', function(){
//        self.fire('Text', self._getNum());
//        self.render();
//      });
//    },
//    render: function() {
//      var num = this._getNum();
//      if ($('#J_input_count').length == 0) {
//        this.get('input').after('<span id="J_input_count"></span>')
//      };
//      $('#J_input_count').html(num+'个字');
//    }

//  });
//  return selectCategory;

// });

//正常的逻辑
//get('');