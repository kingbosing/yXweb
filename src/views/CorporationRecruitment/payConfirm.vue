<template>
    <el-container class="temlateMain">
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>下单成功</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
             <p class="titleP"><i class="el-icon-success"></i>下单成功，待确认</p>
             <span class="textS marginS">该订单支付状态进行确认，确认订单后该订单已支付状态</span>
             <p>
                 <el-button @click="jumpIndex" style="width:180px;">返回</el-button>
             </p>
        </el-main>
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as announcement from '@/api/announcement'
export default {
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  watch: {

  },
  methods: {
    // 返回
    jumpIndex() {
      // this.$router.push({ path: '/announcement/NewAnnouncement', query: { draftId: id }})
      this.$router.push({ path: '/CorporationRecruitment/RePayOrderDetail' })
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
     padding: 160px 0 0 0;
     text-align: center;
     p{
         margin-bottom: 50px;
     }
     .titleP{
         font-size: 22px;
         margin: 0 0 40px 0;
         i{
             color:#09BB07;
              font-size: 26px;
              margin-right: 10px;
         }
     }
     .textS{
         display: block;
         margin-bottom: 17px;
         i{
             font-style: normal;
             color:#f99740;
         }
     }
     .textS.marginS{
         margin: 0 0 110px 0;
     }
     .textG.marginS{
         margin-bottom: 96px;
     }
     .textG{
          display: block;
         margin-bottom: 17px;
         color:#8a8a8a;
     }
     .footBox{
         border-top: 1px solid #dedede;
         text-align: left;
         padding: 38px 72px;
         color:#8a8a8a;
         p{
             margin: 0 0 16px 0;
         }
     }
  }

}

</style>

