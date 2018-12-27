<template>
    <el-container id="RoomManagement" class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
          <el-header height="50px">
            <!-- <router-link :to="{ path: 'MyMeeting' }">我的会议</router-link> > 草稿库-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/meeting/MyMeeting' }">我的会议</el-breadcrumb-item>
                <el-breadcrumb-item>草稿库</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>

              <el-table :data="listData" height="100%"  style="width: 100%">
                <el-table-column prop="Title" label="会议主题"></el-table-column>
                <el-table-column prop="MeetingRoomName" label="地点">
                      <template slot-scope="scope">
                           {{scope.row.MeetingRoomName==null?"(空)":scope.row.MeetingRoomName}}
                    </template>
                </el-table-column>
                <el-table-column prop="MeetingContent" label="会议内容">
                    <template slot-scope="scope">
                           {{scope.row.MeetingContent==null?"(空)":scope.row.MeetingContent}}
                    </template>
                </el-table-column>
                 <el-table-column prop="CreatedTime" label="创建时间"></el-table-column>
                <el-table-column prop="" label="操作">
                     <template slot-scope="scope">
                           <el-button size="mini" type="warning" @click="rowClick(scope.row.Id)">编辑</el-button>
                           <el-button size="mini" @click="deleteFun(scope.row.Id)">删除</el-button>
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
       <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="warning" size="medium"  @click="deletebTN">确 定</el-button>
              <el-button size="medium" @click="centerDialogVisible = false">取 消</el-button>
            </span>
       </el-dialog>
    </el-container>
</template>

<script>
import * as meeting from '@/api/meeting'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      listData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      centerDialogVisible: false,
      deleteId: ''
    }
  },
  mounted() {
    getList(1, this.size, this)
  },
  methods: {
    rowClick: function(data) {
      // 编辑页
      console.log(data)
      this.$router.push({ path: '/meeting/Meeting_Add', query: { id: data, Adjust: 1 }})
    },
    deleteFun(data) { // 删除弹窗
      console.log(data)
      this.centerDialogVisible = true
      this.deleteId = data
    },
    deletebTN() { // 确定删除
      const that = this
      return new Promise((resolve, reject) => {
        meeting.DeleteDraft(getToken(), that.deleteId)
          .then(response => {
            console.log('/7/')
            console.log(response.data)
            if (response.data.successful) {
              that.centerDialogVisible = true
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  getList(that.index, that.size, that)
                }
              })
              resolve()
            } else {
              that.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      getList(1, this.size, this)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      getList(this.index, this.size, this)
    }

  }
}

function getList(index, size, that) {
  that.listData = []
  that.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    meeting.GetmyDraft(getToken(), index, size)
      .then(response => {
        console.log('///')
        console.log(response.data)
        if (response.data.successful) {
          that.fullscreenLoading = false
          that.listData = response.data.Data
          that.totalCount = response.data.TotalCount
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

</script>

<style lang="scss" scoped>
.temlateMain {
  .el-main{
      height: 100%;
      padding: 0 0 20px 0;
  }

}
</style>
<style>
#RoomManagement .el-table .cell{
           text-align: center;
      }
    #RoomManagement  .el-table th{
          background-color: #f8f8f8;
          font-weight: normal;
          color:#333;
      }
      #RoomManagement  .el-table tr{
          cursor: pointer;
      }
      #RoomManagement  .el-dialog__body{
     text-align: center;
}
#RoomManagement .el-dialog{
  height:200px;
}
#RoomManagement .dialog-footer{
  margin-right: 76px;
}
</style>
