import http from "http";
import cachePool from "../cache/cache_manger";

export default class Proxy {
  /**
   * 构造函数
   * @param {*} host 服务器地址
   * @param {*} port 服务器端口
   */
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  /**
   * 代理post请求
   * @param {*} path 请求地址
   * @param {*} body body
   * @param {*} session 用户session，可以为空
   */
  Post(path, body, session) {
    return new Promise((resolve, reject) => {
      let data = {
        succ: false,
        msg: "",
        data: [],
        code: 404,
        count: 0
      };

      let bodyString = Buffer.from(JSON.stringify(body));
      let headers = {
        "Content-Type": "application/json",
        "Content-Length": bodyString.length
      };
      if (session) {
        headers["Login-User"] = encodeURIComponent(JSON.stringify(session));
      }

      let options = {
        path: path,
        method: "POST",
        headers: headers,
        host: this.host,
        port: this.port
      };

      let req = http.request(options, res => {
        res.setEncoding("utf8");
        let chunks = "";
        res.on("data", chunk => {
          chunks += chunk;
        });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            data.msg = "服务器应答异常";
            data.code = res.statusCode;
            resolve(data);
          } else {
            if (chunks === "") {
              data.msg = "服务器异常";
              data.code = res.statusCode;
              resolve(data);
            } else {
              try {
                let json = JSON.parse(chunks);
                resolve(json);
              } catch (e) {
                data.msg = "数据请求异常";
                data.code = res.statusCode;
                resolve(data);
              }
            }
          }
        });
        res.on("error", e => {
          data.msg = e.message;
          data.code = 404;
          resolve(data);
        });
      });

      // 设置请求超时30秒
      req.setTimeout(30000);

      req.on("error", e => {
        if (req.res && req.res.abort && (typeof req.res.abort === "function")) {
          req.res.abort();
        }
        req.abort();
        data.msg = "服务器错误";
        data.code = 404;
        resolve(data);
      }).on("timeout", e => {
        if (req.res && req.res.abort && (typeof req.res.abort === "function")) {
          req.res.abort();
        }
        req.abort();
        data.msg = "request timeout";
        data.code = 404;
        resolve(data);
      });

      req.write(bodyString);
      req.end();
    });
  }

  /**
   * 代理get请求
   * @param {*} path 请求地址
   * @param {*} user 用户session，可以为空
   * @param {*} isCache 是否需要缓存，默认不需要
   * @param {*} expiration 缓存时间间隔，单位毫秒
   */
  Get(path, session, isCache = false, expiration = 15000) {
    return new Promise((resolve, reject) => {
      if (isCache) {
        let cData = cachePool.get(path);
        if (cData !== null) {
          return resolve(cData);
        }
      }

      let headers = {
        "Content-Type": "application/json"
      };
      if (session) {
        headers["Login-User"] = encodeURIComponent(JSON.stringify(session));
      }

      let options = {
        path: path,
        method: "GET",
        headers: headers,
        host: this.host,
        port: this.port
      };
      let data = {
        succ: false,
        msg: "",
        data: [],
        code: 404,
        count: 0
      };

      let req = http.request(options, res => {
        res.setEncoding("utf8");
        let chunks = "";
        res.on("data", chunk => {
          chunks += chunk;
        });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            data.msg = "服务器应答异常";
            data.code = res.statusCode;
            resolve(data);
          } else {
            if (chunks === "") {
              data.msg = "服务器异常";
              data.code = res.statusCode;
              resolve(data);
            } else {
              try {
                let json = JSON.parse(chunks);
                if (isCache) {
                  cachePool.set(path, json, expiration);
                }
                resolve(json);
              } catch (e) {
                data.msg = "数据请求异常";
                data.code = res.statusCode;
                resolve(data);
              }
            }
          }
        });
        res.on("error", e => {
          data.msg = e.message;
          data.code = 404;
          resolve(data);
        });
      });

      // 设置请求超时30秒
      req.setTimeout(30000);

      req.on("error", e => {
        if (req.res && req.res.abort && (typeof req.res.abort === "function")) {
          req.res.abort();
        }
        req.abort();
        data.msg = "服务器错误";
        data.code = 404;
        resolve(data);
      }).on("timeout", e => {
        if (req.res && req.res.abort && (typeof req.res.abort === "function")) {
          req.res.abort();
        }
        req.abort();
        data.msg = "request timeout";
        data.code = 404;
        resolve(data);
      });

      req.end();
    });
  }
}
