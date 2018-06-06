import React from 'react';
import { BrowserRouter, StaticRouter } from "react-router-dom";

export default function renderApp(params, routes, l, c) {
  let render;
  if (params.renderType === 'client') {
    // 客户端渲染模型
    render = (
      <BrowserRouter>
        {
          routes
        }
      </BrowserRouter>
    );
  } else {
    // 服务器渲染模型
    render = (
      <StaticRouter location={l} context={c}>
        {
          routes
        }
      </StaticRouter>
    );
  }

  return render;
}
