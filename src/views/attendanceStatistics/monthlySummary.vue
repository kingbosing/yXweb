
<template>
    <el-container class="temlateMain"  id="monthlySummary" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>月度汇总</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning" size="medium" @click="exportFun">导出</el-button>
              <el-button type="warning" size="medium" v-on:click="toPrint">打印</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
               <el-header height="50px">
                  <div class="lineBox">
                      <el-date-picker v-model="valueDate"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:350px;"></el-date-picker>
                      <select-group v-model='selectDate' ref="transEvent"></select-group>
                      <el-button type="warning" size="medium" style="margin-left:10px;" @click="searchFun">搜索</el-button>
                  </div>
               </el-header>
               <el-main>
                    <div id="mydiv">
                      <el-table :data="listData" height="100%" border  style="width: 100%">
                         <el-table-column prop="name" label="姓名"></el-table-column>
                         <el-table-column prop="Size" label="工号"></el-table-column>
                         <el-table-column prop="Description" label="部门"></el-table-column>
                         <el-table-column prop="Status" label="应出勤"></el-table-column>
                         <el-table-column prop="Status" label="实际出勤"></el-table-column>
                         <el-table-column prop="name" label="旷工">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="absenteeism(scope.row,1)">2</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="Size" label="上班未打卡次数">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="absenteeism(scope.row,2)">2</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="name" label="下班未打卡次数">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="absenteeism(scope.row,3)">2</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="Size" label="迟到次数">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="lateFun(scope.row,1)">2</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="Description" label="迟到分钟数"></el-table-column>
                         <el-table-column prop="Status" label="早退次数">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="lateFun(scope.row,2)">2</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="Status" label="早退分钟数"></el-table-column>
                         <el-table-column prop="name" label="外勤"></el-table-column>
                         <el-table-column prop="Size" label="加班次数"></el-table-column>
                         <el-table-column prop="Description" label="加班时间">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="overtime(scope.row)">2小时</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="" label="调休">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="travelFun(scope.row,1)">2小时</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="" label="请假">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="travelFun(scope.row,2)">2小时</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="" label="外出">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="travelFun(scope.row,3)">2小时</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="Status" label="出差">
                                <template slot-scope="scope">
                                    <span class="underlineBtn" @click="travelFun(scope.row,4)">2小时</span>
                                </template>
                         </el-table-column>
                      </el-table>
                    </div>
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
        <!--**************加班**************-->
        <el-dialog title="加班时间" :visible.sync="centerDialogVisible_1" width="30%">
           <p class="tab_p"><span :class="{'active' : overtimeTab==1}" @click="overtimeTab=1">非调休部分</span><span :class="{'active' : overtimeTab==2}" @click="overtimeTab=2">调休部分</span></p>
           <el-row class="titleRow">
              <el-col :span="12"><div class="grid-content bg-purple">日期</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">时间</div></el-col>
           </el-row>
           <div v-if="overtimeTab==1">
               <el-row>
                 <el-col :span="12"><div class="grid-content bg-purple">2018-10-09</div></el-col>
                 <el-col :span="12"><div class="grid-content bg-purple-light">18：30-20：30<b>(加班2个小时)</b></div></el-col>
               </el-row>
           </div>
           <div v-else>
               <el-row>
                 <el-col :span="12"><div class="grid-content bg-purple">2018-10-10</div></el-col>
                 <el-col :span="12"><div class="grid-content bg-purple-light">18：30-20：30<b>(加班2个小时)</b></div></el-col>
               </el-row>
           </div>
        </el-dialog>
        <!--************调休、请假、外出、出差****************-->
        <el-dialog :title="boxT_1" :visible.sync="centerDialogVisible_2" width="30%">
           <el-row class="titleRow">
              <el-col :span="12"><div class="grid-content bg-purple">日期</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">时间</div></el-col>
           </el-row>
               <el-row>
                 <el-col :span="12"><div class="grid-content bg-purple">2018-10-09</div></el-col>
                 <el-col :span="12"><div class="grid-content bg-purple-light">18：30-20：30<b>({{boxT_1}}2个小时)</b></div></el-col>
               </el-row>
        </el-dialog>
        <!--************旷工、上班却卡、下班缺卡****************-->
        <el-dialog :title="boxT_2" :visible.sync="centerDialogVisible_3" width="30%">
           <el-row class="titleRow">
              <el-col :span="12"><div class="grid-content bg-purple">日期</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">时间</div></el-col>
           </el-row>
               <el-row>
                 <el-col :span="12"><div class="grid-content bg-purple">2018-10-09</div></el-col>
                 <el-col :span="12"><div class="grid-content bg-purple-light">9:00</div></el-col>
               </el-row>
        </el-dialog>
        <!--************迟到次数、早退次数****************-->
        <el-dialog :title="boxT_3" :visible.sync="centerDialogVisible_4" width="30%">
           <el-row class="titleRow">
              <el-col :span="12"><div class="grid-content bg-purple">日期</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">时间</div></el-col>
           </el-row>
               <el-row>
                 <el-col :span="12"><div class="grid-content bg-purple">2018-10-09</div></el-col>
                 <el-col :span="12"><div class="grid-content bg-purple-light">9:00<i>({{boxT_1}}2个小时)</i></div></el-col>
               </el-row>
        </el-dialog>
        <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import * as performanceAppraisal from '@/api/performanceAppraisal'
