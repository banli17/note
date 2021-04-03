---
title: 文件操作
---

## php 文件操作

- filetype(\$filename):文件类型
- filesize():返回字节
- filectime():创建时间，时间戳
- filemtime():修改时间
- fileatime(): 最后访问时间

```php
date('Y/m/d H:i:s', filemtime($filename))
```

检测文件权限

- is_readable(): 可读
- is_writable()/is_writeable(): 可写
- is_executable(): 可执行

- is_file(): 检测是否是一个文件，并且文件存在

文件路径相关信息

- pathinfo(\$filename,option ) :返回文件路径信息数组

```
pathinfo('./1.txt');
pathinfo('./1.txt', PATHINFO_EXTENSION);  // txt
```

- basename()
- dirname()
- file_exists()

文件操作，成功返回 true，失败返回 false。

- touch() 新建
- unlink(): 删除指定文件
-

```php
if(file_exists($filename)){
    if(unlink($filename)){
        echo "file unlink success";
    }else{
        echo "file unlink error"
    }
}
```

- rename($filename, $newname):重命名或剪切文件
- copy($filename, $dest): 拷贝文件。拷贝远程文件需要开启`allow_url_fopen`。
