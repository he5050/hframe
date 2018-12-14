import React from "react";
import { Button } from "antd";

export default () => {
  return (
    <div className="m-error-page">
      <div className="body">
        <div className="img-block">
          <div className="img-item" style={{ backgroundImage: "url(https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg)" }} />
        </div>
        <div className="content-block">
          <h1>404</h1>
          <div className="desc">抱歉,访问出错！</div>
          <div className="btn">
            <a href="/">
              <Button type="primary">
                <span>返回首页</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
