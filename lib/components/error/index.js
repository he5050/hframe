"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default() {
  return _react.default.createElement("div", {
    className: "m-error-page"
  }, _react.default.createElement("div", {
    className: "body"
  }, _react.default.createElement("div", {
    className: "img-block"
  }, _react.default.createElement("div", {
    className: "img-item",
    style: {
      backgroundImage: "url(https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg)"
    }
  })), _react.default.createElement("div", {
    className: "content-block"
  }, _react.default.createElement("h1", null, "404"), _react.default.createElement("div", {
    className: "desc"
  }, "\u62B1\u6B49,\u8BBF\u95EE\u51FA\u9519\uFF01"), _react.default.createElement("div", {
    className: "btn"
  }, _react.default.createElement("a", {
    href: "/"
  }, _react.default.createElement(_button.default, {
    type: "primary"
  }, _react.default.createElement("span", null, "\u8FD4\u56DE\u9996\u9875")))))));
};

exports.default = _default;