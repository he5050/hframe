"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _oss_tool = require("./oss_tool");

var _oss_tool2 = _interopRequireDefault(_oss_tool);

var _fetch = require("../net/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OSSClient = function () {
  function OSSClient() {
    var baseDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'test';
    var renderType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'server';
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'development';
    var keyId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var custom = arguments[4];
    (0, _classCallCheck3.default)(this, OSSClient);

    if (renderType === 'client') {
      // 本对象的唯一ID,keyId是服务器端生成的,通过shortId.generate(),再结合客户端生成的,保证唯一性
      if (keyId) {
        this.keyId = keyId + "_" + _shortid2.default.generate();
      } else {
        this.keyId = _shortid2.default.generate();
      }

      // 传输序号
      this.index = 0;

      // oss客户端
      this.ossClient = null;
      // 配置信息
      this.ossCnf = (0, _extends3.default)({}, _oss_tool2.default.getOSSCnf(mode, baseDir, custom));
      // token信息
      this.ossToken = {};
    }

    this.renderType = renderType;
  }

  (0, _createClass3.default)(OSSClient, [{
    key: "getOSSToken",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _fetch2.default.get('/ossToken');

              case 3:
                resp = _context.sent;

                if (!resp.succ) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  success: true,
                  accessKeyId: resp.data[0].AccessKeyId,
                  accessKeySecret: resp.data[0].AccessKeySecret,
                  stsToken: resp.data[0].SecurityToken,
                  expiration: resp.data[0].Expiration
                });

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                console.log(_context.t0);

              case 11:
                return _context.abrupt("return", {
                  success: false
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getOSSToken() {
        return _ref.apply(this, arguments);
      }

      return getOSSToken;
    }()

    /**
     * 检查oss客户端是否正常生成
     * @returns {Promise.<boolean>}
     */

  }, {
    key: "hasOSSClient",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var expiration, ossToken, ex;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.renderType !== 'client')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                expiration = this.ossToken.expiration;
                ossToken = {};
                // 判断token是否过期

                if (!expiration) {
                  _context2.next = 15;
                  break;
                }

                // 取得过期时间差
                ex = parseInt((new Date(expiration).getTime() - new Date().getTime()) / 1000);

                if (!(ex < 300)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 9;
                return this.getOSSToken();

              case 9:
                ossToken = _context2.sent;
                _context2.next = 13;
                break;

              case 12:
                return _context2.abrupt("return", true);

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.next = 17;
                return this.getOSSToken();

              case 17:
                ossToken = _context2.sent;

              case 18:
                if (ossToken.success) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt("return", false);

              case 20:

                this.ossToken = (0, _extends3.default)({}, _lodash2.default.omit(ossToken, 'success'));
                this.ossClient = new OSS.Wrapper({
                  region: this.ossCnf.region,
                  bucket: this.ossCnf.bucket,
                  secure: true,
                  accessKeyId: ossToken.accessKeyId,
                  accessKeySecret: ossToken.accessKeySecret,
                  stsToken: ossToken.stsToken
                });

                return _context2.abrupt("return", true);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hasOSSClient() {
        return _ref2.apply(this, arguments);
      }

      return hasOSSClient;
    }()
  }, {
    key: "uploadFiles",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(files, uploadDir) {
        var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'jpg';
        var progress = arguments[3];
        var checkpoint = arguments[4];

        var hasOssClient, filePaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v, key, result;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (uploadDir) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('参数异常');

              case 2:
                _context3.next = 4;
                return this.hasOSSClient();

              case 4:
                hasOssClient = _context3.sent;

                if (hasOssClient) {
                  _context3.next = 7;
                  break;
                }

                throw new Error('客户端错误');

              case 7:
                filePaths = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 11;
                _iterator = (0, _getIterator3.default)(files);

              case 13:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 31;
                  break;
                }

                v = _step.value;
                key = this.ossCnf.baseDir + "/" + uploadDir + "/" + this.keyId + "_" + this.index + "." + suffix;

                // 传输序号递增

                this.index += 1;

                result = void 0;

                if (!progress) {
                  _context3.next = 24;
                  break;
                }

                _context3.next = 21;
                return this.ossClient.multipartUpload(key, v, {
                  checkpoint: checkpoint,
                  progress: progress
                });

              case 21:
                result = _context3.sent;
                _context3.next = 27;
                break;

              case 24:
                _context3.next = 26;
                return this.ossClient.multipartUpload(key, v);

              case 26:
                result = _context3.sent;

              case 27:

                filePaths.push(this.ossCnf.hostUrl + "/" + result.name);

              case 28:
                _iteratorNormalCompletion = true;
                _context3.next = 13;
                break;

              case 31:
                _context3.next = 37;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t0 = _context3["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 37:
                _context3.prev = 37;
                _context3.prev = 38;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 40:
                _context3.prev = 40;

                if (!_didIteratorError) {
                  _context3.next = 43;
                  break;
                }

                throw _iteratorError;

              case 43:
                return _context3.finish(40);

              case 44:
                return _context3.finish(37);

              case 45:
                return _context3.abrupt("return", filePaths);

              case 46:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[11, 33, 37, 45], [38,, 40, 44]]);
      }));

      function uploadFiles(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return uploadFiles;
    }()

    // 上传图片，文件名随机生成

  }, {
    key: "uploadFile",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(file, uploadDir) {
        var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'jpg';
        var progress = arguments[3];
        var checkpoint = arguments[4];
        var hasOssClient, result, key;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (uploadDir) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('参数异常');

              case 2:
                _context4.next = 4;
                return this.hasOSSClient();

              case 4:
                hasOssClient = _context4.sent;

                if (hasOssClient) {
                  _context4.next = 7;
                  break;
                }

                throw new Error('客户端错误');

              case 7:

                // 传输序号递增
                this.index += 1;
                result = void 0;
                key = this.ossCnf.baseDir + "/" + uploadDir + "/" + this.keyId + "_" + this.index + "." + suffix;

                if (!progress) {
                  _context4.next = 22;
                  break;
                }

                if (!checkpoint) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 14;
                return this.ossClient.multipartUpload(key, file, {
                  checkpoint: checkpoint,
                  progress: progress
                });

              case 14:
                result = _context4.sent;
                _context4.next = 20;
                break;

              case 17:
                _context4.next = 19;
                return this.ossClient.multipartUpload(key, file, {
                  progress: progress
                });

              case 19:
                result = _context4.sent;

              case 20:
                _context4.next = 25;
                break;

              case 22:
                _context4.next = 24;
                return this.ossClient.multipartUpload(key, file);

              case 24:
                result = _context4.sent;

              case 25:
                return _context4.abrupt("return", this.ossCnf.hostUrl + "/" + result.name);

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function uploadFile(_x8, _x9) {
        return _ref4.apply(this, arguments);
      }

      return uploadFile;
    }()

    // 上传图片，文件名保存不变

  }, {
    key: "upWithFileName",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(file, uploadDir, progress, checkpoint) {
        var hasOssClient, result, key;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (uploadDir) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('参数异常');

              case 2:
                _context5.next = 4;
                return this.hasOSSClient();

              case 4:
                hasOssClient = _context5.sent;

                if (hasOssClient) {
                  _context5.next = 7;
                  break;
                }

                throw new Error('客户端错误');

              case 7:
                result = void 0;
                key = this.ossCnf.baseDir + "/" + uploadDir + "/" + file.name;

                if (!progress) {
                  _context5.next = 15;
                  break;
                }

                _context5.next = 12;
                return this.ossClient.multipartUpload(key, file, {
                  checkpoint: checkpoint,
                  progress: progress
                });

              case 12:
                result = _context5.sent;
                _context5.next = 18;
                break;

              case 15:
                _context5.next = 17;
                return this.ossClient.multipartUpload(key, file);

              case 17:
                result = _context5.sent;

              case 18:
                return _context5.abrupt("return", this.ossCnf.hostUrl + "/" + result.name);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function upWithFileName(_x11, _x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
      }

      return upWithFileName;
    }()

    // 删除单文件(本次上传的文件)

  }, {
    key: "deleteFile",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(path) {
        var hasOssClient;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.hasOSSClient();

              case 2:
                hasOssClient = _context6.sent;

                if (hasOssClient) {
                  _context6.next = 5;
                  break;
                }

                throw new Error('客户端错误');

              case 5:
                if (!(path.indexOf("" + this.keyId) > 0)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 8;
                return this.ossClient.delete(path.substr(this.ossCnf.hostUrl.length));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteFile(_x15) {
        return _ref6.apply(this, arguments);
      }

      return deleteFile;
    }()

    // 删除多文件(本次上传的文件)

  }, {
    key: "deleteFiles",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(paths) {
        var hasOssClient, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.hasOSSClient();

              case 2:
                hasOssClient = _context7.sent;

                if (hasOssClient) {
                  _context7.next = 5;
                  break;
                }

                throw new Error('客户端错误');

              case 5:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 8;
                _iterator2 = (0, _getIterator3.default)(paths);

              case 10:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context7.next = 18;
                  break;
                }

                v = _step2.value;

                if (!(v.indexOf("" + this.keyId) > 0)) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 15;
                return this.ossClient.delete(v.substr(this.ossCnf.hostUrl.length));

              case 15:
                _iteratorNormalCompletion2 = true;
                _context7.next = 10;
                break;

              case 18:
                _context7.next = 24;
                break;

              case 20:
                _context7.prev = 20;
                _context7.t0 = _context7["catch"](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t0;

              case 24:
                _context7.prev = 24;
                _context7.prev = 25;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 27:
                _context7.prev = 27;

                if (!_didIteratorError2) {
                  _context7.next = 30;
                  break;
                }

                throw _iteratorError2;

              case 30:
                return _context7.finish(27);

              case 31:
                return _context7.finish(24);

              case 32:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[8, 20, 24, 32], [25,, 27, 31]]);
      }));

      function deleteFiles(_x16) {
        return _ref7.apply(this, arguments);
      }

      return deleteFiles;
    }()
  }]);
  return OSSClient;
}();

exports.default = OSSClient;
module.exports = exports["default"];