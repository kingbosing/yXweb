<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">基本员工信息</el-breadcrumb-item>
                <el-breadcrumb-item>员工信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class="mainBody" id="SearchResult">
                <el-container>
                  <el-aside width="180px">
                      <div class="imgBox">
                          <img class="imgBox" v-bind:src="faceUrl(listData.EmployeeFaceUrl,90)">
                      </div>
                      <p style="color:#8a8a8a;text-align: center;">小赢号：{{listData.xiaoYingHao}}</p>
                  </el-aside>
                  <el-main>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">姓&emsp;&emsp;名</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{listData.Name}}</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">性&emsp;&emsp;别</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{listData.Gender==1?'男':'女'}}</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">身份证号</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{!listData.LicenseNumber?'(空)':listData.LicenseNumber}}</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">出生日期</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{!listData.Birthday?'(空)':listData.Birthday}}</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">工&emsp;&emsp;号</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{!listData.EmployeeNo?'(空)':listData.EmployeeNo}}</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">手机号码</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{!listData.Mobile?'(空)':listData.Mobile}}</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">部&emsp;&emsp;门</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{listData.DepartmentId==''?CompanyName:listData.DepartmentId}}</div></el-col>
                         <el-col :span="2"><div class="grid-content bg-purple">职&emsp;&emsp;位</div></el-col>
                         <el-col :span="10"><div class="grid-content bg-purple">{{getJobName(listData.Jobs)}}</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">兼职部门</div></el-col>
                         <el-col :span="22"><div class="grid-content bg-purple">{{partTime(listData.Jobs)}}</div></el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">联系地址</div></el-col>
                         <el-col :span="22"><div class="grid-content bg-purple">{{!listData.Address?'(空)':listData.Address}}</div></el-col>
                      </el-row>
                      <el-row v-if="imgType()">
                         <el-col :span="2"><div class="grid-content bg-purple">身份证件</div></el-col>
                         <el-col :span="22">
                             <div class="grid-content bg-purple">
                                 <img v-if="listData.LicenseCarBackUrl" class="LicenseCar" v-bind:src="faceUrl(listData.LicenseCarBackUrl,120)">
                                 <img v-if="listData.LicenseCarFrontUrl" class="LicenseCar" v-bind:src="faceUrl(listData.LicenseCarFrontUrl,120)">
                             </div>
                         </el-col>
                      </el-row>
                      <el-row>
                         <el-col :span="2"><div class="grid-content bg-purple">备&emsp;&emsp;注</div></el-col>
                         <el-col :span="22"><div class="grid-content bg-purple">{{!listData.Memo?'(空)':listData.Memo}}</div></el-col>
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
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'
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
      }],
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      CompanyName: ''// 公司名称
    }
  },
  mounted() {
    this.initial()
    this.GetEmployeeDetail(this.$route.query.id)
  },
  watch: {

  },
  methods: {
    // 判断是否显示身份证照片
    imgType() {
      if (this.listData.LicenseCarBackUrl == '' && this.listData.LicenseCarFrontUrl == '' || this.listData.LicenseCarBackUrl == null && this.listData.LicenseCarFrontUrl == null) {
        return false
      } else {
        return true
      }
    },
    // 兼职
    partTime(data) {
      var str = ''
      for (var i = 0; i < data.length; i++) {
        if (!data[i].IsMastJob) {
          if (data[i].DepartmentName == '') {
            str += this.CompanyName
          } else {
            str += data[i].DepartmentName
          }
        }
      }
      if (str == '') {
        return '(空)'
      } else {
        return str
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
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    },
    // 获取个人信息
    GetEmployeeDetail(id) {
      const that = this
      that.listData = []
      return new Promise((resolve, reject) => {
        personnelManagement.GetEmployeeDetail(getToken(), id)
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.successful) {
              that.listData = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取架构数据
    initial() {
      // console.log('121212')
      this.fullscreenLoading = true
      setTimeout(() => {
        if (this.$store.state.user.departmentData.length == 0) {
          this.initial()
        } else {
          this.CompanyName = JSON.parse(this.$store.state.user.departmentData)[0].Name
          console.log(this.CompanyName)
          this.fullscreenLoading = false
        }
      }, 1000)
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
            .LicenseCar{
                width: 120px;
                height: 120px;
                margin-right: 20px;
            }
</style>
<style>
#SearchResult .el-table{
    margin-bottom: 20px;
}
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

