const puppeteer = require('puppeteer')
const http = require('http')
const fs = require('fs')
const path = require('path')
const srcToImg = require('./srcToImg')
	;
(async()=> {
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
