console.log(destructuringArray( [1,[2,4],3], "[a,[b, d],c]" ))


function destructuringArray(values, keys){
    try{
      let obj = {}
      if(typeof keys === 'string'){
        keys = JSON.parse(keys.replace(/\w+/g, '"$&"'))
      }
      const iterator = (values, keys) => {
        keys.forEach((key,i)=>{
          if(Array.isArray(key)) iterator(values[i],key)
          else obj[key] = values[i]
        })
      }
      iterator(values, keys)
      return  obj
    }catch(e){
      console.log(e)
    }
}