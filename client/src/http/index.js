/*
 * @Author: **
 * @Date: 2021-02-01 20:37:22
 * @LastEditTime: 2021-02-02 16:51:01
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\index.js
 */
import axios from 'axios'
import router from '../router/router'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('config', config)
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
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  // 获取错误状态码
  const status = error.response.data.errno
  // eslint-disable-next-line eqeqeq
  if (status == 6407) {
    // 判断 token 失效并跳转到登录页面
    sessionStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(error.response)
})

axios.defaults.baseURL = '/nvr/api'
