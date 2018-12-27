<template>
      <el-container class="temlateMain"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <!--  -->
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="ifSearch">
                <el-breadcrumb-item><span @click="toIndex">任务管理</span></el-breadcrumb-item>
                <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
            </el-breadcrumb>
            <template v-else>任务管理</template>

            <div class="header-right">
                <div class="tools_search">
                    <el-input
                    placeholder="请输入任务名称/参与人"

                    v-model="input"
                    @keyup.enter.native="toSearch">
                     <b slot="append" class="el-icon-search" @click="toSearch"></b>
                    </el-input>
                </div>

                 <el-button size="medium" @click="toNew">创建任务</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
                <el-header  height="60px">
                    <ul>
                        <li :class="{active:groupingAct==v}" v-for=" (k,v) in groupingList" :key="v" v-on:click="ToAct(v)">{{k}}<b v-if="v<groupingList.length-1"></b></li>

                    </ul>
                </el-header>
                <el-main height="100%" :class="setBackground(ifSearch,totalCount)">
                    <div></div>
                    <div class="card" v-for="k in dataList" :key="k.TaskID" v-on:click="toContent(k.TaskID)">
                        <b v-bind:class="{status:true,ing:k.TaskStatus==1,notstarted:k.TaskStatus==0,pending:k.TaskStatus==2,finished:k.TaskStatus==3}"></b>
                        <el-card class="box-card" shadow="hover">
                            <span class=" AuditStatus" v-html="StatusDesc(k.StatusDesc)"></span>
                            <p class="title"><span>{{ImportantDegree(k.ImportantDegree)}}</span><b v-bind:title="k.Title">{{k.Title}}</b></p>
                            <p class="people"><span class="thePeople" :title="PartersString(k.Parters)">参与人：{{PartersString(k.Parters)}}</span><span class="total"  v-if="PartersNum(k.Parters)">({{PartersNum(k.Parters)}}人)</span></p>
                            <p style="width:304px;margin: 20px 0 0 5px;" v-bind:class="{SpeedPercentZo:k.SpeedPercent==0}"> <el-progress :text-inside="true" :stroke-width="18" :percentage="k.SpeedPercent" v-bind:class="setProgressColor(k.TaskStatus ,k.StatusDesc )"></el-progress></p>
                            <p class="time">{{k.StartEndTime}}</p>
                        </el-card>
                    </div>
                </el-main>
                <el-footer  height="50px">
                     <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
                    </el-pagination>
                </el-footer>
            </el-container>
        </el-main>

    </el-container>
</template>

<script>
import { GetManageList } from '@/api/task.js'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      input: '',
      fullscreenLoading: false,

      groupingList: ['全部', '未开始', '进行中', '待审核', '已结束'],
      groupingAct: 0,

      size: 25,
      index: 1,
      totalCount: 0,
      searchText: '',
      ifSearch: false,
      dataList: [], // 列表数据

      percentageColor: ['progress_bfbf', 'progress_yello', 'progress_yello', 'progress_bfbf']
    }
  },
  mounted() {
    getList(this.groupingAct, this.index, this.size, '', this)
  },
  watch: {
    groupingAct: function(newData, oldData) {
      getList(this.groupingAct, 1, this.size, this.input, this)
      // this.ifSearch = false;
      // this.input = '';
    }
  },
  methods: {
    toNew() {
      this.$router.push({ path: '/task/NewTask' })
    },
    setBackground(ifSearch, totalCount) {
      if (!totalCount) {
        return ifSearch ? 'SearchBg' : 'listBg'
      }
    },
    toIndex() {
      this.ifSearch = false
      this.input = ''
      getList(this.groupingAct, 1, this.size, this.input, this)
    },
    ToAct(data) {
      this.groupingAct = data
    },
    handleSizeChange(data) {
      this.size = data
      getList(this.groupingAct, this.index, data, '', this)
    },
    handleCurrentChange(data) {
      this.index = data
      getList(this.groupingAct, data, this.size, '', this)
    },
    toSearch() {
      // getList(this.groupingAct, 1, this.pageSize, this.searchText)
      if (this.input) {
        this.ifSearch = true
        getList(this.groupingAct, this.index, this.size, this.input, this)
      } else {
        this.ifSearch = false
        getList(this.groupingAct, this.index, this.size, '', this)
      }
    },
    toContent(data) {
      // htmlState: 0, //页面导航显示，0-任务管理，1-我的任务
      // location.href = '/Task/TaskInfo?id=' + data + "&htmlState=0";
      this.$router.push({ path: '/task/TaskInfo', query: { id: data, htmlState: 0 }})
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
        return `<span style="color:${theColor[data]}">${StatusDescList[data]}</span>`
      }
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

function getList(searchtype, pageIndex, pageSize, searchText, app) {
  app.fullscreenLoading = true
  var url
  app.dataList = []
  app.totalCount = 0
  var searchTypes = ['all', 'new', 'ing', 'auditing', 'over']// all-全部 new-未开始 ing-进行中 auditing-待审核 over-已结束

  GetManageList(getToken(), searchTypes[searchtype], pageIndex, pageSize, searchText).then((res) => {
    app.fullscreenLoading = false
    var data = res.data
    //    console.log(data)
    if (data.Successful) {
      app.dataList = data.Data.MangeTaskList
      app.totalCount = data.Data.TotalCount
    }
  })
}
</script>

<style lang="scss" scoped>
.temlateMain {
  .el-header {
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
            padding: 20px;
            ul{
                list-style: none;
                margin: 0;
                padding: 0;
                // margin-left: 20px;
                li{
                    display: inline-block;
                    float: left;
                    line-height: 30px;
                    font-size: 18px;
                    color: #323232;
                    cursor: pointer;
                    font-weight: normal;
                    &.active{
                        color: #f99740;
                    }
                    &:hover{
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
        .el-main{
            .card {
                width: 370px;
                height: 228px;
                float: left;
                position: relative;
                margin: 16px 0px 16px 30px;
                cursor: pointer;
                .status {
                    height: 38px;
                    width: 80px;
                    display: block;
                    position: absolute;
                    top: 12px;
                }
                .status.ing {
                    background: url(/images/Task/ing.png)no-repeat center;
                }

                .status.finished {
                    background: url(/images/Task/finished.png)no-repeat center;
                }

                .status.notstarted {
                    background: url(/images/Task/notstarted.png)no-repeat center;
                }

                .status.pending {
                    background: url(/images/Task/pending.png)no-repeat center;
                }

                .el-card{
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
                        overflow:hidden;
                    }
                    .thePeople {
                        max-width: 260px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: inline-block;
                        float:left;
                    }
                }
            }
        }
    }
  }
}
</style>
