let doSth = new Promise((resolve, reject) => {
    console.log('hello');
    resolve();
  });
  
  setTimeout(() => {
    doSth.then(() => {
      console.log('over');
    })
  }, 10000);