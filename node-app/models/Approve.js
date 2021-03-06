/*
 * @Author: **
 * @Date: 2021-02-03 17:55:12
 * @LastEditTime: 2021-03-20 14:33:17
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\models\Approve.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 待审批数据表结构
const ApproveSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    require: true
  },
  expend: {
    type: String,
    require: true
  },
  cash: {
    type: String,
    require: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Approve = mongoose.model('approve', ApproveSchema)
