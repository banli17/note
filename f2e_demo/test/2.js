// function t(o) {
//     let params = []
//     let postData = o
//     let paramStr = ''
//     for (let key in postData) {
//         if (key == "sign" || postData[key] === '') {
//             continue;
//         }
//         params.push([key, postData[key]])
//     }
//
//     params.sort().forEach(param => {
//         paramStr += `${param[0]}=${param[1]}&`
//     })
//     console.log('参数', paramStr)
//     return paramStr.substring(0, paramStr.length - 1)
//     return context.utils.md5(paramStr)
// }

const crypto = require('crypto')
let r = crypto.createHash('md5').update('app_id=aa&notify_url=https://www.xxx.com/notify/&order_amount=100&order_desc=512G 16G 2019&order_sn=2020103292392&order_title=苹果电脑MacBook Pro x1&pay_env=WEIXIN_XCX&salt=CDXKi3&timestamp=1592473502').digest("hex")
console.log(r)
