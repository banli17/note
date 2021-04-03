const a = '1000000.00'
let c = a.replace(/\B(?=(\d{3})+(?!\d))/g, function(a, b){
  return ','+a
})

console.log(c)