/*
 * @Author: **
 * @Date: 2021-01-28 20:25:36
 * @LastEditTime: 2021-01-31 14:40:31
 * @LastEditors: **
 * @Description: 
 * @FilePath: \node-app\models\Profile.js
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
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

module.exports = Profile = mongoose.model('profile', ProfileSchema)
