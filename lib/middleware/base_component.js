'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function trackLog(componentName) {
  return function (target, name, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function () {
      var result = fn.apply(this, arguments);
      if (result) {
        console.log('\u6CE8\u610F:\u7EC4\u4EF6[' + componentName + ']\u51FA\u73B0\u66F4\u65B0');
      }
      return result;
    };
  };
}

exports.default = function () {
  var _dec, _desc, _value, _class;

  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '未知';
  return _dec = trackLog(name), (_class = function (_Component) {
    (0, _inherits3.default)(_class, _Component);

    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _immutable.is)((0, _immutable.fromJS)(this.props), (0, _immutable.fromJS)(nextProps)) || !(0, _immutable.is)((0, _immutable.fromJS)(this.state), (0, _immutable.fromJS)(nextState));
      }

      //// 接受的新的props时调用，此时仍可以修改组件的state
      //componentWillReceiveProps(nextProps) {
      //}
      //
      //// 在完成首次渲染之前调用，此时仍可以修改组件的state
      //componentWillMount() {}
      //
      //// 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state
      //componentWillUpdate() {}
      //
      //// 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
      //componentDidUpdate() {}
      //
      //// 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，
      //// 比如创建的定时器或添加的事件监听器
      //componentWillUnmount() {}

    }]);
    return _class;
  }(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'shouldComponentUpdate', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'shouldComponentUpdate'), _class.prototype)), _class);
};

module.exports = exports['default'];