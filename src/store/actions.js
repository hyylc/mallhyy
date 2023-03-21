export default {
    addCart(context, payLoad) {
        return new Promise((resolve, reject) => {
            // payLoad是新添加的商品
            // 1.查找是否已存在这个商品
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                context.commit('addCounter', oldProduct)
                resolve('当前商品数量 + 1')
            } else {
                payLoad.count = 1
                context.commit('addToCart', payLoad)
                resolve('添加新的商品')
            }
        })
    }
}
