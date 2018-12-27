<template>
    <el-container id="accounting" class="temlateMain">
        <el-header height="50px">
            <span :class="{tab_btn:true,active:TaskAct==1}" v-on:click="TaskAct=1" @click="tabInde()">明细账</span>
            <span :class="{tab_btn:true,active:TaskAct==2}" v-on:click="TaskAct=2" @click="tabInde()">总账</span>
            <span :class="{tab_btn:true,active:TaskAct==3}" v-on:click="TaskAct=3" @click="tabInde()">科目余额表</span>
            <div class="header-right">
              <el-button type="warning" size="medium" @click="exportBtn">导出</el-button>
            </div>
        </el-header>
        <el-main>
           <el-container>
               <el-header height="60px" style="padding-top:5px;">
                  <el-popover placement="bottom" :offset="100" width="525" trigger="click" v-model="visible_1">
                    <template>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                           <el-form-item label="活动时间">
                             <el-col :span="11">
                                <el-form-item prop="date1">
                                  <el-date-picker type="month" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                             </el-col>
                             <el-col class="line" :span="2" style="text-align: center">至</el-col>
                             <el-col :span="11">
                                <el-form-item prop="date2">
                                  <el-date-picker type="month" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                              </el-col>
                           </el-form-item>
                           <el-form-item>
                              <el-button @click="resetForm('ruleForm')" style="margin-right:100px;" size="small">重 置</el-button>
                              <el-button type="warning" @click="submitForm('ruleForm')" size="small">咨 询</el-button>
                           </el-form-item>
                       </el-form>
                    </template>
                    <div class="timeShow" slot="reference">
                      日期：
                      <el-input v-model="timeShow" style="width:250px;display: inline-block;" readonly=""></el-input>
                      <i class="el-input__icon el-icon-date"></i>
                    </div>
                  </el-popover>
                  <div class="header-right" v-show="TaskAct!=3">
                    <el-button icon="el-icon-arrow-left" size="small" v-on:click="forwardFun(1)"></el-button>
                    <el-button size="small" v-on:click="forwardFun(2)"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    <el-popover class="searchBox" placement="bottom" width="364" trigger="click" style="margin-left:20px;" v-model="visible_2">
                      <template>
                           <el-input placeholder="请输入科目编号/科目名称" suffix-icon="el-icon-search" v-model="filterText"></el-input>
                           <p class="titleT"><b></b>科目列表</p>
                           <el-tree class="filter-tree" :data="data2" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :filter-node-method="filterNode" ref="tree2" style="height:600px;overflow:auto;"></el-tree>
                      </template>
                      <el-button size="small" slot="reference">切换科目</el-button>
                    </el-popover>
                  </div>
               </el-header>
               <!--明细账-->
               <el-main v-show="TaskAct==1">
                  <el-container>
                     <el-header height="50px">
                       <div class="titleTable">
                         <span class="titleP"><b></b>科目：{{SubjectName}}</span>
                       </div>
                     </el-header>
                     <el-main class="accounting_box">
                         <el-table :data="tableData3" height="100%" border style="width: 100%">
                           <el-table-column prop="RecordDate" label="日期" width="180"></el-table-column>
                           <el-table-column prop="WordNumber" label="凭证字号" width="180"></el-table-column>
                           <el-table-column prop="Remark" label="摘要"></el-table-column>
                           <el-table-column prop="DebitMoney" label="借方金额"></el-table-column>
                           <el-table-column prop="CreditMoney" label="贷方金额"></el-table-column>
                           <el-table-column prop="Direction" label="方向"></el-table-column>
                           <el-table-column prop="Balance" label="余额"></el-table-column>
                         </el-table>
                     </el-main>
                  </el-container>
               </el-main>
               <!--总账-->
               <el-main v-show="TaskAct==2">
                  <el-container>
                     <el-header height="50px">
                       <div class="titleTable">
                         <span class="titleP"><b></b>科目：{{SubjectName}}</span>
                       </div>
                     </el-header>
                     <el-main class="accounting_box">
                         <el-table :data="tableData3" height="100%" border style="width: 100%">
                           <el-table-column prop="RecordDate" label="日期" width="180"></el-table-column>
                           <el-table-column prop="WordNumber" label="凭证字号" width="180"></el-table-column>
                           <el-table-column prop="Remark" label="摘要"></el-table-column>
                           <el-table-column prop="DebitMoney" label="借方金额"></el-table-column>
                           <el-table-column prop="CreditMoney" label="贷方金额"></el-table-column>
                           <el-table-column prop="Direction" label="方向"></el-table-column>
                           <el-table-column prop="Balance" label="余额"></el-table-column>
                         </el-table>
                     </el-main>
                  </el-container>
               </el-main>
               <!--科目余额表-->
               <el-main v-show="TaskAct==3">
<tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" :defaultExpandAll="defaultExpandAll"   :showSummary="true" treeType="unnormal" @Child_getSummaries="getSummaries">
            </tree-grid>
               </el-main>
           </el-container>
        </el-main>
    </el-container>
</template>

<script>
import TreeGrid from './components/treegrid'
import { getToken } from '@/utils/auth'
import * as finance from '@/api/finance'
import * as API from '@/api/finance_setting'
import { globalvariable } from '@/utils/globalvariable'

export default {
  data() {
    return {
      TaskAct: 1, // 切换页面
      timeShow: '', // 显示期间
      visible_1: false, // 日期弹窗
      visible_2: false,
      filterText: '', // 搜索关键字
      /** ********明细、总账*********** */
      list_startyear: '',
      list_startmonth: '',
      list_endyear: '',
      list_endmonth: '',
      list_busarsubjectid: '',
      list_operate: 0,
      list_type: 1,
      /** ******************* */
      SubjectName: '',
      ruleForm: {
        date1: '',
        date2: ''
      },
      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      tableData3: [],
      data2: [],
      defaultProps: {
        children: '',
        label: 'Key'
      },
      columns: [
        {
          text: '科目编号',
          dataIndex: 'SubjectCode'
        },
        {
          text: '科目名称',
          dataIndex: 'SubjectName'
        },
        {
          text: '期初余额',
          dataIndex: 'type',
          child: [{
            text: '借方',
            dataIndex: 'InitialDebitBalance'
          }, {
            text: '贷方',
            dataIndex: 'InitialCreditBalance'
          }]
        },
        {
          text: '本期发生额',
          dataIndex: 'ex',
          child: [{
            text: '借方',
            dataIndex: 'PeriodDebitMoney'
          }, {
            text: '贷方',
            dataIndex: 'PeriodCreditMoney'
          }]
        },
        {
          text: '期末余额',
          dataIndex: 'status',
          child: [{
            text: '借方',
            dataIndex: 'TerminalDebitMoney'
          }, {
            text: '贷方',
            dataIndex: 'TerminalCreditMoney'
          }]
        }
      ],
      dataSource: [],
      defaultExpandAll: true // 是否折叠树

    }
  },
  mounted() {
    this.initialTime()
    this.initial()
    this.GetSubjectDropDownList()
    this.GetSubjectBalanceTable()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    // 导出
    exportBtn() {
      console.log(this.TaskAct)
      if (this.TaskAct == 1) { // 明细账
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportDetailAccountList?request.token=' + getToken() + '&export=' + true +
      '&startyear=' + this.list_startyear + '&startmonth=' + this.list_startmonth + '&endyear=' + this.list_endyear +
      '&endmonth=' + this.list_endmonth + '&busarsubjectid=' + this.list_busarsubjectid + '&type=' + 1)
      } else if (this.TaskAct == 2) { // 总账
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportDetailAccountList?request.token=' + getToken() + '&export=' + true +
      '&startyear=' + this.list_startyear + '&startmonth=' + this.list_startmonth + '&endyear=' + this.list_endyear +
      '&endmonth=' + this.list_endmonth + '&busarsubjectid=' + this.list_busarsubjectid + '&type=' + 2)
      } else if (this.TaskAct == 3) { // 科目余额表GET
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportSubjectBalanceTable?request.token=' + getToken() + '&export=' + true +
      '&startyear=' + this.list_startyear + '&startmonth=' + this.list_startmonth + '&endyear=' + this.list_endyear +
      '&endmonth=' + this.list_endmonth)
      }
    },
    // 获取科目余额表
    GetSubjectBalanceTable() {
      console.log(this.list_startyear, this.list_startmonth, this.list_endyear, this.list_endmonth)
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetSubjectBalanceTable(getToken(), that.list_startyear, that.list_startmonth, that.list_endyear, that.list_endmonth)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.dataSource = response.data.Data
              resolve()
            } else {
              this.$message({
                message: response.data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 向前1、向后2
    forwardFun(num) {
      this.list_operate = num
      this.GetDetailAccountList()
    },
    // 切换刷新
    tabInde() {
      if (this.TaskAct == 3) {
        this.GetSubjectBalanceTable()
      } else {
        this.GetDetailAccountList()
      }
    },
    // 获取明细1、总账2数据
    GetDetailAccountList() {
      this.list_type = this.TaskAct
      console.log(this.list_startyear, this.list_startmonth, this.list_endyear, this.list_endmonth, this.list_busarsubjectid, this.list_operate, this.list_type)
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetDetailAccountList(getToken(), that.list_startyear, that.list_startmonth, that.list_endyear, that.list_endmonth, that.list_busarsubjectid, that.list_operate, that.list_type)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.SubjectName = response.data.Data.SubjectName
              that.tableData3 = response.data.Data.DetailList
              that.list_busarsubjectid = response.data.Data.SubjectID
              resolve()
            } else {
              this.$message({
                message: response.data.Data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取科目列表数据
    GetSubjectDropDownList() {
      const that = this
      return new Promise((resolve, reject) => {
        API.GetSubjectDropDownList(2, 0)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.data2 = response.data.Data
              that.list_busarsubjectid = response.data.Data[0].Value
              that.GetDetailAccountList()
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 判断是否初始化
    initial() {
      console.log(this.$store.state.user.financialInitial)
      if (!this.$store.state.user.financialInitial.ThirdStep) {
        this.$router.push({ path: '/finance/promptIndex' })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ((this.ruleForm.date2).getTime() > (this.ruleForm.date1).getTime()) { // 真确
            var month1 = (this.ruleForm.date1).getMonth() + 1
            month1 = (month1 < 10 ? '0' + month1 : month1)
            var month2 = (this.ruleForm.date2).getMonth() + 1
            month2 = (month2 < 10 ? '0' + month2 : month2)
            this.timeShow = (this.ruleForm.date1).getFullYear() + '年' + month1 + '期 - ' + (this.ruleForm.date2).getFullYear() + '年' + month2 + '期'
            this.visible_1 = false
            this.list_startyear = (this.ruleForm.date1).getFullYear()
            this.list_startmonth = (this.ruleForm.date1).getMonth() + 1
            this.list_endyear = (this.ruleForm.date2).getFullYear()
            this.list_endmonth = (this.ruleForm.date2).getMonth() + 1
            this.list_operate = 0
            if (this.TaskAct == 3) {
              this.GetSubjectBalanceTable()
            } else {
              this.GetDetailAccountList()
            }
          } else { // 错
            this.$message({
              message: '时间选择错误',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.visible_1 = false
      this.$refs[formName].resetFields()
    },
    initialTime() {
      var firstdate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)// 上个月
      var date = new Date()// 本月
      var month1 = (firstdate).getMonth() + 1
      month1 = (month1 < 10 ? '0' + month1 : month1)
      var month2 = (date).getMonth() + 1
      month2 = (month2 < 10 ? '0' + month2 : month2)
      this.timeShow = (firstdate).getFullYear() + '年' + month1 + '期 - ' + (date).getFullYear() + '年' + month2 + '期'
      this.list_startyear = (firstdate).getFullYear()
      this.list_startmonth = (firstdate).getMonth() + 1
      this.list_endyear = (date).getFullYear()
      this.list_endmonth = (date).getMonth() + 1
    },
    filterNode(value, data) {
      if (!value) return true
      return data.Key.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
      this.visible_2 = false
      this.list_busarsubjectid = data.Value
      this.list_operate = 0
      this.GetDetailAccountList()
    },
    getSummaries(param) { // 获取合计的方法
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] += ' 元'
        } else {
          // sums[index] = 'N/A'
        }
      })
      return sums
    }
  },
  components: {
    TreeGrid
  }
}

</script>

<style lang="scss" scoped>
.temlateMain {
  .el-header {
       .tab_btn {
          padding: 0 10px;
          display: inline-block;
          height: 50px;
          margin-right: 20px;
          cursor: pointer;
      }
      .tab_btn.active {
          border-bottom: 2px solid #f99740;
      }
    .header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            //padding: 20px;
         }
    }
  }

}
.timeShow{
  width: 300px;
  display: inline-block;
  position: relative;
  font-size: 14px;
  font-weight: normal;
  i{
   position: absolute;
   left:50px;
  }
}
form{
  padding-top: 20px;
}
#accounting{
  .accounting_box{
     padding:0 20px 20px 20px;
  }
}
</style>
<style>
.timeShow input{
    padding-left: 40px;
     cursor: pointer;
  }
  .timeShow .line.el-col.el-col-2{
      text-align: center;
  }
 .el-form-item__label {
    font-weight: normal;
    color:#8a8a8a;
  }
 #accounting .titleTable{
    border: 1px solid #EBEEF5;
    border-bottom: none;
    padding: 0 12px;
    font-size: 14px;
  }
  #accounting .titleTable b{
      display: inline-block;
      width: 4px;
      height: 14px;
      background-color: #f99740;
      margin-right: 8px;
      position: relative;
      top: 2px;
    }
   .titleT{
    border-bottom: 1px solid #EBEEF5;
    padding: 0 12px;
    font-size: 14px;
    height:30px;
    height:30px;
    margin-bottom: 0;
    font-weight: 700;
  }
   .titleT b{
      display: inline-block;
      width: 4px;
      height: 14px;
      background-color: #f99740;
      margin-right: 8px;
      position: relative;
      top: 2px;
  }
</style>

