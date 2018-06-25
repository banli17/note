今天使用React Native 发送请求的时候，发现使用

```
fetch('https://mywebsite.com/endpoint/', {
    method: 'POST',
        headers: {
    },
    body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
    })
})
```

默认发送`’Content-Type’: ‘application/json’`的请求，但是现在想发送Form表单,该怎么写呢？ 这里找到了答案：
```
let formData = new FormData();
formData.append('image', {uri: image.uri, type: 'image/jpg', name: 'image.jpg'});
formData.append('description', String(data.description));

let options = {};
options.headers['Content-Type'] = 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d';
options.body = formData;
return fetch(uri, options).then((response) => {
   .... 
});
```
只要把body从Json换成FromData就可以了，解决完问题然后下班的感觉真好。


## 参考资料

- http://blog.csdn.net/mobilexu/article/details/50597174