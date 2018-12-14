"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _app_factory = _interopRequireDefault(require("./app_factory"));

var _default = function _default() {
  return function (store) {
    return function (next) {
      return function (action) {
        var _getState = store.getState,
            dispatch = store.dispatch;

        if (typeof action === "function") {
          var _action = action(),
              name = _action.name,
              actionCreator = _action.actionCreator,
              args = _action.args,
              reducer = _action.reducer;

          var reduce = function reduce(type) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            dispatch({
              type: "@@reduce",
              payload: {
                name: name,
                type: type,
                reducer: reducer,
                payload: args
              }
            });
          };

          actionCreator.apply(void 0, (0, _toConsumableArray2.default)(args))({
            currentApp: {
              name: name
            },
            store: store,
            reduce: reduce,
            getState: function getState() {
              return _getState()[name];
            }
          });
        } else if (action.type && action.type === "@@loadApp") {
          try {
            var _action$payload$names = action.payload.names,
                names = _action$payload$names === void 0 ? [] : _action$payload$names;

            var _loop = function _loop(i) {
              var name = names[i];

              var appInfo = _app_factory.default.getApp(name);

              appInfo.load(function (component, action, reducer) {
                return next({
                  type: "@@loadAppReal",
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

exports.default = _default;