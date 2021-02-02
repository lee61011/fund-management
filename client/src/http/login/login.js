/*
 * @Author: **
 * @Date: 2021-02-01 20:39:25
 * @LastEditTime: 2021-02-02 16:54:02
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\login\login.js
 */
import axios from 'axios'

// 用户注册
export const userRegister = params => axios.post('/api/users/register', params)
// 用户登录
export const userLogin = params => axios.post('/api/users/login', params)
