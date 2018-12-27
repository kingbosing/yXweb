<template>
     <el-container class="temlateMain toApply" id="report"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <!-- <p>我的申请 > 新建申请</p> -->

            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="DataId">
                <el-breadcrumb-item :to="{ path: '/ApplyApproval/apply' }">我的申请</el-breadcrumb-item>
                <el-breadcrumb-item  :to="{ path: '/ApplyApproval/ApplyContent',query:{ id: DataId } }">{{applyName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{acttype}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-else>
                <el-breadcrumb-item :to="{ path: '/ApplyApproval/apply' }">我的申请</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/ApplyApproval/ApplyCreat' }">新建申请</el-breadcrumb-item>
                <el-breadcrumb-item>{{applyName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main class='content'>
            <el-scrollbar class="onlyY">
              <div class="form" :model="BaseInfo">

                <apply-leave v-if="applyName=='请假'" :applyInfo='leaveInfo' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-leave>
                <apply-overtime  v-if="applyName=='加班'"  :applyInfo='overtimeInfo' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-overtime>
                <apply-outing  v-if="applyName=='外出'"  :applyInfo='outing' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-outing>
                <apply-general  v-if="applyName=='通用'"  :applyInfo='general' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-general>
                <apply-fillclock   v-if="applyName=='补卡'"  :applyInfo='ruleDay' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-fillclock>
                <apply-businesstrip   v-if="applyName=='出差'"  :applyInfo='trip' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-businesstrip>
                <apply-bill  v-if="applyName=='开票'"  :applyInfo='bill' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-bill>
                <apply-empneed  v-if="applyName=='人员需求'"  :applyInfo='empNeed' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-empneed>
                <apply-emppositive  v-if="applyName=='员工转正'"  :applyInfo='empPositive' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-emppositive>
                <apply-empleave  v-if="applyName=='员工离职'"  :applyInfo='leave' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-empleave>
                <apply-reimburse  v-if="applyName=='报销'"  :applyInfo='reimburse' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-reimburse>
                <apply-payment  v-if="applyName=='付款'"  :applyInfo='payment' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-payment>
                <apply-receive  v-if="applyName=='物品领用'" :theRemark="receiveRemark"  :applyInfo='receive' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-receive>
                <apply-purchase  v-if="applyName=='采购'" :applyInfoList='purchase'  :applyInfo='purchaseInfo' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-purchase>
                <apply-pact  v-if="applyName=='合同'" :applyInfoList='pact'  :applyInfo='pactInfo' ref='child' v-on:ruleFormCheck='getFormCheck'></apply-pact>

                <el-form  label-width="100px" class="demo-ruleForm">
                  <el-form-item label="语音：">
                    此功能暂不支持网页版，可在APP端录入。
                  </el-form-item>
                  <el-form-item label="上传文件：" prop='files'>
                    <up-load
                        class="upload-demo"
                        ref="upload"
                        action="apix/file/FileUpload"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :file-list="fileList"
                        :show-list-id="false"
                        multiple
                        :show-file-list="true"
                        :auto-upload="true">
                        <el-button size="small" type="text">选择文件</el-button>
                    </up-load>
                  </el-form-item>
                  <el-form-item label="所在部门：" prop='dep'>
                    <el-select  v-model="dep"  placeholder="请选择活动区域">
                      <el-option v-for="(k,v) in myJobsInfoDep" :value="k.DepartmentId||''" :label='k.DepartmentName||getCompanyName()'  :key="v"></el-option>
                      <el-option value="all" label='全部'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="审核人：" >
                     <ul class="copyList approvalList">
                          <li v-for="(k,v) in actApprovals" :key="k.ItemId" @click="changeApprovaler(v)">
                            <span>{{k.DepartmentName||getCompanyName()}}</span>
                            <img :src="faceUrl(k.LeaderFaceUrl,40)" alt="">
                            <span>{{k.LeaderName}}</span>
                          </li>
                      </ul>
                  </el-form-item>
                  <el-form-item label="抄送人：" >
                        <el-button size="small" type="text" @click="dialogForCcPeople=true">添加抄送人</el-button>
                        <ul class="copyList">
                            <li v-for="k in CcPeople_TactLists" :key="k.LeaderId">
                              <a @click="removeIt(k.ItemId)"></a>
                              <img :src="faceUrl(k.HeadUrl,40)" alt="">
                              <span>{{k.Name}}</span>
                            </li>
                        </ul>
                  </el-form-item>

                </el-form>
                <p class="text-center">
                   <el-button type="warning" @click="submitForm('ruleForm')" :loading="submiting">提交</el-button>
                </p>

              </div>

            </el-scrollbar>

        </el-main>

        <get-depeople :visible.sync="dialogForCcPeople"
            :actlist="CcPeople_TactList"
            title="选择抄送人"
            :people="true"
            :checkbox="true"
            v-on:act-node="CcPeople_actNode">
        </get-depeople>

        <get-depeople :visible.sync="dialogForReferredPeople"
            title="选择审批人"
            :people="true"
            :checkbox="false"
            v-on:act-node="ReferredPeople_actNode">
        </get-depeople>
     </el-container>
</template>

<script>

import { GetDetail, gettype, myjobs, CreateApplyRequest } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'
import './components/ApplyApproval_vue.js'
import urlUtil from '@/utils/urlUtil'
import { getFileType } from '@/utils/fileType'
import { parseTime } from '@/utils/index'

import getDepeople from '../../components/dialogDep/src/component'

import applyLeave from './applyTemplates/leave.vue'
import applyOvertime from './applyTemplates/ApplyOvertime.vue'
import applyOuting from './applyTemplates/ApplyOuting.vue'
import applyGeneral from './applyTemplates/ApplyGeneral.vue'
import applyFillclock from './applyTemplates/ApplyFillClock.vue'
import applyBusinesstrip from './applyTemplates/ApplyBusinessTrip.vue'
import applyBill from './applyTemplates/ApplyBill.vue'
import applyEmpneed from './applyTemplates/ApplyEmpNeed.vue'
import applyEmppositive from './applyTemplates/ApplyEmpPositive.vue'
import applyEmpleave from './applyTemplates/ApplyEmpLeave.vue'
import applyReimburse from './applyTemplates/ApplyReimburse.vue'
import applyPayment from './applyTemplates/ApplyPayment.vue'
import applyReceive from './applyTemplates/ApplyReceive.vue'
import applyPurchase from './applyTemplates/ApplyPurchase.vue'
import applyPact from './applyTemplates/ApplyPact.vue'

// ApplyFillClock

export default {
  components: { applyPact, applyPurchase, applyReceive, applyPayment, applyReimburse, applyEmpleave, applyEmppositive, applyEmpneed, applyBill, applyBusinesstrip, applyLeave, applyOvertime, applyGeneral, applyFillclock, applyOuting, getDepeople },
  data() {
    return {
      listData: [],
      fullscreenLoading: false,
      myJobsInfoDep: [], // 我的岗位信息--用于选所在部门
      myJobsInfo: [], // 我的岗位信息
      applyName: '',
      TypeID: '',
      DataId: '', // 复制重发
      acttype: '',
      copeData: '', // 复制数据
      copeBaseData: '', // 复制的基本信息

      BaseInfo: {

      },
      files: [],
      dep: '',
      actApprovals: [], // 审批人列表
      FormCheck: false,

      leaveType: ['', '年假', '事假', '病假', '调休', '婚假', '产假', '陪产假', '路途假', '其他'],
      // 请假
      leaveInfo: {
        Type: '',
        date1: [this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'), this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')],
        date2: '',
        days: '',
        desc: ''
      },
      // 加班
      overtimeInfo: {
        date1: [this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'), this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')],
        date2: '',
        days: '',
        desc: '',
        countIn: true
      },
      // 外出
      outing: {
        date1: [this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'), this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')],
        date2: '',
        days: '0分钟',
        minutes: '',
        address: '',
        desc: ''
      },
      // 通用
      general: {
        desc: '',
        title: ''
      },
      // 补卡
      ruleDay: {
        checkList: [],
        desc: '',
        date1: this.toParseTime(new Date(), '{y}-{m}-{d}')
      },
      // 出差
      trip: {
        date1: [this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'), this.toParseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')],
        days: '',
        traffic: '',
        address: '',
        desc: '',
        reason: ''
      },
      // 开票
      bill: {
        Type: '',
        billName: '',
        billAmount: '',
        billContent: '',
        taxNo: '',
        address: '',
        bank: '',
        bankAccount: '',
        remark: ''
      },
      // 人员需求
      empNeed: {
        dept: '',
        job: '',
        amount: '',
        reason: '离职补缺',
        date1: '',
        jobDescription: '',
        require: '',
        remark: ''
      },
      // 员工转正
      empPositive: {
        empNo: '',
        job: '',
        type: '按期转正',
        date1: '',
        months: '',
        summary: '',
        remark: ''

      },
      // 员工离职
      leave: {
        job: '',
        empNo: '',
        date1: '',
        date2: '',
        goods: [],
        description: '',
        handOver: '',
        remark: '',
        reason: '个人原因离职'
      },
      // 报销
      reimburse: [
        {
          Amount: '',
          Categories: '',
          Details: ''
        }
      ],
      reimburseTotal: {
        TotalAmount: 0,
        SonTypeName: []
      },

      // 付款
      payment: {
        PaymentDetails: [
          {
            FirmName: '',
            PayType: '',
            PayAmount: '',
            BankAccount: '',
            Bank: '',
            BankAddress: '',
            Remark: ''
          }
        ],
        Remark: '',
        date1: [],
        Start: '',
        End: '',
        TotalPay: ''
      },
      // 物品领用
      receive: [
        {
          Name: '',
          Count: '',
          Use: ''
        }
      ],
      receiveRemark: {
        Remark: ''
      },
      // 采购
      purchase: [{
        Name: '',
        Count: '',
        Version: '',
        Norm: '',
        Budget: '',
        Directions: ''
      }],
      purchaseInfo: {
        Remark: '',
        PurchaseType: '',
        Reason: '',
        date1: '',
        TotalAmount: '',
        TotalBudget: ''
      },
      // 合同
      pact: [{
        SubContractors: '',
        Organization: '',
        Department: '',
        Managers: '',
        Phone: '',
        Email: '',
        Fax: ''
      }],
      pactInfo: {
        Category: '',
        Number: '',
        Content: ''
      },

      dialogForCcPeople: false, // 抄送人
      CcPeople_TactList: [], // 抄送人Id列表
      CcPeople_TactLists: [], // 抄送人全列表

      dialogForReferredPeople: false, // 审批人

      fileList: [], // 默认文件列表--复制，重发
      approval_fileLists: [], // 审批文件列表

      changeLeaderindex: '', // 更改审批人index

      submiting: false // 提交中。。
    }
  },
  watch: {
    dep(news) {
      if (news == 'all') {
        this.actApprovals = this.myJobsInfo
      } else {
        this.actApprovals = this.myJobsInfo.filter(item => {
          return item.DepartmentId == news
        })
      }
    },
    CcPeople_TactLists(news, olds) {
      this.CcPeople_TactList = []
      news.forEach((item) => {
        this.CcPeople_TactList.push(item.ItemId || item.ExecutProfileId)
      })
    }
  },
  mounted() {
    this.init()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'apply_content') {
      next(true)
    } else {
      this.$confirm('此操作将离开此表单且填写的数据不会保留, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next(true)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消跳转'
        })
      })
    }
  },
  methods: {
    init() {
      this.applyName = this.$route.query.name
      this.TypeID = this.$route.query.id
      this.DataId = this.$route.query.DataId
      this.acttype = this.$route.query.type
      GetMyjobs(this)
      //   getList(this)
      if (this.DataId) {
        toGetDetail(this)
      }
    },
    getApprovalContent(type) {
      let ApprovalContent
      if (type == '请假') {
        ApprovalContent = '{"Leave":{ "Type": ' + this.leaveInfo.Type + ', "Start": "' + this.leaveInfo.date1[0] + '", "End": "' + this.leaveInfo.date1[1] + '", "Days":"' + this.leaveInfo.days + '", "Reason": "' + this.leaveInfo.desc + '" }}'
      } else if (type == '加班') {
        ApprovalContent = '{"Over":{ "Start": "' + this.overtimeInfo.date1[0] + '", "End": "' + this.overtimeInfo.date1[1] + '", "Days":"' + this.overtimeInfo.days + '", "Reason": "' + this.overtimeInfo.desc + '" }}'
      } else if (type == '外出') {
        ApprovalContent = '{"Out":{ "Address": "' + this.outing.address + '", "Start": "' + this.outing.date1[0] + '", "End": "' + this.outing.date1[1] + '", "Days":"' + this.outing.days + '", "Reason": "' + this.outing.desc + '" }}'
      } else if (type == '通用') {
        ApprovalContent = '{"General":{"Title":"' + this.general.title + '","Content":"' + this.general.desc + '"}}'
      } else if (type == '补卡') {
        const signStr = []
        this.ruleDay.checkList.forEach(item => {
          const str = {
            Count: item.split('-')[0],
            SignTime: item.split('-')[1]
          }
          signStr.push(str)
        })
        // console.log(signStr)
        ApprovalContent = ApprovalContent = '{"Reissue":{"Date":"' + this.ruleDay.date1 + '", "Sign":' + JSON.stringify(signStr) + ', "Reason":"' + this.ruleDay.desc + '" }}'
      } else if (type == '出差') {
        ApprovalContent = '{"BusinessTrip":{ "Start": "' + this.trip.date1[0] + '", "End": "' + this.trip.date1[1] + '", "Days":"' + this.trip.days + '", "Destination": "' + this.trip.address + '", "Traffic": "' + this.trip.traffic + '", "Reason": "' + this.trip.desc + '", "Detail": "' + this.trip.reason + '" }}'
      } else if (type == '开票') {
        ApprovalContent = '{"Bill":{"BillType": "' + this.bill.Type + '","BillName":"' + this.bill.billName + '","BillAmount":"' + this.bill.billAmount + '",' +
        '"BillContent":"' + this.bill.billContent + '","CapitalAmount":"' + this.digitUppercase(this.bill.billAmount) + '","TaxNo":"' + this.bill.taxNo + '","Address":"' + this.bill.address + '",' +
        '"Bank":"' + this.bill.bank + '","Remark":"' + this.bill.remark + '","BankAccount":"' + this.bill.bankAccount + '"}}'
      } else if (type == '人员需求') {
        ApprovalContent = '{"EmpNeed":{"Dept": "' + this.empNeed.dept + '","Job":"' + this.empNeed.job + '","Amount":"' + this.empNeed.amount + '",' +
        '"Reason":"' + this.empNeed.reason + '","End":"' + this.empNeed.date1 + '","JobDescription":"' + this.empNeed.jobDescription + '","Require":"' + this.empNeed.require + '",' +
        '"Remark":"' + this.empNeed.remark + '"}}'
      } else if (type == '员工转正') {
        ApprovalContent = '{"EmpPositive":{"Job": "' + this.empPositive.job + '","EmpNo":"' + this.empPositive.empNo + '",' +
        '"Type":"' + this.empPositive.type + '","Start":"' + this.empPositive.date1 + '","Months":"' + this.empPositive.months + '","Summary":"' + this.empPositive.summary + '",' +
        '"Remark":"' + this.empPositive.remark + '"}}'
      } else if (type == '员工离职') {
        ApprovalContent = '{"EmpLeave":{"Job": "' + this.leave.job + '","EmpNo":"' + this.leave.empNo + '","Start":"' + this.leave.date1 + '",' +
        '"Reason":"' + this.leave.reason + '","End":"' + this.leave.date2 + '","Description":"' + this.leave.description + '","HandOver":"' + this.leave.handOver + '",' +
        '"Remark":"' + this.leave.remark + '","Goods":' + JSON.stringify(this.leave.goods) + '}}'
      } else if (type == '报销') {
        const Content = {
          'ReimBursed': []
        }
        this.reimburseTotal.TotalAmount = 0
        this.reimburseTotal.SonTypeName = []
        this.reimburse.forEach(item => {
          Content.ReimBursed.push(item)
          this.reimburseTotal.TotalAmount += parseFloat(item.Amount)
          this.reimburseTotal.SonTypeName.push(item.Categories)
        })

        ApprovalContent = JSON.stringify(Content)
      } else if (type == '付款') {
        const Payment = {
          'Payment': {
            'PaymentDetails': this.payment.PaymentDetails,
            'Remark': this.payment.Remark,
            'Start': this.payment.date1[0],
            'End': this.payment.date1[1],
            'TotalPay': this.payment.TotalPay
          }
        }
        // console.log(Payment)
        ApprovalContent = JSON.stringify(Payment)
      } else if (type == '物品领用') {
        const MaterialRequisition = {
          'MaterialRequisition': {
            'List': this.receive,
            'Remark': this.receiveRemark.Remark
          }
        }
        ApprovalContent = JSON.stringify(MaterialRequisition)
      } else if (type == '采购') {
        const Purchase = {
          'Purchase': {
            'PurchaseDetails': this.purchase,
            'Remark': this.purchaseInfo.Remark,
            'PurchaseType': this.purchaseInfo.PurchaseType,
            'End': this.purchaseInfo.date1,
            'TotalAmount': this.purchaseInfo.TotalAmount,
            'TotalBudget': this.purchaseInfo.TotalBudget,
            'Reason': this.purchaseInfo.Reason
          }
        }
        ApprovalContent = JSON.stringify(Purchase)
      } else if (type == '合同') {
        const ConTract = {
          'ConTract': {
            'ContractContents': this.pact,
            'Category': this.pactInfo.Category,
            'Number': this.pactInfo.Number,
            'Content': this.pactInfo.Content
          }
        }
        ApprovalContent = JSON.stringify(ConTract)
      }

      return ApprovalContent
    },
    toParseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    getApprovers() {
      const approvalList = []
      this.actApprovals.forEach(item => {
        const cell = {
          'ApprovalProfileId': item.LeaderId,
          'ApprovalDepartmentId': item.LeaderDepartmentId,
          'DepartmentId': item.DepartmentId
        }
        approvalList.push(cell)
      })
      return approvalList
    },
    getFormCheck(data) {
      this.FormCheck = data
    },
    getFilesOrImg(type) {
      const fileList = []
      const imgList = []

      if (this.approval_fileLists.length) {

      } else {
        this.approval_fileLists = this.fileList
      }

      this.approval_fileLists.forEach(item => {
        // console.log(item)
        if (getFileType(item.name) == 'img') {
          if (item.ID == null || item.ID == '') {
            imgList.push(item.response.ID)
          } else {
            imgList.push(item.ID)
          }
        } else if (getFileType(item.name) != 'img') {
          if (item.ID == null || item.ID == '') {
            fileList.push(item.response.ID)
          } else {
            fileList.push(item.ID)
          }
        }
      })
      return (type == 'img' ? imgList : fileList).toString()
    },
    getApprovalData() {
      const Data = {
        'typeID': this.TypeID,
        'approvalContent': this.getApprovalContent(this.applyName),
        'fileIDs': this.getFilesOrImg('file'),
        // 'voiceIDs': '',
        'photoIDs': this.getFilesOrImg('img'),
        // 'videoIDs': '',
        'approvers': this.getApprovers(),
        'ExecutProfileID': this.CcPeople_TactList.toString()

      }
      if (this.applyName == '请假') {
        Data.StartTime = this.leaveInfo.date1[0]
        Data.EndTime = this.leaveInfo.date1[1]
        Data.Days = this.leaveInfo.days
        Data.Reason = this.leaveInfo.desc
        Data.SonTypeId = this.leaveInfo.Type
        Data.SonTypeName = this.leaveType[this.leaveInfo.Type]
      } else if (this.applyName == '加班') {
        Data.StartTime = this.overtimeInfo.date1[0]
        Data.EndTime = this.overtimeInfo.date1[1]
        Data.Days = this.overtimeInfo.days
        Data.Reason = this.overtimeInfo.desc
      } else if (this.applyName == '外出') {
        Data.StartTime = this.outing.date1[0]
        Data.EndTime = this.outing.date1[1]
        Data.Days = this.outing.days
        Data.Reason = this.outing.desc
      } else if (this.applyName == '通用') {
        Data.SonTypeName = this.general.title
      } else if (this.applyName == '补卡') {
        Data.StartTime = this.ruleDay.date1 + ' ' + '00:00:00'
        Data.Reason = this.ruleDay.desc
      } else if (this.applyName == '出差') {
        Data.StartTime = this.trip.date1[0]
        Data.EndTime = this.trip.date1[1]
        Data.Days = this.trip.days
        Data.Reason = this.trip.desc
      } else if (this.applyName == '开票') {
        Data.TotalAmount = this.bill.billAmount
        Data.Remark = this.bill.remark
        Data.SonTypeName = this.bill.Type
      } else if (this.applyName == '人员需求') {
        Data.EndTime = this.empNeed.date1
        Data.Remark = this.empNeed.remark
        Data.Reason = this.empNeed.reason
      } else if (this.applyName == '员工转正') {
        Data.EndTime = this.empPositive.date1
        Data.Remark = this.empPositive.remark
      } else if (this.applyName == '员工离职') {
        Data.StartTime = this.leave.date1
        Data.EndTime = this.leave.date2
        Data.Reason = this.leave.reason
        Data.Remark = this.leave.remark
      } else if (this.applyName == '报销') {
        Data.TotalAmount = this.reimburseTotal.TotalAmount
        Data.SonTypeName = this.reimburseTotal.SonTypeName.toString()
      } else if (this.applyName == '付款') {
        Data.TotalAmount = this.payment.TotalPay
        Data.StartTime = this.payment.date1[0]
        Data.EndTime = this.payment.date1[1]
        Data.Remark = this.payment.Remark
      } else if (this.applyName == '物品领用') {
        Data.Remark = this.receiveRemark.Remark
        const sonTypeName = []
        this.receive.forEach(item => {
          sonTypeName.push(item.Name)
        })
        Data.SonTypeName = sonTypeName.toString()
      } else if (this.applyName == '采购') {
        Data.TotalAmount = this.purchaseInfo.TotalAmount
        Data.EndTime = this.purchaseInfo.date1
        Data.Reason = this.purchaseInfo.Reason
        Data.Remark = this.purchaseInfo.Remark
      } else if (this.applyName == '合同') {
        Data.SonTypeName = this.pactInfo.Category
        Data.Remark = this.pactInfo.Content
      }

      return Data
    },
    submitForm(formName) {
      // this.check = true
      this.$refs.child.toCheck() // 子组件 表单验证方法1
      // console.log(this.FormCheck)
      if (this.FormCheck) {
        // console.log(this.getApprovalData())
        // this.submiting = true
        // this.getApprovalData()
        submit(this, this.getApprovalData())
      }
    },

    handleRemove(file, fileList) {
    //   console.log(file)
      // console.log(fileList)
      this.approval_fileLists = fileList
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList)
      this.approval_fileLists = fileList
    },
    CcPeople_actNode(data) {
    //   console.log(data)
      this.CcPeople_TactLists = data
    },
    ReferredPeople_actNode(data) {
      // console.log(data)
      this.actApprovals[this.changeLeaderindex].DepartmentName = data[0].DeptName
      this.actApprovals[this.changeLeaderindex].LeaderId = data[0].ItemId
      this.actApprovals[this.changeLeaderindex].LeaderName = data[0].Name
      this.actApprovals[this.changeLeaderindex].LeaderFaceUrl = data[0].HeadUrl

      // console.log(this.actApprovals)
    },
    changeApprovaler(index) {
      // console.log(LeaderId)
      this.changeLeaderindex = index
      this.dialogForReferredPeople = true
    },
    removeIt(id) {
      this.CcPeople_TactLists = this.CcPeople_TactLists.filter((item) => {
        return item.ItemId != id
      })
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
    getCompanyName() {
      return this.$store.state.company.CompanyName
    },

    digitUppercase(n) {
      var fraction = ['角', '分']
      var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
      ]
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ]
      if (n) {
        var head = n < 0 ? '欠' : ''
        n = Math.abs(n)
        var s = ''
        for (var i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)
        for (let i = 0; i < unit[0].length && n > 0; i++) {
          var p = ''
          for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      } else {
        return '--'
      }
    }
  }
}

