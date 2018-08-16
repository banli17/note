# webstorm

## 注册

> 更新时间：2018/4/23 v3.3

- 通过Activation code：[http://idea.lanyus.com/](http://idea.lanyus.com/)
- 通过licence server：[https://gist.github.com/rvegas/a596d2e2abd54784b919](https://gist.github.com/rvegas/a596d2e2abd54784b919)

http://idea.yutao8.com/

## 使用

**1. [webStorm livereload 自动刷新](#livereload自动刷新)**

http://www.cnblogs.com/joesbell/p/5834355.html


**2. 禁用`search everywhere`的double shift功能**

https://youtrack.jetbrains.com/issue/IDEA-161094

ctrl + shift +A  -> registry... -> ide.supress...double click 打勾


**3. 插件安装下载失败**

去[webstorm plugin插件库](http://plugins.jetbrains.com/search?headline=25-editor&pr_productId=&canRedirectToPlugin=false&showPluginCount=false&tags=Editor)下载对应的插件完成后，放在`webstorm`安装目录的`plugin`目录下，重启`webstorm`。



# 编辑器使用

## vim

快捷键
```
i : 在当前光标所在字符的前面，转如输入模式
a : 在当前光标所在字符的后面，转入输入模式
o : 在当前光标所在行的下方，新建一行，并转入输入模式

I : 在当前光标所在行的行首，转换为输入模式
A : 在当前光标所在行的行尾，转换为输入模式
O : 在当前光标所在行的上方，新建一行，并转入输入模式
```

要想进入末行模式，只能在编辑模式进入。通过输入 : 进入末行模式。在末行模式下，可以输入编辑模式的命令，来进行编辑操作。比如：
```
:10d     删除第10行
:10,20d  删除10-20行
:10,+20d  删除10-30行，+是相对表示法
:set nu  显示行号

vim /path/to/somfile  打开某个文件，如果没有，则新建。可以不用加文件名后缀

vim 1.txt  打开文件
vim +12 1.txt  打开文件，并定位到12行
vim + 1.txt 打开文件，并定位到最后一行
vim +/PATTERN 1.txt 打开文件，定位到第一次被PATTERN匹配到的行的行首。vim +/myjson
## 末行模式关闭文件

:q  退出，不保存。如果此时编辑了，则不允许退出
:wq = :x 都是保存并退出
:q! 不保存并退出
:w  保存
:w! 强行保存，只有管理员有这个权限
编辑模式下退出

ZZ: 保存并退出
移动光标

1、逐字符移动
h:  向左
l:  向右
j:  向下
k:  向上

#h: 移动#个字符
2、按照单词移动
w:  移至下个单词的词首
e:  跳至当前或下一个单词的词尾
b:  跳至当前或前一个单词的词首

// 这些方法都可以和数字组合
#w: 移动#个单词
3、行内跳转
0: 绝对行首，第一个空白字符也算
^: 当前行的第一个非空白字符
$: 绝对行尾
4、行间跳转
#G: 跳至第#行
G:  最后一行

// 在末行模式下也可以跳转，直接给出行号
:6  第6行
翻屏

ctrl + f: 向下翻一屏
ctrl + b: 向上翻一屏

ctrl + d: 向下翻半屏
ctrl + u: 向上翻半屏
删除单个字符

x: 删除光标所在处的单个字符
#x: 删除光标所在和之后的#个字符
删除

d: 要和跳转命令组合使用，比如
dw  把单词后的空白字符也删除了
de  删除到单词末尾
d$
db
而且也可以#d跳转符

dd:  删除光标所在行
#dd: 删除包含当前行所在内的#行

末行模式下
startADD,endADDd
.: 当前行
$: 最后一行
+#: 向下的#行
删除的内容会保存在缓冲区（内存）中，可以撤销回去，最近一次的删除能用于粘贴。
粘贴命令 p

p: 如果删除或复制的是整行，则粘贴在光标所在行下方。如果是非整行，粘贴在光标所在字符的后面
P: 如果删除或复制的是整行，则粘贴在光标所在行上方。如果是非整行，粘贴在光标所在字符的前面
复制命令 y

用法同d命令
修改 c

删除内容，并转换为输入模式。c的用法和d一样。比如c$是先删除到末尾，再转成输入模式。
替换 r

r: 将光标所在字符替换
R: 直接进入替换模式
撤销编辑操作 u

undo
u: 连续u，可以连续撤销此前的n次操作
#u: 撤销最近#次编辑操作
还原最近的撤销操作： ctrl + r

重复前一次的编辑操作

. : 重复前一次编辑操作
可视化模式

有时，我们要删除的是一片内容。
v: 按字符选取
V: 按矩形选取
可以通过v$然后再上下选取，可以选取当前字符到行末尾。
查找

/PATTERN
?PATTERN

n 下一个，到末尾则倒回最开始查找
N 上一个
查找并替换

在末行模式下使用a命令
ADDR1,ADDR#s@PATTERN@string@gi
#是n个，表示从当前行到末尾
s表示替换
比如 :.,$-1s/he/HE/g b表示从当前行到末行替换将1个he替换成HE
这个命令不太懂。

```



## webstorm
# webstorm 使用

## 快捷键大全
```
⌘——Command
⌃ ——Control
⌥——alt
⇧——Shift
⇪——Caps Lock
fn——功能键就是fn

// 编辑

Command+alt+T 用 (if..else, try..catch, for, etc.)包住
Command+/ 注释/取消注释的行注释
Command+alt+/ 注释/取消注释与块注释
alt+↑ 向上选取代码块
alt+↓ 向下选取代码块
Command+alt+L 格式化代码
tab,shift+tab 调整缩进
Control+alt+I 快速调整缩进
Command+C 复制
Command+X 剪切
Command+V 粘贴
Command+shift+V 从剪贴板里选择粘贴
Command+D 复制代码副本
Command+delete 删除当前行
Control+Shift+J 清除缩进变成单行
shift+回车 快速换行
Command+回车 换行光标还在原先位置
Command+shift+U 大小写转换
Command+shift+[,Command+shift+] 文件选项卡快速切换
Command+加号,Command+减号 收缩代码块
Command+shift+加号，Command+shift+减号 收缩整个文档的代码块
Command+W 关闭当前文件选项卡
alt+单击 光标在多处定位
Control+shift+J 把下面行的缩进收上来
shift + F6 高级修改，可快速修改光标所在的标签、变量、函数等
alt+/ 代码补全

// 调试

Control+alt+R 运行项目
Command+Control+R 运行Debug
Command+F8 添加断点
Command+shift+F8 打开断点列表

// 导航

Command+O 跳转到某个类
Command+shift+O 跳转到某个文件
Command+alt+O 跳转到某个符号
Control+←,Control+→ 转到上/下一个编辑器选项卡
F12 打开之前打开的工具窗口（TODO、终端等）
Command+L 跳转行
Command+E 弹出最近文件
Command+alt+←,Command+alt+→ 向前向后导航到代码块交接处（一般是空行处）
Command+shift+delete 导航到上一个编辑位置的位置
Command+B 跳转到变量声明处
Control+J 获取变量相关信息（类型、注释等，注释是拿上一行的注释）
Command+Y 小浮窗显示变量声明时的行
Command+[,Command+] 光标现在的位置和之前的位置切换
Command+F12 文件结构弹出式菜单
alt+H 类的层次结构
F2,shift+F2 切换到上\下一个突出错误的位置
Command+↑ 跳转到导航栏
F3 添加书签
alt+F3 添加带助记的书签
alt+1,alt+2… 切换到相应助记的书签位置
Command+F3 打开书签列表
查找和替换

ctrl+f  本页查找
ctrl+r  本页替换
ctrl+shift+r 选择目录进行替换
VCS/本地历史记录

control+V 打开VST小浮窗

+提交项目

+T 更新项目

alt++打开最近修改列表

搜索和替换

+搜索

+替换

+查找下一个

++查找下一个

++按路径搜索

++按路径替换

选中文字的搜索

+F7 向声明的地方搜索并选中

++F7 打开搜索框进行搜索

+alt+F7 打开小浮窗显示搜索列表

对项目文件的操作（重构）

F5 复制文件到某个目录

F6 移动文件到某个目录

+安全删除

+F6 重命名

全局的

双击shift 弹出小浮窗搜索所有

+切换项目 ++ 反向切换项目

++整个工程的查找操作

+,+… 打开各种工具窗口

alt++把文件添加到收藏夹

alt++打开项目描述

alt+~ 快速切换当前计划

+, 设置编辑器

Control+选项卡和工具窗口之间进行切换

+回车 显示npm版本升级列表

ctrl+alt+l 代码格式化
删除
ctrl+y 删除当前行
代码编辑
shift+enter  重新开始一行
```

## 常见问题

**1、webstorm打开项目后不显示`node_modules`怎么办？**

1.首先到设置里面看 `Files Types` 下面是否将 `node_modules` 加入了忽略。
2.然后看是否将它设置成了excludes文件。左边栏 `project` 的设置有显示隐藏excludes文件的开关： `show excludes`。

**2. webstorm 左侧栏project一直是loading?**

退出重开时，看弹出的webstorm打开文件界面右下角设置那是否有警告的感叹号标志，点击禁用插件重启。之后再去重装插件。

**3. webstorm ftp的使用配置说明**

1、在菜单的Tools -> Deployment -> configuration 中设置ftp的信息，另外将Advanced options里的Passive mode勾上。
2、右键左侧目录，点击Deployment。下载远程的文件。
3、设置编辑 保存的时候自动上传更新文件。在 Tools -> Deployment -> options 里，将upload changed files automatically to the default server 设置成 On explicit save action。

webstorm svn的使用配置说明

1、在菜单的VCS -> Checkout from Version Control -> Subversion 添加一个svn地址： 比如 svn://bl@192.168.1.1:8080 然后输入账号密码连接。
2、连接上svn之后，就可以直接在菜单的VCS 里选择checkout 和import 的subversion进行下载和上传了。

常见问题
mac下webstorm vim模式键盘移动慢的解决方法

**webstorm 支持es6语法**
首先编写一个es6 js文件。然后，在所在目录增加一个package.json
```markup
{
  "name": "test-project",
  "version": "1.0.0"
}

// 然后
npm install --save-dev babel-cli
```
https://www.zhihu.com/question/43414079/answer/95642131



**在mac版本的webstorm ideavim的vim模式上下左右移动很慢。**

解决方法：修改苹果电脑 的  系统设置 -> 键盘里的  key repeat，把它调节到最快。



