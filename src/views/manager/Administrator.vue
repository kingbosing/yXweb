<template>
    <el-container id="administrator" class="temlateMain">
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>管理员权限</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-container>
          <el-aside width="420px">
              <el-container>
                 <el-header height='50px'>
                     管理员
                     <div class="header-right">
                       <el-button type="" size="medium" @click="dialogVisible=true">添加管理员</el-button>
                     </div>
                 </el-header>
                 <el-main>
                      <ul id="member">
                          <li v-for="(k,v) in actNodeA" :key="v" v-on:click="GetLine(k.EmployeeID,k.ProfileId,k.RoleType)" :class="{'active' : k.EmployeeID==activeLineS}">
                              <img class="img-circle" :src="getLogoFormatUrl(k.FaceURL)"><span>{{k.EmployeeName}}</span>
                              <i class="el-icon-circle-close-outline" v-if="v!=0" v-on:click="removeStaff(k.EmployeeID)"></i>
                          </li>
                       </ul>
                 </el-main>
              </el-container>
          </el-aside>
          <el-main>
              <el-container>
                 <el-header height='50px'>
                     已选功能模块，超级管理员权限不可编辑
                     <div class="header-right">
                       <el-button type="warning" size="medium" v-if="isCreator!=128" v-on:click="saveBtn">保 存</el-button>
                     </div>
                 </el-header>
                 <el-main>
                      <template v-if="IndexArr!=[]">
                         <div id="Fmodule">
                                <ul>
                                    <li :class="{ active: IndexArr[0].Enable,framework:true }" v-on:click="LiChoose(0)"><div class="operationLi"></div><span>组织架构管理</span></li>
                                    <li :class="{ active: IndexArr[1].Enable,approval:true }" v-on:click="LiChoose(1)"><div class="operationLi"></div><span>审批管理</span></li>
                                    <li :class="{ active: IndexArr[2].Enable,inform:true }" v-on:click="LiChoose(2)"><div class="operationLi"></div><span>企业信息管理</span></li>
                                    <li :class="{ active: IndexArr[3].Enable,personnelIco:true }" v-on:click="personnelUnder()"><div></div><span>人事管理(<b>{{numS_1}}</b>/3)</span></li>
                                    <li :class="{ active: IndexArr[4].Enable,Customer:true }" v-on:click="LiChoose(4)"><div class="operationLi"></div><span>客户管理</span></li>
                                </ul>
                                <div class="personnel-part" v-if="underBox_1">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[15].Enable,staff:true }" v-on:click="personnelLi(15)"><div class="operationLi"></div><span>员工基本信息</span></li>
                                        <li :class="{ active: IndexArr[16].Enable,NewColleagues:true }" v-on:click="personnelLi(16)"><div class="operationLi"></div><span>入职申请</span></li>
                                        <li :class="{ active: IndexArr[17].Enable,position:true }" v-on:click="personnelLi(17)"><div class="operationLi"></div><span>职位管理</span></li>
                                    </ul>
                                </div>
                                <ul>
                                    <li :class="{ active: IndexArr[5].Enable,finance:true }" v-on:click="financeUnder()"><div class="operationLi"></div><span>财务管理(<b>{{numS_2}}</b>/3)</span></li>
                                    <li :class="{ active: IndexArr[6].Enable,storageIco:true }" v-on:click="storageUnder()"><div class="operationLi"></div><span>仓储管理(<b>{{numS_3}}</b>/3)</span></li>
                                    <li :class="{ active: IndexArr[7].Enable,contract:true }" v-on:click="LiChoose(7)"><div class="operationLi"></div><span>合同管理</span></li>
                                    <li :class="{ active: IndexArr[8].Enable,meetingIco:true }" v-on:click="meetingUnder()"><div class="operationLi"></div><span>会议管理(<b>{{numS_4}}</b>/2)</span></li>
                                    <li :class="{ active: IndexArr[9].Enable,project:true }" v-on:click="LiChoose(9)"><div class="operationLi"></div><span>项目管理</span></li>
                                </ul>
                                <div class="financial-part" v-if="underBox_2">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[18].Enable,financial_tally:true }" v-on:click="financeLi(18)"><div class="operationLi"></div><span>财务记账</span></li>
                                        <li :class="{ active: IndexArr[19].Enable,financial_audit:true }" v-on:click="financeLi(19)"><div class="operationLi"></div><span>财务审核</span></li>
                                        <li :class="{ active: IndexArr[20].Enable,financial_set:true }" v-on:click="financeLi(20)"><div class="operationLi"></div><span>财务设置</span></li>
                                    </ul>
                                </div>
                                <div class="storage-part" v-if="underBox_3">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[21].Enable,storage_goods:true }" v-on:click="storageLi(21)"><div class="operationLi"></div><span>货品管理</span></li>
                                        <li :class="{ active: IndexArr[22].Enable,storage_storeroom:true }" v-on:click="storageLi(22)"><div class="operationLi"></div><span>仓库管理</span></li>
                                        <li :class="{ active: IndexArr[23].Enable,storage_set:true }" v-on:click="storageLi(23)"><div class="operationLi"></div><span>参数设置</span></li>
                                    </ul>
                                </div>
                                <div class="meeting-part" v-if="underBox_4">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[24].Enable,meetingManage:true }" v-on:click="meetingLi(24)"><div class="operationLi"></div><span>会议管理</span></li>
                                        <li :class="{ active: IndexArr[25].Enable,meetingRoomManage:true }" v-on:click="meetingLi(25)"><div class="operationLi"></div><span>会议室管理</span></li>
                                    </ul>
                                </div>
                                <ul>
                                    <li :class="{ active: IndexArr[10].Enable,Recruitment:true }" v-on:click="LiChoose(10)"><div class="operationLi"></div><span>招聘</span></li>
                                    <li :class="{ active: IndexArr[11].Enable,document:true }" v-on:click="LiChoose(11)"><div class="operationLi"></div><span>企业文档</span></li>
                                    <li :class="{ active: IndexArr[12].Enable,notice:true }" v-on:click="LiChoose(12)"><div class="operationLi"></div><span>公告</span></li>
                                    <li :class="{ active: IndexArr[13].Enable,Performance:true }" v-on:click="LiChoose(13)"><div class="operationLi"></div><span>绩效考核</span></li>
                                    <li :class="{ active: IndexArr[14].Enable,Task:true }" v-on:click="LiChoose(14)"><div class="operationLi"></div><span>任务</span></li>
                                </ul>
                                <ul>
                                    <li :class="{ active: IndexArr[26].Enable,attendanceManagement:true }" v-on:click="attendanceManagement()"><div class="operationLi"></div><span>考勤管理(<b>{{numS_5}}</b>/2)</span></li>
                                    <li :class="{ active: IndexArr[27].Enable,attendanceStatistics:true }" v-on:click="attendanceStatistics()"><div class="operationLi"></div><span>考勤统计(<b>{{numS_6}}</b>/3)</span></li>
                                </ul>
                                <div class="attendanceM-part" v-if="underBox_5">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[28].Enable,numberOfFlights:true }" v-on:click="attendanceMLi(28)"><div class="operationLi"></div><span>班次管理</span></li>
                                        <li :class="{ active: IndexArr[29].Enable,schedule:true }" v-on:click="attendanceMLi(29)"><div class="operationLi"></div><span>排班管理</span></li>
                                    </ul>
                                </div>
                                <div class="attendanceS-part" v-if="underBox_6">
                                    <i class="arrow-up">
                                        <!--向上的三角-->
                                    </i>
                                    <ul>
                                        <li :class="{ active: IndexArr[30].Enable,punch:true }" v-on:click="attendanceSLi(30)"><div class="operationLi"></div><span>打卡明细</span></li>
                                        <li :class="{ active: IndexArr[31].Enable,collect:true }" v-on:click="attendanceSLi(31)"><div class="operationLi"></div><span>月度汇总</span></li>
                                        <li :class="{ active: IndexArr[32].Enable,correct:true }" v-on:click="attendanceSLi(32)"><div class="operationLi"></div><span>考勤矫正</span></li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                 </el-main>
              </el-container>
          </el-main>
        </el-container>
         <dep-choise  :visible.sync="dialogVisible" :actlist="TactList" title="选择参会人"  :people="true" :checkbox="false"  v-on:act-node="actNode"></dep-choise>
    </el-container>
