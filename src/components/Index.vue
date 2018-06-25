<template>
    <div>
        <div id="sidebar" v-html="compiledSidebar"></div>
        <div id="content" :style="{width:contentWidth}" v-html="compiledContent" v-highlight></div>
        <div id="rightbar">
            <h2>搜索</h2>
            <div class="search">
                <input type="text" class="searchbox" v-model="searchText">
                <button class="searchbtn" @click="search">搜索</button>
            </div>
            <h2>友情链接</h2>
            <ul class="clearfix">
                <li v-for="o in nav" :key="o.url" class="text item" @click="go(o.url)">
                    {{o.text}}
                </li>
            </ul>
            <h2>文章目录</h2>
            <ul class="toc"></ul>
        </div>
        <div :class="['searchResult', searchResultVisible? 'visible':'']">
            <div class="searchResultList" @click.prevent.stop>
                <div v-if="searchResult && searchResult.length"
                     v-for="s in searchResult" class="searchResultItem" @click="goSearch(s.url)">
                    <div class="title">{{decodeURIComponent(s.title)}}</div>
                    <!--<div class="content">{{decodeURIComponent(s.content).substring(0, 50)}}...</div>-->
                </div>
                <div v-if="searchResult.length === 0">
                    没有搜索到结果
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                contentWidth: window.config.content.width || '900px',
                sidebar: "",
                content: "",
                clipboard: null,
                searchText: '',
                searchResult: [],
                searchResultVisible: false,
                nav: window.config.rightbar.friendLinks
            }
        },
        computed: {
            compiledSidebar() {
                return marked(this.sidebar, {sanitize: true})
            },
            compiledContent() {
                return marked(this.content, {sanitize: false})
            }
        },
        methods: {
            search() {
                const useGithubSearch = window.config.rightbar.search.github
                if (!useGithubSearch) {
                    this.searchResult = []
                    const searchReg = new RegExp(encodeURIComponent(this.searchText))
                    axios.get(window.config.api.search).then(res => {
                        for (let i in res.data) {
                            if (searchReg.test(res.data[i].title) || searchReg.test(res.data[i].content)) {
                                this.searchResult.push(res.data[i])
                            }
                            if (this.searchResult.length >= 15) {
                                break
                            }
                        }
                        this.searchResultVisible = true
                    })
                } else {
                    window.open(`${useGithubSearch}${this.searchText}`)
                }
            },
            go(url) {
                window.open(url)
            },
            goSearch(url) {
                console.log(url)
                this.getData(url)
                this.$router.replace({
                    path: url
                })
                this.searchResultVisible = false
            },
            async getSiderbar() {
                return new Promise((resolve, reject) => {
                    axios.get(window.config.leftbar.file).then(res => {
                        this.sidebar = res.data
                        console.log('getSiderbar')

                        setTimeout(() => {
                            resolve()
                        })
                    })
                })
            },
            getData(r) {
                if (r === '/') {
                    r = "/README"
                }
                axios.get(`/static${r}.md`).then(res => {
                    this.content = res.data
                })
            },
            initExpand() {
                // 初始化css

                const css = document.createElement('style')
                css.classList.add('expand')
                css.innerHTML = `
                        #sidebar>ul{display:none}
                        #siderbar .expand + ul {display:block}`
                document.head.appendChild(css)


                // 初始化事件
                // 设置左侧栏展开和收缩
                var h2 = document.querySelectorAll('#sidebar h2')

                h2.forEach(h => {
                    h.addEventListener('click',
                        e => {
                            e.target.classList.toggle('expand')

                            localStorage.setItem('sidebarExpand', e.target.innerText)
                        },
                        false)

                    try {
                        if (h.innerText == localStorage.getItem('sidebarExpand')) {
                            h.classList.add('expand')
                        }
                    } catch (e) {
                        throw new Error('expand error')
                    }
                })
            }
        },
        async created() {
            await this.getSiderbar()
            console.log('getSiderbar11')
            this.getData(this.$route.path)

            !window.config.leftbar.expand && this.initExpand()
        },
        watch: {
            $route(a, b) {
                if (a.path !== b.path) {
                    this.getData(this.$route.fullPath)
                }
            }
        },
        mounted() {
        },
        updated() {
            this.$nextTick(() => {
                Toc.init("#content")
                if (this.clipboard) {
                    this.clipboard.destroy()
                    this.clipboard = null
                }

                document.addEventListener('click', () => {
                    this.searchResultVisible = false
                }, false)
                // 复制按钮
                this.clipboard = new ClipboardJS(".night .copyBtn", {
                    text: function (trigger) {
                        return trigger.previousElementSibling.innerText
                    }
                })
                this.clipboard.on("success", function (e) {
                    e.trigger.classList.add("copied")
                    setTimeout(() => {
                        e.trigger.classList.remove("copied")
                    }, 3000)
                })

                window.scroll(0, 0)
                const navigation = document.querySelector("#sidebar")
                const as = document.querySelectorAll("#sidebar a");

                as.forEach(a => {
                    a.classList.remove("active")
                    if (this.$route.path && this.$route.path === a.pathname) {
                        a.classList.add("active")
                    }
                    a.addEventListener(
                        "click",
                        e => {
                            this.$router.push({
                                path: e.target.getAttribute("href")
                            })

                            e.preventDefault()
                        },
                        false
                    )
                })


                // 滚动时记录位置，方便页面刷新时恢复滚动位置
                navigation.addEventListener(
                    "scroll",
                    e => {
                        localStorage.setItem(
                            "sidebarScrollTop",
                            e.target.scrollTop || 0
                        )
                    },
                    false
                )

                // 设置左边栏滚动条
                navigation.scrollTop = localStorage.getItem("sidebarScrollTop")


            })
        },
        destroyed() {
        }
    }
</script>

<style scoped>

</style>

