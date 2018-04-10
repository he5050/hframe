"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CachePool = function () {
  function CachePool() {
    (0, _classCallCheck3.default)(this, CachePool);

    this.myCache = new _cache2.default();
  }

  (0, _createClass3.default)(CachePool, [{
    key: "get",
    value: function get(key) {
      return this.myCache.get(key);
    }
  }, {
    key: "set",
    value: function set(key, value, timeOut) {
      this.myCache.set(key, value, timeOut);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.myCache.clear();
    }
  }, {
    key: "clearWithKey",
    value: function clearWithKey(key) {
      this.myCache.clearWithKey(key);
    }
  }]);
  return CachePool;
}();

var cachePool = new CachePool();
exports.default = cachePool;
module.exports = exports["default"];