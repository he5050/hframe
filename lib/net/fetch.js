'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchPack = function () {
  function FetchPack() {
    (0, _classCallCheck3.default)(this, FetchPack);

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.requestInit = {
      headers: headers,
      credentials: 'same-origin', // include:表示可以跨域传递cookie same-origin:表示只能同源传递cookie
      mode: 'cors',
      cache: 'default'
    };
  }

  (0, _createClass3.default)(FetchPack, [{
    key: 'post',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, body) {
        var respData, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                respData = {};
                _context.prev = 1;
                _context.next = 4;
                return (0, _isomorphicFetch2.default)(url, (0, _extends3.default)({}, this.requestInit, {
                  method: 'post',
                  body: (0, _stringify2.default)(body)
                }));

              case 4:
                resp = _context.sent;
                _context.next = 7;
                return resp.json();

              case 7:
                respData = _context.sent;


                if (respData.status === 500) {
                  respData.succ = false;
                  respData.msg = respData.message || '';
                }

                if (respData.status === 200) {
                  respData.succ = true;
                  respData.msg = respData.message || '';
                }
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](1);

                console.log('fetch get post', _context.t0);
                respData.succ = false;
                respData.msg = '\u7F51\u7EDC\u5F02\u5E38:' + _context.t0;

              case 17:

                // 判断是否有重定向
                if (respData.code === 302) {
                  window.location.href = respData.data[0];
                }
                return _context.abrupt('return', respData);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      function post(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
        var respData, resp;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                respData = {};
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _isomorphicFetch2.default)(url, (0, _extends3.default)({}, this.requestInit, {
                  method: 'get'
                }));

              case 4:
                resp = _context2.sent;
                _context2.next = 7;
                return resp.json();

              case 7:
                respData = _context2.sent;


                if (respData.status === 500) {
                  respData.succ = false;
                  respData.msg = respData.message || '';
                }

                if (respData.status === 200) {
                  respData.succ = true;
                  respData.msg = respData.message || '';
                }
                _context2.next = 17;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](1);

                console.log('fetch get err', _context2.t0);
                respData.succ = false;
                respData.msg = '\u7F51\u7EDC\u5F02\u5E38:' + _context2.t0;

              case 17:

                // 判断是否有重定向
                if (respData.code === 302) {
                  window.location.href = respData.data[0];
                }

                return _context2.abrupt('return', respData);

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 12]]);
      }));

      function get(_x3) {
        return _ref2.apply(this, arguments);
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
exports.default = fetchPack;
module.exports = exports['default'];