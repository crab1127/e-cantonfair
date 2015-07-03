/**
 * req 获取路径上的参数
 * 
 * @autoe crab
 */
;(function(factory){
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window.req = factory()
  }
}(function() {
  

  var req = function(path) {
    path || (path = location.href);
    var querys = path.split('?')[1].split('&'),
        len = querys.length,
        query = {},
        i;

    for (i = 0; i < len; i++) {
      query[querys[i].split('=')[0]] = querys[i].split('=')[1];
    };

    return query;
  }
  return req;

}))

