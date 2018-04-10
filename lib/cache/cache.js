"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cache = function () {
  function Cache() {
    (0, _classCallCheck3.default)(this, Cache);

    this.cache = {};
  }

  (0, _createClass3.default)(Cache, [{
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

      var curTime = +new Date();
      // 过期时间但尚未过期
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
module.exports = exports["default"];