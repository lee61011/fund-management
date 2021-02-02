<!--
 * @Author: **
 * @Date: 2021-02-02 17:36:10
 * @LastEditTime: 2021-02-02 19:53:41
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\HeadNav.vue
-->
<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="" class="logo" alt="">
        <span class="title">xxxxx后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user-container">
        <div class="userinfo">
          <img src="" class="avatar" alt="">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div>
          <span class="username">
             <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  components: {},
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      switch(cmdItem) {
        case 'info':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showInfoList() {
      this.$router.push('/infoshow')
    },
    logout() {
      sessionStorage.removeItem('token')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}

.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
