<template>
  <div>
    <canvas id="canvas"></canvas>
    <canvas id="watermark" style="display:none"></canvas>
    <p>
      <button @click="draw">平铺</button>
      <button @click="drawFlower">裁剪荷花</button>
      <button @click="drawFull">缩放至canvas</button>
      <button @click="drawWatermark">离屏canvas绘制水印</button>
      <input
        type="range"
        @change="drawScale"
        @input="drawScale"
        min="0.5"
        max="1.5"
        step="0.01"
        style="width:500px;display:block;margin-top:30px;"
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
      img: null,
      watermark: null,
      watermarkContext: null
    };
  },
  methods: {
    clearRect() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    draw() {
      this.clearRect();
      this.context.drawImage(this.img, 0, 0);
    },
    drawFull() {
      this.clearRect();
      this.context.drawImage(
        this.img,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },
    drawFlower() {
      this.clearRect();
      this.context.drawImage(this.img, 250, 50, 224, 410, 250, 50, 224, 410);
    },
    drawScale(e) {
      this.clearRect();
      const drawW = this.canvas.width * e.target.value;
      const drawH = this.canvas.height * e.target.value;
      const dx = this.canvas.width / 2 - drawW / 2;
      const dy = this.canvas.height / 2 - drawH / 2;
      this.context.drawImage(this.img, dx, dy, drawW, drawH);
    },
    drawWatermark() {
      this.watermarkContext.font = "bold 20px Arial";
      // watermarkContext.lineWidth = "1";
      this.watermarkContext.fillStyle = "rgba(255,255,255,0.3)";
      this.watermarkContext.textBaseline = "middle";
      this.watermarkContext.fillText("== xx.com ==", 10, 10);
      this.context.drawImage(this.watermark, 10, 10);
    }
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 300;
    this.canvas = canvas;

    const context = canvas.getContext("2d");
    this.context = context;

    const img = new Image();
    img.src =
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550292235388&di=bd527d1bdc3bfbc8094fe22325fb7501&imgtype=0&src=http%3A%2F%2Fs1.sinaimg.cn%2Fmw690%2F006wmg2Hzy73dot1Fug80";
    this.img = img;

    this.draw();

    // 水印
    const watermark = document.getElementById("watermark");
    watermark.width = 130;
    watermark.height = 80;
    this.watermark = watermark;
    this.watermarkContext = watermark.getContext("2d");
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