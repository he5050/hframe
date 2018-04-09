import { Component } from 'react';
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

export default (name = '未知') => class extends Component {
  @trackLog(name)
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  //// 接受的新的props时调用，此时仍可以修改组件的state
  //componentWillReceiveProps(nextProps) {
  //}
  //
  //// 在完成首次渲染之前调用，此时仍可以修改组件的state
  //componentWillMount() {}
  //
  //// 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state
  //componentWillUpdate() {}
  //
  //// 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
  //componentDidUpdate() {}
  //
  //// 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，
  //// 比如创建的定时器或添加的事件监听器
  //componentWillUnmount() {}
};
