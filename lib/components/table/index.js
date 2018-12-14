"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HFFilter", {
  enumerable: true,
  get: function get() {
    return _filter.default;
  }
});
Object.defineProperty(exports, "FilterItemType", {
  enumerable: true,
  get: function get() {
    return _filter.FilterItemType;
  }
});
exports.TabColumnType = exports.default = void 0;

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/es/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _base_component = _interopRequireDefault(require("../../middleware/base_component"));

var _image = _interopRequireWildcard(require("../image"));

var _filter = _interopRequireWildcard(require("./filter"));

var TabColumnType = {
  Picture: 1,
  // 图片
  BtnGroup: 2 // 操作按钮组

};
exports.TabColumnType = TabColumnType;

var HFTable =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(HFTable, _BaseComponent);

  function HFTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HFTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFTable).call(this, props));

    _this.getColumns = function () {
      var _this$props = _this.props,
          columns = _this$props.columns,
          isMobile = _this$props.isMobile;
      return _lodash.default.map(columns, function (v) {
        var n = (0, _objectSpread2.default)({}, v);

        switch (v.type) {
          case TabColumnType.Picture:
            {
              // 数据为图片时,增加图片列Column
              n.className = "img-column ".concat(n.className || '');

              n.render = function (text) {
                var imgSize = {
                  height: 40
                }; // 配置图片宽度和高度 如果为空，则默认设置图片高度

                if (v.attribute.width || v.attribute.height) {
                  imgSize = {
                    width: v.attribute.width,
                    height: v.attribute.height
                  };
                }

                return _react.default.createElement(_image.default, (0, _extends2.default)({}, imgSize, {
                  style: imgSize,
                  imageUrl: text,
                  aspectRatio: v.attribute.aspectRatio,
                  quality: 80,
                  processType: v.attribute.processType,
                  water: false
                }));
              };

              n.onCell = function (record) {
                return {
                  onClick: function onClick() {
                    _modal.default.info({
                      iconType: null,
                      width: 'auto',
                      className: "model-large-img",
                      maskClosable: true,
                      okText: "X",
                      content: _react.default.createElement(_image.default, {
                        imageUrl: record[v.key],
                        width: 600,
                        aspectRatio: "-1:-1",
                        quality: 100,
                        processType: _image.EmImgProcessType.emGD_W_H,
                        water: v.attribute.water
                      })
                    });
                  }
                };
              };

              break;
            }

          case TabColumnType.BtnGroup:
            {
              // 设置列默认固定在最右侧
              if (!n.fixed) {
                n.fixed = 'right';
              } // 操作列 - 按钮组


              n.className = "action-btn ".concat(n.className || '');

              n.render = function (text, record, index) {
                var newBtnGroup = typeof v.attribute.btnVisible === "function" ? v.attribute.btnGroup.filter(function (btn) {
                  return v.attribute.btnVisible(record, btn);
                }) : v.attribute.btnGroup;
                var _onClick = v.attribute.onClick;

                if (isMobile && newBtnGroup.length > 1) {
                  return _react.default.createElement(_dropdown.default, {
                    trigger: ['click'],
                    className: "operate-ground-box wap",
                    overlay: _react.default.createElement(_menu.default, {
                      prefixCls: "operate-ground-menu"
                    }, _lodash.default.map(newBtnGroup, function (vv, kk) {
                      return _react.default.createElement(_menu.default.Item, {
                        key: kk
                      }, _react.default.createElement("a", {
                        className: vv.className,
                        onClick: function onClick() {
                          _onClick && _onClick(record, vv, index);
                        }
                      }, vv.name));
                    }))
                  }, _react.default.createElement("a", {
                    className: "ant-dropdown-link",
                    href: "#"
                  }, "\u66F4\u591A", _react.default.createElement(_icon.default, {
                    type: "down"
                  })));
                }

                return _react.default.createElement("span", {
                  className: "operate-ground-box ".concat(isMobile ? 'wap' : 'web')
                }, _lodash.default.map(newBtnGroup, function (vv, kk) {
                  return _react.default.createElement("a", {
                    key: kk,
                    className: vv.className,
                    onClick: function onClick() {
                      _onClick && _onClick(record, vv, index);
                    }
                  }, vv.name);
                }));
              };

              break;
            }

          default:
            {
              // 默认市text
              // 设置了弹匡显示
              if (n.popShow) {
                n.render = function (text) {
                  return _react.default.createElement("span", {
                    style: {
                      cursor: "pointer"
                    },
                    className: "u-line-clamp"
                  }, text);
                };

                n.onCell = function (record) {
                  return {
                    onClick: function onClick() {
                      _modal.default.info({
                        title: "明细",
                        content: _react.default.createElement("pre", {
                          style: {
                            whiteSpace: "pre-wrap"
                          }
                        }, record[n.dataIndex]),
                        okText: '确定',
                        maskClosable: true
                      });
                    }
                  };
                };
              }

              break;
            }
        }

        return n;
      });
    };

    _this.paginationDefault = {
      simple: props.isMobile,
      showTotal: function showTotal(total, range) {
        return "".concat(range[0], "-").concat(range[1], " , \u5171 ").concat(total, " \u6761\u8BB0\u5F55");
      }
    };
    return _this;
  }

  (0, _createClass2.default)(HFTable, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isMobile = _this$props2.isMobile,
          pagination = _this$props2.pagination,
          scroll = _this$props2.scroll,
          _this$props2$rowKey = _this$props2.rowKey,
          rowKey = _this$props2$rowKey === void 0 ? 'id' : _this$props2$rowKey,
          others = (0, _objectWithoutProperties2.default)(_this$props2, ["isMobile", "pagination", "scroll", "rowKey"]);
      var tableProps = (0, _objectSpread2.default)({}, others, {
        // pagination（false 与 undefined 展示结果是不一致的）
        pagination: pagination ? _lodash.default.merge(pagination, this.paginationDefault) : pagination,
        columns: this.getColumns(),
        scroll: !scroll ? {
          x: true
        } : scroll,
        rowKey: rowKey
      }); // 兼容mobx5以下的时候antd3.9.0以上的情况

      if (!Array.isArray(tableProps.dataSource)) {
        tableProps.dataSource = (0, _toConsumableArray2.default)(tableProps.dataSource);
      }

      return _react.default.createElement("div", {
        className: "u-table-list ".concat(isMobile ? 'wap' : 'web')
      }, _react.default.createElement(_table.default, tableProps));
    }
  }]);
  return HFTable;
}((0, _base_component.default)('HFTable')); // 属性类似ant Table组件


exports.default = HFTable;
HFTable.propTypes = {
  isMobile: _propTypes.default.bool
};