const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const nurl = require('url')
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile)

const urlToImg = promisify((url, dir, callback)=> {
	const mod = /^https/.test(url) ? https : http
	const ext = path.extname(url)
	const file = path.join(dir, `${Math.random()}${ext}`)
	
	mod.get({
		...nurl.parse(url),
		headers: {
			Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "zh-CN,zh;q=0.9",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
			Host: "img3.imgtn.bdimg.com",
			Pragma: "no-cache",
			Referer: "http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=000000&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E7%BE%8E%E5%A5%B3",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"
		}
	}, res=> {
		res.pipe(fs.createWriteStream(file))
			.on('finish', ()=> {
				callback()
				// console.log(file)
			})
	})
})

const base64ToImg = async(base64Str, dir)=> {
	
	const matches = base64Str.match(/^data:(.+?);base64,(.+)$/)
	try {
		
		const ext = matches[1].split('/')[1]
		const file = path.join(dir, `${Math.random()}.${ext}`)
		await writeFile(file, matches[2], 'base64')
	} catch (e) {
		console.log('非法64')
	}
}

module.exports = (src, dir)=> {
	console.log(src)
	if (/base64/.test(src)) {
		base64ToImg(src, dir)
	} else {
		urlToImg(src, dir)
	}
}

