import SelectGroup from '../Attendance/components/selectGroup'
export default {
  components: {
    SelectGroup
  },
  data() {
    return {
      getPage: 0,
      fullscreenLoading: false, // 加载效果状态值
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
      valueDate: '',
      // region: '',
      selectDate: [], // 选部门或人
      begin: '',
      end: '',
      deptId: '',
      profileId: '',
      centerDialogVisible_1: false,
      overtimeTab: 1,
      centerDialogVisible_2: false,
      boxT_1: '',
      centerDialogVisible_3: false,
      boxT_2: '',
      centerDialogVisible_4: false,
      boxT_3: ''
    }
  },
  mounted() {
    this.getList(1, this.size, this.begin, this.end, this.deptId, this.profileId)
  },
  watch: {
  },
  methods: {
    // 搜索
    searchFun() {
      console.log(this.selectDate)
      this.begin = this.valueDate[0]
      this.end = this.valueDate[1]
      if (this.selectDate.ItemType == 0) { // 部门
        this.deptId = this.selectDate.ItemId
        this.profileId = ''
      } else { // 人
        this.deptId = ''
        this.profileId = this.selectDate.ItemId
      }
      this.getList(this.index, this.size, this.begin, this.end, this.deptId, this.profileId)
    },
    // 迟到次数、早退次数
    lateFun(data, type) {
      if (type == 1) {
        this.boxT_3 = '迟到'
      } else if (type == 2) {
        this.boxT_3 = '早退'
      }
      this.centerDialogVisible_4 = true
    },
    // 旷工、上班缺卡、下班缺卡
    absenteeism(data, type) {
      if (type == 1) {
        this.boxT_2 = '旷工'
      } else if (type == 2) {
        this.boxT_2 = '上班缺卡'
      } else if (type == 3) {
        this.boxT_2 = '下班缺卡'
      }
      this.centerDialogVisible_3 = true
    },
    // 调休、请假、外出、出差
    travelFun(data, type) {
      if (type == 1) {
        this.boxT_1 = '调休'
      } else if (type == 2) {
        this.boxT_1 = '请假'
      } else if (type == 3) {
        this.boxT_1 = '外出'
      } else if (type == 4) {
        this.boxT_1 = '出差'
      }
      this.centerDialogVisible_2 = true
    },
    // 加班时间
    overtime(data) {
      console.log(data)
      this.centerDialogVisible_1 = true
    },
    // 获取数据列表
    getList(pageIndex, pageSize, status, begin, end, deptId, profileId) {
      console.log(pageIndex, pageSize, status, begin, end, deptId, profileId)
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.GetJobWorkTypes(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          // that.GetJobWorkTypeslistData = res.data.Data
          that.fullscreenLoading = false
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      this.getList(this.index, this.size, this.begin, this.end, this.deptId, this.profileId)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.index, this.size, this.begin, this.end, this.deptId, this.profileId)
    },
    // 导出
    exportFun() {
      console.log(111)
      // window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportCertificateList?Token=' + getToken())
    },
    // 打印
    toPrint() {
      var mywindow = window.open('', 'mydiv', 'height=800,width=1300')
      mywindow.document.write('<html><head><title>月度汇总</title>')
      mywindow.document.write('<style>table {text-align: center;border-collapse: collapse;border: 0px solid #000;border-width: 1px;}tr{border-bottom: 1px solid #dedede;}</style>')
      mywindow.document.write('</head><body><div>')
      mywindow.document.write(document.getElementById('mydiv').innerHTML)
      mywindow.document.write('</div></body></html>')

      mywindow.print()
      //  mywindow.close();

      return false
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
            font-size: 16px;
            padding: 0 0 0 20px;
            span{
             margin:0 10px 0 20px;
             cursor: pointer;
            }
            .lineBox{
               height: 50px;
           }
            .chep{
                width:220px;
                display: inline-block;
                cursor: pointer;
            }
         }

    }
  }

}
#mydiv{
    height: 100%;
}
.tab_p{
    margin: 0 0 10px 0;
    span{
        display: inline-block;
        width:50%;
        border-bottom: 1px solid #dedede;
        text-align: center;
        height:50px;
        line-height: 50px;
        cursor: pointer;
    }
    .active{
        color:#f99740;
        border-bottom: 1px solid #f99740;
    }
}
.grid-content{
    b{
        font-weight: normal;
        color:#f99740;
    }
    i{
        font-style: normal;
        color:red;
    }
}
.underlineBtn{
    cursor: pointer;
    text-decoration:underline;
    color: #f99740;
}
.titleLine{
         margin: 0;
         span{
             color: #8a8a8a;
         }
             }
</style>
<style>
#monthlySummary .el-dialog__body{
    padding: 20px 0 20px 0;
}
#monthlySummary .grid-content{
    height:30px;
    line-height: 30px;
    padding: 0 10px 0 20px;
}
#monthlySummary .titleRow{
    color:#8a8a8a;
}
</style>

