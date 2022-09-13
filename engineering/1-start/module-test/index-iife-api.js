(function () {
  window._ModuleAPI = {
    api() {
      return {
        code: 0,
        data: {
          a: 1,
          b: 2
        }
      }
    },
    handler(data, key) {
      return data.data[key]
    }
  }
})();
