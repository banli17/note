# Web storage和cookie

## 预习

- http://javascript.ruanyifeng.com/bom/webstorage.html

## 总结
1、localStorage和sessionStorage的区别？

- localStorage是永久存储，sessionStorage是窗口关闭时数据清空。
- 同时打开2个同域窗口，一个窗口设置的sessionStorage不影响另一个窗口的sessionStorage，而一个窗口设置的localStorage会影响另一个窗口的localStorage。


2、localStorage在各个浏览器中的储存大小，以及在firefox里的限制，同域限制？

Chrome是2.5MB，Firefox和Opera是5MB，IE是10MB。其中，Firefox的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在Firefox中，a.example.com和b.example.com共享5MB的存储空间。另外，与Cookie一样，它们也受同域限制。

3、设置、读取、删除、清空的方法？

```javascript
// 设置
localStorage.setItem(key, value)
localStorage[key] = value

// 读取
localStorage.getItem(key)
localStorage[key]

// 删除某个字段
localStorage.removeItem(key)
delete localStorage[key]

// 清空
localStorage.clear()
```


4、如何遍历localStorage对象？

通过其length属性和key()方法。

```javascript
for(let i=0;i<localStorage.length;i++){
    console.log(localStorage.key(i))
}
```

5、storage事件的使用方法和注意事项？event对象的关键属性？

- event.key
- event.oldValue
- event.newValue
- event.url：storage改变的那个文档的url
- event.storageArea：被影响的storage对象

## 深入：web storage规范解读

- 原文：https://html.spec.whatwg.org/multipage/webstorage.html

web storage规范引入了2种和cookie相似的机制，用于客户端存储键值对数据。

1. sessionStorage，是为单个事务设计，可以在不同窗口执行多个事务。也就是说每个窗口的sessionStorage是独立的、互不影响。cookie就不能这样，它是同域公用的，一个窗口可以读取另一个窗口的cookie。

实例是用户打开2个窗口买票，如果用cookie可能会买2张相同的票。而使用sessionStorage只需要：

```html
<label>
 <input type="checkbox" onchange="sessionStorage.insurance = checked ? 'true' : ''">
  I want insurance on this trip.
</label>

if (sessionStorage.insurance) { ... }
```

因为每个窗口都有一个单独的sessionStorage，所以直接判断就行。

2. localStorage是为跨多窗口存储设计的，并且持续时间不只是当前会话，而且出于性能考虑，允许存储大容量数据，比如用户编写的文档。

同样，cookie不能很好处理这些问题。因为它们会随每次请求一起传输。

Storage接口

```javascript
[Exposed=Window]
interface Storage {
  readonly attribute unsigned long length;
  DOMString? key(unsigned long index);
  getter DOMString? getItem(DOMString key);
  setter void setItem(DOMString key, DOMString value);
  deleter void removeItem(DOMString key);
  void clear();
};
```

每个Storage对象都提供对键值对列表的访问，key可以是任意字符串，包括空字符串。值也是字符串。

- storage.length
- storage.key(n)：返回列表中第n个键的名称。n如果超出，则返回null
- value = storage.getItem(key) 或 value = storage[key]。没有则返回null
- storage.setItem(key, value) 或 storage[key] = value。如果用户禁止存储或超出大小限制，则设置可能错误，抛出DOMException异常。
- storage.removeItem(key) 或 delete storage[key]
- storage.clear() 

StorageEvent接口

```
[Exposed=Window,
 Constructor(DOMString type, optional StorageEventInit eventInitDict)]
interface StorageEvent : Event {
  readonly attribute DOMString? key;
  readonly attribute DOMString? oldValue;
  readonly attribute DOMString? newValue;
  readonly attribute USVString url;
  readonly attribute Storage? storageArea;
};

dictionary StorageEventInit : EventInit {
  DOMString? key = null;
  DOMString? oldValue = null;
  DOMString? newValue = null;
  USVString url = "";
  Storage? storageArea = null;
};
```

空间大小：建议5M，防止三级域名共享数据。

安全性
- dns欺骗攻击，不能保证是该域的主机，网页最好使用TLS，TLS可以确保只有用户、代表用户的软件及其他使用TLS的页面（同一个域的证书）可以访问器存储区域。
- 跨目录攻击，比如多人共享目录，xxx.com/a， xxx.com/b，应避免使用storage
- 浏览器必须要实现同源策略
- 小心第三方脚本的读取也写入






