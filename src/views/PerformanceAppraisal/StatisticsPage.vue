<template>
 <el-container class="temlateMain">
        <el-header height="50px">
            <span>员工考核统计</span>
            <div class="headerdate">
               <span>选择月份：</span>
                <el-date-picker
                v-model="value4"
                type="month"
                :clearable="false"
                :picker-options="pickerOptions"
                @change="datechange"
                :default-value="new Date()"
                placeholder="选择月份">
                </el-date-picker>
            </div>
        </el-header>
        <el-main>
            <div class="title">
                <span>当前月份：</span>
                <span>{{value4}}</span>
            </div>
            <div class="list">
              <table>
                <tr>
                  <th>姓名</th>
                  <th>部门</th>
                  <th>职位</th>
                  <th>月考核总分</th>
                  <th>生成状态</th>
                  <th>生成时间</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item, key) in list" :key="key">
                  <td>{{item.Name}}</td>
                  <td>{{item.DepartName}}</td>
                  <td>{{item.JobName}}</td>
                  <td>{{item.TotalScore}}</td>
                  <td>{{item.StatusStr}}</td>
                  <td>{{item.KPITime}}</td>
                  <td class="tablebut">
                    <span @click="ForMonth(item.ProfileId,value4)">工作月报明细</span>
                    <span @click="ForPerformance(item.ProfileId,value4)">绩效考核明细</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/StatisticsPage'
export default {
  data() {
    return {
      date: '',
      value4: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }]
      },
      pageSize: 20,
      pageIndex: 1,
      list: [],
      total: 0
    }
  },
  created() {
    this.change()
  },
  methods: {
    GetEmpKpiStatisGeneralList(date, pageSize, pageIndex) {
      API.GetEmpKpiStatisGeneralList(date, pageSize, pageIndex).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.list = res.data.Data.Records
          this.total = res.data.Data.TotalCount
        }
      })
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.GetEmpKpiStatisGeneralList(this.value4, this.pageSize, this.pageIndex)
    },
    handleCurrentChange(e) {
      this.pageIndex = e
      this.GetEmpKpiStatisGeneralList(this.value4, this.pageSize, this.pageIndex)
    },
    change() {
      this.value4 = this.formatDate(new Date())
      this.GetEmpKpiStatisGeneralList(this.value4, this.pageSize, this.pageIndex)
    },
    datechange(e) {
      this.value4 = this.formatDate(e)
      this.GetEmpKpiStatisGeneralList(this.value4, this.pageSize, this.pageIndex)
    },
    formatTen(num) {
      return num > 9 ? (num + '') : ('0' + num)
    },
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return year + '-' + this.formatTen(month)
    },
    ForPerformance(ProfileId, dt) {
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage/ForPerformance',
        query: {
          ProfileId: ProfileId,
          dt: dt
        }
      })
    },
    ForMonth(ProfileId, dt) {
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage/ForMonth',
        query: {
          ProfileId: ProfileId,
          dt: dt
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.temlateMain {
  height: 100%;
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
  .el-main {
    height: 100%;
    padding: 0;
  }
}
.headerdate {
    float: right;
}
.title {
  line-height: 76px;
  padding-left: 15px;
  span:first-child {
    font-size: 18px;
    color: #8a8a8a;
  }
}
.list {
  table {
    width: 100%;
    margin-bottom: 60px;
    text-align: center;
    border-collapse: collapse;
    tr {
      border-bottom: 1px solid #ddd;
    }
    th {
      line-height: 60px;
      color: #909399;
    }
    td {
      line-height: 60px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tablebut {
      width: 276px;
      span {
        display: inline-block;
        width: 100px;
        margin-right: 15px;
        line-height: 28px;
        color: #fff;
        background: #e6a23c;
        border-radius: 4px;
        cursor: pointer;
      }
      span:last-child {
        background: #67c23a;
      }
    }
  }
}
.page {
  position: fixed;
  width: calc(100% - 90px);
  padding-bottom: 10px;
  bottom: 20px;
  border-top: solid 1px #ccc;
  background: #fff;
}
</style>
