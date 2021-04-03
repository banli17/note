<template>
  <div class="playlist__cover mod_cover">
    <a
      href="https://y.qq.com/n/yqq/playsquare/5814176763.html#stat=y_new.index.playlist.pic"
      onclick="setStatCookie&amp;&amp;setStatCookie();"
      class="js_playlist"
      data-stat="y_new.index.playlist.pic"
      data-disstid="5814176763"
    >
      <img
        src="//p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE9F0u6oqZZRbFqvofmIdvlTlTNDoAz9A2g/300?n=1"
        onerror="this.src='//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000';this.onerror=null;"
        alt="每日新歌：王嘉尔神助攻演绎南美风"
        class="playlist__pic"
      >
      <i class="mod_cover__mask"></i>
      <i class="mod_cover__icon_play js_play" data-stat="y_new.index.playlist.play_btn"></i>
    </a>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
.playlist__cover {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border: 2px solid red;
  position: relative;
}
.playlist__pic {
  width: 200px;
  height: 200px;
}
.js_playlist:hover .playlist__pic {
  transform: scale(1.1);
  transition: transform 0.3s;
}
.mod_cover__mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  transition: 0.3s;
  z-index: 1;
}
.js_playlist:hover .mod_cover__mask {
  background: rgba(0, 0, 0, 0.1);
}
</style>
