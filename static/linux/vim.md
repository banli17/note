# vim常用命令


## 复制

```
y^  复制到行首，或 y0
y$  复制到行尾
yw  复制一个word 
y2w 复制2个word
y1G 复制到文件首
yG  复制到文件尾
"+y 将vim的内容复制到系统剪切板，可以 ctrl + v 粘贴
```


## 剪切

```
dd  剪切整行
d^  剪切到行首
d$  剪切到行尾
dw  剪切一个word
dG  剪切到文件尾
```

## 粘贴

```
:reg 查看剪贴板状态，一共有12个剪贴板
"Ny  复制第N个剪贴板的内容
Np   粘贴第N个剪贴板的内容
"+p  将系统剪切板内容粘贴到vim中
```


## 参考资料

- [vim 复制/剪切/粘贴/撤销操作](https://blog.csdn.net/qidi_huang/article/details/52179279)
