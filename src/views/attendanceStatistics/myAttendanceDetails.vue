
<template>
    <el-container class="temlateMain" id="Calendar" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="" size="small" @click="jumpIndex">日历展示</el-button>
              <i></i>
              <el-button type="warning" size="small">明细展示</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
                <el-header height="50px">
                   <span>{{userName}}</span><b>|</b>
                   <span>{{departmentName}}</span><b>|</b>
                   <span>工号：{{jobNumber}}</span>
                   <span v-on:click="toLeft" class="leftSpan"><i class="el-icon-arrow-left"></i></span>
                   <el-date-picker v-model="todayTime" type="month" :picker-options="pickerOptions1" :clearable="false" value-format="yyyy-MM" placeholder="选择月"></el-date-picker>
                   <span v-on:click="toRight"><i class="el-icon-arrow-right"></i></span>
                </el-header>
                <el-main>
                    <el-table :data="listData" height="100%"  style="width: 100%">
                         <el-table-column prop="Name" label="用户名"></el-table-column>
                         <el-table-column prop="Size" label="日期"></el-table-column>
                         <el-table-column prop="Description" label="上班签到"></el-table-column>
                         <el-table-column prop="Status" label="下班签到时间"></el-table-column>
                         <el-table-column prop="Status" label="考勤结果"></el-table-column>
                         <el-table-column prop="Name" label="迟到时间"></el-table-column>
                         <el-table-column prop="Size" label="早退时间"></el-table-column>
                         <el-table-column prop="Description" label="加班时长"></el-table-column>
                         <el-table-column prop="Status" label="签到明细">
                                <template slot-scope="scope">
                                       <el-popover placement="left" width="200" trigger="hover">
                                            <p class="titleLine"><span>地址：</span>2323233</p>
                                            <p class="titleLine"><span>备注：</span>2323233</p>
                                            <span slot="reference" class="hoverBtn">查看</span>
                                       </el-popover>
                                </template>
                         </el-table-column>
                         <el-table-column prop="" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="warning" size="small" @click="operationFun(scope.row)">补卡</el-button>
                                </template>
                         </el-table-column>
                    </el-table>
                </el-main>
                <el-footer>
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
      fullscreenLoading: false, // 加载效果状态值
      todayTime: this.getNowFormatDate(0),
      toNUm: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      listData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }], // 列表数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      userName: '', // 用户名
      departmentName: '', // 所在部门
      jobNumber: '' // 工号
    }
  },
  mounted() {
    this.GetList(this.todayTime, this.index, this.size)
  },
  watch: {
    todayTime: function(newT, old) {
      this.GetList(newT, this.index, this.size)
    }
  },
  methods: {
    // 获取数据
    GetList(timeS, index, size) {
      console.log(timeS, index, size)
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.GetJobWorkTypes(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          // that.GetJobWorkTypeslistData = res.data.Data
          that.userName = '用户A'// 用户名
          that.departmentName = 'UI组' // 所在部门
          that.jobNumber = '123123123' // 工号
          that.fullscreenLoading = false
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 补卡跳转申请表单
    operationFun(data) {
      console.log(data)
    },
    // 跳转页面
    jumpIndex() {
      this.$router.push({ path: '/attendanceStatistics/myAttendance' })
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      this.GetList(this.todayTime, this.index, this.size)
    },
    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.GetList(this.todayTime, this.index, this.size)
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
      const date = new Date(curDate.getTime())
      date.setMonth(date.getMonth() + n)
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
      const currentdate = year + seperator1 + month
      return currentdate
    },
    toRight() {
      if (this.todayTime < this.getNowFormatDate(0)) {
        this.todayTime = this.getNowFormatDate(1)
      }
    },
    toLeft() {
      this.todayTime = this.getNowFormatDate(-1)
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
            .leftSpan{
                margin-left: 100px;
            }
         }
         .el-main{
             padding: 0;
             .hoverBtn{
                 color:#8a8a8a;
             }
             .hoverBtn:hover{
                 color: #f99740;
             }
         }
    }
  }

}
.titleLine{
         margin: 0;
         span{
             color: #8a8a8a;
         }
             }
</style>
<style>
  #Calendar .el-header .el-input__inner{
         border:none;
         text-align: center;
          cursor: pointer;
      }
  #Calendar .el-header .el-input__prefix{
        display: none;
      }
  #Calendar .el-header .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100px;
      }
   #Calendar .el-header .el-input--medium .el-input__inner{
        padding: 0;
      }
</style>
