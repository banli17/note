# lerna

## what

lerna 是一个基于 git + npm 的多 package 项目的管理工具

## why

原生脚手架开发痛点

- 重复操作
  - 多 package 管理
    - link
    - 安装
    - 测试
    - 代码提交
    - 发布
- 版本一致性
  - 发布时版本一致性
  - 发布后相互依赖版本升级

优势：

- 大幅减少重复操作
- 提升操作的标准化

lerna 是架构优化的产物，项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标就是效能。

## how

### 脚手架项目初始化

1. 创建项目目录。
2. 执行 `npm init -y` 初始化 package.json。
3. 安装 lerna: `npm i lerna -D`。
4. 初始化项目：`lerna init`。这一步会自动初始化 git 、创建 packages 目录、创建 `lerna.json`文件。

![](./imgs/2022-02-28-22-32-30.png)

### 创建 package

- lerna create 创建 package

- lerna add 安装依赖

![](./imgs/2022-02-28-22-38-02.png)

- lerna link 链接依赖, 需要在 package.json 里添加依赖的包。会在包的 node_modules 目录下创建一个依赖包的快捷方式。

![](./imgs/2022-02-28-22-42-04.png)

### 脚手架开发和测试

- lerna exec 执行 shell 脚本
- lerna run 执行 npm 命令，会执行 root 的 npm 脚本。
- lerna clean 清空依赖，会提示删除 packages 下面包的 node_modules 目录。
- lerna bootstrap 重装每个包的依赖

### 脚手架发布和上线

- lerna version 升级版本号，需要首先进行 git commit 
- lerna changed 查看修改过的包
- lerna diff 查看变更，从上次 commit 后的变更。
- lerna publish 会发布变更后的包，即 changed 了的包。发布后会给 github 打上 tag。

- [图解lerna publish](https://zhuanlan.zhihu.com/p/372889162)

```
lerna add xx # 给所有包安装依赖
lerna add xx --scope=package_paths # 给某个包安装依赖

lerna clean 删除所有包的依赖，会删除所有的 package/**/node_modules

lerna link 给依赖添加软链接，先在 package.json 里添加依赖。可以替换成 file: 的方式。这样就不用频繁修改依赖的版本号了。

# 在每个 package 下 执行 shell 脚本
lerna exec `rm -rf ./node_modules`
lerna exec --scope package_name

# 执行每个 package 下的 npm 脚本
lerna run
lerna run --scope package_name
```

dedent 可以删除每行前后的缩进, 每行删除的长度一样

nvm 安装 node 太慢,更换淘宝镜像源
https://blog.urcloud.co/archives/105


## lerna 源码分析

## 调试

1. 克隆 lerna 源码
2. npm i 
3. 添加 vscode 调试配置文件 `.vscode/launch.json`

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "pwa-node",
			"request": "launch",
			"name": "Launch Program",
			"skipFiles": [
				"<node_internals>/**"
			],
			"program": "core/cli/index.js", 
      "cwd": "${workspaceFolder}",
			"args": ["ls"]
		}
	]
}
```

4. 设置断点，并开始 debug。
5. 如果报错 @lerna/xx 包找不到，看看 node_modules 下 @lerna 目录下是否创建了内置包的快捷方式。如果没有。内部包里 dependence 是 `file:..` 这种格式，不知道如何能依赖上。需要到每个包里 npm i 一下才行。

本地开发多个包相互依赖，使用 npm link 管理起来不清晰，和麻烦。
可以学习使用 lerna 源码中的管理方式。
```
dependencies: {
	"util": "file:../core"
}
```
不过，在发布时，需要将它们替换成正确的方式，如 "^1.0.1"。

如果报下面错，则需要删除 package.json 文件。

![](./imgs/2022-03-02-20-04-19.png)

## import-local 源码分析

### What

import-local 的作用是：让全局安装的命令包首先执行本地版本。

比如我在全局安装了 webpack@4.0.1，在某工程下安装了 webpack@4.0.3，那么我在工程目录下执行打包命令 webpack 时，它会执行本地的 webpack@4.0.3。

### Why

因为有时候我们希望，首先执行用户本地安装的版本。

### How

使用 import-local 十分简单。

1. 安装

```
npm install import-local
```

2. 使用

```js
import importLocal from 'import-local';

if (importLocal(import.meta.url)) { // 如果是 nodejs，可以将 import.meta.url 换成 __filename
	console.log('Using local version of this package');
} else {
	// Code for both global and local version here…
}
```

### Principle

