<template>
    <el-container>
       <template>
            <el-table
                :data="tableData3"
                style="width: 100%;text-align: center"
                border
                center
                :span-method="arraySpanMethod"
                height="100%">

                <el-table-column
                prop="Name"
                label="资产"
                min-width="58">
                    <template slot-scope="scope">
                        <p style="text-align: left;margin:0;padding-left:10px;" v-if="scope.row.ID">{{scope.row.Name}}
                          <b class="icon_edit" v-if="scope.row.ID" @click="editProfit(scope.row)"></b>
                        </p>
                        <p style="text-align: left;margin:0;font-weight: bold;" v-else>{{scope.row.Name}}
                          <b class="icon_edit" v-if="scope.row.ID" @click="editProfit(scope.row)"></b>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="RowNum"
                label="行次"
                min-width="35">

                </el-table-column>

                <el-table-column
                prop="FinalBalance "
                label="期末余额"
                min-width="35">
                    <template slot-scope="scope" >
                        <p style="text-align: right" v-if="scope.row.FinalBalance&&scope.row.FinalBalance!='-'">{{scope.row.FinalBalance }}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="BeginBalance"
                label="年初余额"
                min-width="35">
                    <template slot-scope="scope" >
                        <p style="text-align: right" v-if="scope.row.BeginBalance&&scope.row.BeginBalance!='-'">{{scope.row.BeginBalance}}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

                <el-table-column
                label="负债和所有者权益"
                prop="Name"
                min-width="58">
                    <template slot-scope="scope" v-if="scope.$index<tableData4.length">
                        <p style="text-align: left;margin:0;padding-left:10px" v-if="tableData4[scope.$index].ID">
                          {{tableData4[scope.$index].Name}}
                           <b class="icon_edit"  @click="editProfit(tableData4[scope.$index])"></b>
                        </p>
                        <p style="text-align: left;margin:0;font-weight: bold;" v-else>{{tableData4[scope.$index].Name}}
                            <!-- <b class="icon_edit"   @click="editProfit(tableData4[scope.$index])"></b> -->
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                label="行次"
                min-width="35">
                <template slot-scope="scope"  v-if="scope.$index<tableData4.length">
                    <p>{{tableData4[scope.$index].RowNum}}</p>
                </template>

                </el-table-column>

                <el-table-column
                label="期末余额"
                min-width="35">
                    <template slot-scope="scope"  v-if="scope.$index<tableData4.length">
                        <p style="text-align: right" v-if="tableData4[scope.$index].FinalBalance&&tableData4[scope.$index].FinalBalance!='-'">{{tableData4[scope.$index].FinalBalance}}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

                <el-table-column
                label="年初余额"
                min-width="35">
                    <template slot-scope="scope"  v-if="scope.$index<tableData4.length">
                        <p style="text-align: right" v-if="tableData4[scope.$index].BeginBalance&&tableData4[scope.$index].BeginBalance!='-'">{{tableData4[scope.$index].BeginBalance}}</p>
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
      <div class="dialog_report" >
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
                    <el-button @click="deleteAsset(scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class='dialog_button'>
          <el-button size="medium " @click="dialogVisible = false">取 消</el-button>
          <el-button type="warning" size="medium " @click="doSaveIt">确 定</el-button>
        </div>
        <div class="dialog_alert"><span>温馨提示：新公式只对未出报表进行计算，不影响历史报表数据。</span><el-button @click="doReset">公式复位</el-button></div>
      </div>
    </el-dialog>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { getToken } from '@/utils/auth'
import {
  GetAssetLiabilityList,
  LoadAssetLiabilityFormulaList,
  SaveAssetLiabilityFormula,
  ResetAssetFormula
} from '@/api/finance'

