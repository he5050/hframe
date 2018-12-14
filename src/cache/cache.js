export default class Cache {
  constructor() {
    this.cache = {};
  }

  set(key, value, expire) {
    this.cache[key] = {
      value: value,
      expire: expire,
      insertTime: +new Date()
    };
  }

  get(key) {
    const cNode = this.cache[key];
    if (!cNode) {
      return null;
    }

    const { insertTime, expire, value } = cNode;
    if (!expire) {
      // 如果不存在过期时间
      return value;
    }

    let curTime = +new Date();
    // 过期时间但尚未过期
    if (curTime - insertTime < expire) {
      return value;
    }

    delete this.cache[key];

    return null;
  }

  clearWithKey(key) {
    delete this.cache[key];
  }

  clear() {
    delete this.cache;
    this.cache = {};
  }
}
