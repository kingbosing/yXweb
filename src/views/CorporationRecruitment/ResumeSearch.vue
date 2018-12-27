<template>
     <el-container  class="temlateMain resumeSearch" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
              简历搜索
            <div style="float:right" class="tools_search">
                <el-input v-model="input" placeholder="请输入关键字" @keyup.13.native="searchit()">
                      <b slot="append" class="el-icon-search" @click="searchit"></b>

                </el-input>
            </div>
        </el-header>
        <el-main>
             <el-container>
                <el-header height='50px' v-if="!showMore">
                    <span class="cell"><span class="title">期望城市</span>{{HotCitys[city]||cityName||'不限'}}</span>
                    <span class="cell"><span class="title"> 行政区</span>{{RegionName}}</span>
                    <span class="cell"><span class="title">工作经验</span>{{WorkExperienceList[WorkExperience]}}</span>
                    <span class="cell"><span class="title">学历</span>{{EducationList[Education]}}</span>
                    <span class="cell"><span class="title">期望薪资</span>{{SalaryList[Salary]}}</span>
                    <span class="cell"><span class="title">更新时间</span>{{timeList[time]}}</span>
                    <div class=" showIcon" @click="showMore=true"><span class="el-icon-arrow-down">展开搜索条件</span></div>
                </el-header>
                <el-header height='260px' v-else class="more">
                    <div class="cell moreCell">
                        <span class="title">期望城市</span>

                         <el-radio-group v-model="city"  size="mini" fill='#fff' text-color='#f99740'>
                            <el-radio-button type="text" label="0" :value="0">不限</el-radio-button>
                            <el-radio-button type="text" :label="v" :value="v" v-for="(k,v) in HotCitys" :key="v">{{k}}</el-radio-button>
                        </el-radio-group>
                        <el-popover
                        placement="bottom"
                        width="420"
                        height="250"
                        popper-class="moreCellPopover"
                        v-model="morePopover"
                        trigger="click">
                       <div>
                           <span>
                                <el-radio-group v-model="moreCity"  size="mini" fill='#fff' text-color='#f99740'>
                                    <el-radio-button type="text" label="ABCD" ></el-radio-button>
                                    <el-radio-button type="text" label="EFGH" ></el-radio-button>
                                    <el-radio-button type="text" label="JKLM" ></el-radio-button>
                                    <el-radio-button type="text" label="NPQR" ></el-radio-button>
                                    <el-radio-button type="text" label="STWX" ></el-radio-button>
                                    <el-radio-button type="text" label="YZ" ></el-radio-button>
                                </el-radio-group>
                            </span>
                            <div v-for="(k,v) in  getCityList" :key="v">
                                 <p>{{k.Spell}}</p>
                                <el-button type="text" :class="j.Id==moreCityGet.Id?'act':''" @click="getmoreIt(j)" v-for="j in k.Regions" :key="j.Id">{{j.RegionName}}</el-button>

                            </div>

                       </div>
                        <el-button type="text" class="act" slot="reference" v-if="moreCityGet.Id">{{cityName}}<span class="el-icon-caret-bottom"></span></el-button>
                        <el-button type="text" slot="reference" v-else>其他城市<span class="el-icon-caret-bottom"></span></el-button>
                        </el-popover>

                    </div>
                     <div class="cell moreCell">
                        <span class="title">行政区</span>
                        <span class="contents">
                            <el-radio-group v-model="Region"  size="mini" fill='#fff' text-color='#f99740'>
                                <el-radio-button type="text" label="0" :value="0">不限</el-radio-button>
                                <el-radio-button type="text" :label="k.Id" :value="k.Id" v-for="(k,v) in Regions" :key="v">{{k.RegionName}}</el-radio-button>
                            </el-radio-group>

                        </span>

                    </div>
                    <div class="cell moreCell">
                        <span class="title">工作经验</span>
                        <el-radio-group v-model="WorkExperience"  size="mini" fill='#fff' text-color='#f99740'>
                            <el-radio-button type="text" :label="v" :value="v" v-for="(k,v) in WorkExperienceList" :key="v">{{k}}</el-radio-button>
                        </el-radio-group>

                    </div>
                    <div class="cell moreCell">
                        <span class="title">学历</span>
                        <el-radio-group v-model="Education"  size="mini" fill='#fff' text-color='#f99740'>
                            <el-radio-button type="text" :label="v" :value="v" v-for="(k,v) in EducationList" :key="v">{{k}}</el-radio-button>
                        </el-radio-group>
                        <!-- <span class="content" v-for="(k,v) in EducationList" :key="v">{{k}}</span> -->
                    </div>
                    <div class="cell moreCell">
                        <span class="title">期望薪资</span>
                         <el-radio-group v-model="Salary"  size="mini" fill='#fff' text-color='#f99740'>
                            <el-radio-button type="text" :label="v" :value="v" v-for="(k,v) in SalaryList" :key="v">{{k}}</el-radio-button>
                        </el-radio-group>
                        <!-- <span class="content" v-for="(k,v) in SalaryList" :key="v">{{k}}</span> -->
                    </div>
                     <div class="cell moreCell">
                        <span class="title">更新时间</span>
                           <el-radio-group v-model="time"  size="mini" fill='#fff' text-color='#f99740'>
                            <el-radio-button type="text" :label="v" :value="v" v-for="(k,v) in timeList" :key="v">{{k}}</el-radio-button>
                        </el-radio-group>
                        <!-- <span class="content" v-for="(k,v) in timeList" :key="v">{{k}}</span> -->
                    </div>

                    <div class=" showIcon" @click="showMore=false"><span class="el-icon-arrow-up">收起搜索条件</span></div>
                </el-header>

                <el-main>
                    <div class="listCell" v-for="(k,v) in List" :key="v"  @click="goContent(6,k.ResumeId,'',k.ScanStatus)">
                      <img src="/images/personalCard-touxiang.png" alt="" v-if="!k.Faceurl">
                      <img :src="getImgUrl(k.Faceurl,54)" alt="" v-else>
                      <div class="cellBas" :class="k.ScanStatus?'looked':''">
                        <p>
                          <span>{{k.Name}}</span>
                          <span>{{k.Sex}}/{{k.Age}}/{{k.Education}}</span>
                          <a v-if="k.ScanStatus">已浏览</a>
                          <span class="right">{{k.CreatedTime.split(' ')[0]}}</span>
                        </p>
                        <p>
                          <span class="left">期望岗位：{{k.ExpectedJob}}</span>
                        </p>
                      </div>
                      <div class="inforP">
                        <span class="left">{{k.RecentCompanyName||'（空）'}}</span>
                        <span class="right">{{k.RecentPositionName||'（空）'}}</span>
                      </div>
                      <div class="left Detail">{{k.RecentWorkDetail||'（空）'}}</div>
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
        </el-main>
     </el-container>
