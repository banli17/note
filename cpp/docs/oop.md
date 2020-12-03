# C++ 面向对象

## 关于基于对象和面向对象

- Object Based(基于对象): 面向的是单一 class 的设计
- Object Oriented(面向对象): 面向的是多重 classes 的设计，处理 classes 和 classes 之间的关系。

Classes 有 2 个经典分类：

- 类里成员都不带指针 Class without pointer member(s)
  - 如 complex
- 类里有成员带指针 Class with pointer member(s)
  - 如 string

## Header 中的防卫式声明

为了防止 include 重复引入，必须在头文件里加入防卫式声明，例如。

**complex.h**

```
#ifndef __COMPLEX__
#define __COMPLEX__

...

#endif
```

上面代码中 `__COMPLEX__` 名字是自定义的。注意不要和其它头文件里的名字重复了。

## class 的声明

```cpp
class complex{

public:
    complex(double r = 0, double i = 0)
        : re(r), im(i)
    {}
    complex& operator += {const complex&};
    double real() const {return re;}
    double imag() const {return im;}
private:
    double re, im;

    friend complex& __doapl(complex*, const complex&);
}

// 使用
{
    complex c1(2, 1);
    complex c2;
}
```

因为上面的 re, im 还可能是其它类型如 int 等，所以可以使用模版(class template)。

```cpp
template<typename T>
class complex{
    ...
private:
    T re, im;
}

// 使用
{
    complex<double> c1(2.5, 1.5);
    complex<int> c2(2, 6);
}
```

### inline 内联函数

上面的函数 `real()` 和 `imag()` 由于比较短，可以直接在 `.h` 文件中书写，这叫做内联(inline)函数。也可以在 `.cpp` 里使用 inline 关键字定义。

```cpp
inline double imag(const complex& x){
    return x.imag()
}
```

C++ 编译器有可能(具体行为要看编译器实现)将 inline 函数当内联处理，即直接编译到每个调用者的内部。这样可能会加速调用栈的执行，因为无需再创建销毁 inline 的函数栈。
