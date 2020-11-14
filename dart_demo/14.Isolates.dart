/// 计算机是多核的，并发共享内存线程，容易出错，和代码复杂
/// 所有 Dart 代码都是在 isolates 内部运行，而不是线程，每个隔离区都有独立的，有自己的内存，
/// https://medium.com/dartlang/dart-asynchronous-programming-isolates-and-event-loops-bffc3e296a6a
///
import 'dart:mirrors';