</template>

<script>
// region_all
import { region_all, region_pc, doSearch } from '@/api/recruitment'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
      showMore: false,
      input: '',
      index: 1,
      size: 25,
      totalCount: 0,
      List: [],
      fullscreenLoading: false,
      timeList: ['不限', '近三天', '近一周', '近一月', '近一年', '一年以上'],
      EducationList: ['不限', '博士', '	硕士', '本科', '大专', '大专以下'],
      WorkExperienceList: ['不限', '实习生', '	1年以下', '1～3年', '3～5年', '5～10年', '10年以上', '应届生'],
      SalaryList: ['不限', '面议', '1K~2K', '2k~4K', '4K~6k', '6k~8k', '8k~10k', '10k~20k', '20k以上'],
      AllCitys: [],
      HotCitys: {}, // 热门城市
      city: 0, // 选中城市Id
      cityName: 0, // 选中城市
      Regions: [], // 区
      Region: 0, // 选中区 Id
      RegionName: '不限', // 选中区name
      WorkExperience: 0,
      Education: 0,
      Salary: 0,
      time: 0,
      moreCity: 'ABCD',
      getCityList: [],
      moreCityGet: {},
      morePopover: false

    }
  },
  beforeMount() {
    this.init()
  },
  watch: {
    city(news) {
      this.Region = 0
      this.RegionName = '不限' // 选中区name

      if (this.HotCitys[this.city]) {
        this.moreCityGet = {}
      } else if (this.city == 0) {
        this.moreCityGet = {}
        this.cityName = ''

        this.Regions = ''
      }

      if (this.city != 0) {
        GetRegionBypc(this, news).then(c => {
          // console.log(c)
          this.Regions = c
        })
      }
    },
    Region() {
      this.getRegion()
    },

    moreCity() {
      this.getCityList = this.AllCitys.filter(item => {
        return this.moreCity.indexOf(item.Spell) >= 0
      })
    //   console.log(this.getCityList)
    }
  },
  methods: {
    init() {
      getRegionAll(this)
      this.toSearch()
    },
    searchit() {

    },
    getImgUrl(url, w) {
      return globalvariable().imgapiurl + urlUtil.formatUrl(url, w, w)
    },
    handleSizeChange(size) {
      this.size = size
      this.toSearch()
    },
    handleCurrentChange(index) {
      this.index = index
      this.toSearch()
    },
    toSearch() {
      this.fullscreenLoading = true
      GetDoSearch(this.HotCitys[this.city] || this.cityName || '不限', this.RegionName, this.WorkExperience, this.Education, this.Salary, this.time, this.input, this.index, this.size).then(c => {
        // console.log(c)
        this.fullscreenLoading = false

        this.totalCount = c.TotalAmount
        this.List = c.Records
      })
    },
    getCity(k, v) {
      this.city = {
        id: v,
        namr: k
      }
    },
    getRegion() {
      // console.log(this.Region)
      const getIt = this.Regions.filter(item => {
        return item.Id == this.Region
      })

      // console.log(getIt)
      this.RegionName = getIt.length ? getIt[0].RegionName : '不限'
    },
    getmoreIt(row) {
      this.moreCityGet = row
      this.city = row.Id
      this.cityName = row.RegionName
      this.morePopover = false
    },
    goContent(Status, ResumeId, OrderId, IsSacn) {
      this.$router.push({ path: '/CorporationRecruitment/resume', query: { Status, ResumeId, OrderId, IsSacn }})
    }
  }
}

