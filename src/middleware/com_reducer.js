import update from "react-addons-update";
import wrapMapStateToProps from './wrap_map_state_to_props';
import wrapMapDispatchToProps from './wrap_map_dispatch_to_props';
import createReduxConnector from './create_redux_connector';

function loadApp(state, {
  name,
  appInfo,
  component = {},
  action = {},
  reducer = {}
}) {
  if (!state[name]) {
    // 如果活动器是一个函数，通过调用函数得到一个实例对象
    let actionInstance = action;
    if (typeof action === 'function') {
      actionInstance = action({
        appInfo,
        name
      });
    }

    // 如果减速器是一个函数，通过调用函数得到一个实例对象
    let reducerInstance = reducer;
    if (typeof reducer === 'function') {
      reducerInstance = reducer({
        appInfo,
        name
      });
    }

    // 判断实例对象是否提供了initState方法，提供了就用initState返回的额值作为组件的初始值
    state = update(state, {
      [name]: {
        $set: reducerInstance.initState ? reducerInstance.initState() : {}
      }
    });

    // 包装组件
    let container = createReduxConnector(
        component,
        wrapMapStateToProps(name),
        wrapMapDispatchToProps(name, actionInstance, reducerInstance),
        null,
        {
          withRef: true,
          pure: true
        }
      );

    // 组件状态
    state = update(state, {
      [name]: {
        '@@require': {
          $set: {
            name,
            appInfo,
            component,
            action: actionInstance,
            reducer: reducerInstance,
            container
          }
        }
      }
    });
  }

  return state;
}

function clearAppState(state, {
  name
}) {
  if (!state[name]) {
    return state;
  }

  return update(state, {
    [name]: {
      $set: {}
    }
  });
}

function reduce(state, {
  reducer,
  type,
  payload,
  name,
  injectFunsForReducer
}) {
  let oldState = state[name];
  let newState = reducer[type].apply(this, [oldState].concat(payload));

  if (typeof newState === "function") {
    newState = newState(injectFunsForReducer);
  }

  return update(state, {
    [name]: {
      $set: newState
    }
  });
}

export default function (state = {}, {
  type,
  payload
}) {
  switch (type) {
    case "@@loadAppReal":
      return loadApp(state, payload);
    case "@@reduce":
      return reduce(state, payload);
    case "@@clearAppState":
      return clearAppState(state, payload);
    default:
      return state;
  }
}
