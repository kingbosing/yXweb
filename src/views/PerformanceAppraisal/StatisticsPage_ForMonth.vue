<template>
 <el-container class="temlateMain">
        <el-header height="50px">
            <span @click="StatisticsPage" style="cursor: pointer;" >员工考核统计></span>
            <span>{{Data.Name + '的工作月报明细'}}</span>
        </el-header>
        <el-main>
            <div class="BoxContent scroll">

                    <p class="BoxContent_time"><span>姓名：</span><b>{{Data.Name}}</b><span>部门：</span><b>{{Data.DepartName||'（空）'}}</b><span>职位：</span><b>{{Data.Job||'（空）'}}</b><span>当前月份：</span><b>{{TheMonth}}</b></p>

                    <template v-if="totalCount>1">
                        <el-table :data="tableData3"
                                  border
                                  v-on:header-click="toDay"
                                  style="width: 100%">
                            <el-table-column prop="JobWrokName"
                                             label="职位工作列表"
                                             fixed
                                             width="140">
                            </el-table-column>
                            <el-table-column prop="WorkItemTypeName"
                                             label="工作项类别"
                                             fixed
                                             width="150">
                            </el-table-column>
                            <el-table-column prop="WrokContentName"
                                             label="工作内容"
                                             fixed
                                             width="192">
                            </el-table-column>
                            <el-table-column v-for="(k, key) in dayList" :key="key" :label="k+''" width="50">
                                <template slot-scope="scope">
                                    <div>
                                        <p>{{ scope.row.CPD[k-1]}}</p>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column

                                             label="合计"
                                             width="150">
                                <template slot-scope="scope">
                                    <div>
                                        <p>{{ AllTotal(scope.row.CPD)}}</p>

                                    </div>
                                </template>
                            </el-table-column>

                        </el-table>

                    </template>
                    <div class="numberless" v-else>
                        <img src="../../assets/meeting/apply_empty.png" />
                        <p>暂无数据</p>
                    </div>

                    <div class="general" v-if="assessList>0">
                        <p>月通用考核表</p>
                        <table class="listTable" style="width:1000px;">
                            <thead>
                                <tr>
                                    <th>月通用考核类型</th>
                                    <th>初始分</th>
                                    <th>完成分</th>
                                    <th>扣减分值</th>
                                    <th>说明/扣分原因</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(j,key) in assessData" :key="key">
                                <td>{{j.Type}}</td>
                                <td>{{j.Initial}}</td>
                                <td>{{j.Finish}}</td>
                                <td>{{j.Abate}}</td>
                                <td>{{j.Reason|Empty}}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/StatisticsPage'
export default {
  data() {
    return {
      TheMonth: '',
      tableHeight: 50,
      Data: {},
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      assessList: 0, // 月通用考核条数
      assessData: [], // 月通用考核数据
      dayList: 0,
      tableData3: [
        {
          dep: '2016-05-03',
          name: '王小虎',
          position: '上海市普',
          tital: 88,
          id: 1
        }, {
          dep: '2016-05-02',
          name: '王小虎',
          position: '上海市',
          tital: 88,
          id: 2
        }, {
          dep: '2016-05-04',
          name: '王小虎',
          position: '普陀区',
          tital: 88,
          id: 3
        }, {
          dep: '2016-05-01',
          name: '王小虎',
          position: '金沙江路 ',
          tital: 88,
          id: 4
        }
      ],
      id: '',
      time: ''
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      const id = this.$route.query.ProfileId
      const dt = this.$route.query.dt
      this.TheMonth = this.$route.query.dt
      API.GetWorkMonthReportDetail(id, dt).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.Data = res.data.Data
          this.tableData3 = res.data.Data.Records
          this.totalCount = res.data.Data.Records.length
          if (res.data.Data.Records.length > 0) {
            this.dayList = res.data.Data.Records[0].CPD.length
          }
        }
      })
      API.check_man_details(id, dt).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.assessList = res.data.Data.length
          this.assessData = res.data.Data
        }
      })
    },
    toDay(row, column) {
      console.log(row, column)
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage/ForDay',
        query: {
          ProfileId: this.$route.query.ProfileId,
          dt: this.$route.query.dt + '-' + row.label
        }
      })
    },
    AllTotal(data) {
      var all = 0
      for (var i = 0; i < data.length; i++) {
        all += data[i]
      }

      return all
    },
    StatisticsPage() {
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage'
      })
    }
  },
  filters: {
    Empty(data) {
      var strL
      if (data == '' || data == null) {
        strL = '-'
      } else {
        strL = data
      }
      return strL
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
 .navTitle {
            height: 60px;
            border-bottom: 1px solid #ccc;
            font-size: 18px;
            padding: 0 20px;
        }

            .navTitle a {
                color: #333;
                font-weight: bold;
                line-height: 60px;
                text-decoration: none;
                cursor:pointer;
            }

        #StatisticsPage_forMonth {
            background: #fff;
            line-height: 60px;
        }

            #StatisticsPage_forMonth .getMonth {
                float: right;
                font-size: 18px;
            }

        .BoxContent_time {
            height: 76px;
            font-size: 16px;
            line-height: 76px;
            color: #333;
            padding-left: 20px;
        }

            .BoxContent_time span {
                color: #8a8a8a;
            }
            .BoxContent_time b {
                color: #333;
                margin-right: 72px;
                font-weight: normal;
            }

        .BoxContent {
            width: 100%;
        }

        .el-table tr {
            line-height: 0;
        }

        .el-table .cell {
            line-height: 36px;
            text-align: center;
            white-space: nowrap;
        }

        // .el-table__body-wrapper {
        // }

        .el-table th {
            background: #f8f8f8;
            border-bottom: none;
        }
        .el-table__fixed-header-wrapper {
            cursor:pointer;
        }
        .el-pagination {
            position: absolute;
            bottom: 10px;
            right: 100px;
            padding: 0;
            line-height: 45px;
        }

        .el-pagination__total {
            float: right;
            background: #f99740;
            margin: 0;
            color: #fff;
            padding: 0 5px;
        }
         .numberless {
            height: 550px;
            width: 430px;
            margin: 90px auto 0;
        }

         .numberless > p {
                font-size: 24px;
                margin-top: 20px;
                color: #b6b6b6;
                margin-left: 128px;
            }

          .grid-content {
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .listTable {
        width: 100%;
        font-size: 16px;
        table-layout: fixed;
        border-spacing: 0;
    border-collapse: collapse;
    }
   .listTable th {
        font-weight: normal;
        height: 60px;
        background-color: #F7F7F7;
        text-align: center;
        padding: 0 20px;
         border: 1px solid #dedede;
    }
   .listTable td {
        height: 60px;
         text-align: center;
         padding: 0 20px;
       border: 1px solid #dedede;
    }
    .listTable .firstTd {
        text-align: left;
    }
    // .listTable tr {
    // }
    .listTable thead tr {
        border-top: transparent;
    }
    tbody tr {
        cursor: pointer;
    }
    .general {
        margin: 20px 0;
    }
    .general p {
        padding-left: 20px;
        font-size: 18px;
        font-weight: bold;
    }
</style>
