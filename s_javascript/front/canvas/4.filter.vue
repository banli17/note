<template>
  <div>
    <canvas id="canvas1"></canvas>
    <canvas id="canvas2"></canvas>
    <p>
      <button @click="greyEffect">灰度滤镜</button>
      <button @click="blackAndWhiteEffect">黑白滤镜</button>
      <button @click="reverseEffect">反转滤镜</button>
      <button @click="blurEffect">模糊滤镜</button>
      <button @click="mosaicEffect">马赛克滤镜</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas1: null,
      canvas2: null,
      context1: null,
      context2: null,
      sImageData: null
    };
  },
  methods: {
    reset() {
      this.sImageData = this.context1.getImageData(
        0,
        0,
        this.canvas1.width,
        this.canvas1.height
      );
      this.tmpPixelData = this.context1.getImageData(
        0,
        0,
        this.canvas1.width,
        this.canvas1.height
      ).data;
      this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
    },
    greyEffect() {
      this.reset();
      const pixelData = this.sImageData.data;
      for (var i = 0; i < this.canvas2.width * this.canvas2.height; i++) {
        const r = pixelData[4 * i + 0];
        const g = pixelData[4 * i + 1];
        const b = pixelData[4 * i + 2];
        const grey = r * 0.3 + g * 0.59 + b * 0.11;
        pixelData[4 * i + 0] = grey;
        pixelData[4 * i + 1] = grey;
        pixelData[4 * i + 2] = grey;
      }

      this.draw(this.sImageData);
    },
    draw(data) {
      this.context2.putImageData(
        data,
        0,
        0,
        0,
        0,
        this.canvas1.width,
        this.canvas1.height
      );
    },
    blackAndWhiteEffect() {
      this.reset();
      const pixelData = this.sImageData.data;
      for (var i = 0; i < this.canvas2.width * this.canvas2.height; i++) {
        const r = pixelData[4 * i + 0];
        const g = pixelData[4 * i + 1];
        const b = pixelData[4 * i + 2];
        const grey = r * 0.3 + g * 0.59 + b * 0.11;
        const v = 255;
        if (grey < 255 / 2) {
          v = 0;
        }
        pixelData[4 * i + 0] = v;
        pixelData[4 * i + 1] = v;
        pixelData[4 * i + 2] = v;
      }

      this.draw(this.sImageData);
    },
    reverseEffect() {
      this.reset();
      const pixelData = this.sImageData.data;
      for (var i = 0; i < this.canvas2.width * this.canvas2.height; i++) {
        const r = pixelData[4 * i + 0];
        const g = pixelData[4 * i + 1];
        const b = pixelData[4 * i + 2];

        pixelData[4 * i + 0] = 255 - r;
        pixelData[4 * i + 1] = 255 - g;
        pixelData[4 * i + 2] = 255 - b;
      }

      this.draw(this.sImageData);
    },
    blurEffect() {
      this.reset();
      const pixelData = this.sImageData.data;
      const blurRadius = 5;
      const totalNum = (2 * blurRadius + 1) * (2 * blurRadius + 1);
      console.log(this.canvas2.width, this.canvas2.height);
      for (let i = 0; i < this.canvas2.height; i++) {
        for (let j = 0; j < this.canvas2.width; j++) {
          let totalR = 0,
            totalG = 0,
            totalB = 0;
          for (let dx = -blurRadius; dx <= blurRadius; dx++) {
            for (let dy = -blurRadius; dy <= blurRadius; dy++) {
              // 当前点的坐标
              let x = i + dx;
              let y = j + dy;

              // 处理边界问题
              if (x < 0) x = i;
              if (y < 0) y = j;
              if (i + dy > this.canvas2.height) x = this.canvas2.height;
              if (j + dx > this.canvas2.width) {
                y = this.canvas2.width;
              }

              let p = x * this.canvas2.width + y;
              totalR += this.tmpPixelData[p * 4 + 0];
              totalG += this.tmpPixelData[p * 4 + 1];
              totalB += this.tmpPixelData[p * 4 + 2];
            }
          }

          let p = i * this.canvas2.width + j;
          pixelData[p * 4 + 0] = totalR / totalNum;
          pixelData[p * 4 + 1] = totalG / totalNum;
          pixelData[p * 4 + 2] = totalB / totalNum;
        }
      }
      this.draw(this.sImageData);
    },
    mosaicEffect() {}
  },
  mounted() {
    const canvas1 = document.getElementById("canvas1");
    canvas1.width = 500;
    canvas1.height = 300;
    this.canvas1 = canvas1;

    const context1 = canvas1.getContext("2d");
    this.context1 = context1;

    const canvas2 = document.getElementById("canvas2");
    canvas2.width = 500;
    canvas2.height = 300;
    this.canvas2 = canvas2;

    const context2 = canvas2.getContext("2d");
    this.context2 = context2;

    const img = new Image();
    img.src = require("./imgs/1.jpeg");

    img.onload = () => {
      context1.drawImage(img, 0, 0, canvas1.width, canvas1.height);
      //this.greyEffect();
    };
  }
};
</script>


<style scoped>
#canvas1,
#canvas2 {
  border: 1px solid red;
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
}
</style>