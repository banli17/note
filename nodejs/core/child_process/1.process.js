const path = require('path')
const cp = require('child_process')

// 主要执行 shell, 本质上是执行的 execFile
// 第二个参数是个对象 { timeout: ...}
cp.exec('lsa -al | grep node_modules', (err, stdout, stderr) => {
  console.log(err, stdout, stderr)
  // null drwxr-xr-x  64 banli  staff   2048 Jun 28 22:55 node_modules
})

// 主要用于执行 file，注意这里 file 要是 .shell 文件之类
cp.execFile('ls', ['-al'], (err, stdout, stderr) => {
  console.log(err, stdout, stderr)
})
// path.resolve('./') 这里相对路径是对于执行命令目录 cwd() 来说的，是动态变化的，所以用 __dirname
// execFile 需要修改文件权限才行，否则报错 child_process/1.sh EACCES
cp.execFile(
  'sh',
  [path.resolve(__dirname, '1.sh'), '-al'],
  (err, stdout, stderr) => {
    console.log(err, stdout, stderr)
  }
)

// exec execFile fork 底层都是 spawn
const child = cp.spawn('node', [path.resolve(__dirname, '1.test.js'), '-a'], {
  cwd: path.resolve(__dirname),
  // stdio: 'pipe'
  // 默认的 stdio 为 pipe，会和父进程建立管道，然后通过 stdout.on() 进行监听
  // 如果为 inherit ，默认会将数据传递给父进程
})
console.log('spawn pid', child.pid, child)

// 流式打印任务，适合耗时任务，如 npm install
child.stdout.on('data', (chunk) => {
  console.log('stdout', chunk.toString())
})
child.stderr.on('data', (chunk) => {
  console.log('stdout', chunk)
})

// fork: Node 创建一个子进程，进程使用 node 实现，启动一个独立的 v8，然后解析 js
// fork 会让进程处于等待状态，等待两边的通信，可以通过 process.exit 或 child.disconnect() 退出
const f = cp.fork(path.resolve(__dirname, '1.test.js'))
console.log('parent pid', f.pid)
// f.send({ name: 'hello' }) //

// execSync、execFileSync 会直接返回结果 buffer
// spawnSync 会返回一个对象 {stdio, stdout, stderr}
const s1 = cp.execSync('ls -al')
console.log('s1', s1.toString())

const s2 = cp.execFileSync('ls', ['-al'])
console.log('s2', s2.toString())

const s3 = cp.spawnSync('ls', ['-al'])
console.log('s3', s3.stdout.toString())
