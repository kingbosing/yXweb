
<template>
    <el-container class="temlateMain" id="Calendar"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning" size="small">日历展示</el-button>
              <i></i>
              <el-button type="" size="small" @click="jumpIndex">明细展示</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
                <el-header height="50px">
                   <span>{{userName}}</span><b>|</b>
                   <span>{{departmentName}}</span><b>|</b>
                   <span>工号：{{jobNumber}}</span>
                </el-header>
                <el-container>
                   <el-aside width="640px">
                       <div class="box_a" style="margin-bottom:20px;">
                           <p class="titleLine"><b></b>出勤统计图</p>
                           <div class="progressBox">
                               <el-progress type="circle" :percentage="attendanceRate" color="#FFDFB5" :stroke-width="30" :width="200"></el-progress>
                               <p><b>●</b>正常出勤<i>|</i><b style="color:#ffc16f;">●</b>异常出勤</p>
                           </div>
                       </div>
                       <div class="box_a">
                           <p class="titleLine" style="border-bottom:none;"><b></b>出勤数据</p>
                           <ul class="viewBox">
                               <li><span :class="{'active':AttendanceDue>0}">{{AttendanceDue}}</span><p>应出勤(天)</p></li>
                               <li><span :class="{'active':ActualAttendance>0}">{{ActualAttendance}}</span><p>实出勤(天)</p></li>
                               <li><span :class="{'active':absenteeism>0}">{{absenteeism}}</span><p>旷工(天)</p></li>
                               <li><span :class="{'active':arriveLate>0}">{{arriveLate}}</span><p>迟到(次)</p></li>
                               <li style="border-right:none;"><span :class="{'active':leaveEarly>0}">{{leaveEarly}}</span><p>早退(次)</p></li>
                               <li><span :class="{'active':askForLeave>0}">{{askForLeave}}</span><p>请假(天)</p></li>
                               <li><span :class="{'active':LeakageCard>0}">{{LeakageCard}}</span><p>漏打卡(次)</p></li>
                               <li><span :class="{'active':workOvertime>0}">{{workOvertime}}</span><p>加班(天)</p></li>
                               <li><span :class="{'active':outside>0}">{{outside}}</span><p>外勤(天)</p></li>
                               <li style="border-right:none;"><span :class="{'active':changeTime>0}">{{changeTime}}</span><p>调休(天)</p></li>
                           </ul>
                       </div>
                   </el-aside>
                   <el-main>
                       <div class="box_a">
                           <p class="titleLine"><b></b>月统计</p>
                           <div>
                             <fullcalendar :events="fcEvents" lang='zh' ref="Calendar"
                              @changeMonth="changeMonth"
                              @eventClick="eventClick"
                              @dayClick="dayClick"
                              @moreClick="moreClick">
                                  <!--<template slot="fc-event-card" scope="p">
                                     <p><i class="fa"></i> {{ p.event.title }}test</p>
                                  </template>-->
                             </fullcalendar>
                           </div>
                       </div>
                   </el-main>
                </el-container>
            </el-container>
        </el-main>
        <!--弹窗-->
              <el-dialog title="提示" :visible.sync="centerDialogVisible_1" width="30%">
                  <p class="windowLine">签到时间：<span>漏打卡</span><b>补打卡</b></p>
                  <p class="windowLine">签到时间：<span>漏打卡</span><b>补打卡</b></p>
              </el-dialog>
              <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as attendanceStatistics from '@/api/attendanceStatistics'
