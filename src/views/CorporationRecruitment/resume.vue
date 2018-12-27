<template>
     <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path:fromPath}">{{fromTitle}}</el-breadcrumb-item>
                <el-breadcrumb-item>简历详情</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="headerRight" >

                <el-button size='small' v-if="status==0||(status==1&&IsShow==true)" v-on:click="toM_toInvite1(TData.Delivery)" type="button" class="btn-sm button-whiteBoard ToInvite">面试邀请</el-button>
                <template v-if="status==1&&IsShow==false">
                    <el-button size='small' v-if="!TData.ApplySend" type="button" v-on:click="to_communication" class="btn-sm button-whiteBoard ApplyCommunication">申请沟通</el-button>
                    <el-button size='small' v-else type="button" disabled="true" style="color:#8a8a8a;" class="btn-sm button-cancel-disabled ApplyCommunication">申请沟通</el-button>
                </template>

                <el-button size='small' v-if="status==3" type="button" v-on:click="toM_insureAgree1(TData.Employ)" class="btn-sm button-whiteBoard insure">确认入职</el-button>
                <el-button size='small' v-if="status==2&&!IsRefuse" type="button" v-on:click="toM_toPass1(TData.Interview)" class="btn-sm button-whiteBoard pass">通过</el-button>
                <el-button size='small' v-if="status==4" type="button" v-on:click="toM_toEntry1" class="btn-sm button-whiteBoard inTo">入职</el-button>

                <el-button  slot="reference" size='small' v-if="status==0||status==1||status==2||status==3||status==4" v-on:click="toM_notPass1" type="button" class="btn-sm button-whiteBoard NotPass">不通过</el-button>

                <el-button size='small' v-if="TData.RegistrationId&&(status==2||status==3||status==4||(status==5&&IsShow=='true'))" v-on:click="tReadForm(TData.RegistrationId)" type="button" class="btn-sm button-whiteBoard check">查看表格</el-button>

                <el-button size='small' v-if="!IsRefuse" type="button" class="btn-sm button-whiteBoard ToOutPdf" v-on:click="ToPdf(Data.ResumeBasic)">导出简历</el-button>
            </div>
        </el-header>
        <el-main>
             <el-container>
                <el-header height='140px'  v-if="status<5&&status>=0" class="resume">
                    <el-steps :active="stepsActive" align-left  finish-status="success" process-status="success">
                    <el-step>
                        <template v-if='status==1'>
                            <div slot='title'> <span>感兴趣</span></div>
                            <div slot='description' v-if="TData.Delivery">
                                <div class="text_left">更新时间：{{getTime(TData.Delivery.CreateTime,'{y}-{m}-{d}')}} </div>
                                <div class="text_left" v-if="IsShow==false">联系方式未公开 </div>
                            </div>
                        </template>
                        <template v-else>
                            <div slot='title'> <span>新投递</span></div>
                            <div slot='description' v-if="TData.Delivery">
                                <div class="text_left">投递岗位：{{TData.Delivery.CompanyJobName||''}} </div>
                                <div class="text_left">投递时间：{{TData.Delivery.CreateTime||''}} </div>
                            </div>
                        </template>

                    </el-step>
                    <el-step title="待面试">
                        <div slot='title'>待面试</div>
                        <div slot='description' v-if="status>=2&&TData.Interview">
                            <div class="text_left">申请岗位：{{TData.Interview.InterviewJob||''}} </div>
                            <div class="text_left">面试时间：{{TData.Interview.InterviewTime}}</div>
                        </div>
                    </el-step>
                    <el-step title="待录用">
                        <div slot='title'>待录用</div>
                        <div slot='description' v-if="status>=3&&TData.Employ">
                            <div class="text_left">录用岗位：{{TData.Employ.EmployJob}} </div>
                            <div class="text_left" >录用时间：{{TData.Employ.InviteTime}} </div>
                        </div>
                    </el-step>
                    <el-step >
                        <div slot='title'>待入职</div>
                        <div slot='description' v-if="status>=4&&TData.Entry">
                            <div class="text_left" >录用岗位：{{TData.Entry.EntryJob}} </div>
                            <div class="text_left" >预计入职：{{TData.Entry.ExpectedEntryTime}} </div>
                        </div>
                    </el-step>

                    </el-steps>
                </el-header>
                <el-main>

                    <div class="content" >
                        <div class="accessory" v-if="false">
                            <p>附件：<a></a></p>
                        </div>

                        <div class="Interest " v-if="status==6||status==1||status<0"  v-bind:class="IsInterest?'hasInterested':'wantYou'"  @click="ToInterest">
                            <b></b>感兴趣
                        </div>
                        <!-- {{from}} -->
                        <resume-info :info="Data" v-if="Data" ref="resumeInfos"></resume-info>
                    </div>
                </el-main>
             </el-container>
        </el-main>
        <!-- 面試邀請 -->
        <el-dialog
          :visible.sync="VisibleForInvite"
          width="620px">
          <span slot="title">{{ResumeBasic.Name}} <span class="color_8a"> 先生/女士</span></span>
            <el-form :model="FormforInvite" ref="FormInvite"  label-width="100px" class="demo-ruleForm">

              <el-form-item label="面试部门：" prop="depId" required>
                <el-select v-model="FormforInvite.depId" placeholder="请选择面试部门">
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.depList" :key="k.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试职位：" prop="jobId" required>
                <el-select v-model="FormforInvite.jobId" placeholder="请选择面试职位">
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.jobList" :key="k.Id"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="面试时间：" prop="time" required>
              <el-date-picker
                    v-model="FormforInvite.time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
             <hr>
              <el-select v-model="FormforInvite.moId" placeholder="请选择面试面試模板">
                  <el-option :label="k.Title" :value="k.Id" v-for="k in moList" :key="k.Id"></el-option>
                </el-select>
                <div>
                  <div>{{moAct.TheContent}}</div>
                  <p>联 &nbsp;系 &nbsp;人：<span>{{moAct.Linkman||'(空)'}}</span></p>
                  <p>联系方式：<span>{{moAct.Phone||'(空)'}}</span></p>

                  <p>邮箱地址：<span>{{moAct.Email||'(空)'}}</span></p>
                  <p>面试地址：<span>{{moAct.Address||'(空)'}}</span></p>
                  <p>乘车路线：<span>{{moAct.BusLine||'(空)'}}</span></p>
                </div>

            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="VisibleForInvite = false">取 消</el-button>
            <el-button type="primary" @click="submitForInvite('FormInvite')">确 定</el-button>
          </span>
        </el-dialog>
         <!-- 面試通过 -->
        <el-dialog
          :visible.sync="VisibleForInvitePass"
          width="620px">
          <span slot="title">通过面试，同意录用该员工</span>
            <el-form :model="FormforInvite" ref="FormInvitePass"  label-width="100px" class="status_2">

              <el-form-item label="面试部门：" prop="depId" required>
                <el-select v-model="FormforInvite.depId" placeholder="请选择面试部门" >
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.depList" :key="k.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试职位：" prop="jobId" required>
                <el-select v-model="FormforInvite.jobId" placeholder="请选择面试职位">
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.jobList" :key="k.Id"></el-option>

                </el-select>
              </el-form-item>
              <p>评价</p>
              <el-row>
                  <el-col :span="4"><el-button type="text" disabled>专业技能：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation1"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>沟通能力：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation2"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>个人素养：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation3"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>总体评价：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation4"></el-rate></el-col>
                </el-row>

            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="VisibleForInvitePass = false">取 消</el-button>
            <el-button type="primary" @click="submitForInvitePass('FormInvitePass')">确 定</el-button>
          </span>
        </el-dialog>
          <!-- 同意入职 -->
        <el-dialog
          :visible.sync="VisibleForJoin"
          width="620px">
          <span slot="title">同意该员工入职</span>
            <el-form :model="FormforInvite" ref="FormInvite"  label-width="100px" class="demo-ruleForm">

              <el-form-item label="入职部门：" prop="depId" required>
                <el-select v-model="FormforInvite.depId" placeholder="请选择入职部门">
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.depList" :key="k.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入职职位：" prop="jobId" required>
                <el-select v-model="FormforInvite.jobId" placeholder="请选择入职职位">
                  <el-option :label="k.Name" :value="k.Id" v-for="k in FormforInvite.jobList" :key="k.Id"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="入职时间：" prop="time" required>
              <el-date-picker
                    v-model="FormforInvite.time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>

            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="VisibleForJoin = false">取 消</el-button>
            <el-button type="primary" @click="submitForJoin('FormInvite')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 不通過 -->
         <el-dialog
          :visible.sync="VisibleForNO"
          width="600px">
          <span slot="title">请从以下原因中选择一条，简历将存放到“不通过”状态中：</span>
          <div v-if="status==0" class="status_0">
            <el-radio-group  v-model="NoWhy">
              <el-radio label="1" border size="medium">与岗位要求不符</el-radio>
              <el-radio label="2" border size="medium">行业背景差别大</el-radio>
              <el-radio label="3" border size="medium">地域不符合</el-radio>
              <el-radio label="4" border size="medium">已经找到工作</el-radio>
              <el-radio label="5" border size="medium">直接拒绝</el-radio>
              <el-radio label="6" border size="medium">其他原因</el-radio>
              <el-input type="textarea"   v-model="otherNoWhy" v-if="NoWhy==6"/>
            </el-radio-group>
          </div>
          <div v-if="status==2" class="status_2">
            <el-radio-group  v-model="NoWhy">
              <el-radio label="7" border size="medium">人没来面试</el-radio>
              <el-radio label="8" border size="medium">与岗位要求不符</el-radio>
              <div v-if='NoWhy==8' style="padding-left:40px;">
                <el-row>
                  <el-col :span="4"><el-button type="text" disabled>专业技能：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation1"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>沟通能力：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation2"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>个人素养：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation3"></el-rate></el-col>
                  <el-col :span="4"><el-button type="text" disabled>总体评价：</el-button></el-col>
                  <el-col :span="20"><el-rate v-model="Evaluation4"></el-rate></el-col>
                </el-row>
              </div>
              <el-radio label="9" border size="medium">薪资要求高</el-radio>
              <el-radio label="10" border size="medium">已经找到工作</el-radio>
              <el-radio label="11" border size="medium">行业背景较大</el-radio>
              <el-radio label="12" border size="medium">直接拒绝</el-radio>
              <el-radio label="13" border size="medium">其他原因</el-radio>
              <el-input type="textarea"   v-model="otherNoWhy" v-if="NoWhy==13"/>
            </el-radio-group>
          </div>
          <div v-if="status==3" class="status_2">
              <el-radio-group  v-model="NoWhy">
                <el-radio label="14" border size="medium">工作地点不匹配</el-radio>
                <el-radio label="9" border size="medium">薪资要求高</el-radio>
                <el-radio label="10" border size="medium">已经找到工作</el-radio>
                <el-radio label="12" border size="medium">直接拒绝</el-radio>
                <el-radio label="13" border size="medium">其他原因</el-radio>
                <el-input type="textarea"   v-model="otherNoWhy" v-if="NoWhy==13"/>
              </el-radio-group>
          </div>
           <div v-if="status==4" class="status_2">
              <el-radio-group  v-model="NoWhy">
                <el-radio label="10" border size="medium">已经找到工作</el-radio>
                <el-radio label="12" border size="medium">直接拒绝</el-radio>
                <el-radio label="13" border size="medium">其他原因</el-radio>
                <el-input type="textarea"   v-model="otherNoWhy" v-if="NoWhy==13"/>
              </el-radio-group>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="VisibleForNO = false">取 消</el-button>
            <el-button type="primary" @click="whyNoPassFun('-2')" >确 定</el-button>

          </span>
        </el-dialog>

     </el-container>
