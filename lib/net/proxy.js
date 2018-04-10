"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _cache_manger = require("../cache/cache_manger");

var _cache_manger2 = _interopRequireDefault(_cache_manger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Proxy = function () {
  /**
   * 构造函数
   * @param {*} host 服务器地址
   * @param {*} port 服务器端口
   */
  function Proxy(host, port) {
    (0, _classCallCheck3.default)(this, Proxy);

    this.host = host;
    this.port = port;
  }

  /**
   * 代理post请求
   * @param {*} path 请求地址
   * @param {*} body body
   * @param {*} session 用户session，可以为空
   */


  (0, _createClass3.default)(Proxy, [{
    key: "Post",
    value: function Post(path, body, session) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var data = {
          succ: false,
          msg: "",
          data: [],
          code: 404,
          count: 0
        };

        var bodyString = new Buffer((0, _stringify2.default)(body));
        var headers = {
          'Content-Type': 'application/json',
          'Content-Length': bodyString.length
        };
        if (session) {
          headers['Login-User'] = encodeURIComponent((0, _stringify2.default)(session));
        }

        var options = {
          path: path,
          method: "POST",
          headers: headers,
          host: _this.host,
          port: _this.port
        };

        var req = _http2.default.request(options, function (res) {
          res.setEncoding('utf8');
          var chunks = "";
          res.on('data', function (chunk) {
            chunks += chunk;
          });
          res.on('end', function () {
            if (res.statusCode != 200) {
              data.msg = '服务器应答异常';
              data.code = res.statusCode;
              resolve(data);
            } else {
              if (chunks === "") {
                data.msg = '服务器异常';
                data.code = res.statusCode;
                resolve(data);
              } else {
                try {
                  var json = JSON.parse(chunks);
                  resolve(json);
                } catch (e) {
                  data.msg = '数据请求异常';
                  data.code = res.statusCode;
                  resolve(data);
                }
              }
            }
          });
          res.on('error', function (e) {
            data.msg = e.message;
            data.code = 404;
            resolve(data);
          });
        });

        // 设置请求超时30秒
        req.setTimeout(30000);

        req.on('error', function (e) {
          if (req.res && req.res.abort && typeof req.res.abort === 'function') {
            req.res.abort();
          }
          req.abort();
          data.msg = '服务器错误';
          data.code = 404;
          resolve(data);
        }).on('timeout', function (e) {
          if (req.res && req.res.abort && typeof req.res.abort === 'function') {
            req.res.abort();
          }
          req.abort();
          data.msg = 'request timeout';
          data.code = 404;
          resolve(data);
        });

        req.write(bodyString);
        req.end();
      });
    }

    /**
     * 代理get请求
     * @param {*} path 请求地址
     * @param {*} user 用户session，可以为空
     * @param {*} isCache 是否需要缓存，默认不需要
     * @param {*} expiration 缓存时间间隔，单位毫秒
     */

  }, {
    key: "Get",
    value: function Get(path, session) {
      var _this2 = this;

      var isCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var expiration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;

      return new _promise2.default(function (resolve, reject) {
        if (isCache) {
          var cData = _cache_manger2.default.get(path);
          if (cData !== null) {
            return resolve(cData);
          }
        }

        var headers = {
          'Content-Type': 'application/json'
        };
        if (session) {
          headers['Login-User'] = encodeURIComponent((0, _stringify2.default)(session));
        }

        var options = {
          path: path,
          method: "GET",
          headers: headers,
          host: _this2.host,
          port: _this2.port
        };
        var data = {
          succ: false,
          msg: "",
          data: [],
          code: 404,
          count: 0
        };

        var req = _http2.default.request(options, function (res) {
          res.setEncoding('utf8');
          var chunks = "";
          res.on('data', function (chunk) {
            chunks += chunk;
          });
          res.on('end', function () {
            if (res.statusCode != 200) {
              data.msg = '服务器应答异常';
              data.code = res.statusCode;
              resolve(data);
            } else {
              if (chunks === "") {
                data.msg = '服务器异常';
                data.code = res.statusCode;
                resolve(data);
              } else {
                try {
                  var json = JSON.parse(chunks);
                  if (isCache) {
                    _cache_manger2.default.set(path, json, expiration);
                  }
                  resolve(json);
                } catch (e) {
                  data.msg = '数据请求异常';
                  data.code = res.statusCode;
                  resolve(data);
                }
              }
            }
          });
          res.on('error', function (e) {
            data.msg = e.message;
            data.code = 404;
            resolve(data);
          });
        });

        // 设置请求超时30秒
        req.setTimeout(30000);

        req.on('error', function (e) {
          if (req.res && req.res.abort && typeof req.res.abort === 'function') {
            req.res.abort();
          }
          req.abort();
          data.msg = '服务器错误';
          data.code = 404;
          resolve(data);
        }).on('timeout', function (e) {
          if (req.res && req.res.abort && typeof req.res.abort === 'function') {
            req.res.abort();
          }
          req.abort();
          data.msg = 'request timeout';
          data.code = 404;
          resolve(data);
        });

        req.end();
      });
    }
  }]);
  return Proxy;
}();

exports.default = Proxy;
module.exports = exports["default"];