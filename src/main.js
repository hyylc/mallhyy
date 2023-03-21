import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1.导入toast
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 2.安装插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  // 4.挂载vue实例
  store
}).$mount('#app')
