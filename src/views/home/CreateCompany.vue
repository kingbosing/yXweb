<template>
    <el-container class="temlateMain">
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>创建公司</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
          <div class="mainBox">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                  <el-form-item label="企业（团队）名称" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="请输入企业名称" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="管理员密码" prop="password">
                      <el-input v-model="ruleForm.password" :type="isVisualInput" placeholder="输入密码（6-16个字符组成区分大小写）"></el-input>
                      <i @click="isVisual()"><new-icon class-name="file_col_icon"  :icon-name="isVisualIcon"/></i>
                  </el-form-item>
                  <el-form-item label="确认管理员密码" prop="passwordR">
                      <el-input v-model="ruleForm.passwordR" :type="isVisualInput_repeat" placeholder="请重新输入密码"></el-input>
                      <i @click="isVisual_repeat()"><new-icon class-name="file_col_icon"  :icon-name="isVisualIcon_repeat"/></i>
                  </el-form-item>
                  <el-form-item label="安全问题" prop="problem">
                      <el-input v-model="ruleForm.problem" placeholder="请输入40字以内的安全问题" :maxlength="40"></el-input>
                  </el-form-item>
                  <el-form-item label="答案" prop="answer">
                      <el-input v-model="ruleForm.answer" placeholder="请输入40字以内的答案" :maxlength="40"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="warning" @click="submitForm('ruleForm')" style="width:100%;">创建公司</el-button>
                  </el-form-item>
             </el-form>
          </div>
        </el-main>
        <!--弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span class="textCenter">创建成功！</span>
                  <span class="textCenter">您的公司ID是：<b>{{companyID}}</b></span>
                  <span class="textCenter">您可以继续完善信息或直接进入工作页面！</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="jumpIndex(1)" style="margin-right:80px">完善企业信息</el-button>
                     <el-button @click="jumpIndex(2)">直接进入</el-button>
                  </span>
              </el-dialog>
        <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import * as home from '@/api/home'
import * as login from '@/api/login'

export default {
  components: {

  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/
        if (!reg.test(value)) {
          callback(new Error('密码由6-16位数字与字母组成,请重新输入'))
        }
        if (this.ruleForm.passwordR !== '') {
          this.$refs.ruleForm.validateField('passwordR')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        passwordR: '',
        problem: '',
        answer: ''
      },
      rules: {
        name: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwordR: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        problem: [
          { required: true, message: '安全问题不能为空', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '答案不能为空', trigger: 'blur' }
        ]
      },
      isVisualType: false,
      isVisualIcon: '#icon-hide',
      isVisualInput: 'password',
      isVisualType_repeat: false,
      isVisualIcon_repeat: '#icon-hide',
      isVisualInput_repeat: 'password',
      centerDialogVisible_1: false,
      companyID: ''
    }
  },
  mounted() {
  },
  watch: {

  },
  methods: {
    // 点击创建按钮验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const model = {
            'ParentId': '',
            'LOGFormatUrl': '',
            'Name': this.ruleForm.name,
            'Stockholders': '',
            'LawAgent': '',
            'MastPhones': '',
            'ReservePhones': '',
            'Url': '',
            'Address': '',
            'question': this.ruleForm.problem,
            'Answer': this.ruleForm.answer,
            'Password': this.ruleForm.password,
            'Province': '',
            'City': '',
            'County': '',
            'Descriptions': [],
            'Certificates': []
          }
          console.log(model)
          const that = this
          home.createCompany(getToken(), model).then(res => {
            console.log(res.data)
            if (res.data.successful) {
              that.companyID = res.data.Data.CompanyCode
              that.centerDialogVisible_1 = true
            } else {
              that.$message({
                message: res.data.Message,
                type: 'error'
              })
            }
          })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 跳转
    jumpIndex(type) {
      this.centerDialogVisible_1 = false
      const that = this
      home.switchFun(getToken(), that.companyID).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          if (type == 1) {
            that.$router.push({ path: '/CompanyInformationEdit', query: { companycode: that.companyID }})
          } else {
            that.$router.push({ path: '/home/index' })
          }
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 密码是否可视
    isVisual() {
      if (this.isVisualType) {
        this.isVisualType = false
        this.isVisualIcon = '#icon-hide'
        this.isVisualInput = 'password'
      } else {
        this.isVisualType = true
        this.isVisualIcon = '#icon-eyes1'
        this.isVisualInput = 'text'
      }
    },
    isVisual_repeat() {
      if (this.isVisualType_repeat) {
        this.isVisualType_repeat = false
        this.isVisualIcon_repeat = '#icon-hide'
        this.isVisualInput_repeat = 'password'
      } else {
        this.isVisualType_repeat = true
        this.isVisualIcon_repeat = '#icon-eyes1'
        this.isVisualInput_repeat = 'text'
      }
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
  .el-header {

    .header-right {
      float: right;
      .el-button.el-button--medium{
          float: left;
          margin: 7px 10px 0 0;
      }
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main{
      height: 100%;
      padding: 70px 30px 20px 30px;
      .mainBox{
          width:900px;
          margin: 0 auto;
          .file_col_icon{
               font-size: 16px;
               color:#3a2525;
               cursor: pointer;
               position: absolute;
               right:10px;
               top:13px;
           }
      }
  }

}
.textCenter{
             display:block;
             text-align: center;
             b{
               color:#f99740;
               font-weight: normal;
             }
           }
</style>

