<!--
 * @Author: **
 * @Date: 2021-02-02 14:33:02
 * @LastEditTime: 2021-03-06 18:49:21
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\Login.vue
-->
<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">报销管理系统</span>
        <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="login-form">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { userLogin } from '@/http/login/login.js'
import jwt_decode from 'jwt-decode'
import Crypto from '@/assets/utils/cryptoAES'

export default {
  name: 'login',
  components: {},
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6到18位', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录接口
          let params = {
            email: this.loginUser.email,
            // password: this.loginUser.password
            password: Crypto.encrypt(Crypto.encode(this.loginUser.password))
          }
          userLogin(params)
            .then(res => {
              if (res.data.code !== 0) {
                this.$message.error(res.data.message)
                return
              }
              
              const token = res.data.token
              sessionStorage.setItem('token', token)
              // 解析token
              const decoded = jwt_decode(token)
              this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
              this.$store.dispatch('setUser', decoded)
              this.$router.push('/index')
            })
            .catch(err => console.log(err))
        } else {
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  /* color: pink; */
  display: block;
  margin-bottom: 20px;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>

