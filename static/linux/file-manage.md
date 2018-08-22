# 文件和目录管理

## 相对目录和绝对目录

## 目录的相关操作

```
.  表示当前目录
.. 表示上一级目录
-  表示前一个目录
~  表示当前用户的家目录
~acount 表示用户 account 的家目录
```

根目录下也有`.`和`..`目录，通过`ls -al`可以看到根目录的上层目录是它自己。

```
- cd 是 change Directory 的缩写。
- pwd 显示当前所在目录
    - P 不以连结档的数据显示
- mkdir 创建新目录
    - m 配置文件的权限
    - p 递归创建目录
- rmdir 只能删除空目录，目录里不能有其它目录或文件，若果要删除目录内所有东西，`rm -r test`。
    - p 递归删除空目录
```

**环境变量$PATH**

`echo $PATH` 打印环境变量目录，目录间用 : 隔开。

```
# 添加环境变量

# 1 立即生效，关闭终端时恢复
PATH="$PATH":/root

# 2 重新打开终端生效，一直有效。对当前用户
vim ~/.bashrc
export PATH=/usr/local/mongodb/bin:$PATH

# 让修改立即生效
source ~/.bashrc

# 3 系统重启后生效，对所有用户有效
vim /etc/profile
export PATH=/usr/local/mongodb/bin:$PATH

# 4 和 3 一样
vim /etc/environment
```


## ls

```bash
ls [-aAdfFhilnrRSt] 目录名称
ls [--color={never,auto,always}] 目录名称
ls [--full-time] 目录名称

-a 全部文件，包括隐藏文件(开头是.的文件)
-A 全部文件，包括隐藏文件，不包括 . 和 .. 目录
-d 仅列出目录本身，不列出文件
-f 直接列出结果，而不排序，ls默认以文件名排序
-F 顺便列出附加数据，如*表示可运行文件，/表示目录，=表示socket文件，|表示FIFO文件
-h 将文件容量以可读方式列出，如kb，mb
-l 长数据串列出，包含文件属性和权限等
-n 列出UID和GID，而不是使用者名称
-r 反序列出
-R 连同子目录一起列出，即所有文件都列出
-S 以文件容量排序
-t 以时间排序
--color=never 不显示颜色
--color=always 显示颜色
--color=auto
--full-time  以完整时间(年月日时分)输出
--time={atime, ctime} 输出access时间或改变权限时间ctime。而非内容变更时间modification time。
```



## cp复制文件或目录

```
cp [-adfilprsu] 来源 目标
cp [options] source1 source2 source3 ... 目录

-a 相当于 -pdr
-d 若文件为连结档属性Link file，则复制连接档属性
-f 强制，如果目标已存在且无法开启，则移除后再尝试
-i
```

<div class="alert alert-success">复制的目录是相对于当前命令操作目录的。</div>

**参数**

```bash
# 将文件复制到目录中
cp 1.txt ./a/

# 将目录a复制到目录b中，注意a后面没有/
cp -r ./a  ./b/

# 将目录a中的所有文件复制到目录b中
cp -r ./a/ ./b/
```




## zip

- `-r`：递归处理

```bash
# 压缩文件并加密
zip -P 123456 -r yoga_vpn.zip yoga_vpn_4.0.111.apk
```

