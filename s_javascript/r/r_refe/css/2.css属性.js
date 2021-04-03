// var s = Object.keys(document.body.style).filter(e => !e.match(/^webkit/))

// console.log(s)



var iframe = document.createElement("iframe");

document.body.appendChild(iframe);

iframe.src = "https://www.w3.org/TR/2019/WD-css-lists-3-20190425/"

function happen(element, type) {
    return new Promise(resolve => {
        element.addEventListener(type, resolve, {
            once: true
        })
    })
}

happen(iframe, "load").then(function () {
    //Array.prototype.map.call(document.querySelectorAll("#container li[data-tag~=css] h2"), e=> e.children[0].href + " |\t" + e.children[0].textContent).join("\n")
    console.log(iframe.contentWindow);
})
async function start() {
    var output = []
    for (let standard of Array.prototype.slice.call(document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)"))) {
        console.log('xxx', standard.children[0].href);
        iframe.src = standard.children[0].href;
        await happen(iframe, "load");
        var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
        if (properties.length)
            output.push(standard.children[0].textContent + " | " + properties.join(", "));
    }
    console.log(output.join("\n"))
}
start();