# 文件和目录管理

## zip

- `-r`：递归处理

```bash
# 压缩文件并加密
zip -P 123456 -r yoga_vpn.zip yoga_vpn_4.0.111.apk
```


## cp复制

<div class="alert alert-success">复制的目录是相对于当前命令操作目录的。</div>

**参数**



```bash
# 将文件复制到目录中
cp 1.txt ./a/

# 将目录a复制到目录b中，注意a后面没有/
cp -r ./a  ./b/

# 将目录a中的所有文件复制到目录b中
cp -r ./a/ ./b/
```
