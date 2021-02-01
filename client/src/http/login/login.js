/*
 * @Author: **
 * @Date: 2021-02-01 20:39:25
 * @LastEditTime: 2021-02-01 20:43:09
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\login\login.js
 */
import axios from 'axios'

// 用户登录
export const userLogin = params => {
  return axios.post('/systemmanage/userlogin', params)
}
