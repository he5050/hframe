'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _app_factory = require('./app_factory');

var _app_factory2 = _interopRequireDefault(_app_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	return function (store) {
		return function (next) {
			return function (action) {
				var _getState = store.getState,
				    dispatch = store.dispatch;

				if (typeof action === 'function') {
					var _action = action(),
					    name = _action.name,
					    actionCreator = _action.actionCreator,
					    args = _action.args,
					    reducer = _action.reducer;

					var reduce = function reduce(type) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}

						dispatch({
							type: '@@reduce',
							payload: {
								name: name,
								type: type,
								reducer: reducer,
								payload: args
							}
						});
					};

					actionCreator.apply(undefined, (0, _toConsumableArray3.default)(args))({
						currentApp: {
							name: name
						},
						store: store,
						reduce: reduce,
						getState: function getState() {
							return _getState()[name];
						}
					});
				} else if (action.type && action.type == '@@loadApp') {
					try {
						var _action$payload$names = action.payload.names,
						    names = _action$payload$names === undefined ? [] : _action$payload$names;

						var _loop = function _loop(i) {
							var name = names[i];
							var appInfo = _app_factory2.default.getApp(name);
							appInfo.load(function (component, action, reducer) {
								return next({
									type: '@@loadAppReal',
									payload: {
										name: name,
										appInfo: appInfo,
										component: component,
										action: action,
										reducer: reducer
									}
								});
							});
						};

						for (var i = 0; i < names.length; i++) {
							_loop(i);
						}
					} catch (e) {
						console.error(e);
						return next(action);
					}
				} else {
					return next(action);
				}
			};
		};
	};
};

module.exports = exports['default'];