<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PerformanceAppraisal/SetDifficultyPage' }">工作内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{JobName}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning" @click="toOpen('')">新建工作内容</el-button>
            </div>
        </el-header>
        <el-main>
             <el-container>
               <el-header height="120px">
                   <p>
                        <span class="gery">职位类别：</span><span class="black">{{JobCatName}}</span>
                        <span class="gery">职位：</span><span class="black">{{JobName}}</span>
                   </p>
                   <el-row>
                      <el-col :span="3"><div class="grid-content bg-purple">工作内容<b>*</b></div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">职位工作类别<b>*</b></div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">工作项类别</div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">完成分值</div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">产值分值</div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">难易度</div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">状态<b>*</b></div></el-col>
                      <el-col :span="3"><div class="grid-content bg-purple">操作</div></el-col>
                   </el-row>
               </el-header>
               <el-main :class="{'emptyImg':listData.length==0}">
                  <el-row class="col"  v-for="k in listData" :key="k.ContentName">
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.ContentName}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.JobWorkTypeName}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.WorkItemTypeName}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.CompleteScore}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.OutputScore}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.FacilityName}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.Enable?'可用':'禁用'}}</div></el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple">
                           <el-button size="mini" type="danger" v-if="k.Enable==true" @click="disableFun(k.ContentId)">禁用</el-button>
                           <el-button size="mini" v-else @click="Enable(k.ContentId,true)">启用</el-button>
                           <el-button size="mini" type="warning" v-on:click="toOpen(k.ContentId)">修改</el-button>
                        </div>
                    </el-col>
                  </el-row>
               </el-main>
               <el-footer>
                      <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[15,25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
                      </el-pagination>
               </el-footer>
            </el-container>
        </el-main>
        <!--弹窗-->
         <el-dialog title="提示" :visible.sync="operation" class="hardAndEasy" width="480px">
            <p style="text-align:center; font-size: 16px; margin-bottom: 10px;">当前选项被禁用将不会影响到已有数据，只对后续数据有影响，请确认是否继续操作？</p>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="" style="margin-right:60px;" @click="operation=false">取 消</el-button>
                <el-button type="warning" @click="operation = false" v-on:click="Enable(funId,false)">确 定</el-button>
            </div>
         </el-dialog>
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
      listData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      operation: false,
      funId: '',
      JobId: '',
      JobCatName: '',
      JobName: ''
    }
  },
  mounted() {
    this.JobId = this.$route.query.id
    this.getList(this.JobId, 1, 25)
  },
  watch: {

  },
  methods: {
    // 跳转
    toOpen(data) {
      this.$router.push({ path: '/PerformanceAppraisal/JobContent_Detail_AddPage', query: { jobid: this.JobId, contentid: data, jobname: encodeURIComponent(this.JobName) }})
    },
    // 启用禁用
    Enable(id, num) {
      console.log(id, num)
      const that = this
      performanceAppraisal.SetWrokContentStatus(getToken(), id, num).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.$message({
            message: '操作成功',
            type: 'success',
            onClose: function() {
              that.getList(that.JobId, 1, 25)
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
    // 禁用弹窗
    disableFun(id) {
      this.funId = id
      this.operation = true
    },
    // 获取数据列表
    getList(jobid, pageIndex, pageSize) {
      this.listData = []
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.GetContentListByJobId(getToken(), jobid, pageIndex, pageSize).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.Records
          that.totalCount = res.data.Data.TotalCount
          that.JobCatName = res.data.Data.JobCatName
          that.JobName = res.data.Data.JobName
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
      this.getList(this.JobId, 1, this.size)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.JobId, this.index, this.size)
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
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
