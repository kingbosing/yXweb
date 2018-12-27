<template>
    <el-container id="financialInitialization" class="temlateMain">
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>财务初始化管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" v-if="veiwState">
                <el-form-item label="单位名称:">
                     {{MyCompany}}
                </el-form-item>
                <el-form-item label="会计准则:">
                     {{guidelines}}
                </el-form-item>
                <el-form-item label="启用时间:" prop="time">
                     <el-date-picker v-model="ruleForm.time" format='yyyy年M月'  type="month"  placeholder="请设置启用期间" :disabled="disableS" ></el-date-picker>
                </el-form-item>
                <el-form-item label="凭证是否需要审核:" prop="audit" class="audit">
                     <el-radio-group v-model="ruleForm.audit" :disabled="disableS">
                       <el-radio label="0">不需要</el-radio>
                       <el-radio label="1">需要</el-radio>
                     </el-radio-group>
                </el-form-item>
            </el-form>
             <el-form :model="showForm"  :rules="shows" ref="showForm" label-width="90px" class="demo-ruleForm" v-if="!veiwState">
                <el-form-item label="单位名称:">
                    {{MyCompany}}
                </el-form-item>
                <el-form-item label="会计准则:">
                     {{guidelines}}
                </el-form-item>
                <el-form-item label="启用时间:" prop="time">
                    {{viewTime}}
                </el-form-item>
                <el-form-item label="凭证是否需要审核:" prop="audit" class="audit">
                    {{showForm.audit}}
                </el-form-item>
            </el-form>
            <div class="btnF">
              <el-button type="warning" size="medium" @click="submitForm('ruleForm')"  v-if="veiwState">保 存</el-button>
              <el-button type="warning" size="medium"  v-if="!veiwState" v-on:click="veiwState=true">编 辑</el-button>
               <div class="infoBox" v-if="firstveiw"><span id="triangle-left"></span>设置完成后，可到工作台里的财务设置中设置会计项目、财务初期。</div>
            </div>
            <div class="promptBox">
                <p class="titleP"><b></b>提示</p>
                <p>1.系统默认为小企业会计准则;</p>
                <p>2.开账前且无录入期初数据支持修改启用时间;</p>
                <p>3.开账后不允许更改凭证是否需要审核;</p>
                <p>4."<b>*</b>"为必填项，其他均为非必填。</p>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import * as finance from '@/api/finance'
export default {
  data() {
    return {
      ruleForm: {
        time: '',
        audit: '0' // 审核
      },
      rules: {
        audit: [
          { required: true }
        ],
        time: [
          { required: true, message: '请设置启用期间', trigger: 'blur' }
        ]
      },
      showForm: {
        time: '0',
        audit: '0' // 审核
      },
      shows: {
        audit: [
          { required: true }
        ],
        time: [
          { required: true }
        ]
      },
      // 显示值
      veiwState: true,
      // 提示黄
      firstveiw: true,
      // 公司名称
      MyCompany: '',
      // 准则
      guidelines: '小企业会计准则',
      // 显示时间
      viewTime: '',
      // 禁用
      disableS: ''
    }
  },
  mounted() {
    this.JudgeInitManage()
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var audit_1
          if (this.ruleForm.audit == '0') {
            audit_1 = false
          } else {
            audit_1 = true
          }
          var setDate = {
            'DepartmentName': this.MyCompany,
            'BusarStandard': this.guidelines,
            'EnableDate': this.ruleForm.time,
            'IsNeedAudit': audit_1
          }
          console.log(setDate)
          const that = this
          return new Promise((resolve, reject) => {
            finance.SaveInitManage(getToken(), setDate)
              .then(response => {
                console.log(response.data)
                if (response.data.Successful) {
                  that.$message({
                    message: '保存成功',
                    type: 'success',
                    onClose: function() {
                      that.JudgeInitManage()
                    }
                  })
                  resolve()
                } else {
                  that.$message({
                    message: '保存失败',
                    type: 'error'
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          })
          //* *********************** */
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 判断是否设置财务初始化管理
    JudgeInitManage() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.JudgeInitManage(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              // 获取公司名称
              this.MyCompany = this.$store.state.company.CompanyName
              if (response.data.Data) { // 设置过的
                that.veiwState = false
                that.firstveiw = false
                that.disableS = true
                that.GetInitManage()
              } else { // 从未设置
                that.veiwState = true
                that.firstveiw = true
                that.disableS = false
              }
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取设置信息
    GetInitManage() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetInitManage(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              // ***
              this.ruleForm.time = response.data.Data.EnableDate
              this.showForm.time = response.data.Data.EnableDate
              var timeS = (response.data.Data.EnableDate).split('/')
              that.viewTime = timeS[0] + '年' + timeS[1] + '月'
              if (response.data.Data.IsNeedAudit) {
                this.ruleForm.audit = '1'
                this.showForm.audit = '需要'
              } else {
                this.ruleForm.audit = '0'
                this.showForm.audit = '不需要'
              }
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
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
     padding: 22px 30px;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            //padding: 20px;
         }
    }
  }
    .btnF{
      padding-left:20px;
      .infoBox{
        display: inline-block;
        width:502px;
        background-color: #ffbf51;
        height:48px;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        line-height: 48px;
        padding-left:15px;
       box-shadow: 0 5px 12px 0 rgba(255,196,96,.4);
       margin-left: 30px;
       position: relative;
       #triangle-left {
        display:inline-block;
        width:0;
        height:0;
        border-width:10px 10px 10px 0;
        border-style:solid;
        border-color:transparent #ffbf51 transparent transparent;/*透明 黄 透明 透明 */
        position: absolute;
        left:-10px;
        top:14px;
}
      }
    }
}
.promptBox{
  width:370px;
  height:186px;
  background-color: #fafafa;
  border-radius: 6px;
  margin: 60px 0 0 20px;
  padding: 20px;
  p{
    margin-top:0;
    color: #8a8a8a;
  }
  b{
    color:#f99740;
  }
  p.titleP{
    color:#333;
    b{
      display: inline-block;
      width: 4px;
      height: 14px;
      background-color: #f99740;
      margin-right: 8px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
<style>
  #financialInitialization .audit .el-form-item__label{
      width:147px !important;
  }
  #financialInitialization .el-form-item__label{
    font-weight: normal;
    color: #8a8a8a;
  }
  .el-form-item.is-required .el-form-item__label:before{
    color:#f99740;
  }
  .el-radio__input.is-checked + .el-radio__label{
    color:#333;
  }
</style>

