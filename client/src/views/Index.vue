<!--
 * @Author: **
 * @Date: 2021-01-31 16:18:46
 * @LastEditTime: 2021-02-02 20:39:11
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\index.vue
-->
<template>
  <div class="index">
    <head-nav></head-nav>
    <left-menu></left-menu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from  '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'

export default {
  name: 'index' ,
  components: {
    HeadNav,
    LeftMenu
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
