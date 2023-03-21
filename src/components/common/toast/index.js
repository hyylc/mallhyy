import Toast from './Toast'

const obj = {}


obj.install = function(Vue) {

    console.log(Vue)
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast) 

    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement("div"))


    // 4.将toast.$el对应的div添加到页面中
    document.body.appendChild(toast.$el)

    // 给Vue原型添加上挂载后的实例
    Vue.prototype.$toast = toast
    // console.log(Vue.prototype.$toast)
}


export default obj