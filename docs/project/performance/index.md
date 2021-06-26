# 性能优化的指标和目标

## 性能优化的意义

WPOStats 性能优化案例库 - 业界经验

```
高性能 -> 用户参与度 + 用户留存
            |
         高转换率   + seo 排名
            |
         业务收益
```

- 性能优化指标与测量工具
  - 行业标准
  - 优化模型
  - 测量工具
  - 性能相关 APIS
- 代码优化
  - JavaScript
  - CSS
  - HTML
- 渲染优化
  - 现代浏览器渲染原理
- 资源优化
- 构建优化
  - webpack 优化配置
  - 代码拆分
  - 代码压缩
- 传输加载优化
  - Gzip
- 更多流行优化技术
  - 预加载
  - 骨架屏

寻找性能平静瓶颈

- 了解性能指标-多快才算快
- 利用测量工具和 APIs
- 优化问题，重新测量(迭代)，对比

移动端挑战多

- 设备硬件，网速，屏幕尺寸，交互方式
- 用户更缺少耐心，>3 秒 加载导致 53% 跳出率
- 持续增长的移动用户和移动电商业务

## 性能指标和优化目标

- Network 面板
  - waterfall 加载瀑布流，显示了各个阶段的时间
  - 存储 HAR 与重建性能信息
- Lighthouse 面板
  - First Contentful Paint
  - Speed Index: 速度指标 4s
- 重要测量指标(请求)
  - Speed Index: 速度指标 4s
  - TTFB
  - 页面加载时间
  - 首次渲染: 渐进渲染
- 响应
  - 交互动作的反馈时间
  - 帧率 FPS: 通过 ctrl+shift+p 后输入 frame，显示帧率
  - 异步请求的完成时间，加 loading 效果

指标只是指导作用，并不一定要达到，具体还是看需求。

## RAIL 测量模型

- 页面流畅

### 什么是 RAIL

RAIL 和 RAIL 评估标准

- Response 响应：不是服务响应，而是给用户的反馈，如点击时动画
  - 响应：处理事件应该在 50 ms 以内完成。google 调查显示，用户体验较好是从用户输入到响应时间为 100ms，但是输入时浏览器处理要花一定时间，所以留给我们的大概时 50ms。
    ![](./imgs/2021-05-23-15-21-57.png)
- Animation 动画
  - 每 10ms 产生一帧
- Idle 空闲，让浏览器有足够的空闲时间，从而来更好处理用户的交互
- Load 加载
  - 在 5s 内完成内容加载并可以交互

目标：让用户有更好的体验

### 性能测量工具

- Chrome DevTools 开发调试、性能评测
- Lighthouse 网站整体质量评估
- WebPageTest 多测试地点、全面性能报告

解读 WebPageTest 的报告

- waterfall chart 请求瀑布图
- first view 首次访问
- repeat view 二次访问

- 在线进行网站性能分析
- 如何本地部署 WebPageTest 工具

lighthouse 三种使用方式

- npm 安装 lighthouse
- chrome devtools 里使用
- chrome 插件安装

# 构建优化

## Tree sharking

- 去掉无用代码
- 基于 es6 module
- sideEffects: 有些文件我们不希望 tree sharking，比如修改了全局变量的文件或 css 文件，treeshaking 可能就有问题了。
- babel 会默认将 es6 模块化转成 commonjs 模块化，需要配置 modules:false 来使得 tree sharking 起作用

```
// package.json
{
  "sideEffects": ["*.css"]
}

// babel.config.js
{
  preset: [
    [
      "@babel/preset-env",
      {
        modules: false,  // 保留es6模块化
        targets: {
          browsers: [">0.25%"]
        }
      }
    ]
  ]
}
```

js 压缩

- webpack4 uglifyjs-webpack-plugin
- 后来改成了支持 es6 的 terser-webpack-plugin
- 减少 js 文件体积

作用域提升

- 代码体积减少
- 提高执行效率
- 同样注意 babel 的 modules 配置

babel7 优化配置

- 在需要的地方引入 polyfill，useBuiltIns
- 辅助函数复用，使用 plugin `@bable/plugin-transform-runtime`
- 根据目标浏览器按需转换代码 targets

```
{
  useBuiltIns: 'usage',
}
```

webpack 依赖优化

- noParse
  - 提高构建速度，不需要递归解析
  - 直接通知 webpack 忽略较大的库，没有依赖文件，如 jq
  - 即被忽略的库不能有 import，exports，define 的引入方式

```
module: {
  noParse: /lodash/,
}
```

DllPlugin

- 避免打包时对不变的库重复构建，如 react
- 提高构建速度

```
// webpack.dll.config.js
// dll-build
{
  mode: 'production',
  entry: ['react', 'react-dom'],
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll')
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dll/[name].mainifest.json')
    })
  ]
}
```

```
// webpack.config.js
{
  plugins: [
    new DllReferencePlugin({
      manifest: require(`${__dirname}/dll/react.manifest.json`)
    })
  ]
}
```

代码拆分(code spliting)

- 把单个 bundle 文件拆分成若干个小 chunks/bundles
- 缩短首屏显示时间

方法

- splitChunks 提取公共代码，拆分业务组件与第三方库
- 动态加载

```
optmization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        minSize: 0,
        minChunks: 1,
        priority: 10,
        chunks: 'initial',  // 同步
      },
      common: {
        name: 'common',
        test: /[\\/]src[\\/]/,
        chunks: 'all', // 静态、动态都会提取
      }
    }
  }
}
```
