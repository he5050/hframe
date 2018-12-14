"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Cache =
/*#__PURE__*/
function () {
  function Cache() {
    (0, _classCallCheck2.default)(this, Cache);
    this.cache = {};
  }

  (0, _createClass2.default)(Cache, [{
    key: "set",
    value: function set(key, value, expire) {
      this.cache[key] = {
        value: value,
        expire: expire,
        insertTime: +new Date()
      };
    }
  }, {
    key: "get",
    value: function get(key) {
      var cNode = this.cache[key];

      if (!cNode) {
        return null;
      }

      var insertTime = cNode.insertTime,
          expire = cNode.expire,
          value = cNode.value;

      if (!expire) {
        // 如果不存在过期时间
        return value;
      }

      var curTime = +new Date(); // 过期时间但尚未过期

      if (curTime - insertTime < expire) {
        return value;
      }

      delete this.cache[key];
      return null;
    }
  }, {
    key: "clearWithKey",
    value: function clearWithKey(key) {
      delete this.cache[key];
    }
  }, {
    key: "clear",
    value: function clear() {
      delete this.cache;
      this.cache = {};
    }
  }]);
  return Cache;
}();

exports.default = Cache;