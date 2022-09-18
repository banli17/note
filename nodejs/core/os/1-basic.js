import os from 'os'
import '../global.js'

/**
 * 获取操作系统和计算机信息
 */

// 获取换行符, win is \r\n, linux \n
l(os.EOL)

// 获取信号集合, {SIGKILL: 9, ...}
l(os.constants.signals)

// 获取错误代码, 如 EADDRINUSE, EOVERFLOW
l(os.constants.errno)

// 返回标识底层架构的字符串，如 arm、x64、arm64
l(os.arch()) // x64

// 返回有关系统上可用 CPU 的信息
l(os.cpus())

// 返回 BE 或 LE，具体取决于 Node.js 是使用 Big Endian 还是 Little Endian 编译的
l(os.endianness()) // LE

// 返回表示系统中可用内存的字节数
l(os.freemem()) // 471375872

// 返回当前用户主目录的路径
l(os.homedir()) // /Users/banli

// 返回主机名
l(os.hostname()) // banlideMacBook-Pro.local

// 返回操作系统对平均负载的计算
// 它只在 Linux 和 macOS 上返回一个有意义的值
// 返回过去 1, 5, 15 分钟内的平均进程数量
l(os.loadavg()) // [ 3.35791015625, 3.14453125, 3.04443359375 ]

// 返回系统上可用网络接口的详细信息
l(os.networkInterfaces())

// 返回编译 Node.js 的平台
// darwin freebsd linux openbsd win32
l(os.platform()) // darwin

// 返回一个标识操作系统版本号的字符串
l(os.release()) // 21.5.0

// 返回操作系统临时文件夹的路径
l(os.tmpdir()) // /var/folders/xq/yb2sblnj55xccz7jhp3ytth00000gn/T

// 返回表示系统中可用总内存的字节数
l(os.totalmem()) // 17179869184
l(os.freemem() / 1024 / 1024 / 1024)
l(os.totalmem() / 1024 / 1024 / 1024)
l(os.freemem() / os.totalmem()) // 0.01755237579345703

// 识别操作系统
// Linux
// Darwin on macOS
// Windows_NT on Windows
l(os.type()) // Darwin

// 返回计算机自上次重新启动以来已运行的秒数
l(os.uptime()) // 9742
l(os.uptime() / 60 / 60) // 2.75h

// 返回一个包含当前用户名、uid、gid、shell 和 homedir 的对象
l(os.userInfo())
// {
//   uid: 501,
//   gid: 20,
//   username: 'banli',
//   homedir: '/Users/banli',
//   shell: '/bin/zsh'
// }
