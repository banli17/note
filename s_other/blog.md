---
title: "关于本博客的制作"
# sidebar_label: 
---

博客从最初的 hexo，到现在换成使用[docusaurus](https://v2.docusaurus.io)。

## 添加评论功能 gitalk

1. 首先要将模版组件弹出，然后再进行修改。模版组件再`node_modules/@docusaurus/theme-classic`下。

```
npm run swizzle @docusaurus/theme-classic BlogPostPage
npm run swizzle @docusaurus/theme-classic DocLegacyItem
```

使用上面命令后，文件将会弹出到项目的`src/theme`下。

2. 在`src/theme`下添加 GitalkComment.js。代码如下：

```js
import React, {Component} from 'react'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

class GitalkComment extends Component{
  componentDidMount(){
    var gitalk = new Gitalk({
      clientID: '92f9ff606fd031145a24',
      clientSecret: '92e5c59ae06a2ce34caeecf85a9d1666a20f36c0',
      repo: 'blog_comment',  // 仓库名称
      owner: 'banli17',      // 仓库作者
      admin: ['banli17'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    gitalk.render('gitalk-container')
  }
  render(){
    return <div id="gitalk-container"></div>
  }
}
export default GitalkComment;
```

具体的gittalk配置，需要到 https://github.com/settings/applications/new 去注册一个应用。

注册时`Homepage URL`、`Authorization callback URL`都填写网站域名即可，如`https://www.banli17.com/`。

注册完成后，就可以看到 ID 了。

- clientID、clientSecret: 注册应用后，可以看到。也可以在 github 的`settings -> Developer settings -> OAuth Apps`看到。
- repo: 在 github 新建一个项目`blog_comment`(名字可随意，注意填写的不是github地址，而是项目名)，评论会保存到这个项目的 issue 中。

3. 插入代码`<GitalkComment>`到合适位置。

**src/theme/DocLegacyItem/index.js**

```jsx
<div className="margin-top--xl margin-bottom--lg">
    <DocLegacyPaginator
        docsMetadata={docsMetadata}
        metadata={metadata}
    />
    <GitalkComment />   
</div>
```

**src/theme/BolgPostPage/index.js**

```jsx
<div className="margin-vert--xl">
    <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
    <GitalkComment />
</div>
```

4. 发布到线上，就可以看到评论框。注意每个页面都需要管理员登录后打开一下，即初始化创建后，其它用户才能在这个页面评论。