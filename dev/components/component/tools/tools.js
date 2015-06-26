define(function () {
    "use strict";

    var exports = {}, isFunction, isArray, isString, isObject, isNumber;

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }

    exports.isFunction = isFunction = isType("Function");
    exports.isArray = isArray = isType("Array");
    exports.isString = isString = isType("String");
    exports.isObject = isObject = isType("Object");
    exports.isNumber = isNumber = isType("Number");

    /**
     * @param obj
     * @param callback
     * @returns {*}
     */

    function each(obj, callback) {
        var prop;
        if (!(isFunction(callback) && isObject(obj)))
            return obj;

        for (prop in obj) {
            if (!obj.hasOwnProperty(prop))
                continue;

            if (callback(prop, obj[prop], obj))
                break;
        }
    }

    /**
     * @param arr
     * @param callback
     * @returns {*}
     */

    function arrayEach(arr, callback) {
        var i, len;

        if (!( isArray(arr) && arr.length > 0 && isFunction(callback)))
            return arr;

        for (i = 0, len = arr.length; i < len; i++) {
            if (callback(i, arr[i], arr))
                break;
        }
    }

    /**
     * @param obj
     * @param callback
     * @param record
     * @param baseObj
     * @param compObj
     */

    function getObjectCascadeKeys(obj, callback, record, baseObj, compObj) {
        if (!( arguments.length >= 5
            && isObject(obj)
            && isFunction(callback)
            && isArray(record)
            && isObject(compObj))) return;

        each(obj, function (key, val) {
            record.push(key);
            if (isObject(val)) {
                getObjectCascadeKeys(val, callback, record, baseObj, compObj);
            }
            callback(baseObj, compObj, record);
            record.pop();
        });
    }

    /**
     * @param baseObj
     * @param compObj
     * @param keyArr
     */

    function compare(baseObj, compObj, keyArr) {
        var base = baseObj, comp = compObj;
        arrayEach(keyArr, function (idx, val) {
            if (!comp.hasOwnProperty(val)) {
                comp[val] = base[val];
                return true;
            }
            comp = comp[val];
            base = base[val];
        });
    }

    /**
     * @param target
     * @param source
     * @param isDeep
     * @returns {Object}
     */

    function mix(target, source, isDeep) {

        if (arguments.length === 0)
            return exports;

        if (arguments.length === 1) {
            source = target;
            target = exports;
            isDeep = false;
        }

        if (arguments.length === 2) {
            isDeep = false;
        }

        if (!(isObject(target) && isObject(source)))
            return target;

        if (isDeep) {
            getObjectCascadeKeys(source, compare, [], source, target);
        }
        else {
            each(source, function (key, val) {
                target[key] = target.hasOwnProperty(key)
                    ? target[key]
                    : val;
            });
        }

        return target;
    }

    function clone(obj, isDeep) {
        var ret;
        if (!(isArray(obj) || isObject(obj)))
            return obj;

        ret = obj.constructor === Array ? [] : {};

        each(obj, function (key, val) {
            ret[key] = isDeep ? clone(val) : val;
        });

        return ret;
    }

    exports.mix = mix;
    exports.each = each;
    exports.arrayEach = arrayEach;

    exports.mix({

        /**
         * @param str
         * @returns {String}
         */

        trim: function (str) {
            var start, end, len;
            if (!isString(str)) return str;

            start = 0;
            end = len = str.length - 1;

            while (start >= 0 && str.charCodeAt(start) <= 32) {
                start++;
            }

            while (end <= len && str.charCodeAt(end) <= 32) {
                end--;
            }

            return start > 0 || end < len
                ? str.substring(start, end) : str;
        },

        /**
         * @param start
         * @param end
         * @param num
         * @returns {Array}
         */

        random: function (start, end, num) {
            var record, i, len, cur, ret;

            if (arguments.length === 0) {
                start = 0;
                end = -(1 << 31);
                num = 1;
            }

            if (arguments.length === 1) {
                start = 0;
                end = -( 1 << 31);
                num = start;
            }

            if (arguments.length === 2) {
                num = end;
                end = start;
                start = 0;
            }

            // 如果可用数小于num，则num设置为所有数集的中大个数
            if (end - start <= num) {
                num = end - start;
            }

            end = end - start + 1;
            record = {};
            ret = [];

            while (ret.length < num) {
                len = num - ret.length;
                for (i = 0; i < len; i++) {
                    cur = ~~(Math.random() * end) + start;
                    if (record[cur] === 1) continue;
                    record[cur] = 1;
                    ret.push(cur);
                }
            }

            return ret;
        },

        /**
         * 只能接受基础数据类型的数组，不接受引用数据类型的数组
         * @param arr
         * @returns {Array}
         */

        unique: function (arr) {
            var ret, record, i, len, cur;

            if ( !( isArray(arr) && arr.length > 0 ) ) return arr;

            for ( i = 0, len = arr.length; i < len; i++ ){
                cur = arr[i];
                if ( record[ cur ] === 1 ) continue;

                ret.push( cur );
                record[ cur ] = 1;
            }
            return ret;
        },

        clone: function (obj, isDeep) {
            var ret;

            if (!isObject(obj)) return obj;

            if (isObject(JSON)
                && isFunction(JSON.stringify)
                && isFunction(JSON.parse) && isDeep) {
                ret = JSON.parse(JSON.stringify(obj));
            } else {
                ret = clone(obj, isDeep);
            }
            return ret;
        },

        log: function (){
        	if(window && window.console){
                Function.apply.call(console.log, console, arguments);
            }
        },

        Queue: Queue
    });


    /**
     * 模拟一个队列，用于组件中的缓存。先进先出。
     *
     * @param len 如果存储的数据的个数超出了len，则删除第一个。默认50。
     * @constructor
     */

    function Queue(len) {
        if (!this instanceof Queue)
            return this;

        var queue = this.queue = {};
        this.length = len || 50;
        this.record = 0;

        arrayEach(new Array(this.length), function (key) {
            queue[key] = undefined;
        });
    }

    exports.mix(Queue.prototype, {
        constructor: Queue,

        add: function (con) {
            // 如果当前存储数量已满，则删除第一个存储
            // 之后排序，再将元素添加到最后
            if (this.isFull()) {
                this.remove();
            }
            this.queue[this.record] = con;
            this.record++;
        },

        remove: function () {
            // 删除第一条，将剩余的数据排序
            var queue = this.queue,
                temp = queue["0"], record, i = 0;

            this.queue["0"] = undefined;
            this.record--;
            // 排序
            for (record = this.record + 1; i < record; i++) {
                queue["" + i] = queue["" + (i + 1)];
            }
            return temp;
        },

        element: function () {
            return this.queue[0];
        },

        isFull: function () {
            return this.record >= this.length;
        },

        isEmpty: function () {
            return this.record === 0;
        },

        size: function () {
            return this.record;
        },

        values : function(){
            var values = [], i = 0, cur,
                queue = this.queue;
            for ( ; ((cur = queue["" + (i++)]) != undefined); ){
                values.push(cur);
            }
            return values;
        }
    });

    return exports;
});