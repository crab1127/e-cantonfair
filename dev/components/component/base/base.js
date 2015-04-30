/*
 * 抽出组件公共的方法。
 * init 初始化属性
 * render 渲染
 * bind 事件绑定
 */

 define('base', ['class'], function(Class){
  var Base = Class.extend({
    init: function(config) {
      //自动保存配置
      this.__config = config;
      this.bind();
      this.render();
    },
    // 获取配置项
    get: function(key) {
      return this.__config[key];
    },
    // 设置配置项
    set: function(key, value) {
      this.__config[key] = value;
    },
    render: function(){

    },
    bind: function(){
      
    },
    //定义销毁的方法，一些收尾的工作都应该放在这
    destroy: function(){

    }
  })
  return Base
 })