require.config({
    baseUrl: 'main',
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery',
        lodash: 'https://cdn.bootcss.com/lodash.js/4.17.10/lodash',
        a: './a',
        b: './b'
    }
})

require(['jquery', 'lodash', 'a'], function ($, _, a) {
    console.log($, _)
    console.log('ab', a.a())
})
