/*
 * @Author: **
 * @Date: 2021-02-05 10:45:04
 * @LastEditTime: 2021-02-05 11:55:17
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\routes\api\flowdefined.js
 */
const express = require('express')
const router = express.Router()
const passport = require('passport')

const FlowDefined = require('../../models/FlowDefined')
// const { route } = require('./users')

// router.get('/test', (req, res) => {
//   res.json({msg: "flowdefined works"})
// })

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  FlowDefined.findOne({name: req.body.name})
    .then(flow => {
      if (flow) {
        return res.json({code: 1, message: '名称已存在'})
      } else {
        const newFlow = new FlowDefined({
          name: req.body.name,
          steps: req.body.steps,
          stepnum: req.body.stepnum
        })
        newFlow.save()
          .then(flow => res.json({code: 0, message: '新建成功！'}))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router
