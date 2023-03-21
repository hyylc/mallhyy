<template>
  <div id='home' class="wrapper">
    <!-- 封装的导航 -->
    <nav-bar class="home-nav">
      <div slot="center">商城</div>
    </nav-bar>

    <tab-control :titles="['流行', '新款', '精选' ]"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control" v-show="isTabFixed"/>


    <scroll class="content"
            ref="scroll"
            :probe-type="3" 
            :pullUp-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!-- 1.未封装的轮播图 -->
      <!-- 这里有 bug，图片点进去再退出就能显示轮播图 -->
      <!-- <swiper>
        <swiper-item v-for="item in banners"> -->
          <!-- 绑定属性，要加冒号 -->
          <!-- <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </swiper-item>
      </swiper> -->

      <!-- 2.封装的轮播图 -->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <!-- 封装的推荐信息 -->
      <recommend-view :recommends="recommends"/>
      <!-- 封装的封面图片 -->
      <feature-view></feature-view>
      <!-- 控制显示内容 -->
      <tab-control :titles="['流行', '新款', '精选' ]"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>

    </scroll>

    <!-- native修饰符：监听一个组件的原生事件时使用（必须加才能监听） -->
    <back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>

  </div>
</template>
<script>
  // 一、公共组件
  import NavBar from 'components/common/navbar/NavBar.vue';
  import TabControl from 'components/content/tabControl/TabControl.vue';
  import GoodsList from '@/components/content/goods/GoodsList.vue';
  import Scroll from '@/components/common/scroll/Scroll.vue';
  import BackTop from '@/components/content/backTop/BackTop.vue';
  // 二、首页相关的组件
  // 1.导入未封装的轮播图
  // import { Swiper, SwiperItem } from 'components/common/swiper'
  // 2.封装轮播图
  import HomeSwiper from './childComps/HomeSwiper.vue';
  // 导入首页推荐信息组件
  import RecommendView from './childComps/RecommendView.vue';
  // 导入FeatureView组件
  import FeatureView from './childComps/FeatureView.vue';
  // 三、方法
  // 导入网络请求
  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounced } from '@/common/utils';
  import { backTopMixin } from '@/common/mixin';


  export default {
      name: "Home",
      data(){
        return {
          banners: [],
          recommends: [],
          goods: {
            // 流行
            'pop': {
              page: 0,
              list: []
            },
            // 新款
            'new': {
              page: 0,
              list: []
            },
            // 精选
            'sell': {
              page: 0,
              list: []
            },
          },
          currentType: 'pop',
          scroll: null,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0
        }
      },
      mixins: [backTopMixin],
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      components: {

        // 一、公共组件
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
        


        // 二、首页相关的组件
        // 1.未封装的轮播图
        // Swiper,
        // SwiperItem,
        // 2.封装的轮播图
        HomeSwiper,
        // 封装的推荐信息
        RecommendView,
        // 封面图片组件
        FeatureView
      },
      mounted() {
        // 1.监听goodsItem中图片加载完成
        const refresh = debounced(this.$refs.scroll.refresh, 500)
        this.$bus.$on('homeItemImageLoad', () => {
          // console.log('home----')
          refresh()
        })

      },
      methods: {
        // 事件监听的方法
        tabClick(index) {
          // console.log(index)
          switch (index) {
            case 0:
              this.currentType = 'pop'
            break;
            case 1:
              this.currentType = 'new'
            break;
            case 2:
              this.currentType = 'sell'
            break;
          }
          this.$refs.tabControl1.currentType = index
          this.$refs.tabControl2.currentType = index
        },
        backClick() {
          // 使用组件的scrollTo方法
          this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(position) {
          // 1.判断BackTop是否显示
          // this.isShowBackTop = (-position.y) > BACK_POSITION
          this.listenShowBackTop(position)

          // 2.决定tabControl是否吸顶（position: fixed）
          this.isTabFixed = (-position.y) > this.tabOffsetTop
          
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        },
        
        // 获取tabControl的offsetTop，但是组件没有offsetTop，要去template拿元素的offsetTop
        // 要等图片加载完后去拿offsetTop，否则高度不对
        // 轮播图的图片加载完后，取这个offsetTop，而且只需要发出一次事件
        swiperImageLoad() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },



        // 网络请求相关的方法
        getHomeGoods(type) {
          // 获取当前类型商品当前的page + 1
          const page = this.goods[type].page + 1
          // 发送网络请求，请求下一个page的数据
          getHomeGoods(type, page).then(res => {
            // 不能直接push数组
            // 可以使用语法：...将原来的数组中的数据拆开，一个个push到新的数组中
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        },
        getHomeMultidata() {
          getHomeMultidata()
          .then( res => {
            // console.log(res)
            // 数据保留下来，不会在函数结束时被销毁
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        }

      },
      // 生命周期函数，页面被创建就去请求数据
      created() {
        // 生命周期函数里协助要逻辑，具体的函数写在method里面
        // 1.请求多个数据(返回的是 Promise 对象，可以用 then 获得返回结果 res)
        this.getHomeMultidata()

        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      destroyed() {
        // console.log('destoryed')
      },
      activated() {
        // console.log('activated')
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        
      },
      deactivated() {
        // console.log('deactivated')
        this.saveY = this.$refs.scroll.scroll.y
      }
  }
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  /* 使用之前设置的css变量 */
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}

.tab-control {
  position: relative;
  z-index: 9;
  line-height: 40px;
} 
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>