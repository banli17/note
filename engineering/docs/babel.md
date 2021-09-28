## jest

```js
https://github.com/facebook/jest/issues/8114
// 忽略 dist 目录,因为 dist 目录里有 package.json name 和包相同，会报错
// 不能用 * 号
  modulePathIgnorePatterns: utils.packagesList.map(
    (pkg) => `<rootDir>/packages/${pkg.dirName}/dist`
  ),
```

/* istanbul ignore next */


修改引用路径
Jest not recognizing Yarn workspace module
```js
{
	resolver: '<rootDir>/resolve.js'
}

// resolve.js
const { parseImportToRelativePath } = require('./utils')

// 将模块中的import  @uino/CharactorStorage 转换为相对路径，防止 jest 找不到模块
module.exports = (request, options) => {
  let relativePath = parseImportToRelativePath(request)
  if (relativePath) {
    request = relativePath
  }

  return options.defaultResolver(request, {
    ...options,
  })
}
```

## yarn

```
运行 yarn 时 engine 报错
https://github.com/gilbarbara/react-joyride/issues/131
yarn --ignore-engines
```


## changelog

https://zj-git-guide.readthedocs.io/zh_CN/stable/message-guideline/%E8%87%AA%E5%8A%A8%E7%89%88%E6%9C%AC%E5%8C%96%E5%92%8C%E7%94%9F%E6%88%90CHANGELOG%E5%B7%A5%E5%85%B7standard-version.html
http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

changelog 生成时，遇到不符合 angular 规范的 commit 信息，就会终止掉，changelog 里就没有那些信息
运行时可能存在输出目录不存在的问题，要先生成dist目录


monorepo 时

对于绝对引用，开发时替换为相对路径，会打包到一起。用 rollup 插件替换

```
function ReplaceImport(options) {
  return {
    name: 'ReplaceImport',
    resolveId(importee) {
      return utils.parseImportToRelativePath(importee)
    },
  }
}
```


`regeneratorRuntime` is not defined when running Jest test
https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc

https://juejin.cn/post/6902312984358436878
https://www.jianshu.com/p/11a8cc7ea6d9
https://docs.npmjs.com/cli/v7/using-npm/workspaces

https://blog.csdn.net/weixin_43846401/article/details/109294202

https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined


https://www.jianshu.com/p/40f732d91a8c


## babel

@babel/runtime 辅助函数 +regenerator-runtime
会把重复的辅助函数 require @babel/runtime 进行重复利用
@babel/runtime-corejs2: 辅助函数 +regenerator-runtime+ core-js
@babel/plugin-transform-runtime
@babel/preset-env 可以根据 target browserslist进行转换





