/*
 * 引入观察者模式
 * 减少事件耦合
 */
define('event', ['class'], function(Class){

  //help 获取数组里摸个元素的索引
  var _indexOf = function(array, key) {
    if (array === null) return -1;
    var i = 0, length = array.length;
    for (, i < length; i++) {
      if (array[i] === key) return i;
    }
    return -1;
  }

  var Event = Class.extend({
    //添加监听
    on: function(key, listener) {
      //this.__events 储存处理函数
      if (!this._events) {
        this._events = {}
      }
      if (!this._events[key]) {
        this._events[key] = []
      }
      if (_indexOf(this._events, listener) !== -1 && typeof listener === 'function') {
        this._events[key].push(listener)
      };

      return this
    },

    //触发一个请求
    fire: function(key) {
      if (!this._events || !this._evnents[key]) return;
      var args = Array.prototype.slice.call(arguments, 1) || [];

      var listeners = this._events[key]
      var i = 0;
      var l = listeners.length;

      for (; i < l; i++) {
        listeners[i].apply(this, args)
      }

      return this
    }

    //取消监听
    off: function(key, listener) {
      if (!key && !listener) {
        this._events = {}
      }
      if (key && !listener) {
        delete this._events[key]
      }

      if (key && listener) {
        var listeners = this._events[key]
        var index = _indexOf(listeners, listener);

        (index > -1) && listeners.splice(index, 1)
      }

      return this
    }
  })

  return Event;
})