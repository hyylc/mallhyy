<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>       
      </a>
    </div>
  </div>
</template>
  
  <script>
    // 导入轮播图
  
    export default {
      name: "RecommendView",
      components: {
      },
      props: {
        recommends: {
            type: Array,
            default(){
                return []
            }
        }
      }
    }
  
  </script>
  
  <style>
  .recommend {
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    /* 上面左右的空白 */
    padding: 10px 0 20px;
    /* 下边界 */
    border-bottom: 10px solid #eee;

  }
  .recommend-item {
    flex: 1;
  }

  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 8px;
  }
  </style>