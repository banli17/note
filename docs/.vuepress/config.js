const feed_options = {
    canonical_base: "https://banli17.com"
};

module.exports = {
    plugins: [["feed", feed_options]],
    host: "127.0.0.1",
    port: 5010,
    themeConfig: {
        sidebarDepth: 2,
        nav: [
            { text: "主页", link: "/" },
            {
                text: "前端",
                items: [
                    { text: "html", link: "/f2e/html/1" },
                    { text: "css", link: "/language/chinese/" },
                    { text: "javascript", link: "/language/japanese/" },
                    { text: "jQuery", link: "/jquery/" },
                    { text: "vue", link: "/vue/" },
                    { text: "浏览器", link: "/browser/" },
                    { text: "工程化", link: "/project/webpack/basic" }
                ]
            },
            {
                text: "数据库",
                items: [
                    { text: "mysql", link: "/language/chinese/" },
                    { text: "mongodb", link: "/language/chinese/" },
                    { text: "redis", link: "/language/japanese/" }
                ]
            },
            {
                text: "运维",
                items: [
                    { text: "linux", link: "/linux/" },
                    { text: "nginx", link: "/nginx/" }
                ]
            },
            {
                text: "计算机基础",
                items: [
                    { text: "网络协议", link: "/language/chinese/" },
                    { text: "计算机组成原理", link: "/language/chinese/" },
                    { text: "设计模式", link: "/language/chinese/" },
                    { text: "数据结构与算法", link: "/algo/" }
                ]
            },
            {
                text: "安排",
                link: "/task/2019"
            },
            { text: "Github", link: "https://github.com/banli17" }
        ],
        sidebar: {
            "/vue": [
                {
                    title: "vue 总结",
                    children: ["/vue/basic"]
                },
                {
                    title: "vue 源码分析",
                    children: ["/vue/basic"]
                }
            ],
            "/jquery": [
                {
                    title: "jQuery 源码分析",
                    children: ["/jquery/overall", "/jquery/extend"]
                }
            ],
            "/f2e": [
                {
                    title: "webpack",
                    children: [
                        "/project/webpack/basic",
                        "/project/webpack/optimize",
                        "/project/webpack/tapable",
                        "/project/webpack/principle"
                    ]
                }
            ],
            "/browser": [
                {
                    title: "浏览器原理",
                    children: ["/browser/gc"]
                }
            ],
            "/project": [
                {
                    title: "webpack",
                    children: [
                        "/project/webpack/basic",
                        "/project/webpack/optimize",
                        "/project/webpack/tapable",
                        "/project/webpack/principle"
                    ]
                },
                {
                    title: "工程规范化",
                    children: [
                        "/project/standard/prettier",
                        "/project/standard/eslint",
                        "/project/standard/git"
                    ]
                }
            ],
            "/linux": [
                {
                    title: "linux",
                    children: [
                        "/linux/",
                        "/linux/service",
                        "/linux/soft",
                        "/linux/file",
                        "/linux/command",
                        "/linux/jenkins"
                    ]
                }
            ],
            "/nginx": [
                {
                    title: "nginx",
                    children: ["/nginx/", "/nginx/use", "/nginx/install"]
                }
            ],
            "/algo": [
                {
                    title: "数据结构与算法",
                    children: [
                        "/algo/",
                        "/algo/array",
                        "/algo/linked-list",
                        "/algo/heap-stack",
                        "/algo/priority-queue",
                        "/algo/dynamic-program"
                    ]
                }
            ],
            "/task": [
                {
                    title: "安排",
                    children: ["/task/2019"]
                }
            ]
        }
    }
};
