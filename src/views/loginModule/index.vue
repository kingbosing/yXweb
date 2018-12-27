<template>
  <el-container class="temlateMain">
    <el-main>
        <el-header height="720px">
           <div class="logo"></div>
           <el-card id="loginIndex" class="box-card">
               <h3>账号登录</h3>
               <div>
                   <el-input v-model="phoneNum" placeholder="请输入手机号" @blur="checkPhone" @focus="focusFun(1)"></el-input>
                   <span class="worng">{{phoneNumW}}</span>
               </div>
               <div class="passwordLine">
                   <el-input v-model="password" :type="isVisualInput" placeholder="请输入密码" :maxlength="16" @blur="checkPassword" @focus="focusFun(2)" @keyup.enter="submitFun"></el-input>
                   <i  @click="isVisual()"><new-icon class-name="file_col_icon"  :icon-name="isVisualIcon"/></i>
                   <span class="worng">{{passwordW}}</span>
               </div>
               <el-checkbox v-model="checked">记住密码</el-checkbox>
               <button :class="{largeBtn:true, submitBtn:phoneNum!=''&&password!=''}" @click="submitFun">登录</button>
               <p>
                   <a href="http://www.yinglaikonggu.com/Home/XiaoYing"><i class="backbtn"></i>进入官网</a>
                   <span>
                       <a @click="Register">注册账号</a>
                       <a @click="forget">忘记密码？</a>
                   </span>
               </p>
           </el-card>
        </el-header>
       <el-row>
           <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="4">&emsp;</el-col>
           <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="16">
               <div class="containerBox">
                   <div class="headLine">
                     <h4>下载小赢计划</h4>
                   </div>
               </div>
               <el-row>
                   <el-col :span="6">
                       <div class="downloadbtn" id="andriodbtn">
                         <div class="andriod"></div>
                         <div class="title">
                            <h4>Andriod版</h4>
                         </div>
                       </div>
                   </el-col>
                   <el-col :span="6">
                       <div class="downloadbtn" id="iosbtn">
                         <div class="ios"></div>
                         <div class="title">
                            <h4>iPhone版</h4>
                         </div>
                       </div>
                   </el-col>
                   <el-col :span="6">
                       <div class="downloadbtn">
                         <div class="mac"></div>
                         <div class="_title">
                           <h4>Mac版</h4>
                           <h6>未发布</h6>
                         </div>
                       </div>
                   </el-col>
                   <el-col :span="6">
                       <div class="downloadbtn " id="Windowsbtn">
                         <div class="win"></div>
                         <div class="_title">
                           <h4 style="margin-top: 20px;">Windows版</h4>
                         </div>
                       </div>
                   </el-col>
              </el-row>
              <ul>
                 <li style="width: 130px">
                    <span class="copyright-text" dir="ltr">&copy;2017&nbsp;xiaoying</span>
                </li>
                <li>
                    <a href="#">开放平台</a>
                    <span class="split-line">|</span>
                </li>

                <li>
                    <a href="#">服务协议</a>
                    <span class="split-line">|</span>
                </li>
                <li>
                    <a href="#">权利申明</a>
                    <span class="split-line">|</span>
                </li>
                <li title="当前版本：V1.1.0.1B1">
                    <a href="#">版本更新</a>
                    <span class="split-line">|</span>
                </li>
                <li>
                    <a href="#">帮助中心</a>
                    <span class="split-line">|</span>
                </li>
                <li>
                    <a href="#">版权投诉</a>
                </li>
              </ul>
           </el-col>
           <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="4">&emsp;</el-col>
       </el-row>
    </el-main>
    <!--弹窗-->
    <!--****************************-->
  </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as login from '@/api/login'
