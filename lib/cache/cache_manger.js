"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cache = _interopRequireDefault(require("./cache"));

var CachePool =
/*#__PURE__*/
function () {
  function CachePool() {
    (0, _classCallCheck2.default)(this, CachePool);
    this.myCache = new _cache.default();
  }

  (0, _createClass2.default)(CachePool, [{
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
var _default = cachePool;
exports.default = _default;