<template>
    <el-container  class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" v-cloak   element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/JobPostListting',query:{actId:''} }">发布职位</el-breadcrumb-item>
                <el-breadcrumb-item>预览</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
             <el-container>
                <el-header>1.职位基本信息</el-header>
                <el-main>
                    <el-row>
                        <el-col :span="8"> <span class="left">发布岗位：</span><span class="right">{{getName(info.PositionId)}}</span></el-col>
                        <el-col :span="8"> <span class="left">工作地点：</span><span class="right">{{getAddress(info.CityId)}}</span></el-col>
                        <el-col :span="8"> <span class="left">状    态：</span><span class="right">{{theStatus[info.Status]}}</span></el-col>
                        <el-col :span="8"> <span class="left">每月薪资：</span><span class="right">{{SalaryList[info.Salary]}}</span></el-col>
                        <el-col :span="8"> <span class="left">工作经历：</span><span class="right">{{WorkExperienceList[info.WorkExperience]}}</span></el-col>
                        <el-col :span="8"> <span class="left">学历要求：</span><span class="right">{{EducationList[info.Education]}}</span></el-col>
                        <el-col :span="24"> <span class="left">职能类型：</span><span class="right">{{getType(info.PositionType)}}</span></el-col>
                    </el-row>

                </el-main>
                <el-header>2.职位要求</el-header>
                <el-main>
                    <el-row>
                        <el-col :span="24"> <span class="left">专业要求：</span><span class="right">{{(info.MajorRequire)}}</span></el-col>
                        <el-col :span="24"> <span class="left">截止时间：</span><span class="right">{{(info.EndTime)}}</span></el-col>
                        <el-col :span="24"> <span class="left">职位描述：</span><span class="right">{{(info.JobDescription)}}</span></el-col>
                        <el-col :span="24"> <span class="left">岗位要求：</span><span class="right">{{(info.JobRequirements)}}</span></el-col>
                        <el-col :span="24"> <span class="left">备注信息:</span><span class="right">{{(info.Remarks)}}</span></el-col>

                    </el-row>
                </el-main>
             </el-container>
            <p class="text-center" v-if="ifPost&&ifPost==1">
                <el-button @click="goBack(info.Id)">返回修改</el-button>
                <el-button type="warning" @click="toPost(info.Id)">发布职位</el-button>
            </p>
        </el-main>
    </el-container>

</template>

<script>
import { get_jobinfo, updatejob_status } from '@/api/recruitment'
// import { get_joblist, get_deppos, updatejob_status, deljob } from '@/api/recruitment'

export default {

  data() {
    return {
      fullscreenLoading: false,
      id: '',
      ifPost: '',
      info: {},
      theStatus: ['发布中', '未发布', '暂停中'],
      EducationList: ['不限', '博士', '	硕士', '本科', '大专', '大专以下'],
      WorkExperienceList: ['不限', '实习生', '	1年以下', '1～3年', '3～5年', '5～10年', '10年以上', '应届生'],
      SalaryList: ['不限', '面议', '1K~2K', '2k~4K', '4K~6k', '6k~8k', '8k~10k', '10k~20k', '20k以上']
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.id = this.$route.query.id
      this.ifPost = this.$route.query.ifPost
      // console.log(this.$route.query)
      getJobinfo(this, this.id).then(c => {
        // console.log(c)
        this.fullscreenLoading = false
        this.info = c
      })
    },
    goBack(id) {
      this.$router.push({ path: '/CorporationRecruitment/toPost', query: { id }})
    },
    toPost(id) {
      const app = this
      updatejob_status(id, 0).then(c => {
        if (c.data.Code == 0) {
          app.$router.push({ path: '/CorporationRecruitment/JobPostListting' })
        }
      })
    },
    getName(data) {
      if (data) return data.Name
    },
    getAddress(data) {
      if (data) return data.Name
    },
    getType(data) {
      const list = []
      if (data) {
        data.forEach(element => {
          list.push(element.Name)
        })
        return list.toString()
      }
    }

  }
}

const getJobinfo = (app, id) => {
  app.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    get_jobinfo(id).then(c => {
      resolve(c.data.Data)
    })
  })
}

</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main{
        height: 100%;
        .el-container{
            width: 1080px;
            margin:0 auto;
            .el-col{
                height: 35px;
                line-height: 35px;
            }
            .left{
                width: 100px;
                float: left;
                color: #b3b3b3
            }
            .right{
                // width: 200px;
                float: left;
                color: #323232;
            }
        }
    }
}
</style>

