<!--
 * @Author: **
 * @Date: 2021-03-02 20:14:08
 * @LastEditTime: 2021-03-14 15:42:15
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\FundCreate.vue
-->
<template>
  <div class="fundcreate">
    <div class="title">新建报销单</div>
    <div class="fundform">
      <el-form label-position="right" label-width="110px" :model="createForm" :rules="eventFormRules" key="createForm" ref="createForm">
        <div class="form-item-div">
          <el-form-item label="申请人" prop="proposer">
            <el-input v-model="createForm.proposer"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="dealType">
            <el-select v-model="createForm.dealType" placeholder="请选择">
              <el-option
                v-for="item in dealTypeSelectData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式" prop="payType">
            <!-- <el-input v-model="createForm.payType"></el-input> -->
            <el-select v-model="createForm.payType" placeholder="请选择">
              <el-option
                v-for="item in payTypeSelectData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="日期" prop="date">
            <el-input v-model="createForm.date"></el-input>
          </el-form-item> -->
        </div>
        <div class="form-item-div">
          <el-form-item label="报销金额" prop="money">
            <el-input v-model="createForm.money" disabled></el-input>
          </el-form-item>
          <el-form-item label="财务组织" prop="orgName">
            <el-input v-model="createForm.userInp"></el-input>
          </el-form-item>
          <el-form-item label="审批流程" prop="approveFlow">
            <!-- <el-input v-model="createForm.payType"></el-input> -->
            <el-select v-model="createForm.approveFlow" placeholder="请选择审批流程">
              <el-option
                v-for="item in approveFlowSelectData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-div">
          <el-form-item label="收款账户" prop="account">
            <el-input v-model="createForm.account"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="openingBank">
            <el-input v-model="createForm.openingBank"></el-input>
          </el-form-item>
          <el-form-item label="目的" prop="goal">
            <el-input v-model="createForm.goal"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-div">
          <el-form-item label="所属部门" prop="proposerd">
            <el-input v-model="createForm.proposerd"></el-input>
          </el-form-item>
          <el-form-item label="费用承担部门" prop="bearFeesP">
            <el-input v-model="createForm.bearFeesP"></el-input>
          </el-form-item>
        </div>
      </el-form>
      
      <div class="button-box">
        <el-button size="medium" type="primary" @click="roleDialog = true">保存</el-button>
        <el-button size="medium" type="primary" @click="roleDialog = true">提交</el-button>
        <el-button size="medium" @click="roleDialog = true">取消</el-button>
      </div>
    </div>
    <div class="funddetail">
      <h3>费用明细列表</h3>
      <div class="tab-operate-btnbox">
        <el-button size="mini" title="添加行" icon="el-icon-document-add" @click="addBtnHandler"></el-button>
        <el-button size="mini" title="编辑行" icon="el-icon-edit" @click="editBtnHandler"></el-button>
        <el-button size="mini" title="删除行" icon="el-icon-delete" @click="deleteBtnHandler"></el-button>
      </div>
      <!-- 报销详情明细列表 -->
      <el-table
        :data="detailTableData"
        stripe
        border
        size="mini"
        height="100%"
        style="width: 100%"
        :resizable="resizable"
        @selection-change="detailSelectionChange">
        <!-- <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(column, index) in tableColumns" :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          show-overflow-tooltip
          align="center">
        </el-table-column>
      </el-table>
    </div>

    <!-- 费用明细列表信息填写对话框 -->
    <el-dialog
      :title="detailModalTitle"
      :visible.sync="detailTabModal"
      width="800px"
      :before-close="handleClose">
      <!-- 费用明细列表表单 -->
      <el-form :model="detailForm" :rules="detailRules" ref="detailForm" label-width="100px" class="demo-detailForm">
        <div class="detailLeft">
          <el-form-item label="报销事项" prop="matter">
            <el-input v-model="detailForm.matter"></el-input>
          </el-form-item>
          <el-form-item label="预算科目" prop="dubgetsSub">
            <el-input v-model="detailForm.dubgetsSub"></el-input>
          </el-form-item>
          <el-form-item label="费用科目" prop="costSub">
            <el-input v-model="detailForm.costSub"></el-input>
          </el-form-item>
        </div>
        <div class="detailRight">
          <el-form-item label="项目" prop="project">
            <el-input v-model="detailForm.project"></el-input>
          </el-form-item>
          <el-form-item label="税额" prop="amountPaid">
            <el-input v-model="detailForm.amountPaid"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="money">
            <el-input v-model="detailForm.money"></el-input>
          </el-form-item>
        </div>
        <div class="detailBottom">
          <el-form-item label="出发到达时间" prop="time">
            <el-date-picker
              v-model="detailForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" prop="">
            <el-input type="textarea" v-model="detailForm.remark" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm('detailForm')">添加</el-button>
            <el-button @click="resetForm('detailForm')">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'fundcreate',
  components: {},
  created() {
  },
  data() {
    return {
      createForm: {
        proposer: '', // 申请人
        dealType: '', // 交易类型
        date: '', // 日期
        money: '', // 报销金额
        payStatus: '', // 支付状态
        orgName: '', // 财务组织
        account: '', // 收款账户
        openingBank: '', // 开户行
        payType: '', // 支付方式
        proposerd: '', // 所属部门
        bearFeesP: '', // 费用承担部门
        goal: '' // 目的
      },
      dealTypeSelectData: [ // 报销类型
        {label: '差旅费报销', value: '差旅费报销'},
        {label: '日常费用报销', value: '日常费用报销'}
      ],
      payTypeSelectData: [ // 支付方式
        {label: '网银', value: '网银'},
        {label: '现金', value: '现金'},
        {label: '转账支票', value: '转账支票'},
        {label: '其他', value: '其他'},
      ],
      approveFlowSelectData: [ // 审批流程
        {label: '研发部审批流程', value: '研发部审批流程'},
        {label: '测试部审批流程', value: '测试部审批流程'},
        {label: '产品部审批流程', value: '产品部审批流程'},
        {label: '项目部审批流程', value: '项目部审批流程'},
      ],
      eventFormRules: {
        proposer: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        dealType: [
          { required: true, message: '请输入交易类型', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请输入支付方式', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入报销金额', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请输入财务组织', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        openingBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        proposerd: [
          { required: true, message: '请输入所属部门', trigger: 'blur' }
        ],
        bearFeesP: [
          { required: true, message: '请输入费用承担部门', trigger: 'blur' }
        ],
        approveFlow: [
          { required: true, message: '请输入审批流程', trigger: 'blur' }
        ],
      },
      tableColumns: [
        {sortable: true, prop: 'matter', label: '报销事项'},
        {sortable: true, prop: 'dubgetsSub', label: '预算科目'},
        {sortable: true, prop: 'costSub', label: '费用科目'},
        {sortable: true, prop: 'project', label: '项目'},
        {sortable: true, prop: 'departTime', label: '出发时间'},
        {sortable: true, prop: 'arriveTime', label: '到达时间'},
        {sortable: true, prop: 'amountPaid', label: '税额'},
        {sortable: true, prop: 'money', label: '金额'},
        {sortable: true, prop: 'remark', label: '备注'},
      ],
      detailTableData: [
        {
          matter: '差旅费',
          dubgetsSub: '差旅费',
          costSub: '差旅费',
          project: 'XXX项目',
          departTime: '2021-03-1',
          arriveTime: '2021-03-6',
          amountPaid: '0',
          money: '210',
          remark: '出差补贴',
        },
        {
          matter: '火车票',
          dubgetsSub: '差旅费',
          costSub: '差旅费',
          project: 'XXX项目',
          departTime: '2021-03-1',
          arriveTime: '2021-03-6',
          amountPaid: '0',
          money: '472.94',
          remark: '出差火车票费用',
        },
        {
          matter: '火车票税额',
          dubgetsSub: '增值税专用发票税额',
          costSub: '进项数额',
          project: '无项目',
          departTime: '2021-03-1',
          arriveTime: '2021-03-6',
          amountPaid: '42.56',
          money: '42.56',
          remark: '出差火车票税额',
        }
      ],
      resizable: true,
      detailModalTitle: '添加',
      detailTabModal: false,
      detailForm: {
        time: ''
      },
      detailRules: {
        matter: [
          { required: true, message: '请输入报销事项', trigger: 'blur' }
        ],
        dubgetsSub: [
          { required: true, message: '请输入预算科目', trigger: 'blur' }
        ],
        costSub: [
          { required: true, message: '请输入费用科目', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请输入项目', trigger: 'blur' }
        ],
        amountPaid: [
          { required: true, message: '请输入税额', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
      },
      multipleSelection: []
    }
  },
  methods: {
    addBtnHandler() {
      console.log('添加行')
      this.detailModalTitle = '添加行'
      this.detailTabModal = true
    },
    editBtnHandler() {
      console.log('修改行')
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '提示',
          message: '请选择一条要编辑的数据',
          type: 'warning'
        })
        return
      }
      this.detailModalTitle = '修改行'
      this.detailTabModal = true
    },
    deleteBtnHandler() {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择需要删除项',
          type: 'warning'
        })
        return
      }
      console.log('删除行')
    },
    detailSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.detailTabModal = false
    },
    detailModSubmit() {},

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.detailTabModal = false
    }
  }
}
</script>

