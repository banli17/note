#include "iostream"
#include "vector"

using namespace std;  // 如果找不到的变量或方法，会在命名空间下查找

int testArray() {
    int arr[10] = {1, 2, 3, 4, 5, 6, 7, 8};  // 没有初始值的元素，默认会是0
    for (int index = 0; index < 11; index++) {  // 越界后不会报错，但是数据会是 任意值 1962868883
        cout << arr[index] << endl;
    }

    int arr2[4][5] = {{1},
                      {2}};

//    string arrs[1] = {"ello"};
//    cout << "arrs 的长度是" << sizeof(arrs) << endl; // 24
//    cout << "arrs 的长度是" << sizeof(arrs[0]) << endl; // 10

    // 占用 40 个字节
    cout << "arr 的字节数是: " << sizeof(arr) << endl;
    cout << "arr 数组的长度：" << sizeof(arr) / sizeof(arr[0]) << endl;
    return 0;
}

int testVector() {
    cout << "-----testVector------" << endl;
    vector<int> v1 = {1, 2, 3};
    v1.push_back(10);
    // capacity 是容量，size是元素个数
    cout << "v1 size 是：" << v1.size() << endl;
    cout << "v1 capacity 是：" << v1.capacity() << endl;
    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i] << endl;
    }

    v1.insert(--v1.end(), 9);
    v1.insert(v1.begin() + 1, 0);

    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i] << endl;
    }

    v1.erase(v1.end() - 1);

    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i] << endl;
    }
    return 0;
}

int testPoint() {
    int a = 10;
    float b = 3.14f;
    int *c = &a;
    float *d = &b;
    cout << c << endl;
    cout << d << endl;
    cout << *c << endl;
    cout << *d << endl;
    *c = 4;  // 通过指针修改变量的值
    cout << *c << endl;
    cout << a << endl;

    int *e = c;
    cout << *e << endl;
    return 0;
}

int testPoint2() {
    char a[] = {"helloworld"};
    const char *p = "helloworld";
    cout << "a is : " << a << endl;    // helloworld
    cout << "&a is : " << &a << endl;    // helloworld
    // strHelloWorld = {"nihao"};  数组变量的值不可修改
    cout << "p is : " << p << endl;    // helloworld
    cout << "p is : " << *p << endl;   // h
    cout << "&p is : " << &p << endl;  // g
    p = "ghxx";
    cout << "p is : " << p << endl;    // ghxx
    cout << "*p is : " << *p << endl;  // g
    cout << "&p is : " << &p << endl;  // g
    // p[2] = "z";  // 变量值不能被修改，只读的
    cout << sizeof(a) << endl;    // 11 分配的是数组
    cout << sizeof(p) << endl;  // 8，取决于平台，是指针变量(字符串)，分配的是一字符串文本，存储的是文本的地址
    return 0;
}

int testPoint3() {
    double c[4] = {0x80000000, 0xFFFFFFFF, 0x00000000, 0x7FFFFFFF};
    double *a[4];
    double (*b)[4];
    b = &c;  // 这里数组个数需要匹配

    cout << a << endl;  // 0x7ffee962d4a0
    cout << sizeof(a) << endl;  // 32位 4个字节
    cout << sizeof(c) / sizeof(c[0]) << endl;

    for (unsigned int i = 0; i < sizeof(c) / sizeof(c[0]); i++) {
        a[i] = &c[i];
    }
    cout << 0x80000000 << endl;  // 2147483648
    cout << *(a[0]) << endl;  // 2.14748e+09
    cout << (*b)[3] << endl;  // 2.14748e+09
    return 0;
}


int testPointConst() {
    char str[] = {"hello"};
    char const *pStr1 = "hello";  // 修饰的值
    char *const pStr2 = str;  // 修饰的指针
    char const *const pStr3 = "hello";

    pStr1 = str;
//    pStr2 = str;
//    pStr3 = str;
    int size = sizeof(str) / sizeof(str[0]);
    cout << size << endl;
    for (unsigned int i = 0; i < size - 1; i++) {
//        pStr1[i] += 1;
        pStr2[i] += 1;
        cout << pStr2[i] << endl;
//        pStr3[i] += 1;
    }
    cout << pStr2 << endl;
    return 0;
}

int main() {
    int a = -10;
    cout << a << endl;
    cout << "main hello world" << endl;
    //testArray();
    //testVector();
    //testPoint();
    //testPoint2();
//    testPoint3();
    testPointConst();
}

// -10 -> 10000000 00000000 00000000 00001010
// 反 -> 11111111 11111111 11111111 11110101
//  补+1 -> 11111111 11111111 11111111 11110110
//            ff        ff      ff        f6
