//
// Created by banli on 21/11/2020.
//

#ifndef CPP_COMPLEX_H
#define CPP_COMPLEX_H

#include "iostream"  // "" 和 <iostream> 区别

using namespace std;

class Complex {
public:
    Complex();  // C++ 会默认创建这个构造函数，但是如果自己写了，就不会创建了
    Complex(double r, double i);  // 构造函数
    Complex(const Complex &x);

    virtual ~Complex();  // 虚析构函数

    // 简单的方法可以写在 .h 里面
    double GetReal() const { return _real; }

    void SetReal(double d);

    double GetImage() const { return _image; }

    void SetImage(double d) { _image = d; }

    // 运算符重载, 这里参数为引用，避免额外再拷贝而占用空间
    Complex operator+(const Complex &x);

    Complex &operator=(const Complex &x);

    Complex &operator++();  // 前置 ++ 返回引用、无int

    Complex operator++(int);  //后置 ++ 返回对象，有 int

    Complex &operator+=(const Complex &x);

    bool operator==(const Complex &x);

// protected:
    friend ostream &operator<<(ostream &os, const Complex &x);

    // 没有 const ,因为需要修改 x
    friend istream &operator>>(istream &is, Complex &x);

private:
    double _real;   // 复数的实部分
    double _image;   // 复数的虚部分
};


#endif //CPP_COMPLEX_H
