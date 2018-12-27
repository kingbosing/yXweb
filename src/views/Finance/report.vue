<template>
     <el-container class="temlateMain" id="report"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span :class="{tab_btn:true,active:getNavigation()==1}" v-on:click="TaskAct=1">资产负债表</span>
            <span :class="{tab_btn:true,active:getNavigation()==2}" v-on:click="TaskAct=2">利润表</span>
            <!-- <span :class="{tab_btn:true,active:getNavigation()==3}" v-on:click="TaskAct=3">现金流量表</span> -->
             <div class="header-right">
               <el-button type="warning" size="small" v-if="getNavigation()==3" @click="showDetail=true">明 细</el-button>
               <el-button type="warning" size="small" @click="exportBtn">导 出</el-button>
            </div>
        </el-header>
        <el-main class='content'>
            <el-container>
                <el-header height="70px">
                    <p class="getDate">
                        <span>日期：</span>
                        <el-date-picker
                            v-model="getDateMou"
                            type="month"
                            format="yyyy年MM期"
                            value-format='yyyy-MM'
                            placeholder="选择月">
                        </el-date-picker>
                    </p>
                </el-header>
                <el-main class="tableMain">
                    <balance-sheet v-if="getNavigation()==1&&AssetLiabilityList.length>0" :dateMou="AssetLiabilityList" :SubjectList='SubjectDropDownList'></balance-sheet>
                    <cash-flow v-if="getNavigation()==3" :dateMou="getDateMou"></cash-flow>
                    <profit v-if="getNavigation()==2" :dateMou="ProfitList" :SubjectList='SubjectDropDownList'></profit>
                </el-main>
            </el-container>
        </el-main>

        <el-dialog
          title="现金流量明细账"
          :visible.sync="showDetail"
          width="1080px"
          >
          <div class="dialog_report">
            <div class="dialog_content">
              <div class="content">
                <template>
                  <el-table
                    :data="setData(DetailList)"
                    border
                    :span-method="arraySpanMethod"
                    center>

                    <el-table-column
                      prop="des"
                      label="摘要"
                      min-width="26">
                      <template  slot-scope="scope">
                        <span v-if="scope.$index % 2 === 0">{{scope.row.time}}</span>
                        <span v-else>{{scope.row.des}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="name"
                      label="科目"
                      min-width="34">
                    </el-table-column>

                    <el-table-column
                      prop="valueIn"
                      label="流入金额"
                      min-width="15">
                    </el-table-column>

                    <el-table-column
                      prop="valueOut"
                      label="流出金额"
                      min-width="15">
                    </el-table-column>

                    <el-table-column
                      prop="address"
                      label="现金流量项目"
                      min-width="40">
                      <template  slot-scope="scope">
                        <p style="text-align: left;margin:0;">{{scope.row.address}}
                          <b class="icon_edit" @click="showItems=true"></b>
                        </p>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
            <div slot="footer"  class="dialog_footer">
              <el-button size="medium " @click="showDetail = false">取 消</el-button>
              <el-button type="warning" size="medium " @click="showDetail = false">确 定</el-button>
            </div>

          </div>
        </el-dialog>

        <el-dialog
          title="选择现金流量项目"
          :visible.sync="showItems"
          width="400px">
          <div style="height:400px">

          </div>

          <div slot="footer" class="dialog_footer">
            <el-button size="medium " @click="showItems = false">取 消</el-button>
            <el-button type="warning" size="medium " @click="showItems = false">确 定</el-button>
          </div>
        </el-dialog>
     </el-container>
</template>

<script>
import profit from './report_component/profit'
import cashFlow from './report_component/cash_flow'
import balanceSheet from './report_component/balanceSheet'

import icon_edit_normal from '@/assets/finance/icon_edit_normal.jpg'
import icon_edit_selected from '@/assets/finance/icon_edit_selected.jpg'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'

import { GetProfitList, LoadProfitFormulaList, GetAssetLiabilityList } from '@/api/finance'
import { GetSubjectDropDownList } from '@/api/finance_setting'
import { globalvariable } from '@/utils/globalvariable'

export default {
  components: { profit, cashFlow, balanceSheet },
  data() {
    return {
      TaskAct: 1,
      fullscreenLoading: false,
      getDateMou: this.getPreMonth(new Date()),
      showDetail: false, // 明细
      showItems: false, // 选择流量项目

      ProfitList: [], // 利润表
      AssetLiabilityList: '', // 资产负债

      DetailList: [
        {
          time: '2018-10-10',
          des: 'dddd',
          name: 'king',
          valueIn: '222',
          valueOut: '3333',
          address: 'asfdasdf'
        },
        {
          time: '2018-10-10',
          des: 'dddd',
          name: 'king',
          valueIn: '222',
          valueOut: '3333',
          address: 'asfdasdf'
        }
      ], // 明细账单

      SubjectDropDownList: []// 全部科目
    }
  },
  mounted() {
    this.initial()
  },
  watch: {
    TaskAct() {
      this.$store.dispatch('setNavigation', this.TaskAct).then(() => {
        this.$emit('change')
      })
    },
    getDateMou(news) {
      this.initial()
    }
  },
  methods: {
    // 导出
    exportBtn() {
      console.log(this.getDateMou.split('-')[0])
      console.log(this.getDateMou.split('-')[1])
      if (this.TaskAct == 1) { // 资产负债表GET
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportAssetLiabilityList?request.token=' + getToken() + '&export=' + true +
      '&searchyear=' + this.getDateMou.split('-')[0] + '&searchmonth=' + this.getDateMou.split('-')[1])
      } else if (this.TaskAct == 2) { // 利润表
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportProfitList?request.token=' + getToken() + '&export=' + true +
      '&searchyear=' + this.getDateMou.split('-')[0] + '&searchmonth=' + this.getDateMou.split('-')[1])
      }
    },
    // 判断是否初始化
    initial() {
      if (!this.$store.state.user.financialInitial.ThirdStep) {
        this.$router.push({ path: '/finance/promptIndex' })
      } else {
        this.fullscreenLoading = true
        Promise.all([
          toGetProfitList(this, this.getDateMou), // 利润表
          toGetAssetLiabilityList(this, this.getDateMou)// 资产负债
        ]).then(res => {
          this.fullscreenLoading = false
          this.setTime()
        })

        doGetSubjectDropDownList(this) // 科目表
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 5]
        } else {
          return [0, 0]
        }
      }
    },
    getNavigation() {
      return this.$store.state.financeReport.navigation
    },
    setData(data) {
      if (data.length) {
        var newList = []
        data.forEach(function(v, i) {
          newList.push(v)
          newList.push(v)
        })
        return newList
      }
    },
    getPreMonth(date) {
      if (date) {
        var now = parseTime(date, '{y}-{m}')
        return now
      }
    },
    setTime() {
      this.$store.dispatch('handSetTime', this.getDateMou).then(() => {
        this.$emit('change')
      })
    }

  }
}

