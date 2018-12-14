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
  }
};
var _default = utils;
exports.default = _default;