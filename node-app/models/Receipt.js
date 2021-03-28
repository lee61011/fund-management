/*
 * @Author: **
 * @Date: 2021-03-17 15:04:29
 * @LastEditTime: 2021-03-23 14:49:00
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\models\Receipt.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema({
  money: { // 金额
    type: String,
    require: true
  },
  dealType: { // 交易类型
    type: String,
    require: true
  },
  approStatus: { // 单据状态
    type: String,
    require: true
  },
  payStatus: { // 支付状态
    type: String,
    require: true
  },
  approver: { // 最后一个审批人
    type: String,
    require: true
  },
  flowId: { // 审批流程
    type: String,
    require: true
  },
  financeDep: { // 财务组织
    type: String,
    require: true
  },
  bearFeesD: { // 费用承担部门
    type: String,
    require: true
  },
  bearFeesP: { // 费用承担项目
    type: String,
    require: true
  },
  proposerd: { // 申请人所属部门
    type: String,
    require: true
  },
  goal: { // 目的
    type: String,
    require: true
  },
  proposer: { // 申请人
    type: String,
    require: true
  },
  account: { // 收款账户
    type: String,
    require: true
  },
  openingBank: { // 开户行
    type: String,
    require: true
  },
  payType: { // 支付方式
    type: String,
    require: true
  },
  costDetailList: { // 费用明细列表
    type: String,
    require: true
  },
  examineProgress: { // 审批进度信息
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Receipt = mongoose.model('receipt', ReceiptSchema)