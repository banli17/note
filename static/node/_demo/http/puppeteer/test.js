const https = require('http')
const fs = require('fs')
https.get({
	hostname: 'http://img4.imgtn.bdimg.com',
	port: 80,
	path: '/it/u=949354588,677085984&fm=27&gp=0.jpg',
	headers: {
		Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "zh-CN,zh;q=0.9",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
		Host: "img3.imgtn.bdimg.com",
		Pragma: "no-cache",
		Referer: "http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=000000&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E7%BE%8E%E5%A5%B3",
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36",
	}
}, (res)=> {
	console.log(res.statusCode)
})


