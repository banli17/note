# 页面loading的统一管理

页面loading的类型分为2类，一类是页面载入加载完成的过程，另一类是页面交互时ajax的loading。

## 页面载入时

1. 页面一上来 loading -> show
2. 在页面渲染完成后 loading -> hide

那么页面渲染完成是什么时候？

1. 如果有ajax获取数据，则是在ajax之后，页面才渲染完成。最好再ajax之后延迟个200ms，留点空隙让浏览器渲染。
2. 如果没有ajax，则在渲染完成后，比如 jq -> ready vue -mounted

## 页面交互时

1. 交互前 loading -> show
2. 交互后 loading -> hide

如果是多个 ajax，可以在 ajax 后延迟 300ms，让 loading hide。然后在ajax 之前判断 loading 的状态，如果是 show，则不改变；

## 问题

