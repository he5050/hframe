"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

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

var _lodash3 = require("lodash.debounce");

var _lodash4 = _interopRequireDefault(_lodash3);

var _utils = require("../../utils/utils");

var _utils2 = _interopRequireDefault(_utils);

var _fetch = require("../../net/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _base_component = require("../../middleware/base_component");

var _base_component2 = _interopRequireDefault(_base_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HFSelect = function (_BaseComponent) {
  (0, _inherits3.default)(HFSelect, _BaseComponent);

  function HFSelect(props) {
    (0, _classCallCheck3.default)(this, HFSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HFSelect.__proto__ || (0, _getPrototypeOf2.default)(HFSelect)).call(this, props));

    _this.onSearch = function (value) {
      var _this$props$searchKey = _this.props.searchKey,
          searchKey = _this$props$searchKey === undefined ? 'name' : _this$props$searchKey;

      var p = (0, _extends4.default)({}, _this.state.queryParams);
      if (p[searchKey] !== value) {
        p.pageIndex = 1;
      }
      p[searchKey] = value;
      _this.fetchData(p, _this.state.keyId);
    };

    _this.onMore = function () {
      if (_this.state.fetching) {
        return;
      }
      var p = (0, _extends4.default)({}, _this.state.queryParams);
      p.pageIndex += 1;
      _this.fetchData(p, _this.state.keyId, true);
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
      fetching: false,
      keyId: props.keyId
    };
    _this.handleSearch = (0, _lodash4.default)(_this.onSearch, 800);
    return _this;
  }

  (0, _createClass3.default)(HFSelect, [{
    key: "fetchData",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(p, keyId) {
        var isMore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var nextProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.props;
        var fetchId, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!nextProps.disabled) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(p[keyId] === undefined || this.state.fetching)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:

                // 避免没必要的刷新
                this.lastFetchId += 1;
                fetchId = this.lastFetchId;


                this.setState({ fetching: true });
                resp = {
                  succ: false
                };
                _context.prev = 8;
                _context.next = 11;
                return _fetch2.default.get(_utils2.default.buildQueryUrl(this.props.listUrl, (0, _extends4.default)({}, p)));

              case 11:
                resp = _context.sent;
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](8);

                console.log(_context.t0);

              case 17:
                if (!(fetchId !== this.lastFetchId)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return");

              case 19:

                if (isMore) {
                  // 加载更多
                  if (!resp.succ) {
                    this.setState({ fetching: false });
                  } else {
                    this.setState({
                      data: [].concat((0, _toConsumableArray3.default)(this.state.data), (0, _toConsumableArray3.default)(resp.data)),
                      queryParams: (0, _extends4.default)({}, p),
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
                      data: [].concat((0, _toConsumableArray3.default)(resp.data)),
                      queryParams: (0, _extends4.default)({}, p),
                      count: resp.count,
                      fetching: false
                    });
                  }
                }

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 14]]);
      }));

      function fetchData(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initData(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.initData(nextProps);
    }
  }, {
    key: "initData",
    value: function initData(nextProps) {
      if (nextProps[nextProps.keyId] === undefined) {
        this.setState({
          data: [],
          queryParams: {
            pageIndex: 1,
            pageSize: nextProps.pageSize || 20
          }
        });
      } else if (nextProps[nextProps.keyId] !== this.state.queryParams[nextProps.keyId]) {
        this.setState({ data: [] });
        this.fetchData((0, _extends4.default)({}, this.state.queryParams, (0, _defineProperty3.default)({
          pageIndex: 1
        }, nextProps.keyId, nextProps[nextProps.keyId])), nextProps.keyId, false, nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          optionValue = _props.optionValue,
          mode = _props.mode,
          _props$showSearch = _props.showSearch,
          showSearch = _props$showSearch === undefined ? false : _props$showSearch,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          value = _props.value,
          _props$allowClear = _props.allowClear,
          allowClear = _props$allowClear === undefined ? false : _props$allowClear,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? '请选择' : _props$placeholder;
      var _state = this.state,
          _state$data = _state.data,
          data = _state$data === undefined ? [] : _state$data,
          _state$count = _state.count,
          count = _state$count === undefined ? 0 : _state$count,
          fetching = _state.fetching;


      var label = _react2.default.createElement(
        "div",
        { className: "more-box", style: data.length >= count ? { display: 'none' } : {} },
        _react2.default.createElement(
          _button2.default,
          { type: "primary", loading: fetching, onClick: this.onMore },
          "\u52A0\u8F7D\u66F4\u591A"
        )
      );

      return _react2.default.createElement(
        _select2.default,
        { className: "m-select " + (this.props.className || ''),
          labelInValue: true,
          value: value,
          mode: mode,
          disabled: disabled,
          filterOption: false,
          allowClear: allowClear,
          showSearch: showSearch,
          onSearch: this.handleSearch,
          onChange: this.handleChange,
          placeholder: placeholder },
        _react2.default.createElement(
          _select2.default.OptGroup,
          { label: label },
          _lodash2.default.map(data, function (v, k) {
            // 通过用户定义的optionValue转化显示
            var tv = optionValue(v);
            return _react2.default.createElement(
              _select2.default.Option,
              { key: k, value: tv.value },
              tv.text
            );
          })
        )
      );
    }
  }]);
  return HFSelect;
}((0, _base_component2.default)('HFSelect'));

HFSelect.propTypes = {
  keyId: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  placeholder: _propTypes2.default.string,
  showSearch: _propTypes2.default.bool,
  allowClear: _propTypes2.default.bool,
  mode: _propTypes2.default.string,
  listUrl: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  optionValue: _propTypes2.default.func.isRequired
};

exports.default = HFSelect;
module.exports = exports["default"];