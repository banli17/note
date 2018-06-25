# http headers

http headers允许客户端和服务端之间传递附加信息。一个http header由`名称:值`组成。值的先导空格会被忽略。

headers可以根据上下文分组：

- 常规头：用于请求和响应，与正文中数据无关。
- 请求头：包含要客户端的信息和请求的相关信息。
- 响应头：包含响应的附加信息，如服务器名称、版本号、位置等。
- 实体头：包含实体主体的更多信息，如内容长度，mime类型等。

## 认证

- WWW-Authenticate
- Authorization
- Proxy-Authenticate
- Proxy-Authorization


## 缓存

- Age:
- Cache-Control
- Expires
- Praga
- Warning

## 客户端提示

- Accept-CH
- Content-DPR
- DPR
- Downlink
- Save-Data
- Viewport-Width
- width

## 附加信息

- Last-Modified
- ETag
- If-Match
- If-None-Match
- If-Modified-Since
- If-Unmodified-Since

## 连接管理
- Connection
- Keep-Alive

## Content negotiation

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language


- https://www.zhihu.com/question/20391668