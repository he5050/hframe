"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FilterItemType = undefined;

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _row = require("antd/lib/row");

var _row2 = _interopRequireDefault(_row);

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _col = require("antd/lib/col");

var _col2 = _interopRequireDefault(_col);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _radio = require("antd/lib/radio");

var _radio2 = _interopRequireDefault(_radio);

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _datePicker = require("antd/lib/date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _form = require("antd/lib/form");

var _form2 = _interopRequireDefault(_form);

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _select3 = require("../select");

var _select4 = _interopRequireDefault(_select3);

var _cascader = require("../cascader");

var _cascader2 = _interopRequireDefault(_cascader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 筛选类型
 */
var FilterItemType = exports.FilterItemType = {
  Custom: 1, //定制组件
  Search: 2, // 搜索
  DropDown: 3, // 下拉
  DateRange: 4, // 日期范围
  Date: 5, // 日期
  DropDownNet: 6, // 下拉,选项网络加载
  Cascader: 7, // 级连选择框
  Radio: 8 // 单选按钮组
};

var FilterArea = (_dec = _form2.default.create(), _dec(_class = function (_PureComponent) {
  (0, _inherits3.default)(FilterArea, _PureComponent);

  function FilterArea(props) {
    (0, _classCallCheck3.default)(this, FilterArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FilterArea.__proto__ || (0, _getPrototypeOf2.default)(FilterArea)).call(this, props));

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
      _this.setState({ unfold: unfold });
    };

    _this.state = {
      // 读取展开状态初始值
      unfold: "unfold" in props ? props.unfold : _this.getDefaultUnfold(props)
    };
    return _this;
  }

  // 获取unfold的默认值，


  (0, _createClass3.default)(FilterArea, [{
    key: "getDefaultUnfold",
    value: function getDefaultUnfold(props) {
      var _props$configs = props.configs,
          configs = _props$configs === undefined ? [] : _props$configs;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(configs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          // 如果筛选条件有默认值， 则默认为展开
          if (v.attribute.initValue) {
            console.log("v", v);
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
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
                other = (0, _objectWithoutProperties3.default)(_node$attribute, ["label", "initValue", "fieldOptions"]);
            // 查询key的初始值

            return _react2.default.createElement(
              _form2.default.Item,
              { label: label },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: initValue
              }, fieldOptions || {}))(_react2.default.createElement(_input2.default, other))
            );
          }
        // 日期范围
        case FilterItemType.DateRange:
          {
            var _node$attribute2 = node.attribute,
                _label = _node$attribute2.label,
                _initValue = _node$attribute2.initValue,
                _fieldOptions = _node$attribute2.fieldOptions,
                extraOptions = _node$attribute2.extraOptions,
                _other = (0, _objectWithoutProperties3.default)(_node$attribute2, ["label", "initValue", "fieldOptions", "extraOptions"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue
              }, _fieldOptions || {}))(_react2.default.createElement(_datePicker2.default.RangePicker, (0, _extends3.default)({}, extraOptions, _other)))
            );
          }
        case FilterItemType.Date:
          {
            var _node$attribute3 = node.attribute,
                _label2 = _node$attribute3.label,
                _initValue2 = _node$attribute3.initValue,
                _fieldOptions2 = _node$attribute3.fieldOptions,
                _extraOptions = _node$attribute3.extraOptions,
                _other2 = (0, _objectWithoutProperties3.default)(_node$attribute3, ["label", "initValue", "fieldOptions", "extraOptions"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label2 },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue2
              }, _fieldOptions2 || {}))(_react2.default.createElement(_datePicker2.default, (0, _extends3.default)({}, _other2, _extraOptions)))
            );
          }
        case FilterItemType.DropDown:
          {
            var _node$attribute4 = node.attribute,
                _label3 = _node$attribute4.label,
                _initValue3 = _node$attribute4.initValue,
                _fieldOptions3 = _node$attribute4.fieldOptions,
                options = _node$attribute4.options,
                _other3 = (0, _objectWithoutProperties3.default)(_node$attribute4, ["label", "initValue", "fieldOptions", "options"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label3 },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue3
              }, _fieldOptions3 || {}))(_react2.default.createElement(
                _select2.default,
                _other3,
                _lodash2.default.map(options, function (v, k) {
                  return _react2.default.createElement(
                    _select2.default.Option,
                    { key: k, value: v.value },
                    v.name
                  );
                })
              ))
            );
          }
        case FilterItemType.DropDownNet:
          {
            var _node$attribute5 = node.attribute,
                _label4 = _node$attribute5.label,
                _initValue4 = _node$attribute5.initValue,
                _fieldOptions4 = _node$attribute5.fieldOptions,
                _other4 = (0, _objectWithoutProperties3.default)(_node$attribute5, ["label", "initValue", "fieldOptions"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label4 },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue4
              }, _fieldOptions4 || {}))(_react2.default.createElement(_select4.default, _other4))
            );
          }
        case FilterItemType.Cascader:
          {
            var _node$attribute6 = node.attribute,
                _label5 = _node$attribute6.label,
                _initValue5 = _node$attribute6.initValue,
                _fieldOptions5 = _node$attribute6.fieldOptions,
                _other5 = (0, _objectWithoutProperties3.default)(_node$attribute6, ["label", "initValue", "fieldOptions"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label5 },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue5
              }, _fieldOptions5 || {}))(_react2.default.createElement(_cascader2.default, _other5))
            );
          }
        case FilterItemType.Radio:
          {
            var _node$attribute7 = node.attribute,
                _label6 = _node$attribute7.label,
                _initValue6 = _node$attribute7.initValue,
                _fieldOptions6 = _node$attribute7.fieldOptions,
                _options = _node$attribute7.options,
                _other6 = (0, _objectWithoutProperties3.default)(_node$attribute7, ["label", "initValue", "fieldOptions", "options"]);

            return _react2.default.createElement(
              _form2.default.Item,
              { label: _label6 },
              getFieldDecorator(node.fieldKey, (0, _extends3.default)({
                initialValue: _initValue6
              }, _fieldOptions6 || {}))(_react2.default.createElement(
                _radio2.default.Group,
                _other6,
                _lodash2.default.map(_options, function (v, k) {
                  return _react2.default.createElement(
                    _radio2.default,
                    { key: k, value: "" + v.value },
                    v.name
                  );
                })
              ))
            );
          }
      }
    }

    // 筛选


    // 重置


    // 切换是否展开

  }, {
    key: "dealWith",
    value: function dealWith() {
      var _this2 = this;

      /**
       * v的数据结构
       * type: FilterItemType的类型
       * weight: 1,2,3 占位权重，1表示个最小的输入条件占位
       * value: ''
       * keyName: ''
       * attribute: {
       *  label: 名称,
       *  placeholder: 提示
       *  render:()=>{}
       * }
       */
      var _props$configs2 = this.props.configs,
          configs = _props$configs2 === undefined ? [] : _props$configs2;

      // 先进行分行

      var rows = [],
          row = [],
          weight = 0;
      for (var i = 0; i < configs.length; i++) {
        var v = configs[i];
        // 权重值超过3就需要分行了
        if (weight + v.weight <= 3) {
          weight += v.weight;
          row.push(v);
        } else {
          rows.push([].concat((0, _toConsumableArray3.default)(row)));
          row = [];
          row.push(v);
          weight = v.weight;
        }
      }
      if (row.length > 0) {
        rows.push([].concat((0, _toConsumableArray3.default)(row)));
      }

      // 生成搜索区域内容
      if (rows.length === 1 && weight < 3) {
        var spanSum = 0;
        return _react2.default.createElement(
          _row2.default,
          { gutter: 48, className: "one-row" },
          _lodash2.default.map(rows[0], function (vv, kk) {
            spanSum += vv.weight * 8;
            return _react2.default.createElement(
              _col2.default,
              { key: kk, span: vv.weight * 8 },
              _this2.generator(vv)
            );
          }),
          _react2.default.createElement(
            _col2.default,
            { key: "filter-button", span: 24 - spanSum },
            _react2.default.createElement(
              "div",
              { key: "filter-button", className: "filter-button" },
              _react2.default.createElement(
                "span",
                { className: "button-group" },
                _react2.default.createElement(
                  _button2.default,
                  { type: "primary", onClick: this.onFilter },
                  "\u67E5\u8BE2"
                ),
                _react2.default.createElement(
                  _button2.default,
                  { onClick: this.onReset },
                  "\u91CD\u7F6E"
                )
              )
            )
          )
        );
      } else {
        var style = this.state.unfold ? undefined : { display: "none" };
        var content = _lodash2.default.map(rows, function (v, k) {
          return _react2.default.createElement(
            _row2.default,
            { key: k, style: k >= 1 ? style : undefined, gutter: 48 },
            _lodash2.default.map(v, function (vv, kk) {
              return _react2.default.createElement(
                _col2.default,
                { key: kk, span: vv.weight * 8 },
                _this2.generator(vv)
              );
            })
          );
        });
        content.push(_react2.default.createElement(
          "div",
          { key: "filter-button", className: "filter-button align-right" },
          _react2.default.createElement(
            "span",
            { className: "button-group" },
            _react2.default.createElement(
              _button2.default,
              { type: "primary", onClick: this.onFilter },
              "\u67E5\u8BE2"
            ),
            _react2.default.createElement(
              _button2.default,
              { onClick: this.onReset },
              "\u91CD\u7F6E"
            ),
            rows.length > 1 && _react2.default.createElement(
              "a",
              { onClick: this.onSwitchUnfold },
              this.state.unfold ? "折叠" : "展开",
              _react2.default.createElement(_icon2.default, { type: this.state.unfold ? "up" : "down" })
            )
          )
        ));
        return content;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _form2.default,
        {
          className: "u-table-filter " + (this.props.className || "") + " title-length-" + this.props.labelLength,
          layout: "inline"
        },
        this.dealWith()
      );
    }
  }]);
  return FilterArea;
}(_react.PureComponent)) || _class);
exports.default = FilterArea;


FilterArea.defaultProps = {
  // 设置label默认最低宽度 labelLength区域为2-6
  labelLength: 4
};