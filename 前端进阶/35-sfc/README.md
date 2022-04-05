# SFC


## zsh 命令行下 nvm 提示 command not found

修改 vim ~/.zshrc 文件，添加 2 行命令，然后重启命令行界面即可生效。

```
source ~/.bash_profile
source /etc/profile
```
**原理**

zsh 默认没有读取 /etc/profile 和 ~/.bash_profile 下的配置文件，而一般 unix 环境都是读取该配置文件的，所以导致没有生效。