"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _fetch = _interopRequireDefault(require("../../net/fetch"));

var _base_component = _interopRequireDefault(require("../../middleware/base_component"));

// 样式文件加载
var HFSelect =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(HFSelect, _BaseComponent);

  function HFSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HFSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFSelect).call(this, props));

    _this.onSearch = function (value) {
      var _this$props$searchKey = _this.props.searchKey,
          searchKey = _this$props$searchKey === void 0 ? 'name' : _this$props$searchKey;
      var p = (0, _objectSpread2.default)({}, _this.state.queryParams);

      if (p[searchKey] !== value) {
        p.pageIndex = 1;
      }

      p[searchKey] = value;

      _this.fetchData(p);
    };

    _this.onMore = function () {
      if (_this.state.fetching) {
        return;
      }

      var p = (0, _objectSpread2.default)({}, _this.state.queryParams);
      p.pageIndex += 1;

      _this.fetchData(p, true);
    };

    _this.handleChange = function (v) {
      _this.props.onChange(v);
    };

    _this.lastFetchId = 0;
    _this.state = {
      data: [],
      queryParams: {
        pageIndex: 1,
        pageSize: props.pageSize || 20
      },
      count: 0,
      fetching: false
    };
    _this.handleSearch = (0, _lodash2.default)(_this.onSearch, 800);
    return _this;
  } // 分割url和参数


  (0, _createClass2.default)(HFSelect, [{
    key: "splitQueryUrl",
    value: function splitQueryUrl(props) {
      var dataUrl = props.dataUrl;
      var params = {};
      var arrs = dataUrl.split("?");

      if (arrs[1] && arrs[1].length > 0) {
        var ps = arrs[1].split("&"); // 解析参数

        _lodash.default.each(ps, function (v) {
          var pa = v.split("=");

          if (pa.length === 2) {
            params[pa[0]] = pa[1];
          }
        });
      } // url和参数


      return {
        url: arrs[0],
        queryParams: (0, _objectSpread2.default)({}, params)
      };
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(p) {
        var isMore,
            props,
            _this$splitQueryUrl,
            url,
            queryParams,
            fetchId,
            resp,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isMore = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                props = _args.length > 2 && _args[2] !== undefined ? _args[2] : this.props;

                if (!(props.disabled || this.state.fetching)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                // 解析参数
                _this$splitQueryUrl = this.splitQueryUrl(props), url = _this$splitQueryUrl.url, queryParams = _this$splitQueryUrl.queryParams; // 避免没必要的刷新

                this.lastFetchId += 1;
                fetchId = this.lastFetchId;
                resp = {};
                _context.prev = 8;
                this.setState({
                  fetching: true
                });
                _context.next = 12;
                return _fetch.default.get(_utils.default.buildQueryUrl(url, (0, _objectSpread2.default)({}, queryParams, p)));

              case 12:
                resp = _context.sent;
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);
                resp.succ = false;
                console.log(_context.t0);

              case 19:
                if (!(fetchId !== this.lastFetchId)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return");

              case 21:
                if (isMore) {
                  // 加载更多
                  if (!resp.succ) {
                    this.setState({
                      fetching: false
                    });
                  } else {
                    this.setState({
                      data: (0, _toConsumableArray2.default)(this.state.data).concat((0, _toConsumableArray2.default)(resp.data)),
                      queryParams: (0, _objectSpread2.default)({}, p),
                      count: resp.count,
                      fetching: false
                    });
                  }
                } else {
                  // 条件搜索
                  if (!resp.succ) {
                    this.setState({
                      fetching: false,
                      data: []
                    });
                  } else {
                    this.setState({
                      data: (0, _toConsumableArray2.default)(resp.data),
                      queryParams: (0, _objectSpread2.default)({}, p),
                      count: resp.count,
                      fetching: false
                    });
                  }
                }

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 15]]);
      }));

      function fetchData(_x) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }() // componentWillMount() {

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        data: []
      });
      this.fetchData((0, _objectSpread2.default)({}, this.state.queryParams, {
        pageIndex: 1
      }), false, this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // 数据url发生变化，或者由不可修改变成可修改的时候
      if (this.props.dataUrl !== nextProps.dataUrl || this.props.disabled !== nextProps.disabled && !nextProps.disabled) {
        this.setState({
          data: []
        });
        this.fetchData((0, _objectSpread2.default)({}, this.state.queryParams, {
          pageIndex: 1
        }), false, nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          optionValue = _this$props.optionValue,
          mode = _this$props.mode,
          _this$props$showSearc = _this$props.showSearch,
          showSearch = _this$props$showSearc === void 0 ? false : _this$props$showSearc,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
          value = _this$props.value,
          _this$props$allowClea = _this$props.allowClear,
          allowClear = _this$props$allowClea === void 0 ? false : _this$props$allowClea,
          _this$props$placehold = _this$props.placeholder,
          placeholder = _this$props$placehold === void 0 ? '请选择' : _this$props$placehold;
      var _this$state = this.state,
          _this$state$data = _this$state.data,
          data = _this$state$data === void 0 ? [] : _this$state$data,
          _this$state$count = _this$state.count,
          count = _this$state$count === void 0 ? 0 : _this$state$count,
          fetching = _this$state.fetching;

      var label = _react.default.createElement("div", {
        className: "more-box",
        style: data.length >= count ? {
          display: 'none'
        } : {}
      }, _react.default.createElement(_button.default, {
        type: "primary",
        loading: fetching,
        onClick: this.onMore
      }, "\u52A0\u8F7D\u66F4\u591A"));

      return _react.default.createElement(_select.default, {
        className: "m-select ".concat(this.props.className || ''),
        labelInValue: true,
        value: value,
        mode: mode,
        disabled: disabled,
        filterOption: false,
        allowClear: allowClear,
        showSearch: showSearch,
        onSearch: this.handleSearch,
        onChange: this.handleChange,
        placeholder: placeholder
      }, _react.default.createElement(_select.default.OptGroup, {
        label: label
      }, _lodash.default.map(data, function (v, k) {
        // 通过用户定义的optionValue转化显示
        var tv = optionValue(v);
        return _react.default.createElement(_select.default.Option, {
          key: k,
          value: tv.value
        }, tv.text);
      })));
    }
  }]);
  return HFSelect;
}((0, _base_component.default)('HFSelect'));

HFSelect.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  placeholder: _propTypes.default.string,
  showSearch: _propTypes.default.bool,
  allowClear: _propTypes.default.bool,
  mode: _propTypes.default.string,
  dataUrl: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func,
  optionValue: _propTypes.default.func.isRequired
};
var _default = HFSelect;
exports.default = _default;