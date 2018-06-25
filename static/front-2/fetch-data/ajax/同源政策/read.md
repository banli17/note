# 同源政策

- 协议、端口、域名相同则是同源

**限制**
- 本地数据无法获取：cookie、localStorage、indexedDB
- dom无法获取
- ajax请求无效，可以发送，但是浏览器拒绝响应


`document.domain`的用途？服务器怎么设置也可以达到效果？

这种方法只适合iframe下子窗口读取父窗口的cookie。
其它情况下读取不到cookie，比如父窗口window.onload后读取子窗口的cookie。或者是先访问a.a.com，再访问b.a.com

对于iframe或window.open获取子窗口dom，报错。可以设置document.domain解决

完全不同源通信：
- 片段识别符：就是通过父窗口改变子窗口的hash，然后子窗口监听到hash变化，拿到数据。同理子窗口也可以改变父窗口hash。
```
// a.com
<button class="btn">点击</button>
<iframe src="http://www.b.com/index.html"></iframe>
<script>
    document.querySelector('.btn').onclick = function(){
        document.querySelector('iframe').src += '#' + 'hello=1'
    }
</script>

// b.com
window.onhashchange = function(e){
	console.log('hash change', location.hash)
}
```
- 跨文档通信API
html5为了解决这个问题，引入了window.postMessage。允许跨窗口通信，不论这两个窗口是否同源。
postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送。
父窗口和子窗口都可以通过message事件，监听对方的消息。
event.source：发送消息的窗口
event.origin: 消息发向的网址，可以过滤不是发给本窗口的消息。
event.data: 消息内容
```
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);
```

- http://javascript.ruanyifeng.com/bom/same-origin.html
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [启用了 CORS 的图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
- [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)