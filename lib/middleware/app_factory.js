"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AppFactory =
/*#__PURE__*/
function () {
  function AppFactory() {
    (0, _classCallCheck2.default)(this, AppFactory);
    this.apps = {};
  }

  (0, _createClass2.default)(AppFactory, [{
    key: "registerApp",
    value: function registerApp(name, app) {
      if (this.apps[name]) {
        console.log("\u8B66\u544A:\u5DF2\u7ECF\u6CE8\u518C\u8FC7\u8FD9\u4E2Aapp. name: ".concat(name));
      }

      this.apps[name] = app;
    }
  }, {
    key: "registerApps",
    value: function registerApps(apps) {
      this.apps = (0, _objectSpread2.default)({}, this.apps, apps);
    }
  }, {
    key: "getApp",
    value: function getApp(name) {
      var app = this.apps[name];

      if (!app) {
        throw new Error("\u6CA1\u6709\u6CE8\u518C\u8FD9\u4E2Aapp. name: ".concat(name));
      }

      return app;
    }
  }, {
    key: "getApps",
    value: function getApps() {
      return this.apps;
    }
  }]);
  return AppFactory;
}();

var appFactoryInstance = new AppFactory();
var _default = appFactoryInstance;
exports.default = _default;