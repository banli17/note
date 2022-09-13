# Prettier

## 是什么

Prettier 是一个代码格式化工具。支持

- Javascript
- Jsx
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, SCSS
- HTML
- Ember/Handlerbas
- JSON
- GraphQL
- Markdown, 包括 GFM 和 MDX
- YAML

Prettier 会重新解析代码，并使用规则重新生产解析的 AST。

## 为什么

采用 Prettier 的原因是停止关于代码风格的争论。人们普遍认为，拥有共同的风格指南对项目和团队很有价值。但是实现这个目标很困难，因为每个人写法都不一样。

Prettier 是唯一一个全自动的“风格指南”。

## Prettier vs Linters

Linters 有两类规则：

- 格式化规则：如 max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style
  - Pretter 在这块做的很好
- 代码质量规则：如 no-used-vars, no-extra-bind
  - Prettier 不负责这些规则

所以，使用 Prettier 进行格式化，使用 linter 捕获错误。

## Option 理念

Prettier 已经成熟，不再接受 Option，另外太多 Option 不是好事，而且里面有些历史遗留的 Option。

## Prettier 关心的是什么

- 正确性
- 保持字符串内容原样，如"🙂"不会被格式化"\uD83D\uDE42"
- 空行
  - 多行变为一行
  - 块和文件开头和结尾的空行被删除。(文件末尾可以有一个换行符)
- 多行对象
  - 如果 `{` 和 第一个 key 之间有换行，则会多行显示
- 装饰器
  - 一般会保持你写的装饰器原样。例外是 class 前的装饰器会被换行。
- 分号
  - 会在 `[1, 2].forEach` 前插入分号，防止代码错误
- 打印宽度
- import
  - import 可以将长语句 `import {a, b}` 分为多行，但如果是 `import {a}` 会放在一行内，require也一样。
- test
  - describe, it, test 会保留冗长的测试描述。
- comment
  - 最好放行尾，如 `// eslint-disable-next-line`，因为如果放上行，代码被格式化多行，这个注释可能失效。

## 使用

1、安装

```sh
# --save-exact 用于固定版本号
npm install --save-dev --save-exact prettier
```

2、创建 `.prettierrc.json` 文件

```sh
echo {} > .prettierrc.json
```

3、创建 `.prettierignore` 文件，忽略某些文件，基于 `.gitignore` 或 `.eslintignore` 编写。

```sh
# Ignore artifacts:
build
coverage
```

4、使用 `prettier --write` 或 `prettier --check`。

```sh
npx prettier --write .  # 用于格式化所有内容

npx prettier --check    # 用于检查所有内容
```

> 不要跳过 npm i prettier，编辑器插件会选择本地版本的 Prettier

5、如果使用 eslint，请安装 [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#installation)，使得 eslint 和 prettier 相互配合。它会关闭所有不必要或可能和 Prettier 冲突的 eslint 规则。Stylelint 也有类似的插件 [`style-config-prettier`](https://github.com/prettier/stylelint-config-prettier)

## git 钩子

1、执行命令。

```sh
npm install --save-dev husky lint-staged
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

> 注意： npm set-script命令至少需要npm v7.x。请参阅 <https://docs.npmjs.com/cli/v7/commands/npm-set-script>

2、将以下内容添加到您的package.json。

```
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

<https://prettier.io/docs/en/precommit.html>

<https://www.npmjs.com/package/onchange>

## 附录

- <https://prettier.io/docs/en/index.html>
