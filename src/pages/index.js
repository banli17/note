function Home() {
    try {
        location.href = '/docs/f2e/html/index'
    } catch (e) {
        console.log(e)
    }
    return null
}

export default Home