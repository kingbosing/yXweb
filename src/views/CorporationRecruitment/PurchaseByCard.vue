<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
        v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span @click="backTo">增值服务</span></el-breadcrumb-item>
                <el-breadcrumb-item><span>订单列表</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
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
    ToDetail(id) {
      this.$router.push({
        path: '/CorporationRecruitment/RePayOrderDetail'
      })
    }
  }
}
</script>
<style>
    .el-table th {
        background: #f8f8f8;
    }
</style>

<style lang="scss" scoped>
    .el-container {
        .el-main {
            padding: 0;

            .el-table {
                .el-table th {
                    background: #f8f8f8;
                }
            }
        }

    }
</style>
