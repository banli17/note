# path 模块

## 常用方法

- basename() 获取路径中的基础名称
- dirname() 获取路径中目录名称
- extname() 获取路径中扩展名称
- isAbsolute()
- join() 拼接多个路径片段
- resolve() 返回绝对路径
- parse() 解析路径
- format() 序列化路径, 和 parse 相反
- normalize() 规范化路径

## join 和 resolve 的区别

- resolve 返回绝对路径，而且会以 / 作为起点
- join 只是单纯拼接路径，不会以 / 作为起点
