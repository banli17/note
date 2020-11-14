/// import 和 library 指令可以用来创建模块， _开头的标识符只能在库内使用，每一个 dart app 都是一个库，即使它没有用 library 指令
///
/// 使用库，import URI。
/// - 内置库，使用 import 'dart:xx'
/// - pub.dev 的库，使用 import 'package:xx..'
/// - 文件系统路径
///
/// 指定库的前缀：解决冲突，如果 lib1 和 lib2 都有 Element 类
/// import 'package:lib1/lib1.dart'
/// import 'package:lib2/lib2.dart' as lib2;
/// el1 = Element()
/// el2 = lib2.Element()
///
/// 只导入库的一部分
/// import 'package:lib1/lib1.dart' show foo;  只导入 foo
/// import 'package:lib1/lib1.dart' hide foo;  排除 foo
///
/// 延迟加载，仅 dart2js 支持，flutter，dartvm 不支持(暂时先忽略，网页还是 js)
/// 1. 减少 web 应用的加载时间
/// 2. 执行 A/B 测试
/// 3. 加载不常用的功能
/// import 'package:greetings/hello.dart' deferred as hello;
/// Future greet() async{
///   await hello.loadLibrary();
///   hello.printGreeting()
/// }
///
/// 如何创建包  https://dart.dev/guides/libraries/create-library-packages
/// 1. 如何组织资源文件
/// 2. export
/// 3.  part
/// 4. library
/// 5. import export 适配多个平台
///
///