var getList = (app) => {
  app.listData = ''
  app.fullscreenLoading = true

  gettype(getToken()).then((res) => {
    const data = res.data.Data
    // console.log(data)
    app.fullscreenLoading = false
    app.listData = data
  })
}

var GetMyjobs = (app) => {
  myjobs(getToken()).then((res) => {
    var data = res.data
    // console.log(data)
    app.myJobsInfo = []
    // unshift
    data.Data.forEach(item => {
      if (item.IsMastJob) {
        // app.myJobsInfo.unshift(item)
        app.myJobsInfoDep.unshift(item)
        app.dep = item.DepartmentId
        app.actApprovals.push(item)
      } else {
        // app.myJobsInfo.push(item)
        app.myJobsInfoDep.push(item)
      }
    })

    app.myJobsInfo = [].concat(JSON.parse(JSON.stringify(app.myJobsInfoDep)))// 拷贝数组,注意这行的拷贝方法

    // console.log(app.myJobsInfo)
  })
}

var submit = (app, data) => {
  app.submiting = true
  // console.log(app.leave)
  CreateApplyRequest(getToken(), data).then(res => {
    var data = res.data
    // console.log(data)
    if (data.successful) {
      app.submiting = false
      app.$router.push({ path: '/ApplyApproval/ApplyContent', query: { id: data.Data[0].Id }})
    }
  })
}

