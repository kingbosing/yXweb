<template>
  <el-container class="temlateMain">
    <el-main>
        <el-header height="720px">
           <el-card id="loginIndex" class="box-card">
               <h3>找回成功</h3>
               <div class="successionIcon">
                   <i class="el-icon-success"></i>
               </div>
               <p>您已重置密码成功，现在可立即登录 </p>
               <button :class="{largeBtn:true, submitBtn:true}" @click="backLogin">登录</button>
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

    }
  },
  components: {
  },
  created() {

  },
  mounted() {
    this.xiaoyinghao = this.$route.query.ID
  },
  methods: {
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
           padding: 0 50px;
           h3{
               text-align: center;
               font-size: 20px;
               font-weight: 500;
               margin: 10px 0 30px 0;
           }
           .successionIcon{
               text-align: center;
               i{
                   color:#5CB85C;
                   font-size: 48px;
               }
           }
           p{
                text-align: center;
                margin: 30px 0;
                b{
                    color:#f99740;
                }
           }
           .largeBtn{
               margin: 10px auto;
               height: 42px;
               color: #fff;
               display: block;
               font-size: 14px;
               border: 1px solid #dedede !important;
               cursor: default;
               background-color: #fbb060;
               width:80%;
               border-radius: 6px;
           }
           .largeBtn.submitBtn{
               background-color: #f99740;
               cursor: pointer;
           }
       }
  }
}
</style>

