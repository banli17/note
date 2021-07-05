# Rollup 笔记

## 配置

- input
- output
    - file
    - name
    - format // 输出格式为 iife 或 umd 时，必须提供，会作为全局变量

## babel

```
npm i @babel/core @babel/preset-env @rollup/plugin-babel
```

.babelrc

### tree-sharking

- tree-sharking 消除无用的 js 代码
- rollup 只处理函数和顶层的 import/export 变量

### 

rollup 默认只支持 es6 module，即只认识相对路径。
不知道怎么找 cjs 模块(node_modules里的模块)，也不认识 cjs。

```
npm i @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

### 压缩

```
npm install @rollup/plugin-terser --save-dev
```

### 处理 css

```
npm i @rollup/plugin-postcss
```

### dev

npm i @rollup/plugin-serve


-w
livereload 新的结果编译后，会让浏览器刷新