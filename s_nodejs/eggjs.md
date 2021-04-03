---
title: eggjs
---

## 快速初始化

```
# 快速初始化项目
mkdir egg-example && cd egg-example
npm init egg --type=simple
npm i

# 启动项目
npm run dev
```

## 逐步初始化

### 创建项目

1. 建立项目目录并安装 egg、egg-bin

```
mkdir egg-example
cd egg-example
npm init -y
npm i egg egg-bin
```

2. 添加 npm script 到 package.json。

```json
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

### 编写 Controller

编写 Controller 和路由 Router。用户处理请求和返回响应。

```js title="app/controller/home.js"
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "Hello world";
  }
}

module.exports = HomeController;
```

```js title="app/router.js"
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
};
```

加一个配置文件：

```js title="config/config.default.js"
exports.keys = "<此处改为你自己的 Cookie 安全字符串>";
```

### 静态资源

egg 内置了[egg-static](https://github.com/eggjs/egg-static)插件，默认映射`/public/* -> app/public/*`目录。所以把静态资源放到 `app/public` 目录即可。

### 模版引擎

egg 没有强制模版引擎，只是规定了[View 插件开发规范](https://eggjs.org/zh-cn/advanced/view-plugin.html)。

这里使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 来渲染，先安装插件[egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks)。

1. 安装插件

```
npm i egg-view-nunjucks
```

2. 启用插件

```js title="config/plugin.js"
exports.nunjucks = {
  enable: true,
  package: "egg-view-nunjucks",
};
```

3. 配置插件

```js title="config/config.default.js"
// 添加 view 配置
exports.view = {
  defaultViewEngine: "nunjucks",
  mapping: {
    ".tpl": "nunjucks",
  },
};
```

> 注意是 config 目录，而不是 app/config ！

4. 编写模版文件，一般放在 `app/view` 目录下。

```html title="app/view/news/list.tpl"
<html>
  <head>
    <title>Hacker News</title>
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
      <li class="item">{{ item.title }}</li>
      {% endfor %}
    </ul>
  </body>
</html>
```

5. 添加 Controller 和 Router。

```js
// app/controller/news.js
const Controller = require("egg").Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page); // 使用 Service 获取数据
    await ctx.render("news/list.tpl", { list: newsList });
  }
}

module.exports = NewsController;

// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/news", controller.news.list);
};
```

### 编写 service

在实际应用中，Controller 一般不会自己产生数据，也不会包含复杂的逻辑，复杂的过程应该抽象为业务逻辑层 Service。

```js title="app/service/news.js"
const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    // 读取配置
    const { serverUrl, pageSize } = this.config.news;

    // 使用内置 http client 发起请求
    const { data: idList } = await this.ctx.curl(
      `${serverUrl}/topstories.json`,
      {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: "json",
      }
    );

    // 并发获取每个新闻的详情
    const newsList = await Promise.all(
      Object.keys(idList).map((key) => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: "json" });
      })
    );
    return newsList.map((res) => res.data);
  }
}

module.exports = NewsService;
```

> 框架提供了内置的 [HttpClient](https://eggjs.org/zh-cn/core/httpclient.html) 来方便开发者使用 HTTP 请求。

```js title="config/config.default.js"
// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: "https://hacker-news.firebaseio.com/v0",
};
```

### 编写扩展

有个问题，新闻时间是 UnixTime 格式，需要转为容易阅读的格式。

框架提供了扩展的方式，只要在`app/extend`目录下提供扩展脚本即可。具体参见[扩展](https://eggjs.org/zh-cn/basics/extend.html)。

1. 使用 moment 编写转换时间的方法。

```js title="app/extend/helper.js"
const moment = require("moment");
```

2. 在模版中直接使用 helper

```html title="app/view/news/list.tpl"
{{ helper.relativeTime(item.time); }}
```

### 编写 Middleware

有个需求，站点需要禁止百度爬虫访问。通过判断 User-Agent。

1. 编写中间件 robot.js。

```js title="app/middleware/robot.js"
// options === app.config.robot   下面 robot 的配置会挂在 app.config 下
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get("user-agent") || "";
    const match = options.ua.some((ua) => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "Go away, robot.";
    } else {
      await next();
    }
  };
};
```

2. 使用中间件

```js title="config/config.default.js"
// 增加中间件
exports.middleware = ["robot"];
// 增加 robot 配置
exports.robot = {
  ua: [/Baiduspider/i],
};
```

### 配置文件

- 支持按环境变量加载不同配置文件
  - config.local.js config.prod.js
- 应用/插件/框架都可以配置自己的配置文件，框架将按顺序合并加载。具体合并逻辑

```js
// config/config.default.js
exports.robot = {
  ua: [/curl/i, /Baiduspider/i],
};

// config/config.local.js
// 只 development 模式下加载, 会覆盖 config.default.js
exports.robot = {
  ua: [/Baiduspider/i],
};

// app/service/some.js
const Service = require("egg").Service;

class SomeService extends Service {
  async list() {
    const rule = this.config.robot.ua; //  配置能通过 this.config 获取到
  }
}

module.exports = SomeService;
```

### 单元测试

测试文件放在根目录下的 test 目录下，并以 test.js 为后缀名，即`{app_root}/test/**/*.test.js`。

```js title="test/app/middleware/robot.test.js"
const { app, mock, assert } = require("egg-mock/bootstrap");

describe("test/app/middleware/robot.test.js", () => {
  it("should block robot", () => {
    return app
      .httpRequest()
      .get("/")
      .set("User-Agent", "Baiduspider")
      .expect(403);
  });
});
```

然后添加依赖`egg-mock`和 `npm scripts`：

```json title="package.json"
{
  "scripts": {
    "test": "egg-bin test",
    "cov": "egg-bin cov"
  }
}
```

```
# 安装依赖
npm i egg-mock
# 执行测试
npm test
```
