<template>
      <el-container class="temlateMain"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span :class="{tab_btn:true,active:TaskAct==1}" v-on:click="TaskAct=1">我的任务</span>
            <span :class="{tab_btn:true,active:TaskAct==2}" v-on:click="TaskAct=2">公共任务池</span>
             <div class="header-right">
                <div class="tools_search">
                    <el-input
                    placeholder="请输入任务名称/参与人"

                    v-model="searchText"
                    @keyup.enter.native="toSearch">
                    <b slot="append" class="el-icon-search" @click="toSearch"></b>
                    </el-input>

                </div>
            </div>
        </el-header>
        <el-main>
            <el-container>
              <el-header  height="60px" v-show="TaskAct==1">
                        <ul>
                            <li :class="{active:groupingAct==v}" v-for=" (k,v) in groupingList" :key="k" v-on:click="ToAct(v)">{{k}}<b v-if="v<groupingList.length-1"></b></li>
                        </ul>
              </el-header>
              <!--我的任务-->
               <el-main class="BoxContent_1" v-show="TaskAct==1">
                       <div class="card" v-for="(k,v) in dataList" v-on:click="toContent(k.TaskID,k.StatusDesc)" :key="v">
                            <b v-bind:class="{status:true,ing:k.TaskStatus==1,notstarted:k.TaskStatus==0,pending:k.TaskStatus==2,finished:k.TaskStatus==3}"></b>
                            <el-card class="box-card" shadow="hover">
                                <span class=" AuditStatus" v-html="StatusDesc(k.StatusDesc)"></span>
                                <p class="title"><span>{{ImportantDegree(k.ImportantDegree)}}</span><b v-bind:title="k.Title">{{k.Title}}</b></p>
                                <p class="people"><span class="thePeople" :title="PartersString(k.Parters)">参与人：{{PartersString(k.Parters)}}</span><span class="total" v-if="PartersNum(k.Parters)">({{PartersNum(k.Parters)}}人)</span></p>
                                <p style="width:304px;margin: 20px 0 0 5px;" v-bind:class="{SpeedPercentZo:k.SpeedPercent==0}"> <el-progress :text-inside="true" :stroke-width="18" :percentage="k.SpeedPercent" v-bind:class="setProgressColor(k.TaskStatus ,k.StatusDesc )"></el-progress></p>
                                <p class="time">{{k.StartEndTime}}</p>
                            </el-card>
                        </div>
                         <div class="noData" v-show="DataLength<=0">
                            <div v-if="searchText" class="searchB"></div>
                            <div v-else class="listB"></div>
                        </div>
               </el-main>
              <!--公共任务池-->
               <el-main class="BoxContent_2" v-show="TaskAct==2">
                          <div class="card" v-for="(k,v) in dataList" :key="v">
                            <b v-bind:class="{status:true,ing:k.TaskStatus==1,notstarted:k.TaskStatus==0,pending:k.TaskStatus==2,finished:k.TaskStatus==3}" v-on:click.stop="toContent(k.TaskID)"></b>
                            <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
                                <p class="title" style="padding:0 20px;" v-on:click="toContent(k.TaskID)"><span>{{ImportantDegree(k.ImportantDegree)}}</span><b v-bind:title="k.Title">{{k.Title}}</b></p>
                                <p class="time" v-on:click="toContent(k.TaskID)">{{k.StartEndTime}}</p>
                                <div class="btn_to IsParter" v-if="k.IsParter">已 &nbsp;&nbsp;参 &nbsp;&nbsp;与</div>
                                <div class="btn_to" v-on:click.stop="centerDialogVisible = true;addId=k.TaskID;addName=k.Title" v-else>参 &nbsp;&nbsp;与</div>

                            </el-card>

                        </div>
                        <div class="noData" v-show="DataLength<=0">
                            <div v-if="searchText" class="searchB"></div>
                            <div v-else class="listB"></div>
                        </div>
               </el-main>
               <el-footer  height="50px">
                     <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="pageIndex"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="pageSize"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="DataLength">
                    </el-pagination>
                </el-footer>
            </el-container>
        </el-main>

         <el-dialog title="确认参与"
                               :visible.sync="centerDialogVisible"
                               width="30%"
                               id="isSureAdd">
                        <span>确认参与 <b>{{addName}}</b> 任务？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" v-on:click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="warning" size="small" v-on:click="ifSureAdd">确 定</el-button>
                        </span>
         </el-dialog>
         <el-dialog title="操作提醒"
                               :visible.sync="centerDialogVisible1"
                               width="30%"
                               id="isSureAdd">
                        <span>该任务已转交，请查看其他任务？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" type="warning" v-on:click="centerDialogVisible1 = false">知道了</el-button>

                        </span>
         </el-dialog>
    </el-container>
