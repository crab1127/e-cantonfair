//Cookie

define(function(){
  var decode = decodeURIComponent, 
      encode = encodeURIComponent,
      Cookie = {
        get : function(name) {
          validateCookieName(name);

          var cookies = parseCookie(document.cookie);

          return cookies[name];
        },
        set : function(name, value, options) {
          validateCookieName(name);

          options = options || {};

          var expires = options.expires,
              domain = options.domain,
              path = options.path;

          value = encode(value);

          var text = name + '=' + value;

          var date = expires;

          if (typeof date === 'number') {
            date = new Date();
            date.setDate(date.getDate() + expires);
          }
          if (date instanceof Date) {
            text += '; expires=' + date.toUTCString();
          }

          // domain
          if (isNonEmptyString(domain)) {
            text += '; domain=' + domain;
          }

          // path
          if (isNonEmptyString(path)) {
            text += '; path=' + path;
          }

          // secure
          if (options['secure']) {
            text += '; secure';
          }

          document.cookie = text;

          return text;
        },
        remove : function(name, options) {
          options = options || {};
          options['expires'] = new Date(0);
          return Cookie.set(name, '', options);
        }
      };

  function parseCookie(text, shouldDecode) {
    var cookies = {};

    if (isString(text) && text.length > 0) {
      var cookieParts = text.split(/;\s/g),
          cookieLen = cookieParts.length,
          cookieName,
          cookieValue,
          cookieNameValue,
          i;

      for (i = 0; i < cookieLen; i++) {
        
        cookieNameValue = cookieParts[i].match(/([^=]+)=/i);

        if (cookieNameValue instanceof Array) {
          try {
            cookieName = decode(cookieNameValue[1]);
            cookieValue = decode(cookieParts[i].substring(cookieNameValue[1].length + 1))
          } catch (ex) {

          }
        } else {
          cookieName = decode(cookieParts[i]);
          cookieValue = '';
        }

        if (cookieName) {
          cookies[cookieName] = cookieValue;
        }
      }
    }

    return cookies;
  }

  function isString(s) {
    return typeof s === 'string';
  }

  function isNonEmptyString(s) {
    return isString(s) && s !== '';
  }

  function validateCookieName(name) {
    if (!isNonEmptyString(name)) {
      throw new TypeError('cookie为字符串格式')
    }
  }

  

  return Cookie
})