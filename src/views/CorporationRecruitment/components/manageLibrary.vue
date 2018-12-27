<template>
   <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
            <el-select v-model="inType" >
                <el-option label="已入职" :value="0" ></el-option>
                <el-option label="未通过" :value="-1" ></el-option>
            </el-select>
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
                <p>简历库中没有简历，请先管理简历！</p>
            </div>
            <!-- <template> -->
              <el-table
                :data="list"
                height="100%"

                @row-click="goContent"
                style="width: 100%">
                <el-table-column
                  prop="Name"
                  label="姓名"
                  min-width="10">
                </el-table-column>

                <el-table-column
                  prop="JobName"
                  label="	应聘职位"
                  min-width="16">
                </el-table-column>

                <el-table-column
                  prop="DeptName"
                  min-width="16"
                  label="应聘部门">
                </el-table-column>

                 <el-table-column
                  prop="Education"
                  min-width="16"
                  label="学历">
                  <template slot-scope="scope">
                      {{EducationList[scope.row.Education]}}
                  </template>
                  </el-table-column>

                  <el-table-column
                  prop="YearsOfWork"
                  min-width="16"
                  label="工作经验">
                   <template slot-scope="scope">
                      {{WorkExperienceList[scope.row.YearsOfWork]}}
                  </template>
                </el-table-column>

                <div  v-if="inType">
                  <el-table-column
                    prop="Status"
                    min-width="16"
                    label="淘汰阶段">
                    <template slot-scope="scope">
                      待面试
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="Reason"
                    min-width="16"
                    label="淘汰原因">
                  </el-table-column>

                    <el-table-column
                    prop="UpdateTime"
                    min-width="16"
                    label="淘汰时间">
                  </el-table-column>
                </div>

                  <el-table-column
                  prop="Mobile"
                  min-width="16"
                  label="联系方式">
                </el-table-column>
              </el-table>
            <!-- </template> -->
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

import { get_deppos, getresumebystatus, resumelibrary } from '@/api/recruitment'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
    //   state: 4,
      fullscreenLoading: false,
      inType: 0,
      Dep: '',
      Pos: '',
      Time: 0,
      index: 1,
      size: 25,
      totalCount: 0,
      timeList: ['不限', '近三天', '近一周', '近一月', '近一年', '一年以上'],
      EducationList: ['不限', '博士', '	硕士', '本科', '大专', '大专以下'],
      WorkExperienceList: ['不限', '实习生', '	1年以下', '1～3年', '3～5年', '5～10年', '10年以上', '应届生'],
      SalaryList: ['不限', '面议', '1K~2K', '2k~4K', '4K~6k', '6k~8k', '8k~10k', '10k~20k', '20k以上'],
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
    },
    inType() {
      this.getList()
    },
    Dep() {
      this.getList()
    },
    Pos() {
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

      getList(this, this.inType, this.Dep, this.Pos, this.Time, this.index, this.size).then(c => {
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
    getTime(inTime) {
      let Time
      if (inTime) {
        if (inTime == '2999-12-31 00:00:00') {
          Time = '至今'
        } else {
          Time = inTime.split(' ')[0].replace('-', '/').split('-')[0]
        }
      }
      return Time
    },

    goContent(row) {
      // console.log(row)
      const Status = row.Status
      const ResumeId = row.ResumeId
      const OrderId = row.OrderId
      const IsSacn = row.IsShow
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
    resumelibrary(status, deptId, jobId, timeType, pageIndex, pageSize).then(c => {
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
                width: 65px;
                float: left;
                margin: 17px;
                border-radius: 50%;
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

