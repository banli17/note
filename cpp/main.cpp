#include "iostream"
#include "fstream"
#include "vector"
#include "Complex.h"

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

int testPoint5() {
    cout << "hello testPoint5" << endl;
    char *p3 = "123456";
//    p3 = 'hi';      不能修改
    //  *p3 = 'hello'; 不能修改
    cout << p3 << endl;   // 123456
    cout << *p3 << endl;  // 1
    return 0;
}

int testIf() {
    int a = 3 && 0;
    // 3 && 1 // 0
//    3 && 0 // 0
    cout << a << endl;

//    if (1 % 0) {
// 1%0 is0
    cout << "10%0 is" << 10 % 0 << endl;  // remainder by zero is undefined
//    }
    cout << "hi" << endl;

    typedef enum __COLOR {
        RED = 3,
        GREEN,
        BLUE,
        UNKOWN
    } color;  // 定义一个结构体叫 color

    color color0;
    color0 = GREEN;
    if (color0 == BLUE) {
        cout << "蓝色" << endl;
    } else {
        // 非蓝色 4
        cout << "非蓝色" << color0 << endl;
    }

    switch (color0) {
        case GREEN:
            cout << "绿色" << endl;
            break; // 如果不加 break，满足条件后，后面的条件不符合也会指向
        case RED:
            cout << "红色" << endl;
            //break;
        case BLUE:
            cout << "蓝色" << endl;
            //break;
        default:
            cout << "其它" << endl;
            break;
    }

    return 0;

}

int testMemory() {
    int b = 1;          // (stack)栈区变量
    char s[] = "abc";   // (stack)栈区变量
    int *p2 = NULL;     // (stack)栈区变量
    char *p3 = "123456";// 123456\0 在常量区(不能修改)，p3 在(stack)栈区
    static int c = 0;   // (GVAR)全局(静态)初始化区
    int *p1 = new int(10);   // (heap)堆区变量，new 会分配到堆，可以用 delete 释放
    p2 = new int(20);   // (heap)堆区变量
    char *p4 = new char[7];  // (stack)栈区变量
//    strcpy_s(p4, 7, "123456") // (text)代码区
    return 0;                 // (text)代码区
}

int testStruct() {
    union Score {
        double ds;  // 8
        char level; // 1
    };
    struct Student {
//        char name[6];  // 6
        int age;     // 4
        int x;
        double a;
        Score s;     // 8
    };
    double a;
    cout << sizeof(a) << endl;  // 8
    cout << sizeof(Score) << endl;   // 8
    cout << sizeof(Student) << endl; // 24 = 3*8
    return 0;
}

int testWhile() {
    // 求 1 + ... + 100 的和
    // for 循环
    int num = 1;
    int max = 100;
    int sum = 0;
    for (; num <= max; num++) {
        sum += num;
    }
    cout << sum << endl;  // 5050

    // while 循环
    int num1 = 1;
    int max1 = 100;
    int sum1 = 0;
    while (num1 <= max1) {
        sum1 += num1;
        num1++;
    }
    cout << sum1 << endl;

    int num2 = 1;
    int max2 = 100;
    int sum2 = 0;
    do {
        sum2 += num2;
        num2++;
    } while (num2 <= max2);
    cout << sum2 << endl;
    return 0;
}

int testClass() {
    Complex a(1, 2);
    Complex b(2, 3);
    Complex c;
    c = a + b;  // 这里C++会默认帮忙生成一个 = 的运算符重载

    Complex d(c);

    c++;
    ++c;
    cout << c << endl;
    Complex i;
    cin >> i;
    cout << i << endl;
    return 0;
}

int testCache() {
    int a;
    int index = 0;
    // 如果输入float 1.1，回车时程序 float 转 int 转换会异常退出
    // 如果输入的个数小于 5 个，则程序会执行完后直接退出
    while (cin >> a) {
        cout << "the number is " << a << endl;
        index++;
        if (index == 5) {
            break;
        }
    }
    //cin.ignore(numeric_limits<streamsize>::max(), '\n');
    char ch;
    cin >> ch;
    cout << "the last number is " << ch << endl;
    return 0;
}

int testFstream() {
    int a;
    int index = 0;
    fstream fout;
    fout.open("../fstream.txt");
    // 或者 if(!fout)
    if (fout.fail()) {
        cout << "open file faild " << endl;
    }
    while (cin >> a) {
        fout << "the number is " << a << endl;
        index++;
        if (index == 5) {
            break;
        }
    }
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    char ch;
    cin >> ch;
    fout << "the last number is " << ch << endl;
    return 0;
}

// 指针函数，返回一个指针
char *testPointFn() {
    char *str = "hello";
    return str;
}

int add(int x, int y) {
    return x + y;
}

int testFnPoint(int x, int y, int (*p)(int, int)) {
    cout << "testFnPoint 计算 x+y 的值为" << p(x, y) << endl;
    return 0;
}

namespace my {
    int add(int x, int y) {
        cout << "这是命名空间 my 下的 add";
        return x + y;
    }
}

static const int bufferLen = 2048;

bool testCopyFile(const string &src, const string &dst) {
    ifstream in(src.c_str(), std::ios::in | std::ios::binary);
    ofstream out(dst.c_str(), std::ios::out | std::ios::binary);

    if (!in || !out) {
        return false;
    }

    char temp[bufferLen];
    while (!in.eof()) {
        in.read(temp, bufferLen);
        streamsize count = in.gcount(); // 实际读取了多少，比如最后一点，可能不足 bufferLen
        out.write(temp, count);
    }

    in.close();
    out.close();
    return true;
}

int main() {
    int a = -10;
    cout << a << endl;
    cout << "main hello world" << endl;
    //testArray();
    //testVector();
    //testPoint();
    //testPoint2();
    //testPoint3();
    //testPointConst();
//    testPoint5();
//    testIf();
//    cout << testPointFn() << endl;
//    testFnPoint(1, 2, add);
//    cout << add(10, 20) << endl;
//    cout << my::add(10, 20) << endl;
//    testMemory();
//    testStruct();
//    testWhile();
    // testClass();

    cout << testCopyFile("../point.drawio", "../point2.drawio") << endl;
//    testCache();
//    testFstream();
}

// -10 -> 10000000 00000000 00000000 00001010
// 反 -> 11111111 11111111 11111111 11110101
//  补+1 -> 11111111 11111111 11111111 11110110
//            ff        ff      ff        f6
