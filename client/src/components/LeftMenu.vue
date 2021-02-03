<!--
 * @Author: **
 * @Date: 2021-02-02 19:59:38
 * @LastEditTime: 2021-02-03 17:00:00
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\LeftMenu.vue
-->
<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff">
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="首页"></span>
          </el-menu-item>
          <template v-for="item in items">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template>
                <!-- <i :class="'fa fa-margin '" + item.icon></i> -->
                <span slot="title">{{ item.name }}</span>
              </template>
              <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{ citem.name }}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left-menu',
  components: {},
  data() {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '审批管理',
          path: 'fund',
          children: [
            {path: 'fundlist', name: '单据管理'}
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [
            {path: 'infoshow', name: '个人信息'}
          ]
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    if (this.user.role === '系统管理员') {
      this.items.push({
        icon: 'fa-asterisk',
        name: '系统管理',
        path: 'system',
        children: [
          {path: 'infoshow', name: '审批流程管理'},
          {path: 'infoshow', name: '用户信息管理'}
        ]
      })
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
