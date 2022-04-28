// 1. 资源 cpu内存

Buffer.alloc(100) // 会让 arrayBuffers 增加
console.log(process.memoryUsage());
/*{
	rss: 19685376, 常驻内存
	heapTotal: 4481024, 总内存
	heapUsed: 2802728, 使用的内存
	external: 908685, 扩展的内存，底层c/c++占用的内存
	arrayBuffers: 9898 独立的空间大小，缓冲区大小 不是 v8 的,
  } */

console.log(process.cpuUsage());

// 2. 运行环境: 运行目录、node 环境、cpu架构、用户环境、系统平台
console.log(process.cwd());
console.log(process.version);
console.log(process.versions);
console.log(process.arch);
console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(process.env.PATH);
console.log(process.platform === 'darwin' ?  process.env.HOME : process.env.USERPROFILE); // 用户家目录
console.log(process.platform);

// 3. 运行状态：启动参数、PID、运行时间
console.log(process.argv);
// [
// 	'/Users/banli/.nvm/versions/node/v14.18.1/bin/node',
// 	'/Users/banli/Desktop/course/course-nodejs/src/process/1.js'
// ]
console.log(process.argv0); // node

// 进程 id
console.log(process.pid); // pid ppid

console.log(process.uptime()); // 文件的运行时间，从打开到运行到这里时的时间

// 4. 事件
process.on('exit', (code) => {
	console.log('exit' + code);
})
process.on('beforeExit', (code) => {
	console.log('beforeExit' + code);
})
console.log('代码执行完了');
// process.exit() // 主动退出， beforeExit 不会被执行， exit 会执行

// 5. 标准输出、输入、错误
console.log = (data)=>{
	process.stdout.write('----' + data + '\n')
}

const path = require('path')
const fs = require('fs')

fs.createReadStream(path.resolve(__dirname, './1.js'))
	.pipe(process.stdout)

// 标准输入, 即控制台输入
process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', ()=>{
	let chunk = process.stdin.read()
	if(chunk !== null){
		process.stdout.write('data' + chunk)
	}
})