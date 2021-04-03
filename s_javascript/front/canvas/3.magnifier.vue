<template>
  <div>
    <canvas id="canvas"></canvas>
    <canvas id="magnifier" style="display:none"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 300;

    const context = canvas.getContext("2d");

    const img = new Image();
    img.src =
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550292235388&di=bd527d1bdc3bfbc8094fe22325fb7501&imgtype=0&src=http%3A%2F%2Fs1.sinaimg.cn%2Fmw690%2F006wmg2Hzy73dot1Fug80";
    img.onload = function() {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const scale = 2;

    const magnifier = document.getElementById("magnifier");
    magnifier.width = canvas.width * scale;
    magnifier.height = canvas.height * scale;
    const magnifierContext = magnifier.getContext("2d");
    magnifierContext.drawImage(img, 0, 0, magnifier.width, magnifier.height);

    function getPosition(canvas) {
      const p = canvas.getBoundingClientRect();
      console.log(p);
      return { x: p.left, y: p.right };
    }

    function windowToCanvas(canvas, e) {
      let cp = getPosition(canvas);

      console.log(e);

      return {
        x: e.clientX - cp.x,
        y: e.clientY - cp.y
      };
    }

    canvas.addEventListener(
      "mousedown",
      e => {
        e.preventDefault();
        context.drawImage(magnifier, e.offsetX * scale, e.offsetY*scale, 100,100, );
        e.offsetX;
        e.offsetY;
      },
      false
    );
    canvas.addEventListener("mousemove", () => {}, false);
    canvas.addEventListener("mouseup", () => {}, false);
    canvas.addEventListener("mouseout", () => {}, false);
  }
};
</script>


<style scoped>
#canvas {
  border: 1px solid red;
}
button {
  margin-right: 10px;
}
</style>