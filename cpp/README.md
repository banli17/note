# C++

## C++ 历史

- B 语言 1969
- C 语言 1972
- C++ 语言 1983 (名称变化 new C -> C with Class -> C++)
    - C++98 (1.0)
    - C++03 (TR1, Technical Report 1)
    - C++11 (2.0)
    - C++14
- Java 语言
- C# 语言

## 头文件和类的声明

### 头文件

```cpp
// 只需要引入头文件，ide 会自动去找文件
#include <iostream> // 内置模块, 用 <>
#include "complex.h" // 自己写的模块，用""
```

输出

```cpp
cout << "i=" << "123";
```

c 基于 type, 是 data + function 创建的是变量
c++ 基于 class/struct 将成员数据和成员方法封装了，创造的是 objects。

基于对象: 考虑的是单个类
面向对象：是考虑多个类

关于类的设计
complex 有实部、虚部和加减乘除等方法。它的数据是 new 出来，里面就是保存的数据。
string 它的数据实际是指针，内容存放在另一个地方。

头文件的布局

```
// 头文件的防卫式声明guard
// 只会引入一次，不会重复引入
#ifndef __COMPLEX__
#define __COMPLEX__
// 前置声明
#include <cmath>

class ostream;
class complex;

complex&
    __doapl (complex* ths, const complex& r);
// 类声明
class complex 
{

}
// 类定义
complex::function
#endif
```