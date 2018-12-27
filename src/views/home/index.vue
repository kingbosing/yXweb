<template>
    <div class="home"  v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <header>
            <div class="header_nav">
                <div class="left">
                    <b class="yellow_icon"></b>快捷入口</div>
                <!-- <span class="right">查看更多>></span> -->
            </div>
            <div class="header_conter" v-if="ApplyTypeIds.length>=0">
                <div class="cell" v-for="(k,v) in quickEntryList" :key="v">
                    <router-link :to="toQuick(k,k.type)">
                        <svg class="icon icon_fastEnto" aria-hidden="true">
                            <use :xlink:href="k.icon"></use>
                        </svg>
                        <div class="name">{{k.name}}</div>
                    </router-link>
                </div>
            </div>

        </header>
        <div class="middle">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="middle_cell middle_left">
                        <el-container>
                            <el-aside width="145px" class="left">
                                <div :class="{'tab':true, 'tab_act':approvalTab==1}" @click="approvalTab=1">
                                    <p>待阅</p>
                                    <P><span>{{UnreadCount}}</span>/条</P>
                                </div>
                                <div :class="{'tab':true, 'tab_act':approvalTab==2}" @click="approvalTab=2">
                                    <p>待办</p>
                                    <p><span>{{UnoptCount}}</span>/条</p>
                                </div>
                            </el-aside>
                            <el-main class="right">
                                <div class="header_nav">
                                    <span class="right" @click="getMoreApproval">查看更多>></span>
                                </div>
                                <div class="cell" v-for="(k,v) in UnReadAndUnoptList" :key="v" v-if="v<5" @click="goApproval(k.ApplyRequestID,k.ApprovalID)">
                                    <el-col :span="18">【{{getType(k.ApprovalContent)}}】 {{k.PresenterName}} 发起的 {{getType(k.ApprovalContent)}} 申请</el-col>
                                    <el-col :span="6" style="text-align:right "><span class="color-8a">{{getTime(k.Time)}}</span></el-col>
                                </div>
                                <div class="no_list" v-show="UnReadAndUnoptCount===0">
                                  <img src="/images/kong.png" alt="Alternate Text" />
                                  <p>暂无数据！</p>
                                </div>
                            </el-main>
                        </el-container>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="middle_cell middle_right">
                      <div class="header_nav">
                          <div class="left">
                              <b class="yellow_icon"></b>公告</div>
                          <span class="right" @click="getMoreNotice">查看更多>></span>
                      </div>
                      <div class="cell" v-for="(k,v) in NoticeList" v-if="v<5" :key="v" @click="toNoticeContent(k.NoticeId)">
                        <el-col :span="18">
                          <b :class=" getNoticeIcon(k.TypeId)"></b><span>[{{k.TypeName}}] {{k.Title}}</span>
                        </el-col>
                        <el-col :span="6" class="text_right color-8a">{{k.UpdateTime}}</el-col>

                      </div>
                      <div class="no_list" v-show="NoticeList.length<=0">
                        <img src="images/kong.png" alt="Alternate Text" />
                        <p>暂无公告！</p>
                      </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <footer>
            <el-row :gutter="20">
                <el-col :span="17">
                    <div class="footer_cell footer_left">
                      <div class="header_nav">
                          <div class="left">
                            <b class="yellow_icon"></b>我的任务
                          </div>
                          <span class="right" @click="toTaskMore">查看更多>></span>
                      </div>

                      <div class="cell" v-for="(k,v) in TaskListCmputed" :key="v" v-if='v<6' @click="toTaskContent(k.TaskID)">

                        <el-container>
                          <el-aside width="220px">
                            <div class="degree cell_ce" >
                              <span :class='getTaskIco(k.ImportantDegree,false)'><b></b>{{getTaskIco(k.ImportantDegree,true)}}</span>
                            </div>
                            <div class="time cell_ce color-8a">{{getTime(k.StartEndTime)}}</div>
                          </el-aside>
                          <el-main>
                            <div class="other cell_ce">
                              <el-row>
                                <el-col :span="10">{{k.Title}}</el-col>
                                <el-col :span="14">
                                   <el-progress v-bind:stroke-width="10" v-bind:percentage="k.SpeedPercent"></el-progress>
                                </el-col>
                              </el-row>
                            </div>
                          </el-main>
                        </el-container>
                      </div>
                      <div class="no_list" v-show="TaskListCmputed.length<=0">
                        <img src="images/kong.png" alt="Alternate Text" />
                        <p>暂无任务！</p>
                      </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="footer_cell footer_right">
                      <div class="header_nav">
                          <div class="left">
                            <b class="yellow_icon"></b>考勤排行榜
                          </div>
                          <span class="right" @click="toRankMore">查看更多>></span>
                      </div>
                      <div class="top"  v-if="listRank">
                        <el-col :span="8">
                          <div v-if="listRank[1]">
                            <div class="two_face">
                              <img :src="faceUrl(listRank[1].PtotoUrl,47)" alt="" class="face">
                            </div>
                            <div class="name">
                              {{listRank[1].Name}}
                            </div>
                            <div class="time">{{subTime(listRank[1].SignTime)}}</div>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div v-if="listRank[0]">
                            <div class="one_face">
                              <img :src="faceUrl(listRank[0].PtotoUrl,57)" alt="" class="face">
                            </div>
                            <div class="name">
                              {{listRank[0].Name}}
                            </div>
                            <div class="time">
                              {{subTime(listRank[0].SignTime)}}
                            </div>
                          </div>
                          <div v-else></div>
                        </el-col>
                        <el-col :span="8">
                          <div v-if="listRank[2]">
                            <div class="there_face">
                              <img :src="faceUrl(listRank[2].PtotoUrl,47)" alt="" class="face">
                            </div>
                            <div class="name">
                              {{listRank[2].Name}}
                            </div>
                            <div class="time">{{subTime(listRank[2].SignTime)}}</div>
                          </div>
                        </el-col>
                      </div>
                      <div class="topList" v-if="listRank">
                        <div class="cell myCell">
                          <div v-if="MyRanking" nowrap>
                            <span class="num">{{MyRanking}}</span>
                            <span class="face">
                              <img :src="faceUrl(MyRank.PtotoUrl,20)" alt="">
                            </span>
                            <span class="name">{{MyRank.Name}}</span>
                            <span class="time">{{subTime(MyRank.SignTime)}}</span>
                            <span class="dsc color-main">您已打败了{{MyRankTop}}%的同事！</span>
                          </div>
                          <div class="text_center" v-else>提示：您今日尚未打卡！</div>
                        </div>
                        <div class="cell" v-for="(k,v) in listRank" :key="v" v-if="v>=3&&v<6">
                          <span class="num text_center">{{v+1}}</span>
                          <span class="face">
                             <img :src="faceUrl(k.PtotoUrl,20)" alt="">
                          </span>
                          <span class="name">{{k.Name}}</span>
                          <span class="time color_8a">{{subTime(k.SignTime)}}</span>
                        </div>
                      </div>
                      <div v-if="!listRank" class="text-center" style="line-height:260px;">今日无人打卡，赶快来做第一名吧！</div>
                    </div>
                </el-col>
            </el-row>
        </footer>
    </div>
