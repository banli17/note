# vscode

## 添加到右键

windows 新建文件 [vscode_open.reg](./vscode_open.reg), 贴入如下代码, 双击运行。


```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with VSCode"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with VSCode"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with VSCode"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""
```


mac https://www.cnblogs.com/mazhuang/p/13898949.html
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


## VSCode不能粘贴文件?

https://www.zhihu.com/question/264800058

windows 
https://code.visualstudio.com/Download 下载 system 版本