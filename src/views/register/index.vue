<template>
  <el-container class="temlateMain">
    <el-main>
        <el-header height="720px">
           <el-card id="loginIndex" class="box-card">
               <h3>验证手机号</h3>
               <div>
                   <el-input v-model="phoneNum" placeholder="请输入手机号" @blur="checkPhone" @focus="focusFun(1)"></el-input>
                   <span class="worng">{{phoneNumW}}</span>
               </div>
               <div class="passwordLine">
                   <el-input v-model="password" placeholder="请输入验证码" :maxlength="16" @blur="checkPassword" @focus="focusFun(2)"></el-input>
                   <button :class="{largeBtn:true, submitBtn:phoneNum!=''}" @click="validationBtn" v-if="VisualShow">发送验证码</button>
                   <button :class="{largeBtn:true}" v-if="!VisualShow">重新发送({{count}}s)</button>
                   <span class="worng">{{passwordW}}</span>
               </div>
               <el-checkbox v-model="checked">我同意</el-checkbox><span class="translation" @click="centerDialogVisible_1 = true">《小赢计划用户协议》</span>
               <button :class="{largeBtn:true, submitBtn:phoneNum!=''&&password!=''&&checked}" @click="submitFun">下一步</button>
               <p>
                   <a @click="backLogin"><i class="backbtn"></i>登录</a>
               </p>
           </el-card>
        </el-header>
    </el-main>
    <!--弹窗-->
            <el-dialog :visible.sync="centerDialogVisible_1" width="40%" title="小赢计划用户协议" center>
                  <p>小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议小赢计划用户协议</p>
              </el-dialog>
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
      phoneNum: '',
      password: '',
      checked: true,
      isVisualType: false,
      isVisualIcon: '#icon-hide',
      isVisualInput: 'password',
      phoneNumW: '',
      passwordW: '',
      myRoleNum: '',
      centerDialogVisible_1: false,
      VisualShow: true,
      timer: null,
      count: ''
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
      if (this.phoneNum != '' && this.password != '' && this.checked) {
        const that = this
        var model = {
          'Account': that.phoneNum,
          'AccountType': 1,
          'VerificationCode': that.password
        }
        login.Verificat(model).then(res => {
          console.log(res.data)
          if (res.data.successful) {
            const id = res.data.Data.QueueId
            that.$router.push({ path: '/register/RegisteInformation', query: { QueueId: id }})
            sessionStorage.setItem('RegisterModel', JSON.stringify(model))
          } else {
            that.passwordW = res.data.Message
          }
        })
      }
    },
    // 获取验证码
    validationBtn() {
      if (this.checkPhone()) {
        console.log(this.phoneNum)
        const that = this
        const model = {
          'Account': that.phoneNum,
          'AccountType': 1,
          'IMEI': ''
        }
        login.sendcode(model).then(res => {
          if (res.data.successful) {
            console.log(res.data)
            const TIME_COUNT = 60
            if (!that.timer) {
              that.count = TIME_COUNT
              that.VisualShow = false
              that.timer = setInterval(() => {
                if (that.count > 0 && that.count <= TIME_COUNT) {
                  that.count--
                } else {
                  that.VisualShow = true
                  clearInterval(that.timer)
                  that.timer = null
                }
              }, 1000)
            }
          } else {
            that.phoneNumW = res.data.Message
          }
        })
      }
    },
    // 输入框获得焦点
    focusFun(num) {
      if (num == 1) {
        this.phoneNumW = ''
      } else {
        this.passwordW = ''
      }
    },
    // 验证码验证
    checkPassword() {
      this.password = (this.password).trim()
      if (this.password == '') {
        this.passwordW = '验证码不能为空'
      }
    },
    // 手机验证
    checkPhone() {
      this.phoneNum = (this.phoneNum).trim()
      if (this.phoneNum == '') {
        this.phoneNumW = '手机号不能为空'
        return false
      } else {
        var reg = /^1[34578][0-9]{9}$/
        if (!reg.test(this.phoneNum)) {
          this.phoneNumW = '手机号格式错误,请重新输入'
          return false
        } else {
          return true
        }
      }
    },
    // 返回登录页
    backLogin() {
      this.$router.push({ path: '/loginModule_index' })
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
               .el-input.el-input--medium{
                   width:320px;
                   display: inline-block;
                   margin-right: 38px;
               }
               .largeBtn{
                   width:120px;
                   display: inline-block;
                   margin: 0;
               }
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

