(function (window) {
    let jQuery = function (selector, context) {
        return new jQuery.prototype.init(selector, context)
    }

    jQuery.fn = jQuery.prototype = {
        init: function (selector, context) {
            if (selector) {
                return document.querySelector(selector)
            }
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
})(window);