import { globalvariable } from '@/utils/globalvariable'
import { setTimeout, clearInterval } from 'timers'
export default {
  data() {
    return {
      phoneNum: '',
      password: '',
      checked: false,
      isVisualType: false,
      isVisualIcon: '#icon-hide',
      isVisualInput: 'password',
      phoneNumW: '',
      passwordW: '',
      myRoleNum: ''
    }
  },
  components: {
  },
  created() {

  },
  beforeMount() {
    // 获取账号密码
    if (this.getCookie('phoneNum') && this.getCookie('pswd')) {
      this.phoneNum = this.getCookie('phoneNum')
      this.password = this.getCookie('pswd')
      this.checked = true
    }
  },
  methods: {
    // 忘记密码
    forget() {
      this.$router.push({ path: '/loginModule/ForgetPassword' })
    },
    // 注册页
    Register() {
      this.$router.push({ path: '/register_index' })
    },
    // 提交
    submitFun() {
      // console.log(, )
      const userInfo = {
        username: this.phoneNum,
        password: this.password
      }
      this.$store
        .dispatch('LoginByUsername', userInfo)
        .then((c) => {
          console.log(c)
          sessionStorage.setItem('Token', c.Data.Token)
          document.cookie = 'Token=' + c.Data.Token
          // user
          const Token = c.Data.Token
          const user = c.Data
          login.myRole(Token).then(res => {
            if (res.data.successful) {
              user.Role = res.data.Data
            }
          })
          // 公司
          login.myCompany(Token).then(res => {
            if (res.data.successful) {
              user.SetCompany = res.data.Data
            }
          })
          document.cookie = 'user=' + JSON.stringify(user)
          sessionStorage.setItem('user', JSON.stringify(user))

          window.location.reload()
        })
        .catch(() => {

        })
      if (this.phoneNum != '' && this.password != '' && false) {
        const that = this
        return new Promise((resolve, reject) => {
          login.loginByUsername(that.phoneNum, that.password, '', '')
            .then(response => {
              // console.log(response)
              if (response.data.successful) {
                // 保存或删除账号密码
                document.cookie = 'checked=' + that.checked
                if (that.checked) {
                  that.setCookie('phoneNum', that.phoneNum, 7) // 保存帐号到cookie，有效期7天
                  that.setCookie('pswd', that.password, 7) // 保存密码到cookie，有效期7天
                } else { // 删除
                  that.setCookie('phoneNum', null, -1)
                  that.setCookie('pswd', null, -1)
                }
                // Token
                sessionStorage.setItem('Token', response.data.Data.Token)
                document.cookie = 'Token=' + response.data.Data.Token
                // user
                const Token = response.data.Data.Token
                const user = response.data.Data
                login.myRole(Token).then(res => {
                  if (res.data.successful) {
                    user.Role = res.data.Data
                  }
                })
                // 公司
                login.myCompany(Token).then(res => {
                  if (res.data.successful) {
                    user.SetCompany = res.data.Data
                  }
                })
                document.cookie = 'user=' + JSON.stringify(user)
                sessionStorage.setItem('user', JSON.stringify(user))
                that.$router.push({ path: '/home/index' })
                // console.log(sessionStorage.getItem('Token'))
                // console.log(user)
                resolve()
              } else {
                that.passwordW = response.data.Message
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    // 获取cookie
    getCookie(name) {
      const reg = RegExp(name + '=([^;]+)')
      const arr = document.cookie.match(reg)
      if (arr) {
        return arr[1]
      } else {
        return ''
      }
    },
    // //设置cookie
    setCookie(name, value, day) {
      var date = new Date()
      date.setDate(date.getDate() + day)
      document.cookie = name + '=' + value + ';expires=' + date
    },
    // 输入框获得焦点
    focusFun(num) {
      if (num == 1) {
        this.phoneNumW = ''
      } else {
        this.passwordW = ''
      }
    },
    // 密码验证
    checkPassword() {
      this.password = (this.password).trim()
      if (this.password == '') {
        this.passwordW = '密码不能为空'
      }
    },
    // 手机验证
    checkPhone() {
      this.phoneNum = (this.phoneNum).trim()
      if (this.phoneNum == '') {
        this.phoneNumW = '手机号不能为空'
      } else {
        var reg = /^1[34578][0-9]{9}$/
        if (!reg.test(this.phoneNum)) {
          this.phoneNumW = '手机号格式错误,请重新输入'
        }
      }
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
    .logo{
        width: 168px;
        height: 60px;
        background: url(/images/logo_icon.png) no-repeat;
        border-bottom: none;
        margin-left: 110px;
       }
       .el-card.box-card{
           width:360px;
           position: absolute;
           top: 155px;
           left: 60%;
           padding: 0 20px;
           h3{
               text-align: center;
               font-size: 20px;
               font-weight: 500;
               margin: 10px 0 30px 0;
           }
           .passwordLine{
               position: relative;
           }
           .file_col_icon{
               font-size: 16px;
               color:#323232;
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

