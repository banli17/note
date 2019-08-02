---
title: linux文件和目录操作
sidebar_label: 文件&目录操作
---



### pwd

pwd 命令用于显示当前用户所处的工作目录。

### cd

cd 命令用于切换工作目录。

- `-`：返回上一次所处目录。
- `~`: 返回当前用户的家目录。
- `..`: 返回上级目录。
- `~username`：进入其它用户的家目录。

### ls

ls 命令用于显示目录的文件信息。

- `a`: 表示全部文件（包括隐藏文件）。
- `l`: 表示查看文件的属性、大小等信息。
- `d`: 查看目录的权限和属性。

```bash
# 查看当前目录的文件
ls -al

# 查看目录的属性和权限
ls -ld /etc
```

### cat

cat 命令用于查看纯文本(内容较少的)。

- `n`：显示行号。

```bash
cat -n initial-setup-ks.cfg
```

### more

more 命令用于查看纯文本文件(内容较多的)。会提示进度，可以用空格键或回车键向下翻页。

### head

head 命令用于查看纯文本的前 N 行。

```
# 查看前20行
head -n 20 init-setup-ks.cfg
```

### tail

tail 命令用于查看文本文档的后 N 行或持续刷新内容(如实时日志)。

- `f`: 查看最新的内容

```
tail -f /var/log/messages
```

### tr

tr 命令用于替换文本文件的字符。格式为`tr [原始字符] [目标字符]`。

```bash
# 读取待处理文本，通过管道符传递给tr替换
# 将字母替换成大写
cat anaconda-ks.cfg | tr [a-z] [A-Z]
```

### wc

wc 命令用于统计指定文本的行数、字数、字节数，格式为`wc [参数] 文本`。

- `l`: 只显示行数。
- `w`: 只显示单词数。
- `c`: 只显示字节数。

`/etc/passwd`用于保存系统账户信息，要统计用户数，可以使用下面命令。

```
wc -l /etc/passwd
```

### stat

stat 命令用于查看文件的具体存储信息和时间等信息。格式为`stat 文件名`。

### cut 

cut 命令用于按列提取文本字符。

- `f`: 列数。
- `d`: 设置间隔符号。

```bash
# 提取行
head -n 2 /etc/passwd

# 提取列，提取用户名
cut -d: -f1 /etc/passwd
```

## awk

awk 用于处理文本，它依次处理文件每一行，并读取每一个字段。格式为`awk 条件 动作 文件名`。参数如下：

- `F`: 指定分隔符

**变量**

- `$数字`: 第几个字段。
- `NF`: 当前行有多少个字段。
- `$NF`: 最后一个字段。
- `$(NF-1)`: 倒数第二个字段。
- `NR`：当前处理的第几行。
- `FILENAME`: 当前文件名。
- `FS`: 字段分隔符，默认空格和制表符。
- `RS`: 行分割符，用于分割每一行，默认是换行符。
- `OFS`: 输出字段的分隔符，用于打印时分隔字段，默认为空格。
- `ORS`: 输出记录的分隔符，用于打印时分割记录，默认为换行符。
- `OFMT`: 数字输出的格式，默认是%.6g

**函数**

- `tolower()`
- `length`: 字符串长度
- `substr()`
- `sin()`
- `cos()`
- `sqrt()`
- `rand()`: 随机数

具体查看[手册](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)




```bash
# print是打印命令，$0表示当前行,$1,$2...表示字段
echo 'this is a test' | awk '{print $0}'

# demo.txt是要处理的文件
awk -F ',' '{print $1}' demo.txt

# 条件，只输出带usr的
awk -F ':' '/usr/ {print $1}' demo.txt
# 输出奇数行
awk -F ':' 'NR % 2 == 1 {print $1}' demo.txt
# 输出第三行以后的行
awk -F ':' 'NR >3 {print $1}' demo.txt

# if语句
awk -F ':' '{if ($1 > "m") print $1; else print "---"}' demo.txt
```

### diff

diff 用于比较多个文本文件的差异，格式为`diff [参数] 文件`。

- `brief`: 确认两个文件是否不同。
- `c`: 比较差异。

```
diff --brief a.txt b.txt
diff -c a.txt b.txt
```

### touch

touch 命令用于创建空白文件或设置文件的时间，格式为`touch [选项] [文件]`。

- `a`: 设置文件的读取时间(atime)。
- `m`: 设置文件的修改时间(mtime)。
- `d`: 设置文件的atime和mtime。

```bash
# 修改文件后，将文件的时间改成修改之前的时间
ls -l a.txt
echo 2 >> a.txt
ls -l a.txt

# 修改时间
touch -d '2019-04-05 16:34' a.txt
ls -l a.txt
```

### mkdir

mkdir 命令用于创建空白的目录，格式为`mkdir [选项] 目录`。

- `p`: 递归创建嵌套目录。

```
mkdir -p a/b/c
```

### cp

cp 命令用于复制文件或目录，格式为`cp [选项] 源文件 目标文件`。复制有3种情况：

- 如果目标文件是目录，则会把源文件复制到该目录中。
- 如果目标文件是普通文件，则会询问是否覆盖。
- 如果目标文件不存在，则执行正常的复制操作。

参数列表：

