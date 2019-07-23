---
title: "服务端推送的实现方案"
date: 2019-02-10 09:02:14
tags:
toc: true
---

服务器推送的实现方案：

1. http2
1. websocket
1. EventSource

## websocket


## EventSource

EventSource 接口用于接收服务器发送的事件。它通过http连接到一个服务器，以`text/event-stream`格式接收事件，不关闭连接。

EventSource的api如下：

- onerror
- onmessage
- onopen：连接刚打开时调用
- readyState：连接状态，可能是0(connecting)，1(open)，2(closed)
- url：源头的url
- close()：用于关闭连接

### EventSource使用步骤

1. 监听服务端事件

```
var evtSource = new EventSource('ssedemo.php')
evtSource.onmessage = function(e){
    var newElement = document.createElement("li");
      
    newElement.innerHTML = "message: " + e.data;
    eventList.appendChild(newElement);
}
```

监听到服务端的事件后，触发`message`事件，`e.data`是服务端发送的数据。也可以使用addEventListener监听其它类型的事件：

```
evtSource.addEventListener("ping", function(e) {
  var newElement = document.createElement("li");
  
  var obj = JSON.parse(e.data);
  newElement.innerHTML = "ping at " + obj.time;
  eventList.appendChild(newElement);
}, false);
```
上面的代码，只有服务器事件是ping时，才会触发。

2. 服务端发送事件流

服务器端发送的响应内容应该使用值为"text/event-stream"的MIME类型。

```
// php例子
date_default_timezone_set("America/New_York");
header("Content-Type: text/event-stream\n\n");

$counter = rand(1, 10);
while (1) {
  // Every second, sent a "ping" event.
  
  echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";
  
  // Send a simple message at random intervals.
  
  $counter--;
  
  if (!$counter) {
    echo 'data: This is a message at time ' . $curDate . "\n\n";
    $counter = rand(1, 10);
  }
  
  ob_flush();
  flush();
  sleep(1);
}
```

上面的2步，就可以实现服务端推送了。


### 事件流的格式

要注意的是事件流的格式，是一个简单的文本数据流,文本应该使用UTF- 8格式的编码.每条消息后面都由一个空行作为分隔符.以冒号开头的行为注释行,会被忽略。

注释行可以用来防止连接超时,服务器可以定期发送一条消息注释行,以保持连接不断。

字段：
- event: 如果服务端发的事件名，客户端没有addEventListener，则会触发message事件，否则触发对应的事件。
- data: 消息的数据字段，如果该条消息包含多个data字段，则客户端会使用换行符拼接成一个字符串。
- id: 事件id
- retry：一个整数值。重新连接的时间，单位是毫秒。如果不是整数，则会被忽略。

除了上面四个字段，其它字段都会被忽略。

下面是事件流格式的三个例子。

1. 下面的例子中发送了三条消息,第一条仅仅是个注释,因为它以冒号开头.第二条消息只包含了一个data字段,值为"some text".第三条消息包含的两个data字段会被解析成为一个字段,值为"another message\nwith two lines".其中每两条消息之间是以一个空行为分割符的.

```
: this is a test stream

data: some text

data: another message
data: with two lines
```

2. 命名事件

```
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
```

3. 混合两种事件

```
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

data: Here's a system message of some kind that will get used
data: to accomplish some task.

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
```

## 参考资料

- [使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)