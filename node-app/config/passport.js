/*
 * @Author: **
 * @Date: 2021-01-27 19:28:32
 * @LastEditTime: 2021-02-22 15:39:04
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\node-app\config\passport.js
 */
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
      .catch(err => {
        return done(err, false)
      })
  }))
}