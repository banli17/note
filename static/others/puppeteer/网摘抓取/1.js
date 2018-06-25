const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  console.log(page)
  await page.pdf({path: './pdf/hn.pdf', format: 'A4'});

  await browser.close();
})();