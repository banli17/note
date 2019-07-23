---
        title: 无名
        ---
        # 网络 net

## net.createServer()

用于创建一个TCP或IPC服务。

```
net.createServer([option][,connectionListener])
```

- option ：是一个对象
    - allowHalfOpen：是否允许TCP半连接，默认是false
    - pauseOnConnect：在有连接进来时，socket是否暂停，默认是false
- connectionListener：自动监听connection事件的函数

```
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```