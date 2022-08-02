## vscode

## onSave 时，执行了两次 lint

是因为配置：

```
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
 },
```

将 editor.formatOnSave 注释掉，但是 html 又不能格式化了。

对非 eslint fix 增加 `[language]": { ... }` 格式化，如下：

```
{
  // 设置默认的js格式化工具
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  // 设置默认的json格式化工具
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // 设置默认的scss格式化工具
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // 设置默认的html格式化工具
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

- [VS Code "onSave" 时，执行了两次 lint](https://zhuanlan.zhihu.com/p/328189951)
## vim
