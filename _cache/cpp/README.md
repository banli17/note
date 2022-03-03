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

```cpp
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

## class template

模版类。相当于是可以给类传递数据类型 type 参数。

```cpp
template<typename T>
class complex
{
public:
    complex (T r = 0, T i = 0)
        : re(r), im(i)
    { }
private:
    T re, im;  // 之前是 float re, im;
};

{
    complex<double> c1(2.5, 1);
    complex<int> c2(2, 1);
}
```

## inline 函数

函数如果在 class 内定义，则会建议编译器将它作为 inline, 效率高些。

但是编译器不一定会将它作为 inline。

## 访问级别

- public
- private 只有 class 内才能看到，数据都要是私有的，通过方法来管理控制
- protected

## 构造函数

创建对象时，会自动调用构造函数。

```cpp
complex(double r = 0, double i = 0)
    // 构造函数的特殊语法：初值列，初始化
    : re (r), im (i)   
{ } // 赋值阶段 { re = r; im = i} 效率低
```

- 可以有默认参数
- 没有返回值类型，因为构造函数是来创建这种对象的，所以不必写
- 设置值分为初始化和赋值，`: re(r)`就是默认的初始化阶段，如果放在后面大括号`{}`里，相当于在初始化阶段不做事，后面再做，就浪费了初始化阶段，效率会低些。

构造函数可以有多个，可以以多种方式创建对象，即重载 overloading。
同名调用谁？

```cpp
complex (double r = 0, double i = 0) 
    : re(r), im(i) 
{ }
complex () : re(0), im(0) {}
```
最终编译器会将重载的函数编译为不同的两个函数，形如 ?complex@Complex@@hash，即后面带上不同的 hash 值。

不过上面的两个函数，编译器会报错，因为如果以下面方式调用:

```cpp
complex c;  
complex c();
```

由于第一个构造函数有默认值，所以也可以这样调用，编译器不知道调用哪个函数，就会报错。

构造函数放在 private 区域里，外部是不能调用的。通常用来实现单例。

```cpp
class A {
public:
    static A& getInstance();
    setup() {...}
private:
    A();
    A(const A& rhs)
}

A& A::getInstance()
{
    static A a;
    return a;
}

// 外部使用
{
    A::getInstance().setup()
}
```

## 常量成员函数

const member functions 在函数后面加 const，表示函数内不会改变数据。

```
double real () const { return re; }
double imag () const { return im; }
```

如果函数内不改变数据，就加 const。

如果不加 const，而使用者使用下面方式调用。

```
const complex c1(2, 1);
cout << c1.real();  // 报错
```

因为使用者不希望 c1 改变，而 real() 没有加 const，表示内部可能改变值。所以编译器报错。

## 参数传递

- pass by value: 整个数据传递过去，可能很大传递速度慢，所以尽量不要
- pass by reference(to const): 4个字节，快，如果修改了，原数据会变化。不希望修改可以用 const 

## 返回值传递

- return by value
- return by reference(to const)

临时变量不能返回 reference ，因为函数执行完成后，临时变量销毁，返回 reference，就获取不到了。

## friend(友元)

相当于设置函数为类的朋友。

函数内部可以直接获取 friend 中定义的数据。

相同 class 的各个实例 objects 互为 friends。


