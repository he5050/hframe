"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var cryptoTool = {
  md5: function md5(password) {
    var md5 = _crypto.default.createHash("md5");

    var salt = "(!%$88hs@gophs*)#sassb9";
    var newPwd = md5.update(password + salt).digest("hex");
    return newPwd;
  },
  base64encode: function base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len, c1, c2, c3;
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
var _default = cryptoTool;
exports.default = _default;