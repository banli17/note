const escape = (str) => {
    // 防注入转码映射表
    const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        ' ': '&nbsp;',
        '"': '&quot;',
        "'": '&#39;',
        '\n': '<br/>',
        '\r': ''
    };

    return str.replace(/[<>$ "'\n\r]/g, (one) => {
        return escapeMap[one];
    });
}

console.log(escape(`<>& "'

`))