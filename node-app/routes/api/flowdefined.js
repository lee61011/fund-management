/*
 * @Author: **
 * @Date: 2021-02-05 10:45:04
 * @LastEditTime: 2021-03-20 18:38:51
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

/*
  添加审批流程
*/
router.post('/add', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const flow = await FlowDefined.findOne({name: req.body.name})
  if (flow) return res.json({code: 1, message: '名称已存在！'})
  const newFlow = new FlowDefined({
    name: req.body.name,
    steps: req.body.steps,
    stepnum: req.body.stepnum
  })
  newFlow.save()
    .then(flow => res.json({code: 0, message: '新建成功！'}))
    .catch(err => console.log(err))
})

/*
  获取审批列表
*/
router.get('/list', passport.authenticate('jwt', {session: false}), async (req, res) => {
  let flows = await FlowDefined.find()
  if (!flows) return res.json({code: 1, message: '没有任何内容！'})
  res.json({
    code: 0,
    data: flows.map(item => ({
      id: item._id,
      name: item.name,
      steps: item.steps,
      stepnum: item.stepnum
    }))
  })
})

// 修改审批列表数据
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const flow = {}
  if (req.body.name) flow.name = req.body.name
  if (req.body.steps) flow.steps = req.body.steps
  if (req.body.stepnum) flow.stepnum = req.body.stepnum

  FlowDefined.findOneAndUpdate(
    {_id: req.params.id},
    {$set: flow},
    {new: true}
  ).then(flow => res.json(flow))
})

// 删除审批列表数据
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  FlowDefined.findOneAndRemove({_id: req.params.id}).then(flow => {
    flow.save()
      .then(flow => res.json({code: 0, message: '删除成功！'}))
      .catch(proErr => res.json(proErr))
  }).catch(err => res.status(404).json('删除失败'))
})

module.exports = router
