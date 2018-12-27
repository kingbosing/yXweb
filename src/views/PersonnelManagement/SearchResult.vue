<template>
    <el-container class="temlateMain">
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">基本员工信息</el-breadcrumb-item>
                <el-breadcrumb-item>查询结果</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class="mainBody" id="SearchResult">
                <el-container>
                  <el-aside width="180px">
                      <div class="imgBox"></div>
                  </el-aside>
                  <el-main>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">姓&emsp;&emsp;名</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">刁俊</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">性&emsp;&emsp;别</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">女</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">出生日期</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">2019-01-12</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">身份证号</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">23333333333333333333</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">籍&emsp;&emsp;贯</div></el-col>
                         <el-col :span="22"><div class="grid-content bg-purple">北京</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">居&#8197;&#8197;住&#8197;&#8197;地</div></el-col>
                         <el-col :span="22"><div class="grid-content bg-purple">南宁奶奶家会计师的挥洒的护身符</div></el-col>
                      </el-row>
                      <p class="tableTitile">社保缴纳信息</p>
                      <el-table :data="tableData" border style="width: 100%" :show-header="false">
                         <el-table-column prop="date" label="" width="180"></el-table-column>
                         <el-table-column prop="name" label=""></el-table-column>
                         <el-table-column prop="address" label=""></el-table-column>
                      </el-table>
                      <p class="tableTitile">公积金缴纳信息</p>
                      <el-table :data="tableData_1" border style="width: 100%" :show-header="false">
                         <el-table-column prop="date" label="" width="180"></el-table-column>
                         <el-table-column prop="name" label=""></el-table-column>
                      </el-table>
                  </el-main>
                </el-container>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as personnelManagement from '@/api/personnelManagement'
export default {
  components: {

  },
  data() {
    return {
      tableData: [{
        date: '',
        name: '缴费基数',
        address: '个人交税金额'
      }, {
        date: '养老保险',
        name: '2819.20',
        address: '225.00'
      }, {
        date: '失业保险',
        name: '2819.20',
        address: '225.00'
      }, {
        date: '生育保险',
        name: '2819.20',
        address: '225.00'
      }, {
        date: '医疗保险',
        name: '2819.20',
        address: '225.00'
      }, {
        date: '工伤保险',
        name: '2819.20',
        address: '225.00'
      }],
      tableData_1: [{
        date: '公积金缴存地',
        name: '杭州住房公积金管理中心'
      }, {
        date: '个人月缴存',
        name: '225.00'
      }, {
        date: '单位月缴存',
        name: '819.20'
      }]
    }
  },
  mounted() {

  },
  watch: {

  },
  methods: {

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
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            font-weight: normal;
            font-size: 16px;
            span{
             margin-right: 10px;
             cursor: pointer;
            }
            .active{
                color:#f99740
            }
         }
         .el-main{
         }

    }
  }

}
 .mainBody{
                width:1040px;
                margin: 0 auto;

            }
            .mainBody .el-aside{
                padding-top: 40px;
            }
            .imgBox{
                width:90px;
                height:90px;
                border-radius: 50%;
                background: url("/images/personalCard-touxiang.png") no-repeat;
                margin: 0 auto;
            }
             .mainBody .el-main{
                padding-top: 40px;
            }
           .mainBody .el-main .el-row{

              height: 48px;
              line-height: 48px;
            }
            .mainBody .el-main .el-row .el-col-2{
               color:#8a8a8a;
            }
            .tableTitile{
                text-align: center;
    margin-bottom: 20px;
            }
</style>
<style>
#SearchResult .el-table .cell{
    text-align: center;
}
#SearchResult .el-table_1_column_1  {
    background-color: #f7f7f7;
}
#SearchResult .el-table_2_column_4   {
    background-color: #f7f7f7;
}
</style>

