<template>
  <div id="app">
<!--    排除Detail.vue-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <Main-Tab-Bar></Main-Tab-Bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
