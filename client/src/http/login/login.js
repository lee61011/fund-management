/*
 * @Author: **
 * @Date: 2021-02-01 20:39:25
 * @LastEditTime: 2021-02-04 14:11:25
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\login\login.js
 */
import axios from 'axios'

// 用户注册
export const userRegister = params => axios.post('/users/register', params)
// 用户登录
export const userLogin = params => axios.post('/users/login', params)
// 获取当前用户信息
export const getCurrent = params => axios.get('/users/current')
// 获取用户列表
export const getUserList = params => axios.get('/users/list')
// 修改用户角色
export const putUserRole = params => axios.put(`/users/edit/${params.id}`, params.data)
