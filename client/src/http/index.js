/*
 * @Author: **
 * @Date: 2021-02-01 20:37:22
 * @LastEditTime: 2021-02-21 19:06:28
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\index.js
 */
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = window.sessionStorage.getItem('token') || ''
  if (config.headers) { // 解决IE下请求缓存问题
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['Pragma'] = 'no-cache'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // 获取错误状态码
  const status = error.response.data.errno
  if (status == 6407) {
    // 判断 token 失效并跳转到登录页面
    sessionStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(error.response)
})

axios.defaults.baseURL = '/api'
