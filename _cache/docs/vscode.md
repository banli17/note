# vscode

## 调试

### 调试 node 脚本

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}\\script\\publish\\compress.js"
      "cwd": "${workspaceRoot}",
      "args": ["run-script", "pub"]
    }
  ]
}
```

### 调试 npm 命令

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "pub"],
      "port": 9229
    }
  ]
}
```

## 调试 webpack

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/node_modules/.bin/webpack",
      "args": ["--config", "webpack.config.js"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```
