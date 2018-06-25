;(() => {
    var container = document.querySelector(".swiper-container")
    var wrapper = document.querySelector(".swiper-wrapper")
    var items = document.querySelectorAll(".swiper-item")
    var itemsLen = items.length
    var itemWidth = document.documentElement.offsetWidth

    items[0].classList.add("active")
    wrapper.style.width = itemsLen + "00%"

    container.addEventListener("touchstart", start, false)
    container.addEventListener("touchmove", move, false)
    container.addEventListener("touchend", end, false)

    var startX = 0,
        moveX = 0,
        endX = 0,
        scrollDirection = 0,
        nowIndex = 0
    tx = 0

    wrapper.style.webkitTransform =
        "translateX(-" + nowIndex * itemWidth + "px)"
    function start(e) {
        wrapper.classList.remove("active")
        startX = e.touches[0].clientX
        var transform = window.getComputedStyle(wrapper).transform
        if (/matrix3d/.test(transform)) {
            console.log(transform)
            tx = transform.match(
                /matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, (.*), (.*), 0, 0, 1\)/
            )[2]
        } else {
            tx = transform.match(/0, 1,(.+)?, 0\)/)[1].trim()
        }
        console.log(tx)
        tx = Number(tx)
    }
    function move(e) {
        moveX = e.touches[0].clientX - startX
        setTransform(moveX + tx)
    }
    function end(e) {
        endX = e.changedTouches[0].clientX
        if (Math.abs(endX - startX) > 50) {
            if (endX > startX) {
                scrollDirection = -1 // 往右滑动
            } else {
                scrollDirection = 1 // 往左滑动
            }
        }
        scroll()
        clearX()
    }
    function setTransform(x) {
        wrapper.style.webkitTransform =
            "perspective(500px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0," +
            x +
            ", 0, 0, 1)"
    }
    function scroll() {
        wrapper.classList.add("active")

        console.log(items[nowIndex].classList)
        if (scrollDirection > 0) {
            if (nowIndex < itemsLen - 1) {
                nowIndex++
            }
        } else if (scrollDirection < 0) {
            if (nowIndex > 0) {
                nowIndex--
            }
        }
        // 修改tanslateX
        setTransform(-nowIndex * itemWidth)
    }

    function clearX() {
        startX = 0
        moveX = 0
        endX = 0
        scrollDirection = 0
    }
})()
