import { URL } from 'url'

// __filename
console.log(new URL('', import.meta.url).pathname) // 带文件名
// /Users/banli/Desktop/course/course-nodejs/core/url/1.js

// __dirname
console.log(new URL('.', import.meta.url).pathname)
// /Users/banli/Desktop/course/course-nodejs/core/url/
