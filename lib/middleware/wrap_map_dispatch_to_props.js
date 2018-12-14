"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapMapDispatchToProps;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _redux = require("redux");

function wrapAction(actionCreator, reducer, name) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
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

function wrapMapDispatchToProps(name, actionCreators, reducer) {
  var wrapActionCreators = {};
  var keys = Object.keys(actionCreators);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    wrapActionCreators[key] = wrapAction(actionCreators[key], reducer, name);
  }

  return function (dispatch) {
    return (0, _objectSpread2.default)({}, (0, _redux.bindActionCreators)(wrapActionCreators, dispatch));
  };
}