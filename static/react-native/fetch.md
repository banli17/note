# 网络请求

## 网络请求问题

坑爹，开启了下面的配置。会发送请求一直是：

![](./imgs/fetch-error1.png)
![](./imgs/fetch-error2.png)

````javascript
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
global.FormData = global.originalFormData
```

## http.js

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
