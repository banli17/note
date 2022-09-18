# 多进程开发

## 进程

进程是系统资源分配和调度的基本单位。

进程主要概念：

- 进程是一个实体，每个进程都有它自己的地址。
- 进程是一个“执行中的程序”，是可嵌套的。

通过 child_process 创建的进程就是 nodejs 的子进程。

- pid 进程 id
- ppid 进程的父进程 id

```
# 查看所有进程
ps -ef
# 查询进程
ps -ef | grep node
```

![](imgs/2022-07-03-13-20-47.png)

## api

**异步**

- exec ：用于执行 shell 脚本
- execFile
- fork
- spawn

**同步**

- execSync
- execFileSync
- spawnSync

```
// exec

```
