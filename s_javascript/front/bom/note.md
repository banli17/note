
- `text/javascript`: 默认值，老浏览器，但是js 不是 text类型。
- `application/javascript`: 新浏览器，ie8以下无法识别，后端处理的mime类型
- type 默认就是js可以省略

type如果不认识，浏览器就不会解析，但是个dom节点可以通过 text 读取。

html规范`<script>`标签默认的type属性为text/javascript，但又规定在不指定type=“text/javascript”时charset属性失效，使用文件给定的编码格式。因为指定字符集的前提是，必须先指定MIME，不指定的话，浏览器不会帮你默认设置。

```html
// 用于指定资源的 hash 签名，一旦不一致，浏览器会拒绝加载
integrity 值分成两个部分，第一部分指定哈希值的生成算法（目前支持 sha256、sha384 及 sha512），第二部分是经过 base64 编码的实际哈希值，两者之间通过一个短横（-）分割。
<script integrity="sha256-xxx=" >
<link integrity>
```

如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

加 void 防止文档被替换。

```js
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将<script>标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。

脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。

一种解决方法是设定document的DOMContentLoaded事件的回调函数。

另一种解决方法是，使用<script>标签的onload属性(在js加载执行完后执行)。当<script>标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以把所需执行的代码，放在这个事件的回调函数里面。

如果放底部，就不需要上面这样了。

解析和执行 CSS，也会产生阻塞。Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。

同时最多下载6～20个资源，即最多同时打开的 TCP 连接有限制，这是为了防止对服务器造成太大压力。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

defer 延迟脚本的执行等到 DOM 加载生成后，再执行脚本。

defer属性的运行流程如下。

浏览器开始解析 HTML 网页。
解析过程中，发现带有defer属性的<script>元素。
浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
有了defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完</html>标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置的或动态生成的script，defer不起作用，另外defer 脚本里不应使用 document.write

async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

浏览器开始解析 HTML 网页。
解析过程中，发现带有async属性的script标签。
浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
脚本执行完毕，浏览器恢复解析 HTML 网页。

async无法保证脚本执行顺序，先下载的先执行，也不应使用document.write

如果脚本没有依赖关系，用async。有依赖则用defer。如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。

动态脚本无法保证执行顺序，不会阻塞页面加载。

```js
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```

可以设置`async = false`避免这个问题。不过需要注意的是，后面加载的脚本文件，会因此都等待b.js执行完成后再执行。

```js
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
```

会根据页面本身的协议加载脚本

```js
<script src="//example.js"></script>
```

浏览器组成
- 渲染引擎: 主要作用是，将网页代码渲染为页面。
- js引擎

常见的渲染引擎

Firefox：Gecko 引擎
Safari：WebKit 引擎
Chrome：Blink 引擎
IE: Trident 引擎
Edge: EdgeHTML 引擎

渲染引擎的工作流程：
解析dom树，解析cssom
合并成render tree
计算渲染树布局layout
paint

重流和重绘
reflow  repaint  作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘table布局和flex布局，开销都会比较大。

优化技巧
- dom读取或写入写一起，不要混杂 
- 缓存dom信息
- 使用css class修改样式
- documentFragment
- 动画使用absolute fixed
- 只在必要时隐藏元素
- 使用 window.requestAnimationFragment()
- 虚拟DOM


下面是一个window.requestAnimationFrame()对比效果的例子。

```js
// 重绘代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = (currentHeight * 2) + 'px';
}

all_my_elements.forEach(doubleHeight);

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function () {
    element.style.height = (currentHeight * 2) + 'px';
  });
}

all_my_elements.forEach(doubleHeight);
```

上面的第一段代码，每读一次 DOM，就写入新的值，会造成不停的重排和重流。第二段代码把所有的写操作，都累积在一起，从而 DOM 代码变动的代价就最小化了。

js引擎：读取js代码并执行

解释型语言好处和坏处？
运行和修改方便，刷新页面就可以看到效果，缺点是每次都要调用解释器，开销较大。

为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。

常见的js虚拟机
Chakra (Microsoft Internet Explorer)
Nitro/JavaScript Core (Safari)
Carakan (Opera)
SpiderMonkey (Firefox)
V8 (Chrome, Chromium)


## history

- `history.length`
- `history.state`
- `history.back()`
- `history.forward()`
- `history.go(1)`、`history.go(-1)`、`history.go(0)`刷新、超出返回无效
- `history.pushState(state, title, url)`
- `history.replaceState(state, title, url)`
- `popstate`事什么时候触发? e.state。
只针对同一个文档，点浏览器前进、后退或 js back() forward() go()时触发，第一次打开页面不会触发。
- 实现一个路由系统




