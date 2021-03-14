<!--
 * @Author: **
 * @Date: 2021-02-04 11:41:20
 * @LastEditTime: 2021-03-14 19:31:06
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\FlowManage.vue
-->
<template>
  <div class="flowmanage">
    <div class="btn-box">
      <el-button icon="el-icon-document-add" @click="createFlowModal = true">新建流程</el-button>
    </div>
    <!-- 用户列表 -->
    <div class="flow-definder-container">
      <div class="flow-definder-item" v-for="item in flowList" :key="item.name">
        <div class="flow-item-title">
          <span class="flow-name">{{ item.name }}</span>
          <span class="el-icon-edit" @click="flowEditBtnHandler"></span>
          <span class="el-icon-delete" @click="flowDeleteBtnHandler"></span>
        </div>
        <flow-defined></flow-defined>
      </div>
    </div>

    <!-- 新建流程对话框 -->
    <!-- before-close="createFlowModal = false" -->
    <el-dialog
      title="创建审批流程"
      :visible.sync="createFlowModal"
      width="800px">
      <!-- 费用明细列表表单 -->
      <el-form :model="flowForm" :rules="flowRules" ref="flowForm" label-width="120px" class="demo-flowForm">
        <el-form-item label="审批流程名称" prop="name">
          <el-input v-model="flowForm.name"></el-input>
        </el-form-item>

        <el-form-item class="btnBox">
          <el-button type="primary" @click="submitForm('flowForm')">添加</el-button>
          <el-button @click="resetForm('flowForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { getCurrent, getUserList, putUserRole } from '@/http/login/login'

import FlowDefined from './FlowDefined.vue'
export default {
  name: 'flowmanage',
  components: {
    FlowDefined
  },
  created() {
    // this.getUserListFun()
  },
  data() {
    return {
      // userTableData: [],
      // tableColumns: [
      //   {sortable: true, prop: 'name', label: '姓名'},
      //   {sortable: true, prop: 'email', label: '邮箱'},
      //   {sortable: true, prop: 'role', label: '角色'},
      //   {sortable: true, prop: 'date', label: '创建时间'},
      // ],
      // resizable: true,
      // roleSelect: [
      //   { value: '管理员', label: '管理员' },
      //   { value: '员工', label: '员工' },
      //   { value: '财务', label: '财务' },
      //   { value: '研发部管理', label: '研发部管理' },
      //   { value: '测试部管理', label: '测试部管理' },
      // ],
      // roleSelected: '员工',
      // roleDialog: false,
      // disabled: false,
      // userId: ''
      flowList: [
        {
          name: '研发部审批流程',
        },
        {
          name: '测试部审批流程',
        },
      ],
      createFlowModal: false,
      flowForm: {
        name: ''
      },
      flowRules: {
        name: [
          { required: true, message: '请输入审批流程名称', trigger: 'blur' }
        ]
      }
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
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('新建审批流程成功');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
      this.createFlowModal = false
    },
    flowEditBtnHandler() {
      console.log('编辑审批流程')
    },
    flowDeleteBtnHandler() {
      this.$confirm('是否确认执行删除审批流程操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO SOMETHING
        this.$message({
          type: 'success',
          message: '删除审批流程操作成功!'
        });
      }).catch(() => {});
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

.flowmanage .btn-box {
  margin-bottom: 20px;
}

.flowmanage .flow-definder-container .flow-definder-item {
  width: 900px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.flow-definder-item .flow-item-title {
  line-height: 36px;
}
.flow-definder-item .flow-item-title span {
  padding: 0 6px;
}
.flow-definder-item .flow-item-title .flow-name {
  width: 90%;
  padding-left: 10px;
  display: inline-block;
}

/* 新建审批流程对话框样式 */
.flowmanage .demo-flowForm /deep/.el-input__inner {
  width: 280px;
}
.flowmanage .demo-flowForm .btnBox /deep/.el-form-item__content {
  width: 180px;
  margin: 0 auto !important;
  display: flex;
  justify-content: space-around;
}
</style>