</template>

<script>
import { globalvariable } from '@/utils/globalvariable'
import * as manager from '@/api/manager'
import { getToken } from '@/utils/auth'
import depChoise from '../../components/dialogDep/src/component'
import urlUtil from '@/utils/urlUtil'
export default {
  components: {
    depChoise
  },
  data() {
    return {
      dialogVisible: false,
      TactList: [], // 选中id数组
      actNodeA: [], // 选中人的基本信息
      activeLineS: '', // 左侧class判断
      isCreator: '', // 判断是否为创建者
      // 权限小弹窗
      underBox_1: false,
      underBox_2: false,
      underBox_3: false,
      underBox_4: false,
      underBox_5: false,
      underBox_6: false,
      // 页面数组
      IndexArr: [
        {
          'Name': '组织架构管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '审批管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '企业信息管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '人事管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '客户管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '财务管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '仓储管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '合同管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '会议管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '项目管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '招聘',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '企业文档',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '公告',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '绩效考核',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '任务',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '员工基本信息',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '入职申请',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '职位管理',
          'ID': '',
          'Enable': true
        }, {
          'Name': '财务记账',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '财务审核',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '财务设置', // 1221
          'ID': '',
          'Enable': true
        },
        {
          'Name': '货品管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '仓库管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '参数设置',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '会议管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '会议室管理',
          'ID': '',
          'Enable': true
        }, // 考勤
        {
          'Name': '考勤管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '考勤统计',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '班次管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '排班管理',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '打卡明细',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '月度汇总',
          'ID': '',
          'Enable': true
        },
        {
          'Name': '考勤矫正',
          'ID': '',
          'Enable': true
        }
      ],
      // 子级个数
      numS_1: 3,
      numS_2: 3,
      numS_3: 3,
      numS_4: 2,
      numS_5: 2,
      numS_6: 3,
      ProfileIdMain: ''// 设置人

    }
  },
  mounted() {
    this.getManager()
  },
  methods: {
    actNode(data) { // 添加管理员
      console.log(data)
      var addId = [data[0].EmployeeId]
      console.log(addId)
      const that = this
      return new Promise((resolve, reject) => {
        manager.Addmanager(getToken(), addId)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '添加成功',
                type: 'success',
                onClose: function() {
                  that.getManager()
                }
              })
              resolve()
            } else {
              that.$message({
                message: '添加失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取管理员信息
    getManager() {
      const that = this
      return new Promise((resolve, reject) => {
        manager.Getmanager(getToken())
          .then(response => {
            console.log(response.data.Data)
            if (response.data.successful) {
              that.actNodeA = response.data.Data
              that.GetLine(that.actNodeA[0].EmployeeID, that.actNodeA[0].ProfileId, that.actNodeA[0].RoleType)
              console.log(that.actNodeA)
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 头像图片
    getLogoFormatUrl(src) {
      if (src) {
        return urlUtil.formatPicUrl(
          src,
          32,
          32
        )
      } else {
        return ''
      }
    },
    // 获得权限
    GetLine(id, ids, roleType) {
      console.log(id, ids, roleType)
      this.activeLineS = id
      this.ProfileIdMain = ids
      const that = this
      return new Promise((resolve, reject) => {
        manager.Getmanagermodule(getToken(), ids)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              /** ************** */
              that.isCreator = roleType
              var ArrData = response.data.Data
              // that.IndexArr = []
              if (roleType == 128) { // 创建者
                that.IndexArr = [
                  {
                    'Name': '组织架构管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '审批管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '企业信息管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '人事管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '客户管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '财务管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '仓储管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '合同管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '会议管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '项目管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '招聘',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '企业文档',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '公告',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '绩效考核',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '任务',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '员工基本信息',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '入职申请',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '职位管理',
                    'ID': '',
                    'Enable': true
                  }, {
                    'Name': '财务记账',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '财务审核',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '财务设置', // 1221
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '货品管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '仓库管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '参数设置',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '会议管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '会议室管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '考勤管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '考勤统计',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '班次管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '排班管理',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '打卡明细',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '月度汇总',
                    'ID': '',
                    'Enable': true
                  },
                  {
                    'Name': '考勤矫正',
                    'ID': '',
                    'Enable': true
                  }
                ]
                that.numS_1 = 3
                that.numS_2 = 3
                that.numS_3 = 3
                that.numS_4 = 2
              } else {
                var numD_1 = 0, numD_2 = 0, numD_3 = 0, numD_4 = 0, numD_5 = 0, numD_6 = 0
                for (var i = 0; i < ArrData.length; i++) {
                  if (ArrData[i].Name == '组织架构管理') {
                    that.IndexArr[0].ID = ArrData[i].ID
                    that.IndexArr[0].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '审批类型管理') {
                    that.IndexArr[1].ID = ArrData[i].ID
                    that.IndexArr[1].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '企业信息管理') {
                    that.IndexArr[2].ID = ArrData[i].ID
                    that.IndexArr[2].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '人事管理') {
                    that.IndexArr[3].ID = ArrData[i].ID
                    that.IndexArr[3].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '客户管理') {
                    that.IndexArr[4].ID = ArrData[i].ID
                    that.IndexArr[4].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '财务管理') {
                    that.IndexArr[5].ID = ArrData[i].ID
                    that.IndexArr[5].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '仓储管理') {
                    that.IndexArr[6].ID = ArrData[i].ID
                    that.IndexArr[6].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '合同管理') {
                    that.IndexArr[7].ID = ArrData[i].ID
                    that.IndexArr[7].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '会议管理' && ArrData[i].ParentId == '') {
                    that.IndexArr[8].ID = ArrData[i].ID
                    that.IndexArr[8].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '项目管理') {
                    that.IndexArr[9].ID = ArrData[i].ID
                    that.IndexArr[9].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '招聘') {
                    that.IndexArr[10].ID = ArrData[i].ID
                    that.IndexArr[10].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '企业文档') {
                    that.IndexArr[11].ID = ArrData[i].ID
                    that.IndexArr[11].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '公告管理') {
                    that.IndexArr[12].ID = ArrData[i].ID
                    that.IndexArr[12].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '绩效考核') {
                    that.IndexArr[13].ID = ArrData[i].ID
                    that.IndexArr[13].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '任务') {
                    that.IndexArr[14].ID = ArrData[i].ID
                    that.IndexArr[14].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '员工基本信息管理') {
                    that.IndexArr[15].ID = ArrData[i].ID
                    that.IndexArr[15].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '新同事') {
                    that.IndexArr[16].ID = ArrData[i].ID
                    that.IndexArr[16].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '职位管理') {
                    that.IndexArr[17].ID = ArrData[i].ID
                    that.IndexArr[17].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '财务记账') {
                    that.IndexArr[18].ID = ArrData[i].ID
                    that.IndexArr[18].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '财务审核') {
                    that.IndexArr[19].ID = ArrData[i].ID
                    that.IndexArr[19].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '财务设置') {
                    that.IndexArr[20].ID = ArrData[i].ID
                    that.IndexArr[20].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '货品管理') {
                    that.IndexArr[21].ID = ArrData[i].ID
                    that.IndexArr[21].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '仓库管理') {
                    that.IndexArr[22].ID = ArrData[i].ID
                    that.IndexArr[22].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '参数设置') {
                    that.IndexArr[23].ID = ArrData[i].ID
                    that.IndexArr[23].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '会议管理' && ArrData[i].ParentId != '') {
                    that.IndexArr[24].ID = ArrData[i].ID
                    that.IndexArr[24].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '会议室信息管理' && ArrData[i].ParentId != '') {
                    that.IndexArr[25].ID = ArrData[i].ID
                    that.IndexArr[25].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '考勤管理') {
                    that.IndexArr[26].ID = ArrData[i].ID
                    that.IndexArr[26].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '考勤统计') {
                    that.IndexArr[27].ID = ArrData[i].ID
                    that.IndexArr[27].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '班次管理') {
                    that.IndexArr[28].ID = ArrData[i].ID
                    that.IndexArr[28].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '排班管理') {
                    that.IndexArr[29].ID = ArrData[i].ID
                    that.IndexArr[29].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '打卡明细') {
                    that.IndexArr[30].ID = ArrData[i].ID
                    that.IndexArr[30].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '月度汇总') {
                    that.IndexArr[31].ID = ArrData[i].ID
                    that.IndexArr[31].Enable = ArrData[i].Enable
                  } else if (ArrData[i].Name == '考勤矫正') {
                    that.IndexArr[32].ID = ArrData[i].ID
                    that.IndexArr[32].Enable = ArrData[i].Enable
                  }
                  // 人事个数
                  if ((ArrData[i].Name == '员工基本信息管理') || (ArrData[i].Name == '新同事') || (ArrData[i].Name == '职位管理')) {
                    if (ArrData[i].Enable) {
                      numD_1 = numD_1 + 1
                    }
                  }
                  // 财务个数
                  if ((ArrData[i].Name == '财务记账') || (ArrData[i].Name == '财务审核') || (ArrData[i].Name == '财务设置')) {
                    if (ArrData[i].Enable) {
                      numD_2 = numD_2 + 1
                    }
                  }
                  // 仓储个数
                  if ((ArrData[i].Name == '货品管理') || (ArrData[i].Name == '仓库管理') || (ArrData[i].Name == '参数设置')) {
                    if (ArrData[i].Enable) {
                      numD_3 = numD_3 + 1
                    }
                  }
                  // 会议个数
                  if ((ArrData[i].Name == '会议管理' && ArrData[i].ParentId != '') || (ArrData[i].Name == '会议室信息管理' && ArrData[i].ParentId != '')) {
                    if (ArrData[i].Enable) {
                      numD_4 = numD_4 + 1
                    }
                  }
                  // 考勤管理
                  if ((ArrData[i].Name == '班次管理') || (ArrData[i].Name == '排班管理')) {
                    if (ArrData[i].Enable) {
                      numD_5 = numD_5 + 1
                    }
                  }
                  // 考勤统计
                  if ((ArrData[i].Name == '打卡明细') || (ArrData[i].Name == '月度汇总') || (ArrData[i].Name == '考勤矫正')) {
                    if (ArrData[i].Enable) {
                      numD_6 = numD_6 + 1
                    }
                  }
                }

                that.numS_1 = numD_1
                that.numS_2 = numD_2
                that.numS_3 = numD_3
                that.numS_4 = numD_4
                that.numS_5 = numD_5
                that.numS_6 = numD_6
              }
              console.log(that.IndexArr)
              /** ************** */
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 删除管理员
    removeStaff(id) {
      console.log(id)
      this.activeLineS = id
      var removeId = [id]
      console.log(removeId)
      const that = this
      return new Promise((resolve, reject) => {
        manager.Delmanager(getToken(), removeId)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.getManager()
                }
              })
              resolve()
            } else {
              that.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 保存权限
    saveBtn() {
      var saveArr = []
      for (var k = 0; k < this.IndexArr.length; k++) {
        if (this.IndexArr[k].Enable && this.IndexArr[k].ID != '') {
          saveArr.push(this.IndexArr[k].ID)
        }
      }
      var ProfileIdMain = this.ProfileIdMain
      console.log(saveArr)
      const that = this
      return new Promise((resolve, reject) => {
        manager.Setmanagerfunc(getToken(), ProfileIdMain, saveArr)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                }
              })
              resolve()
            } else {
              that.$message({
                message: '保存失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 父级点击添加权限
    LiChoose(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
        } else {
          this.IndexArr[v].Enable = true
        }
      }
    },
    // 人事子级添加
    personnelLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_1 = this.numS_1 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_1 = this.numS_1 + 1
        }
        if (this.numS_1 == 0) {
          this.IndexArr[3].Enable = false
        } else {
          this.IndexArr[3].Enable = true
        }
      }
    },
    // 财务子级添加
    financeLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_2 = this.numS_2 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_2 = this.numS_2 + 1
        }
        if (this.numS_2 == 0) {
          this.IndexArr[5].Enable = false
        } else {
          this.IndexArr[5].Enable = true
        }
      }
    },
    // 仓储子级添加
    storageLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_3 = this.numS_3 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_3 = this.numS_3 + 1
        }
        if (this.numS_3 == 0) {
          this.IndexArr[6].Enable = false
        } else {
          this.IndexArr[6].Enable = true
        }
      }
    },
    // 会议子级添加
    meetingLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_4 = this.numS_4 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_4 = this.numS_4 + 1
        }
        if (this.numS_4 == 0) {
          this.IndexArr[8].Enable = false
        } else {
          this.IndexArr[8].Enable = true
        }
      }
    },
    // 考勤管理子级添加
    attendanceMLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_5 = this.numS_5 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_5 = this.numS_5 + 1
        }
        if (this.numS_5 == 0) {
          this.IndexArr[26].Enable = false
        } else {
          this.IndexArr[26].Enable = true
        }
      }
    },
    // 考勤统计子级添加
    attendanceSLi(v) {
      if (this.isCreator != 128) {
        if (this.IndexArr[v].Enable) {
          this.IndexArr[v].Enable = false
          this.numS_6 = this.numS_6 - 1
        } else {
          this.IndexArr[v].Enable = true
          this.numS_6 = this.numS_6 + 1
        }
        if (this.numS_6 == 0) {
          this.IndexArr[27].Enable = false
        } else {
          this.IndexArr[27].Enable = true
        }
      }
    },
    // 显示下拉框
    personnelUnder() {
      if (this.underBox_1) {
        this.underBox_1 = false
      } else {
        this.underBox_1 = true
      }
      this.underBox_2 = false
      this.underBox_3 = false
      this.underBox_4 = false
      this.underBox_5 = false
      this.underBox_6 = false
    },
    financeUnder() {
      if (this.underBox_2) {
        this.underBox_2 = false
      } else {
        this.underBox_2 = true
      }
      this.underBox_1 = false
      this.underBox_3 = false
      this.underBox_4 = false
      this.underBox_5 = false
      this.underBox_6 = false
    },
    storageUnder() {
      if (this.underBox_3) {
        this.underBox_3 = false
      } else {
        this.underBox_3 = true
      }
      this.underBox_1 = false
      this.underBox_2 = false
      this.underBox_4 = false
      this.underBox_5 = false
      this.underBox_6 = false
    },
    meetingUnder() {
      if (this.underBox_4) {
        this.underBox_4 = false
      } else {
        this.underBox_4 = true
      }
      this.underBox_1 = false
      this.underBox_2 = false
      this.underBox_3 = false
      this.underBox_5 = false
      this.underBox_6 = false
    },
    attendanceManagement() { // 考勤管理
      if (this.underBox_5) {
        this.underBox_5 = false
      } else {
        this.underBox_5 = true
      }
      this.underBox_1 = false
      this.underBox_2 = false
      this.underBox_3 = false
      this.underBox_4 = false
      this.underBox_6 = false
    },
    attendanceStatistics() { // 考勤统计
      if (this.underBox_6) {
        this.underBox_6 = false
      } else {
        this.underBox_6 = true
      }
      this.underBox_1 = false
      this.underBox_2 = false
      this.underBox_3 = false
      this.underBox_4 = false
      this.underBox_5 = false
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
  .el-container{
      height: 100%;
      margin: 0;
      padding: 0;
       .el-header{
          background-color: #F8F8F8;
          border-bottom: none;
          font-weight: normal;
          line-height: 50px;
          font-size: 14px;
      }
   .el-aside{
      border-right: 1px solid #dedede;
      #member {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          height: 48px;
          line-height: 48px;
          padding: 0 20px;
          cursor: pointer;
          .img-circle{
              border-radius: 50%;
              margin:10px 20px 0 0;
              float: left;
          }
          span{
          display: inline-block;
            float: left;
          }
          i{
              float: right;
              font-size: 18px;
              margin-top: 15px;
              color:#8a8a8a;
          }
        }
        li:hover{
            background-color: #fef4ec;
            color:#f99740;
            i{
                color:#f99740;
            }
        }
        li.active{
          background-color: #fef4ec;
            color:#f99740;
            i{
                color:#f99740;
            }
        }
       }
      }
      .el-main{
          padding: 0;
      }
  }

}
#administrator{
  #Fmodule {
    height: 549px;
    width: 100%;
}

     #Fmodule ul {
       list-style: none;
        padding-left: 26px;
        height: 160px;
        margin-bottom: 0;
        padding-top: 20px;
    }

  #Fmodule li {
        float: left;
        width: 20%;
        text-align: center;
        /*margin-right: 0px;*/
        padding-top: 10px;
        cursor: pointer;
    }

  #Fmodule li.active span {
            color: #323232;
        }

   #Fmodule span {
        font-size: 12px;
        color: #ababab;
        margin-left: 0;
    }

  #Fmodule li div {
        width: 49px;
        height: 49px;
        margin: 0 auto;
        margin-bottom: 20px;
    }

  #Fmodule span b {
        font-weight: normal;
    }

 .personnelIco div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -174px;
}
.personnelIco.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -174px;
    span{
      color:#323232;
    }
}
 .Customer div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -232px;
}
.Customer.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -232px;
    span{
       color:#323232;
    }
}

