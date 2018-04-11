"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterItemType = exports.TabColumnType = exports.HFFilter = exports.default = undefined;

var _table = require("antd/lib/table");

var _table2 = _interopRequireDefault(_table);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _dropdown = require("antd/lib/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _menu = require("antd/lib/menu");

var _menu2 = _interopRequireDefault(_menu);

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _base_component = require("../../middleware/base_component");

var _base_component2 = _interopRequireDefault(_base_component);

var _image = require("../image");

var _image2 = _interopRequireDefault(_image);

var _filter = require("./filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabColumnType = {
  Picture: 1, // 图片
  BtnGroup: 2 // 操作按钮组
};

var HFTable = function (_BaseComponent) {
  (0, _inherits3.default)(HFTable, _BaseComponent);

  function HFTable(props) {
    (0, _classCallCheck3.default)(this, HFTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HFTable.__proto__ || (0, _getPrototypeOf2.default)(HFTable)).call(this, props));

    _this.getColumns = function () {
      var _this$props = _this.props,
          columns = _this$props.columns,
          isMobile = _this$props.isMobile;

      return _lodash2.default.map(columns, function (v) {
        var n = (0, _extends3.default)({}, v);
        switch (v.type) {
          case TabColumnType.Picture:
            {
              //数据为图片时,增加图片列Column
              n.className = "img-column " + (n.className || '');
              n.render = function (text) {
                return _react2.default.createElement(_image2.default, {
                  imageUrl: text,
                  height: 40,
                  aspectRatio: v.attribute.aspectRatio,
                  quality: 80,
                  processType: v.attribute.processType,
                  water: false });
              };
              n.onCellClick = function (record) {
                _modal2.default.info({
                  iconType: null,
                  width: 'auto',
                  className: "model-large-img",
                  maskClosable: true,
                  content: _react2.default.createElement(
                    "div",
                    { style: { textAlign: 'center', fontSize: 0 } },
                    _react2.default.createElement(
                      _card2.default,
                      { style: { display: 'inline-block' }, bodyStyle: { padding: 0 } },
                      _react2.default.createElement(_image2.default, {
                        imageUrl: record[v.key],
                        width: 600,
                        aspectRatio: v.attribute.aspectRatio,
                        quality: 100,
                        processType: v.attribute.processType,
                        water: v.attribute.water })
                    )
                  )
                });
              };
              break;
            }
          case TabColumnType.BtnGroup:
            {
              // 设置列默认固定在最右侧
              if (!n.fixed) {
                n.fixed = 'right';
              }
              // 操作列 - 按钮组
              n.className = "action-btn " + (n.className || '');
              n.render = function (text, record) {
                var newBtnGroup = typeof v.attribute.btnVisible === "function" ? v.attribute.btnGroup.filter(function (btn) {
                  return v.attribute.btnVisible(record, btn);
                }) : v.attribute.btnGroup;
                var _onClick = v.attribute.onClick;

                if (isMobile && newBtnGroup.length > 1) {
                  return _react2.default.createElement(
                    _dropdown2.default,
                    { trigger: ['click'], className: "operate-ground-box wap", overlay: _react2.default.createElement(
                        _menu2.default,
                        { prefixCls: "operate-ground-menu" },
                        _lodash2.default.map(newBtnGroup, function (v, k) {
                          return _react2.default.createElement(
                            _menu2.default.Item,
                            { key: k },
                            _react2.default.createElement(
                              "a",
                              { className: v.className, onClick: function onClick() {
                                  _onClick && _onClick(record, v);
                                } },
                              v.name
                            )
                          );
                        })
                      ) },
                    _react2.default.createElement(
                      "a",
                      { className: "ant-dropdown-link", href: "#" },
                      "\u66F4\u591A",
                      _react2.default.createElement(_icon2.default, { type: "down" })
                    )
                  );
                } else {
                  return _react2.default.createElement(
                    "span",
                    { className: "operate-ground-box " + (isMobile ? 'wap' : 'web') },
                    _lodash2.default.map(newBtnGroup, function (v, k) {
                      return _react2.default.createElement(
                        "a",
                        { key: k, className: v.className, onClick: function onClick() {
                            _onClick && _onClick(record, v);
                          } },
                        v.name
                      );
                    })
                  );
                }
              };
              break;
            }
        }
        return n;
      });
    };

    _this.paginationDefault = {
      simple: props.isMobile,
      showTotal: function showTotal(total, range) {
        return range[0] + "-" + range[1] + " , \u5171 " + total + " \u6761\u8BB0\u5F55";
      }
    };
    return _this;
  }

  (0, _createClass3.default)(HFTable, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          isMobile = _props.isMobile,
          pagination = _props.pagination,
          scroll = _props.scroll,
          _props$rowKey = _props.rowKey,
          rowKey = _props$rowKey === undefined ? 'id' : _props$rowKey,
          others = (0, _objectWithoutProperties3.default)(_props, ["isMobile", "pagination", "scroll", "rowKey"]);

      var tableProps = (0, _extends3.default)({}, others, {
        // pagination（false 与 undefined 展示结果是不一致的）
        pagination: pagination ? _lodash2.default.merge(pagination, this.paginationDefault) : pagination,
        columns: this.getColumns(),
        scroll: !scroll ? { x: true } : scroll,
        rowKey: rowKey
      });
      return _react2.default.createElement(
        "div",
        { className: "u-table-list " + (isMobile ? 'wap' : 'web') },
        _react2.default.createElement(_table2.default, tableProps)
      );
    }
  }]);
  return HFTable;
}((0, _base_component2.default)('HFTable'));

// 属性类似ant Table组件


HFTable.propTypes = {
  isMobile: _propTypes2.default.bool
};

exports.default = HFTable;
exports.HFFilter = _filter2.default;
exports.TabColumnType = TabColumnType;
exports.FilterItemType = _filter.FilterItemType;