<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>公告</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right" v-if="Visual==128">
              <el-button type="" size="small" v-on:click="jumpIndex(1)">草稿库</el-button>
              <el-button type="" size="small" v-on:click="jumpIndex(2)">新建公告</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container id="announcement">
                <el-header height="50px">
                   <span :class="{'active' : getPage==0}" @click="getPage=0" v-on:click="tabClick">全部公告</span>
                   <span  v-if="Visual==128">|</span>
                   <span :class="{'active' : getPage==1}" @click="getPage=1" v-on:click="tabClick"  v-if="Visual==128">我发布的</span>
                </el-header>
                <el-main>
                     <!--全部公告-->
                     <el-table :data="listData" height="100%"  style="width: 100%" v-on:cell-click="rowClick" v-if="getPage==0">
                         <el-table-column prop="Title" label="标题"></el-table-column>
                         <el-table-column prop="TypeName" label="类型"></el-table-column>
                         <el-table-column prop="UpdateTime" label="发布时间"></el-table-column>
                         <el-table-column prop="CreateName" label="发布人"></el-table-column>
                     </el-table>
                     <!--我的公告-->
                     <el-table :data="listData" height="100%"  style="width: 100%" v-on:cell-click="rowClick" v-else>
                         <el-table-column prop="Title" label="标题"></el-table-column>
                         <el-table-column prop="TypeName" label="类型"></el-table-column>
                         <el-table-column prop="UpdateTime" label="发布时间"></el-table-column>
                         <el-table-column prop="CreateName" label="发布人"></el-table-column>
                         <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-button type="warning" size="small" v-on:click="FunBtn(scope.row.NoticeId,1)">编辑</el-button>
                                <el-button type="" size="small" v-on:click="FunBtn(scope.row.NoticeId,2)">删除</el-button>
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
              <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定删除？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="deleteFun">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as announcement from '@/api/announcement'
export default {
  components: {

  },
  data() {
    return {
      // 切换状态
      getPage: 0,
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      funId: '', // 操作ID
      centerDialogVisible_1: false,
      Visual: true// 权限
    }
  },
  mounted() {
    // this.initial()
    this.getList(this.getPage, 1, this.size)
    this.getuserroletype()
  },
  watch: {

  },
  methods: {
    // 获取身份
    getuserroletype() {
      const that = this
      announcement.getuserroletype(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          this.Visual = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 获取权限
    initial() {
      // console.log('121212')
      // console.log(this.$store.state.user.authorityData)
      var themyFuncs = []
      themyFuncs = this.$store.state.user.authorityData
      for (var i = 0; i < themyFuncs.length; i++) {
        if (themyFuncs[i].Name == '公告') {
          console.log(themyFuncs[i].FuncList[0].Enable)
          this.Visual = themyFuncs[i].FuncList[0].Enable
        }
      }
    },
    // 获取操作ID
    FunBtn(id, type) {
      console.log(id)
      this.funId = id
      if (type == 1) { // 跳转编辑页
        this.$router.push({ path: '/announcement/NewAnnouncement', query: { editorId: id }})
      } else if (type == 2) { // 删除
        this.centerDialogVisible_1 = true
      }
    },
    // 删除
    deleteFun() {
      console.log(this.funId)
      const that = this
      return new Promise((resolve, reject) => {
        announcement.Remove(getToken(), that.funId)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.getList(that.getPage, 1, that.size)
                }
              })
              resolve()
            } else {
              that.$message({
                message: response.data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 跳转
    jumpIndex(type) {
      if (type == 2) {
        this.$router.push({ path: '/announcement/NewAnnouncement' })
      } else if (type == 1) {
        this.$router.push({ path: '/announcement/DraftLibrary' })
      }
    },
    // 跳转详情页
    rowClick: function(row, column, cell, event) {
      // console.log(row, column, cell, event)
      if (column.label != '操作') {
        const id = row.NoticeId
        this.$router.push({ path: '/announcement/Details', query: { id: id }})
      }
    },
    // 获取公告列表
    getList(status, pageIndex, pageSize) {
      console.log(status, pageIndex, pageSize)
      const that = this
      that.fullscreenLoading = true
      return new Promise((resolve, reject) => {
        announcement.Get_mynotice(getToken(), status, pageIndex, pageSize)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.listData = response.data.Data
              that.totalCount = response.data.TotalCount
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // TAB切换
    tabClick() {
      this.getList(this.getPage, 1, this.size)
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
            span{
             margin-right: 10px;
             cursor: pointer;
            }
            .active{
                color:#f99740
            }
         }

    }
  }

}
#announcement{
.el-dialog__body{
  text-align: center;
}
}

</style>

