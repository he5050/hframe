"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    "div",
    { className: "m-error-page" },
    _react2.default.createElement(
      "div",
      { className: "body" },
      _react2.default.createElement(
        "div",
        { className: "img-block" },
        _react2.default.createElement("div", { className: "img-item", style: { backgroundImage: "url(https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg)" } })
      ),
      _react2.default.createElement(
        "div",
        { className: "content-block" },
        _react2.default.createElement(
          "h1",
          null,
          "404"
        ),
        _react2.default.createElement(
          "div",
          { className: "desc" },
          "\u62B1\u6B49,\u8BBF\u95EE\u51FA\u9519\uFF01"
        ),
        _react2.default.createElement(
          "div",
          { className: "btn" },
          _react2.default.createElement(
            "a",
            { href: "/" },
            _react2.default.createElement(
              _button2.default,
              { type: "primary" },
              _react2.default.createElement(
                "span",
                null,
                "\u8FD4\u56DE\u9996\u9875"
              )
            )
          )
        )
      )
    )
  );
};

module.exports = exports["default"];