<template>
    <el-container class="temlateMain">
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>下单成功</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
             <p class="titleP"><i class="el-icon-success"></i>下单成功，请尽快完成银行汇款</p>
             <span class="textS">订单内容：发布职位</span>
             <span class="textS">当前订单金额：<i>60.00</i>元</span>
             <span class="textS">订单编号：121213413131</span>
             <span class="textS">下单时间：2018-10-13 13:02</span>
             <span class="textS marginS">请在48小时内完成银行汇款，否则订单将自动取消</span>

             <span class="textG">开户银行：建设银行杭州市民中心支行</span>
             <span class="textG">开户名称：杭州齐集科技有限公司</span>
             <span class="textG">收款账户：1232142342343243</span>
             <span class="textG marginS">您通过银行汇款之后，点击下方已支付我们将对该订单支付状态进行确认，确认订单后该订单已支付状态</span>
             <p>
                 <el-button type="warning" style="margin-right:70px;width:180px;" @click="jumpIndex">查看详情</el-button>
                 <el-button style="width:180px;" @click="judgePay">已支付</el-button>
             </p>
             <div class="footBox">
                 <p>温馨提示：</p>
                 <p>此订单与合同具备同样的法律效力，您随时在“消费记录”中查看该订单。</p>
                 <p>客服电话：0571-28210560</p>
                 <p>传真：0571-28271677</p>
                 <p>邮箱：qjkj@yinglai.ren</p>
             </div>
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
    // 跳转到订单详情页
    jumpIndex() {
      // this.$router.push({ path: '/announcement/NewAnnouncement', query: { draftId: id }})
      this.$router.push({ path: '/CorporationRecruitment/RePayOrderDetail' })
    },
    // 判断是否已付款
    judgePay() {
      console.log(12122)
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
     padding: 60px 0 0 0;
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
     .textS.marginS,.textG.marginS{
         margin: 32px 0 40px 0;
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

