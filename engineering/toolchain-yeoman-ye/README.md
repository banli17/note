# 使用 yeoman 搭建脚手架

## 安装

1. 全局安装 yo

```
npm i yo -g
```

2.  创建项目后

- 安装 `npm i yeoman-generator`
- 然后手动创建目录 generators

```
- package.json
- generators
    - app
        - index.js
    - router
        - index.js
```

3. 在包内运行`npm link`，然后就可以使用 `yo [name]`，注意 name 是来自 package.json 的 name 字段 `{name: generator-[name]}`，但是不要前缀`generator-`。

`yo [name]`命令会去全局的 node_modules 里找 `generator-[name]` 包，并执行 app 目录里的 `index.js`，并且它会依次执行文件内导出类的函数。

```js
// index.js
module.exports = class extends Generator {
  a() {
    console.log("a");
  }
  b() {
    console.log("b");
  }
  c() {
    console.log("c");
  }
};
```

上面代码在执行 `yo [name]`后，依次打印出 a, b, c。

## yeoman API

- log() 打印
- spawnCommand() 执行任何 cli 命令
- prompt(Array) 弹出选项
  - store 存储
- argument(key[, desc]) 可以设置参数的描述符，命令行传参数会覆盖。
  - 然后通过 `this.options.key` 获取。
- option(key[, desc]) 用来设置选项的描述符, 可以通过 `this.options.key` 获取。

```
this.arguments('name', {type: String, required: true, default: 'project-name'})
yo ye hello-world

this.options.name  // hello-world

// 通过 `--babel` 设置
this.option("babel");
yo ye hello-world --babel es5
this.option.babel // true, 默认收到选项是 boolean 类型

this.option("babel", {type: String});
yo ye hello-world --babel es5
this.option.babel // es5
```

## 实现脚手架

## 关于 yeoman 报错：requires yeoman-environment at least 3.0.0-beta.1 解决方案

```
解决办法
将yeoman-generator的版本降到4.0
或者5.0需要全局安装yeoman-environment，并且使用yo run <your generator>
```

## 资料

- https://yeoman.io/authoring/index.html
