---
title: "npm 详解"
sidebar_label: npm 详解
---

## npm 模块安装机制

`npm install`时，会执行如下步骤：

1. 查看 node_modules 目录下是否有指定模块，如果存在，则不再重新安装。
2. 如果不存在，npm 向 registry 查询模块压缩包网址，下载压缩包，放到用户主目录的`.npm`目录，解压压缩包到当前项目的`node_modules`目录。

具体看下面实现原理

## npm 实现原理

输入`npm install`回车后，会经历下面几个阶段。

1. 执行工程自身 preinstall 钩子。
2. 确定首层依赖模块，也就是 dependencies 和 devDependencies 中的模块。
3. 递归获取模块，分为下面几步
    1. 获取模块信息。下载模块前，要确定版本。package.json 里的是`semantic version`(semver, 语义化版本)，不准确。此时要看 package-lock.json 的模块信息，有则直接用。没有则从仓库获取，比如 ^1.1.0，npm 就去仓库获取`1.x.x`的最新版本。
    2. 获取模块实体。上一步会拿到模块的压缩包地址(resolved字段)，npm 会用此地址检测本地缓存(linux 是`~/.npm`目录)，缓存中有则直接用，没有则从仓库下载。
    3. 查找该模块依赖，如果有依赖，则回到第1步。没有则停止。
4. 模块扁平化(dedupe)，即将遍历到的模块放到根节点下面，也就是 node_modules 下，如果有重复模块，则丢弃。这里重复模块是指：模块名相同且 semver 兼容，每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，则可以得到一个兼容版本。如果没有交集，则保存在各自模块的依赖树中，即放到各自模块中。
5. 安装模块。会更新`node_modules`，并执行生命周期函数，preinstall，install，postinstall。
6. 执行工程自身的生命周期。如果 npm 定义了钩子，将会被执行，按照 install、postinstall、prepublish、prepare 的顺序。

最后会生成和更新版本描述文件，npm install 过程完成。


## npm 使用

### 源管理

- nrm 源管理
- npm 
- nvm 

`npm`是一个包管理平台。平台上有很多包可以供我们直接使用，这样会省很多时间。

npm install --no-package-lock

### 如何找包

