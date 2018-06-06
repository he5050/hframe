'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref4 = arguments[1];
  var type = _ref4.type,
      payload = _ref4.payload;

  switch (type) {
    case "@@loadAppReal":
      return loadApp(state, payload);
    case "@@reduce":
      return reduce(state, payload);
    case "@@clearAppState":
      return clearAppState(state, payload);
    default:
      return state;
  }
};

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _wrap_map_state_to_props = require('./wrap_map_state_to_props');

var _wrap_map_state_to_props2 = _interopRequireDefault(_wrap_map_state_to_props);

var _wrap_map_dispatch_to_props = require('./wrap_map_dispatch_to_props');

var _wrap_map_dispatch_to_props2 = _interopRequireDefault(_wrap_map_dispatch_to_props);

var _create_redux_connector = require('./create_redux_connector');

var _create_redux_connector2 = _interopRequireDefault(_create_redux_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadApp(state, _ref) {
  var name = _ref.name,
      appInfo = _ref.appInfo,
      _ref$component = _ref.component,
      component = _ref$component === undefined ? {} : _ref$component,
      _ref$action = _ref.action,
      action = _ref$action === undefined ? {} : _ref$action,
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === undefined ? {} : _ref$reducer;

  if (!state[name]) {
    // 如果活动器是一个函数，通过调用函数得到一个实例对象
    var actionInstance = action;
    if (typeof action === 'function') {
      actionInstance = action({
        appInfo: appInfo,
        name: name
      });
    }

    // 如果减速器是一个函数，通过调用函数得到一个实例对象
    var reducerInstance = reducer;
    if (typeof reducer === 'function') {
      reducerInstance = reducer({
        appInfo: appInfo,
        name: name
      });
    }

    // 判断实例对象是否提供了initState方法，提供了就用initState返回的额值作为组件的初始值
    state = (0, _reactAddonsUpdate2.default)(state, (0, _defineProperty3.default)({}, name, {
      $set: reducerInstance.initState ? reducerInstance.initState() : {}
    }));

    // 包装组件
    var container = (0, _create_redux_connector2.default)(component, (0, _wrap_map_state_to_props2.default)(name), (0, _wrap_map_dispatch_to_props2.default)(name, actionInstance, reducerInstance), null, {
      withRef: true,
      pure: true
    });

    // 组件状态
    state = (0, _reactAddonsUpdate2.default)(state, (0, _defineProperty3.default)({}, name, {
      '@@require': {
        $set: {
          name: name,
          appInfo: appInfo,
          component: component,
          action: actionInstance,
          reducer: reducerInstance,
          container: container
        }
      }
    }));
  }

  return state;
}

function clearAppState(state, _ref2) {
  var name = _ref2.name;

  if (!state[name]) {
    return state;
  }

  return (0, _reactAddonsUpdate2.default)(state, (0, _defineProperty3.default)({}, name, {
    $set: {}
  }));
}

function reduce(state, _ref3) {
  var reducer = _ref3.reducer,
      type = _ref3.type,
      payload = _ref3.payload,
      name = _ref3.name,
      injectFunsForReducer = _ref3.injectFunsForReducer;

  var oldState = state[name];
  var newState = reducer[type].apply(this, [oldState].concat(payload));

  if (typeof newState === "function") {
    newState = newState(injectFunsForReducer);
  }

  return (0, _reactAddonsUpdate2.default)(state, (0, _defineProperty3.default)({}, name, {
    $set: newState
  }));
}

module.exports = exports['default'];