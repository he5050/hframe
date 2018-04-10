'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = wrapMapDispatchToProps;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapDispatchToProps(name, actionCreators, reducer) {
	var wrapActionCreators = {};
	var keys = (0, _keys2.default)(actionCreators);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		wrapActionCreators[key] = wrapAction(actionCreators[key], reducer, name);
	}

	return function (dispatch) {
		return (0, _extends3.default)({}, (0, _redux.bindActionCreators)(wrapActionCreators, dispatch));
	};
}

function wrapAction(actionCreator, reducer, name) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return function () {
			return {
				name: name,
				actionCreator: actionCreator,
				reducer: reducer,
				args: args
			};
		};
	};
}
module.exports = exports['default'];