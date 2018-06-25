import Vue from "vue"
require("./theme.less")
require("@/assets/highlight.min.js")

hljs.configure({
    tabReplace: "    ", // 4 spaces
    classPrefix: "" // don't append class prefix
    // … other options aren't changed
})

let Highlight = {}

Highlight.install = function(Vue, options) {
    Vue.directive("highlight", function(el) {
        let blocks = el.querySelectorAll("pre code")
        blocks.forEach(block => {
            var copyBtn = document.createElement("i")
            copyBtn.className = "copyBtn"
            block.parentNode.appendChild(copyBtn)
            block.parentNode.className = "night"
            hljs.highlightBlock(block)
        })
    })
}
export default Highlight
