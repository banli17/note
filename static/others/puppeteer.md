# 爬虫利器：puppeteer实战

一些概念：爬虫与反爬虫

反爬虫策略：
- 看User-Agent
- Referer: 从哪个页面来的
- 加验证码
- 单位时间内的访问次数
- 关键信息图片混淆
- 异步加载

## 技术方案

一般都是使用superagent + cherrio来做。cherrio相当于jquery，superagent可以获取数据。

但是反爬虫过的页面，上面的方案是拿不到的。所以需要模拟用户来做爬虫。

我们使用[GoogleChrome的puppeteer库](https://github.com/GoogleChrome/puppeteer)来获取页面信息。它的功能十分强大，能模拟用户操作爬任何想爬的东西。

## 爬页面截图

先来用puppeteer来爬百度首页，保存个截图。

```js
// index.js
const puppeteer = require('puppeteer')

puppeteer.launch().then(async browser=> {
	const page = await browser.newPage()
	await page.goto('https://www.alimama.com/index.htm')
	await page.screenshot({path: 'screenshot.png', fullPage: true})
	await browser.close()
})
```

上面的代码，launch()方法会返回一个浏览器实例，然后通过模拟打开页面，进行截图操作。

## 开始做爬虫

现在要做一个爬百度美女图片的爬虫。

1. 新建文件 `index.js`，负责使用`pupeteer`后台模拟打开页面，输入"美女"，点击搜索按钮，然后获取页面中所有的图片。

```javascript
const puppeteer = require('puppeteer')
const http = require('http')
const fs = require('fs')
const path = require('path')
const srcToImg = require('./srcToImg')

;(async()=> {
	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage()
	await page.goto('http://image.baidu.com/')
	
	page.setViewport({
		width: 980,
		height: 500
	})
	await page.focus('#kw')
	await page.keyboard.sendCharacter('美女')
	await page.click('.s_search')
	
	// 图片加载完成后才能用
	
	
	page.on('load', async()=> {
		for(var i=0;i<1000000;i++){
			await page.waitFor(200)
			page.evaluate(_ => {
				window.scrollTo(0, 8888099999999999);
			})
		}
		
		const srcs = await page.$$eval('img.main_img', (imgs)=> {
			return [].map.call(imgs, (img)=>img.src)
		})
		
		srcs.forEach(async(src)=> {
			await page.waitFor(200)
			await srcToImg(src, path.resolve(__dirname, './pic'))
		})
		await browser.close()
	})
})();

```

2. 接着，我们需要些srcToImg方法，新建一个文件`srcToImg.js`，负责将请求对应的图片地址，然后下载图片。图片的种类有base64和一般图片。

```javascript
// srcToImg.js
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
```

这里注意要加headers，否则会有很多图片的下载出现错误。

> 今天发现上面的代码不能用了，把headers去掉居然好了，但是图片可能只下载了一部分，没有下载全，因为有些需要headers。所以最好的方法是模拟把图片一张一张打开，然后保存下来。

## 参考资料

- [Node.js入门到企业Web开发中的应用](https://coding.imooc.com/class/146.html)

https://www.zhihu.com/question/64420783/answer/226816983








