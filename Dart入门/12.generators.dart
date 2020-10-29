/// Dart 内置生成器
/// 1. 同步生成器：返回一个 Iterable 对象， sync*
/// 2. 异步生成器：返回一个 Stream 对象, async*
///
///

// 同步生成器
Iterable<int> syncGenerator() sync* {
  int k = 0;
  while (k < 3) yield k++;
}

void testSyncGenerator() {
  var g = syncGenerator();
  print(g);
  print(g.length);
  print(g.first);  // 0
}

Stream<int> asyncGenerator() async* {
  int k = 0;
  while (k < 3) yield k;
}

void testAsyncGenerator() {
  Stream s = asyncGenerator();
  print(s); // Instance of '_ControllerStream<int>'
}

void main() {
  testSyncGenerator();
  testAsyncGenerator();
}
