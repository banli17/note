---
title: "npm script"
date: 2018-01-15 23:24:51
toc: true
---

# 为什么选择 npm script？

现在的项目基本上都会用到 npm，npm script 能完成我们的工作，而且很简单。从`Google Trends`、`Stack Overflow Trends`趋势来看，也是值得用的：


## 使用

### 创建 package.json

`npm init`命令可以快速创建 `package.json` 文件，执行该命令会问几个基本问题，如包名称、版本号、作者信息、入口文件、仓库地址、许可协议等，多数问题已经提供了默认值。


npm init 的默认设置



npm start、 npm test 是npm 内置的命令，但是需要在 scripts 字段中声明。

npm run 是 npm run-script 命令的缩写，当运行 npm run xxx 时。步骤如下：

1. 从`package.json`中读取`scripts`对象里面的全部配置。
2. 以`npm run`的最后一个参数作为key，在scripts对象中获取对应的值作为要执行的命令。如果没有找到就报错。
3. 在系统默认的 shell 中执行上述命令，通常是 bash。

运行`npm run`可以列出所有的命令。

npm 运行脚本时，会把`node_modules/.bin`加到环境变量 $PATH 前面，所以任何可执行文件的 npm 依赖都可以在 npm script 中直接调用。这个 .bin 是干什么的？

npm run eslint 配置 eslint

## 运行多个 npm script

- 串行  && ，一个失败，后面终止
- 并行  &

 npm-run-all


- eslint
- stylelint
- jsonlint
- markdownlint-cli

单元测试
- mocha
- chai  + sinon

& wait: 
- 等待
- 如果我们在任何子命令中启动了长时间运行的进程，比如启用了 mocha 的 --watch 配置，可以使用 ctrl + c 来结束进程，如果没加的话，你就没办法直接结束启动到后台的进程。

```js
// 串行
npm-run-all lint:js lint:css lint:json lint:markdown mocha
npm-run-all lint:*  mocha

// 并行，内部已经加了 & wait
npm-run-all --parallel lint:* mocha
```

https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md


## 添加参数和注释

参数中间要用 -- 分隔

```
"lint:js": "eslint *.js",
"lint:js:fix": "npm run lint:js -- --fix",
```

注释

```
"test": "# 运行所有代码检查和单元测试 \n    npm-run-all --parallel lint:* mocha"
```

多余的空格是为了控制缩进，为了npm run 更美观


## npm script运行时日志输出

某些情况下需要静默，某些情况下需要调试。

日志级别控制参数：

- 默认日志输出级别
- 显示尽可能少的有用信息 `--loglevel silent` 或`--silent` 或 `-s`
- 尽可能多的运行时状态 `--loglevel verbose`，或者 `--verbose`，或`-d`

## npm script 钩子

比如 npm run test， 会执行 `pre`，`test`，`post` 命令

```
npm run pretest
npm run test
npm run posttest
```


测试覆盖率

- 覆盖率收集工具 `nyc`，是覆盖率收集工具 istanbul 的命令行版本，istanbul 支持生成各种格式的覆盖率报告，我已经使用多年；
- 打开 html 文件的工具 `opn-cli`，是能够打开任意程序的工具 opn 的命令行版本。

precover，收集覆盖率之前把之前的覆盖率报告目录清理掉；
cover，直接调用 nyc，让其生成 html 格式的覆盖率报告；
postcover，清理掉临时文件，并且在浏览器中预览覆盖率报告；

```
diff --git a/package.json b/package.json
index 8f67810..d297f2e 100644
--- a/package.json
+++ b/package.json
@@ -4,13 +4,17 @@
   scripts: {
+    "precover": "rm -rf coverage",
+    "cover": "nyc --reporter=html npm test",
+    "postcover": "rm -rf .nyc_output && opn coverage/index.html"
   },
@@ -22,7 +26,15 @@
   "devDependencies": {
     "npm-run-all": "^4.1.2",
+    "nyc": "^11.3.0",
+    "opn-cli": "^3.1.0",
     "stylelint": "^8.2.0",
     "stylelint-config-standard": "^17.0.0"
+  },
+  "nyc": {
+    "exclude": [
+      "**/*.spec.js",
+      ".*.js"
+    ]
   }
 }
```

