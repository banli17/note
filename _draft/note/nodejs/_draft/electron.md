---
        title: 无名
        ---
        # Electron桌面应用框架

**官网

- [https://electronjs.org/](https://electronjs.org/)

## 实例

```bash
# 克隆示例项目的仓库
git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
cd electron-quick-start

# 安装依赖并运行
npm install && npm start
```

## 打包

打包可以使用[electron-packager](https://github.com/electron-userland/electron-packager)。

```bash
npm i -g electron-packager

electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]

# 简单的
electron-packager ./
```

不过这样打包文件太大，都有100+M。可以用 zip 压缩一下。

```
zip -r -y app.zip app
```

## 修改版权信息

```
$ rcedit "path-to-exe-or-dll" --set-version-string "CompanyName" "MyCompany"
$ rcedit "path-to-exe-or-dll" --set-version-string "FileDescription" "This is an exe"
$ rcedit "path-to-exe-or-dll" --set-version-string "LegalCopyright" "Copyright whatever"
$ rcedit "path-to-exe-or-dll" --set-version-string "ProductName" "MyAwesomeProduct"
```

