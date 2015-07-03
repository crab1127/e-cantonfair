### 工具函数：提供一些常用的小功能函数
组件中需要的函数

+ 参数判断
  * isFunction
  * isArray
  * isString
  * isObject
  * isNumber

+ 数据操作
  * each(obj, callback)
    > 遍历一个Object并执行回调，回调中传入的参数为(prop, val, obj)。如果回调函数return true。
    > 则会停止遍历
    > * @param {Object} obj - 只能是Object类型，不能是Array。Array请用arrayEach
    > * @param {Function} callback - 回调函数

  * arrayEach(obj, callback)
    > 用法同each，因为for 比 for in 更快，所以单独列出一个arrayEach函数

  * mix(target, source, isDeep)
    > 混淆一个对象，并返回target。如果isDeep为false，则直接混淆第一层，如果为false。
    > 会对比每一层的的属性
    > 如果target对象上没有对应的key，则将source中的Key赋值给target
    > * @param {Object} target - 目标对象
    > * @param {Object} source - 对比对象
    > * @param {Boolean} isDeep - 对比对象
    > * @return {Object} target

  * trim(str)
    > 清除字符串首尾的空格
    > * @param {String} str
    > * @return {String} 返回一个新的字符串

  * unique(arr)
    > 去掉数组中相同的元素，只限于基础类型的数组。

  * random(start, end, num)
    > 生成一组随机数, start, end指定范围，num指定生成的个数
    > * @param { ? Number } start - 可选，如果没设置，则为0
    > * @param { ? Number } end - 可选，如果没设置，则为-(1 << 31)
    > * @param { ? Number } num - 可选，如果没设置，则为1
    > * @return {Array}

  * clone(obj, isDeep)
    > 克隆一个对象
    > * @param {Object} obj - 需要克隆的对象
    > * @param {Boolean} isDeep - 是否深层次clone。（如果是Jquery这样的对象，不要使用深层次克隆）

  * log(args)
    > 输出日志
    > * @param {Object} obj - 任意值
   

  * Queue(len)
    > 创建一个队列对象，队列存储数据的长度为len。如果超出了这个长度，则删除最先存入的数据。也就是先进先出的原则。
    > Api上模拟java.util.Queue。
    > * api说明
    >   + add(con)  添加一个对象
    >   + remove()  移除并返回第一个对象
    >   + element() 返回第一个对象
    >   + isFull()  是否存满
    >   + isEmpty() 是否为空
    >   + size()    目前存入量
    >   + values()  所以存入的非undefined的值