</template>

<script>
// import './iconfont_home.js'
import { GetUnReadAndUnopt, get_mynotice, GetMyTaskList, ranking } from '@/api/home'
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import { gettemplate } from '@/api/applyapproval'
// import { resolve } from 'url'
// import { rejects } from 'assert'

export default {
  data() {
    return {
      fullscreenLoading: false,
      approvalTab: 1,
      UnReadAndUnoptList: '',
      UnReadAndUnoptCount: 0,
      // 代办
      UnoptList: '',
      UnoptCount: '',
      // 待阅
      UnreadCount: '',
      UnreadList: '',
      // 快捷入口信息
      ApplyTypeIds: '', // 申請表單類型Id
      quickEntryList: [],
      EntryList: [
        {
          name: '请假',
          icon: '#icon-web-tubiao-10',
          path: '/ApplyApproval/toApply',
          type: 1
        },
        {
          name: '加班',
          icon: '#icon-web-tubiao-1',
          type: 1,
          path: '/ApplyApproval/toApply'
        },
        {
          name: '补卡',
          icon: '#icon-web-tubiao-3',
          type: 1,
          path: '/ApplyApproval/toApply'
        },
        {
          name: '工作登记',
          icon: '#icon-web-tubiao-20',
          type: 2,
          path: '/PerformanceAppraisal/WorkRegistrationPage'
        },
        {
          name: '客户管理',
          icon: '#icon-web-tubiao-5',
          type: 2,
          path: '/CustomerManagement/Index'
        },
        {
          name: '我的任务',
          type: 2,
          icon: '#icon-web-tubiao-21',
          path: '/Task/MyTask'
        },
        {
          name: '我的会议',
          icon: '#icon-web-tubiao-22',
          type: 2,
          path: '/MyMeeting/Index'
        },
        {
          name: '会议室使用情况',
          icon: '#icon-web-tubiao-7',
          type: 2,
          path: '/MyMeeting/MeetingRoomState'
        },
        {
          name: '考勤明细',
          icon: '#icon-web-tubiao-',
          type: 3,
          path: '/Attendance/MyAttendance'
        },
        {
          name: '金融服务',
          icon: '#icon-web-tubiao-2',
          type: 3,
          path: '/FinancialServices/'
        }
      ],
      // 公告列表
      NoticeList: [],
      // 任务列表
      TaskList: [],
      // 打卡列表
      listRank: [],
      // 我的打卡
      MyRank: [],
      MyRanking: '',
      MyRankTop: 0,
      theName: {
        'Leave': '请假',
        'Over': '加班',
        'Out': '外出',
        'General': '通用',
        'Reissue': '补卡',
        'BusinessTrip': '出差',
        'Bill': '开票',
        'EmpNeed': '人员需求',
        'EmpPositive': '员工转正',
        'EmpLeave': '员工离职',
        'ReimBursed': '报销',
        'Payment': '付款',
        'MaterialRequisition': '物品领用',
        'Purchase': '采购',
        'ConTract': '合同'
      }
    }
  },
  beforeMount() {
    this.fullscreenLoading = true
    this.init()
  },
  watch: {
    approvalTab() {
      this.UnReadAndUnoptList = []
      if (this.approvalTab === 1) {
        this.UnReadAndUnoptList = this.UnreadList
      } else if (this.approvalTab === 2) {
        this.UnReadAndUnoptList = this.UnoptList
      }
    }
  },
  computed: {
    TaskListCmputed: function() {
      return this.TaskList.filter(function(item, index) {
        return item.TaskStatus == 1 || item.TaskStatus == 2
      })
    }
  },
  methods: {
    init() {
      // 待阅 待办
      getGetUnReadAndUnopt(this)
      // 公告
      getMyNotice(this)
      // 任务
      toGetMyTaskList(this)
      // 打开排名
      toRanking(this)

      // 申請類型
      getApplyType().then(c => {
        // console.log(c)
        this.ApplyTypeIds = c.Data
        this.quickEntryList = this.EntryList
        this.fullscreenLoading = false
      })
    },
    goApproval: function(m, n) {
      // console.log(id);
      this.$router.push({ path: '/ApplyApproval/ApprovalContent', query: { ApplyID: m, ApprovalID: n }})
    },

    getType(data) {
      const Data = JSON.parse(data)
      for (const item in Data) {
        // console.log(item)
        return this.theName[item]
      }
    },
    getTime(time) {
      return time.split(' ')[0] || ''
    },
    getNoticeIcon(id) {
      const ids = ['', 'NoticeIcon_people', 'NoticeIcon_holiday', 'NoticeIcon_administrative',
        'NoticeIcon_Notice', 'NoticeIcon_everyday', 'NoticeIcon_other']
      const getIcon = ids[id]
      return 'NoticeIcon ' + getIcon
    },
    toNoticeContent(id) {
      // /?id=Uzgf
      this.$router.push({ path: '/announcement/Details', query: { id }})
      // window.location.href = '/Announcement/Details?id=' + id
    },

    getTaskIco(data, name) {
      if (!name) {
        return (data == 0 && 'task_general') || (data == 1 && 'task_urgent') || (data == 2 && 'task_important') || (data == 3 && 'task_urgentimportant')
      } else {
        return (data == 0 && '普通') || (data == 1 && '紧急') || (data == 2 && '重要') || (data == 3 && '紧急且重要')
      }
    },
    toTaskContent(id) {
      this.$router.push({ path: '/task/TaskInfo', query: { id: id }})
    },
    toTaskMore() {
      this.$router.push({ path: '/task/mytask' })
    },
    getMoreApproval() {
      this.$router.push({ path: '/ApplyApproval/Approval' })
    },
    getMoreNotice() {
      this.$router.push({ path: '/Announcement/Index' })
    },
    subTime(data) {
      return data.substring(11, 16)
    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      } else {
        return noLogo
      }
    },
    toRankMore() {
      //
      location.href = '/Attendance/MyAttendance'
    },
    toQuick(row, type) {
      if (type === 1 && this.ApplyTypeIds.length) {
        const thisType = this.ApplyTypeIds.filter(c => {
          return c.Name == row.name
        })
        // console.log(thisType)
        // name=请假&id=UYB6
        if (thisType.length) {
          return { path: row.path, query: { name: thisType[0].Name, id: thisType[0].Id }}
        }
      } else if (type === 3) {
        // location.href = row.path
        // return { path: row.path }
        return ''
      } else if (type === 2) {
        return { path: row.path }
      }
    }

  }
}