// 利潤表
var toGetProfitList = (app, getDateMou) => {
  return new Promise(function(resolve, reject) {
    const searchyear = getDateMou.split('-')[0]
    const searchmonth = getDateMou.split('-')[1]

    GetProfitList(getToken(), searchyear, searchmonth).then(res => {
      const data = res.data
      app.ProfitList = data.Data
      // app.setTime()
      resolve(true)
    })
  })
}
// 资产负债
var toGetAssetLiabilityList = (app, getDateMou) => {
  return new Promise(function(resolve, reject) {
    const searchyear = getDateMou.split('-')[0]
    const searchmonth = getDateMou.split('-')[1]
    GetAssetLiabilityList(getToken(), searchyear, searchmonth).then(res => {
      const data = res.data
      console.log(data)
      app.AssetLiabilityList = data.Data
      // app.setTime()
      resolve(true)
    })
  })
}

var doGetSubjectDropDownList = (app) => {
  GetSubjectDropDownList(1, 0).then(res => {
    const data = res.data
    console.log(data)
    app.SubjectDropDownList = data.Data
  })
}

</script>

<style lang="scss" scoped>
.temlateMain {
  .el-container,
  .el-main {
    height: 100%;
  }
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
    }
  }
  .el-main {
    padding: 0;
    .el-header {
      border-bottom: none;
      // padding: 0;
      height: 70px;
      line-height: 70px;
      .getDate {
        padding: 0;
        margin: 0;
      }
    }
    .tableMain {
      height: 100%;
      padding:0 20px;
    }
  }
}
.el-dialog__body{
  padding: 30px 20px 5px;
}
</style>

