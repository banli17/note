export class Mock {
  static getRandomIntArray(n = 10, max = 1000) {
    return Array.from(Array(n)).map(() => {
      return Math.ceil(Math.random() * max)
    })
  }
  static getRandomObjectArray(temp = {}, n = 1000, max = 1000) {
    return Array.from(Array(n)).map(() => {
      return {
        ...temp,
        num: Math.ceil(Math.random() * max)
      }
    })
  }
}
