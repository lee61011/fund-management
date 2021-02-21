/*
 * @Author: **
 * @Date: 2021-01-31 16:05:21
 * @LastEditTime: 2021-02-21 17:37:11
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import UserManage from '../components/system/UserManage.vue'
import FlowManage from '../components/system/FlowManage.vue'
import FundList from '../views/FundList.vue'
import ApproPend from '../views/ApproPend.vue'
import ApproOff from '../views/ApproOff.vue'
import Register from '../views/Register.vue'  
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      {path: '/infoshow', name: 'infoshow', component: InfoShow},
      {path: '/usermanage', name: 'usermanage', component: UserManage},
      {path: '/flowmanage', name: 'flowmanage', component: FlowManage},
      {path: '/fundlist', name: 'fundlist', component: FundList},
      {path: '/appropend', name: 'appropend', component: ApproPend},
      {path: '/approoff', name: 'approoff', component: ApproOff},
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
