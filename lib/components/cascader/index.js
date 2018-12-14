"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/cascader/style");

var _cascader = _interopRequireDefault(require("antd/es/cascader"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _immutable = require("immutable");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _fetch = _interopRequireDefault(require("../../net/fetch"));

var _base_component = _interopRequireDefault(require("../../middleware/base_component"));

var HFCascader =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(HFCascader, _BaseComponent);

  function HFCascader(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, HFCascader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFCascader).call(this, props, context));

    _this.onChange = function (v) {
      // 方便外部获取名称
      _this.props.onChange(v);
    };

    _this.loadData = function (selectedOptions) {
      var _this$props$configs = _this.props.configs,
          configs = _this$props$configs === void 0 ? [] : _this$props$configs; // 选中的层级

      var idx = selectedOptions.length; // 找到选中的层

      var targetOption = selectedOptions[selectedOptions.length - 1]; // 下一级数据是否是叶子节点

      var isLeaf = idx >= configs.length - 1;
      targetOption.loading = true; // 请求下一级的数据是根据搜索key加上具体的值

      _this.fetchData(configs[idx].dataUrl, (0, _defineProperty2.default)({}, configs[idx].searchKey, targetOption.value)).then(function (resp) {
        if (resp.succ) {
          targetOption.loading = false;
          targetOption.children = _lodash.default.map(resp.data, function (v) {
            return {
              value: v.id,
              label: v.name,
              isLeaf: isLeaf
            };
          });

          _this.forceUpdate();
        }
      });
    };

    _this.option = {
      pageIndex: 1,
      pageSize: 1000
    };
    _this.state = {
      options: []
    };
    return _this;
  }

  (0, _createClass2.default)(HFCascader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.cascaderFetch(this.props).then(function (options) {
        _this2.setState({
          options: options
        });
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props.value), (0, _immutable.fromJS)(nextProps.value))) {
        this.cascaderFetch(nextProps).then(function (options) {
          _this3.setState({
            options: options
          });
        });
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(url, p) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resp = {
                  succ: false
                };
                _context.prev = 1;
                _context.next = 4;
                return _fetch.default.get(_utils.default.buildQueryUrl(url, (0, _objectSpread2.default)({}, p, this.option)));

              case 4:
                resp = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                resp.succ = false;

              case 10:
                return _context.abrupt("return", resp);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function fetchData(_x, _x2) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "cascaderFetch",
    value: function () {
      var _cascaderFetch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(props) {
        var _this4 = this;

        var _props$configs, configs, _props$value, value, options, cLen, optionsChild, _loop2, k, _ret;

        return _regenerator.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _props$configs = props.configs, configs = _props$configs === void 0 ? [] : _props$configs, _props$value = props.value, value = _props$value === void 0 ? [] : _props$value;

                if (!(configs.length === 0)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", []);

              case 3:
                // 当前状态值
                options = (0, _toConsumableArray2.default)(this.state.options); // 要把value里面的值初始到组件上面，必须把每一级的数据请求下来

                cLen = configs.length; // 记录父节点数组

                _loop2 =
                /*#__PURE__*/
                _regenerator.default.mark(function _loop2(k) {
                  var v, isLeaf, resp, f;
                  return _regenerator.default.wrap(function _loop2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          v = configs[k];
                          isLeaf = !(cLen > k + 1);
                          resp = {};

                          if (!(k && value[k - 1])) {
                            _context2.next = 15;
                            break;
                          }

                          f = _lodash.default.findIndex(optionsChild, function (o) {
                            return o.value === value[k - 1];
                          });

                          if (!(f > -1)) {
                            _context2.next = 13;
                            break;
                          }

                          if (!(optionsChild[f].children && optionsChild[f].children.length > 0)) {
                            _context2.next = 8;
                            break;
                          }

                          return _context2.abrupt("return", "continue");

                        case 8:
                          _context2.next = 10;
                          return _this4.fetchData(v.dataUrl, (0, _defineProperty2.default)({}, configs[k].searchKey, value[k - 1]));

                        case 10:
                          resp = _context2.sent;
                          optionsChild[f] = (0, _objectSpread2.default)({}, optionsChild[f], {
                            loading: false,
                            children: _lodash.default.map(resp.data, function (va) {
                              return {
                                value: va.id,
                                label: va.name,
                                isLeaf: isLeaf
                              };
                            })
                          }); // 记录父节点

                          optionsChild = optionsChild.children;

                        case 13:
                          _context2.next = 27;
                          break;

                        case 15:
                          if (!(k === 0)) {
                            _context2.next = 26;
                            break;
                          }

                          if (!(options.length > 0)) {
                            _context2.next = 19;
                            break;
                          }

                          optionsChild = options;
                          return _context2.abrupt("return", "continue");

                        case 19:
                          _context2.next = 21;
                          return _this4.fetchData(v.dataUrl, {});

                        case 21:
                          resp = _context2.sent;
                          options = _lodash.default.map(resp.data, function (va) {
                            return {
                              value: va.id,
                              label: va.name,
                              isLeaf: isLeaf
                            };
                          });
                          optionsChild = options;
                          _context2.next = 27;
                          break;

                        case 26:
                          return _context2.abrupt("return", "break");

                        case 27:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _loop2, this);
                });
                k = 0;

              case 7:
                if (!(k < cLen)) {
                  _context3.next = 18;
                  break;
                }

                return _context3.delegateYield(_loop2(k), "t0", 9);

              case 9:
                _ret = _context3.t0;
                _context3.t1 = _ret;
                _context3.next = _context3.t1 === "continue" ? 13 : _context3.t1 === "break" ? 14 : 15;
                break;

              case 13:
                return _context3.abrupt("continue", 15);

              case 14:
                return _context3.abrupt("break", 18);

              case 15:
                k++;
                _context3.next = 7;
                break;

              case 18:
                return _context3.abrupt("return", options);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function cascaderFetch(_x3) {
        return _cascaderFetch.apply(this, arguments);
      }

      return cascaderFetch;
    }()
    /**
     * {
     *  dataUrl: '',
     *  searchKey: '',
     * }
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          className = _this$props.className,
          style = _this$props.style,
          other = (0, _objectWithoutProperties2.default)(_this$props, ["value", "className", "style"]);
      return _react.default.createElement(_cascader.default, (0, _extends2.default)({
        className: className,
        style: style,
        value: value,
        options: this.state.options,
        loadData: this.loadData,
        onChange: this.onChange
      }, (0, _objectSpread2.default)({
        placeholder: "请选择",
        disabled: false,
        allowClear: false,
        changeOnSelect: true
      }, other)));
    }
  }]);
  return HFCascader;
}((0, _base_component.default)("HFCascader"));

exports.default = HFCascader;