<!--
 * @Author: **
 * @Date: 2021-01-31 16:43:14
 * @LastEditTime: 2021-01-31 18:05:22
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\Register.vue
-->
<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">xxxx后台管理系统</span>
        <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="register-form">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请输入确认密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {},
  data() {
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: ''
      }
    }
  }
}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(); */
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
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
</style>
