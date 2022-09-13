# 前端工程化

## 工程化解决的问题

- 传统语言语法的弊端
- 无法使用模块化和组件化
- 重复的机械工作，如压缩
- 代码风格统一、质量保证
- 依赖后端服务接口支持
- 整体依赖后端项目

## 什么是工程化

一切以提高效率、降低成本、质量保证为目的的手段都属于工程化。

一切重复的工作都应该被自动化。

- 创建项目
  - 创建项目结构
  - 创建特定类型文件
- 编码
  - 格式化代码
  - 校验代码风格
  - 编译/构建/打包
- 预览/测试
  - web server / mock
  - live reloading / hmr
  - source-map
- 提交
  - git hooks (代码检查和提交日志检查)
  - lint-staged
  - 持续集成
- 部署
  - CI/CD
  - 自动发布

工程化不等于某个工具，工程化是一种项目的方案和规划，工具是实施的方式。

工程化的核心是 Node.js。

内容

- 脚手架工具开发
- 自动化构建系统
- 模块化打包
- 项目代码规范化
- 自动化部署

## 体验

**npm scripts**

```
"dev": "browser-sync . --files \"css/*.css\"",
"build": "sass ./scss/index.scss ./css/index.css --watch",
"start": "run-p dev build"
```

sass 之前的扩展名是 sass，因为语法规范不被人接受，所以 sass v3 引入的新的语法，扩展名为 scss。

**npm-run-all**

npm-run-all 可以同时运行多个 npm script，

为什么

- & 在 window 上有兼容问题
- npm-run-all 提供了三个命令，可以很方便的并行、顺序执行 npm 命令

```sh
npm-run-all clean lint --parallel "build:** -- --watch"

# 顺序执行
run-s

# 并行执行
run-p
```

## 常用的自动化构建工具

npm scripts 能解决一些构建任务，但是很难处理复杂的任务。

- Grunt: 基于临时文件，每步都会生成临时文件，速度较慢。
- Gulp: 基于内存。支持同时执行多个任务，相对 Grunt 更简单。
- FIS

## Grunt

1、安装 grunt

```sh
npm i grunt
```

2、grunt 默认配置文件是 gruntfile.js，它导出一个函数，函数第一个参数是 grunt 实例，运行命令时，会默认执行名为 default 任务。

3、通过 `grunt.registerTask(name[, descrition[, otherTasks]], callback)` 注册命令。

```js
module.exports = (grunt) => {
  grunt.registerTask("default", "任务描述", ["foo", "bar"], () => {
    console.log("执行默认任务");
  });
};
```

4、通过 `grunt [taskTame]` 运行命令，默认会运行 default 命令。

```sh
grunt foo # 执行 foo 命令，此时 default 命令不会执行
```

5、用 `grunt.initConfig()` 用来配置任务选项，通过 `grunt.config()` 来获取值。

```js
module.exports = (grunt) => {
  grunt.initConfig({
    foo: {
      name: "zhangsan",
      age: 12,
    },
  });

  grunt.registerTask("foo", function () {
    console.log(grunt.config("foo")); // { name: 'zhangsan', age: 12 }
    console.log(grunt.config("foo.age")); // 12
    console.log(this);
    /*
    {
      nameArgs: 'foo',
      name: 'foo',
      args: [],
      flags: {},
      async: [Function (anonymous)],
      errorCount: [Getter],
      requires: [Function: bound ],
      requiresConfig: [Function (anonymous)],
      options: [Function (anonymous)] // 这是是 options，不过混合了很多其它配置
    }
    */
  });
};
```

6、grunt.registerTask() 还可以组合任务，如下面组合 foo 和 bar 任务。组合的任务是顺序执行，不会同步执行。也可以通过 `grunt.task.run()` 调用多个任务。

```js
grunt.registerTask("default", ["foo", "bar"]);

grunt.registerTask("default", () => {
  grunt.task.run("foo", "bar");
});
```

7、默认 grunt 是同步模式，如果使用异步，需要使用 `this.async()`，它返回一个方法 done，用来响应任务是否执行完成。

```js
grunt.registerTask("async-task", function () {
  const done = this.async();
  setTimeout(() => {
    console.log("async task working~");
    done();
  }, 1000);
});
```

8、标识任务失败的方式是在 registerTask 回调函数中返回 false，如果是异步任务，需要调用 `done(false)`。如果一个任务标识为失败，后面的任务将不会被执行。可以通过 --force 参数强制执行。

```js
// 同步任务
grunt.registerTask("bad", () => {
  console.log("bad working~");
  return false;
});

// 异步函数中标记当前任务执行失败的方式是为回调函数指定一个 false 的实参
grunt.registerTask("bad-async", function () {
  const done = this.async();
  setTimeout(() => {
    console.log("async task working~");
    done(false);
  }, 1000);
});
```

9、多目标模式，可以让一个任务根据配置形成多个子任务，可以通过 this.data 获取对应的数据。

```js
grunt.initConfig({
  build: {
    options: {
      msg: "task options",
    },
    foo: {
      options: {
        msg: "foo target options",
      },
    },
    bar: "456",
  },
});

grunt.registerMultiTask("build", function () {
  // 通过 this.data.options 获取子任务的 options
  console.log(`task: build, target: ${this.target}, data: ${this.data}`);
  console.log(this.options()); // 获取 build 公共的配置 {msg: "task options"}
});

// Running "build:foo" (build) task
// task: build, target: foo, data: [object Object]
// { msg: 'foo target options' }

// Running "build:bar" (build) task
// task: build, target: bar, data: 456
// { msg: 'task options' }
```

10、使用 grunt 插件，grunt 的插件一般命名规则是 `grunt-contrib-*`，使用 `grunt.loadNpmTasks()` 方法加载任务。

```js
module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      temp: "temp/**", // 会将指定的文件夹删除
      cssdir: "css/**",
    },
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
};
```

11、`load-grunt-tasks` 插件可以自动加载 grunt npm 插件。

```js
// 之前
grunt.loadNpmTasks("grunt-contrib-clean");
grunt.loadNpmTasks("grunt-contrib-babel");

// 之后
const loadGruntTasks = require("load-grunt-tasks");
loadGruntTasks(grunt);
```

12、`grunt-contrib-watch` 内置了 livereload，设置参考:

```js
watch: {
  options: {
    livereload: {
      host: "localhost",
      port: 9000,
    },
  },
  js: {
    files: ["src/js/*.js"],
    tasks: ["babel"],
  },
  css: {
    files: ["src/scss/*.scss"],
    tasks: ["sass"],
  },
}
```

设置完成后，在页面中增加：

```html
<script src="//localhost:9000/livereload.js"></script>
```
