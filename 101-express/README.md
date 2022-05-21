# express

## express 基础

### 搭建环境

1. 初始化工程

```
mkdir 1-basic
cd 1-basic
mkdir src
touch src/index.js

npm init -y
npm i express
npm i nodemon -g
```

2. 修改 package.json

```
"scripts": {
  "serve": "nodemon ./src/index.js"
}
```

3. 运行 npm run serve

### 获取参数

- req.query 用于获取 url 参数
