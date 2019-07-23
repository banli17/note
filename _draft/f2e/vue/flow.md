---
title: "flow"
date: 2016-09-18 15:55:54
tags:
---

flow是一个js静态类型检查工具。

## 安装

**1. 安装flow**

```bash
npm i babel-cli babel-preset-flow
```

**2. 创建`.babelrc`**
```
{
    "preset": ["flow"]
}
```

**3. 在 `package.json` 加入脚本。将 src 目录的文件编译到 lib 目录**

```bash
{
    "scripts": {
        "build": "babel src/ -d lib/",
        "prepublish": "npm run build"
    }
}
```

**4. 初始化项目**

```bash
// 1 安装
npm i flow-bin 

// 2 package.json添加脚本
{
    "scripts":{
        "flow": "flow"
    }
}

// 3 初始化
npm run flow init

// 4 检查运行
npm run flow
```

flow-remove-types是一个小型CLI工具，用于从文件中删除 Flow类型注释。对于不需要Babel提供的所有项目而言，它是Babel的轻量级替代品。