# react-native-netease-im

## pod install

1、安装cocoapods

```bash
sudo gem install cocoapods
```

2、到ios项目目录`vim Podfile`。内容如下：

```
platform :ios, '8.0'
target '项目名称' do
    pod 'NIMSDK', '4.9.0'
    pod 'SSZipArchive', '~> 1.2'
    pod 'Reachability', '~> 3.1.1'
    pod 'CocoaLumberjack', '~> 2.0.0-rc2'
    pod 'FMDB', '~>2.5'
end
```


解决办法是：

1、进入/users/用户名/.cocoapods/repos，删除master文件夹
2、重新下载CocoaPods仓库

git clone https://git.coding.net/CocoaPods/Specs.git ~/.cocoapods/repos/master
当然你可以用下面方法（备用）
pod repo add master https://github.com/CocoaPods/Specs.git
下载仓库后如有必要pod setup一下
