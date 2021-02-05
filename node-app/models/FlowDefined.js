/*
 * @Author: **
 * @Date: 2021-02-05 10:43:28
 * @LastEditTime: 2021-02-05 11:38:14
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\models\FlowDefined.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlowDefinedSchema = new Schema({
  // 审批流程名称
  name: {
    type: String,
    required: true
  },
  // 审批流程步骤
  steps: {
    type: String,
    required: true
  },
  // 审批流程总步骤数量
  stepnum: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = FlowDefined = mongoose.model('flowdefined', FlowDefinedSchema)
