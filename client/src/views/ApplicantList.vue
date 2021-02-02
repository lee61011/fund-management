<!--
 * @Author: **
 * @Date: 2021-02-02 20:27:52
 * @LastEditTime: 2021-02-02 20:31:34
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\ApplicantList.vue
-->
<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img src="" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{ user.role }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'applicant-list' ,
  components: {},
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      
    }
  }
}
</script>

<style scoped>

</style>