<style scoped>
.fundcreate {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}
.fundcreate .title {
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.fundcreate .fundform {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  background: #F5F5F5;
}
.fundcreate .fundform .el-form {
  display: flex;
  padding: 30px 20px 15px;
}
.form-item-div {
  width: 25%;
}
.fundform .el-form-item .el-select {
  width: 100%;
}

.fundform .button-box {
  width: 260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.fundcreate .funddetail {
  width: 100%;
  height: calc(100% - 460px);
  padding-top: 30px;
}
.fundcreate .funddetail .tab-operate-btnbox {
  width: 120px;
  margin: 0 5px 5px 0;
  display: flex;
  justify-content: space-around;
  float: right;
}
.tab-operate-btnbox .el-button--mini {
  padding: 7px;
}
.fundcreate .funddetail h3 {
  float: left;
  line-height: 28px;
}

/* 添加详情明细列表行数据弹框样式 */
.fundcreate .demo-detailForm {
  display: flex;
  flex-wrap: wrap;
}
.fundcreate .demo-detailForm .detailLeft,
.fundcreate .demo-detailForm .detailRight {
  width: 50%;
}
.fundcreate .demo-detailForm .detailBottom {
  width: 100%;
}
.detailBottom .el-date-editor--daterange.el-input__inner {
  width: 280px;
}
.detailBottom .btnBox /deep/.el-form-item__content {
  width: 180px;
  margin: 0 auto !important;
  display: flex;
  justify-content: space-around;
}
</style>
