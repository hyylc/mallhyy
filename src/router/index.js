import Vue from 'vue'
import VueRouter from 'vue-router'
// 懒加载
const Home = () => import("../views/home/Home")
const Cart = () => import("../views/cart/Cart")
const Search = () => import("../views/sear/Sear")
const Profile = () => import("../views/pro/Pro")

// 1.安装插件
Vue.use(VueRouter)

// 创建routes
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/sear',
    component: Search
  },
  {
    path: '/pro',
    component: Profile
  }
]

// 创建 router
const router = new VueRouter({
    mode: 'history',
    routes
})

// 导出router
export default router