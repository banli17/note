var prices = {
    'p1': '$1.99',
    'p2': '$9.99',
    'p3': '$5.00'
};

var template = '<span id="p1"></span>'
    + '<span id="p2"></span>'
    + '<span id="p3"></span>';


var t = template.replace(/(<span id="(.+?)">)(<\/span>)/, function (match, $1, $2, $3) {
    return $1 + prices[$2] + $3
})

console.log(t) // <span id="p1">$1.99</span><span id="p2"></span><span id="p3"></span>