export default {
        // addCart(state, payLoad) {
        //     // payLoad是新添加的商品
        //     // 1.查找是否已存在这个商品
        //     let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)

        //     // 2.判断oldProduct
        //     if (oldProduct) {
        //         oldProduct.count += 1
        //     } else {
        //         payLoad.count = 1
        //         state.cartList.push(payLoad)
        //     }
        // }


        // mutations唯一的目的就是修改state中的状态
        // mutations中的每个方法尽可能完成事件比较单一
        // 1.已经存在的商品，数量+1
        addCounter(state, payLoad) {
            payLoad.count += 1
        },

        // 2.添加新的商品
        addToCart(state, payLoad) {
            payLoad.checked = true
            state.cartList.push(payLoad)
        }
}