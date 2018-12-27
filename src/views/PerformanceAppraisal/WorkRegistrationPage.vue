<template>
    <el-container class="temlateMain" id="WorkRegistration" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
            <span :class="{'active' : getPage==1,'tab_btn':true}" @click="getPageChange(1)">工作登记</span>
            <span :class="{'active' : getPage==2,'tab_btn':true}" @click="getPageChange(2)">工作审核</span>
            <span :class="{'active' : getPage==3,'tab_btn':true}" @click="getPageChange(3)">月通用考核</span>
            <div class="header-right">
                 <span>选择日期</span>
                 <span v-on:click="toLeft"><i class="el-icon-arrow-left"></i></span>
                 <el-date-picker v-model="todayTime" type="date" :picker-options="pickerOptions1" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择月"></el-date-picker>
                 <span v-on:click="toRight"><i class="el-icon-arrow-right"></i></span>
                 <b class="today" v-on:click="today"></b>
            </div>
        </el-header>
        <el-main>
                   <div class="registerForm">
                        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px" label-position="demo-ruleForm">
                            <el-row class="col">
                                <div>
                                    <el-col :span="7">
                                        <el-form-item label="工作内容:" prop="content">
                                            <el-select v-model="form.content" placeholder="请选择工作内容" v-on:change="selChange()" style="width:100%;">
                                                <template  v-for="k in getWorkCount">
                                                    <el-option v-bind:label="k.Name" :value="k.WorkContentID" :key="k.Name"></el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="描述:" prop="describe">
                                            <el-input v-model="form.describe" :maxlength="50" v-on:keyup.native="DelK()" placeholder="请输入工作详细描述、数量、工时等"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="自评得分:" prop="score">
                                            <el-input v-model="form.score" :maxlength="10"  auto-complete="off" v-on:keyup.native="DelE()" :placeholder="formScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                            </el-row>
                            <el-row class="col">
                                <div>
                                    <el-col :span="7">
                                        <el-form-item label="失误项:" prop="error">
                                            <el-select v-model="form.error" placeholder="请选择失误项" style="width:100%;">
                                                <template v-for="(value, key)  in getErrorList">
                                                    <el-option v-bind:label="value" v-bind:value="key" :key="value"></el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="说明:" prop="instructions">
                                            <el-input v-model="form.instructions" :maxlength="30" v-on:keyup.native="DelH()" placeholder="请输入失误的详细说明以及失误造成的后果等"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7"></el-col>
                                </div>
                            </el-row>
                        </el-form>
                        <p style="text-align: center;"><el-button type="success" v-on:click="submitForm('ruleForm')">保 存</el-button></p>
                    </div>

                <div class="apl_content_list">
                        <div style="height: 20px; background-color: #EEEEEE;"></div>
                        <el-row style="background: #f8f8f8;border:none;">
                            <el-col :span="4">
                                <div class="grid-content bg-purple">工作内容<b>*</b>
                                </div></el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">描述<b>*</b></div></el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">最后修改时间</div></el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple">自评得分<b>*</b></div></el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple">失误项
                                </div></el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple">
                                    失误说明
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple">
                                    状态
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple">操作</div></el-col>
                        </el-row>
                        <div class="listSection scroll">
                            <el-row class="col"  v-for="k in listData" :key="k.WorkContentName">
                                <div>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">{{k.WorkContentName}}</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">{{k.Desc}}</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">{{k.UpdateTime}}</div>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="grid-content bg-purple">{{k.SelfScore}}</div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">{{k.MissItemName}}</div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">{{!k.MissDesc?'(空)':k.MissDesc}}</div>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="grid-content bg-purple">{{k.Status==0?'已审核':'未审核'}}</div>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="grid-content bg-purple">
                                            <el-button size="mini" type="warning" v-on:click="toOpen(k)" v-if="k.Status==1">修改</el-button>
                                        </div>
                                    </el-col>
                                </div>
                            </el-row>

                        </div>
                    </div>
        </el-main>
        <!--弹窗-->
        <!--****************************-->
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import * as performanceAppraisal from '@/api/performanceAppraisal'

