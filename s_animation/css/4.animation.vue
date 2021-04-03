<template>
  <div style="background:#0dc5c1;padding:50px;">
    <div class="box"></div>默认正向
    <div class="box animation-normal"></div>normal正向
    <div class="box animation-reverse"></div>reverse反向
    <div class="box animation-alternate"></div>alternate先正后反
    <div class="box animation-alternate-reverse"></div>alternate-reverse先反后正
    <div class="loading1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(30deg);
    /* background: blue; */
  }
  to {
    transform: rotate(100deg);
    /* background: red; */
  }
}
.box::after {
  display: block;
  clear: both;
}
.box {
  /* background: green; */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid #eee;
  border-top-color: #ccc;
  animation: rotate 1s infinite linear;
  animation-duration: 1s;
  /* animation-delay: 1s; */
  /* animation-fill-mode: backwards;
  animation-name: rotate; */
  /* animation-play-state: paused; */
}
.animation-normal {
  animation-direction: normal;
}
.animation-reverse {
  animation-direction: reverse;
}
.animation-alternate {
  animation-direction: alternate;
}
.animation-alternate-reverse {
  animation-direction: alternate-reverse;
}
.box:hover {
  /* animation-play-state: paused; */
}

@keyframes bounce {
  30% {
    transform: scaleY(0.5);
    background: #ec7133;
  }
  50% {
    transform: scaleY(1);
    background: #f50;
  }
  80% {
    transform: scaleY(1.5);
    background: #ec7133;
  }
}
.loading1 {
  width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.loading1 div {
  width: 8px;
  height: 30px;
  background: #f50;
  border-radius: 10px;
  animation-name: bounce;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.loading1 div:nth-child(1) {
  animation-delay: 0.1s;
}
.loading1 div:nth-child(2) {
  animation-delay: 0.2s;
}
.loading1 div:nth-child(3) {
  animation-delay: 0.3s;
}
.loading1 div:nth-child(4) {
  animation-delay: 0.2s;
}
.loading1 div:nth-child(5) {
  animation-delay: 0.1s;
}

.loader {
  color: #ffffff;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
