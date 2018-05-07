'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _base_component = require('./base_component');

var _base_component2 = _interopRequireDefault(_base_component);

var _com_action = require('./com_action');

var actions = _interopRequireWildcard(_com_action);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @class AppLoader
 * @extends {BaseComponent('系统')}
 */
var AppLoader = function (_BaseComponent) {
	(0, _inherits3.default)(AppLoader, _BaseComponent);

	function AppLoader(props, context) {
		(0, _classCallCheck3.default)(this, AppLoader);
		return (0, _possibleConstructorReturn3.default)(this, (AppLoader.__proto__ || (0, _getPrototypeOf2.default)(AppLoader)).call(this, props, context));
	}

	(0, _createClass3.default)(AppLoader, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props = this.props,
			    name = _props.name,
			    payload = _props.payload;

			if (!payload['@@require']) {
				this.props.loadApp(name);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var name = nextProps.name,
			    payload = nextProps.payload;


			if (!payload['@@require']) {
				this.props.loadApp(name);
			} else if (this.props.name != nextProps.name) {
				this.props.clearAppState(this.props.name);
			}
		}

		// 内部组件的更新自己去做比较

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return true;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    name = _props2.name,
			    payload = _props2.payload,
			    others = (0, _objectWithoutProperties3.default)(_props2, ['name', 'payload']);

			if (!payload['@@require']) {
				return null;
			}

			var ReduxConnector = payload['@@require'].container;
			if (!ReduxConnector) {
				return null;
			}

			return _react2.default.createElement(ReduxConnector, (0, _extends3.default)({ store: this.context.store, payload: payload, key: name }, others));
		}
	}]);
	return AppLoader;
}((0, _base_component2.default)('系统'));

AppLoader.contextTypes = {
	store: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
	var payload = state[props.name];
	return {
		payload: payload || {}
	};
}, function (dispatch) {
	return (0, _extends3.default)({}, (0, _redux.bindActionCreators)((0, _extends3.default)({}, actions), dispatch));
}, null, {
	withRef: true,
	pure: true
})(AppLoader);
module.exports = exports['default'];