;(function(window) {
    var Zepto = {}

    function Z(dom, selector) {
        var len = dom ? dom.length : 0
        for (var i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.selector = selector
        this.length = len
    }
    Zepto.fn = {
        constructor: Zepto,
        css: function() {},
        html: function() {}
    }

    Zepto.init = function(selector) {
        var dom = document.querySelectorAll(selector)
        return new Z(dom, selector)
    }

    function $(selector) {
        return Zepto.init(selector)
    }

    Z.prototype = $.fn = Zepto.fn
    window.$ = $
})(window)
