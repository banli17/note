# python3网络爬虫笔记

https://python3webspider.cuiqingcai.com/1.1python3-de-an-zhuang#1-1-3-mac-xia-de-an-zhuang

## 环境配置

### mac 下安装

1. 安装 homebrew

```sh
ruby -e"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. 安装 python3 和 pip3 

```sh
# 安装
brew intall python3  

# 升级
brew upgrade python  
```

3. 查看

```sh
python -V
```

4. 版本问题

```sh
# 1
vi ~/.bash_profile
PATH="/Library/Frameworks/Python.framework/Versions/3.7/bin:${PATH}"
export PATH 

# 2
sudo vi ~/.bashrc
alias python2='/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7'
alias python3='/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7'
alias python=python3
# 添加以上三行 ， 如果不知道自己的python3安装路径，可以用 which python3 命令进行查看路径

# 3
source ~/.bash_profile
source ~/.bashrc

# 4
python -V
```

### 请求库 requests 安装

1. 安装 requests

```
pip3 install requests
```

也可以通过 wheel 安装，它是 python 的一种安装包，后缀为 .whl。网速差可以用这种方法。

```sh
# 1 安装 wheel
pip3 install wheel
# 2 下载 https://pypi.python.org/pypi/requests/2.17.3#downloads
# 3 安装
pip3 install requests-2.17.3-py2.py3-none-any.whl
```

源码安装，安装指定版本。

```sh
# 1. 下载
git clone git://github.com/kennethreitz/requests.git
# 或者
curl -OL https://github.com/kennethreitz/requests/tarball/master

# 2. 安装
cd requests
python3 setup.py install
```

验证安装好了，不报错即可。

```
$ python3 
>>> import requests
```

### selenium 安装

```
pip3 install selenium
```

安装完成后，还要安装 chrome 和 [chromeDriver 驱动](https://sites.google.com/a/chromium.org/chromedriver/)。

```
$ mv chromedriver /usr/local/bin
$ chromedriver
```

firefox的驱动: GeckoDriver，下载地址：https://github.com/mozilla/geckodriver/releases

PhantomJS: headless的引擎，支持 dom、css、json、canvas、svg
下载地址：https://phantomjs.org/download.html


requests 是同步的 ajax 库
aiohttp 是异步的，

```
pip3 install aiohttp
# 官方推荐还安装字符编码检测库 cchardet 和 dns加速解析 aiodns库
pip3 install cchardet aiodns
```

### 解析库安装

lxml 是 Python 的一个解析库，支持 HTML 和 XML 的解析，支持 XPath 解析方式，而且解析效率非常高。

```
pip3 install lxml
```

Beautiful Soup 是 Python 的一个 HTML 或 XML 的解析库，我们可以用它来方便地从网页中提取数据。

```
pip3 install beautifulsoup4
```

pyquery 同样是一个强大的网页解析工具，它提供了和 jQuery 类似的语法来解析 HTML 文档，支持 CSS 选择器，使用非常方便。

```
pip3 install pyquery
```


处理验证码

tesserocr 是 Python 的一个 OCR 识别库，但其实是对 tesseract 做的一层 Python API 封装，所以它的核心是 tesseract。

```
brew install imagemagick   
brew install tesseract --all-languages

pip3 install tesserocr pillow

```


卡在Updating Homebrew...上

1. 关闭升级

```
vim ~/.bash_profile

# 新增一行
export HOMEBREW_NO_AUTO_UPDATE=true
```

2. 替换brew源 https://www.jianshu.com/p/7cb05a2b39a5

### web库

Flask 是一个轻量级的 Web 服务程序，它简单、易用、灵活，这里主要用来做一些 API 服务。

```sh
pip3 install flask
```

Tornado 是一个支持异步的 Web 框架，通过使用非阻塞 I/O 流，它可以支撑成千上万的开放连接，效率非常高，

```sh
pip3 install tornado
```

### App爬取相关库的安装

Charles

mitmproxy 是一个支持 HTTP 和 HTTPS 的抓包程序，类似 Fiddler、Charles 的功能，只不过它通过控制台的形式操作。
此外，mitmproxy 还有两个关联组件，一个是 mitmdump，它是 mitmproxy 的命令行接口，利用它可以对接 Python 脚本，实现监听后的处理；另一个是 mitmweb，它是一个 Web 程序，通过它以清楚地观察到 mitmproxy 捕获的请求

```sh
pip3 install mitmproxy
```

Appium 是移动端的自动化测试工具，类似于前面所说的 Selenium，利用它可以驱动 Android、iOS 等设备完成自动化测试，比如模拟点击、滑动、输入等操作，其官方网站为：http://appium.io/。

```sh
npm install -g appium
```

### 爬虫框架

pyspider 是国人 binux 编写的强大的网络爬虫框架，它带有强大的 WebUI、脚本编辑器、任务监控器、项目管理器以及结果处理器，同时支持多种数据库后端、多种消息队列，另外还支持 JavaScript 渲染页面的爬取，使用起来非常方便。

```
pip3 install pyspider
```

Scrapy 是一个十分强大的爬虫框架，依赖的库比较多，至少需要依赖的库有 Twisted 14.0、lxml 3.4 和 pyOpenSSL 0.14。在不同的平台环境下，它所依赖的库也各不相同，所以在安装之前，最好确保把一些基本库安装好。

### 部署相关库的安装