 # tcp协议

## 学习资料

- [(传输层) TCP协议](http://www.cnblogs.com/kzloser/articles/2582957.html)
- [TCP协议详解](https://www.jianshu.com/p/ef892323e68f)
- [阮一峰 TCP协议简介](http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html)

## 三次握手

http是应用层协议，只有发包、收包的概念。发包和收包之间需要创建传输层的Tcp连接将它们连起来。

在一个tcp连接上可以发送多个http请求。http 1.0是发送完就断开的。http2是长连接，也就是后面的连接不需要再三次握手。

三次握手的目的是让客户端和服务端都知道对方有发包和收包的能力。过程是：

![三次握手](./imgs/shake-hands.png)

- SYN：表示同步序号，用来建立连接。
- Seq：数据包本身的序列号
- ACK：确认序号是否有效，如果ack
- ack：期望对方继续发送的那个数据包的序列号

第一次握手：建立连接时，客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认；

第二次握手：服务器收到syn包，必须确认客户的syn（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

完成三次握手，客户端与服务器开始传送数据，在上述过程中，还有一些重要的概念：

未连接队列：在三次握手协议中，服务器维护一个未连接队列，该队列为每个客户端的SYN包（syn=j）开设一个条目，该条目表明服务器已收到SYN包，并向客户发出确认，正在等待客户的确认包。这些条目所标识的连接在服务器处于Syn_RECV状态，当服务器收到客户的确认包时，删除该条目，服务器进入ESTABLISHED状态。

SYN-ACK 重传次数：服务器发送完SYN－ACK包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传，如果重传次数超过系统规定的最大重传次数，系统将该连接信息从半连接队列中删除。注意，每次重传等待的时间不一定相同。

半连接存活时间：是指半连接队列的条目存活的最长时间，也即服务从收到SYN包到确认这个报文无效的最长时间，该时间值是所有重传请求包的最长等待时间总和。有时我们也称半连接存活时间为Timeout时间、SYN_RECV存活时间。

### TCP两种攻击技术：

TCP 会话劫持和SYN FLOOD（同步洪流）

**同步洪流**

当客户端和服务器在网络中使用TCP协议发起会话时，在服务器内存中会开辟一小块缓冲区来处理会话过程中消息的“握手”交换。会话建立数据包包含一个SYN片段，用于标识消息交换中的序列号。而SYN FLOOD试图摧毁这一过程。攻击者快速发送一连串连接请求，之后并不响应服务器发送回来的应答，造成三次握手无法完成，在服务器上留下半打开的连接，分配给他们的缓存也被保留下来，使其他程序不能使用服务器。尽管缓冲区中的数据包在没有应答超过一段时间（通常3min）就会被丢弃，但大量虚假请求的后果是用于建立会话的合法请求难以建立。

## 缓存

与缓存相关的字段

cache-control: max-age=20 优先级高于expires  相对时间
expires:    绝对时间，格林尼治时间
last-modified: 文件最后修改时间
Etag

if-modified-since: 文件最后修改的时间
if-None-Match
浏览器缓存的逻辑流程

## DNS

如何通过域名找IP


- [http协议](http://www.cnblogs.com/TankXiao/category/415412.html)
- [前端代码异常日志收集与监控](http://www.cnblogs.com/hustskyking/p/fe-monitor.html)
- [白话 HTTPS & SSL/TLS](https://www.jianshu.com/p/992bad24412e)
- [http2讲解](https://ye11ow.gitbooks.io/http2-explained/content/)