.notice div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -986px;
}
.notice.active div {
   background: url("/images/Administrator_icon.png") no-repeat 0 -986px;
    span{
       color:#323232;
    }
}

 .finance div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -464px;
}
.finance.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -464px;
    span{
       color:#323232;
    }
}

 .approval div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -58px;
}
.approval.active div {
 background: url("/images/Administrator_icon.png") no-repeat 0 -58px;
    span{
       color:#323232;
    }
}

 .administrative div {
    background: url("/images/administrative.png") no-repeat -58px 0;
}
.administrative.active div {
 background: url("/images/administrative.png") no-repeat 0 0;
    span{
       color:#323232;
    }
}

 .framework div {
    background: url("/images/Administrator_icon.png") no-repeat -58px 0;
}
.framework.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 0;
    span{
       color:#323232;
    }
}

.Recruitment div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -870px;
}
.Recruitment.active div {
   background: url("/images/Administrator_icon.png") no-repeat 0 -870px;
    span{
       color:#323232;
    }
}

.inform div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -116px;
}
.inform.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -116px;
    span{
       color:#323232;
    }
}

 .project div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -696px;
}
.project.active div {
     background: url("/images/Administrator_icon.png") no-repeat 0 -696px;
    span{
       color:#323232;
    }
}

.contract div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -580px;
}
.contract.active div {
     background: url("/images/Administrator_icon.png") no-repeat 0 -580px;
    span{
       color:#323232;
    }
}

