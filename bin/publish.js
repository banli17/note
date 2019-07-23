// hexo clean && hexo g && git add . && git commit -m'update' && git push
const {
    exec
} = require('child_process')
const commander = require('commander')

exec('hexo clean')
