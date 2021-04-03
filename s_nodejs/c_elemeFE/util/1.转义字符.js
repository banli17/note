console.log(Array(255).fill(0)
  .map((_, i) => String.fromCharCode(i))
  .map(encodeURI))