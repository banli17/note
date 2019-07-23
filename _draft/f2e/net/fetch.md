---
title: "fetch基础知识"
date: 2016-11-24 16:54:30
tags:
toc: true
---

在之前做网页就是使用的jquery或zepto里的ajax方法。不过现在貌似都用的fetch了，而且react-native也是用的fetch接口，必须熟悉才行，不然可能遇到很多坑。
要使用fetch，需要首先检查客户端支不支持它。
if(self.fetch){
    // fetch
}else{
    // ajax
}
上面如果 self.fetch 如果存在，则可以使用。如果不存在，则用传统的ajax方法。
发fetch请求

fetch方法接收2个参数，如下。
url: 第一个参数是url地址。
opts: 第二个参数是一个配置对象
fetch方法的返回值是一个包含response对象的 promise。如果成功，执行then里面的回调，如果失败，则执行catch回调。
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
上面的代码，我获取了一张jpg文件，然后返回了一个包含response的Promise对象。
2、自定义请求的参数
fetch的第二个参数是一个请求配置对象。


参考文章
https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API 
