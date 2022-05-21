var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const decompress = require('decompress')
const unzipper = require('unzipper')

/* GET home page. */
router.post('/', async (req, res, next) => {
    console.log('请求发布...')
    console.log(req.query, req.body)
    // publish-1
    // fs.writeFileSync(path.resolve(__dirname, '../../server/public/', req.body.filename), req.body.content)

    // publish-2
    // let matched = req.url.match(/filename=([^&]+)/)
    // let filename = matched && matched[1]
    // if (!filename) return
    // const writeStream = fs.createWriteStream(path.resolve(__dirname, '../../server/public/', filename))
    //
    // req.pipe(writeStream)
    // req.on('end', () => {
    //     // res.writeHead(200, {'Content-Type': 'text/plain'})
    //     res.send('okay')
    //     // res.render('index', {title: '发布完成'});
    // })

    // publish-3
    let matched = req.url.match(/filename=([^&]+)/)
    let filename = matched && matched[1]
    if (!filename) return
    const writeStream = fs.createWriteStream(path.resolve(__dirname, '../../publish-server/public/', filename))
    const unzipStream = await unzipper.Extract({path: '../../publish-server/public/'})
    req.pipe(unzipStream)
    req.on('end', ()=>{
        res.send('ok')
    })
    // return
    // req.on('error', (err) => {
    //     console.log('error', err)
    // })
    // req.on('data', (data)=>{
    //     console.log(data)
    //     writeStream.write(data)
    // })
    // req.on('end', (data) => {
    //     writeStream.end(data)
    //     // res.send('okay')
    //
    //     // 将文件解压到server目录
    //     // decompress('./public/' + filename, path.resolve(__dirname, '../../server/public')).then(files => {
    //     //     console.log('done!');
    //     //     res.send('okay')
    //     // });
    //
    //     // res.writeHead(200, {'Content-Type': 'text/plain'})
    //
    //     // res.render('index', {title: '发布完成'});
    // })

});

module.exports = router;
