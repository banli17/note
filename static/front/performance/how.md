## performance对象

### performance.memory

`performance.memory` 可以获取浏览器的内存情况，这个属性是非标准的，只有chrome浏览器有。它有三个属性分别是：

- `usedJSHeapSize` 表示所有被使用的js堆栈内存
- `totalJSHeapSize` 表示当前js堆栈内存总大小
- `jsHeapSizeLimit` 表示内存大小限制

`usedJSHeapSize`不能大于`totalJSHeapSize`，如果大于则可能出现内存泄露的情况。