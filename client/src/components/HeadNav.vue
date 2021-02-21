<!--
 * @Author: **
 * @Date: 2021-02-02 17:36:10
 * @LastEditTime: 2021-02-21 15:21:39
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\HeadNav.vue
-->
<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="">
        <span class="title">报销管理系统</span>
      </el-col>
      <el-col :span="6" class="user-container">
        <div class="userinfo">
          <div class="avatar">
            <img src="../assets/avatar.gif" alt="">
          </div>
          <!-- <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div> -->
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
.logo-container {
  line-height: 60px;
  min-width: 400px;
  padding-left: 16px;
}
.logo {
  height: 25px;
  width: 175px;
  margin-right: 15px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user-container {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  background: #409EFF;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
}
/* .welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
} */
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
