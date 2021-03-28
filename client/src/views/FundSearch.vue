<!--
 * @Author: **
 * @Date: 2021-03-02 20:19:14
 * @LastEditTime: 2021-03-28 11:53:24
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\FundSearch.vue
-->
<template>
  <div class="fundsearch">
    <div class="title">{{ searchTitle }}</div>
    <div class="fundform">
      <el-form label-position="right" label-width="110px" :model="searchForm" key="searchForm" ref="searchForm">
        <div class="form-item-div">
          <el-form-item label="申请人" prop="proposer">
            <el-input v-model="searchForm.proposer" disabled></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="dealType">
            <el-select v-model="searchForm.dealType" disabled placeholder="请选择">
              <el-option
                v-for="item in dealTypeSelectData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-input v-model="searchForm.date" disabled></el-input>
          </el-form-item>
        </div>
        <div class="form-item-div">
          <el-form-item label="报销金额" prop="money">
            <el-input v-model="searchForm.money" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付状态" prop="payStatus">
            <el-input v-model="searchForm.payStatus" disabled></el-input>
          </el-form-item>
          <el-form-item label="财务组织" prop="orgName">
            <el-input v-model="searchForm.orgName" disabled></el-input>
          </el-form-item>
          
        </div>
        <div class="form-item-div">
          <el-form-item label="收款账户" prop="account">
            <el-input v-model="searchForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="openingBank">
            <el-input v-model="searchForm.openingBank" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付方式" prop="payType">
            <el-select v-model="searchForm.payType" disabled placeholder="请选择">
              <el-option
                v-for="item in payTypeSelectData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-div">
          <el-form-item label="所属部门" prop="proposerd">
            <el-input v-model="searchForm.proposerd" disabled></el-input>
          </el-form-item>
          <el-form-item label="费用承担部门" prop="bearFeesP">
            <el-input v-model="searchForm.bearFeesP" disabled></el-input>
          </el-form-item>
          <el-form-item label="目的" prop="goal">
            <el-input v-model="searchForm.goal" disabled  ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="funddetail">
      <h3>费用明细列表</h3>
      <!-- 报销详情明细列表 -->
      <el-table
        :data="detailTableData"
        stripe
        border
        size="mini"
        height="100%"
        style="width: 100%"
        :resizable="resizable">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
      </el-table>
    </div>

    <!-- 审批操作按钮 -->
    <template v-if="isExamines">
      <!-- 审批意见输入表单 仅审批页面显示 查看页不显示 -->
      <div class="examines-form">
        <el-form label-position="right" label-width="110px" :model="examinesForm" :rules="examinesRules" key="examinesForm" ref="examinesForm">
          <el-form-item label="审批意见" prop="approvalOpinion">
            <el-input v-model="examinesForm.approvalOpinion"></el-input>
          </el-form-item>
        </el-form>
        <div class="approve-btn-box">
          <el-button size="medium" type="primary" @click="consentBtnHandler('examinesForm')">同意</el-button>
          <el-button size="medium" @click="closeBtnHandler">关闭</el-button>
          <el-button size="medium" @click="rejectBtnHandler('examinesForm')">驳回</el-button>
        </div>
      </div>
    </template>
    <div class="flow-box-container">
      审批进度
      <flow-defined :flowStepList="flowStepList"></flow-defined>
    </div>
  </div>
</template>

<script>
import FlowDefined from  '@/components/system/FlowDefined.vue'

export default {
  name: 'fundsearch',
  components: {
    FlowDefined
  },
  created() {
    this.searchTitle = '报销单审批'
  },
  data() {
    return {
      searchTitle: '查看报销单',
      searchForm: {
        proposer: '张三', // 申请人
        dealType: '差旅费报销', // 交易类型
        date: '网银', // 日期
        money: '725.5', // 报销金额
        payStatus: '未支付', // 支付状态
        orgName: '软件开发部', // 财务组织
        account: '6217005522613581458', // 收款账户
        openingBank: '中国建设银行股份有限公司西安锦业一路支行', // 开户行
        payType: '网银', // 支付方式
        proposerd: '西安研发部', // 所属部门
        bearFeesP: '西安研发部', // 费用承担部门
        goal: '差旅费费用报销' // 目的
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
          index: '1',
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
          index: '2',
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
          index: '3',
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
      isExamines: true,
      examinesForm: {
        approvalOpinion: ''
      },
      examinesRules: {
        // 审批意见表单校验
        approvalOpinion: [
          { required: true, message: '请输入审批意见', trigger: 'blur' }
        ]
      },
      flowStepList: [
        {
          approvers: [
            {
              userName: '张三',
              userId: '000',
              disabled: true,
            }
          ],
          stepName: '第一步',
          stepNo: 1
        },
        {
          approvers: [
            {
              userName: '史强',
              userId: '001',
              type: 'success'
            }
          ],
          stepName: '第二步',
          stepNo: 2
        },
        {
          approvers: [
            {
              userName: '章北海',
              userId: '003',
              disabled: true,
              type: 'info'
            },
            {
              userName: '丁仪',
              userId: '004',
              disabled: true,
              type: 'info'
            }
          ],
          stepName: '第三步',
          stepNo: 3
        }
      ]
    }
  },
  methods: {
    // 同意操作
    consentBtnHandler(formName) {
      this.$refs[formName].validate((valid) => { // 审批意见表单校验
        if (!valid) return false;
        this.$confirm('是否确认执行同意审批操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            id: this.searchForm.receiptId,
            opinion: this.examinesForm.approvalOpinion
          }
          const res = awaitpostExamine(params)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '同意审批操作成功!'
            })
          }
        }).catch(() => {});
      })
    },
    // 关闭操作
    closeBtnHandler() {
      // this.$router.push({ path: 'fundlist' })
      console.log(this.$parent)
    },
    // 驳回操作
    rejectBtnHandler(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确认执行驳回操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // TODO SOMETHING
              this.$message({
                type: 'success',
                message: '驳回操作成功!'
              });
            }).catch(() => {});
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    }
  }
}
</script>

<style scoped>
.fundsearch {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}
.fundsearch .title {
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.fundsearch .fundform {
  width: 100%;
  height: 220px;
  margin-top: 20px;
  background: #F5F5F5;
}
.fundsearch .fundform .el-form {
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

.fundsearch .funddetail {
  width: 100%;
  /* height: calc(100% - 650px); */
  height: calc(100% - 720px);
  padding-top: 30px;
  margin-bottom: 60px;
}
.fundsearch .funddetail .tab-operate-btnbox {
  width: 120px;
  margin: 0 5px 5px 0;
  display: flex;
  justify-content: space-around;
  float: right;
}
.tab-operate-btnbox .el-button--mini {
  padding: 7px;
}
.fundsearch .funddetail h3 {
  float: left;
  line-height: 28px;
}

/* 审批操作表单、按钮 */
.fundsearch .examines-form {
  width: 100%;
  height: 140px;
  margin-top: 20px;
  background: #F5F5F5;
}
.fundsearch .examines-form .el-form {
  padding: 20px 20px 0 20px;
}
.fundsearch .examines-form .approve-btn-box {
  width: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}

/* 审批进度展示 */
.fundsearch .flow-box-container {
  margin-top: 20px;
}
</style>
