/*
 * @Author: **
 * @Date: 2021-01-23 16:27:20
 * @LastEditTime: 2021-01-29 09:07:09
 * @LastEditors: **
 * @Description: 
 * @FilePath: \node-app\server.js
 */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

const db = require('./config/keys').mongoURI

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// app.get('/', (req, res) => {
//   res.end('hello world')
// })

// 使用Routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})