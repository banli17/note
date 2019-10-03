# css 常用

## 渐变边框

```css
button {
    border: none;
    background-color: #fff;
    font-size: 40px;
    cursor: pointer;
    line-height: 1.8;
    width: 250px;
    /*   border: 5px solid transparent; */
    box-sizing: border-box;
    background-image: linear-gradient(#2e2e2e, #2e2e2e), linear-gradient(to
                bottom right, #0fd850, #f9f047);
    font-weight: 300;
    color: #2fd830;
    padding: 2px;
    border-radius: 100px;
    background-clip: content-box, padding-box;
    transition: filter 0.5s ease;
}
button:hover {
    filter: hue-rotate(90deg);
}
```

-   [如何实现 css 渐变圆角边框](https://www.cnblogs.com/imgss/p/11237170.html)
