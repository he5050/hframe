"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapMapStateToProps;

function wrapMapStateToProps(name) {
  return function (state) {
    return {
      appName: name,
      payload: state[name]
    };
  };
}