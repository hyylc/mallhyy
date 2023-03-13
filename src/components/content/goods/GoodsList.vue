<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item> 
  </div>
</template>


<script>
  import GoodsListItem from '@/components/content/goods/GoodsListItem.vue';

  export default {
    name: 'GoodsList',
    data() {
      return {

      }
    },
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components: {
      GoodsListItem,
    }

  }

</script>

<style scoped>
.goods {
    display: flex;
    /* 设置为包裹 */
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 3px;

  }
</style>