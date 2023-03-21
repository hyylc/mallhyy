<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{ cartLength }})</div>
        </nav-bar>

        <!-- 商品列表 -->
        <cart-list/>


        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
        
    </div>
</template>


<script>
    import NavBar from '@/components/common/navbar/NavBar.vue';
    import CartList from './childComps/CartList.vue';
    import CartBottomBar from './childComps/CartBottomBar.vue';

    import { mapGetters } from 'vuex';

    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            // 语法一使用数组：这样就可以直接使用函数名作为计算属性
            ...mapGetters([
                'cartLength',
                // 'cartList'
            ]),

            // 语法二使用对象：用自己需要的计算属性名称，用函数名映射一下
            // ...mapGetters({
            //     length: 'cartLength',
            //     list: 'cartList'
            // })
                
        

        }
    }
</script>

<style scoped>
.cart {
    height: 100vh;
}
 .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* position: relative;
    top: 0px;
    left: 0px;
    right: 0px; */
 }
</style>