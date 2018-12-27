<template>
    <el-container id="financialInitialization" class="temlateMain">
        <el-main>
            <div class="promptC">
               <div class="promptImg"></div>
               <div class="promptBox">
                <p class="titleP"><b></b>温馨提示</p>
                <p>第一步：请先到综合管理中[财务初始化管理]模块进行设置。
                  <span>
                    <router-link to="/manager/financialInitialization" v-if="!Initialize"><el-button size="medium" type="warning">前去设置</el-button></router-link>
                    <i v-if="Initialize"></i>
                  </span>
                </p>
                <p>第二步：设置完成后，可到工作台里的财务设置中设置会计科目及财务期初。
                  <span v-if="Initialize">
                   <el-button size="medium" type="warning" v-on:click="JumpOut(1)" v-if="!isSetSubjects">前去设置</el-button>
                    <i v-if="isSetSubjects"></i>
                  </span>
                </p>
                <p>第三步：试算平衡后即可开账，开账后将无法更改启用期间及期初数据。
                  <span v-if="isSetSubjects">
                    <el-button size="medium" type="warning" v-on:click="JumpOut(2)" v-if="!setBill">前去设置</el-button>
                    <i v-if="setBill"></i>
                  </span>
                </p>
               </div>
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
      // 财务初始化管理(true-已设置  false-未设置)
      Initialize: true,
      // 设置中设置会计科目及财务期初
      isSetSubjects: false,
      // 开账
      setBill: false
    }
  },
  mounted() {
    // this.JudgeInitManage()
    // this.AccountIsOpen()
    this.JudgeInitManageTip()
  },
  methods: {
    // 判断是否设置财务初始化管理
    JudgeInitManage() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.JudgeInitManage(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.Initialize = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    JumpOut(id) { // 跳页
      this.$router.push({ path: '/finance/FinanceSetup', query: { TaskAct: id }})
    },
    // 判断是否试算平衡
    JudgeInitManageTip() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.JudgeInitManageTip(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.Initialize = response.data.Data.FirstStep
              that.isSetSubjects = response.data.Data.SecondStep
              that.setBill = response.data.Data.ThirdStep
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 判断是否开账
    AccountIsOpen() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.AccountIsOpen(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.setBill = response.data.Data
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

}
.promptBox{
  width:700px;
  height:240px;
  background-color: #fafafa;
  border-radius: 6px;
  margin: 90px 0 0 0;
  padding: 20px;
  p{
    margin-top:0;
    color: #8a8a8a;
    height:36px;
    line-height: 36px;
    span{
        display: inline-block;
        float: right;
        width: 98px;
        text-align: center;
        i{
            display: inline-block;
            width:18px;
            height:18px;
             background: url("../../assets/finance/icon_complete.jpg") no-repeat;
        }
    }
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
.promptImg{
    width: 304px;
    height:165px;
    background: url("../../assets/finance/pic_promptpage.jpg") no-repeat;
     margin: 0 auto;
}
.promptC{
   width:700px;
   margin: 0 auto;
   padding-top: 10%;
}
</style>

