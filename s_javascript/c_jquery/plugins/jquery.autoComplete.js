;
(function ($) {
    $.fn.extend({
        autoComplete: function (options) {
            // 合并配置
            options = $.extend({}, options, {
                data: []
            })

            let $body = $('body')
            let selector = $(this).selector
            $body.on('focus', selector, function () {
                console.log(1)
                return false
            })

            $body.on('keyup', selector, function () {

            })

            $body.on('click', '.autocomplete .item', function () {

            })

            $(window).on('click', function () {

            })

            function autoComplete(value) {

            }
        }
    })
})(jQuery);