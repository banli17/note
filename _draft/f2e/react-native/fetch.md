---
title: "react-native fetch封装与问题"
date: 2017-11-04 07:08:14
toc: true
---

## fetch时带上cookie

现在有个需求，就是每次发数据请求的时候都需要带上cookie。但是我通过fetch请求的时候发现cookie并没有被带上。

在网上找了半天，原来是因为fetch请求需要配置一个credentials参数。具体如下：

```
fetch('1.json', {
    method: 'GET',
    credentials: 'same-origin'
}).then()
```

通过上面的修改，android端可以了，开心中...

接着我打开 xcode的 ios模拟器，发现又出问题了，提示 fetch 网络请求失败 network request failed。继续查找是什么原因。

最后发现原来，ios现在已经改成默认是发https请求了，这样会更加安全。但是我想发http啊，咋办呢？

解决办法是在xcode 里打开项目中的 Info.plist 然后添加几个配置。

1、右键新增App Transport Security Settings 设置成 Dictionary。（如果有了就不新增了）

2、在App Transport Security Settings的下面新增一个 Allow Arbitrary Loads 设置成Boolean，值改成Yes。

通过上面的修改，重启一个模拟器，就可以发请求了。


今天使用React Native 发送请求的时候，发现使用

```javascript
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
## 网络请求问题

坑爹，开启了下面的配置。会发送请求一直是：

![](./imgs/fetch-error1.png)
![](./imgs/fetch-error2.png)

```javascript
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
global.FormData = global.originalFormData
```


下面是我封装ajax的方法，最初我是用fetch封装的，后来该用axio了。

## 使用axios封装http.js

```javascript
import {
    Alert, NetInfo,
} from 'react-native'
import qs from 'qs'
import DeviceInfo from 'react-native-device-info'
import blUtil from 'bl-util'
import {Toast} from 'antd-mobile-rn'
import RNBToast from '../api/Toast'
import {authApi} from "api"
import axios from 'axios'
import Cookie from "react-native-cookie";

// 自定义请求头
const headers = {
    'User-Agent': DeviceInfo.getUserAgent(),
    'Custom-Device': qs.stringify({
        device_id: blUtil.md5(DeviceInfo.getUniqueID()),    // uuid
        device_name: DeviceInfo.getBrand(),     // 手机品牌
        device_type: 'app',
        device_version: DeviceInfo.getModel(),  // 手机型号
        system_version: DeviceInfo.getSystemVersion(),
        system_name: DeviceInfo.getSystemName(),
        // serialNumber: DeviceInfo.getSerialNumber(),
        // bundleId: md5(DeviceInfo.getBundleId()),
        is_emulator: DeviceInfo.isEmulator(), // 是否是模拟器
        network: global.NetWork,   // 来源是entry.js
        ip: DeviceInfo.getIPAddress(),
        app_version: DeviceInfo.getVersion(),
    })
}

const http_factory = (method) => {
    return async (url, params, isLoading = false, delay = 0) => {
        if (isLoading) {
            Toast.loading()
        }

        url = url.indexOf('http') > -1 ? url : (APP_CONFIG.base_service + url)

        // 图片上传
        if (method === 'UPLOAD') {
            headers['Content-Type'] = 'multipart/form-data;'
            method = 'POST'
            // 上传的图片数据
            let formData = new FormData()
            let file = {uri: params.uri, name: 'image.png', type: 'multipart/form-data'}
            formData.append('file', file)
            params = formData
        }

        const send_request = () => {
            return new Promise((resolve, reject) => {
                axios({
                    method,
                    url,
                    headers,
                    params,   // get参数
                    data: params // post参数
                }).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                    store.dispatch({
                        type: "NETWORK_ERROR",
                        cache: {
                            url,
                            requestOptions,
                            resolve
                        }
                    })
                })

            })
        }

        try {
            const res = await send_request()
            console.log('axios url:' + url, params, res)

            if (params && params._tag == 'pass') {
                return res
            }

            Toast.hide();

            if (res && res.error) {
                if (res.error.msg && !res.error.action) {
                    RNBToast.info(res.error.msg)
                }
                // 正常
                if (res.error.code == 0 || res.error.action) {
                    return res
                }
            }

            // 异常
            return false
        }
        catch (e) {
            console.log(`http error${url}: ${e}`)
            setTimeout(() => {
                Toast.hide();
            }, delay);
            store.dispatch({
                type: "NETWORK_ERROR",
                cache: {
                    url,
                    requestOptions
                }
            })
        }
    }
}

export const http_get = http_factory('GET')
export const http_post = http_factory('POST')
export const http_upload = http_factory('UPLOAD')
```

## 使用fetch封装http.js

```javascript
import {
    Alert
} from 'react-native'
import qs from 'qs'
import {Toast} from 'antd-mobile-rn'

const http_factory = (method) => {
    return async (url, params) => {
        console.log('发送url', url)
        url = url.indexOf('http') > -1 ? url : (SERVICE_BASE + url)
        const requestOptions = {
            method,
            credentials: "include"
            // headers: {Accept: 'application/json'}
        }

        if (method === 'GET') {
            const query = qs.stringify(params)
            if (query) {
                url += '?' + query
            }
        }

        // 调试专用，上线注释
        if (APP_CONFIG.debug) {
            // url = url + (/\?/.test(url) ? '&' : '?') + 'debug=1&debug_uid=10833'
        }

        if (method == 'POST') {
            requestOptions.body = qs.stringify(params)
            requestOptions.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        // 图片上传
        if (method === 'UPLOAD') {
            requestOptions.headers = {
                'Content-Type': 'multipart/form-data;'

            }
            requestOptions.method = 'POST'
            requestOptions.body = params.body
        }

        const send_request = () => {

            return new Promise((resolve, reject) => {

                fetch(url, requestOptions)
                    .then(response => {
                        resolve(response)
                    }, response => {
                        reject(response)
                    })
                    .catch(error => {

                        store.dispatch({
                            type: "NETWORK_ERROR",
                            cache: {
                                url,
                                requestOptions,
                                resolve
                            }
                        })
                    })
            })
        }

        try {
            const http_result = await send_request()
            const text = await http_result.text()
            let json = JSON.parse(text)

            console.log(json)
            if (json) {
                if (json.error) {
                    Toast.info(json.error.msg)
                }
                return json
            } else {
                return new Promise(() => {
                })
            }
        }
        catch (e) {
            console.log('http error', url, JSON.stringify(e))

            store.dispatch({
                type: "NETWORK_ERROR",
                cache: {
                    url,
                    requestOptions
                }
            })
        }
    }
}

export const http_get = http_factory('GET')
export const http_post = http_factory('POST')
export const http_upload = http_factory('UPLOAD')
```

