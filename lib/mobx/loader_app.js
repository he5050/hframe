"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _factory_app = require("./factory_app");

var _factory_app2 = _interopRequireDefault(_factory_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoaderApp = function (_React$Component) {
  (0, _inherits3.default)(LoaderApp, _React$Component);

  function LoaderApp(props, context) {
    (0, _classCallCheck3.default)(this, LoaderApp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoaderApp.__proto__ || (0, _getPrototypeOf2.default)(LoaderApp)).call(this, props, context));

    _this.state = {
      CurrentComponent: null
    };
    return _this;
  }

  (0, _createClass3.default)(LoaderApp, [{
    key: "currentComponent",
    value: function currentComponent(props) {
      var _this2 = this;

      var appInfo = _factory_app2.default.getApp(props.name);
      appInfo.load(function (component) {
        _this2.setState({ CurrentComponent: component });
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.currentComponent(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.name !== nextProps.name) {
        this.setState({ CurrentComponent: null });
        this.currentComponent(nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var CurrentComponent = this.state.CurrentComponent;

      if (!CurrentComponent) {
        return null;
      }

      return _react2.default.createElement(CurrentComponent, this.props);
    }
  }]);
  return LoaderApp;
}(_react2.default.Component);

exports.default = LoaderApp;


LoaderApp.propTypes = {
  name: _propTypes2.default.string.isRequired
};

LoaderApp.defaultProps = {};
module.exports = exports["default"];