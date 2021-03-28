/*
 * @Author: **
 * @Date: 2021-03-20 14:41:06
 * @LastEditTime: 2021-03-20 18:40:57
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\api\flow.js
 */
import axios from 'axios'

// 新建审批流程
export const addFlow = params => axios.post('/flowdefined/add', params)

// 获取审批流程列表
export const flowList = params => axios.get('/flowdefined/list')

// 删除审批流程
export const deleteFlow = params => axios.delete('/flowdefined/delete/' + params)

// 编辑审批流程
export const editFlow = params => axios.post(`/flowdefined/edit/${params.id}`, params.data)
