'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tree = require('antd/lib/tree');

var _tree2 = _interopRequireDefault(_tree);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _base_component = require('../../middleware/base_component');

var _base_component2 = _interopRequireDefault(_base_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HFTree = function (_BaseComponent) {
  (0, _inherits3.default)(HFTree, _BaseComponent);

  function HFTree(props, context) {
    (0, _classCallCheck3.default)(this, HFTree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HFTree.__proto__ || (0, _getPrototypeOf2.default)(HFTree)).call(this, props, context));

    _this.onExpand = function (expandedKeys) {
      _this.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false
      });
    };

    _this.onCheck = function (checkedKeys) {
      _this.setState({ checkedKeys: checkedKeys });
      if (_this.props.onChange) {
        _this.props.onChange(checkedKeys);
      }
    };

    _this.renderTreeNodes = function (data, disabled) {
      return _lodash2.default.map(data, function (v) {
        if (v.childen) {
          return _react2.default.createElement(
            _tree2.default.TreeNode,
            { title: v.title, key: v.key, disableCheckbox: disabled },
            _this.renderTreeNodes(v.childen, disabled)
          );
        }
        return _react2.default.createElement(_tree2.default.TreeNode, { title: v.title, key: v.key, disableCheckbox: disabled });
      });
    };

    _this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: _this.props.checkedKeys
    };
    return _this;
  }

  (0, _createClass3.default)(HFTree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ checkedKeys: nextProps.checkedKeys });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$dataSource = _props.dataSource,
          dataSource = _props$dataSource === undefined ? [] : _props$dataSource,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled;

      return _react2.default.createElement(
        _tree2.default,
        { checkable: true,
          disabled: disabled,
          onExpand: this.onExpand,
          onCheck: this.onCheck,
          expandedKeys: this.state.expandedKeys,
          autoExpandParent: this.state.autoExpandParent,
          checkedKeys: this.state.checkedKeys
        },
        this.renderTreeNodes(dataSource, false)
      );
    }
  }]);
  return HFTree;
}((0, _base_component2.default)('HFTree'));

exports.default = HFTree;
module.exports = exports['default'];