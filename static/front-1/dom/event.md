# 事件

## EventTarget接口

所有节点和需要事件通信的内置对象(XMLHttpRequest等) 部署了这个接口。

该接口的三个主要方法：

- addEventListener(type, listener[, useCapture]) userCapture表示时候在捕获阶段触发
- removeEventListener

- dispatchEvent