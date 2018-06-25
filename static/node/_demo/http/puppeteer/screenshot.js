const puppeteer = require('puppeteer')

puppeteer.launch({headless:false}).then(async browser=> {
	const page = await browser.newPage()
	await page.goto('http://www.zhangjiushijia.com/')
	await page.screenshot({path: 'screenshot.png', fullPage: true})
	await browser.close()
})