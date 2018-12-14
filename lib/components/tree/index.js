"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/es/tree/style");

var _tree = _interopRequireDefault(require("antd/es/tree"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _immutable = require("immutable");

var _base_component = _interopRequireDefault(require("../../middleware/base_component"));

var HFTree =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(HFTree, _BaseComponent);

  function HFTree(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, HFTree);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFTree).call(this, props, context));

    _this.onExpand = function (expandedKeys) {
      _this.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false
      });
    };

    _this.onCheck = function (checkedKeys) {
      _this.setState({
        checkedKeys: checkedKeys
      });

      if (_this.props.onChange) {
        _this.props.onChange(checkedKeys);
      }
    };

    _this.renderTreeNodes = function (data, disabled) {
      return _lodash.default.map(data, function (v) {
        if (v.childen) {
          return _react.default.createElement(_tree.default.TreeNode, {
            title: v.title,
            key: v.key,
            disableCheckbox: disabled
          }, _this.renderTreeNodes(v.childen, disabled));
        }

        return _react.default.createElement(_tree.default.TreeNode, {
          title: v.title,
          key: v.key,
          disableCheckbox: disabled
        });
      });
    };

    _this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: []
    };
    return _this;
  }

  (0, _createClass2.default)(HFTree, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var checkedKeys = this.props.checkedKeys; // 兼容mobx5以下的时候antd3.9.0以上的情况

      if (!Array.isArray(checkedKeys)) {
        checkedKeys = (0, _toConsumableArray2.default)(checkedKeys);
      }

      this.setState({
        checkedKeys: checkedKeys
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var checkedKeys = nextProps.checkedKeys; // 兼容mobx5以下的时候antd3.9.0以上的情况

      if (!Array.isArray(checkedKeys)) {
        checkedKeys = (0, _toConsumableArray2.default)(checkedKeys);
      }

      this.setState({
        checkedKeys: checkedKeys
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$dataSourc = _this$props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled;
      return _react.default.createElement(_tree.default, {
        checkable: true,
        disabled: disabled,
        onExpand: this.onExpand,
        onCheck: this.onCheck,
        expandedKeys: this.state.expandedKeys,
        autoExpandParent: this.state.autoExpandParent,
        checkedKeys: this.state.checkedKeys
      }, this.renderTreeNodes(dataSource, false));
    }
  }]);
  return HFTree;
}((0, _base_component.default)('HFTree'));

var _default = HFTree;
exports.default = _default;