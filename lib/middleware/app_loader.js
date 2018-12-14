"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _base_component = _interopRequireDefault(require("./base_component"));

var actions = _interopRequireWildcard(require("./com_action"));

var AppLoader =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(AppLoader, _BaseComponent);

  function AppLoader(props, context) {
    (0, _classCallCheck2.default)(this, AppLoader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AppLoader).call(this, props, context));
  }

  (0, _createClass2.default)(AppLoader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          name = _this$props.name,
          payload = _this$props.payload;

      if (!payload['@@require']) {
        this.props.loadApp(name);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var name = nextProps.name,
          payload = nextProps.payload;

      if (!payload['@@require']) {
        this.props.loadApp(name);
      } else if (this.props.name !== nextProps.name) {
        this.props.clearAppState(this.props.name);
      }
    } // 因为状态和属性结构很复杂，这里不做比较直接返回true，内部组件自己去做比较

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          payload = _this$props2.payload,
          others = (0, _objectWithoutProperties2.default)(_this$props2, ["name", "payload"]);

      if (!payload['@@require']) {
        return null;
      }

      var ReduxConnector = payload['@@require'].container;

      if (!ReduxConnector) {
        return null;
      }

      return _react.default.createElement(ReduxConnector, (0, _extends2.default)({
        store: this.context.store,
        payload: payload,
        key: name
      }, others));
    }
  }]);
  return AppLoader;
}((0, _base_component.default)('系统'));

AppLoader.contextTypes = {
  store: _propTypes.default.object
};

var _default = (0, _reactRedux.connect)(function (state, props) {
  var payload = state[props.name];
  return {
    payload: payload || {}
  };
}, function (dispatch) {
  return (0, _objectSpread2.default)({}, (0, _redux.bindActionCreators)((0, _objectSpread2.default)({}, actions), dispatch));
}, null, {
  withRef: true,
  pure: true
})(AppLoader);

exports.default = _default;