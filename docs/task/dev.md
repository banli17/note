# 开发环境


## SourceTree 每次都需要输入密码的问题

使用 sourceTree 的时候每次 pull 和 push 代码都得输入一次密码才能操作。
在本地的 ssh 文件中添加上 ssh 信息也不行。
找到了一个解决方法，在 SourceTree -> Preferences -> Git 中设置为 Use System Git，就是 使用系统安装的Git。
其实也有一个可能是我们公司使用的是 GitLab,仓库的地址是 http 的，如果是 https 的应该就不会出现这种问题。