</template>
<script>
import * as task from '@/api/task'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      fullscreenLoading: false,
      groupingList: ['全部', '未开始', '进行中', '待审核', '已结束'],
      groupingAct: 2, // all-全部 new-未开始 ing-进行中 auditing-待审核 over-已结束
      TaskAct: 1,
      percentageColor: [
        'progress_bfbf',
        'progress_yello',
        'progress_yello',
        'progress_bfbf'
      ],

      pageSize: 25,
      pageIndex: 1,
      DataLength: 0,

      addId: '', // 公共池id
      addName: '', // 公共池Name

      dataList: [], // 列表数据
      // auditStatusNum:0,//0未通过；1已逾期；2已转交；3新任务
      centerDialogVisible: false,
      centerDialogVisible1: false,
      searchText: ''
    }
  },
  mounted() {
    getList(this.groupingAct, this.pageIndex, this.pageSize, '', this)
    // 链接数据:
    if (this.$route.query.page == 'public') {
      this.TaskAct = 2
    }
  },
  watch: {
    groupingAct: function(newData, oldData) {
      // console.info(newData)
      this.searchText = ''
      getList(this.groupingAct, 1, this.pageSize, this.searchText, this)
    },
    getCheckedNodes: function(newData, oldData) {
      // console.info(newData)
    },
    TaskAct: function(newData, oldData) {
      // console.info(newData)
      this.searchText = ''
      getList(this.groupingAct, 1, this.pageSize, this.searchText, this)
    }
  },
  methods: {
    getAuditStatus(num, name) {
      // auditStatusNum:0,//0未通过；1已逾期；2已转交；3新任务
      var theColor = ['#f00', '#f00', '#f99740', '#76bc28']
      return `<span style="color:${theColor[num]}">${name}</span>`
    },
    ToAct(data) {
      this.groupingAct = data
    },
    isOk() {
      // console.log(this.$refs.Deptree.getCheckedNodes());
    },
    currentChange() {
      this.actDep = this.$refs.Deptree.getCheckedNodes()
      // console.log(this.$refs.Deptree.getCheckedNodes());
    },
    handleSizeChange(data) {
      this.pageSize = data
      getList(this.groupingAct, 1, this.pageSize, this.searchText, this)
    },
    handleCurrentChange(data) {
      this.pageIndex = data
      getList(
        this.groupingAct,
        this.pageIndex,
        this.pageSize,
        this.searchText,
        this
      )
    },
    toSearch() {
      getList(this.groupingAct, 1, this.pageSize, this.searchText, this)
    },
    toContent(data, StatusDesc) {
      // htmlState: 0, //页面导航显示，0-任务管理，1-我的任务
      var that = this
      var ID = data
      console.log(ID)
      if (StatusDesc != 2 && this.TaskAct == 1) {
        // 没有转交&&我的任务时
        return new Promise((resolve, reject) => {
          task
            .CheckParterRemoved(getToken(), ID)
            .then(response => {
              console.log('/5/')
              console.log(response.data)
              if (response.data.successful) {
                that.centerDialogVisible1 = true
                resolve()
              } else {
                if (StatusDesc == 1) {
                  // 新任务
                  return new Promise((resolve, reject) => {
                    task
                      .SetNewTaskViewed(getToken(), ID)
                      .then(response => {
                        console.log(response.data)
                        if (response.data.successful) {
                          resolve()
                        }
                      })
                      .catch(error => {
                        reject(error)
                      })
                  })
                }
                // location.href = '/Task/TaskInfo?id=' + ID + "&htmlState=1";
                this.$router.push({
                  path: '/task/TaskInfo',
                  query: { id: ID, htmlState: 1 }
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      } else {
        // location.href = '/Task/TaskInfo?id=' + ID + "&htmlState=1";
        this.$router.push({
          path: '/task/TaskInfo',
          query: { id: ID, htmlState: 1 }
        })
      }
    },
    PartersNum(data) {
      if (data) {
        return data.length
      }
    },
    PartersString(data) {
      if (data) {
        return data.toString()
      }
    },
    ImportantDegree(data) {
      // 重要程度（0 普通， 1紧急， 2重要， 3重要且紧急） = ['Commonly', 'Urgent', 'Important', 'UrgentAndImportant']
      var importList = ['普通', '紧急', '重要', '重要且紧急']
      return importList[data]
    },
    StatusDesc(data) {
      var theColor = ['#fff', '#76bc28', '#f99740', '#f00', '#f00']
      var StatusDescList = ['', '新任务', '已转交', '未通过', '已逾期']
      if (data != '') {
        // （0无状态，1新任务，2已转交，3未通过，4已逾期） = ['None', 'New', 'Removed', 'Failed', 'OverDue'],
        return `<span style="color:${theColor[data]}">${
          StatusDescList[data]
        }</span>`
      }
    },
    // 任务池--参加
    ifSureAdd() {
      var that = this
      return new Promise((resolve, reject) => {
        task
          .JoinTask(getToken(), that.addId)
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '恭喜你，成功加入此任务',
                type: 'success'
              })
              resolve()
            } else {
              that.$message({
                message: data.Message,
                type: 'warning'
              })
            }
            that.centerDialogVisible = false
            getList(
              that.groupingAct,
              that.pageIndex,
              that.pageSize,
              that.searchText,
              that
            )
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setProgressColor(state, state2) {
      // percentageColor: ['progress_bfbf', 'progress_yello', 'progress_yello','progress_bfbf']
      // 任务当前状态:0未开始(#bfbfbf),1进行中(#ff9b39),2待审核(#ff9b39),3已结束(#bfbfbf)
      if (state2 == 3) {
        return 'progress_red'
      } else {
        return this.percentageColor[state]
      }
    }
  }
}

function getList(searchtype, pageIndex, pageSize, searchText, that) {
  var searchTypes = ['all', 'new', 'ing', 'auditing', 'over'] // all-全部 new-未开始 ing-进行中 auditing-待审核 over-已结束
  that.fullscreenLoading = true
  var url
  if (searchText == '' || searchText == null) {
    if (that.TaskAct == 2) {
      // /public 公共池
      searchtype = 'public'
      return new Promise((resolve, reject) => {
        task
          .GetManageList(
            getToken(),
            searchtype,
            pageIndex,
            pageSize,
            searchText
          )
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.Successful) {
              that.dataList = response.data.Data.MangeTaskList
              that.DataLength = response.data.Data.TotalCount
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      // url = '../apix/v2/task/GetManageList?searchtype=public&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    } else {
      return new Promise((resolve, reject) => {
        task
          .GetMyTaskList(
            getToken(),
            searchTypes[searchtype],
            pageIndex,
            pageSize,
            searchText
          )
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.Successful) {
              that.dataList = response.data.Data.MangeTaskList
              that.DataLength = response.data.Data.TotalCount
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      // url = '../apix/v2/task/GetMyTaskList?searchtype=' + searchTypes[searchtype] + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    }
  } else {
    if (that.TaskAct == 2) {
      // /public 公共池
      searchtype = 'public'
      return new Promise((resolve, reject) => {
        task
          .GetManageList(
            getToken(),
            searchtype,
            pageIndex,
            pageSize,
            searchText
          )
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.Successful) {
              that.dataList = response.data.Data.MangeTaskList
              that.DataLength = response.data.Data.TotalCount
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      // url = '../apix/v2/task/GetManageList?searchtype=public&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&searchText=' + searchText;
    } else {
      return new Promise((resolve, reject) => {
        task
          .GetMyTaskList(
            getToken(),
            searchTypes[searchtype],
            pageIndex,
            pageSize,
            searchText
          )
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.Successful) {
              that.dataList = response.data.Data.MangeTaskList
              that.DataLength = response.data.Data.TotalCount
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      //  url = '../apix/v2/task/GetMyTaskList?searchtype=' + searchTypes[searchtype] + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&searchText=' + searchText;
    }
  }
}
</script>
<style lang="scss" scoped>
.temlateMain {
  .noData,
  .noData div {
    height: 100%;
  }
  .listB {
    background: url(/images/apply_empty.png) center no-repeat;
  }
  .searchB {
    background: url(/images/Task/pic_noresults.png) center no-repeat;
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
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;
    .el-container {
      height: 100%;
      .el-header {
        border-bottom: none;
        padding: 20px;
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          // margin-left: 20px;
          li {
            display: inline-block;
            float: left;
            line-height: 30px;
            font-size: 18px;
            color: #323232;
            cursor: pointer;
            font-weight: normal;
            &.active {
              color: #f99740;
            }
            &:hover {
              color: #f99740;
            }
            b {
              display: inline-block;
              height: 14px;
              width: 2px;
              background: #323232;
              margin: 0 10px;
            }
          }
        }
      }
      .el-main {
        .card {
          width: 370px;
          height: 228px;
          float: left;
          position: relative;
          margin: 16px 0px 16px 30px;
          .status {
            height: 38px;
            width: 80px;
            display: block;
            position: absolute;
            top: 12px;
          }
          .status.ing {
            background: url(/images/Task/ing.png) no-repeat center;
          }

          .status.finished {
            background: url(/images/Task/finished.png) no-repeat center;
          }

          .status.notstarted {
            background: url(/images/Task/notstarted.png) no-repeat center;
          }

          .status.pending {
            background: url(/images/Task/pending.png) no-repeat center;
          }

          .el-card {
            // height: 200px;
            .AuditStatus {
              float: right;
            }
            p.title {
              margin: 20px 10px;
              font-size: 20px;
              color: #323232;
              line-height: 20px;
              padding: 0;
              margin: 0;
              margin: 40px 0 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                display: inline-block;
                padding: 0px 6px;
                font-size: 12px;
                color: #f99740;
                border-radius: 4px;
                border: 1px solid #f99740;
                margin: 1px 10px 0 4px;
                float: left;
              }
            }
            p.people {
              margin: 20px 10px;
              font-size: 16px;
              color: #323232;
              line-height: 20px;
              padding: 0;
              margin: 0;
              margin: 20px 0 0;
              padding: 0 5px;
              overflow: hidden;
            }
            .thePeople {
              max-width: 260px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
              float: left;
            }
          }
        }
      }
    }
  }
}
.BoxContent_2 .card {
  height: 200px;
}
.BoxContent_2 .box-card {
  height: 200px;
}
.BoxContent_2 .btn_to {
  margin-top: 18px;
}
.btn_to {
  height: 50px;
  background: #f99740;
  margin-top: 18px;
  border-radius: 0 0 4px 4px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.btn_to.IsParter {
  background: #bfbfbf;
  cursor: default;
}

.BoxContent_2 {
  padding-top: 20px;
}
.BoxContent_2 .box-card {
  padding-top: 20px;
}
.BoxContent_2 .box-card p.time {
  margin: 26px 0 22px 0;
}
.temlateMain .BoxContent_2 .box-card p.title,
.BoxContent_2 .box-card p.time {
  padding: 0 20px;
}
</style>
