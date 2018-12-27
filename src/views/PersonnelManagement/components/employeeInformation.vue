<template>
   <el-container id="employeeInformation" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
     <el-aside width="350px">
                  <el-tree :data="listData" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick" :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }" style="width:100%;line-height:28px;">
                      <span>{{ node.label }}</span>
                    </span>
                  </el-tree>
     </el-aside>
     <el-main>
        <el-container>
          <el-header>
               <el-button v-if="setLeadership" style="margin-right:20px;" @click="openBtn()">设置领导人</el-button>
               <el-popover placement="bottom" width="80" trigger="click" v-model="visible">
                   <el-button type="text" v-on:click="exportBtn(1)">导出员工信息表</el-button>
                   <br>
                   <el-button type="text" v-on:click="exportBtn(2)">导出员工联系表</el-button>
                   <el-button slot="reference">导出</el-button>
               </el-popover>
          </el-header>
          <el-main>
              <el-table :data="EmployeeData" height="100%"  style="width: 100%" stripe v-on:cell-click="rowClick">
                         <el-table-column prop="" label="" width="50">
                             <template slot-scope="scope">
                                 <new-icon class="file_col_icon" v-if="getType(scope.row.Jobs)"  :icon-name="'#icon-lingdaoren-copy'"/>
                             </template>
                         </el-table-column>
                         <el-table-column prop="EmployeeName" label="姓名"></el-table-column>
                         <el-table-column prop="EmpolyeeNO" label="工号">
                              <template slot-scope="scope">
                                {{scope.row.EmpolyeeNO==''?"(空)":scope.row.EmpolyeeNO}}
                             </template>
                         </el-table-column>
                         <el-table-column prop="DepartmentName" label="部门">
                             <template slot-scope="scope">
                                {{scope.row.DepartmentName==''?listData[0].Name:scope.row.DepartmentName}}
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
                         <el-table-column prop="JoinTime" label="入职时间"></el-table-column>
                         <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-button type="" size="small" v-on:click="FunBtn(scope.row.ProfileId)">编辑</el-button>
                            </template>
                         </el-table-column>
              </el-table>
          </el-main>
        </el-container>
     </el-main>
     <!--弹窗-->
         <el-dialog :visible.sync="centerDialogVisible_1" width="40%" center>
                  <el-row class="funLine">
                    <el-col :span="4"><div class="grid-content bg-purple">当前部门：</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light">{{divisionName}}</div></el-col>
                  </el-row>
                  <el-row class="funLine">
                    <el-col :span="4"><div class="grid-content bg-purple">选择领导：</div></el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light" @click="MangeShow=true">
                        <el-input placeholder="选择领导人" suffix-icon="el-icon-arrow-right" v-model="leaderName" readonly></el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4"><div class="grid-content bg-purple">&emsp;&emsp;</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light"><span class="wrongText">{{noLeader}}</span></div></el-col>
                  </el-row>
                  <el-row class="funLine" v-if="isPartTime">
                    <el-col :span="4"><div class="grid-content bg-purple">职&emsp;&emsp;位：</div></el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light">
                        <el-input placeholder="选择职位" v-model="jobName" readonly></el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row class="funLine"  v-if="!isPartTime">
                    <el-col :span="4"><div class="grid-content bg-purple">兼任职位：</div></el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light" @click="selectJopFun">
                        <el-input placeholder="选择领兼任职位" suffix-icon="el-icon-arrow-right" v-model="partTimeName" readonly></el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row  v-if="!isPartTime">
                    <el-col :span="4"><div class="grid-content bg-purple">&emsp;&emsp;</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light"><span class="wrongText">{{noPartTime}}</span></div></el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" style="margin-right:100px" @click="setLeaderFun">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
         </el-dialog>
     <!--宣部门弹窗-->
         <get-depeople :visible.sync="MangeShow" :actlist="MangeAct_List" title="选择领导人" :people="true" :checkbox="false" v-on:act-node="MangeActNode"></get-depeople>
     <!--选职位弹窗-->
         <select-jop  @watchChild="partTimeNameFun" ref="transEvent"></select-jop>
     <!--**********************************************-->
   </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as personnelManagement from '@/api/personnelManagement'
