const getRangeDate = (startDate, endDate) => {
    let startTime = new Date(startDate.replace('-', '/')).getTime()
    let endTime = new Date(endDate.replace('-', '/')).getTime()
    const day = 24 * 60 * 60 * 1000
    const res = []

    while (startTime <= endTime) {
        const d = new Date(startTime)
        res.push(`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`)
        startTime += day
    }
    return res
}

console.log(getRangeDate('2015-2-8', '2015-3-3'))
console.log(getRangeDate('2015-2-8', '2015-2-9'))