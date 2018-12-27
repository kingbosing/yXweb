
<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>打卡明细</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning" size="medium" v-on:click="exportFun">导出</el-button>
              <el-button type="warning" size="medium" v-on:click="toPrint">打印</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
               <el-header height="50px">
                  <div class="lineBox">
                      <el-date-picker v-model="valueDate"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:350px;"></el-date-picker>
                      <select-group v-model='selectDate' ref="transEvent"></select-group>
                      <span>考勤结果</span>
                      <el-select v-model="region" placeholder="请选择考勤结果">
                          <el-option label="全部" value="0"></el-option>
                          <el-option label="正常" value="1"></el-option>
                          <el-option label="异常" value="2"></el-option>
                      </el-select>
                      <el-button type="warning" size="medium" style="margin-left:10px;" @click="searchFun">搜索</el-button>
                  </div>
               </el-header>
               <el-main>
                    <div id="mydiv">
                      <el-table :data="listData" height="100%"  style="width: 100%">
                         <el-table-column prop="Nick" label="用户名"></el-table-column>
                         <el-table-column prop="DeptName" label="部门"></el-table-column>
                         <el-table-column prop="AtdDate" label="操作时间"></el-table-column>
                         <el-table-column prop="GroupName" label="排班名称"></el-table-column>
                         <el-table-column prop="AtdRuleStr" label="班次时间"></el-table-column>
                         <el-table-column prop="UpWork" label="上班签到时间"></el-table-column>
                         <el-table-column prop="DownWork" label="下班签到时间"></el-table-column>
                         <el-table-column prop="Status" label="考勤结果">
                                <template slot-scope="scope">
                                   <span class="normalText" v-if="scope.row.Status==1">scope.row.Reason</span>
                                   <span class="abnormalText" v-else>scope.row.Reason</span>
                                </template>
                         </el-table-column>
                         <el-table-column prop="LateRemark" label="迟到时间"></el-table-column>
                         <el-table-column prop="EarlyRemark" label="早退时间"></el-table-column>
                         <el-table-column prop="WorkRemark" label="加班时长"></el-table-column>
                         <el-table-column prop="" label="签到明细">
                                <template slot-scope="scope">
                                       <el-popover placement="left" width="200" trigger="hover" v-if="scope.row.SignDetails.Address&&scope.row.SignDetails.Remark">
                                            <p class="titleLine"><span>地址：</span>{{!scope.row.SignDetails.Address?"-":scope.row.SignDetails.Address}}</p>
                                            <p class="titleLine"><span>备注：</span>{{!scope.row.SignDetails.Remark?'-':scope.row.SignDetails.Remark}}</p>
                                            <span slot="reference" class="hoverBtn">查看</span>
                                       </el-popover>
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
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import * as attendanceStatistics from '@/api/attendanceStatistics'
import SelectGroup from '../Attendance/components/selectGroup'
export default {
  components: {
    SelectGroup
  },
  data() {
    return {
      getPage: 0,
      fullscreenLoading: false, // 加载效果状态值
      listData: [], // 列表数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      valueDate: [new Date(), new Date()],
      region: '0',
      selectDate: [], // 选部门或人
      begin: new Date(),
      end: new Date(),
      deptId: '',
      profileId: ''
    }
  },
  mounted() {
    this.getList(1, this.size, this.region, this.begin, this.end, this.deptId, this.profileId)
  },
  watch: {
  },
  methods: {
    // 搜索
    searchFun() {
      console.log(this.selectDate)
      console.log(this.valueDate)
      this.begin = this.valueDate[0]
      this.end = this.valueDate[1]
      if (this.selectDate.ItemType == 0) { // 部门
        this.deptId = this.selectDate.ItemId
        this.profileId = ''
      } else { // 人
        this.deptId = ''
        this.profileId = this.selectDate.ItemId
      }
      this.getList(this.index, this.size, this.region, this.begin, this.end, this.deptId, this.profileId)
    },
    // 获取数据列表
    getList(pageIndex, pageSize, status, begin, end, deptId, profileId) {
      console.log(pageIndex, pageSize, status, begin, end, deptId, profileId)
      const that = this
      that.fullscreenLoading = true
      attendanceStatistics.GetAtdRecordDetail(getToken(), pageIndex, pageSize, status, begin, end, deptId, profileId).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.AtdRecordDetailList
          that.totalCount = res.data.Data.TotalCount
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
      this.getList(this.index, this.size, this.region, this.begin, this.end, this.deptId, this.profileId)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.index, this.size, this.region, this.begin, this.end, this.deptId, this.profileId)
    },
    // 导出
    exportFun() {
      console.log(111)
      // window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportCertificateList?Token=' + getToken())
    },
    // 打印
    toPrint() {
      var mywindow = window.open('', 'mydiv', 'height=800,width=1300')
      mywindow.document.write('<html><head><title>打卡明细</title>')
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
.normalText{
    color:#78C178;
}
.abnormalText{
    color:red;
}
.hoverBtn{
         color:#8a8a8a;
     }
 .hoverBtn:hover{
         color: #f99740;
     }
.titleLine{
         margin: 0;
         span{
             color: #8a8a8a;
         }
             }
</style>

