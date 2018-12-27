<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">基本员工信息</el-breadcrumb-item>
                <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <div class="tools_search">
                <el-input placeholder="姓名/部门/员工" suffix-icon="el-icon-search" v-model="input" @keyup.enter.native="searchFor"></el-input>
              </div>
            </div>
        </el-header>
        <el-main>
             <el-table :data="EmployeeData" height="100%"  style="width: 100%" stripe v-on:cell-click="rowClick">
                         <el-table-column prop="" label="" width="50">
                             <template slot-scope="scope">
                                 <new-icon class="file_col_icon" v-if="getType(scope.row.Jobs)" :icon-name="'#icon-lingdaoren-copy'"/>
                             </template>
                         </el-table-column>
                         <el-table-column prop="EmployeeName" label="姓名"></el-table-column>
                         <el-table-column prop="DepartmentName" label="部门">
                             <template slot-scope="scope">
                                  {{getDepName(scope.row.Jobs)}}
                             </template>
                         </el-table-column>
                         <el-table-column prop="" label="职位">
                              <template slot-scope="scope">
                                  {{getJobName(scope.row.Jobs)}}
                             </template>
                         </el-table-column>
                         <el-table-column prop="Mobile" label="电话">
                             <template slot-scope="scope">
                                {{scope.row.Mobile==''?"(空)":scope.row.Mobile}}
                             </template>
                         </el-table-column>
              </el-table>
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
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      EmployeeData: [], // 员工数据
      funId: '', // 操作ID
      input: ''
    }
  },
  mounted() {
    this.initial()
    this.input = decodeURIComponent(this.$route.query.searchValue)
    this.Employee4PC('ALL', this.input)
  },
  watch: {

  },
  methods: {
    // 判断是否为领导
    getType(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].IsMastJob) {
          return data[i].IsJobLeader
        }
      }
    },
    // 获取部门名称
    getDepName(data) {
      // console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].IsMastJob) {
          if (data[i].DepartmentName == '') {
            return this.listData[0].Name
          } else {
            return data[i].DepartmentName
          }
        }
      }
    },
    // 获取职业名称
    getJobName(data) {
      // console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].IsMastJob) {
          return data[i].JobName
        }
      }
    },
    // 基本员工信息搜索
    searchFor() {
      // console.log(this.input)
      if (this.input) {
        this.Employee4PC('ALL', this.input)
      }
    },
    // 获取架构数据
    initial() {
      console.log('121212')
      this.fullscreenLoading = true
      setTimeout(() => {
        if (this.$store.state.user.departmentData.length == 0) {
          this.initial()
        } else {
          this.listData = JSON.parse(this.$store.state.user.departmentData)
          this.fullscreenLoading = false
        }
      }, 1000)
    },
    // 跳转员工信息编辑页
    rowClick: function(row, column, cell, event) {
      // console.log(row, column, cell, event)
      if (column.label != '操作') {
        const id = row.ProfileId
        this.$router.push({ path: '/PersonnelManagement/staffEditor', query: { id: id }})
      }
    },
    // 获取部门员工
    Employee4PC(departmentId, key) {
      const that = this
      that.EmployeeData = []
      return new Promise((resolve, reject) => {
        personnelManagement.Employee4PC(getToken(), departmentId, key)
          .then(response => {
            console.log('///')
            console.log(response.data.Data)
            if (response.data.successful) {
              that.EmployeeData = response.data.Data
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

    }
  }

}
 .file_col_icon{
                   font-size: 18px;
               }
</style>