export default {
  components: {

  },
  data() {
    return {
      getPage: 1,
      todayTime: new Date(),
      toNUm: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      listData: '', // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      getWorkCount: '',
      getErrorList: '',
      regId: '',
      formScore: '自评得分',
      form: {
        content: '',
        describe: '',
        score: '',
        error: '',
        instructions: ''
      },
      rules: {
        content: [
          { required: true, message: '请选择工作内容', trigger: 'change' }
        ],
        describe: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请填写自评得分', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value === '') {
                callback(new Error('请填写自评得分'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.workContent()
    this.GetList(this.todayTime)
  },
  watch: {
    todayTime: function(newT, old) {
      this.GetList(newT)
    }
  },
  methods: {
    // 页面切换
    getPageChange(type) {
      if (type == 2) {
        this.$router.push({ path: '/PerformanceAppraisal/WorkAuditPage' })
      } else if (type == 3) {
        this.$router.push({ path: '/PerformanceAppraisal/GeneralAssessmentPage' })
      }
    },
    // 保存
    submitForm(formName) { // 提交
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var Data = {
            'RegId': this.regId,
            'WorkContentId': this.form.content,
            'Desc': this.form.describe,
            'SelfScore': this.form.score,
            'MissItemId': this.form.error,
            'MissDesc': this.form.instructions,
            'KPITime': this.todayTime
          }
          console.log(Data)
          const that = this
          that.ifPut = true
          performanceAppraisal.AddOrUpdateRegItem(getToken(), Data).then(res => {
            console.log(res.data)
            if (res.data.Successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                  that.ifPut = false
                  that.$refs[formName].resetFields()
                  that.GetList(that.todayTime)
                }
              })
            } else {
              that.ifPut = false
              that.$message({
                message: res.data.Message,
                type: 'warning'
              })
            }
          })
        } else {
          that.ifPut = false
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改
    toOpen: function(dataK) {
      console.log(dataK)
      this.regId = dataK.RegId
      this.form.content = dataK.WorkContentId
      this.form.describe = dataK.Desc
      this.form.score = dataK.SelfScore + ''
      console.log(this.form)
      // 失误项:
      this.errorList(this.form.content)
      if (dataK.MissItemId != '') {
        this.form.error = dataK.MissItemId
      }
      this.form.instructions = dataK.MissDesc
    },
    // 获取工作登记
    GetList(newT) {
      this.listData = []
      this.fullscreenLoading = true
      const that = this
      performanceAppraisal.GetWorkContentRegList(getToken(), newT, 1, 1000).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.fullscreenLoading = false
          that.listData = res.data.Data.Records
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
      // this.listData = data.Data.Records;
    },
    // 获取失误项
    errorList(id) {
      const that = this
      performanceAppraisal.GetMissListToSelect(getToken(), id).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.getErrorList = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 获取工作内容
    workContent() {
      const that = this
      performanceAppraisal.GetWCListToSelect(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.getWorkCount = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    DelK: function() {
      this.form.describe = (this.form.describe).trim()
    },
    DelE: function() {
      this.form.score = (this.form.score).replace(/[^0-9.]/g, '').trim()
    },
    DelH: function() {
      this.form.instructions = (this.form.instructions).trim()
    },
    selChange: function() {
      this.errorList(this.form.content)
      console.log(this.form.content)
      console.log(this.getWorkCount)

      for (var i = 0; i < this.getWorkCount.length; i++) {
        if (this.getWorkCount[i].WorkContentID == this.form.content) {
          console.info(this.getWorkCount[i].Score)
          this.formScore = '标准分：' + this.getWorkCount[i].Score + ''
        }
      }
    },
    // 日期处理
    getNowFormatDate(n) {
      console.log(n == 0)
      let curDate
      if (n == 0) {
        curDate = new Date()
      } else {
        curDate = new Date(this.todayTime)
      }
      console.log(curDate)
      const date = new Date(curDate.getTime() + n * 24 * 60 * 60 * 1000)
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate
      currentdate = new Date(currentdate)
      return currentdate
    },
    toRight() {
      if (this.todayTime < this.getNowFormatDate(0)) {
        this.todayTime = this.getNowFormatDate(1)
      }
    },
    toLeft() {
      this.todayTime = this.getNowFormatDate(-1)
    },
    today() {
      this.todayTime = this.getNowFormatDate(0)
    }

  }
}
</script>
<style lang="scss" scoped>
.temlateMain {
  height: 100%;
  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }
    .header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
      .today{
        width: 30px;
        height: 30px;
        display: inline-block;
        cursor: pointer;
        background: url(/images/meetingToday.png)no-repeat center;
        margin-left: 10px;
        position: relative;
        top: 7px;
      }
      span{
        font-weight: normal;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
  .el-main {
    height: 100%;
    padding: 0;
    .registerForm{
      padding: 40px 20px 20px 20px;
    }
    .apl_content_list{
      .el-row{
              height: 60px;
              border-bottom: 1px solid #dedede;
              .grid-content.bg-purple{
                height: 60px;
               line-height: 60px;
               text-align: center;
               b{
                 color: #f99740;
                 margin-left: 5px;
               }
              }
            }
    }
  }
}

</style>

<style>
  #WorkRegistration .el-header .el-input__inner{
         border:none;
         text-align: center;
          cursor: pointer;
      }
  #WorkRegistration .el-header .el-input__prefix{
        display: none;
      }
  #WorkRegistration .el-header .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100px;
      }
   #WorkRegistration .el-header .el-input--medium .el-input__inner{
        padding: 0 10px 0 0;
      }
</style>
