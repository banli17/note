# Dart

强类型语言、静态语言

```
vim ~/.bash_profile
PATH=${PATH}:/Users/banli/Documents/flutter/bin/cache/dart-sdk/bin/
source ~/.bash_profile
```

特点

-   JIT: 即时编译，开发期间，更快编译，更快的重载
-   AOT: 事前编译，release 期间会 AOT ，更快更流畅

## 数据类型

-   数字
    -   num
    -   int
    -   double
-   字符串 String

```dart
void _numType(){
    num num1 = -1.0;       // 数字的父类，可以是 double 和 int
    num num2 = 2;
    int int1 = 3;          // 只能是整数
    double d1 = 1.68;      // 双精度
    print("num:$num1 num:$num2 int:$int1 double:$d1");
    print(num1.abs());      // 求绝对值
    print(num1.toInt());    // 转换成 int
    print(num1.toDouble()); // 转换成 double
}

_stringType(){
    String str1 = '字符串', str2="双引号";  // 字符串的定义
    String str3='str:$str1 str2:$str2';   // 字符串拼接
    String str4='str1:' + str1 + ' str2:' + str2;  // 字符串拼接
    String str5='hello';
    print(str3);
    print(str4);
    // 常见方法
    print(str5.substring(1, 5));
    print(str5.indexOf('类型'));
    // startsWith, replaceAll, contains, split 等
}

// 布尔类型， Dart 是强 bool 类型检查，只有 bool 类型的值是 true 才是 true
_boolType(){
    bool success = true, fail = false;
    print(success);
    print(fail);
    print(success || fail);
    print(success && fail);
}
```

Future 是 dart:sync 里的

- then 和捕获异常
- async await
- future.whenComplete 结束时的回调，类似 finally
- future.timeout

```
testFuture().then((s){

}, onError:(e){

}).catchError((e){
})

DateTime.now()
Future.delayed(Duration(seconds: 2)).timeout(Duration(seconds: 8)).then
Future.value()
```

FutureBuilder(future: future,builder: null)


