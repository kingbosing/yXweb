<template>
    <el-container class="temlateMain" id="WorkRegistration">
         <el-header height="50px">
            <span :class="{'active' : getPage==1,'tab_btn':true}" @click="getPageChange(1)">工作登记</span>
            <span :class="{'active' : getPage==2,'tab_btn':true}" @click="getPageChange(2)">工作审核</span>
            <span :class="{'active' : getPage==3,'tab_btn':true}" @click="getPageChange(3)">月通用考核</span>
            <div class="header-right">
                 <span>选择月份</span>
                 <span v-on:click="toLeft"><i class="el-icon-arrow-left"></i></span>
                 <el-date-picker v-model="todayTime" type="month" :picker-options="pickerOptions1" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择月"></el-date-picker>
                 <span v-on:click="toRight"><i class="el-icon-arrow-right"></i></span>
            </div>
        </el-header>
        <el-main>
                    <p class="titleYellow">提示：通用考核和岗位工作考核均默认为20分，若本月没有扣减分，则无需进行月通用考核操作！</p>
                    <div class="registerForm">
                        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px" label-position="demo-ruleForm">
                            <el-row class="col">
                                <div>
                                    <el-col :span="7">
                                        <el-form-item label="考核员工:" prop="ProfileId">
                                            <el-select v-model="form.ProfileId" placeholder="请选择考核员工" style="width:100%;">
                                                <template v-if="GetM_get_menlistData!=null" v-for="k in GetM_get_menlistData">
                                                    <el-option :label="k.Value" :value="k.Key" :key="k.Key+''"></el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="考核内容:" prop="Type">
                                            <el-select v-model="form.Type" placeholder="请选择考核内容" style="width:100%;">
                                                <el-option label="通用考核" value="0"></el-option>
                                                <el-option label="岗位工作考核" value="1"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="扣减分值:" prop="Score">
                                            <el-input v-model="form.Score" :maxlength="10" placeholder="请输入扣减分值"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="7">
                                        <el-form-item label="说   明:" prop="Reason">
                                            <el-input v-model="form.Reason" :maxlength="30" placeholder="请输入扣分原因"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                            </el-row>
                        </el-form>
                        <p style="text-align: center;"><el-button type="success" v-on:click="submitForm('ruleForm')" :loading="ifPut">保 存</el-button>
                        </p>
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
      getPage: 3,
      listData: '', // 列表数据
      GetM_get_menlistData: '',
      // fullscreenLoading: true,//加载效果状态值
      // 日期:
      todayTime: new Date(),
      toNUm: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // formLabelWidth: '80',
      form: {
        ProfileId: '',
        Type: '',
        Score: '',
        Date: '',
        Reason: ''
      },
      rules: {
        content: [
          { required: true, message: '请选择考核员工', trigger: 'change' }
        ],
        error: [
          { required: true, message: '请选择考核内容', trigger: 'change' }
        ],

        score: [{ required: true, message: '请填写自评得分', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }
          }]

      },
      ifPut: false

    }
  },
  mounted() {
    this.getM_get_men()
  },
  watch: {

  },
  methods: {
    // 提交
    submitForm(formName) { // 提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ifPut = true
          this.form.Date = this.todayTime
          console.log(this.form)
          const that = this
          performanceAppraisal.m_check_man(getToken(), that.form).then(res => {
            console.log(res.data)
            if (res.data.Successful) {
              that.$message({
                message: '提交成功',
                type: 'success',
                onClose: function() {
                  that.resetForm(formName)
                  that.ifPut = false
                }
              })
            } else {
              that.$message({
                message: res.data.Message,
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 页面切换
    getPageChange(type) {
      if (type == 2) {
        this.$router.push({ path: '/PerformanceAppraisal/WorkAuditPage' })
      } else if (type == 1) {
        this.$router.push({ path: '/PerformanceAppraisal/WorkRegistrationPage' })
      }
    },
    // 获取直属员工
    getM_get_men() {
      const that = this
      performanceAppraisal.m_get_men(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.GetM_get_menlistData = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
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
      const date = new Date(curDate.getTime())
      date.setMonth(date.getMonth() + n)
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
      const currentdate = year + seperator1 + month
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
    .titleYellow{
        margin: 50px 0 10px 0;
    font-size: 16px;
    color: #f99740;
    text-align: center;
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
