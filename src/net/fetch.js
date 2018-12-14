import fetch from "isomorphic-fetch";

class FetchPack {
  constructor() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.requestInit = {
      headers,
      // include:表示可以跨域传递cookie same-origin:表示只能同源传递cookie
      credentials: 'same-origin',
      mode: 'cors',
      cache: 'default',
    };
  }

  async post(url, body) {
    let respData = {};

    try {
      let resp = await fetch(
        url,
        {
          ...this.requestInit,
          method: 'post',
          body: JSON.stringify(body),
        }
      );
      respData = await resp.json();

      // 判断是否有重定向
      if (respData.code === 302) {
        window.location.href = respData.data[0];
      }
    } catch (err) {
      console.log(err);
      respData.succ = false;
      respData.msg = `网络请求异常`;
    }

    return respData;
  }

  async get(url) {
    let respData = {};

    try {
      let resp = await fetch(
        url,
        {
          ...this.requestInit,
          method: 'get',
        }
      );
      respData = await resp.json();

      // 判断是否有重定向
      if (respData.code === 302) {
        window.location.href = respData.data[0];
      }
    } catch (err) {
      console.log(err);
      respData.succ = false;
      respData.msg = `网络请求异常`;
    }

    return respData;
  }
}

/**
 * 使用方法
 * import netApi from "./net.js";
 * netApi.getInstance().get('/api/???/list?xx=xx&&xxx=xxx').then(
 *  (ret) => {
 *    // 正常结果返回，已经经过json编码后的结果
 *  },
 *  (err) => {
 *    // 出错返回
 *  }
 * )
 */

var fetchPack = new FetchPack();
export default fetchPack;
