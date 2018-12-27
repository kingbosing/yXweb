
<template>
    <el-container class="temlateMain"  id="correction" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>考勤矫正</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning" size="medium" v-if="multipleType==1" v-on:click="multipleTypeFun(1)">批量矫正</el-button>
              <el-select v-model="region" placeholder="请选择考勤结果" v-if="multipleType==2">
                    <el-option label="正常" value="正常"></el-option>
              </el-select>
              <el-button type="success" size="medium" v-if="multipleType==2" v-on:click="multipleTypeFun(3)">保 存</el-button>
              <el-button type="" size="medium" v-if="multipleType==2" v-on:click="multipleTypeFun(2)">取 消</el-button>
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
                      <el-table :data="listData" height="100%" style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
                         <el-table-column type="selection" width="45" v-if="multipleType==2"></el-table-column>
                         <el-table-column prop="Name" label="用户名"></el-table-column>
                         <el-table-column prop="DeptName" label="部门"></el-table-column>
                         <el-table-column prop="AtdDate" label="操作时间"></el-table-column>
                         <el-table-column prop="UpWork" label="上班签到时间"></el-table-column>
                         <el-table-column prop="DownWork" label="下班签到时间"></el-table-column>
                         <el-table-column prop="Result" label="考勤结果">
                            <template slot-scope="scope">
                                <span class="normalText">正常</span>
                                <span class="abnormalText">迟到</span>
                            </template>
                         </el-table-column>
                         <el-table-column prop="Status" label="操作">
                            <template slot-scope="scope">
                                <el-button type="warning" size="mini" @click="singleFun(scope.row)">更改</el-button>
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
        <!--**************加班**************-->
        <el-dialog title="签到时间更改" :visible.sync="centerDialogVisible_1" width="30%">
                  <el-checkbox-group v-model="checkedCities1">
                       <el-checkbox v-for="city in cities" :label="city" :key="city">上班签到时间：<span class="timeS">{{city}}</span></el-checkbox>
                  </el-checkbox-group>
                  <span slot="footer" class="dialog-footer" style="display: block;text-align: center;">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px">改为正常</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
        </el-dialog>
        <!--弹窗-->
        <el-dialog title="提示" :visible.sync="centerDialogVisible_2" width="30%">
                  <span style="display:block;text-align: center;">此操作无法撤销，是否确定批量矫正？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_2 = false" style="margin-right:100px">确 定</el-button>
                     <el-button @click="centerDialogVisible_2 = false">取 消</el-button>
                  </span>
        </el-dialog>
        <!--****************************-->
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
      fullscreenLoading: false, // 加载效果状态值
      listData: [], // 列表数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      valueDate: [new Date(), new Date()],
      region: '正常',
      selectDate: [], // 选部门或人
      centerDialogVisible_1: false,
      centerDialogVisible_2: false,
      checkedCities1: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      multipleType: 1,
      multipleSelection: [],
      selectionStr: '',
      begin: new Date(),
      end: new Date(),
      deptId: '',
      profileId: ''
    }
  },
  mounted() {
    this.getList(1, this.size, this.deptId, this.profileId, this.begin, this.end)
  },
  watch: {
  },
  methods: {
    // 批量切换
    multipleTypeFun(type) {
      if (type == 1) {
        this.multipleType = 2
      } else if (type == 2) {
        this.multipleType = 1
      } else if (type == 3) {
        this.multipleType = 1
        this.centerDialogVisible_2 = true
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
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
      this.getList(this.index, this.size, this.deptId, this.profileId, this.begin, this.end)
    },
    // 单个更改
    singleFun(data) {
      this.centerDialogVisible_1 = true
      console.log(data)
    },
    // 获取数据列表
    getList(pageIndex, pageSize, deptId, profileId, begin, end) {
      console.log(pageIndex, pageSize, begin, end, deptId, profileId)
      const that = this
      that.fullscreenLoading = true
      attendanceStatistics.CheckAtdRecord(getToken(), pageIndex, pageSize, deptId, profileId, begin, end).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.AtdExceptionList
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
      this.getList(this.index, this.size, this.deptId, this.profileId, this.begin, this.end)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.index, this.size, this.deptId, this.profileId, this.begin, this.end)
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
    .el-select.el-select--medium{
         margin-right: 10px;
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
.timeS{
    color:#323232;
}
</style>

<style>
#correction .el-dialog__body .el-checkbox{
    margin-left: 30px;
    display: block;
    margin-bottom: 10px;
}
#correction .el-dialog__body .el-checkbox__input.is-checked+.el-checkbox__label{
 color:#8a8a8a;
}
#correction .el-dialog__body .el-checkbox__label{
     color:#8a8a8a;
}
</style>
