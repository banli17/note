---
title: 代码格式化 prettier
---

# 代码格式化 prettier

## vscode 配置

```json
{
  "extensions.ignoreRecommendations": false,
  "team.showWelcomeMessage": false,
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "react.beautify.onSave": true,
  "files.associations": {
    // "*.js": "javascriptreact"
  },
  "git.confirmSync": false,
  "explorer.confirmDelete": false,
  "[markdown]": {},
  "eslint.enable": true,
  "eslint.options": {
    "extensions": [".js", ".jsx", ".vue"]
  },
  "eslint.validate": [
    "javascript",
    // "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "editor.formatOnSave": true,
  "vetur.validation.template": false,
  "eslint.autoFixOnSave": true,
  "editor.tabSize": 2,
  "jest.autoEnable": false,
  "jest.pathToConfig": "./.jest.js",
  "terminal.integrated.rendererType": "dom",
  "window.zoomLevel": 0,
  "editor.quickSuggestions": {
    "strings": true
  },
  "diffEditor.renderSideBySide": true,
  "vsicons.dontShowNewVersionMessage": true,
  "editor.fontSize": 15,
  "workbench.colorTheme": "Visual Studio Light",
  "[javascriptreact]": {},
  "leetcode.endpoint": "leetcode",
  "leetcode.hint.configWebviewMarkdown": false,
  "leetcode.workspaceFolder": "/Users/banli/.leetcode",
  "leetcode.defaultLanguage": "javascript"
}
```
