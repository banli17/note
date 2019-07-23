---
        title: 无名
        ---
        # global

- CommonJS
- Buffer、process、console
- timer


## process

env, argv, argv0, execPath, execArgv

cwd() process当前执行路径

process.nextTick() 比 setImmediate() 要早。

nextTick()是放在当前队列的最后，在异步io之前，setImmediate是放在下一次异步事件队列的最前。setTimeout(,0) 是在中间。

## 调试

inspect  chrome://inspect
ide