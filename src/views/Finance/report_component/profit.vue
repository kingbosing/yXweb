<template>
    <el-container>
       <template>
            <el-table
                :data="dateMou"
                style="width: 100%;text-align: center"
                border
                :span-method="arraySpanMethod"
                height="100%">
                <el-table-column
                prop="Name"
                label="项目"
                min-width="58">
                    <template slot-scope="scope">
                        <p style="text-align: left">{{scope.row.Name}}
                          <b class="icon_edit" v-show="scope.row.RowNum" @click="editProfit(scope.row)"></b>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="RowNum"
                label="行次"
                min-width="35">
                <template slot-scope="scope">
                    <p style="text-align: center">{{scope.row.RowNum}}
                    </p>
                </template>
                </el-table-column>

                <el-table-column
                prop="TotalYearMoney"
                label="本年累计金额"
                min-width="35">
                    <template slot-scope="scope">
                        <p style="text-align: right" v-if="scope.row.TotalYearMoney&&scope.row.TotalYearMoney!='-'">{{scope.row.TotalYearMoney}}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="TotalMonthMoney"
                label="本月金额"
                min-width="35">
                    <template slot-scope="scope">
                        <p style="text-align: right" v-if="scope.row.TotalMonthMoney&&scope.row.TotalMonthMoney!='-'">{{scope.row.TotalMonthMoney}}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

            </el-table>
        </template>

    <el-dialog
      :title="editProfit_title"
      :visible.sync="dialogVisible"
      width="1080px"
      >
      <div class="dialog_report">
        <div class="dialog_content">
          <p class="header">
            <span>科目：</span>
            <el-autocomplete
              v-model="state4"
              value-key="Key"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect">
            </el-autocomplete>

            <span>取数规则：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <span>运算符号：</span>
              <el-radio v-model="radio" label="1">+</el-radio>
              <el-radio v-model="radio" label="2">-</el-radio>

            <el-button type="warning" size="small" @click="SaveAsset">添 加</el-button>

          </p>
          <div class="content">
            <template>
              <el-table
                :data="ProfitFormulaList"
                border
                center
                >
                <el-table-column
                  prop="SubjectName"
                  label="科目名称"
                  width="396">
                </el-table-column>

                <el-table-column
                  prop="Symbol"
                  label="运算符号"
                  width="200">
                  <template slot-scope="scope">
                      <p style="text-align: center">{{scope.row.Symbol==1?'+':'-'}}</p>
                  </template>

                </el-table-column>

                <el-table-column
                  prop="CalculateRule"
                  label="取数规则"
                  width="200">
                  <template slot-scope="scope">
                      <p style="text-align: text">{{theCalculateRule[scope.row.CalculateRule]}}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button  @click="deleteAsset(scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class='dialog_button'>
          <el-button size="medium " @click="dialogVisible = false">取 消</el-button>
          <el-button type="warning" size="medium "  @click="doSaveIt">确 定</el-button>
        </div>
        <div class="dialog_alert"><span>温馨提示：新公式只对未出报表进行计算，不影响历史报表数据。</span><el-button @click="doReset">公式复位</el-button></div>
      </div>
    </el-dialog>
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import { GetProfitList, LoadProfitFormulaList, SaveProfitFormula, ResetProfitFormula } from '@/api/finance'

export default {
  props: ['dateMou', 'SubjectList'],
  data() {
    return {
      dialogVisible: false,
      tableData1: [],
      editProfit_title: '编辑公式-',

      BusarProfitId: '',
      BusarSubjectList: '', // 添加公式 选中科目
      state4: '',
      value: '',
      timeout: '',
      options: [
        {
          value: '1',
          label: '借方发生额'
        },
        {
          value: '2',
          label: '贷方发生额'
        },
        {
          value: '3',
          label: '借方-贷方发生额'
        },
        {
          value: '4',
          label: '贷方-借方发生额'
        }
      ],
      radio: '',
      rolueList: [],
      // 1-借方发生额 2-贷方发生额 3-借方-贷方发生额 4-贷方-借方发生额
      theCalculateRule: ['', '借方发生额', '贷方发生额', '借方-贷方发生额', '贷方-借方发生额'],
      ProfitFormulaList: [] // 公式

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // toGetProfitList(this, '2018', '09')
    },
    editProfit(data) {
      this.state4 = ''
      this.value = ''
      this.radio = ''
      this.dialogVisible = true
      // console.log(data)
      this.BusarProfitId = data.ID
      this.editProfit_title = '编辑公式-' + data.Name
      getLoadProfitFormulaList(this, data.ID)
    },
    handleClose() {},
    querySearchAsync(queryString, cb) {
      var restaurants = this.SubjectList
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.Key.indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSelect(item) {
      // console.log(item)
      this.BusarSubjectList = item
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      // if (!row.row) {
      //   return [1, 4]
      // }
    },
    SaveAsset() {
      var FormulaList = {
        'BusarSubjectId': this.BusarSubjectList.Value,
        'SubjectName': this.BusarSubjectList.Key.split(' ')[1],
        'Symbol': this.radio,
        'CalculateRule': this.value
      }
      if (this.radio && this.value && this.state4) {
        this.ProfitFormulaList.push(FormulaList)
        this.state4 = ''
        this.radio = ''
        this.value = ''
      }
    },
    deleteAsset(index) {
      // console.log(index)
      this.ProfitFormulaList.splice(index, 1)
    },
    doSaveIt() {
      doSaveProfitFormula(this, this.BusarProfitId, this.ProfitFormulaList)
    },
    doReset() {
      doResetProfitFormula(this, this.BusarProfitId)
    }
  }
}

var getLoadProfitFormulaList = (app, id) => {
  LoadProfitFormulaList(getToken(), id).then(res => {
    const data = res.data
    // console.log(data)
    app.ProfitFormulaList = data.Data
  })
}

var doSaveProfitFormula = (app, BusarProfitId, FormulaList) => {
  SaveProfitFormula(getToken(), BusarProfitId, FormulaList).then(res => {
    const data = res.data
    // console.log(data)
    if (data.Successful) {
      app.$message({
        message: '公式添加成功！',
        type: 'success'
      })
      getLoadProfitFormulaList(app, app.BusarProfitId)
    } else {
      app.$message.error('公式添加失败！')
    }
  })
}

var doResetProfitFormula = (app, BusarProfitId) => {
  ResetProfitFormula(getToken(), BusarProfitId).then(res => {
    const data = res.data
    if (data.Successful) {
      app.$message({
        message: '公式复位成功！',
        type: 'success'
      })
      getLoadProfitFormulaList(app, app.BusarProfitId)
    } else {
      app.$message.error('公式复位失败！')
    }
  })
}

</script>

<style lang="scss" scoped>
.el-container {
  padding-bottom: 20px;
}
.dialog_report{
  padding-bottom: 10px;
}
</style>

