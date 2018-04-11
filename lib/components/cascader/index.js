"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _cascader = require("antd/lib/cascader");

var _cascader2 = _interopRequireDefault(_cascader);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require("immutable");

var _utils = require("../../utils/utils");

var _utils2 = _interopRequireDefault(_utils);

var _fetch = require("../../net/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _base_component = require("../../middleware/base_component");

var _base_component2 = _interopRequireDefault(_base_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HFCascader = function (_BaseComponent) {
  (0, _inherits3.default)(HFCascader, _BaseComponent);

  function HFCascader(props, context) {
    (0, _classCallCheck3.default)(this, HFCascader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HFCascader.__proto__ || (0, _getPrototypeOf2.default)(HFCascader)).call(this, props, context));

    _this.onChange = function (v) {
      // 方便外部获取名称
      _this.props.onChange(v);
    };

    _this.loadData = function (selectedOptions) {
      var _this$props$configs = _this.props.configs,
          configs = _this$props$configs === undefined ? [] : _this$props$configs;

      var targetOption = selectedOptions[selectedOptions.length - 1];
      // 获取触发的index
      var isLeaf = configs.length > targetOption.index + 1 ? false : true;
      var index = targetOption.index + 1;
      targetOption.loading = true;
      // 请求下一级的数据是根据搜索key加上具体的值
      _this.fetchData(configs[index - 1].dataUrl, (0, _defineProperty3.default)({}, configs[index - 1].searchKey, targetOption.value)).then(function (resp) {
        if (resp.succ) {
          targetOption.loading = false;
          targetOption.children = _lodash2.default.map(resp.data, function (v) {
            return {
              value: v.id,
              label: v.name,
              index: index,
              isLeaf: isLeaf
            };
          });
          // 强制刷新
          //this.forceUpdate();
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

  (0, _createClass3.default)(HFCascader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log('HFCascader componentDidMount......');
      this.cascaderFetch(this.props).then(function (options) {
        _this2.setState({ options: options });
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props.value), (0, _immutable.fromJS)(nextProps.value))) {
        this.cascaderFetch(nextProps).then(function (options) {
          _this3.setState({ options: options });
        });
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, p) {
        var resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resp = {
                  succ: false
                };
                _context.prev = 1;
                _context.next = 4;
                return _fetch2.default.get(_utils2.default.buildQueryUrl(url, (0, _extends3.default)({}, p, this.option)));

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
        return _ref.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "cascaderFetch",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
        var _this4 = this;

        var _props$configs, configs, _props$value, value, options, cLen, _loop, k, _ret;

        return _regenerator2.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _props$configs = props.configs, configs = _props$configs === undefined ? [] : _props$configs, _props$value = props.value, value = _props$value === undefined ? [] : _props$value;

                if (!(configs.length === 0)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", []);

              case 3:

                // 当前状态值
                options = [].concat((0, _toConsumableArray3.default)(this.state.options));

                // 要把value里面的值初始到组件上面，必须把每一级的数据请求下来

                cLen = configs.length;
                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(k) {
                  var v, isLeaf, resp, f;
                  return _regenerator2.default.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          v = configs[k];
                          isLeaf = cLen > k + 1 ? false : true;
                          resp = {};

                          if (!(k && value[k - 1])) {
                            _context2.next = 15;
                            break;
                          }

                          f = _lodash2.default.findIndex(options, function (o) {
                            return o.value == value[k - 1];
                          });

                          if (!(f > -1)) {
                            _context2.next = 13;
                            break;
                          }

                          if (!(options[f].children && options[f].children.length > 0)) {
                            _context2.next = 8;
                            break;
                          }

                          return _context2.abrupt("return", "continue");

                        case 8:
                          _context2.next = 10;
                          return _this4.fetchData(v.dataUrl, (0, _defineProperty3.default)({}, configs[k].searchKey, value[k - 1]));

                        case 10:
                          resp = _context2.sent;

                          options[f] = (0, _extends3.default)({}, options[f], {
                            loading: false,
                            children: _lodash2.default.map(resp.data, function (value) {
                              return {
                                value: value.id,
                                label: value.name,
                                index: 1,
                                isLeaf: isLeaf
                              };
                            })
                          });
                          console.log(k, f, value[k - 1], options);

                        case 13:
                          _context2.next = 25;
                          break;

                        case 15:
                          if (!(k === 0)) {
                            _context2.next = 24;
                            break;
                          }

                          if (!(options.length > 0)) {
                            _context2.next = 18;
                            break;
                          }

                          return _context2.abrupt("return", "continue");

                        case 18:
                          _context2.next = 20;
                          return _this4.fetchData(v.dataUrl, {});

                        case 20:
                          resp = _context2.sent;

                          options = _lodash2.default.map(resp.data, function (v) {
                            return {
                              value: v.id,
                              label: v.name,
                              index: 1,
                              isLeaf: isLeaf
                            };
                          });
                          _context2.next = 25;
                          break;

                        case 24:
                          return _context2.abrupt("return", "break");

                        case 25:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _loop, _this4);
                });
                k = 0;

              case 7:
                if (!(k < cLen)) {
                  _context3.next = 18;
                  break;
                }

                return _context3.delegateYield(_loop(k), "t0", 9);

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
        return _ref2.apply(this, arguments);
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
      var _props = this.props,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          value = _props.value,
          _props$allowClear = _props.allowClear,
          allowClear = _props$allowClear === undefined ? false : _props$allowClear,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? '请选择' : _props$placeholder,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement(_cascader2.default, {
        className: className,
        style: style,
        value: value,
        allowClear: allowClear,
        disabled: disabled,
        placeholder: placeholder,
        options: this.state.options,
        loadData: this.loadData,
        onChange: this.onChange,
        changeOnSelect: true
      });
    }
  }]);
  return HFCascader;
}((0, _base_component2.default)('HFCascader'));

exports.default = HFCascader;
module.exports = exports["default"];