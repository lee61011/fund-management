<!--
 * @Author: **
 * @Date: 2021-03-14 15:06:57
 * @LastEditTime: 2021-03-17 13:50:10
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\components\system\FlowDefined.vue
-->
<template>
  <div class="flowdefined">
    <!-- 审批流程项 -->
    <div class="flow-step-container">
      <div class="flow-step-item" v-for="item in flowStepList" :key="item.stepNo">
        <template v-if="item.hasOwnProperty('isApplicant')">
          <el-button type="primary">申请人</el-button>
        </template>
        <template v-else>
          <el-button v-for="approver in item.approvers" :key="approver.userId" :type="approver.type" :disabled="approver.disabled" @dblclick.native="btnDblHandler">{{ approver.userName }}</el-button>
        </template>
        <span class="arrows-box"></span>
      </div>
      <div class="flow-step-item" v-if="isEditFlow">
        <el-button @dblclick.native="btnDblHandler" icon="el-icon-plus">添加</el-button>
        <span class="arrows-box"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/http/api/login'

export default {
  name: 'flowmanage',
  components: {},
  props: {
    flowStepList: {
      type: Array,
      default: function() {
        return [{
          approvers: [],
          stepName: '第一步',
          stepNo: 1,
          isApplicant: true
        }]
      }
    },
    isEditFlow: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // this.getUserListFun()
  },
  data() {
    return {
      userTableData: []
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
    btnDblHandler(e) {
      if (!this.isEditFlow) return
      console.log('dblClick ------- ', e)
    }
  }
}
</script>

<style scoped>
.flowdefined {
  width: 100%;
}
.flowdefined .flow-step-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.flowdefined .flow-step-container .flow-step-item {
  width: 150px;
  margin: 20px 0 20px 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
.flowdefined .flow-step-container .flow-step-item
.el-button {
  margin-left: 0;
  margin-top: 5px;
  min-width: 90px;
}
.flowdefined .flow-step-container 
.flow-step-item:nth-last-child(1) .arrows-box {
  display: none;
}
.flowdefined .flow-step-container .flow-step-item .arrows-box {
  width: 50px;
  height: 2px;
  background: #409EFF;
  display: inline-block;
  margin-left: 10px;
  position: absolute;
  top: 50%;
  left: 86px;
}
.arrows-box::before {
  content: "";
  position: absolute;
  border: 8px solid transparent;
  border-left: 8px solid #409EFF;
  top: -7px;
  left: 50px;
}
</style>