.document div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -928px;
}
.document.active div {
     background: url("/images/Administrator_icon.png") no-repeat 0 -928px;
    span{
       color:#323232;
    }
}

.meetingIco div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -638px;
}
.meetingIco.active div {
      background: url("/images/Administrator_icon.png") no-repeat 0 -638px;
    span{
       color:#323232;
    }
}

.meetingManage div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -754px;
}
.meetingManage.active div {
       background: url("/images/Administrator_icon.png") no-repeat 0 -754px;
    span{
       color:#323232;
    }
}

.meetingRoomManage div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -812px;
}
.meetingRoomManage.active div {
        background: url("/images/Administrator_icon.png") no-repeat 0 -812px;
    span{
       color:#323232;
    }
}

 .storageIco div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -522px;
}
.storageIco.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -522px;
    span{
       color:#323232;
    }
}

 .Performance div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -1218px;
}
.Performance.active div {
   background: url("/images/Administrator_icon.png") no-repeat 0 -1218px;
    span{
       color:#323232;
    }
}

 .Task div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -1276px;
}
.Task.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1276px;
    span{
       color:#323232;
    }
}
.attendanceManagement div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1334px;
}
.attendanceManagement.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1334px;
    span{
       color:#323232;
    }
}
.attendanceStatistics div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1508px;
}
.attendanceStatistics.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1508px;
    span{
       color:#323232;
    }
}
.numberOfFlights div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1392px;
}
.numberOfFlights.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1392px;
    span{
       color:#323232;
    }
}
.schedule  div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1450px;
}
.schedule.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1450px;
    span{
       color:#323232;
    }
}
.punch div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1566px;
}
.punch.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1566px;
    span{
       color:#323232;
    }
}
.collect div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1624px;
}
.collect.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1624px;
    span{
       color:#323232;
    }
}
.correct div{
  background: url("/images/Administrator_icon.png") no-repeat -58px -1682px;
}
.correct.active div {
  background: url("/images/Administrator_icon.png") no-repeat 0 -1682px;
    span{
       color:#323232;
    }
}

 .personnel-part {
    height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}

