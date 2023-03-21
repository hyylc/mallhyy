import Vue from 'vue'
import VueRouter from 'vue-router'
// 懒加载
const Home = () => import("../views/home/Home")
const Cart = () => import("../views/cart/Cart")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/pro/Pro")
const Detail = () => import("../views/detail/Detail")



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
    path: '/category',
    component: Category
  },
  {
    path: '/pro',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

// 创建 router
const router = new VueRouter({
    mode: 'history',
    routes
})

// 导出router
export default router