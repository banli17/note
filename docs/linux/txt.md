# 文本操作篇

正则表达式的匹配方式: 从左到右匹配

## 元字符

```
. 除换行符外的任意单个字符
* 匹配前面的子表达式零次或多次
[]
^
$
\
+
?
|
```

grep 文本查找命令，从文件里查找文字

```sh
# 安装操作系统的过程会记录到 anaconda-ks.cfg 中去

[root@banli ~]# grep password /root/anaconda-ks.cfg
# Root password
[root@banli ~]# grep pass.... /root/anaconda-ks.cfg
auth --enableshadow --passalgo=sha512
# Root password
[root@banli ~]# grep pass....$ /root/anaconda-ks.cfg
# Root password
```

find 查找文件

```
# 根据名称查找
[root@banli ~]# find /etc -name pass*

# 根据正则查找
[root@banli ~]# find /etc -regex .*wd
[root@banli ~]# find . -regex .*\.txt
```

vim 和 sed、AWK 的区别：

-   交互式与非交互式
-   文本操作模式与行操作模式

sed 的模式空间
sed 的基本工作方式是：

-   将文件以行为单位读取到内存(模式空间)
-   使用 sed 的每个脚本对该行进行操作
-   处理完成后输出该行

sed 的替换命令 s:

-   sed 's/lod/new/' filename
-   sed -e 's/old/new/' -e 's/old/new/' filename ... 多个处理
-   sed -i 's/old/new/' 's/old/new/' filename 将替换结果写回文件

带正则表达式的替换命令 s:

-   sed 's/正则表达式/new/' filename
-   sed -r 's/扩展正则表达式/new/' filename
