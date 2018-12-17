"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var utils = {
  // 例如url为: /sample
  // 传入的参数为: {id:123,typeId:2343}
  // /sample?id=123&typeId=2343
  buildQueryUrl: function buildQueryUrl(url, params) {
    // 判断url是否带参数
    var arrs = url.split("?");

    if (arrs[1] && arrs[1].length > 0) {
      var ps = arrs[1].split("&"); // 解析参数

      _lodash.default.each(ps, function (v, k) {
        var pa = v.split("=");

        if (pa.length === 2) {
          params[pa[0]] = unescape(pa[1]);
        }
      });
    } // url


    var paramsUrl = arrs[0];

    if (_lodash.default.size(params) > 0 && paramsUrl) {
      paramsUrl += "?";
      var first = true;

      _lodash.default.each(params, function (v, k) {
        if (v) {
          if (first) {
            paramsUrl += "".concat(k, "=").concat(v);
            first = false;
          } else {
            paramsUrl += "&".concat(k, "=").concat(v);
          }
        }
      });
    }

    return paramsUrl;
  },

  /**
   * @description 构建url
   * @param {String} url 原始地址
   * @param {Object} param 查询参数
   * @returns {String} 生成带参数的Url
   */
  buildQueryUrlSign: function buildQueryUrlSign() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var myURL = "";

    for (var key in param) {
      myURL += "&".concat(key, "=").concat(param[key]);
    }

    if (url) {
      return (url + "?" + myURL.substr(1)).replace(" ", "");
    } else {
      return myURL.substr(1).replace(" ", "");
    }
  },

  /**
   * @description 用于解析url
   * @param {String} url 要解析的url
   * @return {Object} query 返回查询的结果
   */
  parseQueryString: function parseQueryString(link) {
    var url = decodeURIComponent(link);
    var search = url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
    if (search === "") return {};
    search = search.split("&");
    var query = {};

    for (var i = 0; i < search.length; i++) {
      var pair = search[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }

    return query;
  },

  /**
   * 将数字转化成大些数字
   * @param {*} n
   */
  digitUppercase: function digitUppercase(n) {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    var num = Math.abs(n);
    var s = "";
    fraction.forEach(function (item, index) {
      s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, "");
    });
    s = s || "整";
    num = Math.floor(num);

    for (var i = 0; i < unit[0].length && num > 0; i += 1) {
      var p = "";

      for (var j = 0; j < unit[1].length && num > 0; j += 1) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }

      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }

    return s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
  },

  /**
   * 前补0
   * @param {*} val
   */
  fixedZero: function fixedZero(val) {
    return val * 1 < 10 ? "0".concat(val) : val;
  },

  /**
   * 获取一个时间距离,一天，一周，一月，一年
   * @param {*} type
   */
  getTimeDistance: function getTimeDistance(type) {
    var now = new Date();
    var oneDay = 1000 * 60 * 60 * 24;

    if (type === "today") {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [(0, _moment.default)(now), (0, _moment.default)(now.getTime() + (oneDay - 1000))];
    }

    if (type === "week") {
      var day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);

      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }

      var beginTime = now.getTime() - day * oneDay;
      return [(0, _moment.default)(beginTime), (0, _moment.default)(beginTime + (7 * oneDay - 1000))];
    }

    if (type === "month") {
      var year = now.getFullYear();
      var month = now.getMonth();
      var nextDate = (0, _moment.default)(now).add(1, "months");
      var nextYear = nextDate.year();
      var nextMonth = nextDate.month();
      return [(0, _moment.default)("".concat(year, "-").concat(fixedZero(month + 1), "-01 00:00:00")), (0, _moment.default)((0, _moment.default)("".concat(nextYear, "-").concat(fixedZero(nextMonth + 1), "-01 00:00:00")).valueOf() - 1000)];
    }

    if (type === "year") {
      var _year = now.getFullYear();

      return [(0, _moment.default)("".concat(_year, "-01-01 00:00:00")), (0, _moment.default)("".concat(_year, "-12-31 23:59:59"))];
    }
  },

  /**
   *
   * @desc 获取浏览器类型和版本
   * @return {String}
   */
  getExplore: function getExplore() {
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0; // 根据关系进行判断

    if (sys.ie) return "IE: " + sys.ie;
    if (sys.edge) return "EDGE: " + sys.edge;
    if (sys.firefox) return "Firefox: " + sys.firefox;
    if (sys.chrome) return "Chrome: " + sys.chrome;
    if (sys.opera) return "Opera: " + sys.opera;
    if (sys.safari) return "Safari: " + sys.safari;
    return "Unkonwn";
  },

  /**
   *
   * @desc 获取操作系统类型
   * @return {String}
   */
  getOS: function getOS() {
    var userAgent = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || "";
    var appVersion = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";
    if (/mac/i.test(appVersion)) return "MacOSX";
    if (/win/i.test(appVersion)) return "windows";
    if (/linux/i.test(appVersion)) return "linux";
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) "ios";
    if (/android/i.test(userAgent)) return "android";
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
  },

  /**
   * 用于把用utf16编码的字符转换成实体字符，以供后台存储
   * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
   * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
   */
  utf16toEntities: function utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则

    str = str.replace(patt, function (char) {
      var H, L, code;

      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位

        L = char.charCodeAt(1); // 取出低位

        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法

        return "&#" + code + ";";
      } else {
        return char;
      }
    });
    return str;
  },

  /**
   * 用于解析出 emoji表情 把上面转的16位 直接转出来
   * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
   * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
   */
  entitiestoUtf16: function entitiestoUtf16(str) {
    // 检测出形如&#12345;形式的字符串
    var strObj = this.utf16toEntities(str);
    var patt = /&#\d+;/g;
    var H, L, code;
    var arr = strObj.match(patt) || [];

    for (var i = 0; i < arr.length; i++) {
      code = arr[i];
      code = code.replace("&#", "").replace(";", ""); // 高位

      H = Math.floor((code - 0x10000) / 0x400) + 0xD800; // 低位

      L = (code - 0x10000) % 0x400 + 0xDC00;
      code = "&#" + code + ";";
      var s = String.fromCharCode(H, L);
      strObj = strObj.replace(code, s);
    }

    return strObj;
  },

  /**
   * 用于生成指定长度的随机字符串
   * @param  {Length} length 需要生成的字符串的长度
   * @return {string}     返回新生成的字符串
   */
  randomString: function randomString(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }

    var str = "";

    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }

    return str;
  },
  promiseHandle: function promiseHandle(API) {
    if (typeof API === "function") {
      return function (options) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
          API.apply(void 0, [Object.assign({}, options, {
            success: resolve,
            fail: reject
          })].concat(params)); // 这是es7中的属性，用于处理最终状态

          Promise.prototype.finally = function (callback) {
            var P = this.constructor;
            return this.then(function (value) {
              return P.resolve(callback()).then(function () {
                return value;
              });
            }, function (error) {
              return P.resolve(callback()).then(function () {
                throw error;
              });
            });
          };
        });
      };
    }
  },
  pHandle: function pHandle(fn) {
    return function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        obj.success = function (res) {
          resolve(res);
        };

        obj.fail = function (res) {
          reject(res);
        };

        fn(obj);
      });
    };
  }
};
var _default = utils;
exports.default = _default;