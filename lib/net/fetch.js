"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var FetchPack =
/*#__PURE__*/
function () {
  function FetchPack() {
    (0, _classCallCheck2.default)(this, FetchPack);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.requestInit = {
      headers: headers,
      // include:表示可以跨域传递cookie same-origin:表示只能同源传递cookie
      credentials: 'same-origin',
      mode: 'cors',
      cache: 'default'
    };
  }

  (0, _createClass2.default)(FetchPack, [{
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(url, body) {
        var respData, resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                respData = {};
                _context.prev = 1;
                _context.next = 4;
                return (0, _isomorphicFetch.default)(url, (0, _objectSpread2.default)({}, this.requestInit, {
                  method: 'post',
                  body: JSON.stringify(body)
                }));

              case 4:
                resp = _context.sent;
                _context.next = 7;
                return resp.json();

              case 7:
                respData = _context.sent;

                // 判断是否有重定向
                if (respData.code === 302) {
                  window.location.href = respData.data[0];
                }

                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                respData.succ = false;
                respData.msg = "\u7F51\u7EDC\u8BF7\u6C42\u5F02\u5E38";

              case 16:
                return _context.abrupt("return", respData);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 11]]);
      }));

      function post(_x, _x2) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(url) {
        var respData, resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                respData = {};
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _isomorphicFetch.default)(url, (0, _objectSpread2.default)({}, this.requestInit, {
                  method: 'get'
                }));

              case 4:
                resp = _context2.sent;
                _context2.next = 7;
                return resp.json();

              case 7:
                respData = _context2.sent;

                // 判断是否有重定向
                if (respData.code === 302) {
                  window.location.href = respData.data[0];
                }

                _context2.next = 16;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);
                console.log(_context2.t0);
                respData.succ = false;
                respData.msg = "\u7F51\u7EDC\u8BF7\u6C42\u5F02\u5E38";

              case 16:
                return _context2.abrupt("return", respData);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 11]]);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);
  return FetchPack;
}();
/**
 * 使用方法
 * import netApi from "./net.js";
 * netApi.getInstance().get('/api/???/list?xx=xx&&xxx=xxx').then(
 *  (ret) => {
 *    // 正常结果返回，已经经过json编码后的结果
 *  },
 *  (err) => {
 *    // 出错返回
 *  }
 * )
 */


var fetchPack = new FetchPack();
var _default = fetchPack;
exports.default = _default;