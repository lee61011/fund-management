/*
 * @Author: **
 * @Date: 2021-01-24 13:57:46
 * @LastEditTime: 2021-02-06 17:19:21
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\models\User.js
 */
const bcrypt = require('bcryptjs')
const Crypto = require('../config/utils')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: '员工'
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', UserSchema)
// 初始化系统管理员账号
User.findOne({email: 'root@126.com'})
    .then((user) => {
      if (!user) {
        const newUser = new User({
          name: 'root',
          email: 'root@126.com',
          role: '管理员',
          // password: '123456'
          password: Crypto.encrypt(Crypto.encode(keys.initPwd))
        })
        // 密码加密处理
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => console.log(user))
              .catch(err => console.log(err))
          })
        })
      }
    })

module.exports = User
