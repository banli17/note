//
// Created by banli on 03/12/2020.
//

#ifndef LEETCODE_L392_H
#define LEETCODE_L392_H

#include <iostream>
#include <string>

using namespace std;
namespace L392 {
    bool isSubsequence(string &str1, string &str2) {
        int index = 0;
        int p1 = 0;
        int p2 = 0;
        int msize = str1.size();
        int size = str2.size();
        while (p2 < size) {
            if (str1[p1] == str2[p2]) {
                if (index == msize - 1) {
                    return true;
                }
                index++;
                p1++;
                p2++;
            } else {
                p2++;
            }
        }
        return false;
    }

    int run() {
        string str1 = "hello";
        string str2 = "he";
        string str3 = "hlo";
        string str4 = "hxo";
        string str5 = "hx";
        string str6 = "hello";
        string str7 = "helloo";
        cout << str2 << " is subsequence of " << str1 << ": " << isSubsequence(str2, str1) << endl;
        cout << str3 << " is subsequence of " << str1 << ": " << isSubsequence(str3, str1) << endl;
        cout << str4 << " is subsequence of " << str1 << ": " << isSubsequence(str4, str1) << endl;
        cout << str5 << " is subsequence of " << str1 << ": " << isSubsequence(str5, str1) << endl;
        cout << str6 << " is subsequence of " << str1 << ": " << isSubsequence(str6, str1) << endl;
        cout << str7 << " is subsequence of " << str1 << ": " << isSubsequence(str7, str1) << endl;
    }
}


#endif
