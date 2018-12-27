<template>
  <el-container class="temlateMain">
    <el-main>
        <el-header height="720px">
           <el-card id="loginIndex" class="box-card">
               <h3>完善信息</h3>
               <div>
                   <el-input v-model="Nick" placeholder="请输入昵称" @blur="checkNick" @focus="focusFun(1)" :maxlength="12"></el-input>
                   <span class="worng">{{NickW}}</span>
               </div>
               <div class="passwordLine">
                   <el-input v-model="password" :type="isVisualInput" placeholder="请输入密码(6-16个数字和字母组成，区分大小写)" :maxlength="16" @blur="checkPassword" @focus="focusFun(2)"></el-input>
                   <i  @click="isVisual()"><new-icon class-name="file_col_icon"  :icon-name="isVisualIcon"/></i>
                   <span class="worng">{{passwordW}}</span>
               </div>
               <div class="passwordLine">
                   <el-input v-model="passwordR" :type="isVisualInput_repeat" placeholder="请重新输入密码" :maxlength="16" @blur="checkPasswordR" @focus="focusFun(3)"></el-input>
                   <i  @click="isVisual_repeat()"><new-icon class-name="file_col_icon"  :icon-name="isVisualIcon_repeat"/></i>
                   <span class="worng">{{passwordRW}}</span>
               </div>
               <button :class="{largeBtn:true, submitBtn:Nick!=''&&this.password!=''&&this.passwordR!=''}" @click="submitFun">下一步</button>
               <p>
                   <a @click="backLogin"><i class="backbtn"></i>登录</a>
               </p>
           </el-card>
        </el-header>
    </el-main>
    <!--弹窗-->
    <!--****************************-->
  </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as login from '@/api/login'
