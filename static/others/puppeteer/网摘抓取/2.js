const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.baidu.com/')
    await page.waitFor(2000)
    const images = await page.$$eval('img', (img) => {
        // img标签
        return img.src
    })
    console.log(images)
    await browser.close()
})()
