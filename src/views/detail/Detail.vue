<template>
<div id="detail">
    <detail-nav-bar @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll">  
            <!-- <div v-for="item in $store.state.cartList">
            {{ item }}
        </div>   -->
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgEvent"/>
        <detail-params-info :param-info="paramsInfo" ref="params"/>
        <detail-comment-info :comment="commentInfo" ref="comment"/>

        <goods-list :goods="recommends" ref="recommend"/>
        
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    
    <back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>
    
</div>

</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import { getDetail, Goods, Shop, GoodsParam, getDetailRecommend } from '@/network/detail'

import { debounced } from '@/common/utils';
import { backTopMixin } from '@/common/mixin'

import { mapActions } from 'vuex'

export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramsInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: {},
            heightRefresh: {},
            currentIndex: 0,
            

        }
    },
    mixins: [ backTopMixin ],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        DetailBottomBar,

        GoodsList,
        Scroll
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.id

        // 2.根据iid请求数据
        getDetail(this.iid).then(res => {
            // 1.获取数据
            const data = res.result
            console.log(data)

            // 2.获取顶部的轮播图数据
            this.topImages = data.itemInfo.topImages


            // 3.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 4.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 5.保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 6.保存商品参数信息
            this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        
            // 7.获取评论信息(先判断评论是否为空)
            if (data.rate.crate !== 0) {
                this.commentInfo = data.rate.list[0]
            }


            // 1.第一次获取，值不对
            // 原因：因为this.$refs.params.$el压根没有渲染
            // this.themeTopYs = []

            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)


            // this.$nextTick(() => {
            //     // 2.第二次获取，值不对
            //     // 原因：图片没有计算在内
            //     // 根据最新的数据，对应的DOM是已经被渲染出来的
            //     // 但是图片依然没有加载完，所以获取到的offsetTop不包含其中的图片
            //     // offsetTop值不对的时候都是图片的问题
            //     this.themeTopYs = []

            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

            //     console.log(this.themeTopYs)
            // })
           

        })

        // 3.请求推荐数据
        getDetailRecommend().then(res => {
            console.log(res)
            this.recommends = res.data.list
        })

        // 4.给getThemeTopY赋值
        this.getThemeTopY = debounced(() => {
            if (this.$refs.params && this.$refs.comment && this.$refs.recommend) {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            
            // console.log(this.themeTopYs)
            }
        }, 500)
        
    },
    mounted() {
        // 刷新高度
        this.heightRefresh = debounced(this.$refs.scroll.refresh, 500)

        // 1.监听goodsItem中图片加载完成
        this.$bus.$on('detailItemImageLoad', () => {
        //   console.log('图片加载----')
          this.heightRefresh()
          this.getThemeTopY()
        })

    },
    methods: {
        ...mapActions(['addCart']),
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        loadImgEvent() {
            // console.log('图片加载----')
            this.heightRefresh()
            this.getThemeTopY()
        },
        contentScroll(position) {
            // 1.获取y值
            const positionY = -position.y
            
            // 2.positionY 与四个高度进行对比
            if (positionY < this.themeTopYs[1]){
                this.$refs.nav.currentIndex = 0
            }
            else if (positionY < this.themeTopYs[2]){
                this.$refs.nav.currentIndex = 1
            }
            else if (positionY <this.themeTopYs[3]){
                this.$refs.nav.currentIndex = 2
            }
            else {
                this.$refs.nav.currentIndex = 3
            }

            // 判断backTop是否显示
            this.listenShowBackTop(position)
        },
        addToCart() {
            // 1.获取购物车需要展示的商品信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
           

            // 2.将商品添加到购物车里面
            this.addCart(product).then(res => {
                console.log(res)

                this.$toast.show(res, 2000)
            })

            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res)
            // })

        }
    }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* height: 100%; */
}


.content {
    height: calc(100vh - 44px);
    overflow: hidden;
    z-index: 9;
}

</style>