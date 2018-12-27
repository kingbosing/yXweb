<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            我的会议
            <div class="header-right">
                <div class="tools_search">
                    <el-input
                    placeholder="会议主题/发起人"

                    v-model="input"
                    @keyup.enter.native="searchFor">
                      <b slot="append" class="el-icon-search" @click="searchFor"></b>
                    </el-input>
                </div>
                 <el-button size="medium" @click="to_Meeting_DraftLibrary">草稿库</el-button>
                 <el-button size="medium"  @click="to_Meeting_NewIndex">新 建</el-button>
            </div>
        </el-header>
        <meeting-list :TsearchFor='searchValue'></meeting-list>
        <!-- <el-main>
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
            <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
            </el-pagination>
        </el-footer> -->
    </el-container>
</template>

<script>
import { getmymeetinglist } from '@/api/meeting'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import { globalvariable } from '@/utils/globalvariable'

import meetingList from './meetingList'

export default {
  components: {
    meetingList
  },
  data() {
    return {
      input: '',
      searchValue: ''
    }
  },
  mounted() {
  },
  methods: {
    searchFor() {
      console.log(9999)
      this.searchValue = this.input
    },
    // meeting/Meeting_DraftLibrary
    to_Meeting_DraftLibrary() {
      this.$router.push({ path: '/meeting/Meeting_DraftLibrary' })
    },
    to_Meeting_NewIndex() {
      this.$router.push({ path: '/meeting/Meeting_Add' })
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
  }
}
</style>

