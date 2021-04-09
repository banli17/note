const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`  // 匹配标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`        // 匹配结束  </my:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`)    // 标签开始
const startTagClose = /^\s*(\/?)>/                            // 标签关闭      >   />
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)    // 匹配标签结尾 </div>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g      // {{xx}}

function parseHTML(html) {
    let root
    let currentParent
    let stack = []  // 用于检查 标签嵌套是否正确

    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) {
            root = element
        }
        currentParent = element
        stack.push(element)
        // console.log(tagName, attrs, `-–––${tagName}开始-------`)
    }

    function end(tagName) {
        // console.log(tagName, `-–––${tagName}结束-------`)
        let element = stack.pop()
        currentParent = stack[stack.length - 1]
        if (currentParent) {
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }

    function chars(text) {
        text = text.trim()
        if (text) {
            currentParent.children.push({
                type: 3,
                text
            })
        }
        // console.log(text, '------文本------')
    }

    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent: null
        }
    }

    function advance(n) {
        html = html.substring(n)
    }

    function parseStartTag() {
        const start = html.match(startTagOpen)
        // console.log('start', start)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length) // 删除匹配到的字符

            let end
            // 如果没有匹配到结束标签
            while (!(end = html.match(startTagClose))) {
                let attrs = html.match(attribute)
                match.attrs.push({
                    name: attrs[1],
                    value: attrs[3]
                })
                advance(attrs[0].length)
            }
            if (end) {
                // console.log(match)
                advance(end[0].length)
                return match
            }
        }
    }

    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            const startTagMatch = parseStartTag(html)
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        let text
        if (textEnd > 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length)
            chars(text)
        }
    }
    return root
}

export default parseHTML
