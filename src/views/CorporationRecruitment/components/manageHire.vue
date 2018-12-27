<template>
   <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-select v-model="Dep" placeholder="请选择活部门">
                <el-option label="全部" value="" ></el-option>

                <el-option :label="k.Name" :value="k.Id" v-for="(k,v) in depList" :key="v"></el-option>
            </el-select>
            <el-select v-model="Pos" placeholder="请选择职位">
                <el-option label="全部" value="" ></el-option>
                <el-option :label="k.Name" :value="k.Id" v-for="(k,v) in posList" :key="v"></el-option>
            </el-select>
            <el-select v-model="Time" placeholder="投递时间">
                <el-option :label="k" :value="v" v-for="(k,v) in timeList" :key="v"></el-option>
            </el-select>
        </el-header>
        <el-main>
            <div class="kong" v-if="totalCount==0">
                <img src="/images/kong.png" alt="">
                <p>请先管理面试完成的求职者简历！</p>
            </div>
            <div v-else class="cell" v-for="(key,v) in list" :key="v"  @click="goContent(key.Status,key.ResumeId,key.OrderId,key.ScanStatus)">
                <img src="/images/personalCard-touxiang.png" alt="" v-if="!key.Faceurl" />
                <img v-bind:src="getImgUrl(key.Faceurl,64)" alt="" v-if="key.Faceurl" />
                <div class="detail">
                    <div class="top">
                        <span class="name">{{key.Name}}</span>
                        <span>{{key.Sex?'女':'男'}}/{{key.Age}}/{{key.Education}}</span>
                        <!-- <a v-if="!key.IsContact">信息未公开</a>
                        <a class="open" v-else>信息公开</a> -->
                        <span class="job right">投递岗位：{{key.JobName}}</span>
                    </div>
                    <p class="bottom">
                        <span>{{key.RecentCompanyName}} {{key.RecentPositionName}} {{key.RecentWorkStartDate}}-{{key.RecentWorkEndDate}} {{(key.RecentWorkDetail)}}</span>
                        <b v-if="key.IsRefuse" style="color: #ff0000;">被拒绝</b>

                        <b class="right time">更新时间：{{key.CreatedTime}}</b>
                    </p>
                </div>
            </div>

        </el-main>
        <el-footer height='60px'  v-show="totalCount>0">
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

import { get_deppos, getresumebystatus } from '@/api/recruitment'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
      state: 3,
      fullscreenLoading: false,
      Dep: '',
      Pos: '',
      Time: 0,
      index: 1,
      size: 25,
      totalCount: 0,
      timeList: ['不限', '近三天', '近一周', '近一月', '近一年', '一年以上'],
      depList: [],
      posList: [],
      list: []
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    Time() {
      this.getList()
    }
  },
  methods: {
    init() {
      getDeppos(this, 10, '').then(c => {
        this.depList = c
      })
      getDeppos(this, 20, '').then(c => {
        // console.log(c)
        this.posList = c
      })
      this.getList()
    },
    getList() {
      this.fullscreenLoading = true
      getList(this, this.state, this.Dep, this.Pos, this.Time, this.index, this.size).then(c => {
        // console.log(c)
        this.fullscreenLoading = false

        this.totalCount = c.TotalCount
        this.list = c.Data
      })
    },
    getImg(url) {
      return globalvariable().imgapiurl + url
    },
    getImgUrl(url, w) {
      return globalvariable().imgapiurl + urlUtil.formatUrl(url, w, w)
    },
    handleSizeChange(size) {
      this.size = size
      this.getList()
    },
    handleCurrentChange(index) {
      this.index = index
      this.getList()
    },
    goContent(Status, ResumeId, OrderId, IsSacn) {
      this.$router.push({ path: '/CorporationRecruitment/resume', query: { Status, ResumeId, OrderId, IsSacn }})
    }
  }
}

const getDeppos = (app, type, parentId) => {
  return new Promise((resolve, reject) => {
    get_deppos(type, parentId).then(c => {
    //   console.log(c)
      if (c.data.Code == 0) {
        resolve(c.data.Data)
      }
    })
  })
}

const getList = (app, status, deptId, jobId, timeType, pageIndex, pageSize) => {
  return new Promise((resolve, reject) => {
    getresumebystatus(status, deptId, jobId, timeType, pageIndex, pageSize).then(c => {
    //   console.log(c)
      if (c.data.Code == 0) {
        resolve(c.data)
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-header{
        border-bottom: none;
        .el-select{
          margin-right: 15px;
        }
    }
    .el-main{
        height: 100%;
        position: relative;
        padding-top: 0;
        .cell{
            width: 100%;
            height: 100px;
            border-radius: 4px;
            border: 1px solid #dedede;
            margin-bottom: 20px;
            cursor: pointer;
            >img{
                float: left;
                margin: 17px;
                border-radius: 50%;
                width: 65px;
            }
            .detail{
                padding-right: 20px;
                margin-top: 20px;
                .top{
                    .name{
                        font-size: 16px;
                        margin-right: 15px;
                    }
                    >a{
                        padding: 3px 10px;
                        background: #dedede;
                        border-radius: 4px;
                        margin-left: 10px;
                        color: #fff;
                    }
                }
                .bottom{
                    b{
                        font-weight: normal;
                    }

                    color: #8a8a8a;
                }
                .right{
                    float: right;

                }
            }
        }
         .kong{
            height: 300px;
            text-align: center;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            >img{
                height: 250px;
            }

            >p{
                color: #8a8a8a;
            }
         }

     }
}
</style>

