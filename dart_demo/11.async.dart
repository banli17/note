/// 异步支持
///
/// Future
/// 处理 Future 的两种方式 1. async + await  2. Future API
///
/// 1. async await
/// 使用 try...catch 捕获异常
///
/// 处理流
/// 1. 使用 async 和 异步 for 循环 await for( x in a )
/// 2. Stream API
import 'dart:io';

Future<int> asyncFunction() async {
//  return 1;
}

void testFuture() async {
  int f = await asyncFunction();
  print(f);
}

void testStream() async {
  File file = File('./README.md');
  Stream inputStream = file.openRead();
  await for (var s in inputStream) {
    print(s);
  }
}

void main() {
  testFuture();
  testStream();
}
