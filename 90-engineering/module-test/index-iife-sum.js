((_ModuleAPI) => {

  const data = _ModuleAPI.api()
  const a = _ModuleAPI.handler(data, 'a')
  const b = _ModuleAPI.handler(data, 'b')

  console.log(sum(a, b));

  function sum(a, b) {
    return a + b
  }
})(window._ModuleAPI);
