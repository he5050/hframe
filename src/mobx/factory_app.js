class FactoryApp {
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
      ...apps,
    };
  }

  getApp(name) {
    var app = this.apps[name];
    if (!app) {
      throw new Error(`没有注册这个app. name: ${name}`);
    }
    return app;
  }

  getApps() {
    return this.apps;
  }
}

const factoryApp = new FactoryApp();
export default factoryApp;