import { globalvariable } from '@/utils/globalvariable'
import getDepeople from '../../../components/dialogDep/src/component'
import selectJop from './selectJop'
export default {
  components: {
    getDepeople,
    selectJop
  },
  data() {
    return {
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      EmployeeData: [], // 员工数据
      selectedData: [], // 选中的数据
      selectedDepId: '', // 选中部门ID
      setLeadership: false, // 是否显示设置领导人
      defaultProps: {
        children: 'Childrens',
        label: 'Name'
      },
      visible: false,
      /** ********选人******** */
      MangeShow: false,
      MangeAct_List: [], // 默认选中id集合
      MangeList: [], // 选中列表
      /** ********设置领导人******** */
      centerDialogVisible_1: false, // 设置领导人弹窗
      divisionName: '', // 部门名称
      leaderName: '', // 选中的领导
      jobName: '', // 职业名称
      partTimeName: '', // 兼职名称
      isPartTime: true, // 判断是否是兼职
      leaderId: '', // 领导人ID
      PartTimeData: [], // 兼职职位数据
      CompanyJobId: '', // 职位id
      noLeader: '', // 无领导人报错
      noPartTime: ''// 无兼职报错
    }
  },
  mounted() {
    // 获取架构数据
    this.initial()
    // 获取部门员工
    this.Employee4PC('', '')
  },
  watch: {

  },
  methods: {
    // 设置部门领导人
    Setleader() {
      const model_A = {
        'profileId': this.leaderId,
        'departmentId': this.selectedDepId,
        'CompanyJobId': this.CompanyJobId
      }
      console.log(model_A)
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.Setleader(getToken(), model_A)
          .then(response => {
            console.log('///')
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '设置成功',
                type: 'success',
                onClose: function() {
                  that.Employee4PC(that.selectedDepId, '')
                  that.centerDialogVisible_1 = false
                }
              })
              resolve()
            } else {
              that.$message({
                message: response.data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 设置领导人提交
    setLeaderFun() {
      console.log(this.PartTimeData)
      if (this.isPartTime) { // 本部门
        if (this.leaderName == '') {
          this.noLeader = '请选择领导人'
        } else {
          this.Setleader()
        }
      } else { // 兼职
        if (this.partTimeName == '') {
          this.noPartTime = '请选择兼任职位'
        } else {
          this.Setleader()
        }
      }
    },
    // 显示兼职职位数据
    partTimeNameFun(data) {
      console.log(data)
      this.PartTimeData = data
      this.partTimeName = data.JobName
      this.CompanyJobId = data.ID
      this.noPartTime = ''
    },
    // 触发选职位弹窗
    selectJopFun() {
      this.$refs.transEvent.dialogFun()
    },
    // 选人弹窗
    MangeActNode(data) {
      console.log(data)
      if (data[0].DeptId == this.selectedDepId) {
        this.isPartTime = true
        // 获取领导详情
        this.GetEmployeeDetail(data[0].ItemId)
      } else {
        this.isPartTime = false
      }
      this.leaderName = data[0].Name
      this.leaderId = data[0].ItemId
      this.noLeader = ''
    },
    // 获取个人信息
    GetEmployeeDetail(id) {
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.GetEmployeeDetail(getToken(), id)
          .then(response => {
            console.log('///')
            console.log(response.data.Data.Jobs)
            if (response.data.successful) {
              const jobArr = response.data.Data.Jobs
              for (var i = 0; i < jobArr.length; i++) {
                if (jobArr[i].DepartmentId == this.selectedDepId) {
                  this.jobName = jobArr[i].JobName
                  this.CompanyJobId = jobArr[i].CompanyJobId
                }
              }
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 点击设置领导人按钮初始化弹窗
    openBtn() {
      this.centerDialogVisible_1 = true
      this.leaderName = ''
      this.leaderId = ''
      this.jobName = ''
      this.partTimeName = ''
      this.CompanyJobId = ''
    },
    // 导出
    exportBtn(typeNum) {
      var Src = ''
      if (typeNum == 1) {
        Src = globalvariable().apiurl + 'api/Employee/exportbasicinfo?Token=' + getToken()
      } else if (typeNum == 2) {
        Src = globalvariable().apiurl + 'api/Employee/exportmaillist?Token=' + getToken()
      }
      window.open(Src)
    },
    // 判断是否为领导
    getType(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].DepartmentId == this.selectedDepId) {
          return data[i].IsJobLeader
        }
      }
    },
    // 获取职业名称
    getJobName(data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].DepartmentId == this.selectedDepId) {
          return data[i].JobName
        }
      }
    },
    // 跳转员工信息详情页
    rowClick: function(row, column, cell, event) {
      // console.log(row, column, cell, event)
      if (column.label != '操作') {
        const id = row.ProfileId
        this.$router.push({ path: '/PersonnelManagement/staffInformationIndex', query: { id: id }})
      }
    },
    // 跳转员工信息编辑页
    FunBtn(id) {
      this.$router.push({ path: '/PersonnelManagement/staffEditor', query: { id: id }})
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
    // 获取点击数据
    handleNodeClick(data) {
      console.log(data)
      console.log(this.listData)
      this.selectedData = data
      this.setLeadership = true
      this.selectedDepId = data.ItemId
      this.Employee4PC(data.ItemId, '')
      this.divisionName = data.Name
    }

  }
}

</script>
<style lang="scss" scoped>
 .temlateMain {
  .el-header {

  }
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-aside{
             border-right:1px solid #dedede;
         }
         .el-header{
            font-weight: normal;
            font-size: 14px;
         }
         .el-main{
             .el-header{
               padding-top:5px;
             }
             .el-main{
               .file_col_icon{
                   font-size: 18px;
               }
             }
         }
    }
  }

}
.wrongText{
  font-size: 12px;
  color:red;
  display: inline-block;
}
</style>
<style lang="scss">
#employeeInformation .el-aside{
    .el-tree-node__content{
        height:36px;
    }
}
#employeeInformation .el-row.funLine{
    height: 48px;
    line-height: 48px;
}
#employeeInformation .el-dialog__wrapper.getPeopleOrDep{
  z-index: 3003!important;
}
#employeeInformation .el-dialog__wrapper{
   z-index: 3002!important;
}
</style>

