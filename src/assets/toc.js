const Toc = {
    init(el) {
        var toc = document.querySelector('#rightbar .toc')
        toc.innerHTML = ''
        let menu = []
        let childs = document.querySelector(el).children;
        // 添加id
        var contentH = document.querySelectorAll('#content h2, #content h3');
        [].slice.call(contentH).map(item => {
            item.id = encodeURIComponent(item.innerText.trim())
        })


        // 添加右菜单
        ;[].slice.call(childs).forEach(el => {
            let tag = el.tagName.toLowerCase()
            if (/h[23]/.test(tag)) {
                menu.push({
                    text: el.innerText,
                    level: tag.charAt(1)
                })
            }
        });
        var f = document.createDocumentFragment('ul')
        menu.map((m) => {
            var li = document.createElement('li')
            var a = document.createElement('a')
            li.className = `level-${m.level}`
            a.href = '#' + encodeURIComponent(m.text)

            a.innerText = m.text
            li.appendChild(a)
            f.appendChild(li)
        })
        toc.appendChild(f)
    },
}

export default Toc
