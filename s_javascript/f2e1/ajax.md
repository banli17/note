---
title: 网络请求
---

## Android

### 从服务器获取数据

1. 实例化一个 URL 对象
2. 获取 HttpURLConnection 对象
3. 设置请求连接属性
4. 获取响应码，判断连接结果码
5. 读取输入流并解析

---

## title: axios

## 例子：发送一个 GET 请求

```javascript
const axios = require("axios");

axios
  .get("/user?id=123")
  .then((res) => {
    // 成功
    console.log("res", res);
  })
  .catch((err) => {
    // 处理错误
    console.log(err);
  })
  .then(() => {
    // 总是执行
  });

// 也可以像下面这样
axios.get("/user", {
  params: {
    id: 123,
  },
});

// 使用async
async () => {
  try {
    const res = await axios.get("/user?id=123");
  } catch (e) {
    console.log(e);
  }
};
```

## 例子：发送 POST 请求

```javascript
axios.post("/user", {
  firstName: "zs",
});
```

**处理多个请求**

```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

## axios API

```javascript
axios({
  method: "post",
  url: "/user",
  data: {
    firstName: "zs",
  },
});

axios({
  method: "get",
  url: "/user?id=123",
  responseType: "stream",
});

// get请求，默认是get
axios("/user/12345");
```

## 请求方法别名

- axios.request()
- axios.get()
- axios.delete()
- axios.head()
- axios.options()
- axios.post()
- axios.put()
- axios.patch()

- axios.all(iterable)
- axios.spread(callback)

- axios.create([config])：创建一个 axios 实例

```
constconst  instanceinstance  ==  axiosaxios..createcreate({
  baseURL({   baseURL::  ''https://some-domain.com/api/https://some-domain.co ',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

## 实例方法

axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])

## 参数

```
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 响应内容

```
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

## 默认配置

修改全局配置

```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

自定义实例默认配置

```
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

配置优先顺序

config > 默认实例配置 > lib/defaults.js 配置

```
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
  timeout: 5000
});
```

## 拦截器

可以使用 then 或 catch 拦截响应。

```
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

移除拦截器

```
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

给自定义实例添加拦截器

```
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 处理错误

```
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

可以自定义 HTTP 状态码来判断是否错误

```
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
})
```

## 取消请求

可以使用取消 token 来取消请求。

```
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

也可以通过 CancelToke 构造函数。

```
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

可以使用同一个 cancel token 取消多个请求。

## 使用 application/x-www-form-urlencoded

默认 axios 序列化 js 对象为 JSON。如果需要`application/x-www-form-urlencoded`格式。需要像下面一样。

**在浏览器**

```javascript
const params = new URLSearchParams();
params.append("name", "zs");
params.append("age", "12");
axios.post("/foo", params);
```

[URLSearchParams 不适合所有浏览器](http://www.caniuse.com/#feat=urlsearchparams)，但是有[polyfill](https://github.com/WebReflection/url-search-params)。

也可以用 qs。

```
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或 es6 方式。

```
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

**在 Node.js**

```
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

在之前做网页就是使用的 jquery 或 zepto 里的 ajax 方法。不过现在貌似都用的 fetch 了，而且 react-native 也是用的 fetch 接口，必须熟悉才行，不然可能遇到很多坑。
要使用 fetch，需要首先检查客户端支不支持它。
if(self.fetch){
// fetch
}else{
// ajax
}
上面如果 self.fetch 如果存在，则可以使用。如果不存在，则用传统的 ajax 方法。
发 fetch 请求

fetch 方法接收 2 个参数，如下。
url: 第一个参数是 url 地址。
opts: 第二个参数是一个配置对象
fetch 方法的返回值是一个包含 response 对象的 promise。如果成功，执行 then 里面的回调，如果失败，则执行 catch 回调。
fetch('http://www.xxx.com/1.jpg',
{
method: 'GET',
headers: new Headers(),
mode: 'cors',
cache: 'default'
}
)
.then(function(response){
return response.blob()
})
.then(function(myBlob)){
var objectUrl = URL.createObjectURL(myBlob)
}
.catch(function(error){
console.log(error.message)
})
上面的代码，我获取了一张 jpg 文件，然后返回了一个包含 response 的 Promise 对象。
2、自定义请求的参数
fetch 的第二个参数是一个请求配置对象。

参考文章
https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

服务器推送的实现方案：

1. http2
1. websocket
1. EventSource

## websocket

## EventSource

EventSource 接口用于接收服务器发送的事件。它通过 http 连接到一个服务器，以`text/event-stream`格式接收事件，不关闭连接。

EventSource 的 api 如下：

- onerror
- onmessage
- onopen：连接刚打开时调用
- readyState：连接状态，可能是 0(connecting)，1(open)，2(closed)
- url：源头的 url
- close()：用于关闭连接

### EventSource 使用步骤

1. 监听服务端事件

```
var evtSource = new EventSource('ssedemo.php')
evtSource.onmessage = function(e){
    var newElement = document.createElement("li");

    newElement.innerHTML = "message: " + e.data;
    eventList.appendChild(newElement);
}
```

监听到服务端的事件后，触发`message`事件，`e.data`是服务端发送的数据。也可以使用 addEventListener 监听其它类型的事件：

```
evtSource.addEventListener("ping", function(e) {
  var newElement = document.createElement("li");

  var obj = JSON.parse(e.data);
  newElement.innerHTML = "ping at " + obj.time;
  eventList.appendChild(newElement);
}, false);
```

上面的代码，只有服务器事件是 ping 时，才会触发。

2. 服务端发送事件流

服务器端发送的响应内容应该使用值为"text/event-stream"的 MIME 类型。

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

上面的 2 步，就可以实现服务端推送了。

### 事件流的格式

要注意的是事件流的格式，是一个简单的文本数据流,文本应该使用 UTF- 8 格式的编码.每条消息后面都由一个空行作为分隔符.以冒号开头的行为注释行,会被忽略。

注释行可以用来防止连接超时,服务器可以定期发送一条消息注释行,以保持连接不断。

字段：

- event: 如果服务端发的事件名，客户端没有 addEventListener，则会触发 message 事件，否则触发对应的事件。
- data: 消息的数据字段，如果该条消息包含多个 data 字段，则客户端会使用换行符拼接成一个字符串。
- id: 事件 id
- retry：一个整数值。重新连接的时间，单位是毫秒。如果不是整数，则会被忽略。

除了上面四个字段，其它字段都会被忽略。

下面是事件流格式的三个例子。

1. 下面的例子中发送了三条消息,第一条仅仅是个注释,因为它以冒号开头.第二条消息只包含了一个 data 字段,值为"some text".第三条消息包含的两个 data 字段会被解析成为一个字段,值为"another message\nwith two lines".其中每两条消息之间是以一个空行为分割符的.

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
