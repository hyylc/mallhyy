<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
        
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    activeColor: {
        type: String,
        default: 'red'
      }
  },
  data() {
    return{
      // isActive: false
      
    }
  },
  computed: {
    isActive(){
      return this.$route.path == this.link
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      console.log('itemClick');
      this.$router.push(this.link)
    }
  }
}
</script>

<style>


  .tab-bar-item {
    flex: 1;
    text-align: center;
    /* tabbar高度一般是49px */
    height: 49px;

    font-size: 14px;
    margin-top: 3px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-bottom: -3px;
  }

</style>
