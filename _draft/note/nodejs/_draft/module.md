---
        title: 无名
        ---
        # 模块机制（CommonJS规范，核心模块，C\C++扩展模块）

## 学习资料

- [深入浅出Node.js - 模块化机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
http://www.infoq.com/cn/master-nodejs/
## 模块化的好处

大型项目中，势必要讲功能拆分成一个个模块，这样的好处有:

1. 方便多人分工合作
2. 通过定义依赖可避免加载无用脚本
3. 减少代码耦合度
4. 解决命名冲突问题
5. 模块复用，减少重复造轮子

Node 采用 commonjs 规范实现模块化。

## commonjs规范

CommonJS规范完善了js规范，定义了文件操作，网络，模块等模块。目的是让js能不受限于浏览器，具备像java一样开发大型应用的能力。

每一个js文件就是一个模块，它可以引入和导出。

1. 使用`require()`引入模块
2. 通过`module.exports`对象暴露接口

nodejs模块分类：
- 核心模块，通过模块名引入
- 第三方模块，通过模块名引入
- 用户编写模块(通过相对路径或绝对路径引入)

文件名如果省略，node 会自动查找：`.js`、`.json`、`.node`文件。

如果一个模块是通过模块名引入，Node 查找它的机制是：

1. 首先查看它是不是核心模块。
2. 然后查看当前`node_modules`目录有没有这个模块名目录，如果找到有这个模块名目录，则看`package.json`里面的入口文件，没有定义则找`index`(.js、.json、node)文件是否可用。
3. 第2步没找到，则找其父目录，重复第2步。
4. 一直到根目录的`node_modules`，没有则抛出异常。找寻的路径可以通过`module.paths`查看。

注意第二步是先找`index.`文件，然后看`package.json`的 main 入口文件。

## 模块的缓存机制

有时候我们会碰到一个问题，为什么改了模块但是没有生效？

这是因为`module`加载时执行，第二次会从缓存取，不会执行。

```
require('./1.js')
require('./1.js')  不会执行
```

模块首次加载后会缓存在`require.cache`中。通过删除其属性，可以清除缓存。

```javascript
const server = http.createServer((req, res) => {
    // 这里要放在里面，不能放外面，放外面是一次性引入
    const moduleText = require('./text')
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key]
    })
    res.end(moduleText.text)
})
```


