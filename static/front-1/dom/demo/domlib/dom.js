const J = function(selector) {
    this.selector = selector
    let els = document.querySelectorAll(selector)
    this.length = els.length
    ;[].slice.call(els).map((el, i) => {
        this[i] = el
    })
}
J.prototype = {
    constructor: J,
    removeClass(className) {
        for (var i = 0; i < this.length; i++) {
            className
                .trim()
                .split(/\s+/)
                .map(c => {
                    this[i].classList.remove(c)
                })
        }
    },
    addClass(className) {
        for (var i = 0; i < this.length; i++) {
            className
                .trim()
                .split(/\s+/)
                .map(c => {
                    this[i].classList.add(c)
                })
        }
    },
    append(el) {
        // 已有元素
        try {
            this[0].appendChild(el[0])
        } catch (e) {
            // 创建的与元素 $('<div>')
        }
    },
    appendTo(el) {
        try {
            el[0].appendChild(this[0])
        } catch (e) {}
    },
    prepend(el) {
        this[0].prepend(el[0])
    },
    prependTo(el) {
        el[0].prepend(this[0])
    },
    after(el) {
        this[0].after(el[0])
    },
    before(el) {
        this[0].before(el[0])
    },
    insertAfter(el) {
        el[0].after(this[0])
    },
    insertBefore(el) {
        el[0].before(this[0])
    },
    wrap() {},
    unwrap() {},
    wrapAll() {},
    wrapInner() {},
    replaceWith(el) {
        this[0].parentNode.replace(el, this[0])
    },
    replaceAll() {},
    empty() {
        this[0].innerHTML = ""
    },
    remove() {
        for (var i = 0; i < this.length; i++) {
            this[i].parentNode.removeChild(this[i])
            delete this[i]
        }
    },
    detach() {
        let cache = JSON.parse(JSON.stringify(this))
        for (var i = 0; i < this.length; i++) {
            this[i].parentNode.removeChild(this[i])
            delete this[i]
        }
        return cache
    }
}
let jQuery = function(selector) {
    return new J(selector)
}

let $ = jQuery
