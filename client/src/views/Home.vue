<!--
 * @Author: **
 * @Date: 2021-02-02 19:39:32
 * @LastEditTime: 2021-02-21 15:28:48
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\Home.vue
-->
<template>
  <div class="home">
    <div class="container">
      <h1 class="title">欢迎进入报销管理系统</h1>
      <!-- <p class="lead"> 专注于线上教育, 用心做课程, 用心做服务! </p> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'home' ,
  components: {}
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 300px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>
