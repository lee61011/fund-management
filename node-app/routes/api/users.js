/*
 * @Author: **
 * @Date: 2021-01-24 13:53:24
 * @LastEditTime: 2021-03-20 17:22:00
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\routes\api\users.js
 */
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const User = require('../../models/User')
const passport = require('passport')

// router.get('/test', (req, res) => {
//   res.json({msg: "login works"})
// })

/*
  注册接口
*/
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有该邮箱
  User.findOne({email: req.body.email})
    .then((user) => {
      if (user) {
        // 邮箱已被注册
        return res.status(200).json({code: 1, message: '邮箱已被注册！'})
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          password: req.body.password
        })
        // 密码加密处理
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json({code: 0, message: '注册成功！'}))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

/*
  登录接口
*/
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(200).json({code: 1, message: '用户不存在！'})
      }
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {id: user.id, name: user.name, role: user.role}
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              return res.json({
                code: 0,
                success: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            return res.status(200).json({code: 1, message: '密码错误！'})
          }
        })
    })
})

/*
  获取当前登录用户信息
*/
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    code: 0,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  })
})

/*
  修改密码
*/
router.put('/userpasswd/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const id = req.params.id
  const newpwd = req.body.newpasswd
  try {
    let isMatch = await bcrypt.compare(req.body.passwd, req.user.password)
    if (!isMatch) return res.status(200).json({code: 1, message: '原密码错误！'})
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newpwd, salt, (err, hash) => {
        if (err) throw err
        User.findByIdAndUpdate(id, {$set: {password: hash}}, {new: true}, (err, user) => {
          if (err) {
            return res.status(500).json(err)
          }
          res.json({code: 0, message: '密码修改成功！'})
        })
      })
    })
  } catch(err) {
    res.status(500).json(err)
  }
})

/*
  获取人员列表
*/
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find()
    .then(users => {
      if (!users) {
        return res.status(404).json('没有任何内容')
      }
      res.json({
        code: 0, 
        data: users.map(item => ({
          id: item._id,
          role: item.role,
          name: item.name,
          email: item.email,
          date: item.date
        }))
      })
    })
  // const users = await User.find()
  // console.log('await 获取到的用户列表', users)
})

/*
  编辑用户角色(仅管理员角色可编辑)
*/
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (req.user.role !== '管理员') return res.json({code: 1, message: '仅管理员角色可编辑！'})
  User.findByIdAndUpdate(req.params.id, {$set: {role: req.body.role}}, {new: true}, (err, user) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json({code: 0, message: '角色编辑成功！'})
  })
})

module.exports = router
