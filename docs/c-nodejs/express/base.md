# express 基础

## 启动服务

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>hello express!</h1>`);
});

app.listen(8080, () => {
  console.log(`服务启动成功: http://localhost:8080`);
});
```

`app.get('/')` 仅对 url http://localhost:8080/ 有效, 其它页面将返回 404 Not Found, `app.use('/')` 对 url http://localhost:8080/\* 有效。

## 启动 https

Express 通过将 app 传入到 https.createServer 中来实现 https 请求。

```js
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(443, () => {
    console.log("serever is runing at port 443");
  });
```

## 静态文件

Express 通过中间件 `express.static(root, [options])` 提供静态文件服务。

```js
app.use(express.static("public"));
```

现在可以访问：

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
```

:::tip
public 是相对当前启动 node 进程目录的，可以设置绝对地址来访问其它项目目录。
:::

**常用 options 配置**

- dotfiles: 如何处理 . 开头的文件或目录
- index: 设置首页，默认是 index.html
- extensions: 设置文件扩展名回退，如 `['html', 'htm']`
- [详细 options](https://expressjs.com/en/4x/api.html#express.static)

Express 查找相对于静态目录的文件，因此静态目录的名称不是 URL 的一部分。

要使用多个静态资产目录，请多次调用 `express.static()` 中间件函数：

```js
app.use(express.static("public"));
app.use(express.static("files"));
```

express.static 按照使用中间件顺序查找文件。

可以指定虚拟路径，`/static` 不是真实路径：

```js
app.use("/static", express.static("public"));
```

现在可以通过 /static 前缀访问：

```js
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
```

更多信息可以查看 [serve-static](http://expressjs.com/en/resources/middleware/serve-static.html) 包。

## 中间件

### 介绍

中间件函数是在应用程序请求-响应周期中，可以访问请求对象（req）、响应对象（res） 和 下一个中间件函数(通常是 next 名) 的函数。调用 next() 方法可以执行当前中间件之后的中间件。

中间件函数可以执行以下任务：

- 执行任何代码。
- 更改请求和响应对象。
- 结束请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件函数没有结束请求-响应循环，它必须调用 next() 将控制权传递给下一个中间件函数。否则，请求将被挂起。

下图显示了中间件函数调用的元素：

![](imgs/2023-02-05-22-04-00.png)

### 示例

```js
const express = require("express");
const app = express();

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
```

中间件加载的顺序很重要：最先加载的中间件函数也最先执行。

如果 myLogger 在到根路径的路由之后加载，请求永远不会到达它并且应用程序不会打印“LOGGED”，因为根路径的路由处理程序终止了请求-响应周期。

**示例 cookieValidator 中间件**

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const cookieValidator = require("./cookieValidator");

const app = express();
async function cookieValidator(cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie);
  } catch {
    throw new Error("Invalid cookies");
  }
}

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

app.use(cookieParser());

app.use(validateCookies);

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(3000);
```

**可配置中间件**

```js
// my-middleware.js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next();
  };
};

// 使用
const mw = require("./my-middleware.js");

app.use(mw({ option1: "1", option2: "2" }));
```

### 使用中间件

Express 应用程序可以使用以下类型的中间件：

- 应用层中间件
- 路由器级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

## 错误处理

错误处理是指 Express 如何捕获和处理同步和异步发生的错误。Express 带有默认的错误处理程序，因此您无需编写自己的错误处理程序即可开始使用。

- 中间件内同步代码发生错误，Express 会捕获并处理它(服务不会挂掉)。

```js
app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express will catch this on its own.
});
```

- 中间件内异步代码错误，需要将错误传递给 `next()` 函数，Express 将在该函数内捕获并处理它。

```js
app.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});
```

- 从 Express 5 开始，返回 Promise 的路由处理程序和中间件将在 `next(value)`、出现 reject 或抛出错误时自动调用。

```js
app.get("/user/:id", async (req, res, next) => {
  // 如果 getUserById 出现 reject, Express 将捕获错误
  const user = await getUserById(req.params.id);
  res.send(user);
});
```

如果向 `next()` 传递任何参数(除 'route' 字符串)，Express 将当前请求视为错误，并跳过任何剩余的非错误处理路由和中间件。

### 示例

**示例 1**

```js
app.get("/", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  },
]);
```

**示例 2**

```js
app.get("/", (req, res, next) => {
  Promise.resolve()
    .then(() => {
      throw new Error("BROKEN");
    })
    .catch(next); // Errors will be passed to Express.
});
```

**示例 3**

```js
app.get("/", [
  function (req, res, next) {
    fs.readFile("/maybe-valid-file", "utf-8", (err, data) => {
      res.locals.data = data; // 这里如果发生错误, Express 无法捕获到
      next(err);
    });
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  },
]);
```

无论您使用哪种方法，如果您希望 Express 错误处理程序被调用并且应用程序继续运行，您必须确保 Express 接收到错误。

### 默认处理程序

Express 在中间件栈的末尾，添加了默认的错误处理程序。错误对象包含堆栈信息。在生产环境中 (环境变量 NODE_ENV 为 production)，不会包含堆栈信息。

错误发生时，以下信息将添加到响应中：

- `res.statusCode` 会设置为 `err.status`（或 `err.statusCode`）的值，如果值超出 4xx 或 5xx 范围，会被设置为 500。
- `res.statusMessage` 会根据状态码设置。
- 生产环境下，body 是状态码信息的 HTML。否则，是 `err.stack`。
- `err.headers` 对象包含的头信息。

如果在响应后，直接调用 `next()` 来抛出一个错误，Express 默认错误处理程序会关闭连接，响应失败。

所以自定义错误处理时，当头信息发送后，需要委托 Express 来处理错误。

```js
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}
```

重复调用 next() 抛出错误时，会触发 Express 默认错误处理程序。即使有自定义错误处理。

### 自定义错误处理

自定义错误处理程序的要求：

- 有四个参数，`(err, req, res, next)`。
- 放在其它中间件的最后。

```js
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use((err, req, res, next) => {
  // logic
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

自定义错误处理程序可以有多个。

```js
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}
```

可以通过 `next('route')` 跳到下一个路由处理函数。

```js
app.get(
  "/a_route_behind_paywall",
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next("route"); // 跳过 PaidContent.find, 执行下一个路由处理函数
    } else {
      next();
    }
  },
  (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err);
      res.json(doc);
    });
  }
);
```

### 全局错误处理

```js
// 全局同步或异步错误
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
// 全局 promise 错误
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});

setTimeout(() => {
  throw Error("出错了2");
}, 1000);

Promise.reject("出错了1");
```
