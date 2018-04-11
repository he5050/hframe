'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cryptoTool = {
  md5: function md5(password) {
    var md5 = _crypto2.default.createHash('md5');
    var salt = '(!%$88hs@gophs*)#sassb9';
    var newPwd = md5.update(password + salt).digest('hex');
    return newPwd;
  },
  base64encode: function base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = void 0,
        i = void 0,
        len = void 0,
        c1 = void 0,
        c2 = void 0,
        c3 = void 0;

    i = 0;
    out = "";
    len = str.length;
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
  }
};

exports.default = cryptoTool;
module.exports = exports['default'];