# history

history表示浏览器的历史记录。

```
length 访问记录的长度
go()   可以跳转到某个历史记录，history.go(0)刷新页面
forward()   相当于history.go(1)
back()      相当于history.go(-1)，通常是从浏览器缓存中加载
```

除了上面的方法之外，h5又新增了 `pushState` 和 `replaceState()`方法，它们主要用来实现现在的单页应用。

**pushState()和replaceState()**

pushState() 可以推入一个history记录，用来修改当前页面的地址。

```
history.pushState(state, title, url)
```

- 目前所有浏览器都是忽略参数title，填null即可。
- 它只会让地址栏改变，不会刷新页面。
- 如果pushState 的url参数设置了一个新的锚点，不会触发hashChange事件，如果是跨域网址，则会报错。

> 这个方法在安卓下没有问题。ios版本微信的链接按照首次进入的链接来算，pushState无效。这个是一个坑，注意一下

需要注意的是调用 `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()）

https://developer.mozilla.org/zh-CN/docs/Web/API/History_API

location.hash = 'xx' 设置的时候，会触发popstate事件。

## popstate事件

`popstate` 事件只会针对同一文档，不同的文档的跳转不会触发。

`popstate` 事件函数的 `event.state` 就是 `pushState` 的 `state`，也可以通过 `history.state` 获取。

页面第一次加载时，load 事件后，webkit浏览器会触发popstate事件，而firefox和ie不会。实际测试时没有触发。

## URLSearchParams API

URLSearchParams API用来处理查询字符串。没有这个API的浏览器可以用 [url-search-params](https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js) 垫片。

```javascript
var a = 'name=zhangsan&age=12'
var oa = new URLSearchParams(a)
console.log(oa.get('name'))  // 'zhangsan'
```

- has()
- get() 返回指定参数的第一个值
- getAll() 返回一个数组，成员是指定参数的所有值
- set()  设置指定参数
- delete() 删除指定参数
- append() 在查询字符串中，追加一个键值对
- toString() 返回整个查询字符串

遍历所有参数
- keys()
- values()
- entries()

```
var searchParams = new URLSearchParams('key1=value1&key2=value2');

for (var key of searchParams.keys()) {
  console.log(key);
}
// key1
// key2

for (var value of searchParams.values()) {
  console.log(value);
}
// value1
// value2

for (var pair of searchParams.entries()) {
  console.log(pair[0]+ ', '+ pair[1]);
}
// key1, value1
// key2, value2
```

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of

在Chrome浏览器之中，URLSearchParams实例本身就是Iterator对象，与entries方法返回值相同。所以，可以写成下面的样子。

```
for (var p of searchParams) {
  console.log(p);
}
```


下面是一个替换当前URL的例子。

```
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set('version', 2.0);

window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

`URLSearchParams`实例可以当作POST数据发送，所有数据都会URL编码。

```
let params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

DOM的a元素节点的 `searchParams` 属性，就是一个 `URLSearchParams` 实例。

```
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```

`URLSearchParams` 还可以与URL接口结合使用。

```
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```


