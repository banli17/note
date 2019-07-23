---
        title: 无名
        ---
        # 常用API

## path

normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。

```
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'
```

join() 用于拼接路径。它会调用normalize() 尽量标准化。

```
path.join('usr', '../local', 'bin')
// 输出 /usr/bin/
```

resolve() 将相对路径转为绝对路径，默认是当前目录。

basename() 文件名

extname()  扩展名

dirname() 所在文件夹的路径

parse()  将path解析成对象

format() 将对象转为path

sep  路径的分隔符
delimiter  process.env.PATH 的分隔符
win32  windows下的 win32.sep  win32.delimiter
posix  linux下的


__dirname ,__filename总是返回文件的绝对路径
process.cwd()  总是返回node命令所在文件夹，node在哪执行的
path.resolve('./')  
./ 在require方法中总是相对当前文件所在的文件夹，在其它情况下，和process.cwd一样。

## Buffer

用于处理二进制数据流，实例类型整数数组，大小固定。c++ 代码在v8堆外分配物理内存

**静态方法**
alloc() 用于创建一个Buffer对象，默认是0填充，第一个参数是长度，第二个参数是用什么填充。

from([1,2,3]) 用数组来实例化Buffer
from('test') 用字符串来实例化Buffer
from('test','base64') 指定编码

byteLength('test') 看占多少字节
isBuffer() 看是否是Buffer对象
concat() 将 Buffer对象连接起来，参数是数组，每个元素是Buffer对象。

**实例方法**

length
toString()  将Buffer转字符串。默认是utf8，参数是编码
fill(start,length,str)  str会被转为16进制填充
equals()   判断内容是否一样
indexOf()
copy()

## EventEmitter

类要继承EventEmitter类。

on()
emit()
once()
removeListener('test',fn)
removeAllListener('test')

## fs
```
readFile
readFileSync
writeFile('./text', 'hello', {encoding:'utf8},err=>{
     if(err){}
     console.log('done')
})
writeFile('./text',buffer, err=>{
     if(err){}
     console.log('done')
})

fs.stat('./1.js', (err, stats)=>{
    // 获取文件的信息
})

fs.rename('./text', 'test.txt', err=>{})

fs.unlink()  删除

fs.readdir('../', (err,files)=>{})

fs.mkdir()
fs.rmdir()

fs.watch('./', )
fs.watchFile()
```


.gitignore

前面的/ 表示当前项目根目录
最后面的/ 表示一个目录
** 表示多级任意目录
! 表示排除
*表示任意字符串   *.log

.npmignore  没有npmignore会忽略gitignore里的文件

.editconfig

```
root = true  // 顶层

[*]
end_of_line = lf   (unix风格)
```




## http创建静态资源服务器

```

```
`npm i supervisor -g` 监听文件变化，自动重启服务器,然后通过supervisor运行js文件











- [Node.js 包教不包会](https://github.com/alsotang/node-lessons)












