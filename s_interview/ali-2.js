const yourFunction = function(func, threshold) {
  // 请实现
  let called = false
  return function(){
    if(called) return 
    called = setTimeout(()=>{
      func.apply(this, arguments)
      called = null
    }, threshold)
  }
 }
 const triggerSearch = yourFunction((val) => {
   const {
     onSearch
   } = this.props
   onSearch(val)
 }, 300)
 triggerSearch('hi')