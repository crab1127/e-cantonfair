/*
 * 实现oo
 * 
 */

define(function(){
  var Class = function() {};

  Class.extend = function (prop) {

    var _super = this.prototype;
    //父类的实例付给变量protype
    var prototype = new this();

    //吧要扩张的属性复制到prototype上
    for (var name in prop) {
      //下面代码是让ctor里可以直接访问使用this._super访问父类构造函数，除了ctor的其他方法，this._super都是访问父类的实例
      prototype[name] = (name == 'init' && typeof prop[name] == 'function' &&
        typeof _super[name] == 'function') ?
        (function (name, fn) {
          return function () {
            var tmp = this._super;

            this._super = _super[name];
            var ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
          }
        })(name, prop[name]) :
        prop[name];
    }
    //console.log(prototype);

    //假的构造函数
    function Cfec() {
      this.init.apply(this, arguments);
    }

    //基础父类的静态属性
    for (var key in this) {
      if (this.hasOwnProperty(key) && key != 'extend') {
        Cfec[key] = this[key]
      };
    }
//    console.log(this);

    //之类的原型指向父类的实例
    Cfec.prototype = prototype;

    //
    Cfec.prototype._super = new this();

    if (prop.statics) {
      for (var name in prop.statics) {
        if (prop.statics.hasOwnProperty(name)) {
          Cfec[name] = prop.statics[name];
          if (name == 'init') {
            Cfec[name]()
          }
        }
      }
    };

    Cfec.prototype.constructor = Cfec;

    //原型可扩张
    Cfec.extendPrototype = function (prop) {
      for (var name in prop) {
        prototype[name] = prop[name]
      }
    }

    //任何Cfec.extend的返回对象都将具备extend方法
    Cfec.extend = arguments.callee;

    return Cfec;


  }
  
  return Class
})