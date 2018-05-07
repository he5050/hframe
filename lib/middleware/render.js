'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = toRender;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _app_middleware = require('./app_middleware');

var _app_middleware2 = _interopRequireDefault(_app_middleware);

var _com_reducer = require('./com_reducer');

var _com_reducer2 = _interopRequireDefault(_com_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crashReporter = function crashReporter(store) {
  return function (next) {
    return function (action) {
      try {
        return next(action);
      } catch (err) {
        console.error('Caught an exception:[', err, ']');
        console.error('Action:[', action, ']');
        console.error('State:[', store.getState(), ']');
        throw err;
      }
    };
  };
};

// 先注册，再start
function toRender(params, initState, routes, l, c) {
  var middleware = [];
  var enhancers = [];
  if (params.mode === 'development') {
    // middleware.push(logger);
    middleware.push(crashReporter);

    /** Redux DevTools **/
    if (params.renderType === 'client') {
      if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
      }
    }
  }
  middleware.push((0, _app_middleware2.default)());

  var store = void 0;
  if (initState) {
    store = (0, _redux.createStore)(_com_reducer2.default, initState, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers)));
  } else {
    store = (0, _redux.createStore)(_com_reducer2.default, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers)));
  }

  var render = void 0;
  if (params.renderType === 'client') {
    // 客户端渲染模型
    render = _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        routes
      )
    );
  } else {
    // 服务器渲染模型
    if (params.tigNames) {
      // 触发
      store.dispatch({
        type: '@@loadApp',
        payload: {
          names: [].concat((0, _toConsumableArray3.default)(params.tigNames))
        } });
    }

    render = _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: l, context: c },
        routes
      )
    );
  }

  return render;
}
module.exports = exports['default'];