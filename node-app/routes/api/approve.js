/*
 * @Author: **
 * @Date: 2021-02-03 17:56:54
 * @LastEditTime: 2021-03-20 14:35:39
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\routes\api\approve.js
 */
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 待审批数据接口
const Approve = require('../../models/Approve')
// const { route } = require('./users')

router.get('/test', (req, res) => {
  res.json({msg: "approve works"})
})

module.exports = router
