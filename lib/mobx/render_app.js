'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderApp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderApp(params, routes, l, c) {
  var render = void 0;
  if (params.renderType === 'client') {
    // 客户端渲染模型
    render = _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      routes
    );
  } else {
    // 服务器渲染模型
    render = _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: l, context: c },
      routes
    );
  }

  return render;
}
module.exports = exports['default'];