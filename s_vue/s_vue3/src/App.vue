<template>
  <div id="app">
    <router-view></router-view>

  <van-tabbar route>
     <van-tabbar-item to='/' icon="home-o">首页</van-tabbar-item>
     <van-tabbar-item to='/lessons' icon="search">课程</van-tabbar-item>
     <van-tabbar-item to='/mine' icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<style lang="scss">
</style>
