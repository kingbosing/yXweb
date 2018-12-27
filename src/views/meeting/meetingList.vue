<template>
    <el-container v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
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
                label="地点"
                min-width="150">
                <template slot-scope="scope">
                  {{ scope.row.MeetingRoomName||'(空)' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="MeetingContent"
                label="会议内容"
                :show-overflow-tooltip="true"
                min-width="200">
                <template slot-scope="scope">
                  {{ scope.row.MeetingContent||'(空)' }}
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
                prop="MeetingRoomName"
                label="会议纪要"
                min-width="100">
                <template slot-scope="scope">
                  <span v-if="Summary(scope.row.MSAM)">(空)</span>
                  <el-button type="warning" size="small" v-on:click="toDownLoad(scope.row.MSAM)"  class="table-A" v-else>下 载</el-button>
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
            <el-pagination
              v-on:size-change="handleSizeChange"
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
import { getmymeetinglist } from '@/api/meeting'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import { globalvariable } from '@/utils/globalvariable'

export default {
  name: 'MeetingList',
  data() {
    return {
      listData: [], // 列表数据
      input: '', // 搜索数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      searchText: '', // 搜索内容
      meetingFile: '' // 会议纪要
    }
  },
  props: ['TsearchFor', 'state'],

  mounted() {
    getList(this.size, 1, this)
  },
  watch: {
    TsearchFor: function(data) {
      getList(this.size, 1, this, this.TsearchFor)
    }
  },
  methods: {
    searchFor() {
    //   console.log(9999)
      getList(this.size, 1, this, this.input)
    },
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    Summary(data) {
      if (data.Files.length == 0) {
        return true
      } else {
        return false
      }
    },
    toContent: function(row) { // 详情页
      if (this.state) {
        this.$router.push({ path: '/meeting/Meeting_Details', query: { Id: row.MeetingId, state: this.state }})
      } else {
        this.$router.push({ path: '/meeting/Meeting_Details', query: { Id: row.MeetingId }})
      }

      // location.href = '/MyMeeting/Meeting_Details?id=' + data
    },
    handleSizeChange(val) { // 更改显示条数
      this.size = val
      this.index = 1
      getList(this.size, this.index, this)
    },

    handleCurrentChange(val) { // 翻页
      this.index = val
      getList(this.size, this.index, this)
    },

    ToSearch: function() { // 搜索
      if (this.searchText) {
        sessionStorage.setItem('searchText', this.searchText)
        location.href = '/MyMeeting/Meeting_Search'
      } else {
        getList(this.size, 1)
      }
    },

    toDownLoad(data) {
      event.stopPropagation()
      var url = data.Files[0].SaveUrl
      var name = data.Files[0].FileName
      var Src = globalvariable().bigfileurl + url + encodeURIComponent(name, 'UTF-8')

      window.open(Src)
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

function getList(size, index, that, search) {
  that.listData = []
  that.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    getmymeetinglist(getToken(), index, size, search)
      .then(response => {
        // console.log('///')
        // console.log(response.data)
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
.el-container{
    height: 100%;
}
  .el-main{
    height: 100%;
    padding: 0 10px;
  }
</style>

