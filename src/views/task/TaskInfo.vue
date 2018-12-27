<template>
      <el-container class="temlateMain meeting_Details" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="htmlState==0">
                <el-breadcrumb-item :to="{ path: '/task/index' }">任务管理</el-breadcrumb-item>
                <el-breadcrumb-item>任务详情</el-breadcrumb-item>
            </el-breadcrumb>
            <template v-else>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="listData.TaskType==1 && !isParter">
                      <el-breadcrumb-item :to="{ path: '/task/MyTask' }">我的任务</el-breadcrumb-item>
                      <el-breadcrumb-item>任务详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-else>
                      <el-breadcrumb-item :to="{path:'/task/MyTask', query:'{ page: public}'}">我的任务</el-breadcrumb-item>
                      <el-breadcrumb-item>任务详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
        </el-header>
        <el-main>

              <div class="baseInfo">
                            <span class="button">
                                <template v-if="htmlState==0">
                                    <el-button size="mini" type="warning" v-if="listData.TaskStatus==0||listData.TaskStatus==1" v-on:click="gotoEdit">编辑任务</el-button>
                                    <el-button size="mini" type="warning" v-if="listData.TaskStatus==2" v-on:click="AuditTask__dialogFormVisible=true">审核</el-button>
                                </template>
                                <template v-else>
                                    <el-button size="mini" type="warning" :loading="SubmitTaskAuditIfPut" v-on:click="submitTaskAudit" v-if="progressbarValue==100 && CheckTools_Progressbar">提交审核</el-button>
                                </template>
                            </span>
                            <h1 class="title">{{listData.Name}}<b class="icon"></b><b class="state" :class="setStatusColor(listData.TaskStatus)">{{ EnumTaskStatus[listData.TaskStatus]}}</b></h1>
                            <el-row class="infoRow">
                                <el-col :xs="20" :sm="18" :md="16" :lg="14" :xl="10">
                                    <el-row>
                                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3">创 建 人 ：</el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">{{listData.CreateName}}</el-col>
                                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3">紧要程度：</el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">{{ EnumImprotantDegree[listData.ImportantDegree]}}</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="infoRow">
                                <el-col :xs="20" :sm="18" :md="16" :lg="14" :xl="10">
                                    <el-row>
                                        <el-col :xs="4" :sm="3" :md="4" :lg="4" :xl="3">开始时间：</el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">{{listData.BeginTime}}</el-col>
                                        <el-col :xs="4" :sm="3" :md="4" :lg="4" :xl="3">截止时间：</el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">{{listData.EndTime}}</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="infoRow">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-row>
                                        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">任务描述：</el-col>
                                        <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="22" style="word-wrap: break-word;">{{listData.Taskdescription}}</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="otherInfo">
                            <div class="adder">
                                <div class="title">
                                    <b>参与人员</b>
                                    <span class="button">
                                        <el-button size="mini" v-if="htmlState==1 && listData.TaskType==1 && !isParter" type="warning" v-on:click="ifSureAdd">参与</el-button>
                                    </span>
                                </div>
                                <div class="peopleList">
                                    <!-- @*<div class="list addPeople" data-toggle="modal" data-target=".addCopy" v-if="!htmlState&&MyProfileId==listData.CreatorId&&(listData.Status==1||listData.Status==3)">添加人员+</div>*@ -->
                                    <ul>
                                         <!-- @*:id="!htmlState&&MyProfileId==listData.CreatorId&&listData.Status==3?'mar-50':''"*@ -->
                                        <!-- @*<li class="list lists"></li>*@
                                        @*<li class="list lists"><img class="face" src="/images/geren.png"><span  class="dep_name">sdfsdf-dfsdfds</span><b class="icon"></b> </li>*@ -->
                                        <li class="list lists" v-for="(k,v) in parterList" :key="v"><img class="face" :src="faceUrl(k.FaceUrl,40)"><span :title="k.Name" class="dep_name">{{k.JobName}}-{{k.FullName}}</span> <b class="isInCharge" v-show="k.IsInCharge"></b></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="addFiles">
                                <template class="file_Document">

                                    <el-row class="tools progressbar" :style="CheckTools_AddEvent ? 'margin-left: 34%':'margin-left: 43%'">
                                        <el-col :span="2.5" :offset="4" class="progressbar_height">任务进度：</el-col>
                                        <template v-if="CheckTools_Progressbar">
                                            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="12">
                                                <div class="block">
                                                    <el-slider v-model="progressbarValue" v-on:change="submitTaskPro(progressbarValue)" :loading="Pro_barIfput"></el-slider>
                                                </div>
                                            </el-col>
                                            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2" class="progressbar_height" style="padding-left: 2%">
                                                {{progressbarValue}}%
                                            </el-col>
                                        </template>
                                        <template v-else>
                                            <el-col :xs="12" :sm="12" :md="12" :lg="9" :xl="14">
                                                <div class="block">
                                                    <!-- @*<el-slider v-model="progressbarValue"></el-slider>*@ -->
                                                    <el-progress :percentage="progressbarValue" v-bind:class="setProgressColor(listData.TaskStatus)"></el-progress>
                                                </div>
                                            </el-col>
                                        </template>
                                        <el-col :span="1" class="progressbar_height" v-show="CheckTools_AddEvent">
                                            <el-button size="mini" v-if="true" type="warning" v-on:click="toOpenAddEventbox">添加事件</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-tabs v-model="activeName" style="position: relative; top: -35px;">
                                        <el-tab-pane label="任务事件" name="first">
                                            <div class="file_Document_content content">
                                                <el-row class="head">
                                                    <el-col :span="7">
                                                        <div class="grid-content bg-purple">任务名称</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">任务类型</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple">操作人</div>
                                                    </el-col>
                                                    <el-col :span="5">
                                                        <div class="grid-content bg-purple-light">更新时间</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">完成状态</div>
                                                    </el-col>
                                                </el-row>
                                                <div class="file_Document_body">
                                                    <el-row class="body1" v-for="k in eventResult.Events" :key="k.EventName">
                                                        <el-col :span="7">
                                                            <div class="grid-content pointer" v-on:click="toOpenEventinfo(k)">{{k.EventName}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content pointer" v-on:click="toOpenEventinfo(k)">{{EnumEventType[k.EventType]}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content pointer" v-on:click="toOpenEventinfo(k)">{{k.ModifierName}}</div>
                                                        </el-col>
                                                        <el-col :span="5">
                                                            <div class="grid-content pointer" v-on:click="toOpenEventinfo(k)">{{k.ModifiedTime}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content">
                                                                <el-checkbox v-model="k.IsComplete" :disabled="listData.TaskStatus!=1 || !isParter" v-on:change="submitEventComplete(k.EventId,k.IsComplete)"></el-checkbox>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                                <el-pagination v-on:size-change="handleEventSizeChange"
                                                               v-on:current-change="handleEventCurrentChange"
                                                               :current-page="eventResult.PageIndex"
                                                               :page-sizes="[10,25,50, 100, 150]"
                                                               :page-size="size"
                                                               layout="sizes, prev, pager, next,jumper,total"
                                                               :total="eventResult.TotalCount">
                                                </el-pagination>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="审核历史" name="second">
                                            <div class="file_Document_content content">
                                                <el-row class="head">
                                                    <el-col :span="6">
                                                        <div class="grid-content">审核时间</div>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div class="grid-content">审核意见</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content">审核结果</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content">审核人</div>
                                                    </el-col>
                                                </el-row>
                                                <div class="file_Document_body">
                                                    <el-row class="body1 pointer" v-for="k in auditRecordResult.AuditRecords" :key="k.AuditProfileName">
                                                        <el-col :span="6">
                                                            <div class="grid-content pointer" v-on:click="toOpenAuditinfo(k)">{{k.AuditTime}}</div>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <div class="grid-content pointer" v-on:click="toOpenAuditinfo(k)">{{k.AuditRemark}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content pointer" v-on:click="toOpenAuditinfo(k)">{{EnumTaskAuditStatus[k.AuditStatus]}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content pointer" v-on:click="toOpenAuditinfo(k)">{{k.AuditProfileName}}</div>
                                                        </el-col>
                                                    </el-row>
                                                </div>

                                                <el-pagination v-on:size-change="handleAuditSizeChange"
                                                               v-on:current-change="handleAuditCurrentChange"
                                                               :current-page="AuditPageIndex"
                                                               :page-sizes="[10,25,50, 100, 150]"
                                                               :page-size="Auditsize"
                                                               layout="sizes, prev, pager, next,jumper,total"
                                                               :total="auditRecordResult.TotalCount">
                                                </el-pagination>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                        </div>
        </el-main>

         <el-dialog :title="EventboxTitle" :visible.sync="AddEvent_dialogFormVisible" class="hardAndEasy" width="760px" :before-close="toClosebox">
                    <el-form :model="Eventform" :rules="EventRules" ref="ruleForm" label-width="84px" label-position="demo-ruleForm">

                        <el-form-item label="事件名称:" prop="name">
                            <el-input type="textarea" :rows="2" v-model="Eventform.name" :maxlength="50" placeholder="请输入事件名称"></el-input>
                        </el-form-item>
                        <el-form-item label="事件描述:" prop="describe">
                            <el-input type="textarea" :rows="4" v-model="Eventform.describe" :maxlength="300" placeholder="请输入事件描述"></el-input>
                        </el-form-item>
                        <el-form-item label="事件类型:" prop="type">
                            <el-select v-model="Eventform.type" placeholder="请选择事件类型">
                                <template v-for="(value, key) in EnumEventType">
                                    <el-option :label="value" :value="key" :key="key"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状 &nbsp; &nbsp;态:" prop="status">
                            <el-select v-model="Eventform.status" placeholder="请选择状态">
                                <el-option label="已完成" value="true"></el-option>
                                <el-option label="未完成" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button type="" size="small" style="margin-right:40px;" v-on:click="resetForm('ruleForm')">取 消</el-button>

                        <el-button type="warning" size="small" v-on:click="submitForm('ruleForm')" :loading="EventIfPut">保 存</el-button>
                    </div>
                </el-dialog>

                <el-dialog title="审核任务" :visible.sync="AuditTask__dialogFormVisible" class="hardAndEasy" width="760px">
                    <el-form :model="Auditform" :rules="AuditRules" ref="AuditForm" label-width="100px" label-position="demo-ruleForm">
                        <el-form-item label="审核结果:" prop="Status">
                            <el-radio v-model="Auditform.Status" label="1">通过</el-radio>
                            <el-radio v-model="Auditform.Status" label="2">不通过</el-radio>
                        </el-form-item>
                        <el-form-item label="审核意见:" prop="Contect">
                            <el-input type="textarea" :rows="6" v-model="Auditform.Contect" :maxlength="300" placeholder="请输入审核意见"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button type="" style="margin-right:40px;" v-on:click="resetForm('ruleForm')">取 消</el-button>

                        <el-button type="warning" v-on:click="submitAuditForm('AuditForm')" :loading="EventIfPut">保 存</el-button>
                    </div>
                </el-dialog>

                <el-dialog title="查看事件" :visible.sync="ShowEvent__dialogFormVisible" class="hardAndEasy ShowEventdialog" width="760px" :before-close="toClosebox">
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">事件名称：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{Eventform.name}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">事件描述：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{Eventform.describe}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">事件类型：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{EnumEventType[Eventform.type]}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">状&nbsp;&nbsp;态：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{Eventform.status=='true'?'已完成':'未完成'}}</div></el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button type="" v-on:click="ShowEvent__dialogFormVisible=false;EventId=''" :loading="EventIfPut">取 消</el-button>
                        <el-button type="warning" style="margin-right:40px;" v-on:click="toCloseEventAndOpen">编 辑</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="查看审核意见" :visible.sync="ShowAudit__dialogFormVisible" class="hardAndEasy ShowEventdialog" width="760px">
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">审核结果：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{EnumTaskAuditStatus[AuditInfo.AuditStatus]}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">审核意见：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{AuditInfo.AuditRemark}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">审核时间：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{AuditInfo.AuditTime}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content title">审核人：</div></el-col>
                        <el-col :span="21"><div class="grid-content content">{{AuditInfo.AuditProfileName}}</div></el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button type="warning" v-on:click="ShowAudit__dialogFormVisible=false;" :loading="EventIfPut">确定</el-button>
                    </div>
                </el-dialog>
    </el-container>

</template>

<script>
import {
  GetTaskDetail,
  CreateEvent,
  UpdateEvent,
  EventComplete,
  JoinTask,
  SubmitTaskAudit,
  SetSpeedOfTask,
  AuditTask,
  GetTaskAuditRecords
} from '@/api/task'
import { getToken } from '@/utils/auth'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
      TaskId: '',
      dialogVisible: false,
      listData: '', // 基本数据
      parterList: '', // 任务参与人列表
      activeName: 'first', // Tabs 标签页选中值
      htmlState: 0, // 页面导航显示，0-任务管理(发起人)，1-我的任务(负责人，参与人)
      EnumTaskStatus: {
        '0': '未开始',
        '1': '进行中',
        '2': '待审核',
        '3': '已结束'
      }, // 任务状态,0-新建、未开始，1-进行中，2-待审核，3-结束
      EnumImprotantDegree: {
        '0': '普通',
        '1': '紧急',
        '2': '重要',
        '3': '重要且紧急'
      }, // 紧要程度
      EnumTaskAuditStatus: { '1': '通过', '2': '不通过' }, // 审核状态
      EnumEventType: {
        '0': '待办',
        '1': '记录',
        '2': '汇报',
        '3': '计划',
        '4': '求助',
        '5': '其他'
      }, // 事件类型： 待办：NeedToDo=0, 记录Record=1, 汇报：Report=2 ,计划：Plan=3 , 求助SeekHelp=4 ,其他Others=5
      auditStatus: 0, // 任务审核状态,0-未提交，1-已通过，2-已拒绝
      progressbarValue: 0, // 任务进度条数值
      MyProfileId: '', // 我的ID
      isCreator: false, // 当前登陆人是否为该项目的发起人
      isInCharge: false, // 当前登陆人是否为该项目的负责人
      isParter: false, // 当前登陆人是否参与该项目

      CheckTools: false, // 进度条及添加事件按钮的显隐
      CheckTools_Progressbar: false,
      CheckTools_AddEvent: false,

      eventResult: '', // 任务事件分页列表
      auditRecordResult: '', // 任务审核历史分页列表

      // input: '',//搜索数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: -1, // 总条数
      index: 1, // 当前页
      AuditPageIndex: 1,
      size: 10, // 每页数
      Auditsize: 10,

      searchText: '', // 搜索内容
      EventModel: '',
      Eventform: {
        // 事件form,
        name: '',
        describe: '',
        type: '',
        status: ''
      },
      EventId: '', // 事件
      EventRules: {
        // 事件form的rule
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        name: [{ required: true, message: '请填写事件名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择事件类型', trigger: 'blur' }]
      },
      Auditform: {
        // 事件form,
        Status: '1',
        Contect: ''
      },
      AuditId: '', // 审核历史
      AuditRules: {
        // 事件form的rule
        Status: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ],
        Contect: [
          { required: true, message: '请填写审核意见', trigger: 'blur' }
        ]
      },
      AuditInfo: '', // 审核详情
      EventIfPut: false, // //添加事件弹框中提交按钮的loading
      SubmitTaskAuditIfPut: false, // 提交审核按钮的loading
      AuditTaskIfPut: false, // 审核按钮的loading
      AddEvent_dialogFormVisible: false, // 添加事件弹框
      AuditTask__dialogFormVisible: false, // 审核弹框
      ShowEvent__dialogFormVisible: false, // 事件详情
      ShowAudit__dialogFormVisible: false, // 审核历史详情
      centerDialogVisible: false, // 参与通知框
      Pro_barIfput: false,
      EventboxTitle: '添加事件'
    }
  },
  mounted() {
    this.init()
    getList(this.index, this.size, this)
  },
  methods: {
    init() {
      this.MyProfileId = sessionStorage.getItem('MyProfileId')
      this.htmlState = this.$route.query.htmlState
      this.TaskId = this.$route.query.id
    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatPicUrl(url, width, width)
      } else {
        return noLogo
      }
    },
    gotoEdit() {
      //   window.location.href = '/Task/NewTask?id=' + ;
      this.$router.push({
        path: '/task/EditTask',
        query: { id: this.listData.TaskId }
      })
    },
    handleAuditSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
    },
    handleAuditCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.GetTaskAuditRecords(val)
    },
    handleEventSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val
    },
    handleEventCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.GetEventList(val)
    },
    CheckIsCreator(id) {
      if (id === this.MyProfileId) {
        this.isCreator = true
      } else {
        this.isCreator = false
      }
    },
    CheckIsParter(list) {
      const $that = this
      list.forEach(function(item) {
        if (item.ProfileId == $that.MyProfileId) {
          $that.isParter = true
          $that.isInCharge = item.IsInCharge
        }
      })
    },
    toOpenAddEventbox() {
      if (this.EventId == '') {
        this.EventboxTitle = '添加事件'
        this.Eventform.name = ''
        this.Eventform.type = ''
        this.Eventform.status = ''
        this.Eventform.describe = ''
      } else {
        this.EventboxTitle = '编辑事件'
      }
      this.AddEvent_dialogFormVisible = true
    },
    toOpenEventinfo(event) {
      this.ShowEvent__dialogFormVisible = true
      this.EventId = event.EventId
      this.Eventform.name = event.EventName
      this.Eventform.describe = event.EventDesc
      this.Eventform.type = event.EventType.toString()
      this.Eventform.status = event.IsComplete.toString()
      console.log(this.Eventform)
    },
    toOpenAuditinfo(audit) {
      this.ShowAudit__dialogFormVisible = true
      this.AuditInfo = audit
      console.log(this.AuditInfo)
    },
    toCloseEventAndOpen() {
      this.toOpenAddEventbox()
      this.ShowEvent__dialogFormVisible = false
    },
    toClosebox() {
      this.EventId = ''
      this.ShowEvent__dialogFormVisible = false
      this.AddEvent_dialogFormVisible = false // 添加事件弹框
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.AddEvent_dialogFormVisible = false
      this.AddEvent_dialogFormVisible = false // 添加事件弹框
      this.AuditTask__dialogFormVisible = false // 审核弹框
      this.ShowEvent__dialogFormVisible = false // 事件详情
      this.ShowAudit__dialogFormVisible = false // 审核历史详情
      this.EventId = ''
    },
    submitForm(formName) {
      // 添加/编辑事件
      var that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
          that.EventIfPut = true
          var Data = {
            TaskEventId: that.EventId,
            TaskId: that.listData.TaskId,
            EventName: that.Eventform.name,
            EventDesc: that.Eventform.describe,
            EventType: that.Eventform.type,
            IsComplete: that.Eventform.status
          }
          console.log(Data)
          if (Data.TaskEventId == '') {
            // 新建
            CreateEvent(getToken(), Data).then(res => {
              var data = res.data
              if (data.Successful) {
                that.$message({
                  message: '提交成功',
                  type: 'success',
                  onClose: function() {
                    that.EventIfPut = false
                    that.AddEvent_dialogFormVisible = false
                    that.$refs[formName].resetFields()
                    // 列表：
                    getList(1, that.size, that)
                  }
                })
              } else {
                that.$message.error(data.Message)
                that.EventIfPut = false
              }
            })
          } else {
            // 编辑
            that.EventboxTitle = '编辑事件'
            UpdateEvent(getToken(), Data).then(res => {
              var data = res.data
              console.log(data)
              if (data.Successful) {
                that.$message({
                  message: '提交成功',
                  type: 'success',
                  onClose: function() {
                    that.EventIfPut = false
                    that.AddEvent_dialogFormVisible = false
                    that.$refs[formName].resetFields()
                    // 列表：
                    getList(1, that.size, that)
                  }
                })
              } else {
                that.$message.error(data.Message)
                that.EventIfPut = false
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitTaskAudit() {
      // 提交审核
      const that = this
      that
        .$confirm('是否提交当前任务进行审核?', '提交任务', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          that.SubmitTaskAuditIfPut = true
          SubmitTaskAudit(that.TaskId).then(res => {
            var data = res.data
            if (data.Successful) {
              that.$message({
                message: '提交成功',
                type: 'success',
                onClose: function() {
                  that.SubmitTaskAuditIfPut = false
                  // 列表：
                  getList(1, that.size, that)
                }
              })
            } else {
              that.$message.error(data.Message)
              that.SubmitTaskAuditIfPut = false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    submitAuditForm(formName) {
      // 审核任务
      var that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.EventIfPut = true

          const Data = {
            TaskId: that.listData.TaskId,
            AuditStatus: that.Auditform.Status,
            Contect: that.Auditform.Contect
          }
          console.log(Data)
          AuditTask(Data).then(res => {
            const data = res.data
            if (data.Successful) {
              that.$message({
                message: '提交成功',
                type: 'success',
                onClose: function() {
                  that.EventIfPut = false
                  that.AuditTask__dialogFormVisible = false
                  // that.$refs[formName].resetFields();
                  // 列表：
                  getList(1, that.size, that)
                }
              })
            } else {
              that.$message.error(data.Message)
              that.EventIfPut = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    AuditTask() {
      // 审核任务
      const that = this
      that.AuditTaskIfPut = true

      // $.ajax({
      //     url: '../apix/v2/task/SubmitTaskAudit?taskId=' + that.TaskId,
      //     type: "POST",
      //     success: function (data) {
      //         console.log(data);
      //         if (data.Successful) {
      //             app.$message({
      //                 message: '提交成功',
      //                 type: 'success',
      //                 onClose: function () {
      //                     that.SubmitTaskAuditIfPut = false;
      //                     //列表：
      //                     getList(1, app.size);
      //                 }
      //             });
      //         } else {
      //             app.$message.error(data.Message);
      //             that.SubmitTaskAuditIfPut = false;
      //         }
      //     }
      // });
    },
    CheckToolsEvent(list) {
      let flag = false // 判断是否有负责人
      list.forEach(function(item) {
        if (item.IsInCharge) {
          flag = flag || true
        } else {
          flag = flag || false
        }
      })
      if (flag) {
        this.CheckTools_Progressbar =
          this.htmlState == 1 &&
          this.isInCharge &&
          this.listData.TaskStatus != 2 &&
          this.listData.TaskStatus != 3
      } else {
        this.CheckTools_Progressbar =
          this.htmlState == 1 &&
          this.isParter &&
          this.listData.TaskStatus != 2 &&
          this.listData.TaskStatus != 3
      }

      this.CheckTools_AddEvent =
        this.isParter &&
        this.htmlState == 1 &&
        this.listData.TaskStatus != 2 &&
        this.listData.TaskStatus != 3
    },
    ifSureAdd() {
      // 参与
      var that = this
      this.$confirm('确认参与当前任务', '确认参与', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          JoinTask(getToken(), that.TaskId)
            .then(res => {
              var data = res.data
              if (data.Successful) {
                that.$message({
                  message: '恭喜你，成功加入此任务',
                  type: 'success'
                })
              } else {
                that.$message({
                  message: data.Message,
                  type: 'warning'
                })
              }
              that.centerDialogVisible = false
              getList(1, app.size)
            })
            .catch(() => {
              that.$message({
                message: '发生错误，请稍后重试！',
                type: 'error'
              })
              that.centerDialogVisible = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    submitEventComplete(eventid, isComplete) {
      // 修改事件是否完成
      const that = this
      EventComplete(getToken(), eventid, isComplete).then(res => {
        var data = res.data
        if (data.Successful) {
          that.$message({
            message: '设置成功',
            type: 'success',
            onClose: function() {
              // 列表：
              getList(1, that.size, that)
            }
          })
        } else {
          that.$message.error(data.Message)
          that.SubmitTaskAuditIfPut = false
        }
      })
    },
    submitTaskPro(speedPercent) {
      // 修改进度条
      const that = this
      that.Pro_barIfput = true

      SetSpeedOfTask(that.TaskId, speedPercent).then(res => {
        const data = res.data
        if (data.Successful) {
          that.$message({
            message: '设置成功',
            type: 'success',
            onClose: function() {
              // 列表：
              getList(1, that.size, that)
              that.Pro_barIfput = false
            }
          })
        } else {
          that.$message.error(data.Message)
          that.Pro_barIfput = false
        }
      })
    },
    setProgressColor(state) {
      // 任务当前状态:0未开始(#bfbfbf),1进行中(#ff9b39),2待审核(#ff9b39),3已结束(#bfbfbf)
      if (state == 1 && this.isParter) {
        return 'progress_F99740'
      } else {
        return 'progress_bfbfbf'
      }
    },
    setStatusColor(state) {
      // 任务当前状态:0未开始(#bfbfbf),1进行中(#ff9b39),2待审核(#ff9b39),3已结束(#bfbfbf)
      if (state == 2 || state == 1) {
        return 'yellow'
      } else if (state == 3) {
        return 'gary'
      } else {
        return 'green'
      }
    },
    GetEventList(index) {
      const that = this
      GetEventList(that.listData.TaskId, index, that.size)
        .then(res => {
          const data = res.data
          if (data.Successful) {
            that.eventResult = data.Data
          }
        })
        .catch(() => {
          that.fullscreenLoading = false
        })
    },
    GetTaskAuditRecords(index) {
      // /api/v2/task/GetTaskAuditRecords
      const that = this
      GetTaskAuditRecords(that.listData.TaskId, index, that.Auditsize)
        .then(res => {
          const data = res.data
          if (data.Successful) {
            that.AuditPageIndex = data.Data.PageIndex
            that.auditRecordResult = data.Data
          }
        })
        .catch(() => {
          that.fullscreenLoading = false
        })
    }
  }
}

function getList(pageIndex, pageSize, app) {
  app.listData = ''
  app.fullscreenLoading = true
  // var Data = {
  //     "pageIndex": pageIndex,
  //     "taskId": app.$router.id,
  //     "pageSize": pageSize
  // }
  // console.log(app.$router)
  GetTaskDetail(getToken(), app.$route.query.id, pageIndex, pageSize).then(
    res => {
      console.log(res)
      var data = res.data
      app.fullscreenLoading = false
      if (data.Successful) {
        console.log(data)
        app.listData = data.Data
        app.auditRecordResult = data.Data.AuditRecordResult
        app.AuditPageIndex = app.auditRecordResult.PageIndex
        app.eventResult = data.Data.EventResult
        app.parterList = data.Data.parterList
        app.progressbarValue = data.Data.SpeedPercent
        app.CheckIsCreator(data.Data.CreatorId)
        app.CheckIsParter(data.Data.parterList)
        app.CheckToolsEvent(data.Data.parterList)
        app.setProgressColor(data.Data.TaskStatus)
      }
    }
  )
}
</script>

<style scoped>
body {
  font-family: "微软雅黑";
}

.meeting_Details .navTitle {
  height: 60px;
  border-bottom: 1px solid #dedede;
  line-height: 60px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.meeting_Details .navTitle > a {
  text-decoration: none;
  color: #323232;
}

.meeting_Details .meetingContent {
  /*width:100%;*/
  overflow: auto;
}

.meeting_Details .meetingContent .contents {
  height: 900px;
  width: 100%;
  padding: 30px;
  background: #fff;
}

.meeting_Details .baseInfo {
  /*height: 225px;*/
  width: 100%;
  border: 1px solid #dedede;
  padding: 30px 30px 15px;
  overflow: hidden;
}

.color-8a {
  color: #8a8a8a;
}

.color-32 {
  color: #323232;
}

.meeting_Details .otherInfo {
  height: 582px;
  width: 100%;
  margin-top: 30px;
  position: relative;
  padding-left: 445px;
  border: #0f0;
}

.meeting_Details .adder {
  height: 100%;
  width: 414px;
  position: absolute;
  top: 0;
  left: 0;
  margin-right: 30px;
  border: 1px solid #dedede;
}

.meeting_Details .addFiles {
  height: 100%;
  width: 100%;
  /*margin-right: 695px;*/
  float: left;
  border: 1px solid #dedede;
}

.meeting_Details .baseInfo .button {
  float: right;
}

.meeting_Details .baseInfo .title > b.icon {
  width: 42px;
  height: 28px;
  background: url(/images/Task/activity.png) center no-repeat;
  margin: -3px 10px;
}

.meeting_Details .baseInfo .address_time {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

.meeting_Details .baseInfo .address > b.icon {
  width: 20px;
  height: 24px;
  background: url(/images/meeting-place.png) center no-repeat;
  margin: -3px 10px;
}

.meeting_Details .baseInfo .time > b.icon {
  width: 22px;
  height: 22px;
  background: url(/images/meeting-time.png) center no-repeat;
  margin: 0px 10px -5px 40px;
}

.meeting_Details .baseInfo .other {
  font-size: 16px;
  margin-top: 15px;
}

.meeting_Details .baseInfo .other > span {
  margin-right: 100px;
}

.icon {
  display: inline-block;
}

.meeting_Details .otherInfo .title {
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  padding: 0 20px 0 24px;
  border-bottom: 1px solid #dedede;
}

.meeting_Details .title .button {
  float: right;
  line-height: 35px;
}

.meeting_Details .peopleList {
  max-height: 540px;
}

.meeting_Details .peopleList ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.meeting_Details .peopleList .list {
  height: 60px;
  line-height: 60px;
  padding-left: 24px;
  cursor: pointer;
  font-size: 16px;
}

/*.meeting_Details .peopleList .lists:hover {
     background: #fef4eb;
     color: #f99740;
 }

 .meeting_Details .peopleList .lists:hover .op {
     border: 1px solid #dedede;
     background: url(../../images/jurisclose.png)no-repeat center;
 }*/

.meeting_Details .peopleList .addPeople {
  position: absolute;
  top: 43px;
  background: #fff;
  width: 400px;
  color: #8a8a8a;
}

.meeting_Details .peopleList .addPeople:hover {
  color: #f99740;
}

.meeting_Details .peopleList .lists .face {
  height: 40px;
  width: 40px;
  display: block;
  background: #ccc;
  float: left;
  margin: 10px 10px 0 0;
  border-radius: 50%;
}

.meeting_Details .peopleList .lists .op {
  height: 20px;
  width: 20px;
  display: block;
  float: right;
  margin: 20px 60px 0 0;
  border-radius: 50%;
}

.file_summary {
  height: 174px;
  border: 1px solid #dedede;
}

/* .file_Document {
  border: 1px solid #dedede;
  margin-top:30px;
} */

.meeting_Details .addFiles .file_Document_content div.el-row {
  text-align: center;
  height: 56px;
  line-height: 56px;
  font-size: 16px;
}

.meeting_Details .addFiles .file_Document_body {
  height: 430px;
  width: 100%;
  overflow: auto;
}

.meeting_Details .addFiles .file_Document_body_1 {
  height: 300px;
  width: 100%;
  overflow: auto;
}

.meeting_Details .addFiles .content .head {
  color: #8a8a8a;
  /*position: absolute;*/
  /*width: 610px;*/
  background: #fff;
  z-index: 99;
}

.meeting_Details .addFiles .content .head {
  color: #8a8a8a;
  background-color: #f7f7f7;
}

.downLoad_icon {
  display: block;
  height: 16px;
  width: 17px;
  margin: 20px 0 0 30px;
  cursor: pointer;
  background: url(/images/download.png) no-repeat center;
}

.dep_name {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  height: 45px;
}

#mar-50 {
  margin-top: 60px;
}

.file_Document_body .grid-content {
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*.body1:hover {
     background: #fef4eb;
     color: #f99740;
 }

 .body1:hover {
     background: #fef4eb;
     color: #f99740;
 }

 .body1:hover .downLoading {
     background: url(../../images/meetingDownload.png)center no-repeat;
     cursor: pointer;
 }*/

.inputShare {
  width: 350px;
  margin: 0 20px;
}

.meetingRoomPassWord {
  height: 30px;
  width: 30px;
  display: inline-block;
  cursor: pointer;
  background: url(/images/applyAndapproval_icon.png)-200px -305px;
  margin: 10px 10px -10px;
}

.el-input {
  width: 245px;
}

.btn-new {
  margin-top: 40px;
}

.el-message-box__btns .btn-cancel {
  margin-right: 80px;
}

.btn-sure:hover {
  background: #f99740;
  border: none;
  color: #fff;
}

.btn-sure {
  background: #f99740;
  border: none;
  color: #fff;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #f99740;
  border-color: #66b1ff;
  color: #fff;
}

/*任务样式*/

.title {
  padding-bottom: 22px;
  margin: 0;
}
/*任务状态*/
.title .state {
  font-size: 18px;
  margin-left: 22px;
}
/*任务状态-进行中、待审核、未开始、已结束*/
.yellow {
  color: #f99740;
}

.green {
  color: #76bc28;
}

.gary {
  color: #bfbfbf;
}

.red {
  color: #f54634;
}

.infoRow {
  color: #8a8a8a;
  font-size: 16px;
  margin: 10px 0;
}

.addFiles .el-tabs__nav {
  left: 20px;
}

.addFiles .el-tabs__item {
  font-size: 18px;
  font-weight: 600;
}
.addFiles .el-tabs__item:hover {
  color: #f99740;
}
.addFiles .el-tabs__item.is-active {
  color: #333;
}

.addFiles .el-tabs__active-bar {
  background: #f99740;
}

.addFiles .el-tabs__header {
  margin: 0 0 1px;
}

.addFiles .progressbar_height {
  line-height: 38px;
}

/*单选框*/
.addFiles .el-checkbox__inner:hover {
  border-color: #f99740;
}

.addFiles .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #f99740;
  border-color: #f99740;
}

.addFiles .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #edf2fc;
  border-color: #d8dce5;
}

.addFiles .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #f99740;
}

/*进度条*/
.addFiles .el-slider__button {
  width: 18px;
  height: 18px;
  border: 1px solid #f99740;
}

.addFiles .el-slider__runway {
  background-color: #dedede;
}

.addFiles .el-slider__bar {
  background-color: #f99740;
}
.progressbar {
  z-index: 99;
}
@media only screen and (min-width: 768px) {
  .progressbar {
    width: 68%;
  }
}
@media only screen and (min-width: 992px) {
  .progressbar {
    width: 68%;
  }
}
@media only screen and (min-width: 1200px) {
  .progressbar {
    width: 70%;
    margin-left: 18%;
  }

  .addFiles .el-tabs__item {
    font-size: 16px;
    font-weight: 600;
  }
}
@media only screen and (min-width: 1659px) {
  .progressbar {
    width: 90%;
  }
}
@media only screen and (min-width: 1920px) {
  .progressbar {
    width: 68%;
  }

  .el-col-xl-22 {
    margin-left: -3.2%;
  }
}

.addFiles .el-progress {
  position: relative;
  line-height: 38px;
}

.progress_F99740 .el-progress-bar__inner {
  background-color: #f99740;
}

.progress_bfbfbf .el-progress-bar__inner {
  background-color: #bfbfbf;
}
/*分页控件*/
.addFiles .el-pagination {
  float: right;
}

/*参与人*/
.peopleList .isInCharge {
  display: block;
  width: 20px;
  height: 20px;
  float: right;
  margin: 20px 30px;
  background-image: url("/images/Task/principle.png");
  background-repeat: no-repeat;
}

.ShowEventdialog .el-dialog__body {
  font-size: 16px;
}
.ShowEventdialog .el-row {
  margin: 15px 0;
}

.ShowEventdialog .title {
  color: #8a8a8a;
  padding: 0;
}

.ShowEventdialog .content {
  color: #333;
}

.el-button--primary {
  background: #f99740;
  border-color: #f99740;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #f99740;
  border-color: #f99740;
  color: #fff;
}

.el-button--primary.is-active,
.el-button--primary:active {
  background: #f99740;
  border-color: #f99740;
  color: #fff;
}

.pointer {
  cursor: pointer;
}

/*messagebox*/
.el-message-box {
  width: 480px;
}

.el-message-box__content {
  position: relative;
  color: #333;
  font-size: 16px;
  text-align: center;
  padding: 40px 15px;
}
.el-message-box__header {
  background: #dedede;
}
.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center;
}
.el-message-box__status.el-icon-warning {
  display: none;
}
.el-button--mini,
.el-button--small {
  font-size: 14px;
}
.el-message-box__btns button:nth-child(2) {
  margin-left: 90px;
}

/*.el-pagination {
    position: absolute;
    bottom: 18px;
    right: 100px;
    /*border: 1px solid #dedede;*/
/*padding: 0;
}*/

.el-pagination__total {
  float: right;
  background: #f99740;
  margin: 0;
  color: #fff;
  padding: 0 5px;
}

.el-pager li.active {
  background: #555;
  color: #fff;
}

.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: inline;
}
</style>

<style lang="scss" scoped>
// @import url(/Content/Task/TaskInfo.css);
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
  .icon {
    display: inline-block;
  }
  .color-8a {
    color: #8a8a8a;
  }

  .color-32 {
    color: #323232;
  }
  .el-main {
    height: 100%;
    overflow-x: hidden;
  }
}
</style>