- `p`: 保留原始文件的属性。
- `d`: 若对象为链接文件，则保留其属性。
- `r`: 递归复制(用于目录)。
- `i`: 若目标文件存在，则询问是否覆盖。
- `a`: 相当于 -pdr。

```
cp a.txt a_copy.txt
```

### mv

mv 命令用于剪切文件或重命名文件，格式为`mv [选项] 源文件 [目标路径|目标文件名]`。若在同一目录剪切，则是重命名操作。

```
mv a.txt c.txt
```

### rm 

rm 命令用于删除文件或目录，格式为`mv [选项] 文件`。

- `f`: 系统默认会询问是否删除，可以加-f强制删除，不询问。
- `r`: 删除目录。

### dd

dd 命令用于按照指定大小和个数的数据块来复制文件或转换文件，格式为`dd [参数]`。linux系统中有个设备文件`/dev/zero`，不占用系统存储空间，却可以提供无穷无尽的数据，可以用它做为 dd 命令的输入文件，来生成指定大小的文件。

- `if`: 输入的文件名称。
- `of`: 输出的文件名称。
- `bs`: 设置每个块的大小。
- `count`: 设置要复制块的个数。

```
# 从/dev/zero取出一个560MB的数据块，然后保存成名为560_file的文件
dd if=/dev/zero/ of=560_file count=1 bs=560M

# 将linux刻录到光盘镜像
dd if=/dev/cdrom of=RHEL-server-7.0-x86_64-linux.iso
```

### file

file 命令用于查看文件的类型，格式为`file 文件名`。linux中，一切都是文件，不能单凭后缀知道文件类型，所以需要使用file命令。

```
[root@localhost ~]# file package-lock.json
package-lock.json: ASCII text
```

### tar

tar 命令用于对文件进行压缩或解压，格式为`tar [选项] [文件]`。linux常用的格式为.tar或.tar.gz或.tar.bz2格式。

- `c`: 创建压缩文件。
- `x`: 解开压缩文件。
- `t`: 查看压缩包内有哪些文件。
- `z`: 用 Gzip 压缩或解压。
- `j`: 用 bzip2 压缩或解压。
- `v`: 显示压缩或解压的过程。
- `f`: 目标文件名。需要放在参数的最后一位。
- `p`: 保留原始的权限与属性。
- `P`: 使用绝对路径来压缩。
- `C`: 指定解压到的目录。

```
# 压缩/etc目录到文件etc.tar.gz
tar -czvf etc.tar.gz /etc

# 解压etc.tar.gz文件到/root/etc目录
tar -xzvf etc.tar.gz -C /root/etc
```

### grep

grep 命令用于在文本中执行关键词搜索，并显示匹配的结果，格式为`grep [选项] [文件]`。

- `b`: 将可执行文件(binary)当作文本文件(text)搜索。
- `c`: 仅显示找到的行数。
- `i`: 忽略大小写。
- `n`: 显示行号。
- `v`: 反向选择，即列出没有关键词的行。

linux系统中，`/etc/passwd`文件保存着所有用户的信息，一旦用户的终端登陆被设置为`/sbin/nologin`，将不再允许登陆。可以用grep来搜索不允许登陆的用户的信息。

```bash
grep /sbin/nologin /etc/passwd
```

### find

find 命令用于按照指定条件来查找文件，格式为`find [查找路径] 寻找条件 操作`。寻找条件可以是文件名、大小、修改时间、权限等信息。

- `name`: 匹配名称。
- `perm`: 匹配权限。
- `user`: 匹配所有者。
- `group`: 匹配所有组。
- `mtime -n +n`: 匹配修改内容的时间，-n表示n天内，+n表示n天以前。
- `atime -n +n`: 匹配访问文件的时间，-n表示n天内，+n表示n天以前。
- `ctime -n +n`: 匹配修改文件权限的时间，-n表示n天内，+n表示n天以前。
- `nouser`: 匹配无所有者的文件。
- `nogroup`: 匹配无所有组的文件。
- `newer f1 !f2`: 匹配比文件f1新但比f2旧的文件。
- `--type b/d/c/p/l/f`: 匹配文件类型(后面的字母参数依次是块设备、目录、字符设备、管道、链接文件、文本文件)。
- `size`: 匹配文件的大小，+50KB为查找超过50KB的文件，-50KB表示小于50KB。
- `prune`: 忽略某个目录。
- `exec ... {} \`: 后面可跟用于进一步处理搜索结果的命令。
- `o` 或者

根据文件系统层次标准(Filesystem Hierarchy Standard)协议，Linux系统中的配置文件会保存到`/etc`目录。如果要获取所有以host开头的文件列表，可以执行如下命令：

```bash
# 搜索文件名以host开头的文件
find /etc -name "host*" -print

# 搜索权限中包含SUID权限的文件
find / -perm -4000 -print

# 找出归banli用户的文件并复制到/home目录
find / -user banli -exec cp -a {} /home \

# 查找当前目录的yarn.lock文件，忽略node_modules目录
find . -path  "./node_modules" -prune -o -type f -name 'yarn.lock' -print
```

在 RHEL 7 系统及众多的 Linux 系统中，最常使用的 Shell 终端是Bash(Bourne-Again SHell)解释器。

## 学习资料

- linux就该这样学
- [awk 入门教程](http://www.ruanyifeng.com/blog/2018/11/awk.html)
- [mail配置](https://www.cnblogs.com/findyou/p/5760970.html)

