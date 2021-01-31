/*
 * @Author: **
 * @Date: 2021-01-27 19:28:32
 * @LastEditTime: 2021-01-31 13:22:48
 * @LastEditors: **
 * @Description: 
 * @FilePath: \node-app\config\passport.js
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
        console.log('passport_payload --------- ', jwt_payload)
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