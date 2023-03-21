<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <div>
                <cart-list-item v-for="(item, index) in cartList" 
                                :item="item"
                                :key="index">
            </cart-list-item> 
            </div>
            
        </scroll>
        
    </div>
</template>


<script>
    import { mapGetters } from 'vuex';

    import Scroll from '@/components/common/scroll/Scroll.vue';
    import CartListItem from './CartListItem.vue';
import { onActivated } from 'vue';


    export default {
        name: 'CartList',
        computed: {
            ...mapGetters([
                'cartList'
            ])
        },
        components: {
            Scroll,
            CartListItem
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }

</script>


<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px - 40px);
}
.content {
    height: 100%;
    overflow: hidden;
}

</style>