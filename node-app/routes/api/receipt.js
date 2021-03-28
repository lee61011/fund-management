/*
 * @Author: **
 * @Date: 2021-03-17 19:21:26
 * @LastEditTime: 2021-03-25 10:55:51
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\routes\api\receipt.js
 */
const express = require('express')
const router = express.Router()
const passport = require('passport')

const Receipt = require('../../models/Receipt')
// const { route } = require('./users')

// router.get('/test', (req, res) => {
//   res.json({msg: "receipt works"})
// })

// 新建单据
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
  const receiptFields = {}
  if (req.body.money) receiptFields.money = req.body.money
  if (req.body.dealType) receiptFields.dealType = req.body.dealType
  if (req.body.approStatus) receiptFields.approStatus = req.body.approStatus
  if (req.body.payStatus) receiptFields.payStatus = req.body.payStatus
  if (req.body.flowId) receiptFields.flowId = req.body.flowId
  if (req.body.proposer) receiptFields.proposer = req.body.proposer
  if (req.body.costDetailList) receiptFields.costDetailList = req.body.costDetailList
  
  new Receipt(receiptFields).save()
    .then(receipt => res.json({code: 0, message: '新建成功！'}))
    .catch(err => console.log(err))
  // console.log('新建单据接口 --------- 001')
  // res.json({code: 0, message: '新建成功'})
})

// 修改审批单据
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // TODO SAVE
  // const receiptFields = {}
  // if (req.body.money) receiptFields.money = req.body.money
  // if (req.body.dealType) receiptFields.dealType = req.body.dealType
  // if (req.body.approStatus) receiptFields.approStatus = req.body.approStatus
  // if (req.body.payStatus) receiptFields.payStatus = req.body.payStatus
  // if (req.body.flowId) receiptFields.flowId = req.body.flowId
  // if (req.body.proposer) receiptFields.proposer = req.body.proposer
  // if (req.body.costDetailList) receiptFields.costDetailList = req.body.costDetailList
  
  // Receipt.findOneAndUpdate(
  //   {_id: req.params.id},
  //   {$set: receiptFields},
  //   {new: true}
  // ).then(receipt => res.json(receipt))
  console.log('编辑接口 -----------------  002')
  res.json({code: 0, message: '编辑成功'})
})

router.post('/submit', passport.authenticate('jwt', {session: false}), (req, res) => {
  const receiptFields = {}

  if (req.body.money) receiptFields.money = req.body.money
  if (req.body.dealType) receiptFields.dealType = req.body.dealType
  if (req.body.approStatus) receiptFields.approStatus = req.body.approStatus
  if (req.body.payStatus) receiptFields.payStatus = req.body.payStatus
  if (req.body.flowId) receiptFields.flowId = req.body.flowId
  if (req.body.proposer) receiptFields.proposer = req.body.proposer
  if (req.body.costDetailList) receiptFields.costDetailList = req.body.costDetailList

  if (req.body.hasOwnProperty('id')) {
    // 更新
  } else {
    // 新建
    new Receipt(receiptFields).save().then(receipt => {
      res.json(receipt)
      // TODO 单据保存成功  根据审批流程查询审批流程表  根据审批者新建待审批列表
    })
  }
})

module.exports = router
