<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
    class="tab-control-item" :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "TabControl",
    props: {
      // 固定有三个标题，只是名称不一样，因此这里不必使用插槽
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style>

.tab-control {
  display: flex;
  font-size: 15px;
  text-align: center;
}

.tab-control-item {
  flex: 1;
  height: 40px;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span{
  border-bottom: 3px solid var(--color-high-text);
}

</style>