/*
 * @Author: **
 * @Date: 2021-03-20 19:02:04
 * @LastEditTime: 2021-03-25 10:49:16
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\http\api\fund.js
 */
import axios from 'axios'

// 新建审批流程
export const createFund = params => axios.post('/receipt/create', params)

// 获取审批流程列表
export const editFund = (id, params) => axios.put(`/receipt/edit/${id}`, params)

// // 删除审批流程
// export const deleteFlow = params => axios.delete('/flowdefined/delete/' + params)

// // 编辑审批流程
// export const editFlow = params => axios.post(`/flowdefined/edit/${params.id}`, params.data)
