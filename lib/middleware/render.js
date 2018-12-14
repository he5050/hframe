"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toRender;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _app_middleware = _interopRequireDefault(require("./app_middleware"));

var _com_reducer = _interopRequireDefault(require("./com_reducer"));

var crashReporter = function crashReporter(store) {
  return function (next) {
    return function (action) {
      try {
        return next(action);
      } catch (err) {
        console.error("捕捉到一个异常:[", err, "]");
        console.error("动作:[", action, "]");
        console.error("状态:[", store.getState(), "]");
        throw err;
      }
    };
  };
}; // 先注册，再start


function toRender(params, initState, routes, l, c) {
  var middleware = [];
  var enhancers = [];

  if (params.mode === "development") {
    middleware.push(crashReporter); // Redux DevTools

    if (params.renderType === "client") {
      if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
      }
    }
  }

  middleware.push((0, _app_middleware.default)());
  var store;

  if (initState) {
    store = (0, _redux.createStore)(_com_reducer.default, initState, _redux.compose.apply(void 0, [_redux.applyMiddleware.apply(void 0, middleware)].concat(enhancers)));
  } else {
    store = (0, _redux.createStore)(_com_reducer.default, _redux.compose.apply(void 0, [_redux.applyMiddleware.apply(void 0, middleware)].concat(enhancers)));
  }

  var render;

  if (params.renderType === "client") {
    // 客户端渲染模型
    render = _react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.BrowserRouter, null, routes));
  } else {
    // 服务器渲染模型
    if (params.tigNames) {
      // 触发
      store.dispatch({
        type: "@@loadApp",
        payload: {
          names: (0, _toConsumableArray2.default)(params.tigNames)
        }
      });
    }

    render = _react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.StaticRouter, {
      location: l,
      context: c
    }, routes));
  }

  return render;
}