var toGetDetail = (app) => {
  GetDetail(getToken(), app.DataId, 1).then((res) => {
    const data = res.data
    copeData(app, data.Data, data.Data.ApprovalContent)
  })
}

var copeData = (app, Data, BaseData) => {
  const copeData = Data
  const copeBaseData = JSON.parse(BaseData)
  // console.log(copeData)
  app.fileList = []
  app.CcPeople_TactLists = []
  copeData.ExecutProfileInfo.forEach(item => {
    app.CcPeople_TactLists.push({
      ItemId: item.ExecutProfileId,
      HeadUrl: item.FaceUrl,
      Name: item.ExecutProfileName
    })
  })
  copeData.FileIDs.forEach(item => {
    app.fileList.push({
      ID: item.FileIDs,
      url: item.Path,
      name: item.FileName
    })
  })
  copeData.Images.forEach(item => {
    app.fileList.push({
      ID: item.Id,
      url: item.Path,
      name: item.FileName
    })
  })

  if (app.applyName == '请假') {
    app.leaveInfo.Type = copeBaseData.Leave.Type
    app.leaveInfo.date1 = [copeBaseData.Leave.Start, copeBaseData.Leave.End]
    app.leaveInfo.days = copeBaseData.Leave.Days
    app.leaveInfo.desc = copeBaseData.Leave.Reason
  } else if (app.applyName == '采购') {
    app.purchase = copeBaseData.Purchase.PurchaseDetails
    app.purchaseInfo = {
      Remark: copeBaseData.Purchase.Remark,
      PurchaseType: copeBaseData.Purchase.PurchaseType,
      Reason: copeBaseData.Purchase.Reason,
      date1: copeBaseData.Purchase.End,
      TotalAmount: copeBaseData.Purchase.TotalAmount,
      TotalBudget: copeBaseData.Purchase.TotalBudget
    }
  } else if (app.applyName == '合同') {
    app.pact = copeBaseData.ConTract.ContractContents
    app.pactInfo = {
      Category: copeBaseData.ConTract.Category,
      Number: copeBaseData.ConTract.Number,
      Content: copeBaseData.ConTract.Content
    }
  } else if (app.applyName == '物品领用') {
    app.receive = copeBaseData.MaterialRequisition.List
    app.receiveRemark = {
      Remark: copeBaseData.MaterialRequisition.Remark
    }
  } else if (app.applyName == '付款') {
    app.payment = {
      PaymentDetails: copeBaseData.Payment.PaymentDetails,
      Remark: copeBaseData.Payment.Remark,
      date1: [copeBaseData.Payment.Start, copeBaseData.Payment.End],
      Start: copeBaseData.Payment.Start,
      End: copeBaseData.Payment.End,
      TotalPay: copeBaseData.Payment.TotalPay
    }
  } else if (app.applyName == '报销') {
    app.reimburse = copeBaseData.ReimBursed
  } else if (app.applyName == '员工离职') {
    app.leave = {
      job: copeBaseData.EmpLeave.Job,
      empNo: copeBaseData.EmpLeave.EmpNo,
      date1: copeBaseData.EmpLeave.Start,
      date2: copeBaseData.EmpLeave.End,
      goods: copeBaseData.EmpLeave.Goods,
      description: copeBaseData.EmpLeave.Description,
      handOver: copeBaseData.EmpLeave.HandOver,
      remark: copeBaseData.EmpLeave.Remark,
      reason: copeBaseData.EmpLeave.Reason
    }
  } else if (app.applyName == '开票') {
    app.bill = {
      Type: copeBaseData.Bill.BillType,
      billName: copeBaseData.Bill.BillName,
      billAmount: copeBaseData.Bill.BillAmount,
      billContent: copeBaseData.Bill.BankAccount,
      taxNo: copeBaseData.Bill.TaxNo,
      address: copeBaseData.Bill.Address,
      bank: copeBaseData.Bill.Bank,
      bankAccount: copeBaseData.Bill.BankAccount,
      remark: copeBaseData.Bill.Remark
    }
  } else if (app.applyName == '员工转正') {
    app.empPositive = {
      empNo: copeBaseData.EmpPositive.EmpNo,
      job: copeBaseData.EmpPositive.Job,
      type: copeBaseData.EmpPositive.Type,
      date1: copeBaseData.EmpPositive.Start,
      months: copeBaseData.EmpPositive.Months,
      summary: copeBaseData.EmpPositive.Summary,
      remark: copeBaseData.EmpPositive.Remark
    }
  } else if (app.applyName == '人员需求') {
    app.empNeed = {
      dept: copeBaseData.EmpNeed.Dept,
      job: copeBaseData.EmpNeed.Job,
      amount: copeBaseData.EmpNeed.Amount,
      date1: copeBaseData.EmpNeed.End,
      reason: copeBaseData.EmpNeed.Reason,
      require: copeBaseData.EmpNeed.Require,
      remark: copeBaseData.EmpNeed.Remark,
      jobDescription: copeBaseData.EmpNeed.JobDescription
    }
  } else if (app.applyName == '出差') {
    app.trip = {
      address: copeBaseData.BusinessTrip.Destination,
      traffic: copeBaseData.BusinessTrip.Traffic,
      days: copeBaseData.BusinessTrip.Days,
      date1: [copeBaseData.BusinessTrip.Start, copeBaseData.BusinessTrip.End],
      reason: copeBaseData.BusinessTrip.Reason,
      desc: copeBaseData.BusinessTrip.Detail

    }
  } else if (app.applyName == '外出') {
    app.outing = {
      address: copeBaseData.Out.Address,
      days: copeBaseData.Out.Days,
      date1: [copeBaseData.Out.Start, copeBaseData.Out.End],
      desc: copeBaseData.Out.Reason

    }
  } else if (app.applyName == '加班') {
    app.overtimeInfo = {
      days: copeBaseData.Over.Days,
      date1: [copeBaseData.Over.Start, copeBaseData.Over.End],
      desc: copeBaseData.Over.Reason
    }
  } else if (app.applyName == '通用') {
    app.general = {
      desc: copeBaseData.General.Content,
      title: copeBaseData.General.Title
    }
  } else if (app.applyName == '补卡') {
    app.ruleDay = {
      checkList: copeBaseData.Reissue.Sign,
      desc: copeBaseData.Reissue.Reason,
      date1: copeBaseData.Reissue.Date
    }
  }
}
</script>

<style lang="scss" scoped>
.toApply{
    .content{
        overflow: hidden;
        height: 100%;
        padding: 0;
        .form{
          width: 980px;
          margin:0 auto;
          overflow: hidden;
          padding-top: 30px;
          .approvalList{
            li{
              cursor: pointer;
              span{
                line-height: 20px;
              }
              img{
                display: block;
                margin: 0 auto;
              }
            }
          }
        }

    }
    .el-button--text{
      color: #f99740;
    }
}

</style>

