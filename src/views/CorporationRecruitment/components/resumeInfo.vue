<template>

    <div class="Content" id="pdfContent">
      <!-- <span @click="tpt">打印</span> -->
        <div class="headContent">
            <b v-if="!FaceUrl()" style="background:url(/images/personalCard-touxiang.png)no-repeat center"></b>
            <b v-if="FaceUrl()" v-bind:style="{background:'url('+ FaceUrl()+')'}"></b>
            <p>{{ResumeBasic('Name')}}</p>
            <p v-bind:title="ResumeBasic('ExpectedJob')" v-if="ResumeBasic('ExpectedJob')!=''">期望职位：{{ResumeBasic('ExpectedJob')}}</p>
            <p v-bind:title="ResumeBasic('ExpectedJob')" v-else>期望职位：{{ResumeBasic('ExpectedJob')}}</p>
        </div>
        <el-row>
            <el-col :span='24'>个人信息</el-col>
            <el-col :span='8'><span class="title">年龄</span><span class="con">{{ResumeBasic('Age')}}</span></el-col>
            <el-col :span='8'><span class="title">性别</span><span class="con">{{ResumeBasic('Sex')?'女':'男'}}</span></el-col>
            <el-col :span='8'><span class="title">居住地</span><span class="con">{{ResumeBasic('LivingPlace')}}</span></el-col>
            <el-col :span='8'><span class="title">期望薪资</span><span class="con">{{ResumeBasic('ExpectedSalary')}}</span></el-col>
            <el-col :span='8'><span class="title">期望工作性质</span><span class="con">{{ResumeBasic('WorkKind')}}</span></el-col>
            <el-col :span='8'><span class="title">期望城市</span><span class="con">{{ResumeBasic('ExpectPlace')}}</span></el-col>
            <el-col :span='8'><span class="title">学历</span><span class="con">{{ResumeBasic('Education')}}</span></el-col>
            <el-col :span='8'><span class="title">工作经验</span><span class="con">{{ResumeBasic('YearsOfWork')}}</span></el-col>
            <el-col :span='8'><span class="title">电话</span><span class="con">{{ResumeBasic('Mobile')}}</span></el-col>
            <el-col :span='23'><span class="title">邮箱</span><span class="con">{{ResumeBasic('Mail')}}</span></el-col>

             <el-col :span='24' v-if='ResumeLearning()'>教育经历</el-col>
             <div  v-for="(item,v) in ResumeLearning()" :key="v">
                <el-col :span='9'><span class="color_33">{{getTime(item.StartDate,'{y}/{m}')}}~{{getTime(item.EndDate,'{y}/{m}')}}</span></el-col>
                <el-col :span='5'><span class="color_33">{{item.School}}</span></el-col>
                <el-col :span='5'><span class="color_33">{{item.Profession}}</span></el-col>
                <el-col :span='5'><span class="color_33">{{item.Education}}</span></el-col>
             </div>

             <el-col :span='24' v-if="ResumeWork()">工作经历</el-col>
                <div v-for="(item) in ResumeWork()" :key="item.CompanyName" class="other">
                    <el-col :span='9'><span class="color_33">{{getTime(item.StartDate,'{y} 年 {m} 月')}}~{{getTime(item.EndDate,'{y} 年 {m} 月')}}</span></el-col>
                    <el-col :span='8'><span class="color_33">{{item.CompanyName}}</span></el-col>
                    <el-col :span='7'><span class="color_33">{{item.PositionName}}</span></el-col>

                    <el-col :span='3'><span class="color_33">工作内容：</span></el-col>
                    <el-col :span='20'><span class="con" v-html="item.WorkDetail"></span></el-col>
                    <el-col :span='23'> </el-col>

                </div>

             <el-col :span='24' v-if="ResumeProject()">项目经历</el-col>
              <div v-for="(item) in ResumeProject()" :key="item.ProjectName" class="other">
                    <el-col :span='12'><span class="color_33">{{getTime(item.StartDate,'{y} 年 {m} 月')}}~{{getTime(item.EndDate,'{y} 年 {m} 月')}}</span></el-col>
                    <el-col :span='12'><span class="color_33">{{(item.ProjectName)||''}}</span></el-col>

                    <el-col :span='3'><span class="color_33">项目内容：</span></el-col>
                    <el-col :span='20'><span class="con">{{item.ProjectDetail}}</span></el-col>
                    <el-col :span='23'> </el-col>

                </div>

             <el-col :span='24'>技能</el-col>
                <el-col :span='23'>

                   <div class="skillList color-8a" v-if="info.SkillDetail">
                        <span v-for="k in info.SkillDetail" :key="k.name">{{k.name}}(<span style="color:#8a8a8a">{{getSkills( k.progress )}}</span>)</span>
                    </div>
                    <template v-else>
                        <div class="skillList color-8a" v-if="info.Skills">
                            <span v-for="v in info.Skills" :key="v">{{v}} </span>

                        </div>
                        <div v-else>('空')</div>
                    </template>
                </el-col>

             <el-col :span='24' v-show="info.Description" >自我评价</el-col>
             <el-col :span='23'><span class="color-8a" v-html="info.Description"></span></el-col>

        </el-row>
    </div>
</template>

<script>

import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import { parseTime } from '@/utils/index'
import { getPdf } from './toPdf.js'

export default {
  props: ['info'],
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    ResumeBasic(data) {
      if (this.info.ResumeBasic) {
        const list = this.info.ResumeBasic
        return list[data]
      }
    },
    ResumeLearning() {
      if (this.info.ResumeLearningApiModel) {
        const list = this.info.ResumeLearningApiModel
        return list
      }
    },
    ResumeWork() {
      if (this.info.ResumeWorkApiModel) {
        const list = this.info.ResumeWorkApiModel
        return list
      }
    },
    ResumeProject() {
      if (this.info.ResumeProjectApiModel) {
        const list = this.info.ResumeProjectApiModel
        return list
      }
    },
    getImgUrl(url, w) {
      return globalvariable().imgapiurl + urlUtil.formatUrl(url, w, w)
    },
    FaceUrl() {
      if (this.info.FaceUrl) {
        const url = this.getImgUrl(this.info.FaceUrl, 72)
        // console.log(url)
        return url
      }
    },
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    tpdf() {
      getPdf('.Content', this.ResumeBasic('Name') + '的简历')
    },
    getSkills(m) {
      var Skill
      if (m) {
        if (m < 26) {
          Skill = '入门'
        } else if (m < 51) {
          Skill = '熟悉'
        } else if (m < 76) {
          Skill = '精通'
        } else {
          Skill = '专家'
        }
      }
      return Skill
    }
  }
}
</script>

<style lang="scss" scoped>
.Content{
    padding-bottom: 50px;
}
.headContent{
    >b{
        height: 72px;
        width: 72px;
        display: block;
        margin: 50px auto 0;
        border-radius: 50%;
    }
    p{
        text-align: center;
        color: #323232;
    }
}
.el-col{
    line-height: 40px;
    .title{
        width: 100px;
        text-align: left;
        color: #323232;
        display: inline-block;

    }
    .con{
        text-align: left;
       color: #8a8a8a;
        white-space: nowrap;
    }
    &.el-col-24{
        border-bottom: 1px solid #dedede;
        font-size: 16px;
        margin: 20px 0 12px;
        color: #323232;
        font-weight: bold;
    }
}
.other{
    .el-col{
        &.el-col-23{
           padding: 10px 0;
        }

        line-height: 20px;
        .con{
            white-space: normal;
        }
    }
}
</style>
