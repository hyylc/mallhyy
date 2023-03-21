<template>
  <!-- 这里有 bug，图片点进去再退出就能显示轮播图 -->
  <swiper>
      <swiper-item v-for="item in banners">
        <!-- 绑定属性，要加冒号 -->
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>

</template>

<script>
  // 导入轮播图
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        if (!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
  }

</script>

<style>

</style>