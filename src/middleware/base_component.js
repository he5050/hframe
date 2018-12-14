import { Component } from "react";
import { fromJS, is } from "immutable";

function trackLog(componentName) {
  return function (target, name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      let result = fn.apply(this, arguments);
      if (result) {
        console.log(`注意:组件[${componentName}]出现更新`);
      }
      return result;
    };
  };
}

export default (name = "未知") => class extends Component {
  @trackLog(name)
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }
};
