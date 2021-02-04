<!--
 * @Author: **
 * @Date: 2021-02-04 11:41:20
 * @LastEditTime: 2021-02-04 20:05:33
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\usermanage.vue
-->
<template>
  <div class="usermanage">
    <!-- 用户列表 -->
    <el-table
      :data="userTableData"
      stripe
      border
      size="medium"
      height="100%"
      style="width: 100%"
      :resizable="resizable">
      <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column
        v-for="(column, index) in tableColumns" :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :sortable="column.sortable"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑角色</el-button>
          <!-- <el-button size="mini" @click="userId = scope.row.id">编辑角色</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="重置角色"
      :visible.sync="roleDialog"
      width="380px"
      :before-close="handleClose">
      <el-select v-model="roleSelected" placeholder="请选择">
        <el-option
          v-for="item in roleSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrent, getUserList, putUserRole } from '@/http/login/login'

export default {
  name: 'usermanage',
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
      this.roleDialog = true
      this.roleSelected = row.role
      this.userId = row.id

      // this.$msgbox({
      //   title: '重置角色',
      //   message: h('el-select', {
      //     props: {
      //       value: this.roleSelected,
      //       'value-key': this.roleSelected
      //     },
      //     on: {
      //       // change: val => this.$nextTick(() => this.roleSelected = val),
      //       // change: val => console.log(val)
      //       change: val => this.roleSelected = val
      //     }
      //   }, this.roleSelect.map(item => {
      //     return h('el-option', {
      //       props: {
      //         value: item.value,
      //         label: item.label,
      //         key: item.value
      //       },
      //       on: {
      //         // click: console.log(value)
      //       }
      //     })
      //   })),
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
.usermanage {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  /* background: skyblue; */
}
</style>
