<template>
    <div class="item_check">
      <div class="check_box" :class="{ checked: isChecked }"></div>
    </div>
  </template>

  <script>
  export default {
    name: 'CartCheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    }
  };
  </script>
  <style scoped>
 
  .check_box {
    position: relative;
    top: calc(50% - 0.35rem);
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
    border-radius: 50%;
    border: 0.04rem solid #aaa;
    background: url("~assets/img/cart/tick.svg") 0 0/90% no-repeat;
  }
  .checked {
    width: 1rem;
    height: 1rem;
    border-style: none;
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
  </style>