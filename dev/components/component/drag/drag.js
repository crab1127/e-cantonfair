define('drag', ['jquery', 'base'], function($, Base) {
  var drag = Base.extend({
    
    render: function() {
      var num = this._getNum();

      if($('#j_count').length === 0) {
        this.get('input').after('<span id="j_count"></span>');
      }

      $('#j_count').html(num +　'个字');
    },
    _getNum: function() {
      return this.get('input').val().length;
    },
    bind: function() {
      var self = this;
      self.get('input').on('keyup', function(){
        self.render();
      })
    }
  });

  return drag
})