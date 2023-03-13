<template>
      <div id="tab-bar">
        <slot></slot>
      </div>
</template>
  
  <script>
  export default {
    name: 'TabBar'
  }
  </script>
  
  <style>
  
    #tab-bar{
      display: flex;
      background-color: rgb(232, 223, 223);
  
      /* 固定在屏幕下方 */
      position: fixed;
      right: 0;
      left: 0;
      bottom: 0;
  
      /* 设置阴影 */
      box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.2);
      z-index: 9;
    }
  </style>
  