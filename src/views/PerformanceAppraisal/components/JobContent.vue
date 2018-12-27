<template>
    <el-container v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
       <el-header>
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">职位类别</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">职位名称</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">操作</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">最后修改时间</div></el-col>
            </el-row>
       </el-header>
       <el-main :class="{'emptyImg':listData.length==0}">
             <el-row class="col"  v-for="k in listData" :key="k.Name">
                    <el-col :span="6"><div class="grid-content bg-purple">{{k.JobCatName}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">{{k.JobName}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"><a v-on:click="toContent(k.JobId)" style="color:#f99740 ">管理工作内容</a></div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">{{k.UpdateTime}}</div></el-col>
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
       <!--**********弹窗************-->
       <!--********************************-->
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
      size: 25 // 每页数
    }
  },
  mounted() {
    this.getList(1, 25)
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 跳页
    toContent(id) {
      this.$router.push({ path: '/PerformanceAppraisal/JobContent_DetailPage', query: { id: id }})
    },
    // 获取数据列表
    getList(pageIndex, pageSize) {
      this.listData = []
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.GetJobCatContentList(getToken(), pageIndex, pageSize).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.Records
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
      this.getList(1, this.size)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.index, this.size)
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
            background-color: rgb(248, 248, 248);
            .el-row{
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

