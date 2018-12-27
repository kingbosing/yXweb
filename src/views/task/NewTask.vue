<template>
      <el-container class="temlateMain"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/task/index' }">任务管理</el-breadcrumb-item>
                <el-breadcrumb-item>创建任务</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class="main_task">
                <div class="title"></div>
                <div class="content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="任务名称：" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item label="任务描述：" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>

                        <el-form-item label="紧要程度：" prop="region">
                            <el-col :span="11">
                                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option label="普通" value="0"></el-option>
                                <el-option label="紧急" value="1"></el-option>
                                <el-option label="重要" value="2"></el-option>
                                <el-option label="重要且紧急" value="3"></el-option>

                                </el-select>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="任务时间：" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                 <el-date-picker
                                    v-model="ruleForm.date1"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd HH:mm"
                                    :default-time="['00:00:00','23:59:59']">
                                    </el-date-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="任务性质：" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="0">指派任务</el-radio>
                                <el-radio label="1">公共任务</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="负 责 人：" >
                            <span class="MangeProfile getShowDep" @click="MangeShow=true">选择负责人</span>
                            <ul class="copyList">
                                <li v-for="k in MangeList" :key="k.ItemId">
                                    <a @click="removeIt(k.ItemId,1)"></a>
                                    <img class="img-circle" :src="getUrl(k.HeadUrl)" alt="">
                                    <span>{{k.Name}}</span>
                                </li>
                            </ul>
                        </el-form-item>

                        <el-form-item label="参 与 人：" prop="">
                            <span class="ParticipateProfile getShowDep" @click="ParticipateShow=true">选择参与人</span>
                             <ul class="copyList">
                                <li v-for="k in ParticipateList" :key="k.ItemId">
                                    <a @click="removeIt(k.ItemId,2)"></a>
                                    <img class="img-circle" :src="getUrl(k.HeadUrl)" alt="">
                                    <span>{{k.Name}}</span>
                                </li>
                            </ul>
                        </el-form-item>

                        <el-form-item label="任务开关：" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="任务进度：" prop="speedPercent">
                             <el-col :span="11">
                                <el-slider
                                    input-size="large"
                                    v-model="ruleForm.speedPercent"
                                    show-input>
                                </el-slider>
                             </el-col>
                        </el-form-item>

                        <!-- <el-form-item> -->
                            <div class="btn_content">
                                <el-button  @click="ToCancel">取消</el-button>
                                <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
                            </div>
                        <!-- </el-form-item> -->
                    </el-form>
                </div>
            </div>
        </el-main>

        <get-depeople :visible.sync="MangeShow"
            :actlist="MangeAct_List"
            title="选择任务负责人"
            :people="true"
            :checkbox="true"
            v-on:act-node="MangeActNode">
        </get-depeople>
        <get-depeople :visible.sync="ParticipateShow"
            :actlist="ParticipateAct_List"
            title="选择任务参与人"
            :people="true"
            :checkbox="true"
            v-on:act-node="ParticipateActNode">
        </get-depeople>
    </el-container>
</template>

<script>
import { GetManageList, OperateTask } from '@/api/task.js'
import { getToken } from '@/utils/auth'
import getDepeople from '../../components/dialogDep/src/component'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  components: {
    getDepeople
  },
  data() {
    return {
      MangeShow: false,
      MangeAct_List: [], // 默认选中id集合
      MangeList: [], // 选中列表

      ParticipateShow: false,
      ParticipateAct_List: [], // 默认选中id集合
      ParticipateList: [], // 选中列表

      fullscreenLoading: false, // 加载效果状态值
      chooseType: 0, // 判断选择的是负责人还是参与人
      operation: 'add', // 操作类型（add-新增 update-修改）
      taskid: '', // 任务id
      name: '',
      taskDescription: '',
      importantDegree: '0',
      valueDate: [new Date(), ''],
      taskType: '0',
      taskOnOff: false,
      speedPercent: 0,
      ifPut: false,
      ruleForm: {
        name: '',
        region: '0',
        date1: [new Date(), ''],
        delivery: false,
        resource: '0',
        desc: '',
        speedPercent: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 300, message: '长度在 3 到 300 个字符', trigger: 'blur' }
        ],
        region: [
          { required: false, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: false, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // getList(this.groupingAct, this.index, this.size, '',this)
  },
  watch: {
    MangeList() {
      this.MangeAct_List = []
      for (let i = 0; i < this.MangeList.length; i++) {
        this.MangeAct_List.push(this.MangeList[i].ItemId)
      }
    },
    ParticipateList() {
      this.ParticipateAct_List = []
      for (let i = 0; i < this.ParticipateList.length; i++) {
        this.ParticipateAct_List.push(this.ParticipateList[i].ItemId)
      }
    }

  },
  methods: {
    ToCancel() {
      this.$router.push({ path: '/task/index' })
    },
    MangeActNode(data) {
      this.MangeAct_List = []
      this.MangeList = []
      for (let i = 0; i < data.length; i++) {
        this.MangeList.push(data[i])
        if (this.ParticipateAct_List.indexOf(data[i].ItemId) < 0) {
          this.ParticipateList.push(data[i])
        }
      }
    },
    removeIt(id, state) {
      if (state == 1) {
        this.MangeList = this.MangeList.filter(item => {
          return item.ItemId != id
        })
      } else if (state == 2) {
        this.ParticipateList = this.ParticipateList.filter(item => {
          return item.ItemId != id
        })
      }
    },
    ParticipateActNode(data) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        if (this.ParticipateAct_List.indexOf(data[i].ItemId) < 0) {
          this.ParticipateList.push(data[i])
        }
      }
    },
    getUrl(url) {
      if (url) {
        return urlUtil.formatPicUrl(
          url,
          50,
          50
        )
      } else {
        return noLogo
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var vData = {
            'Name': this.ruleForm.name,
            'TaskDescription': this.ruleForm.desc,
            'ImportantDegree': parseInt(this.ruleForm.region),
            'BeginTime': this.ruleForm.date1[0].toLocaleString(),
            'EndTime': this.ruleForm.date1[1].toLocaleString(), // .slice(0,-3)
            'TaskType': this.ruleForm.resource,
            'MangeProfileIdList': this.MangeAct_List,
            'ParticipateProfileIdList': this.ParticipateAct_List,
            'TaskOnOff': this.ruleForm.delivery,
            'SpeedPercent': this.ruleForm.speedPercent
          }
          OperateTask(getToken(), vData, 'add').then((res) => {
            console.log(res)
            if (res.data.Successful) {
              this.$router.push({ path: '/task/index' })
            }
          })
          console.log(vData)
          // console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    margin: 0;
    padding: 0;
    .main_task{
        width: 970px;
        margin: 0 auto;
        .title{
            height: 40px;
            width: 130px;
            display: block;
            margin: 40px auto 50px;
            // float: left;
            // margin-left: 435px;
            background: url(/images/Task/new_task.png) no-repeat;
        }
        .el-select{
            width: 100%;
        }
        .getShowDep{
            color: #f99740;
            cursor: pointer;
        }
        .el-form-item__content{
            .el-date-editor{
                width: 100%;
            }
        }
        .btn_content{
            text-align: center;
            margin: 50px 0;
            button{
                margin: 0 30px;
            }
        }
    }
  }
}
</style>
