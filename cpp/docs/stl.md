# C++ 标准库 体系结构与内核分析

> 具体练习代码在`stl0x.h`，`stl0x.cpp`。

- C++ 标准库：`C++ Standard Library`
- 标准库模版库 STL ：`Standard Template Library`

标准库以头文件(header files)方式引入：

```
// 新版
#include <string>
#include <iostream>

// error 不能带 .h 否则报错
#include <iostream>

// ok 旧版可以带 .h
#include <iostream.h>
```

- 新版 headers 不能带 .h，旧版可以带。
- 新版 headers 内的组件都封装在`namespace "std"`里。如`using namespace std;`或`using std::cout;`(引入单个)。
- 旧版 headers 内的组件不封装在`namespace "std"`里。

学习资料：

- cplusplus.com
- cppreference.com
- gcc.gnu.org
- 书籍<<stl 源码解析>>

## STL 六大部件

- 容器(Container)
- 分配器(Allocators)
- 算法(Algorithms)
- 迭代器(Iterators)
- 适配器(Adapters)
  - 容器适配器
  - 迭代器适配器
  - 仿函数适配器
- 仿函数(Functors)

容器需要分配器进行内存分配，算法用来操作容器，操作容器需要迭代器。

大多数容器都有首尾两个指针：`*(c.begin())`、`*(c.end())`。它们分别指向第一个元素和最后一个元素的下一个元素。 即左闭右开 `[)` 区间。

迭代语法如下:

```c++
Container<T> c;
...
Container<T>::iterator ite = c.begin();
for(; ite != c.end(); ++ite){ ... }
```

c++11 的新语法如下：

```c++
for(int i : {2, 3, 4}){
    cout << i << endl;
}

std::vector<double> vec;
...
for (auto elem : vec){
    cout << elem << endl;  // 会拷贝每个元素到 elem
}
for (auto &elem : vec){
    elem *= 3;   // 直接操作引用
}
```

auto 关键字

```cpp
void testList() {
    list<string> c = {"a", "b", "d"};
    list<string>::iterator ite;
    ite = ::find(c.begin(), c.end(), "d");  // 查找
    cout << ite->data() << endl;
}
```

## 容器

- 线性
  - `Array`: 固定大小，不能扩容
  - `Vector`: 只能从后面扩容
  - `Deque`: 可以前后方向扩容
  - `List`: 双向环链表
  - `Forward-List` 链表
- 非线性
  - `Set`: 只有值，且值不能重复
  - `Multiset`: 值可以重复
  - `Map`: 有 key 和 value
  - `MultiMap`: key 不能重复
