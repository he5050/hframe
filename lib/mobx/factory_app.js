"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FactoryApp = function () {
  function FactoryApp() {
    (0, _classCallCheck3.default)(this, FactoryApp);

    this.apps = {};
  }

  (0, _createClass3.default)(FactoryApp, [{
    key: "registerApp",
    value: function registerApp(name, app) {
      if (this.apps[name]) {
        console.log("\u8B66\u544A:\u5DF2\u7ECF\u6CE8\u518C\u8FC7\u8FD9\u4E2Aapp. name: " + name);
      }
      this.apps[name] = app;
    }
  }, {
    key: "registerApps",
    value: function registerApps(apps) {
      this.apps = (0, _extends3.default)({}, this.apps, apps);
    }
  }, {
    key: "getApp",
    value: function getApp(name) {
      var app = this.apps[name];
      if (!app) {
        throw new Error("\u6CA1\u6709\u6CE8\u518C\u8FD9\u4E2Aapp. name: " + name);
      }
      return app;
    }
  }, {
    key: "getApps",
    value: function getApps() {
      return this.apps;
    }
  }]);
  return FactoryApp;
}();

var factoryApp = new FactoryApp();
exports.default = factoryApp;
module.exports = exports["default"];