到[npm官网](https://www.npmjs.com/)搜索自己想要的包，有时有很多类似的包，不知道该使用哪个，这个时候可以通过包的描述字段来选择：

- Optimal  最佳
- Popularity
- Quality
- Maintenance  维护

现在我们需要使用jquery，所以直接在搜索栏搜索jquery即可。


### 安装npm

安装node时会自带安装npm，所以只需要先安装node即可，安装完node之后，可以通过`npm -v`看是npm是否安装成功。

```bash
npm login
npm whoami  // 测试是否登录成功
```

如果想体验下一代版本的npm，可以在安装时加上@next标志。

```bash
npm install npm@next -g
```

### 使用npm安装包

包的安装方式有2种，本地安装和全局安装。如果你需要require使用这个包，则安装在本地(npm install默认安装在本地)；如果需要命令行使用，则安装在全局。

```bash
npm install <package_name>

npm install <package_name> --force
```

执行上面的命令时，npm会查找目录的package.json文件的依赖字段，如果没有这个包，则会安装最新版本。如果有这个包，则取决于其版本规则。

另外，`npm install`首先会检查`node_modules`里是否有指定模块。如果有，则不再安装，即使有新版本；如果希望强制安装，需要使用`-f`或`--force`。


### package.json

管理包最好使用package.json文件。它包含项目依赖的包列表，还可以让其他开发者使用。

它必须包含的字段：
- name：全小写，一个单词不能有空格，允许破折号和下划线
- version: x.x.x格式，遵循版本规则

执行`npm init`命令，会按照问答方式自定义创建package.json文件。还可以加参数--yes或-y，创建默认配置的package.json。

一些字段：
- description
- main: 忽略默认是index.js
- scripts：
- keywords：如果没有设置，会根据README.md或README的第一行代替，用于被别人搜索到这个包。
- author
- license: ISC
- bugs
- homepage

可以配置这个字段的默认值，通过下面的方式：

```
npm set init.author.email "wombat@npmjs.com"
npm set init.author.name "ag_dubs"
npm set init.license "MIT"
```

可以自定义npm init时的问题。通过在home目录`~`创建`.npm-init.js`文件。例如：
```
module.exports = {
  customField: 'Custom Field',
  otherCustomField: 'This field is really cool'
}
```
上面会在npm init时生成一份包含上面字段的package.json文件。还可以通过prompt创建：

```
module.exports = prompt("what's your favorite flavor of ice cream, buddy?", "I LIKE THEM ALL");
```

关于依赖有2种类型：dependencies(生产依赖)和devDependencies(开发依赖)。 对应的安装方式是：

```
npm install <package_name> --save  // 默认，会安装在 dependencies里
npm install <package_name> --save-dev  // 安装在devDependencies
```

如果同时`--save`和`--save-dev`装了一个库，则这个库会放在devDependencies里。

### 升级本地包

```
npm update
npm update <package_name>
npm outdated
```

### 卸载本地包

```
npm uninstall <package>
```

通过加 `--save` 和 `--save-dev` 用来移除对应的依赖。但是不加参数的话，会查找devDependencies和dependencies里的库，找到就删除了。

### 在全局安装、卸载和升级

```bash
npm install -g <package>
npm uninstall -g <package>

npm update -g <package>
npm update -g  // 升级全局的全部的包
npm outdated -g --depth=0 // 看全局的包哪些可以升级
```

### 自己发布和升级包

- 首先创建包：执行`npm init`创建`package.json`。在main入口文件，默认index.js文件中导出模块。
- 登录账号，如果没有账号需要新建，使用`npm adduser`，然后使用`npm login`登录。可以使用`npm whoami`查看是否登录成功。
- 给自己的包名取一个独一无二的名字，否则在上传时会提示包名重复。
- 写README.md文档。
- 使用`npm publish`发布到npm官网上。发布成功后，在官网可以通过包名搜索到该包，或者打开`https://npmjs.com/package/<package>`查看。
- 使用`npm version <update_type>`可以修改package.json文件的version版本号字段。<update_type>是发布版本类型，值是patch, minorx或 major中的一个。
- 更新完版本号后，使用`npm publish`发布即可。
- readme需要在更新的包发布后再更新，使用`npm version patch`和`npm publish`命令。

如果遇到下面的问题：

```
npm ERR! no_perms Private mode enable, only admin can publish this module:
```

这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。

### 版本号

- 第一个版本，使用1.0.0
- 如果有bug或很小的改动，发布patch版本,增加第三位，即1.0.1
- 如果有新增功能，但是不影响现有功能，发布minor版本，增加第二位，即1.1.0
- 如果完全修改了，影响了前面已有的功能，发布major版本，增加第一位，即2.0.0

可以使用`package.json`控制安装包时版本的更新。
- Patch包: 1.0 or 1.0.x or ~1.0.4
- Minor包: 1 or 1.x or ^1.0.4
- Major包: * or x

### 使用局部包

局部包名字的格式是`@scope/project-name`，每个npm用户都有自己的作用域`@username/project-name。

创建局部包，package.json的name为 `@username/project-name`。或者`npm init --scope=username`。

如果总是使用这个作用域，可以修改.npmrc文件。通过:

```
npm config set scope username
```

### 使用Dist-tags(分发标签)标记包

标签是为了补充说明版本号(比如，v0.1)。使用它们来组织和标记不同的软件包。

为包的特定版本添加标签

```bash
npm dist-tag add <pkg>@<version> [<tag>]
```

使用标签发布

默认`npm publish`会发布最新的包。如果使用了 --tag 标志，则可以指定发布该标签的包。

```bash
npm publish --tag beta
```

使用标签安装包

```bash
npm install somepkg@beta
```

注意：标签和版本共享相同的名称空间，为了避免产生冲突，最好不要使用数字或字母v开头的标签。

### 使用双因素身份验证

直接在npm网站上设置双身份验证的方法：[点击查看](https://docs.npmjs.com/getting-started/using-two-factor-authentication)

双重身份验证可以通过以下两种方法确认身份，防止未经授权访问您的账户：

- 你知道的东西(比如用户名和密码)
- 你有的东西(比如手机或平板)

比如第一次登陆银行系统，它会往手机发一个密码，这证明手机在你旁边。之后，每当银行检测到异常(如在不同地方，不同笔记本登陆)，都会发送一条临时短信进行验证登陆。

生成OTP

要npm开启2FA，需要一个生成一次性密码(OTP)的应用程序，比如[Authy](https://authy.com/download/)或[Google Authenticator](https://support.google.com/accounts/answer/1066447)。

认证级别

有两个级别的身份验证，auth-only 和 auth-and-writes(默认)。

如果在 auth-only 模式下启用 2FA，则 npm 会在下面操作时需要OTP。
- 登录
- 删除2FA

如果在默认的 auth-and-writes 模式下启用2FA，则 npm 会在下面操作时需要OTP。

- 登录
- 改变个人资料
- 创建或撤销令牌
- 发布包
- 改变访问
- 更改密码
- 对包进行敏感更改
- 删除2FA

将 OTP 添加到命令中

```bash
npm owner add <user> --otp=123456
```

启用2FA

```bash
npm profile enable-2fa
npm profile enable-2fa auth-and-writes
npm profile enable-2fa auth-only
```

接下来会显示一个二维码...

检测双重认真是否被设置：

```bash
npm profile get
```

### 使用安全令牌

安全令牌会对账户进行身份验证，并授权发布和访问模块的权利。

### 用CLI更改配置文件设置

```bash
# 查看配置文件值，键值对
npm profile get

# prop通过上面的命令查看
npm profile set <prop> <value>
```

### package和module的区别

简单来说 package 可以是包含 package.json 的文件夹，也可以是一个版本地址(如git某个版本的地址)。所以有时一些开源库的 package.json 里依赖包直接是个git地址。

module 是 node.js 可以用的模块。它是一个js文件，且必须有 index.js 或 package.json 定义的 main 文件。

package.json 定义了一个包，node_modules 是 node 查找模块的地方。比如一个js文件，没有package.json，那它可以require()引入。它是个模块。有个文件包没有index.js或main字段，那它不是模块。

npm mongoose -v

## 私有包

```
# 配置全局
npm config set scope <your_scope>

# 初始化
npm init --scope=<your_scope>

# 安装
npm install @scope/project-name
var project = require('@scope/project-name')

# 对包进行管理
npm access restricted <package_name>

## 发布
npm publish --access=public
```

这样，在包前面就会有 @scope 标志。如果以私人用户注册，范围就是用户名。


## npm-link

在包里`npm link`是将包链接到全局`{prefix}/lib/node_modules/<package>`，全局配置可以通过`npm config ls`查看。这样相当于是在全局安装了一个包。所以在其它项目里可以通过`npm link package_name`命令在项目`node_modules`目录下创建一个包链接。



## 学习资料

- [npm官方文档](https://www.npmjs.com.cn/all/)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [npm模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)
- [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [【原】npm 常用命令详解](https://www.cnblogs.com/PeunZhang/p/5553574.html)
- [一文看懂npm、yarn、pnpm之间的区别](http://geek.csdn.net/news/detail/197339)


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



