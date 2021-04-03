(function (window) {
    const rquickExpr = /^(\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
    let _jQuery = window.jQuery,
        _$ = window.$

    let jQuery = function (selector, context) {
        return new jQuery.prototype.init(selector, context)
    }


    jQuery.fn = jQuery.prototype = {
        init: function (selector, context) {
            var match, elem

            // 处理 $(''), $(false), $(null), $(undefined)
            if (!selector) {
                return this
            }

            // 处理 HTML String
            if (typeof selector === 'string') {

                // 如果是 $('<div>') 这种形式
                if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    // $('#div') 或 $('span') 等， match = ['#div', undefined, 'div']
                    match = rquickExpr.exec(selector)
                }

            } else if (selector.nodeType) {
                // 处理 $(document)  document.ready
            } else if (jQuery.isFunction(selector)) {
                // $(function(){})
                return jQuery.ready(selector)
            }

            // $($(div))
            if (selector.selector !== undefined) {
                this.selector = selector.selector
                this.context = selector.context
            }

            return jQuery.makeArray(selector, this)
        }
    }

    jQuery.prototype.init.prototype = jQuery.prototype

    jQuery.extend = jQuery.fn.extend = function () {

    }

    jQuery.each = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback.call(list[i], i, list[i])
        }
    }

    jQuery.fn = {
        on(name, x, data, callback) {

        },
        trigger() {

        }
    }

    jQuery.each(('blur focus focusin focusout load resize scroll unload click dbclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            return arguments.length > 0 ?
                this.on(name, null, data, fn) :
                this.trigger(name)
        }
    })

    window.$ = window.jQuery = jQuery

    // 首先在最前面保存 jQuery 和 $变量，释放时,将变量重置为之前的。
    // deep 表示释放 jQuery
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery
        }
        return jQuery
    }
})(window);