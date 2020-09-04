import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'Home'
    }
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
    //路由按需引入（路由懒加载）
  },
  {
    path: '/goods/:id',
    name: 'Goods',
    component: () => import('../views/Goods.vue')
    //路由按需引入（路由懒加载）
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
    //路由按需引入（路由懒加载）
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
    //路由按需引入（路由懒加载）
  },
  {
    path: '/reg',
    name: 'Reg',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    //路由按需引入（路由懒加载）
    // component: function () {
    //   return import('../views/About.vue')
    // }

    component: () => import('../views/Reg.vue')
    // component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router