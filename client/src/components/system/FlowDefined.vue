<!--
 * @Author: **
 * @Date: 2021-03-14 15:06:57
 * @LastEditTime: 2021-03-14 19:12:41
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\FlowDefined.vue
-->
<template>
  <div class="flowdefined">
    <!-- 审批流程项 -->
  </div>
</template>

<script>
import { getUserList } from '@/http/login/login'

export default {
  name: 'flowmanage',
  components: {},
  created() {
    // this.getUserListFun()
  },
  data() {
    return {
      userTableData: [],
      tableColumns: [
        {sortable: true, prop: 'name', label: '姓名'},
        {sortable: true, prop: 'email', label: '邮箱'},
        {sortable: true, prop: 'role', label: '角色'},
        {sortable: true, prop: 'date', label: '创建时间'},
      ],
      resizable: true,
      roleSelect: [
        { value: '管理员', label: '管理员' },
        { value: '员工', label: '员工' },
        { value: '财务', label: '财务' },
        { value: '研发部管理', label: '研发部管理' },
        { value: '测试部管理', label: '测试部管理' },
      ],
      roleSelected: '员工',
      roleDialog: false,
      disabled: false,
      userId: ''
    }
  },
  methods: {
    getUserListFun() {
      getUserList()
        .then(res => {
          res = res.data
          if (res.code === 0 && res.data.length !== 0) {
            this.userTableData = res.data
          }
        })
    },
    handleEdit(index, row) {
      this.disabled = row.role === '管理员'
      this.roleDialog = true
      this.roleSelected = row.role
      this.userId = row.id
    },
    handleClose() {
      this.roleDialog = false
    }
  }
}
</script>

<style scoped>
.flowdefined {
  width: 100%;
  height: 80px;
  /* background: pink; */
}
</style>