var getGetUnReadAndUnopt = (app) => {
  GetUnReadAndUnopt(getToken()).then(res => {
    const data = res.data
    // console.log(data)
    app.UnReadAndUnoptList = data.Data.UnreadList
    app.UnReadAndUnoptCount = data.Data.UnreadCount

    app.UnoptList = data.Data.UnoptList
    app.UnoptCount = data.Data.UnoptCount
    app.UnreadCount = data.Data.UnreadCount
    app.UnreadList = data.Data.UnreadList
  })
}

var getMyNotice = (app) => {
  get_mynotice(getToken()).then(res => {
    const data = res.data
    // console.log(data)
    app.NoticeList = data.Data
  })
}

var toGetMyTaskList = (app) => {
  GetMyTaskList(getToken()).then(res => {
    const data = res.data
    // console.log(data)
    app.TaskList = data.Data.MangeTaskList
  })
}

var toRanking = (app) => {
  ranking(getToken()).then(res => {
    const data = res.data.Data
    // console.log(data)
    app.listRank = data.AtdRanking
    app.MyRank = data.Mine
    app.MyRanking = data.MyRanking

    app.MyRankTop = parseInt(100 - ((data.MyRanking - 1) * 100 / (data.AtdRanking || []).length))
  })
}

var getApplyType = () => {
  return new Promise((resolve, reject) => {
    gettemplate(getToken()).then(c => {
      // console.log(c)
      resolve(c.data)
    })
  })
}

