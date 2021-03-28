<!--
 * @Author: **
 * @Date: 2021-02-04 11:41:20
 * @LastEditTime: 2021-03-20 18:42:17
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\FlowManage.vue
-->
<template>
  <div class="flowmanage">
    <div class="btn-box">
      <el-button icon="el-icon-document-add" @click="createBtnHandler">新建流程</el-button>
    </div>
    <!-- 用户列表 -->
    <div class="flow-definder-container">
      <div class="flow-definder-item" v-for="item in flowListData" :key="item.id">
        <div class="flow-item-title">
          <span class="flow-name">{{ item.name }}</span>
          <span class="el-icon-edit" @click="flowEditBtnHandler"></span>
          <span class="el-icon-delete" @click="flowDeleteBtnHandler(item.id)"></span>
        </div>
        <flow-defined :flowStepList="flowStepList" :isEditFlow="item.isEditFlow"></flow-defined>
      </div>
    </div>

    <!-- 新建流程对话框 -->
    <!-- before-close="createFlowModal = false" -->
    <el-dialog
      :title="CFModalTitle"
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
import { addFlow, flowList, deleteFlow } from '@/http/api/flow'

import FlowDefined from './FlowDefined.vue'
const steps = [
  {
    approvers: [],
    stepName: '第一步',
    stepNo: 1,
    isApplicant: true
  },
  {
    approvers: [{
      userName: '章北海',
      userId: '001'
    }],
    stepName: '第二步',
    stepNo: 2
  },
  {
    approvers: [{
      userName: '史强',
      userId: '002'
    }],
    stepName: '第三步',
    stepNo: 3
  }
]
export default {
  name: 'flowmanage',
  components: {
    FlowDefined
  },
  created() {
    // this.getUserListFun()
    this.getFlowList()
  },
  data() {
    return {
      flowListData: [],
      createFlowModal: false,
      CFModalTitle: '新建审批流程',
      flowForm: {
        name: ''
      },
      flowRules: {
        name: [
          { required: true, message: '请输入审批流程名称', trigger: 'blur' }
        ]
      },
      flowStepList: [
        {
          approvers: [],
          stepName: '第一步',
          stepNo: 1,
          isApplicant: true
        },
        {
          approvers: [
            {
              userName: '章北海',
              userId: '001'
            },
            {
              userName: '史强',
              userId: '002'
            },
            {
              userName: '丁仪',
              userId: '003'
            }
          ],
          stepName: '第二步',
          stepNo: 2
        }
      ]
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
    getFlowList() {
      flowList().then(res => {
        res = res.data
        if (res.code === 0 && res.data.length !== 0) {
          this.flowListData = res.data.map(item => {
            item.isEditFlow = true
            item.steps = JSON.parse(item.steps)
            return item
          })
        } else if (res.data.length === 0) {
          this.flowListData = []
        }
      })
      .catch(err => console.log(err))
    },
    createBtnHandler() {
      this.createFlowModal = true
      this.CFModalTitle = '新建审批流程'
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name: this.flowForm.name,
            steps: JSON.stringify(steps),
            stepnum: steps.length - 1
          }
          addFlow(params)
            .then(res => {
              if (res.data.code === 0) this.createFlowModal = false
              this.getFlowList()
              return this.$message({
                type: res.data.code === 0 ? 'success' : 'error',
                message: res.data.message
              })
            })
            .catch(err => {})
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
      this.createFlowModal = true
      this.CFModalTitle = '编辑审批流程'
    },
    flowDeleteBtnHandler(id) {
      this.$confirm('是否确认执行删除审批流程操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFlow(id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除审批流程操作成功!'
            })
            this.getFlowList()
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: err.data
            })
          })
      }).catch(err => {});
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
