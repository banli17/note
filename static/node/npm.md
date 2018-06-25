# npm

`npm`是一个包管理平台。平台上有很多包可以供我们直接使用，这样会省很多时间。

## 学习资料

- [npm官方文档](https://www.npmjs.com.cn/all/)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [npm模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)
- [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [【原】npm 常用命令详解](https://www.cnblogs.com/PeunZhang/p/5553574.html)
- [一文看懂npm、yarn、pnpm之间的区别](http://geek.csdn.net/news/detail/197339)

npm install --no-package-lock

## 如何找包

到[npm官网](https://www.npmjs.com/)搜索自己想要的包，有时有很多类似的包，不知道该使用哪个，这个时候可以通过包的描述字段来选择：

- Optimal  最佳
- Popularity
- Quality
- Maintenance  维护

现在我们需要使用jquery，所以直接在搜索栏搜索jquery即可。


## 安装npm

安装node时会自带安装npm，所以只需要先安装node即可，安装完node之后，可以通过`npm -v`看是npm是否安装成功。

```bash
npm login
npm whoami  // 测试是否登录成功
```

如果想体验下一代版本的npm，可以在安装时加上@next标志。

```bash
npm install npm@next -g
```

## 使用npm安装包

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

## 私有模块

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
```

这样，在包前面就会有 @scope 标志。如果以私人用户注册，范围就是用户名。


