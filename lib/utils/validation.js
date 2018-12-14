"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var validation = {
  // 验证身份证号
  verifyIDCard: function verifyIDCard(idCard) {
    return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idCard);
  },
  // 验证手机号
  verifyPhone: function verifyPhone(phone) {
    return /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(phone);
  }
};
var _default = validation;
exports.default = _default;