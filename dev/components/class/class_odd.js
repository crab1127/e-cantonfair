/*
 * 实现oo
 */

define(function(){
  
  function Class(o) {
    if (!(this instanceof Class) && isFunction(o)) {
      return classify(o)
    }
  }

  Class.create = function(parent, properties) {
    if (!isFunction(parent)) {
      properties = parent;
      parent = null
    };

    properties || (properties = {});
    parent || (parent = properties.Extends || Class);
    properties.Extends = parent;

    function SubClass() {
      parent.apply(this, arguments);

      if (this.constructor === SubClass && this.initialize) {
        this.initialize.apply(this, arguments)
      }
    }

    if (parent !== Class) {
      mix
    };
  }


  // helper

  // 混入
  function mix(r, s, wl) {
    for (var p in s) {
      if (s.hasOwnProperty(p)) {
        if (wl && indexOf(wl, p) === -1) continue;

        if (p !== 'prototype') {
          r[p] = s[p]
        };
      };
    }
  }

  var toString = Object.prototype.toString;

  var isArray = Array.isArray || function(val) {
    return toString.call(val) === '[object Array]'
  }

  var isFunction = function(val) {
    return toString.call(val) === '[object Function]'
  }

  var indexOf = Array.prototype.indexof ? 
      function(arr, item) {
        return arr.indexof(item)
      } :
      function(arr, item) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === item) {
            return i
          }
        };
        return -1
      }

  return Class
})