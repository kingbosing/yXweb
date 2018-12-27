
<template>
    <el-container class="temlateMain" id="WorkRegistration" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PerformanceAppraisal/WorkAuditPage' }">工作审核</el-breadcrumb-item>
                <el-breadcrumb-item>{{Name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
                 <span>选择日期</span>
                 <span v-on:click="toLeft"><i class="el-icon-arrow-left"></i></span>
                 <el-date-picker v-model="todayTime" type="date" :picker-options="pickerOptions1" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择月"></el-date-picker>
                 <span v-on:click="toRight"><i class="el-icon-arrow-right"></i></span>
                 <b class="today" v-on:click="today"></b>
            </div>
        </el-header>
        <el-main>
             <el-container>
               <el-header height="120px">
                   <p>
                      <span class="gery">时间：</span><span class="black">{{todayTime}}</span>
                      <span class="gery">姓名：</span><span class="black">{{Name}}</span>
                      <span class="gery">部门：</span><span class="black">{{!Department?'(空)':Department}}</span>
                      <span class="gery">职位：</span><span class="black">{{!Job?'(空)':Job}}</span>
                   </p>
                   <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple" title="工作内容">工作内容</div></el-col>
                      <el-col :span="5"><div class="grid-content bg-purple" title="描述">描述</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple" title="最后修改时间">最后修改时间</div></el-col>
                      <el-col :span="1"><div class="grid-content bg-purple" title="标准分">标准分</div></el-col>
                      <el-col :span="1"><div class="grid-content bg-purple" title="自评得分">自评得分</div></el-col>
                      <el-col :span="1"><div class="grid-content bg-purple" title="失误项">失误项</div></el-col>
                      <el-col :span="1"><div class="grid-content bg-purple" title="失误说明">失误说明</div></el-col>
                      <el-col :span="1"><div class="grid-content bg-purple" title="直属领导评分">直属领导评分</div></el-col>
                      <el-col :span="2"><div class="grid-content bg-purple" title="直属领导评定失误项">直属领导评定失误项</div></el-col>
                      <el-col :span="2"><div class="grid-content bg-purple" title="直属领导评定失误说明">直属领导评定失误说明</div></el-col>
                      <el-col :span="2"><div class="grid-content bg-purple" title="状态">状态</div></el-col>
                      <el-col :span="2"><div class="grid-content bg-purple" title="操作">操作</div></el-col>
                   </el-row>
               </el-header>
               <el-main :class="{'emptyImg':listData.length==0}">
                  <el-row class="col" v-for="k in listData" :key="k.WorkContent+''">
                        <el-col :span="2"><div class="grid-content bg-purple" :title="k.WorkContent">{{k.WorkContent}}</div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple" :title="k.WorkContentDesc">{{!k.WorkContentDesc?'-':k.WorkContentDesc}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple" :title="k.UpdateTime">{{k.UpdateTime}}</div></el-col>
                        <el-col :span="1"><div class="grid-content bg-purple">{{!k.CompleteScore?'-':k.CompleteScore}}</div></el-col>
                        <el-col :span="1"><div class="grid-content bg-purple">{{!k.SelfScore?'-':k.SelfScore}}</div></el-col>
                        <el-col :span="1"><div class="grid-content bg-purple" :title="k.SelfMissName">{{!k.SelfMissName?'-':k.SelfMissName}}</div></el-col>
                        <el-col :span="1"><div class="grid-content bg-purple" :title="k.SelfMissDesc">{{!k.SelfMissDesc?'-':k.SelfMissDesc}}</div></el-col>
                        <el-col :span="1"><div class="grid-content bg-purple">{{!k.LeaderScore?'-':k.LeaderScore}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple" :title="k.LeaderMissName">{{!k.LeaderMissName?'-':k.LeaderMissName}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple" :title="k.LeaderMissDesc">{{!k.LeaderMissDesc?'-':k.LeaderMissDesc}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple">{{k.Status.Value}}</div></el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                 <el-button size="mini" type="warning" v-on:click="toOpen(k.RegisterId,k.WorkContentId,k.SelfScore)" v-if="k.Status.Key==1">审核</el-button>
                            </div>
                        </el-col>
                  </el-row>
               </el-main>
            </el-container>
        </el-main>
        <!--弹窗-->
          <el-dialog title="工作审核" :visible.sync="dialogFormVisible" class="hardAndEasy" width="760px">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="170px" label-position="demo-ruleForm">
                <el-form-item label="直属领导评分:" prop="name">
                    <el-input v-model="form.name" :maxlength="15"  placeholder="请输入分值"></el-input>
                </el-form-item>
                <el-form-item label="直属领导评定失误项:" prop="state">
                    <el-select v-model="form.state" placeholder="请选择失误项">
                        <template v-for="(value, key)  in getErrorList">
                            <el-option :label="value" :value="key" :key="value+''"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="直属领导评定失误说明:" prop="describe">
                    <el-input v-model="form.describe" :maxlength="30" v-on:keyup.native="DelE()" placeholder="请输入工作失误说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="" style="margin-right:60px;" v-on:click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="warning" v-on:click="submitForm('ruleForm')" :loading="ifPut">保 存</el-button>
            </div>
        </el-dialog>
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
      listData: '', // 列表数据
      pId: '', // 员工ID
      registerId: '',
      Department: '',
      getErrorList: '',
      Job: '',
      Name: '',
      fullscreenLoading: false, // 加载效果状态值
      // 日期:
      todayTime: '',
      toNUm: 0,
      // 弹窗表
      dialogFormVisible: false,
      operation: false,
      formLabelWidth: '100',
      form: {
        name: '',
        describe: '',
        state: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        name: [
          { required: true, message: '请填写分值', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]\d{0,3}(?:\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('请输入精确到正2位小数，且不超过四位数的数字'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      ifPut: false
    }
  },
  mounted() {
    this.pId = this.$route.query.id
    this.todayTime = this.$route.query.time
    this.getList(this.pId, this.todayTime)
  },
  watch: {
    todayTime: function(newT, old) {
      this.getList(this.pId, newT)
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          var Data = {
            RegisterId: this.registerId,
            LeaderScore: this.form.name,
            LeaderMissDesc: this.form.describe,
            LeaderMissId: this.form.state
          }
          console.log(Data)
          const that = this
          performanceAppraisal.work_item_check(getToken(), Data).then(res => {
            console.log(res.data)
            if (res.data.Successful) {
              that.$message({
                message: '审核成功!',
                type: 'success',
                onClose: function() {
                  that.getList(that.pId, that.todayTime)
                  that.dialogFormVisible = false
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
            type: 'warning'
          })
        }
      })
    },
    // 获取数据列表
    getList(pId, time) {
      this.listData = []
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.work_item_list(getToken(), pId, 1, 10000, time).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.Records
          that.Department = res.data.Data.Department
          that.Job = res.data.Data.Job
          that.Name = res.data.Data.Name
          that.fullscreenLoading = false
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    toRight() {
      if (this.todayTime < this.getNowFormatDate(0)) {
        // this.toNUm += 1;
        this.todayTime = this.getNowFormatDate(1)
      }
    },
    // 日期处理
    getNowFormatDate(n) {
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
      const currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    toLeft() {
      this.todayTime = this.getNowFormatDate(-1)
    },
    today() {
      this.todayTime = this.getNowFormatDate(0)
    },
    toOpen(registerId, contentid, selfScore) {
      this.registerId = registerId
      this.errorList(contentid)
      this.dialogFormVisible = true
    },
    // 弹窗
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    DelE: function() {
      this.form.describe = (this.form.describe).trim()
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
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
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            font-weight: normal;
            font-size: 14px;
            padding: 0;
            p{
                margin: 0;
                padding: 0 20px;
                height: 60px;
                line-height: 60px;
                .gery{
                    color:#8a8a8a;
                }
                .black{
                    margin-right: 20px;
                    color:#323232;
                }
            }
            .el-row{
                 background-color: rgb(248, 248, 248);
              height: 60px;
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
         .el-main{
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

}
.emptyImg{
background: url("/images/apply_empty.png") no-repeat center;
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
