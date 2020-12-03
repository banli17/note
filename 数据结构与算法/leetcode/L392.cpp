#include <iostream>
#include <string>
using namespace std;

bool isSubsequence(char str1, char str2)
{
    // cout << str1 << endl;
    // int sizeStr1 = sizeof(str1) / sizeof(str1[0]);
    // int sizeStr2 = sizeof(str2) / sizeof(str2[0]);
    // cout << sizeStr1 << endl;

    // int flag = 0;
    // int str1Index = 0;
    // int str2Index = 0;
    // while (str2Index <= sizeStr2)
    // {
    //     if (str2[str2Index] == str1[str1Index])
    //     {
    //         flag++;
    //         str1Index++;
    //         str2Index++;
    //     }
    //     else
    //     {
    //         str2Index++;
    //     }
    // }
}

int main()
{
    char str1[] = {"hello"};
    char str2[] = "he";
    char *str3 = "hello";
    char str4[6] = {"hello"};
    char str5[] = {'h', '\0'};
    int *p = new int ;
    cout << sizeof(str1) << endl;
    cout << sizeof(str2) << endl;
    cout << sizeof(str3) << endl;
    cout << sizeof(str4) << endl;
    cout << strlen(str5) << endl;
    cout << sizeof(str5) << endl;   // 6
    cout << sizeof(str3) << endl;   // 8   64位系统里指针是8个字节
    cout << sizeof(p) << endl;
    //isSubsequence(str1, str2);
    return 0;
}