const getRegionAll = (app) => {
  region_all().then(c => {
    // console.log(c)
    app.HotCitys = c.data.Data.HotCitys
    app.AllCitys = c.data.Data.Regions
    app.getCityList = app.AllCitys.filter(item => {
      return app.moreCity.indexOf(item.Spell) >= 0
    })
  })
}

const GetRegionBypc = (app, parentId) => {
  return new Promise((resolve, reject) => {
    region_pc(parentId).then(c => {
      if (c.data.Code == 0) {
        resolve(c.data.Data)
      }
    })
  })
}

const GetDoSearch = (cityName, districtName, work, study, salary, time, jobName, pageIndex, pageSize) => {
  return new Promise((resolve, reject) => {
    doSearch(cityName, districtName, work, study, salary, time, jobName, pageIndex, pageSize).then(c => {
      if (c.data.Code == 0) {
        resolve(c.data.Data)
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main,.el-container{
        height: 100%;
        padding: 0;
    }
    .el-main{
        .el-header{
            font-weight: normal;
            border-bottom: none;
            font-size: 14px;

            .showIcon{
                border-top: 1px solid #dedede;
                position: relative;
                height: 2px;
                text-align: center;
                span{
                    position: absolute;
                    top: -8px;
                    background: #fff;
                    padding: 0 13px;
                    padding: 0 5px;
                    cursor: pointer;
                    font-size: 14px;
                }

            }
            .cell{
                color: #f99740;
                margin-right: 25px;
                line-height: 40px;
                .title{
                    color: #333;
                    margin-right: 15px;

                }
                .contents{
                    position: absolute;
                }
                &.moreCell{
                    .title{
                        display: inline-block;
                        width: 68px;
                    }
                    .content{
                        width: 75px;
                        cursor: pointer;
                        display: inline-block;
                        color: #8a8a8a;
                    }
                    .el-radio-button--mini .el-radio-button__inner{
                        border:none;
                    }

                }
            }
        }
        .el-main{
            text-align: center;
            padding-top: 20px;
            .listCell{
                width: 486px;
                height: 130px;
                border: 1px solid #dedede;
                border-radius: 4px;
                display: inline-block;
                margin-bottom: 20px;
                margin-right: 15px;
                padding: 14px 20px 0 20px;
                // float: left;
                overflow: hidden;
                cursor: pointer;
                img{
                  float: left;
                  border-radius: 50%;
                  width: 54px;
                  height: 54px;
                }
                p{
                  margin: 0;
                }
                .cellBas{
                  text-align: left;
                  height: 60px;
                  padding: 5px 0 0 70px;
                  color: #333;
                  &.looked{
                    color: #8a8a8a;
                  }
                  p{
                    line-height: 22px;
                    span{
                      margin-right: 10px;
                    }
                    a{
                      font-size: 12px;
                      color: #fff;
                      padding: 2px 6px;
                      background-color: #dedede;
                      border-radius: 4px;
                      margin-left: 20px;
                    }
                  }

                }
                .inforP{
                  height: 28px;
                  color: #8a8a8a;
                }
                .Detail{
                  color: #8a8a8a;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .left{
                  // text-align: left;
                  float: left;
                }
                .right{
                  // text-align: right;
                  float: right;

                }
            }
        }
    }
}

.el-button--text{
    color: #333;
    margin: 0 5px;
    &.act{
      color: #F99740;
    }
  }
</style>

