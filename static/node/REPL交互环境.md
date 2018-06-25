# REPL交互环境

REPL是Read Eval Print Loop的简称，它是一个终端环境，相当于浏览器的控制台一样。

![repl](_img/repl.png)

通过在终端运行`node`命令，进入node的执行环境。
- 下划线`-` 可以获取上一个表达式运算结果
- .help 可以查看可以使用的方法
- .save 1.txt 可以将执行的代码保存成文件
- .load 1.txt 下次可以通过这种方式加载文件
- .exit 退出repl环境
- .editor 进入编辑模式
- .break  有时候卡住了，可以通过这个命令退出
- .clear  是.break的别名

一些命令

```
node -v
node --help

# c是check的缩写，用来语法检查，如果有语法报错，会提示。没有错误则没有提示
node -c

node --inspect  // 用来做调试的命令
```

请求内容和响应内容
get 和 post

理论上，URL不存在参数上限的问题，HTTP协议规范没有对URL长度进行限制。这个限制是特定的浏览器或服务器对它的限制。比如IE浏览器对URL长度的限制是2083字节(2K+35)。而POST是没有大小限制的，HTTP协议规范也没有进行大小限制。但有可能受限于服务器的限制。
get只支持ASCII字符，传递中文需要先对URL进行编码。而POST请求的请求体支持传递各种格式的数据。

vscode断点调试

远程调试

环境
Nodejs 6.3+ 或 安装 node-inspector
Chrome 55+

```bash
node --inspect index.js
```

chrome://inspect

git
git 是一项基本技能，多读书多实践。当然，我们也可以做另外一门课程来专门介绍 git ，大家可以在 imweb·git 上发表自己的意见哦。

猴子都能懂的 git 入门：http://backlogtool.com/git-guide/cn/
官网地址： https://git-scm.com/
git 中文： https://git-scm.com/book/zh/v2
