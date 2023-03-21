<template>
    <div id="cart_total">
      <div @click="checkClick" style="display: flex;" class="check-button">
        <cart-check-button :isChecked="checkAll" ref="checkButtonRef" class="check-button-item"/>
        <span>全选</span>
      </div>
      <div class="calc">总计：￥{{ totalPrice | keep2Decimal }}</div>
      <div class="buy" @click="buySth">去购买({{ totalLength }})</div>
    </div>
  </template>

  <script>

  import CartCheckButton from "./CartCheckButton.vue";

  export default {
    name: 'CartBottomBar',
    computed: {
      cartList() {
        return this.$store.state.cartList;
      },
      checkedItem() {
        return this.cartList.filter((item, index) => item.checked == true);
      },
      totalLength() {
        return this.checkedItem.length;
      },
      totalPrice() {
        return this.checkedItem.reduce(
          (pre, curr) => pre + curr.count * curr.price,
          0
        );
      },
      checkAll() {
        if (this.cartList.length == 0) {
          return false;
        } else {
          return this.cartList.every(value => value.checked == true);
        }
      }
    },
    components: {
      CartCheckButton
    },
    filters: {
      keep2Decimal(value) {
        return Math.round(value * 100) / 100;
      }
    },
    methods: {
      checkClick() {
        /* if (this.checkAll == true) {
          this.cartList.forEach(item => item.checked = false);
        } else {
          this.cartList.forEach(item => item.checked = true);
        } */
        let checkFlag = !this.checkAll;
        this.cartList.forEach(item => (item.checked = checkFlag));
      },
      buySth() {
        if (this.totalLength == 0) {
          this.$toast.show("请选择要购买的商品");
        } else {
          //====>购买界面，确认信息
        }
      }
    }
  };
  </script>
  <style scoped>
  #cart_total {
    height: 40px;
    display: flex;
    position: relative;
    background-color: rgb(249, 206, 214);
    line-height: 40px;
    text-align: center;

  }
   .check-button {
    flex: 1;
    align-items: center;
    
    }

    .check-button-item {
        margin-left: 10px;
        margin-right: 8px;
    }
  .calc {
    flex: 1;
  }
  .buy {
    width: 5rem;
    background-color: rgb(249, 158, 175);
    color: white;
    flex: 1;
  }
  </style>