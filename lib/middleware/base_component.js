"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _react = require("react");

var _immutable = require("immutable");

function trackLog(componentName) {
  return function (target, name, descriptor) {
    var fn = descriptor.value;

    descriptor.value = function () {
      var result = fn.apply(this, arguments);

      if (result) {
        console.log("\u6CE8\u610F:\u7EC4\u4EF6[".concat(componentName, "]\u51FA\u73B0\u66F4\u65B0"));
      }

      return result;
    };
  };
}

var _default = function _default() {
  var _dec, _class;

  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "未知";
  return _dec = trackLog(name), (_class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(_class, _Component);

    function _class() {
      (0, _classCallCheck2.default)(this, _class);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
    }

    (0, _createClass2.default)(_class, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _immutable.is)((0, _immutable.fromJS)(this.props), (0, _immutable.fromJS)(nextProps)) || !(0, _immutable.is)((0, _immutable.fromJS)(this.state), (0, _immutable.fromJS)(nextState));
      }
    }]);
    return _class;
  }(_react.Component), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "shouldComponentUpdate", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "shouldComponentUpdate"), _class.prototype)), _class);
};

exports.default = _default;