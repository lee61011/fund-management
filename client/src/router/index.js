/*
 * @Author: **
 * @Date: 2021-01-31 16:05:21
 * @LastEditTime: 2021-02-02 19:46:26
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {path: '', component: Home},
      {path: '/home', name: 'home', component: Home},
      {path: '/infoshow', name: 'infoshow', component: InfoShow}
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('token') !== null
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
