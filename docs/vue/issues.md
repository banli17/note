# vue 开发问题

1. 判断 router.back 是否有返回。

```js
// 记录打开的第一个页面 url，用于回退时判断是否回到 app
let firstOpenUrl = "";

export default {
    methods: {
        onClickLeft() {
            if (this.$route.query && this.$route.query._from == "redeem") {
                return this.$router.go(-2);
            }
            this.$router.back();

            if (firstOpenUrl === this.$route.fullPath) {
                this.nativeAppCall("goBackMethod", { title: "app返回" });
            }
        },
        recordFirstOpenUrl() {
            if (!firstOpenUrl && this.$route.fullPath !== "/") {
                firstOpenUrl = this.$route.fullPath;
            }
        }
    },
    mounted() {
        this.computedHeaderHeight();
        this.recordFirstOpenUrl();
    },
    watch: {
        $route() {
            this.computedHeaderHeight();
            this.recordFirstOpenUrl();
        }
    }
};
```
