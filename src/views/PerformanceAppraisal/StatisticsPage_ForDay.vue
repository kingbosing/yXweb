<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            <span style="cursor: pointer;" @click="StatisticsPage">员工考核统计></span>
            <span style="cursor: pointer;" @click="ForMonth">{{Data.Name + '的工作月报明细>'}}</span>
            <span>工作日报明细</span>
        </el-header>
        <el-main>
             <div class="BoxContent scroll">

                    <p class="BoxContent_time">
                        <span>姓名：</span><b>{{Data.Name}}</b><span>部门：</span><b>{{Data.DepartName||'（空）'}}</b><span>职位：</span><b>{{Data.Job||'（空）'}}</b><span>时间：</span><b>{{time}}</b>

                        <el-select placeholder="全部工作项类别" v-model="searchId">
                            <el-option :label="k" :value="v" v-for="(k,v) in typeList" :key="v"></el-option>

                        </el-select>
                    </p>

                    <template v-if="totalCount>1">
                        <el-table :data="DataList"
                                  border
                                  style="width: 100%">
                            <el-table-column prop="WorkItemTypeName"
                                             label="工作类别项"
                                             width="140">
                            </el-table-column>
                            <el-table-column prop="WorkContentName"
                                             label="工作内容"
                                             width="165">
                            </el-table-column>
                            <el-table-column prop="Desc"
                                             label="描述"
                                             width="165">
                            </el-table-column>
                            <el-table-column
                                             label="最后修改时间"
                                             width="142">
                                <template slot-scope="scope">
                                    <div>
                                        <p>{{ TimeTransDates(scope.row.UpdateTime)}}</p>

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="StandardScore"
                                             label="标准分"
                                             width="95">
                            </el-table-column>
                            <el-table-column prop="SelfScore"
                                             label="自评分"
                                             width="95">
                            </el-table-column>
                            <el-table-column prop="MissName"
                                             label="失误项"
                                             width="130">
                            </el-table-column>
                            <el-table-column prop="MissDesc"
                                             label="失误说明"
                                             width="130">
                            </el-table-column>
                            <el-table-column prop="LeaderScore"
                                             label="直属领导评分"
                                             width="120">
                            </el-table-column>
                            <el-table-column prop="LeaderMissName"
                                             label="直属领导评定失误项"
                                             width="215">
                            </el-table-column>
                            <el-table-column prop="LeaderMissDesc"
                                             label="直属领导评定失误项说明"
                                             width="215">
                            </el-table-column>

                            <el-table-column prop="Status"
                                             label="状态"
                                             width="120">
                            </el-table-column>

                        </el-table>
                    </template>

                    <div class="numberless" v-else>
                        <img src="../../assets/meeting/apply_empty.png" />
                        <p>暂无数据</p>
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
      TheMonth: '2018-04',
      id: '',
      time: '',
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数

      Data: {},
      DataList: [],
      typeList: [],
      searchId: '' // 工作项类别
    }
  },
  created() {
    this.change()
  },
  watch: {
    searchId(curVal, oldVal) {
      this.DataList = []
      this.totalCount = 0
      console.log(this.id, this.time, this.searchId)
      API.GetWorkDayReportDetail(this.$route.query.ProfileId, this.time, this.searchId).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.Loading = false
          this.Data = res.data.Data
          this.DataList = res.data.Data.Records
          this.totalCount = res.data.Data.Records.length
        }
      })
    }
  },
  methods: {
    change() {
      const id = this.$route.query.ProfileId
      const dt = this.$route.query.dt
      this.time = this.$route.query.dt
      API.GetWorkDayReportDetail(id, dt).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.Loading = false
          this.Data = res.data.Data
          this.DataList = res.data.Data.Records
          this.totalCount = res.data.Data.Records.length
        }
      })
      API.GetWorkItemTypes().then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.typeList = res.data.Data
        }
      })
    },

    TimeTransDates(inTime) {
      var Time = parseInt(inTime.split('(')[1].split(')')[0])
      if (new Date(Time).getHours() < 10) {
        var hours = '0' + new Date(Time).getHours()
      } else {
        hours = new Date(Time).getHours()
      }
      if (new Date(Time).getMinutes() < 10) {
        var minutes = '0' + new Date(Time).getMinutes()
      } else {
        minutes = new Date(Time).getMinutes()
      }
      if (new Date(Time).getSeconds() < 10) {
        var seconds = '0' + new Date(Time).getSeconds()
      } else {
        seconds = new Date(Time).getSeconds()
      }
      var theMonth = parseInt(new Date(Time).getMonth()) + 1
      var theDate = new Date(Time).getDate()
      if (theMonth < 10) {
        theMonth = '0' + theMonth
      }
      if (theDate < 10) {
        theDate = '0' + theDate
      }
      var FTime = new Date(Time).getFullYear() + '-' + theMonth + '-' + theDate

      return FTime
    },
    StatisticsPage() {
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage'
      })
    },
    ForMonth() {
      this.$router.push({
        path: '/PerformanceAppraisal/StatisticsPage/ForMonth',
        query: {
          ProfileId: this.$route.query.ProfileId,
          dt: this.$route.query.dt.slice(0, 7)
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

        .el-table th {
            background: #f8f8f8;
            border-bottom: none;
        }

        .el-pagination {
            position: absolute;
            bottom: 10px;
            right: 100px;
            padding: 0;
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
        .el-select {
            float: right;
            margin: 15px 20px 0;
            /* height: 30px; */
            /* overflow: hidden; */
            line-height: 42px;
        }
</style>