## 变量

使用预定义变量 npm run env

部分排序后的预定义环境变量  npm run env | grep npm_package | sort

```
npm_package_author_name=banli17
npm_package_description=
npm_package_devDependencies_eslint=^6.0.1
npm_package_devDependencies_eslint_plugin_vue=^5.2.3
npm_package_license=ISC
npm_package_main=index.js
npm_package_name=npm-test
npm_package_scripts_env=env
npm_package_scripts_eslint=eslint *.js
npm_package_scripts_test=echo "Error: no test specified" && exit 1
npm_package_version=1.0.0
```

测试覆盖率归档是比较常见的需求，因为它方便我们追踪覆盖率的变化趋势，最彻底的做法是归档到 CI 系统里面，对于简单项目，则可以直接归档到文件系统中，即把收集到的覆盖率报告按版本号去存放。

```
diff --git a/package.json b/package.json
index d297f2e..d86f65c 100644
--- a/package.json
+++ b/package.json
@@ -12,9 +12,10 @@
   "scripts": {
-    "precover": "rm -rf coverage",
     "cover": "nyc --reporter=html npm test",
-    "postcover": "rm -rf .nyc_output && opn coverage/index.html"
+    "cover:cleanup": "rm -rf coverage && rm -rf .nyc_output",
+    "cover:archive": "mkdir -p coverage_archive/$npm_package_version && cp -r coverage/* coverage_archive/$npm_package_version",
+    "postcover": "npm run cover:archive && npm run cover:cleanup && opn coverage_archive/$npm_package_version/index.html"
   },
```

使用自定义变量

为把测试覆盖率报告分享给其他同事浏览，我们就不能使用 opn-cli 打开文件了，需要启动简单的 http 服务，把网址发给别人浏览，比如我们约定网址 http://IP:3000，这里的 IP 需要替换成自己的实际 IP。

```
npm i http-server -D 
```

```
diff --git a/package.json b/package.json
index d86f65c..abc9d01 100644
--- a/package.json
+++ b/package.json
@@ -3,6 +3,9 @@
   "version": "0.1.0",
+  "config": {
+    "port": 3000
+  },
   "scripts": {
@@ -15,7 +18,9 @@
     "cover": "nyc --reporter=html npm test",
-    "postcover": "npm run cover:archive && npm run cover:cleanup && opn coverage_archive/$npm_package_version/index.html"
+    "cover:serve": "http-server coverage_archive/$npm_package_version -p $npm_package_config_port",
+    "cover:open": "opn http://localhost:$npm_package_config_port",
+    "postcover": "npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open"
   },
@@ -23,6 +28,7 @@
   "devDependencies": {
     "chai": "^4.1.2",
+    "http-server": "^0.10.0",
     "mocha": "^4.0.1",
```

## 命令自动补全

npm run | less 列出命令  按 / 搜索

npm 自身自动完成工具  completion

bash

```
// 1. 
npm completion >> ~/.npm-completion.bash

// 2
echo "[ -f ~/.npm-completion.bash ] && source ~/.npm-completion.bash;" >> ~/.bashrc

// 3
source ~/.bashrc
```

zsh 可以用zsh-better-npm-completion
https://github.com/lukechilds/zsh-better-npm-completion

1. 在 npm install 时自动根据历史安装过的包给出补全建议
2. 在 npm uninstall 时候根据 package.json 里面的声明给出补全建议
3. 在 npm run 时补全建议中列出命令细节

如果你要使用 zsh-better-npm-completion 插件，需要把 .bashrc、.zshrc 文件里面 npm completion 部分的配置删掉，避免冲突。


## 跨平台兼容

如
```
"bash-script": "echo Hello $npm_package_name",
"win-script": "echo Hello %npm_package_name%"
```

npm script 中涉及到的文件系统操作包括文件和目录的创建、删除、移动、复制等操作，而社区为这些基本操作也提供了跨平台兼容的包，列举如下：

- rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；
- cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；
- make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；

npm i rimraf cpr make-dir-cli -D


设置环境变量

cross-env https://www.npmjs.com/package/cross-env


## 拆分 script 到单独文件

