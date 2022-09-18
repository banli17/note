# Nodejs

## REPL

nodejs 提供了一个交互式运行环境 REPL。

在命令行中输入 node 后回车进入 REPL 环境。

运行环境中的上下文对象可以通过变量 repl 访问。

```js
let repl = require("repl");
let con = repl.start().context;
con.msg = "hello";
con.hello = function () {
  console.log(con.msg);
};
```

输入 .help 查看帮助信息：

```
.break    用于退出, 如用于退出多行输入
.clear    Alias for .break
.editor   进入编辑模式, ctrl D 完成, ctrl C 退出
.exit     退出 REPL
.help     打印帮助信息
.load     加载文件到 REPL session
.save     保存 REPL session 的所有的执行命令到一个文件中
```

例子

![](./imgs/2022-06-06-01-23-37.png)
