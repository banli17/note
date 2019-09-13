---
title: "前端项目规范总结"
---

## 代码格式

### 校验 ESLint

### 格式化 Prettier

## git

### git 规范

良好的 Git commit 规范优势：

- 加快 Code Review 流程
- 根据 Git Commit 的元数据生成 Changelog
- 后续维护者可以知道 Feature 被修改的原因

**技术方案**

- 统一团队 Git commit 日志标准，便于后续代码 review 和版本发布
- 使用 [angular](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0) 的 Git commit 日志作为基本规范
  - 提交格式限制为：feat, fix, docs, style, refactor, perf, test, chore, revert 等
  - 提交信息分为两部分：标题(首字母不大写，末尾不加标点)、主体内容(正常描述即可)
- 日志提交时友好的类型选择提示： 使用`commitize`工具进行`git commit`命令。
- 不符合要求格式的日志拒绝提交的保障机制
  - 使用 [commitlint](https://github.com/conventional-changelog/commitlint) 工具
  - 需要同时在客户端、gitlab server hook 做
- 统一 changelog 文档信息生成： 使用 [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) 工具

**提交格式要求**

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- type 表示提交的类型，所有类型如下：
  - feat: 新增 feature
  - fix: 修复 bug
  - docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE 等
  - style: 仅仅修改了空格、格式缩进、逗号等，不改变代码逻辑
  - refactor: 代码重构，没有加新功能或者修复 bug
  - perf: 优化相关，比如提升性能、体验
  - test: 测试用例，包括单元测试、集成测试等
  - chore: 改变构建流程、或者增加依赖库、工具等
  - revert: 回滚到上一个版本

### Changelog生成

1. 安装`conventional-changelog-cli`。

```
npm i conventional-changelog-cli -D
```

2. 在`package.json`文件增加配置

```json
"script": {
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}
```

### 增加 commitlint

1. 安装 husky

```
npm i husky -D
```

2. 安装 commitlint

```
npm install --save-dev @commitlint/{config-conventional,cli}

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

2. 在`package.json`文件中增加钩子配置。

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E"
    }
  }
}
```

上面的配置，在运行 git commit 时，commitlint 会自动找配置文件 commitlint.config.js 检查信息是否符合规范，不符合则报错。

