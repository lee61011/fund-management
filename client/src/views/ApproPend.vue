<!--
 * @Author: **
 * @Date: 2021-02-21 17:34:14
 * @LastEditTime: 2021-03-13 17:06:15
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\ApproPend.vue
-->
<template>
  <div class="appropend">
    <div class="appropend-title">待审批列表</div>
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
      <!-- 已审批 -->
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
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'appropend',
  components: {},
  created() {
  },
  data() {
    return {
      value1: '',
      userTableData: [
        { 
          index: 1,
          date: '2021-3-21',
          dealType: '差旅费报销',
          id: '264X202011130741',
          money: '160',
          approStatus: '提交态',
          payStatus: '未支付',
          approver: '章北海'
        },
        { 
          index: 2,
          date: '2021-3-10',
          dealType: '差旅费报销',
          id: '264X202011130351',
          money: '240',
          approStatus: '审批中',
          payStatus: '未支付',
          approver: '史强'
        },
        { 
          index: 3,
          date: '2021-3-1',
          dealType: '差旅费报销',
          id: '264X202011156286',
          money: '110',
          approStatus: '提交态',
          payStatus: '未支付',
          approver: '丁仪'
        },
        { 
          index: 4,
          date: '2021-2-22',
          dealType: '日常费用报销',
          id: '264X202011130723',
          money: '200',
          approStatus: '审批中',
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
  }
}
</script>

<style scoped>
.appropend {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  /* background: skyblue; */
}

.appropend .appropend-title {
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
