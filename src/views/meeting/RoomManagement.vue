<template>
    <el-container id="RoomManagement" class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
          <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>会议室管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
                <router-link :to="{ path: 'NewMeetingRoom' }"><el-button size="medium">新建会议室</el-button></router-link>
            </div>
        </el-header>
        <el-main>

              <el-table :data="listData" height="100%"  style="width: 100%" v-on:row-click="rowClick">
                <el-table-column prop="Name" label="会议室名称"></el-table-column>
                <el-table-column prop="Size" label="最大人数"></el-table-column>
                <el-table-column prop="Description" label="其他说明">
                    <template slot-scope="scope">
                           {{scope.row.Description==null?"(空)":scope.row.Description}}
                    </template>
                </el-table-column>
                <el-table-column prop="Status" label="状态">
                     <template slot-scope="scope">
                           <span class="stateBar ongoing" v-if="scope.row.Status===1">已启用</span>
                           <span class="stateBar noBegin" v-else>未启用</span>
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
</template>

<script>
import { GetMeetingRoomList } from '@/api/meeting'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      listData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      ifNewFun: true, // 新建会议室权限
      ifEditFun: true // 编辑会议室权限
    }
  },
  mounted() {
    getList(true, -1, 1, this.size, this)
  },
  methods: {
    rowClick: function(data) {
      // 编辑页
      console.log(data.Id)
      var id = data.Id
      // if (this.ifEditFun) {
      //  location.href = '/MeetingManagement/EeditorMeetingRoom?id=' + data;
      this.$router.push({ path: '/meeting/NewMeetingRoom', query: { id: id }})
      //  }
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      getList(true, -1, 1, this.size, this)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      getList(true, -1, this.index, this.size, this)
    }

  }
}

function getList(status, roomSize, index, size, that) {
  that.listData = []
  that.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    GetMeetingRoomList(getToken(), status, roomSize, index, size)
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

// 权限:
/* var themyFuncs = JSON.parse(sessionStorage.getItem("myFuncs")).Data;

for (var i = 0; i < themyFuncs.length; i++) {
    if (themyFuncs[i].Name == '会议室信息管理' && themyFuncs[i].ParentId) {
        var FuncList = themyFuncs[i].FuncList;
        console.info(FuncList)

        for (var j = 0; j < FuncList.length; j++) {

            if (FuncList[j].Name == '新建会议室') {
                app.ifNewFun = FuncList[j].Enable;

            } else if (FuncList[j].Name == '编辑会议室') {
                app.ifEditFun = FuncList[j].Enable;

            }
        }
    }
}*/

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
      padding: 0 0 20px 0;
  }

}
.stateBar {
        width: 70px;
        height: 28px;
        display: inline-block;
        border: transparent;
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
    }
    .stateBar.noBegin {
        border: 1px solid #dedede;
        background-color: #f8f8f8;
        color: #8a8a8a;
    }
    .ongoing {
        background-color: #5CB85C;
    }
    .endBar {
        background-color: #A2AFB7;
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
</style>
