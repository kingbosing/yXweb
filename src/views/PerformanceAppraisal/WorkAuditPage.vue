<template>
    <el-container class="temlateMain" id="WorkRegistration" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
            <span :class="{'active' : getPage==1,'tab_btn':true}" @click="getPageChange(1)">工作登记</span>
            <span :class="{'active' : getPage==2,'tab_btn':true}" @click="getPageChange(2)">工作审核</span>
            <span :class="{'active' : getPage==3,'tab_btn':true}" @click="getPageChange(3)">月通用考核</span>
            <div class="header-right">
                <el-button type="warning" v-on:click="oneKey">一键审核</el-button>
                <el-button type="warning" v-on:click="putOnResult">提交本月考核结果</el-button>
                 <span style="margin-left:10px;">选择日期</span>
                 <span v-on:click="toLeft"><i class="el-icon-arrow-left"></i></span>
                 <el-date-picker v-model="todayTime" type="date" :picker-options="pickerOptions1" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择月"></el-date-picker>
                 <span v-on:click="toRight"><i class="el-icon-arrow-right"></i></span>
                 <b class="today" v-on:click="today"></b>
            </div>
        </el-header>
        <el-main>
              <el-container>
               <el-header height="60px">
                   <el-row>
                      <el-col :span="5"><div class="grid-content bg-purple">员工名称</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">职位</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">自评总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">直属领导评分总分</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
               </el-header>
               <el-main :class="{'emptyImg':listData.length==0}">
                  <el-row class="col"  v-for="k in listData" :key="k.Name">
                    <el-col :span="5"><div class="grid-content bg-purple">{{k.Name}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">{{!k.Job?'(空)':k.Job}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">{{k.SelfTotal}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">{{k.LeaderTotal}}</div></el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button size="mini" type="warning" v-on:click="toContent(k.PId)" v-if="k.Status==='未审核'">审核</el-button>
                            <template v-else>已审核</template>
                        </div>
                    </el-col>
                  </el-row>
               </el-main>
            </el-container>
        </el-main>
        <!--弹窗-->
        <!--****************************-->
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import * as performanceAppraisal from '@/api/performanceAppraisal'

export default {
  components: {

  },
  data() {
    return {
      getPage: 2,
      todayTime: this.getNowFormatDate(0),
      toNUm: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      listData: [], // 列表数据
      fullscreenLoading: false // 加载效果状态值

    }
  },
  mounted() {
    this.GetList(this.todayTime)
  },
  watch: {
    todayTime: function(newT, old) {
      this.GetList(newT)
    }
  },
  methods: {
    // 跳转到个人
    toContent: function(data) {
      this.$router.push({ path: '/PerformanceAppraisal/WorkAuditPersonal', query: { id: data, time: this.todayTime }})
    },
    // 一键审核
    oneKey() {
      const that = this
      performanceAppraisal.work_item_check_all(getToken(), that.todayTime).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.$message({
            message: '审核成功！',
            type: 'success',
            onClose: function() {
              that.GetList(that.todayTime)
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    // 提交本月审核
    putOnResult() {
      const MyProfileId = JSON.parse(sessionStorage.getItem('user')).Profile.ProfileId
      // const Time = this.todayTime.getFullYear() + '-' + (parseInt(this.todayTime.getMonth()) + 1)
      const Time = this.todayTime.split('-')[0] + '-' + this.todayTime.split('-')[1]
      console.log(MyProfileId, Time)
      const that = this
      performanceAppraisal.ReSumDirectMonthKpi(getToken(), MyProfileId, Time).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.$message({
            message: '考核结果提交成功!',
            type: 'success',
            onClose: function() {

            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    // 页面切换
    getPageChange(type) {
      if (type == 1) {
        this.$router.push({ path: '/PerformanceAppraisal/WorkRegistrationPage' })
      } else if (type == 3) {
        this.$router.push({ path: '/PerformanceAppraisal/GeneralAssessmentPage' })
      }
    },
    // 获取工作登记
    GetList(newT) {
      this.listData = []
      this.fullscreenLoading = true
      const that = this
      performanceAppraisal.work_list(getToken(), 1, 1000, newT).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.fullscreenLoading = false
          that.listData = res.data.Data.Records
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 日期处理
    getNowFormatDate(n) {
      console.log(n == 0)
      let curDate
      if (n == 0) {
        curDate = new Date()
      } else {
        curDate = new Date(this.todayTime)
      }
      console.log(curDate)
      const date = new Date(curDate.getTime() + n * 24 * 60 * 60 * 1000)
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    toRight() {
      if (this.todayTime < this.getNowFormatDate(0)) {
        this.todayTime = this.getNowFormatDate(1)
      }
    },
    toLeft() {
      this.todayTime = this.getNowFormatDate(-1)
    },
    today() {
      this.todayTime = this.getNowFormatDate(0)
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
      .today{
        width: 30px;
        height: 30px;
        display: inline-block;
        cursor: pointer;
        background: url(/images/meetingToday.png)no-repeat center;
        margin-left: 10px;
        position: relative;
        top: 7px;
      }
      span{
        font-weight: normal;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
  .el-main {
    height: 100%;
    padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            font-weight: normal;
            font-size: 14px;
            padding: 0;
            p{
                margin: 0;
                padding: 0 20px;
                height: 60px;
                line-height: 60px;
                .gery{
                    color:#8a8a8a;
                }
                .black{
                    margin-right: 20px;
                }
            }
            .el-row{
                 background-color: rgb(248, 248, 248);
              height: 60px;
              .grid-content.bg-purple{
                height: 60px;
               line-height: 60px;
               text-align: center;
               b{
                 color: #f99740;
                 margin-left: 5px;
               }
              }
            }
         }
         .el-main{
               .el-row{
              height: 60px;
              border-bottom: 1px solid #dedede;
              .grid-content.bg-purple{
                height: 60px;
               line-height: 60px;
               text-align: center;
               b{
                 color: #f99740;
                 margin-left: 5px;
               }
              }
            }
         }
    }
  }
}
.emptyImg{
background: url("/images/apply_empty.png") no-repeat center;
}
</style>

<style>
  #WorkRegistration .el-header .el-input__inner{
         border:none;
         text-align: center;
          cursor: pointer;
      }
  #WorkRegistration .el-header .el-input__prefix{
        display: none;
      }
  #WorkRegistration .el-header .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100px;
      }
   #WorkRegistration .el-header .el-input--medium .el-input__inner{
        padding: 0 10px 0 0;
      }
</style>