.meeting-part {
    height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}
.financial-part{
 height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}
.attendanceM-part{
  height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}
.storage-part {
    height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}
.attendanceS-part{
 height: 160px;
    background-color: #fafafa;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
}
 .position div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -406px;
}
.position.active div {
   background: url("/images/Administrator_icon.png") no-repeat 0 -406px;
    span{
       color:#323232;
    }
}

 .NewColleagues div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -348px;
}
.NewColleagues.active div {
   background: url("/images/Administrator_icon.png") no-repeat 0 -348px;
    span{
       color:#323232;
    }
}

 .staff div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -290px;
}
.staff.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -290px;
    span{
       color:#323232;
    }
}

 .storage_goods div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -1044px;
}
.storage_goods.active div {
    background: url("/images/Administrator_icon.png") no-repeat 0 -1044px;
    span{
       color:#323232;
    }
}

 .storage_storeroom div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -1102px;
}
.storage_storeroom.active div {
     background: url("/images/Administrator_icon.png") no-repeat 0 -1102px;
    span{
       color:#323232;
    }
}

 .storage_set div {
    background: url("/images/Administrator_icon.png") no-repeat -58px -1160px;
}
.storage_set.active div {
     background: url("/images/Administrator_icon.png") no-repeat 0 -1160px;
    span{
       color:#323232;
    }
}

.financial_tally div{
   background: url("/images/Administrator_icon.png") no-repeat -58px -1218px;
}
.financial_tally.active div {
      background: url("/images/Administrator_icon.png") no-repeat 0 -1218px;
    span{
       color:#323232;
    }
}

.financial_audit div{
    background: url("/images/Administrator_icon.png") no-repeat -58px -1276px;
}
.financial_audit.active div {
      background: url("/images/Administrator_icon.png") no-repeat 0 -1276px;
    span{
       color:#323232;
    }
}

.financial_set div{
   background: url("/images/Administrator_icon.png") no-repeat -58px -1334px;
}
.financial_set.active div {
       background: url("/images/Administrator_icon.png") no-repeat 0 -1334px;
    span{
       color:#323232;
    }
}

.personnel-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left: 70%;
}
 .meeting-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left: 70%;
}
.financial-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left:11%;
}
.attendanceM-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left:11%;
}
.storage-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left: 30%;
}
.attendanceS-part .arrow-up {
    width: 16px;
    height: 14px;
    background: url("/images/arrow-up.png") no-repeat;
    position: absolute;
    top: -9px;
    left: 30%;
}
}
</style>
<style>

</style>