</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.home {
  background: #eee;
  color: #333;
  .icon_fastEnto {
    font-size: 65px;
    &:hover {
      font-size: 70px;
    }
  }
  .header_nav {
    height: 46px;
    line-height: 46px;
    // padding: 0 20px;
    .left {
      width: 100px;
      float: left;
      .yellow_icon {
        height: 14px;
        width: 2px;
        background: #f99740;
        float: left;
        margin: 17px 5px 0 0;
      }
    }
    .right {
      float: right;
      color: #8a8a8a;
      cursor: pointer;
    }
  }
  header {
    height: 160px;
    width: 100%;
    padding: 0 20px;
    background: #fff;
    margin-bottom: 20px;
    .header_conter {
      .cell {
        height: 100px;
        width: 10%;
        float: left;
        margin-top: 5px;
        text-align: center;
        .name {
          height: 20px;
          line-height: 20px;
          margin-top: 7px;
        }
      }
    }
  }
  .middle {
    height: 330px;
    width: 100%;
    // background: #fff;
    margin-bottom: 20px;
    .middle_cell {
      height: 330px;
      width: 100%;
      background: #fff;
      .no_list{
        height: 100px;
        text-align: center;
        margin-top: 25px;
      }
    }
    .middle_left {
      .el-container {
        padding: 0;
        height: 100%;
      }
      .left {
        height: 100%;
        .tab {
          height: 50%;
          width: 100%;
          cursor: pointer;
          background: url(../../assets/home/pic_todo.png) no-repeat;
          p:nth-child(1){
            font-size: 13px;
            padding: 14px;
             color: #fea000;
          }
          p:nth-child(2){
            font-size: 13px;
            margin-top:90px;
            margin-left:80px;
            color: #fea000;
            span{
                font-size: 23px;
            }
          }

          &.tab_act {
            background: url(../../assets/home/pic_read.png) no-repeat;
            p {
                color: #fff;
            }
          }

        }
        p{
            padding: 0;
            margin: 0;
        }

      }
      .el-main.right {
        height: 100%;
        padding: 0 20px;
        .cell{
            height:20px;
            margin-bottom: 32px;
            overflow: hidden;
            line-height: 20px;
            cursor: pointer;
        }

      }
    }
    .middle_right{
      padding:0 20px;
      .header_nav{
        border-bottom: 1px solid #eee;
      }
      .cell{
        height: 28px;
        line-height: 20px;
        margin: 24px 0 0;
        cursor: pointer;
        .NoticeIcon{
          height: 20px;
          width: 20px;
          display: block;
          float: left;
          margin-right: 20px;
          &.NoticeIcon_people{
            background: url(../../assets/home/noticeIcon.png)0 0;
          }
          &.NoticeIcon_holiday{
            background: url(../../assets/home/noticeIcon.png)-90px 0;
          }
          &.NoticeIcon_administrative{
            background: url(../../assets/home/noticeIcon.png)-60px 0;
          }
          &.NoticeIcon_Notice{
            background: url(../../assets/home/noticeIcon.png)-30px 0;
          }
          &.NoticeIcon_everyday{
            background: url(../../assets/home/noticeIcon.png)-120px 0;
          }
          &.NoticeIcon_other{
            background: url(../../assets/home/noticeIcon.png)-150px 0;
          }
        }
      }
    }
  }
  footer {
    height: 400px;
    width: 100%;
    // background: #fff;
    margin-bottom: 20px;
    .footer_cell {
      height: 400px;
      width: 100%;
      background: #fff;
      padding:0 20px;
      .header_nav{
        border-bottom: 1px solid #eee;
      }
    }
    .footer_left{
      .no_list[data-v-5954443c] {
          height: 100px;
          text-align: center;
          margin-top: 60px;
      }
      .cell{
        height: 24px;
        line-height: 20px;
        margin:28px 0 0;
        padding:0 10px;
        cursor: pointer;
        .el-main{
          padding: 0;
        }
        .cell_ce{
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // background: #8a8a8a;
          &.degree{
            width: 90px;
            height: 20px;
            margin-right: 16px;
            span b{
              height: 20px;
              width: 20px;
              display: block;
              float: left;
              margin-top: 2px;
            }
            .task_general{
              b{
                background: url(../../assets/home/taskicon.png)-56px 0 no-repeat;
              }
              color: #7cc953;
            }
            .task_urgent{
              b{
                background: url(../../assets/home/taskicon.png)0 0 no-repeat;
              }
              color: #35abee;
            }
            .task_important{
              b{
                background: url(../../assets/home/taskicon.png)-28px 0 no-repeat;
              }
              color: #fea000;
            }
            .task_urgentimportant{
              b{
                background: url(../../assets/home/taskicon.png)-84px 0 no-repeat;
              }
              color: #e55d64;
            }
          }
           &.time{
            width: 86px;
            height: 20px;
            margin-right: 16px;
          }
           &.other{
            height: 20px;
            width:100% ;
          }
        }
      }

    }
    .footer_right{
      padding:0;
      .header_nav{
        margin:0 20px;
      }
      .top{
        padding:0 4px;
        overflow: hidden;
        margin-bottom: 25px;
        .el-col{
          text-align: center;
        }
        .name{
            font-size: 14px;
            line-height: 28px;
          }
          .time{
            font-size: 18px;
            line-height: 20px;
            color: #8a8a8a;
          }
        .one_face{
          height: 83px;
          width: 60px;
          margin: 10px auto 0;
          background: url(../../assets/home/top_1.png)no-repeat center;
          position: relative;
          .face{
            height: 57px;
            width: 57px;
            // background: #ccc;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 2px;
          }
        }
        .two_face{
          height: 66px;
          width: 50px;
          margin: 28px auto 0;
          background: url(../../assets/home/top_2.png)no-repeat center;
          position: relative;
          .face{
            height: 47px;
            width: 47px;
            // background: #ccc;
            border-radius: 50%;
            position: absolute;
            top: 18px;
            left: 2px;
          }
        }
        .there_face{
          height: 66px;
          width: 50px;
          margin: 28px auto 0;
          background: url(../../assets/home/top_3.png)no-repeat center;
          position: relative;
          .face{
            height: 47px;
            width: 47px;
            // background: #ccc;
            border-radius: 50%;
            position: absolute;
            top: 18px;
            left: 2px;
          }
        }
      }
      .topList{

        .cell{
          line-height: 46px;
          overflow: hidden;
          padding:0 0 0 20px;
          &.myCell{
            background: #fef4ec;
            color: #333;
            padding:0 0 0 20px;
            position: relative;
            .dsc{
              position: absolute;
              left: 240px;
              // top:10px;
            }
          }
          span{
            overflow: hidden;
            float: left;
            display: block;
            height: 46px;
          }
          .num{
            width: 30px;
            margin-right: 20px;
            text-align: center;
            // display: inline-block;
          }
          .face{
            width: 20px;
            margin-right: 10px;
            height: 20px;
            margin-top: 14px;
            border-radius: 50%;
            img{
              float: left;
            }
          }
          .name{
            margin-right: 32px;
            min-width: 52px;
            max-width: 80px;
            // overflow: hidden;
            // display: inline-block;
          }
          .time{
            // margin-right: 14px;
            min-width: 52px;
            max-width: 80px;
            // display: inline-block;
          }
        }
      }
    }
  }
}
</style>

