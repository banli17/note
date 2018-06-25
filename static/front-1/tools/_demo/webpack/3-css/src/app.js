import base from './css/base.css'
import './css/common.css'

import util from './util'

util.say()
console.log('122234')

console.log($)
$.get('/1.json', function (data) {
	console.log(data)
})



if(module.hot){
	module.hot.accept()
}