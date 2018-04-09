import Cache from "./cache";

class CachePool {
  constructor() {
    this.myCache = new Cache();
  }

  get(key) {
    return this.myCache.get(key);
  }

  set(key, value, timeOut) {
    this.myCache.set(key, value, timeOut);
  }

  clear() {
    this.myCache.clear();
  }

  clearWithKey(key) {
    this.myCache.clearWithKey(key);
  }
}

const cachePool = new CachePool();
export default cachePool;
