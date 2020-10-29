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

}

int main() {
    int a = -10;
    cout << a << endl;
    cout << "hello world";
    testArray();
    testVector();
}

// -10 -> 10000000 00000000 00000000 00001010
// 反 -> 11111111 11111111 11111111 11110101
//  补+1 -> 11111111 11111111 11111111 11110110
//            ff        ff      ff        f6
