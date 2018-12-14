"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FilterItemType = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _select2 = _interopRequireDefault(require("../select"));

var _cascader = _interopRequireDefault(require("../cascader"));

var _dec, _class;

/**
 * 筛选类型
 */
var FilterItemType = {
  Custom: 1,
  // 定制组件
  Search: 2,
  // 搜索
  DropDown: 3,
  // 下拉
  DateRange: 4,
  // 日期范围
  Date: 5,
  // 日期
  DropDownNet: 6,
  // 下拉,选项网络加载
  Cascader: 7,
  // 级连选择框
  Radio: 8 // 单选按钮组

}; // 屏幕宽度

exports.FilterItemType = FilterItemType;
var ScreenWidth = {
  XXL: 1600,
  XL: 1200,
  LG: 992,
  MD: 768,
  SM: 576,
  XS: 0
};
var FilterArea = (_dec = _form.default.create(), _dec(_class =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(FilterArea, _PureComponent);

  function FilterArea(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FilterArea);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FilterArea).call(this, props));

    _this.updateScreenWidth = function () {
      var viewWidth = window.innerWidth;
      var screenWidth;

      if (viewWidth >= ScreenWidth.XXL) {
        screenWidth = ScreenWidth.XXL;
      } else if (viewWidth >= ScreenWidth.XL) {
        screenWidth = ScreenWidth.XL;
      } else if (viewWidth >= ScreenWidth.LG) {
        screenWidth = ScreenWidth.LG;
      } else if (viewWidth >= ScreenWidth.MD) {
        screenWidth = ScreenWidth.MD;
      } else if (viewWidth >= ScreenWidth.SM) {
        screenWidth = ScreenWidth.SM;
      } else {
        screenWidth = ScreenWidth.XS;
      }

      if (screenWidth !== _this.state.screenWidth) {
        _this.setState({
          screenWidth: screenWidth
        });
      }
    };

    _this.onFilter = function () {
      _this.props.form.validateFields({}, function (err, values) {
        if (!err) {
          _this.props.onFilter(values);
        }
      });
    };

    _this.onReset = function () {
      _this.props.form.resetFields();

      _this.props.onFilter({});
    };

    _this.onSwitchUnfold = function () {
      var unfold = !_this.state.unfold;

      _this.setState({
        unfold: unfold
      });
    };

    _this.state = {
      // 读取展开状态初始值
      unfold: "unfold" in props ? props.unfold : _this.getDefaultUnfold(props),
      // 当前屏幕宽度 尺寸
      screenWidth: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(FilterArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateScreenWidth();
      window.addEventListener('resize', this.updateScreenWidth);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateScreenWidth);
    } // 更新当前屏幕宽度

  }, {
    key: "getDefaultUnfold",
    // 获取unfold的默认值，
    value: function getDefaultUnfold(props) {
      var _props$configs = props.configs,
          configs = _props$configs === void 0 ? [] : _props$configs;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = configs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          // 如果筛选条件有默认值， 则默认为展开
          if (v.attribute.initValue) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "generator",
    value: function generator(node) {
      var getFieldDecorator = this.props.form.getFieldDecorator;

      switch (node.type) {
        // 定制
        case FilterItemType.Custom:
          {
            return node.attribute.render(this.props.form);
          }
        // 搜索

        case FilterItemType.Search:
          {
            var _node$attribute = node.attribute,
                label = _node$attribute.label,
                initValue = _node$attribute.initValue,
                fieldOptions = _node$attribute.fieldOptions,
                other = (0, _objectWithoutProperties2.default)(_node$attribute, ["label", "initValue", "fieldOptions"]); // 查询key的初始值

            return _react.default.createElement(_form.default.Item, {
              label: label
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: initValue
            }, fieldOptions || {}))(_react.default.createElement(_input.default, other)));
          }
        // 日期范围

        case FilterItemType.DateRange:
          {
            var _node$attribute2 = node.attribute,
                _label = _node$attribute2.label,
                _initValue = _node$attribute2.initValue,
                _fieldOptions = _node$attribute2.fieldOptions,
                extraOptions = _node$attribute2.extraOptions,
                _other = (0, _objectWithoutProperties2.default)(_node$attribute2, ["label", "initValue", "fieldOptions", "extraOptions"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue
            }, _fieldOptions || {}))(_react.default.createElement(_datePicker.default.RangePicker, (0, _extends2.default)({}, extraOptions, _other))));
          }

        case FilterItemType.Date:
          {
            var _node$attribute3 = node.attribute,
                _label2 = _node$attribute3.label,
                _initValue2 = _node$attribute3.initValue,
                _fieldOptions2 = _node$attribute3.fieldOptions,
                _extraOptions = _node$attribute3.extraOptions,
                _other2 = (0, _objectWithoutProperties2.default)(_node$attribute3, ["label", "initValue", "fieldOptions", "extraOptions"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label2
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue2
            }, _fieldOptions2 || {}))(_react.default.createElement(_datePicker.default, (0, _extends2.default)({}, _other2, _extraOptions))));
          }

        case FilterItemType.DropDown:
          {
            var _node$attribute4 = node.attribute,
                _label3 = _node$attribute4.label,
                _initValue3 = _node$attribute4.initValue,
                _fieldOptions3 = _node$attribute4.fieldOptions,
                options = _node$attribute4.options,
                _other3 = (0, _objectWithoutProperties2.default)(_node$attribute4, ["label", "initValue", "fieldOptions", "options"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label3
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue3
            }, _fieldOptions3 || {}))(_react.default.createElement(_select.default, _other3, _lodash.default.map(options, function (v, k) {
              return _react.default.createElement(_select.default.Option, {
                key: k,
                value: v.value
              }, v.name);
            }))));
          }

        case FilterItemType.DropDownNet:
          {
            var _node$attribute5 = node.attribute,
                _label4 = _node$attribute5.label,
                _initValue4 = _node$attribute5.initValue,
                _fieldOptions4 = _node$attribute5.fieldOptions,
                _other4 = (0, _objectWithoutProperties2.default)(_node$attribute5, ["label", "initValue", "fieldOptions"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label4
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue4
            }, _fieldOptions4 || {}))(_react.default.createElement(_select2.default, _other4)));
          }

        case FilterItemType.Cascader:
          {
            var _node$attribute6 = node.attribute,
                _label5 = _node$attribute6.label,
                _initValue5 = _node$attribute6.initValue,
                _fieldOptions5 = _node$attribute6.fieldOptions,
                _other5 = (0, _objectWithoutProperties2.default)(_node$attribute6, ["label", "initValue", "fieldOptions"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label5
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue5
            }, _fieldOptions5 || {}))(_react.default.createElement(_cascader.default, _other5)));
          }

        case FilterItemType.Radio:
          {
            var _node$attribute7 = node.attribute,
                _label6 = _node$attribute7.label,
                _initValue6 = _node$attribute7.initValue,
                _fieldOptions6 = _node$attribute7.fieldOptions,
                _options = _node$attribute7.options,
                _other6 = (0, _objectWithoutProperties2.default)(_node$attribute7, ["label", "initValue", "fieldOptions", "options"]);

            return _react.default.createElement(_form.default.Item, {
              label: _label6
            }, getFieldDecorator(node.fieldKey, (0, _objectSpread2.default)({
              initialValue: _initValue6
            }, _fieldOptions6 || {}))(_react.default.createElement(_radio.default.Group, _other6, _lodash.default.map(_options, function (v, k) {
              return _react.default.createElement(_radio.default, {
                key: k,
                value: "".concat(v.value)
              }, v.name);
            }))));
          }

        default:
          {
            break;
          }
      }
    } // 筛选

  }, {
    key: "readSpan",
    // 根据当前浏览器宽度 读取对应的span值
    value: function readSpan(col) {
      switch (this.state.screenWidth) {
        case ScreenWidth.XXL:
          return col.xxl || col.xl || col.lg || col.md || col.sm || col.span;

        case ScreenWidth.XL:
          return col.xl || col.lg || col.md || col.sm || col.span;

        case ScreenWidth.LG:
          return col.lg || col.md || col.sm || col.span;

        case ScreenWidth.MD:
          return col.md || col.sm || col.span;

        case ScreenWidth.SM:
          return col.sm || col.span;

        default:
          return col.xs || col.span;
      }
    }
  }, {
    key: "dealWith",
    value: function dealWith() {
      var _this2 = this;

      /**
       * v的数据结构
       * type: FilterItemType的类型
       * weight: 1,2,3 占位权重，1表示个最小的输入条件占位 兼容老版本
       * col: antd网格组件 Col组件属性
       * value: ''
       * keyName: ''
       * attribute: {
       *  label: 名称,
       *  placeholder: 提示
       *  render:()=>{}
       * }
       */
      var _this$props = this.props,
          _this$props$configs = _this$props.configs,
          configs = _this$props$configs === void 0 ? [] : _this$props$configs,
          _this$props$gutter = _this$props.gutter,
          gutter = _this$props$gutter === void 0 ? {
        span: 8,
        md: 12,
        lg: 18,
        xl: 24,
        xxl: 32
      } : _this$props$gutter;
      var btnCol = {
        span: 24,
        md: 12,
        lg: 8,
        xl: 6,
        xxl: 4
      }; // 多行标记 如果筛选条件没有第二行 则值为-1, 反之表示 multiRow 表示第二行第一个元素的下标

      var multiRowIndex = -1; // 计算 multiRowIndex 的值

      var spanSum = 0;

      for (var i = 0; i < configs.length; i++) {
        var v = configs[i];

        if (v.weight) {
          spanSum += Number(v.weight * 8);
        } else {
          spanSum += this.readSpan(v.col);
        }

        if (spanSum > 24) {
          multiRowIndex = i;
          break;
        }
      } // 是否是按钮


      var singleRowBtn = false;

      if (multiRowIndex === -1) {
        spanSum += this.readSpan(btnCol);

        if (spanSum <= 24) {
          singleRowBtn = true;
        }
      }

      return _react.default.createElement(_row.default, {
        type: "flex",
        gutter: gutter,
        className: "one-row"
      }, _lodash.default.map(configs, function (v, k) {
        var style = _this2.state.unfold ? undefined : {
          display: "none"
        };
        var col = v.weight ? {
          span: v.weight * 8
        } : v.col;
        return _react.default.createElement(_col.default, (0, _extends2.default)({
          key: k,
          style: multiRowIndex !== -1 && k >= multiRowIndex ? style : undefined
        }, col), _this2.generator(v));
      }), _react.default.createElement(_col.default, (0, _extends2.default)({
        className: "filter-col ".concat(singleRowBtn ? 'single-row' : 'multi-row')
      }, btnCol), _react.default.createElement("div", {
        className: "filter-button"
      }, _react.default.createElement("span", {
        className: "button-group"
      }, _react.default.createElement(_button.default, {
        type: "primary",
        onClick: this.onFilter
      }, "\u67E5\u8BE2"), _react.default.createElement(_button.default, {
        onClick: this.onReset
      }, "\u91CD\u7F6E"), multiRowIndex !== -1 && _react.default.createElement("a", {
        onClick: this.onSwitchUnfold
      }, this.state.unfold ? "折叠" : "展开", _react.default.createElement(_icon.default, {
        type: this.state.unfold ? "up" : "down"
      }))))));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_form.default, {
        className: "u-table-filter ".concat(this.props.className || "", "\n        title-length-").concat(this.props.labelLength),
        layout: "inline"
      }, this.dealWith());
    }
  }]);
  return FilterArea;
}(_react.PureComponent)) || _class);
exports.default = FilterArea;
FilterArea.defaultProps = {
  // 设置label默认最低宽度 labelLength区域为2-6
  labelLength: 4
};