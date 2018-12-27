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
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="订单内容">
                </el-table-column>
                <el-table-column prop="name" label="金额（元）">
                </el-table-column>
                <el-table-column prop="province" label="数量">
                </el-table-column>
                <el-table-column prop="city" label="状态">
                </el-table-column>
                <el-table-column prop="address" label="支付方式">
                </el-table-column>
                <el-table-column prop="zip" label="订单编号">
                </el-table-column>
                <el-table-column prop="zip" label="下单时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">付款</el-button>
                        <el-button @click="ToDetail(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
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
