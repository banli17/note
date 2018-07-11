const prices = ['7', 500, 8123, 12];


const a = prices.toLocaleString('hanidec', {style: 'currency', currency: 'JPY'})


console.log(prices, a)