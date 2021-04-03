; (function () {
    // 客服在线脚本
    var service = {
        html: '<div class="service_dialog" style="position:fixed;right:0;top:49%;"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=867889876&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:867889876:53" alt="范德萨范德萨" title="范德萨范德萨"/></a></div>',
        init: function(){
            this.createHtml()
        },
        createHtml: function(){
            let f = document.createDocumentFragment()
            f.innerHtml = service.html
            document.body.appendChild(f)
        }
    }

    service.init()
})();