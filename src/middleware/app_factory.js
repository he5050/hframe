/**
 * @description 所有的组件都通过该类先注册
 * @class appFactory
 */

class appFactory {
  constructor() {
    this.apps = {};
  }

  registerApp(name, app) {
    if (this.apps[name]) {
      console.log(`警告:已经注册过这个app. name: ${name}`);
    }
    this.apps[name] = app;
  }

  registerApps(apps) {
    this.apps = {
      ...this.apps,
      ...apps
    };
  }

  getApp(name) {
    var app = this.apps[name];
    if (!app) {
      throw `没有注册这个app. name: ${name}`;
    }
    return app;
  }

  getApps() {
    return this.apps;
  }
}

const appFactoryInstance = new appFactory();
export default appFactoryInstance;