import fullcalendar from 'vue-fullcalendar'
export default {
  components: {
    fullcalendar
  },
  data() {
    return {
      fullscreenLoading: false, // 加载效果状态值
      nowDate: '', // 当前日期
      centerDialogVisible_1: false,
      fcEvents: [
        {
          title: '迟到',
          start: '2018-11-02',
          end: '',
          cssClass: 'abnormal',
          YOUR_DATA: {}
        },
        {
          title: '早退',
          start: '2018-11-02',
          end: '',
          cssClass: 'abnormal',
          YOUR_DATA: {}
        },
        {
          title: '正常',
          start: '2018-11-08',
          end: '',
          cssClass: 'normal',
          YOUR_DATA: {}
        },
        {
          title: '休',
          start: '2018-11-18',
          end: '',
          cssClass: 'restDay',
          YOUR_DATA: {}
        }
      ],
      userName: '', // 用户名
      departmentName: '', // 所在部门
      jobNumber: '', // 工号
      attendanceRate: 0, // 出勤率
      AttendanceDue: 0, // 应出勤
      ActualAttendance: 0, // 实出勤
      absenteeism: 0, // 旷工
      arriveLate: 0, // 迟到
      leaveEarly: 0, // 早退
      askForLeave: 0, // 请假
      LeakageCard: 0, // 漏打卡
      workOvertime: 0, // 加班
      outside: 0, // 外勤
      changeTime: 0// 调休

    }
  },
  mounted() {

  },
  watch: {

  },
  methods: {
    // 获取数据
    getData(timeStr) {
      console.log('日期' + timeStr)
      const yearStr = timeStr.substring(0, 4)
      const monthStr = timeStr.substring(5, 7)
      const that = this
      that.fullscreenLoading = true
      attendanceStatistics.GetMyAtdMonth(getToken(), yearStr, monthStr).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          // that.GetJobWorkTypeslistData = res.data.Data
          that.userName = !res.data.Data.Nick ? '-' : res.data.Data.Nick// 用户名
          that.departmentName = !res.data.Data.DeptName ? '-' : res.data.Data.DeptName // 所在部门
          that.jobNumber = !res.data.Data.EmpolyeeNo ? '-' : res.data.Data.EmpolyeeNo // 工号
          that.attendanceRate = res.data.Data.AttendanceRate // 出勤率
          that.AttendanceDue = res.data.Data.AtdCount // 应出勤
          that.ActualAttendance = res.data.Data.ActCount // 实出勤
          that.absenteeism = res.data.Data.AbsCount // 旷工
          that.arriveLate = res.data.Data.LateCount // 迟到
          that.leaveEarly = res.data.Data.EarlyCount // 早退
          that.askForLeave = res.data.Data.LeaveCount // 请假
          that.LeakageCard = res.data.Data.MissCount // 漏打卡
          that.workOvertime = res.data.Data.OverCount // 加班
          that.outside = res.data.Data.OutCount // 外勤
          that.changeTime = res.data.Data.RestCount // 调休
          that.fullscreenLoading = false
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
          that.fullscreenLoading = false
        }
      })
    },
    // 跳转页面
    jumpIndex() {
      this.$router.push({ path: '/attendanceStatistics/myAttendanceDetails' })
    },
    changeMonth(start, end, current) {
      console.log(current)
      this.nowDate = current.slice(0, -3)
      this.getData(this.nowDate)
    },
    eventClick(event, jsEvent, pos) { // 点击日程
      console.log('eventClick', event, jsEvent, pos)
      // this.titleS = event.title
      this.centerDialogVisible_1 = true
    },
    dayClick(day, jsEvent) {
      // console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      // console.log('moreCLick', day, events, jsEvent)
    }
  }
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
      i{
          display: inline-block;
          width:15px;
          height:11px;
           background: url("../../assets/Attendance/icon_exchange.png") no-repeat center;
           margin: 0 10px;
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
            font-weight: normal;
            font-size: 14px;
            b{
                margin: 0 10px;
                color:#f99740;
            }
            i{
                cursor: pointer;
            }
         }
         .el-aside{
             padding: 10px 10px 10px 20px;
         }
          .progressBox{
              text-align: center;
              padding: 30px 0;
              p{
                  color:#8a8a8a;
                  margin-bottom: 0;
                  i{
                      font-style: normal;
                      margin: 0 37px;
                  }
                  b{
                      font-size: 20px;
                      margin-right: 8px;
                      color: rgb(255, 223, 181);
                  }
              }
          }
          .viewBox{
              padding: 0;
              margin: 0;
              list-style: none;
               overflow:hidden ;
              li{
                  width: 122px;
                  height:140px;
                  border-top: 1px solid #dedede;
                  border-right: 1px solid #dedede;
                  float: left;
                  text-align: center;
                  padding-top: 35px;
                  span{
                      font-size: 24px;
                      color:#bfbfbf;
                  }
                  .active{
                      color: #fea000;
                  }
                  p{
                      color:#8a8a8a;
                  }
              }
          }
         .el-main{
             padding: 10px 20px 10px 10px;
         }
    }
  }

}
.windowLine{
    color: #8a8a8a;
    span{
        margin: 0 20px;
        color:#323232;
    }
    b{
        font-weight: normal;
        color: #f99740;
        cursor: pointer;
        text-decoration:underline;
    }
}
.box_a{
    border-radius: 10px;
    box-shadow:0px 0px 10px 5px rgba(211,211,211,0.35);
}
.titleLine{
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-bottom: 1px solid #dedede;
  padding: 0 20px;
  b{
      display: inline-block;
      width: 3px;
      height: 12px;
      background-color: #f99740;
      margin-right: 6px;
  }
  i{
      float: right;
      color:#8a8a8a;
      font-style: normal;
  }
}

</style>
<style>
#Calendar .header-center{
   position: relative;
   top:-90px;
   z-index: 1000;
   width: 300px;
   left:-270px;
}
#Calendar .full-calendar-header{
    position: absolute;
}
#Calendar .comp-full-calendar{
    padding: 0;
}
#Calendar .full-calendar-body{
    margin-top: 0;
}
#Calendar .full-calendar-body .weeks{
    border-top:none;
}
#Calendar .week{
    height:50px;
    padding-top: 15px;
    font-weight: normal;
}
#Calendar .day-number{
    color:#8a8a8a;
    padding-right: 10px!important;
}
#Calendar .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item{
    background-color:transparent;
    text-align: center;
}
#Calendar .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.restDay{
    color:#bfbfbf;
}
#Calendar .normal{
 background: url("../../assets/Attendance/pic_normal.png") no-repeat;
 background-position:30% center;
}
#Calendar .abnormal{
background: url("../../assets/Attendance/pic_abnormal.png") no-repeat;
 background-position:30% center;
}
#Calendar .comp-full-calendar{
    width: 100%;
    max-width: 100%;
}
#Calendar .full-calendar-body .dates .dates-events .events-week .events-day{
    min-height: 100px;
}
#Calendar .el-progress-circle__track{
    stroke: #FFC16F;
}
#Calendar .el-dialog__body{
    padding-bottom: 20px;
}
</style>

