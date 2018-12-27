<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
        v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span @click="backTo">增值服务</span></el-breadcrumb-item>
                <el-breadcrumb-item><span @click="backToList">订单列表</span></el-breadcrumb-item>
                <el-breadcrumb-item><span>订单详情</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-row>
                <el-col><span class="pagetitle">订单详情</span></el-col>
                <el-col class="content">
                    <span class="title">订单内容：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">订单详情：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">订单编号：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">客户名称：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">下单时间：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">订单生效日期：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">是否需要发票：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">支付方式：</span>发布职位
                </el-col>
                <el-col class="content">
                    <span class="title">支付状态：</span>发布职位
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    backTo() {
      this.$router.push({
        path: '/CorporationRecruitment/Value-addedService'
      })
    },
    backToList() {
      this.$router.push({
        path: '/CorporationRecruitment/RePayOrderList'
      })
    }
  }
}
</script>
<style>
    .el-table th {
        background: #f8f8f8;
    }
    .el-breadcrumb-item{
        cursor: pointer;
    }
</style>

<style lang="scss" scoped>
    .el-container {
        .el-main {
            padding: 20px;

            .el-row {
                border: 1px solid #f6f6f6;

                .pagetitle {
                    padding: 10px 20px;
                    display: block;
                    background: #f6f6f6;
                    margin-bottom: 21px;
                }

                .title {
                    color: #8a8a8a;
                }

                .content {
                    margin-top: 17px;
                    margin-bottom: 17px;
                    padding-left: 20px;
                    &:last-child{
                     margin-bottom: 40px;
                 }
                }

            }

        }

    }
</style>
