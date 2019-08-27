---
title: css 动画
sidebar_label: css 动画
---

## animation

animation 由 6 部分组成：

- `animation-name`: 动画的名称，这是一个带 keyframes 类型的值，keyframes 用于定义动画帧。
- `animation-duration`: 动画的时长
- `animation-timing-function`: 动画的时间曲线
- `animation-delay`: 动画开始前的延迟
- `animation-iteration-count`: 动画的播放次数
- `animation-direction`: 动画的方向

## transition

transition 由 4 部分组成：

- `transition-property`: 过渡属性
- `transition-duration`: 过渡时长
- `transition-timing-function`: 过渡的时间曲线
- `transition-delay`: 延迟

## 贝塞尔曲线

### 原理

贝塞尔曲线是一种插值曲线，它描述两个点之间形成连续曲线形状的规则，最初被 1962 年就职于雷诺的法国工程师皮埃尔·贝塞尔用来设计车型。来看看二阶贝塞尔曲线是怎么画出来的。

![](/img/css/animation/1.jpg)

1. 在平面上有 3 个点 A、B、C，依次用线连起来。
2. 在 AB 和 BC 上找出点 D 和 E，使得 AD/AB = BE/BC。
3. 在连线 DE，上找到点 F，使得 DF/DE = AD/AB = BE/BC。
4. 把 D 点慢慢从 A 点移动到 B 点，找到所有的 F 点，连接起来。会得到一条光滑的曲线，这就是贝塞尔曲线。

下面来看看二阶贝塞尔曲线(1 个控制点)的动态图。

![](/img/css/animation/2.png)

一阶的贝塞尔曲线就是一条直线(0 个控制点)。

![](/img/css/animation/4.webp)

CSS 的动画使用的是三阶贝塞尔曲线(2 个控制点)：

![](/img/css/animation/3.png)

贝塞尔曲线的特点是：

1. 非常平滑。所以非常适合动画。
2. 只要改变中间的离散点，曲线就会随着改变。

三阶贝塞尔曲线公式：

![](/img/css/animation/5.png)

要注意，里面的 t 并不是时间，而是点移动时比例的变化。实际上，贝塞尔曲线的一个点 (x, y) 里的 x 轴才是时间。

所以，如果直接使用贝塞尔曲线公式，是没法根据时间计算数值的，所以浏览器中一般采用了数值算法，如下。

```js
function generate(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx ) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy ) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (let i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1;
        /* istanbul ignore next */
        var t0 = 0;

        /* istanbul ignore next */
        t2 = x;
        /* istanbul ignore next */
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}
```

上面代码完全看不懂，但是它可以实现和 CSS 一样的动画。

### 应用:抛物线运动的小球

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Simulation</title>
    <style>
        .ball {
            width: 10px;
            height: 10px;
            background-color: black;
            border-radius: 5px;
            position: absolute;
            left: 0;
            top: 0;
            transform: translateY(180px);
        }
    </style>
</head>

<body>
    <label> 运动时间：<input value="3.6" type="number" id="t" />s</label><br />
    <label> 初速度：<input value="-21" type="number" id="vy" /> px/s</label><br />
    <label> 水平速度：<input value="21" type="number" id="vx" /> px/s</label><br />
    <label> 重力：<input value="10" type="number" id="g" /> px/s²</label><br />
    <button onclick="createBall()"> 来一个球 </button>
    <script>
        // v 是速度、g 是重力、t 是总时间，返回值是
        function generateCubicBezier(v, g, t) {
            var a = v / g;
            var b = t + v / g;

            return [
                [(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
                [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]
            ];
        }

        function createBall() {
            var ball = document.createElement("div");
            var t = Number(document.getElementById("t").value);
            var vx = Number(document.getElementById("vx").value);
            var vy = Number(document.getElementById("vy").value);
            var g = Number(document.getElementById("g").value);
            ball.className = "ball";
            document.body.appendChild(ball)
            ball.style.transition = `left linear ${t}s, top cubic-bezier(${generateCubicBezier(vy, g, t)}) ${t}s`;
            setTimeout(function () {
                ball.style.left = `${vx * t}px`;
                ball.style.top = `${vy * t + 0.5 * g * t * t}px`;
            }, 10);
            setTimeout(function () {
                document.body.removeChild(ball);
            }, t * 1000);
        }
    </script>
</body>

</html>
```

## 参考资料

- [必须要理解掌握的贝塞尔曲线](https://www.jianshu.com/p/0c9b4b681724)
- 重学前端