export default {
  props: ['dateMou', 'SubjectList'],
  data() {
    return {
      tableData3: [],
      tableData4: [],
      dialogVisible: false,
      editProfit_title: '编辑公式-',
      state4: '',
      value: '',
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
      busarassetliabilityid: '',
      BusarSubjectList: '',
      // 1-借方发生额 2-贷方发生额 3-借方-贷方发生额 4-贷方-借方发生额
      theCalculateRule: ['', '借方发生额', '贷方发生额', '借方-贷方发生额', '贷方-借方发生额'],
      ProfitFormulaList: [] // 公式
    }
  },
  computed: {
    ...mapGetters(['financeReport_time'])
  },
  watch: {
    'financeReport_time'() {
      console.log(888)
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      toGetAssetLiabilityList(this)
    },
    getIT(data) {
      // console.log(data)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      if (!row.ID && !row.RowNum) {
        if (columnIndex === 0 || columnIndex === 4) {
          return {
            rowspan: 1,
            colspan: 4
          }
        } else {
          return [0, 0]
        }
      }
    },
    editProfit(data) {
      this.state4 = ''
      this.value = ''
      this.radio = ''
      this.dialogVisible = true

      this.editProfit_title = '编辑公式-' + data.Name
      this.busarassetliabilityid = data.ID

      getLoadAssetLiabilityFormulaList(this, data.ID)
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
      doSaveAssetLiabilityFormula(this, this.busarassetliabilityid, this.ProfitFormulaList)
    },
    doReset() {
      doResetAssetFormula(this, this.busarassetliabilityid)
    }
  }
}

var toGetAssetLiabilityList = (app) => {
  const data = app.dateMou
  // console.log(data)
  const list1 = [{
    ID: '',
    Name: '流动资产：',
    RowNum: ''
  }]
  const list2 = [{
    ID: '',
    Name: '非流动资产：',
    RowNum: ''
  }]
  const list3 = [{
    ID: '',
    Name: '流动负债：',
    RowNum: ''
  }]
  const list4 = [
    {
      ID: '',
      Name: '',
      RowNum: ''
    },
    {
      ID: '',
      Name: '',
      RowNum: ''
    },
    {
      ID: '',
      Name: '',
      RowNum: ''
    }, {
      ID: '',
      Name: '',
      RowNum: ''
    },
    {
      ID: '',
      Name: '非流动资产：',
      RowNum: ''
    }]
  const list5 = [
    {
      ID: '',
      Name: '',
      RowNum: ''
    },
    {
      ID: '',
      Name: '',
      RowNum: ''
    },
    {
      ID: '',
      Name: '所有者权益（或股东权益）',
      RowNum: ''
    }]

  data.forEach(item => {
    if (item.Type == 1) {
      list1.push(item)
    } else if (item.Type == 2) {
      list2.push(item)
    } else if (item.Type == 3) {
      list3.push(item)
    } else if (item.Type == 4) {
      list4.push(item)
    } else if (item.Type == 5) {
      list5.push(item)
    } else {
      if (item.Class == 1) {
        list2.push(item)
      } else {
        list5.push(item)
      }
      // console.log(item)
    }
  })
  app.tableData3 = list1.concat(list2)
  app.tableData4 = list3.concat(list4).concat(list5)
}

var getLoadAssetLiabilityFormulaList = (app, id) => {
  LoadAssetLiabilityFormulaList(getToken(), id).then(res => {
    const data = res.data
    // console.log(data)
    app.ProfitFormulaList = data.Data
  })
}

var doSaveAssetLiabilityFormula = (app, busarassetliabilityid, FormulaList) => {
  SaveAssetLiabilityFormula(getToken(), busarassetliabilityid, FormulaList).then(res => {
    const data = res.data
    // console.log(data)
    if (data.Successful) {
      app.$message({
        message: '公式添加成功！',
        type: 'success'
      })
      getLoadAssetLiabilityFormulaList(app, app.busarassetliabilityid)
    } else {
      app.$message.error('公式添加失败！')
    }
  })
}

var doResetAssetFormula = (app, busarassetliabilityid) => {
  ResetAssetFormula(getToken(), busarassetliabilityid).then(res => {
    const data = res.data
    if (data.Successful) {
      app.$message({
        message: '公式复位成功！',
        type: 'success'
      })
      getLoadAssetLiabilityFormulaList(app, app.busarassetliabilityid)
    } else {
      app.$message.error('公式复位失败！')
    }
  })
}
</script>

<style lang="scss" scoped>
    p{
        margin:0;
    }
    .el-container {
  padding-bottom: 20px;
}
.dialog_report{
  padding-bottom: 10px;
}
</style>

