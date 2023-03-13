<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
    <!-- <MainTabBar></MainTabBar> -->
  </div>
</template>

<script>
import MainTabBar from './components/content/mianTabbar/MainTabBar.vue';

export default {
  name: 'App',
  components: {
    MainTabBar,
}
}
</script>

<style>
  @import "./assets/css/base.css";

</style>
