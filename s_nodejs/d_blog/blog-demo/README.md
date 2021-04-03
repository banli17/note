# node blog

## cross-env

- windows:  `set NODE_ENV=production && gulp watch`
- mac & linux: `NODE_ENV production gulp watch`
- 使用cross-env: `cross-env NODE_ENV=production gulp watch`

process.env.NODE_ENV

## mysql

SET SQL_SAFE_UPDATES=0;

## redis

```bash
set name value
get name
keys *
```

## nginx代理

- `/usr/local/etc/nginx/nginx.conf`

```
location / {
    proxy_pass http://localhost:3001
}
location /api/ {
    proxy_pass http://localhost:3000
    proxy_set_header Host $host
}
```

mac下

```
nginx -t
nginx -s reload
```

qps: 每秒访问量

## stream

```
process.stdin.pipe(process.stdout)
```

req res都是流

```
req.pipe(res)
```

```js
readStream = fs.createReadStream(filename)
writeStream = fs.createWriteStream(filename)
readStream.pipe(writeStream)
readStream.on('end', ()=>{
    // 拷贝完成
})
```

## readline

```js
const filename = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(filename)
// 创建readline对象
const rl = readline.createInterface({
    input: readStream
})
rl.on('line', lineData=>{})
rl.on('close', ()=>{})
```
























