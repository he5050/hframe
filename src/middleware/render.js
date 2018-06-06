import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from "react-router-dom";
import appMiddleware from './app_middleware';
import reducer from './com_reducer';

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('捕捉到一个异常:[', err, ']');
    console.error('动作:[', action, ']');
    console.error('状态:[', store.getState(), ']');
    throw err;
  }
};

// 先注册，再start
export default function toRender(params, initState, routes, l, c) {
  let middleware = [];
  let enhancers = [];
  if (params.mode === 'development') {
    middleware.push(crashReporter);

    // Redux DevTools
    if (params.renderType === 'client') {
      if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
      }
    }
  }
  middleware.push(appMiddleware());

  let store;
  if (initState) {
    store = createStore(
      reducer,
      initState,
      compose(
        applyMiddleware(...middleware),
        ...enhancers
      )
    );
  } else {
    store = createStore(
      reducer,
      compose(
        applyMiddleware(...middleware),
        ...enhancers
      )
    );
  }

  let render;
  if (params.renderType === 'client') {
    // 客户端渲染模型
    render = (
      <Provider store={store}>
        <BrowserRouter>
          {
            routes
          }
        </BrowserRouter>
      </Provider>
    );
  } else {
    // 服务器渲染模型
    if (params.tigNames) {
      // 触发
      store.dispatch({
        type: '@@loadApp',
        payload: {
          names: [...params.tigNames],
        }
      });
    }

    render = (
      <Provider store={store}>
        <StaticRouter location={l} context={c}>
          {
            routes
          }
        </StaticRouter>
      </Provider>
    );
  }

  return render;
}
