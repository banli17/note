# Chrome调试工具

## 学习资料

- [Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)

打开快捷键Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)

## console API

**打印类**

- console.log()  可以带样式打印，比如`console.log('%chello world', 'color:red')`，也可以打印多个值，用逗号分隔
- console.info() 
- console.warn() 
- console.error() 
- console.debug()
- console.group() 
- console.groupEnd() 
- console.dir() 以js对象形式打印，log是以dom树形式打印
- console.table()  以表格形式打印，`data = [{},{}]`形式。
- console.assert()
- console.count()

```
function count(){
    console.count('函数执行的次数是')
}
```
- `console.time()` 和 `console.timeEnd()`
- `console.profile()` 和 `console.profileEnd()` 查看CPU相关信息
- `console.timeLine()` 和 `console.timeLineEnd()` 记录时间轴
- `console.trance()` 调用此方法的位置输出一个堆叠追踪。
- $ ， $_表最近一次表达式执行结果， $0-$4表示最近选择的DOM节点
- $() 表示 `document.querySelector()`
- $$() 表示 `document.querySelectorAll()`
- copy() 可以粘贴数据到剪贴板，比如 `copy(obj)`
- keys(obj) 和 values(obj)
- monitor(fn) 和 unmonitor(fn)， 用于监听函数的执行和取消监听
- debug(fn) 和 undebug(fn)  用于打断点，现在控制台 `debug(fn)`，再执行 `fn()`


















































## 参考资料
- [chrome 控制台不完全指南](http://www.cnblogs.com/Wayou/p/chrome-console-tips-and-tricks.html)
- [Console API 参考](https://developers.google.com/web/tools/chrome-devtools/console/console-reference?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3#consolelogobject-object)
- [Profiles，深度性能优化必备](https://www.jianshu.com/p/504bde348956)
- [Network，网络加载分析利器](https://www.jianshu.com/p/471950517b07)
- [Timeline，快捷性能优化工具](https://www.jianshu.com/p/b8cdcd9bfad8)
- [如何使用 Timeline 工具](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
- [chrome调试工具官网](https://developer.chrome.com/devtools)
- [Chrome 开发者工具中文文档](http://www.css88.com/doc/chrome-devtools/)