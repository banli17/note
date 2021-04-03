<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  methods: {
    drawArrow(context) {
      context.beginPath();
      context.moveTo(200, 200);
      context.lineTo(400, 200);
      context.lineTo(400, 100);
      context.lineTo(500, 220);
      context.lineTo(400, 340);
      context.lineTo(400, 240);
      context.lineTo(200, 240);
      context.closePath();

      context.lineWidth = 10;
      context.strokeStyle = "#f50";
      context.fillStyle = "yellow";

      // 先描边，再填充，边框被覆盖掉
      // context.stroke();
      // context.fill();
      context.fill();
      context.stroke();
    }
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 800;

    const context = canvas.getContext("2d");

    console.log(context);
    this.drawArrow(context);
  }
};
</script>


<style scoped>
#canvas {
  border: 1px solid red;
}
</style>