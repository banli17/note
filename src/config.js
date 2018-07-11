/**
 * 网站配置
 * leftbar: 左侧导航配置
 * rightbar: 右侧导航配置
 */
window.config = {
    leftbar: {
        file: '/static/sidebar.md',
        expand: false,   // 左侧菜单默认全部展开，如果要收缩将它改为false
        showChapter: true
    },
    content: {
        width: '900px'  // 文档内容宽度，建议900px
    },
    rightbar: {
        // 搜索的api，github为false，表示使用本地接口进行搜索，否则需要填写github接口,例如：https://github.com/banli17/blog/search?q=
        search: {
            github: 'https://github.com/banli17/blog/search?q='
        },
        // 友情链接
        friendLinks: [
            {
                icon: "",
                text: "网易云音乐",
                url: "//music.163.com/"
            },
            {
                icon: "",
                text: "阮一峰",
                url: "http://ruanyifeng.com/"
            },
            {
                icon: "",
                text: "js标准",
                url: "http://javascript.ruanyifeng.com/"
            },
            {
                icon: "",
                text: "es6",
                url: "http://es6.ruanyifeng.com/"
            },
            {
                icon: "",
                text: "alloyteam",
                url: "http://www.alloyteam.com/"
            },
            {
                icon: "",
                text: "张鑫旭",
                url: "http://www.zhangxinxu.com/"
            },
            {
                icon: "",
                text: "imweb",
                url: "http://www.imweb.io/"
            },
            {
                icon: "",
                text: "mongoosejs",
                url: "http://mongoosejs.com/docs/index.html"
            },
            {
                icon: "",
                text: "尤雨溪",
                url: "https://www.zhihu.com/people/evanyou/answers"
            }
        ]
    },
    // api接口
    api: {
        search: '/static/search.json'

    },
}
