//
// Created by banli on 21/11/2020.
//

#include "Complex.h"

Complex::Complex() {
    _real = 0.0;
    _image = 0.0;
    cout << "Complex::Complex()" << endl;
}

Complex::Complex(const Complex &x) {
    cout << "拷贝构造函数 Complex::Complex" << endl;
}

Complex::Complex(double r, double i) {
    _real = r;
    _image = i;
    cout << "Complex::Complex(double r, double i)" << endl;
}


Complex::~Complex() {
    cout << "Complex::~Complex()" << endl;
}

void Complex::SetReal(double d) {
    _real = d;
}

// 拷贝构造，参数做对象传递时，会拷贝一份
Complex Complex::operator+(const Complex &x) {
    // 临时对象，这里已经不会产生拷贝构造了
//    Complex tmp;
//    tmp._real = _real + x._real;
//    tmp._image = _image + x._image;
//    cout << "tmp 地址是" << &tmp << endl;  // 0x7ffeed0a3480
//    return tmp;

//  避免临时对象的产生
    return Complex(_real + x._real, _image + x._image);
}

// 这里参数 系统会自动调用默认的一个拷贝构造，复制一个副本x
Complex &Complex::operator=(const Complex &x) {
    cout << "x 地址是" << &x << endl; // 0x7ffeed0a3480
    if (this != &x) {
        _real = x._real;
        _image = x._image;
    }
    return *this;  // this 是当前对象本身
}

// ++a
Complex &Complex::operator++() {
    _real++;
    _image++;
    return *this;
}

// a++
Complex Complex::operator++(int) {
//    Complex tmp(*this); // 拷贝一个对象
//    _real++;
//    _image++;
//    return tmp;
    return Complex(_real++, _image++);
}

ostream &operator<<(ostream &os, const Complex &x) {
    os << "重载运算符实部" << x._real << " 虚部" << x._image << endl;
    return os;
}

istream &operator>>(istream &is, Complex &x) {
    is >> x._real >> x._image;
    return is;
}

bool Complex::operator==(const Complex &x) {
    return (_real == x._real) && (_image == x._image);
}
