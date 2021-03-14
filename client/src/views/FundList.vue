<!--
 * @Author: **
 * @Date: 2021-02-04 20:13:09
 * @LastEditTime: 2021-03-14 14:56:39
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\FundList.vue
-->
<template>
  <div class="fundmanage">
    <div class="fundmanage-title">申请列表</div>
    <div class="btn-container">
      <el-date-picker
        v-model="value1"
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="small" @click="roleDialog = true">筛选</el-button>
    </div>
    <div class="table-container">
      <!-- 用户列表 -->
      <el-table
        :data="userTableData"
        stripe
        border
        size="mini"
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
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <template v-if="scope.row.approStatus === '初始态'">
              <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
            <template v-if="scope.row.approStatus === '已驳回'">
              <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">重新申请</el-button>
            </template>
            <!-- <el-button size="mini" @click="userId = scope.row.id">编辑角色</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCurrent, getUserList, putUserRole } from '@/http/login/login'

export default {
  name: 'fundlist',
  components: {},
  created() {
    // this.getUserListFun()
  },
  data() {
    const approStatusEnum = ['初始态','提交态','审批中','已驳回','已完成']
    return {
      value1: '',
      userTableData: [
        { 
          index: 1,
          date: '2021-2-18',
          dealType: '日常费用报销',
          id: '264X202011130764',
          money: '160',
          approStatus: '初始态',
          payStatus: '未支付',
          approver: '-'
        },
        { 
          index: 2,
          date: '2021-2-20',
          dealType: '差旅费报销',
          id: '264X202011130741',
          money: '160',
          approStatus: '已完成',
          payStatus: '已支付',
          approver: '丁仪'
        },
        { 
          index: 3,
          date: '2021-2-21',
          dealType: '日常费用报销',
          id: '264X202011130723',
          money: '160',
          approStatus: '初始态',
          payStatus: '未支付',
          approver: '-'
        },
        { 
          index: 4,
          date: '2021-2-22',
          dealType: '日常费用报销',
          id: '264X202011130723',
          money: '200',
          approStatus: '已驳回',
          payStatus: '未支付',
          approver: '罗辑'
        }
      ],
      tableColumns: [
        // {sortable: true, prop: 'name', label: '姓名'},
        // {sortable: true, prop: 'email', label: '邮箱'},
        // {sortable: true, prop: 'role', label: '角色'},
        // {sortable: true, prop: 'date', label: '创建时间'},
        {sortable: true, prop: 'date', label: '单据日期'},
        {sortable: true, prop: 'dealType', label: '交易类型'},
        {sortable: true, prop: 'id', label: '单据编号'},
        {sortable: true, prop: 'money', label: '金额'},
        {sortable: true, prop: 'approStatus', label: '单据状态'},
        {sortable: true, prop: 'payStatus', label: '支付状态'},
        {sortable: true, prop: 'approver', label: '审批人'},
      ],
      resizable: false
    }
  },
  methods: {
    // getUserListFun() {
    //   getUserList()
    //     .then(res => {
    //       res = res.data
    //       if (res.code === 0 && res.data.length !== 0) {
    //         this.userTableData = res.data
    //         this.userTableData.map((item, index) => {
    //           item.index = index + 1,
    //           item.date = this.$moment(item.date).format('YYYY-MM-DD HH:mm:ss')
    //         })
    //       }
    //     })
    // },
    handleEdit(index, row) {
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
.fundmanage {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  /* background: skyblue; */
}

.fundmanage .fundmanage-title {
  width: 100%;
  text-align: center;
  line-height: 40px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #606266;
}

.table-container {
  width: 100%;
  height: calc(100% - 100px);
}
.btn-container {
  margin-bottom: 10px;
}
.btn-container button {
  margin: 0 20px 0 10px;
}
.btn-container >>> .el-checkbox__label {
  font-size: 12px;
}
</style>