import { globalvariable } from '@/utils/globalvariable'
export default {
  data() {
    return {
      Nick: '',
      password: '',
      passwordR: '',
      checked: true,
      isVisualType: false,
      isVisualIcon: '#icon-hide',
      isVisualInput: 'password',
      isVisualType_repeat: false,
      isVisualIcon_repeat: '#icon-hide',
      isVisualInput_repeat: 'password',
      NickW: '',
      passwordW: '',
      passwordRW: ''
    }
  },
  components: {
  },
  created() {

  },
  mounted() {
  },
  methods: {
    // 提交
    submitFun() {
      if (this.Nick != '' && (/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/).test(this.password) && this.passwordR == this.password) {
        const RegisterArr = JSON.parse(sessionStorage.getItem('RegisterModel'))
        const model = {
          'QueueId': this.$route.query.QueueId,
          'Nick': this.Nick,
          'Account': RegisterArr.Account,
          'AccountType': 0,
          'IMEI': '',
          'VerificationCode': RegisterArr.VerificationCode,
          'password': this.password,
          'sourceType': 'xyjh'
        }
        console.log(model)
        const that = this
        login.submit(model).then(res => {
          console.log(res.data)
          if (res.data.successful) {
            const id = res.data.Data
            that.$router.push({ path: '/register/RegisteSuccession', query: { ID: id }})
          } else {
            that.passwordRW = res.data.Message
          }
        })
      }
    },
    // 输入框获得焦点
    focusFun(num) {
      if (num == 1) {
        this.NickW = ''
      } else if (num == 2) {
        this.passwordW = ''
      } else if (num == 3) {
        this.passwordRW = ''
      }
    },
    // 昵称验证
    checkNick() {
      this.Nick = (this.Nick).trim()
      if (this.Nick == '') {
        this.NickW = '昵称不能为空'
      }
    },
    // 密码验证
    checkPassword() {
      this.password = (this.password).trim()
      if (this.password == '') {
        this.passwordW = '密码不能为空'
        return false
      } else {
        var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/
        if (!reg.test(this.password)) {
          this.passwordW = '密码由6-16位数字与字母组成,请重新输入'
          return false
        } else {
          return true
        }
      }
    },
    // 重新密码验证
    checkPasswordR() {
      this.passwordR = (this.passwordR).trim()
      if (this.passwordR == '') {
        this.passwordRW = '重输密码不能为空'
        return false
      } else {
        if (this.passwordR == this.password) {
          this.passwordRW = ''
          return true
        } else {
          this.passwordRW = '2次输入的密码不一致'
          return false
        }
      }
    },
    // 返回登录页
    backLogin() {
      this.$router.push({ path: '/loginModule_index' })
    },
    // 密码是否可视
    isVisual() {
      console.log(11)
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
     height: 100%;
     width: 100%;
     overflow-x:hidden;
  .el-header {
    padding-top: 10px;
    background: url(/images/login-bg.png) no-repeat;
  }
  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;
       .el-card.box-card{
           width:560px;
           margin: 10% auto;
           padding: 0 20px;
           h3{
               text-align: center;
               font-size: 20px;
               font-weight: 500;
               margin: 10px 0 30px 0;
           }
           .translation{
               font-size: 12px;
               color:#f99740;
               cursor: pointer;
           }
           .passwordLine{
               position: relative;
           }
           .file_col_icon{
               font-size: 16px;
               color:#3a2525;
               cursor: pointer;
               position: absolute;
               right:10px;
               top:13px;
           }
           .worng{
               color:red;
               font-size: 12px;
               display: inline-block;
               padding-left:5px;
           }
           .largeBtn{
               margin: 10px 0;
               height: 42px;
               color: #fff;
               display: block;
               font-size: 14px;
               border: 1px solid #dedede !important;
               cursor: default;
               background-color: #fbb060;
               width:100%;
               border-radius: 6px;
           }
           .largeBtn.submitBtn{
               background-color: #f99740;
               cursor: pointer;
           }
           p{
               font-size: 12px;
               color:#8a8a8a;
               .backbtn {
                  width: 18px;
                  height: 18px;
                  display: inline-block;
                  background: url('/images/icon.png') no-repeat -196px -60px;
                   position: relative;
                   top:5px;
                   margin-right: 6px;
               }
               span{
                   float: right;
                   display: inline-block;
                   padding-top: 7px;
                   a{
                       margin-left: 10px;
                   }
               }
           }
       }
      .containerBox{
          .headLine{
              border-bottom: 1px solid #dedede;
              padding: 0 15px;
              h4{
                  font-size: 18px;
                  font-weight: normal;
                  color: #323232;
              }
          }
      }
       ul {
          text-align: center;
          margin-top: 40px;
          li {
              width: 70px;
              display: inline-block;
              margin-left: 5px;
              a{
                  color:#8a8a8a;
              }
              .split-line{
                  margin-left: 4px;
              }
            }
         }
       .downloadbtn {
              width: 190px;
              height: 60px;
              border: 1px solid #ccc;
              margin: 0 auto;
               margin-top: 20px;
              cursor: pointer;
              .andriod {
                width: 42px;
                height: 42px;
                background: url('/images/icon.png') no-repeat -40px 5px ;
                float: left;
                 margin-left: 10px;
                }
                .ios{
                   width: 42px;
                   height: 42px;
                   background: url('/images/icon.png') no-repeat 0px 5px ;
                   float: left;
                   margin-left: 20px;
                 }
                 .mac{
                   width: 42px;
                   height: 42px;
                   background: url('/images/icon.png') no-repeat -80px 5px ;
                   float: left;
                   margin-left: 30px;
                    }
                 .win{
                   width: 42px;
                   height: 42px;
                   background: url('/images/icon.png') no-repeat -124px 5px ;
                   float: left;
                   margin-left: 10px;
                 }
                 .title {
                    width: 110px;
                    float: left;
                    margin-top: 2px;
                    margin-left: 6px;
                    word-spacing: 2px;
                    letter-spacing: 2px;
                    color: #999;
                     }
                  ._title {
                    width: 110px;
                    float: left;
                    margin-left: 6px;
                    word-spacing: 2px;
                    letter-spacing: 1px;
                    color: #999;
                   }
                   ._title h4{
                     margin: 15px 0 4px 0;
                     font-size: 18px;
                     font-weight: normal;
                   }
                    .title h4{
                     font-size: 18px;
                     font-weight: normal;
                      margin: 15px 0 0 0;
                   }
                   ._title h6{
                    color: #b2b2b2;
                    margin: 4px 0 0 0;
                    font-weight: normal;
                   }
             }
             .downloadbtn:hover {
                background: #f2f2f2
              }
  }
}
</style>
<style>
  #loginIndex .el-input--medium .el-input__inner{
               height:42px;
               line-height: 42px;
           }
  #loginIndex .el-checkbox__input.is-checked+.el-checkbox__label{
          color:#8a8a8a;
           }
    #loginIndex .el-checkbox__label{
        font-size: 12px;
    }
</style>

