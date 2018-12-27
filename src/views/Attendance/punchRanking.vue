<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>打卡排名</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-container>
               <el-header height="110px">
                  <div class="lineBox">
                      <span>选择日期</span>
                      <el-date-picker v-model="valueDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
                      <select-group v-model='selectDate' ref="transEvent"></select-group>
                      <span>考勤结果</span>
                      <el-select v-model="region" placeholder="请选择考勤结果">
                          <el-option label="正常" value="正常"></el-option>
                          <el-option label="异常" value="异常"></el-option>
                      </el-select>
                      <el-button type="warning" size="medium" style="margin-left:10px;" @click="searchFun">搜索</el-button>
                  </div>
                  <el-row style="background-color: rgb(248, 248, 248);border-bottom:none;">
                      <el-col :span="2"><div class="grid-content bg-purple">排名</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">用户名</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">部门</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">时间</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">考勤组</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">上班签到时间</div></el-col>
                   </el-row>
               </el-header>
               <el-main>
                    <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple"><i class="champion"></i></div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">职位</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">自评总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">直属领导评分总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
                   <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple"><i class="secondPlace"></i></div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">职位</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">自评总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">直属领导评分总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
                   <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple"><i class="thirdPlace"></i></div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">职位</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">自评总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">直属领导评分总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
                   <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple">4</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">职位</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">自评总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">直属领导评分总分</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
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
import * as announcement from '@/api/announcement'
import SelectGroup from './components/selectGroup'
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
      valueDate: new Date(),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      region: '',
      selectDate: []// 选部门或人

    }
  },
  mounted() {
    this.getList(this.getPage, 1, this.size)
  },
  watch: {
  },
  methods: {
    // 搜索
    searchFun() {
      console.log(this.selectDate)
    },
    // 获取公告列表
    getList(status, pageIndex, pageSize) {
      console.log(status, pageIndex, pageSize)
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      this.getList(this.getPage, this.index, this.size)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.getPage, this.index, this.size)
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
            padding: 0;
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
     .el-row{
              height: 60px;
              border-bottom: 1px solid #dedede;
              .grid-content.bg-purple{
                height: 60px;
               line-height: 60px;
               text-align: center;
               i{
                   display: inline-block;
                   width:23px;
                   height: 28px;
                   margin-top: 15px;
               }
               .champion{//冠军
                    background: url("../../assets/Attendance/icon_medal_1.png") no-repeat center;
               }
               .secondPlace{//亚军
                    background: url("../../assets/Attendance/icon_medal_2.png") no-repeat center;
               }
               .thirdPlace{//季军
                    background: url("../../assets/Attendance/icon_medal_3.png") no-repeat center;
               }
              }
            }
</style>

