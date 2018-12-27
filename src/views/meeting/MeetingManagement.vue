<template>
   <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-if="!isSearch" >会议管理</el-breadcrumb-item>
                <template v-else>
                  <el-breadcrumb-item><span @click="isSearch=false">会议管理</span></el-breadcrumb-item>
                  <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
                </template>
            </el-breadcrumb>

            <div class="header-right">
                <div class="tools_search">
                    <el-input
                    placeholder="会议主题/发起人"
                    suffix-icon="el-icon-search"
                    v-model="input"
                    @keyup.enter.native="searchFor">
                    </el-input>
                </div>
            </div>
        </el-header>
        <el-main>
          <!-- 会议管理 -->
          <el-container v-show="!isSearch">
            <el-aside width="25%">
              <el-container>
                <el-header>会议室</el-header>
                <el-main>
                  <ul v-for="(k,v) in RoomlistData" :key="v">
                    <li :class="k.Id==roomId?'active':''" :id="k.ID"  v-on:click="toChangeRoom(k.Id)">{{k.Name}}</li>
                  </ul>
                </el-main>
              </el-container>
            </el-aside>
            <el-main>
              <el-container>
                <el-main>
                   <template>
                      <el-table
                        :data="listData"
                        height="100%"
                        fit
                        @row-click="toContent"
                        style="width: 100%">
                        <el-table-column
                          prop="Title"
                          label="会议主题"
                          min-width="150">
                        </el-table-column>

                        <el-table-column
                          prop="CreatorName"
                          label="发起人"
                          min-width="100">
                          <template slot-scope="scope">
                            {{ scope.row.CreateName||'(空)' }}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="MeetingRoomName"
                          label="会议类型"
                          min-width="150">
                          <template slot-scope="scope">
                            {{ scope.row.MeetingTypeName||'(空)' }}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="MeetingRoomName"
                          label="会议时间"
                          min-width="200">
                          <template slot-scope="scope">
                            {{getTime(scope.row.StartTime,'{y}-{m}-{d} {h}:{i}')}}-{{getTime(scope.row.EndTime,'{h}:{i}')}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="Status"
                          label="状态"
                          min-width="100">
                          <template slot-scope="scope">
                            <span v-html="getNewState(scope.row.Status)"></span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
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
          <!-- // 会议管理-搜索 -->
          <meeting-list v-show="isSearch" :TsearchFor='searchValue' :state='2'></meeting-list>

        </el-main>
   </el-container>
    <!-- <el-container>会议管理1
        <a @click="dialogVisible=true">****</a>
        <dialog-dep
        :visible.sync="dialogVisible"
        :actlist="TactList"
        title="选择参会人"
        :people="true"
        :checkbox="false"
        v-on:act-node="actNode">
        </dialog-dep>
    </el-container>  -->
</template>

<script>
import dialogDep from '@/components/dialogDep/src/component'
import { parseTime } from '@/utils/index'
import { getToken } from '@/utils/auth'
import { meetingroom_get, getmeetinglistbyroomid } from '@/api/meeting'
import meetingList from './meetingList'
export default {
  name: 'MeetingManagement',
  components: {
    dialogDep,
    meetingList
  },
  data() {
    return {
      value: '',
      dialogVisible: false,
      actNode: [],
      TactList: [],
      roomId: '',
      listData: [], // 列表数据
      input: '', // 搜索数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      searchText: '', // 搜索内容
      isSearch: false, // 搜索内容
      RoomlistData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      searchValue: ''
    }
  },
  mounted() {
    getList(this)
    // console.log(this.$router)
  },
  watch: {
    // isSearch(d1,d2){
    //   console.log(d1,d2)
    //   if(d2=='true'){
    //     this.input=''
    //   }
    // }
  },
  methods: {
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    toContent(row) { // 跳转会议详情
      this.$router.push({ path: '/meeting/Meeting_Details', query: { Id: row.Id, state: 1 }})
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      getRoomUse(this.roomId, this.size, 1, this)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      getRoomUse(this.roomId, this.size, this.index, this)
    },
    searchFor() {
      // console.log(this.input)
      if (this.input) {
        this.isSearch = true
      } else {
        this.isSearch = false
      }
      this.searchValue = this.input
    },
    toChangeRoom(id) {
      this.roomId = id
      getRoomUse(this.roomId, this.size, 1, this)
    },
    getNewState(data) {
      var strL
      if (data == 2) { // 进行中
        strL = `<span class="stateBar ongoing">进行中</span>`
      } else if (data == 3) { // 未进行
        strL = `<span class="stateBar noBegin">未进行</span>`
      } else if (data == 4) { // 已结束
        strL = `<span class="stateBar endBar">已结束</span>`
      } else if (data == 5) { // 已取消
        strL = `<span class="stateBar endBar">已取消</span>`
      }
      return strL
    }

  }

}

// 会议室：
function getList(app) {
  app.RoomlistData = []
  app.fullscreenLoading = true
  const Size = app.size
  // console.log(Size)
  return new Promise((resolve, reject) => {
    meetingroom_get(getToken())
      .then(response => {
        // console.log('///')
        // console.log(response.data)
        var data = response.data
        if (response.data.successful) {
          app.fullscreenLoading = false
          app.RoomlistData = data.Data
          // console.log(data.Data[0])
          app.roomId = data.Data[0].Id
          getRoomUse(data.Data[0].Id, Size, 1, app)
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 会议室下的会议:
function getRoomUse(MeetingRoomId, pageSize, pageIndex, app) {
  // console.log(MeetingRoomId,pageSize)
  return new Promise((resolve, reject) => {
    getmeetinglistbyroomid(getToken(), MeetingRoomId, pageSize, pageIndex).then(response => {
      // console.log('///')
      // console.log(response.data)
      var data = response.data
      if (response.data.successful) {
        app.listData = data.Data
        // console.log(data.TotalCount)
        app.totalCount = data.TotalCount
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
.el-container{
  height: 100%;
}
ul{
  padding: 0;
  margin: 0;
}
tbody .el-table__row{
  cursor: pointer;
}
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
    padding: 0;
    .el-aside{
      height: 100%;
      border-right: 1px solid #dedede;
      .el-header{
        text-align: center;
        font-size: 16px;
        height: 50px;
        font-weight: normal;
      }
      .el-main{
        li {
            height: 60px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            padding: 0 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.active {
                background-color: #FEF4EC;
                color: #f99740;
            }
        }
      }
    }
  }
}
</style>

