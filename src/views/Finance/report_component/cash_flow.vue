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
                prop="name"
                label="项目"
                min-width="58">
                    <template slot-scope="scope">
                        <p style="text-align: left;margin:0" v-if="scope.row.row">{{scope.row.name}}
                          <b class="icon_edit" v-if="scope.row.row==1" @click="editProfit(scope.row)"></b>
                        </p>
                        <p style="text-align: left;margin:0;font-weight: bold;" v-else>{{scope.row.name}}
                          <b class="icon_edit" v-if="scope.row.row==1" @click="editProfit(scope.row)"></b>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="row"
                label="行次"
                min-width="35">

                </el-table-column>

                <el-table-column
                prop="total"
                label="本年累计金额"
                min-width="35">
                    <template slot-scope="scope"  v-if="scope.row.row">
                        <p style="text-align: right" v-if="scope.row.total">{{scope.row.total}}</p>
                        <p style="text-align: center" v-else>-</p>
                    </template>
                </el-table-column>

                <el-table-column
                prop="value"
                label="本月金额"
                min-width="35">
                    <template slot-scope="scope" v-if="scope.row.row">
                        <p style="text-align: right" v-if="scope.row.value">{{scope.row.value}}</p>
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

            <el-button type="warning" size="small">添 加</el-button>

          </p>
          <div class="content">
            <template>
              <el-table
                :data="rolueList"
                border
                center
                >
                <el-table-column
                  prop="date"
                  label="科目名称"
                  width="396">
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="运算符号"
                  width="200">
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="取数规则"
                  width="200">
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button>删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class='dialog_button'>
          <el-button size="medium " @click="dialogVisible = false">取 消</el-button>
          <el-button type="warning" size="medium " @click="dialogVisible = false">确 定</el-button>
        </div>
        <div class="dialog_alert"><span>温馨提示：新公式只对未出报表进行计算，不影响历史报表数据。</span><el-button>公式复位</el-button></div>
      </div>
    </el-dialog>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [
        {
          name: '一、经营活动产生的现金流量：',
          row: '',
          total: '',
          value: ''
        },
        {
          name: '销售产成品、商品、提供劳务收到的现金',
          row: 1,
          total: '',
          value: ''
        }, {
          name: '收到其他与经营活动有关的现金',
          row: 2,
          total: '',
          value: 88
        },
        {
          name: '购买原材料、商品、接受劳务支付的现金',
          row: 3,
          total: '',
          value: ''
        }
      ],
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
      rolueList: []
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      if (!row.row) {
        return [1, 4]
      }
    },
    editProfit(data) {
      this.dialogVisible = true
      console.log(data)
      this.editProfit_title = '编辑公式-' + data.name
    },
    handleClose() {},
    querySearchAsync(queryString, cb) {
      console.log(queryString)
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
    p{
        margin:0;
    }
    .el-container {
  padding-bottom: 20px;
}
</style>