</template>

<script>
import resumeInfo from './components/resumeInfo'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import { parseTime } from '@/utils/index'

import {
  resumedetail,
  resumeinterest,
  applysend,
  get_deppos,
  get_inmsList,
  resumeunpass,
  inviteinterview,
  invitentry,
  entryconfirm,
  entrycomplete
} from '@/api/recruitment'
export default {
  components: {
    resumeInfo
  },

  data() {
    return {
      fullscreenLoading: true,
      status: '',
      ResumeId: '',
      OrderId: '',
      IsSacn: '',
      ResumeBasic: {},
      Data: {},
      fromPath: '/CorporationRecruitment/ResumemManage/',
      fromTitle: '简历管理',
      TData: '',
      IsShow: '',
      IsSend: '',
      IsRefuse: '',
      IsInterest: '',
      stepsActive: 0,
      // 面试邀请
      VisibleForInvite: false,
      FormforInvite: {
        depList: '',
        depId: '',
        depName: '',
        jobList: '',
        jobId: '',
        jobName: '',
        time: '',
        moId: ''
      },
      moList: '', // 模板列表
      moAct: '',

      // 面试通过
      VisibleForInvitePass: false,

      // 同意入职
      VisibleForJoin: false,

      // 不通过
      VisibleForNO: false,
      NoWhy: '1',
      otherNoWhy: '',
      Evaluation1: 0,
      Evaluation2: 0,
      Evaluation3: 0,
      Evaluation4: 0,
      NoWhyList: [
        '', '与岗位要求不符',
        '行业背景差别大', '地域不符合',
        '已经找到工作', '直接拒绝',
        '', '人没来面试',
        '与岗位要求不符', '薪资要求高',
        '已经找到工作', '行业背景较大',
        '直接拒绝', '',
        '工作地点不匹配'
      ]
    }
  },
  watch: {
    'FormforInvite.depId'(val, d) {
      if (this.FormforInvite.depList) {
        const actDep = this.FormforInvite.depList.filter(c => {
          return c.Id == val
        })
        this.FormforInvite.depName = actDep[0].Name
        // console.log(actDep)
      }

      getDeppos(this, 20, val).then(c => {
        this.FormforInvite.jobList = c
        if (d) {
          this.FormforInvite.jobId = c[0].Id
          this.FormforInvite.jobName = c[0].Name
        }
      })
    },
    'FormforInvite.jobId'(val, d) {
      if (this.FormforInvite.jobList) {
        const actJob = this.FormforInvite.jobList.filter(c => {
          return c.Id == val
        })
        // console.log(actJob)
        this.FormforInvite.jobName = actJob[0].Name
      }
    },
    'FormforInvite.moId'(val, d) {
      if (d) {
        const Themoact = this.moList.filter(item => {
          return item.Id == val
        })
        this.moAct = Themoact[0]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from)
    next(vn => {
      vn.fromTitle = from.name ? from.meta.title : '简历管理'
      vn.fromPath = from.name ? from.fullPath : '/CorporationRecruitment/ResumemManage/'
    })
  },
  beforeMount() {
    this.status = this.$route.query.Status
    this.ResumeId = this.$route.query.ResumeId
    this.OrderId = this.$route.query.OrderId
    this.IsSacn = this.$route.query.IsSacn

    this.stepsActive = this.status == 0 ? 0 : (this.status - 1)
    this.init()
  },
  methods: {

    init() {
      let scan
      if (this.status == 0) {
        scan = 0
      } else if (this.status == 1) {
        scan = 1
      } else if (this.status == 6) {
        scan = 2
      } else {
        scan = 3
      }
      getList(this, this.ResumeId, this.OrderId, scan, this.IsSacn)
    },
    toM_toInvite1(data) { // 面試申請
      // console.log(data)
      this.FormforInvite.depId = data.DepartmentId
      this.FormforInvite.depName = data.DepartmentName
      this.FormforInvite.jobId = data.CompanyJobId
      this.FormforInvite.jobName = data.CompanyJobName

      // 部门，职位
      getDeppos(this, 10, '').then(c => {
        // console.log(c)
        this.FormforInvite.depList = c
      })
      // 模板
      getInmsList().then(c => {
        // console.log(c)
        this.moList = c
        this.moAct = c[0]
        this.FormforInvite.moId = c[0].Id
      })
      this.VisibleForInvite = true
    },
    submitForInvite(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Data = {
            OrderId: this.OrderId,
            InterviewDept: this.FormforInvite.depName,
            InterviewDeptId: this.FormforInvite.depId,
            InterviewJob: this.FormforInvite.jobName,
            InterviewJobId: this.FormforInvite.jobId,
            InviteTemp: this.FormforInvite.moId,
            InterviewTime: this.FormforInvite.time,
            Status: 2
          }
          // console.log(Data)
          inviteinterview(Data).then((c) => {
            if (c.data.Code === 0) {
              this.$router.push({ path: this.fromPath })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    to_communication() { // 申请沟通
      // console.log('申请沟通')
      applysend(this.ResumeId, this.OrderId).then(c => {
        // console.log(c)
        if (c.data.Code === 0) {
          this.init()
          this.$message({
            message: '成功发送了申请沟通！',
            type: 'success'
          })
        } else {
          this.$message({
            message: c.data.message,
            type: 'warning'
          })
        }
      })
    },
    toM_insureAgree1() {
      // 部门，职位
      getDeppos(this, 10, '').then(c => {
        // console.log(c)
        this.FormforInvite.depList = c

        this.VisibleForJoin = true
      })
    },
    submitForJoin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Data = {
            OrderId: this.OrderId,
            InterviewDept: this.FormforInvite.depName,
            InterviewDeptId: this.FormforInvite.depId,
            InterviewJob: this.FormforInvite.jobName,
            InterviewJobId: this.FormforInvite.jobId,
            ExpectedEntryTime: this.FormforInvite.time,
            Status: 4
          }
          // console.log(Data)
          entryconfirm(Data).then(c => {
            // console.log(c)
            if (c.data.Code === 0) {
              this.$router.push({ path: this.fromPath })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 面試通過
    toM_toPass1(data) {
      // console.log(data)
      this.FormforInvite.depId = data.DepartmentId
      this.FormforInvite.depName = data.DepartmentName
      this.FormforInvite.jobId = data.CompanyJobId
      this.FormforInvite.jobName = data.CompanyJobName
      // 部门，职位
      getDeppos(this, 10, '').then(c => {
        // console.log(c)
        this.FormforInvite.depList = c
        this.Evaluation1 = 0
        this.Evaluation2 = 0
        this.Evaluation3 = 0
        this.Evaluation4 = 0

        this.VisibleForInvitePass = true
      })
    },
    submitForInvitePass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Data = {
            OrderId: this.OrderId,
            InterviewDept: this.FormforInvite.depName,
            InterviewDeptId: this.FormforInvite.depId,
            InterviewJob: this.FormforInvite.jobName,
            InterviewJobId: this.FormforInvite.jobId,
            Evaluation1: this.Evaluation1,
            Evaluation2: this.Evaluation2,
            Evaluation3: this.Evaluation3,
            Evaluation4: this.Evaluation4,
            Status: 3
          }
          // console.log(Data)
          invitentry(Data).then(c => {
            if (c.data.Code === 0) {
              this.$router.push({ path: this.fromPath })
            }
          })
        } else {

        }
      })
    },
    toM_toEntry1() {
      this.$alert(`邀请${this.ResumeBasic.Name}女士/先生登陆/<小赢计划 />平台,加入我司。`, {
        confirmButtonText: '确定'
      }).then(() => {
        // console.log(22)
        var Data = {
          OrderId: this.OrderId,
          EntryConfirm: true,
          Status: 5
        }
        entrycomplete(Data).then(c => {
          if (c.data.Code === 0) {
            this.$router.push({ path: this.fromPath })
          }
        })
      })
    },
    toM_notPass1() {
      // console.log(this.status)
      if (this.status == 1) {
        this.ToInterest()
      } else {
        this.Evaluation1 = 0
        this.Evaluation2 = 0
        this.Evaluation3 = 0
        this.Evaluation4 = 0
        this.VisibleForNO = true
      }
    },
    whyNoPassFun(val) {
      // -1:感兴趣不通过， -2:投递不通过，-3:面试不通过，-4:待录用，-5:入职不通过
      const theStatue = [-1, -2, -3, -4, -5]
      const Data = {
        OrderId: this.OrderId,
        Status: theStatue[this.status],
        Reason: this.NoWhyList[this.NoWhy] || this.otherNoWhy,
        Evaluation1: this.Evaluation1,
        Evaluation2: this.Evaluation2,
        Evaluation3: this.Evaluation3,
        Evaluation4: this.Evaluation4
      }

      resumeunpass(Data).then(c => {
        // console.log(c)
        if (c.data.Code === 0) {
          this.$router.push({ path: this.fromPath })
        }
      })
    },
    tReadForm() {

    },
    ToPdf() {
      this.$refs.resumeInfos.tpdf()
    },
    ToInterest() {
      const app = this
      if (!this.IsInterest) {
        resumeinterest(this.ResumeId, 1).then(c => {
          if (c.data.Code === 0) {
            // app.$router.push({ path: app.fromPath })
            app.IsSacn = !app.IsSacn
            app.init()
          }
        })
      } else {
        this.$confirm('此操作将取消感兴趣, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resumeinterest(this.ResumeId, 0).then(c => {
            if (c.data.Code === 0) {
              app.IsSacn = !app.IsSacn
              app.init()

              // app.$router.push({ path: app.fromPath })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消取消感兴趣'
          })
        })
      }
    },
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}

const getList = (app, resumeId, orderId, scan, isScan) => {
  resumedetail(resumeId, orderId, scan, isScan).then(c => {
    if (c.data.Code == 0) {
      app.fullscreenLoading = false
      // console.log(c.data)
      app.Data = c.data.Data.ResumeApiModel
      app.ResumeBasic = c.data.Data.ResumeApiModel.ResumeBasic
      app.TData = c.data.Data.ResumeOrderApiModel || ''
      app.IsShow = c.data.Data.ResumeApiModel.IsContact
      app.IsSend = c.data.Data.IsSend
      app.IsRefuse = c.data.Data.IsRefuse
      app.IsInterest = c.data.Data.IsInterest
    }
  })
}

const getDeppos = (app, type, parentId) => {
  return new Promise((resolve, reject) => {
    get_deppos(type, parentId).then(c => {
      if (c.data.Code == 0) {
        resolve(c.data.Data)
      }
    })
  })
}

const getInmsList = () => {
  return new Promise((resolve, reject) => {
    get_inmsList().then(c => {
      if (c.data.Code == 0) {
        resolve(c.data.Data)
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-container,.el-main{
        height: 100%;
    }
    .el-header{
        .headerRight{
            float: right;
        }
    }
    .el-main{
        padding: 0;
        .el-header{
            .el-steps{
                width: 850px;
                margin: 0 auto;
            }

        }
        .content{
            width: 750px;
            margin:0 auto;
            position: relative;
            .accessory{
                position: absolute;
            }
            .Interest{
                position: absolute;
                right: 30px;
                top: 50px;
                padding: 5px 15px 5px 30px;
                cursor: pointer;
                border-radius: 4px;
                &.hasInterested{
                  color: #f99740;
                  border: 1px solid #f99740;
                  background: url(/images/hasInterested.png) no-repeat;
                  background-position: 6px 8px;
                }
                &.wantYou{
                  color: #8a8a8a;
                  border: 1px solid #8a8a8a;
                  background: url(/images/wantYou2.png) no-repeat;
                  background-position: 6px 8px;
                }

            }
        }

    }
}

.status_0,.status_2{
  .el-radio--medium.is-bordered{
    margin: 10px;
  }
  .el-col-20{
    padding:8px 0;
  }
}

</style>

