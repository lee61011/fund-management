<!--
 * @Author: **
 * @Date: 2021-02-04 11:41:20
 * @LastEditTime: 2021-02-06 17:28:01
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\FlowManage.vue
-->
<template>
  <div class="flowmanage">
    <!-- 用户列表 -->
    审批流程管理
  </div>
</template>

<script>
import { getCurrent, getUserList, putUserRole } from '@/http/login/login'

export default {
  name: 'flowmanage',
  components: {},
  created() {
    this.getUserListFun()
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
            this.userTableData.map((item, index) => {
              item.index = index + 1,
              item.date = this.$moment(item.date).format('YYYY-MM-DD HH:mm:ss')
            })
          }
        })
    },
    handleEdit(index, row) {
      this.disabled = row.role === '管理员'
      this.roleDialog = true
      this.roleSelected = row.role
      this.userId = row.id
    },
    saveRoleHandler() {
      const params = {
        id: this.userId,
        data: {
          role: this.roleSelected
        }
      }
      // console.log('params ---- ', params)
      putUserRole(params)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success('角色修改成功！')
            this.roleDialog = false
            this.getUserListFun()
          } else {
            this.$message.error('角色修改失败！')
          }
        })
    },
    handleClose() {
      this.roleDialog = false
    }
  }
}
</script>

<style scoped>
.flowmanage {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  /* background: skyblue; */
}
</style>
