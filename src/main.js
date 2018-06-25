// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Hightlight from "./basic/Highlight";
import "element-ui/lib/theme-chalk/index.css";

require('./config')


Vue.use(Hightlight);

require("normalize.css/normalize.css");
require("@/assets/book.less");

// 插件
require("@/assets/marked.js");

import Toc from "@/assets/toc.js";

window.Toc = Toc;

window.ClipboardJS = require("clipboard");
window.axios = axios;

Vue.config.productionTip = false;

Vue.filter('markedResult', function (val) {
    return marked(val, {sanitize: false})
})

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
