---
sidebar_position: 5
---

# os

## 简介

os 模块提供了操作系统和计算机相关信息。

```ts
import os from "os";
```

## 常用属性

### os.EOL

os.EOL 用于获取操作系统的换行符, win 系统下是 `\r\n`, linux 系统下是 `\n`

### os.constants

os.constants 封装了一些常用的常量。

- signals: 信号集合
- errno: 错误代码集合

```ts
os.constants.signals; // {SIGKILL: 9, ...}

os.constants.errno; // EADDRINUSE, EOVERFLOW
```

## 常用方法

### os.arch()

返回标识底层架构的字符串，如 arm、x64、arm64。

```ts
os.arch(); // x64
```

### os.cpus()

返回有关系统上可用 CPU 的信息

```ts
os.cpus();
```

### os.endianness()

返回 BE 或 LE，具体取决于 Node.js 是使用 Big Endian 还是 Little Endian 编译的。

```ts
os.endianness(); // LE
```

```ts
// 返回表示系统中可用内存的字节数

l(os.freemem()); // 471375872

// 返回当前用户主目录的路径
l(os.homedir()); // /Users/banli

// 返回主机名
l(os.hostname()); // banlideMacBook-Pro.local

// 返回操作系统对平均负载的计算
// 它只在 Linux 和 macOS 上返回一个有意义的值
// 返回过去 1, 5, 15 分钟内的平均进程数量
l(os.loadavg()); // [ 3.35791015625, 3.14453125, 3.04443359375 ]

// 返回系统上可用网络接口的详细信息
l(os.networkInterfaces());

// 返回编译 Node.js 的平台
// darwin freebsd linux openbsd win32
l(os.platform()); // darwin

// 返回一个标识操作系统版本号的字符串
l(os.release()); // 21.5.0

// 返回操作系统临时文件夹的路径
l(os.tmpdir()); // /var/folders/xq/yb2sblnj55xccz7jhp3ytth00000gn/T

// 返回表示系统中可用总内存的字节数
l(os.totalmem()); // 17179869184
l(os.freemem() / 1024 / 1024 / 1024);
l(os.totalmem() / 1024 / 1024 / 1024);
l(os.freemem() / os.totalmem()); // 0.01755237579345703

// 识别操作系统
// Linux
// Darwin on macOS
// Windows_NT on Windows
l(os.type()); // Darwin

// 返回计算机自上次重新启动以来已运行的秒数
l(os.uptime()); // 9742
l(os.uptime() / 60 / 60); // 2.75h

// 返回一个包含当前用户名、uid、gid、shell 和 homedir 的对象
l(os.userInfo());
// {
//   uid: 501,
//   gid: 20,
//   username: 'banli',
//   homedir: '/Users/banli',
//   shell: '/bin/zsh'
// }
```
