const feed_options = {
    canonical_base: "https://www.banli17.com",
    is_feed_page: () => true,
    feeds: {
        rss2: {
            enable: true,
            file_name: "rss.xml",
            head_link: {
                enable: true,
                type: "application/rss+xml",
                title: "%%site_title%% RSS Feed"
            }
        }
        // atom1: {
        //     enable: true,
        //     file_name: "feed.atom",
        //     head_link: {
        //         enable: true,
        //         type: "application/atom+xml",
        //         title: "%%site_title%% Atom Feed"
        //     }
        // },
        // json1: {
        //     enable: true,
        //     file_name: "feed.json",
        //     head_link: {
        //         enable: true,
        //         type: "application/json",
        //         title: "%%site_title%% JSON Feed"
        //     }
        // }
    }
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
                    { text: "css", link: "/css/" },
                    { text: "javascript", link: "/language/japanese/" },
                    { text: "es6", link: "/es6/" },
                    { text: "jQuery", link: "/jquery/" },
                    // { text: "vue", link: "/vue/" },
                    { text: "浏览器", link: "/browser/" },
                    { text: "工程化", link: "/project/" }
                ]
            },
            {
                text: "数据库",
                items: [
                    { text: "sql 必知必会", link: "/sql/" },
                    { text: "mysql", link: "/mysql/" },
                    { text: "mongodb", link: "/mongo/" },
                    { text: "redis", link: "/language/japanese/" }
                ]
            },
            {
                text: "运维",
                items: [
                    { text: "linux", link: "/linux/" },
                    { text: "nginx", link: "/nginx/" },
                    { text: "python", link: "/python/" }
                ]
            },
            {
                text: "计算机基础",
                items: [
                    { text: "网络协议", link: "" },
                    { text: "计算机组成原理", link: "" },
                    { text: "设计模式", link: "" },
                    { text: "数据结构与算法", link: "/algo/" }
                ]
            },
            {
                text: "安排",
                link: "/task/2020"
            },
            { text: "Github", link: "https://github.com/banli17" }
        ],
        sidebar: {
            // "/vue": [
            //     // {
            //     //     title: "vue 总结",
            //     //     children: ["/vue/basic"]
            //     // },
            //     {
            //         title: "vue 源码分析",
            //         children: ["/vue/", "/vue/basic", "/vue/issues"]
            //     }
            // ],
            "/jquery": [
                {
                    title: "jQuery 源码分析",
                    children: [
                        "/jquery/",
                        "/jquery/overall",
                        "/jquery/extend",
                        "/jquery/selector",
                        "/jquery/callbacks",
                        "/jquery/deferred",
                    ]
                }
            ],
            "/f2e": [
                {
                    title: "webpack",
                    children: [

                    ]
                }
            ],
            "/es6": [
                {
                    title: "ES6系列",
                    children: [
                        "/es6/",
                        "/es6/let_const",
                    ]
                }
            ],
            "/browser": [
                {
                    title: "浏览器原理",
                    children: ["/browser/", "/browser/macro"]
                }
            ],
            "/project": [
                {
                    title: "webpack",
                    children: [
                        "/project/",
                    ]
                },
                {
                    title: "工程规范化",
                    children: [
                    ]
                }
            ],
            "/linux": [
                {
                    title: "linux",
                    children: [
                        "/linux/",
                        "/linux/txt",
                        "/linux/3",
                        "/linux/4",
                        "/linux/5",
                        // "/linux/service",
                        // "/linux/soft",
                        // "/linux/file",
                        // "/linux/command",
                        // "/linux/jenkins"
                    ]
                }
            ],
            "/nginx": [
                {
                    title: "nginx",
                    children: ["/nginx/"]
                }
            ],
            "/python": [
                {
                    title: "python",
                    children: ["/python/", "/python/base", "python/crawl"]
                }
            ],
            "/sql": [
                {
                    title: 'SQL 必知必会',
                    children: ["/sql/"]
                }
            ],
            "/mysql": [
                {
                    title: "mysql",
                    children: ["/mysql/"]
                }
            ],
            "/mongo": [
                {
                    title: "mongoDB",
                    children: ["/mongo/", "/mongo/mongoose"]
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
                        "/algo/dynamic-program",
                        "/algo/tree",
                    ]
                }
            ],
            "/task": [
                {
                    title: "日记",
                    children: ["/task/2020"]
                }
            ]
        }
    }
};
