//
// Created by banli on 02/12/2020.
//

#include "stl01.h"
#include <vector>
#include <list>
#include <algorithm>
#include <functional>
#include <iostream>

using namespace std;

namespace stl01 {

    stl01::stl01() {
        cout << "hello stl01" << endl;
    }

    void stl01::testRelative() {
        int ia[6] = {27, 210, 12, 47, 109, 83};
        vector<int, allocator<int>> vi(ia, ia + 6);

        // 不小于 200 的个数
        cout << count_if(vi.begin(), vi.end(),
////                         binder2nd<less<int>>
                         not1(bind2nd(less<int>(), 200)));
    }

    void stl01::testList() {
        list<string> c = {"a", "b", "d"};
        list<string>::iterator ite;
        ite = ::find(c.begin(), c.end(), "d");  // 查找
        cout << ite->data() << endl;
    }
}
