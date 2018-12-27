<template>
    <el-container id="NewMeeting" class="temlateMain">
          <el-header height="50px">
            <span><router-link to="MyMeeting">我的会议</router-link> > </span>
            <span v-show="Adjust==='2'"><router-link to="Meeting_Details">会议详情</router-link> > </span>
            <span v-show="Adjust==='1'"><router-link to="Meeting_DraftLibrary">草稿库</router-link> > </span>
            <span v-on:click="ifNext=false">{{title_1}}</span>
        </el-header>
        <el-main>
            <!--会议情况列表-->
               <div class="getTime" v-show="ifNext">
                        <div class="getTime_nav">
                            <span class="state"><b class="getIt"></b>已选择</span>
                            <span class="state"><b class="noGet"></b>不可选</span>
                            <span class="number">
                                会议人数：<input type="number" name="name" value="" v-model="input1" min='0'/> - <input type="number" name="name" value="" v-model="input2" min='0'/>
                                <el-button type="warning" size="small" v-on:click="filtrate">筛选</el-button>
                                <el-button v-if="replace" type="warning" size="small" v-on:click="replacement">重置</el-button>
                            </span>
                            <span class="ifHasRoom"><b v-on:click="Tochecked" :class="checked?'checked':'noCheck'"></b>无需会议室</span>
                            <span class="ToGetTime">
                                选择日期
                                <span class="toLeft el-icon-arrow-left" v-on:click="toLeft"></span> <span class="time">{{todayTime}} </span><span class="toRight el-icon-arrow-right" v-on:click="toRight"></span>
                                <b class="today" v-on:click="today"></b>
                            </span>
                        </div>
                        <div class="getTime_content">
                            <div id="hasMeetingRoom" v-show="!checked">

                                <el-table border :data="RoomList" style="width: 1640px;margin:0 auto" :height="Theight">
                                    <el-table-column fixed label="会议室名称" width="150">

                                        <template slot-scope="scope">
                                            <el-popover ref="popover4"
                                                        placement="right"
                                                        width="400"
                                                        trigger="hover">
                                                <p><span style="width:100px;display:inline-block;float:left">名称</span><span style="width:250px;display:inline-block">{{RoomList[scope.$index].Room.Name}}</span></p>
                                                <p><span style="width:100px;display:inline-block">建议人数</span><span style="width:250px;display:inline-block">{{RoomList[scope.$index].Room.Size}}</span></p>
                                                <p><span style="width:100px;display:inline-block">是否有电子锁</span><span style="width:250px;display:inline-block">{{RoomList[scope.$index].Room.IsLock?'是':'否'}}</span></p>
                                                <p><span style="width:100px;display:inline-block;float:left">其他说明</span><span style="width:250px;display:inline-block">{{RoomList[scope.$index].Room.Description}}</span></p>

                                            </el-popover>
                                            <div id='theMeetingName' v-popover:popover4 :class="RoomList[scope.$index].Room.Id==timeList.ID?'theTimeAct':''"><b v-show="RoomList[scope.$index].Room.Id==timeList.ID"></b>{{RoomList[scope.$index].Room.Name}}</div>
                                        </template>
                                    </el-table-column>

                                  <el-table-column width="61" v-bind:label="v.toString()" v-for="(k,v) in 24.0" :key="k">
                                        <template slot-scope="scope">
                                            <div class="timeCol am" v-on:click="getTimes(RoomList[scope.$index].Room.Name,RoomList[scope.$index].Room.Id,v,1,scope.$index)" v-bind:class="setClass(v,1,RoomList[scope.$index].Room.Id,scope.$index)"></div>
                                            <div class="timeCol pm" v-on:click="getTimes(RoomList[scope.$index].Room.Name,RoomList[scope.$index].Room.Id,v+0.5,2,scope.$index)" v-bind:class="setClass(v+0.5,2,RoomList[scope.$index].Room.Id,scope.$index)"></div>
                                        </template>
                                    </el-table-column>

                                </el-table>

                                <p style="text-align:center;margin:15px 0">
                                     <el-button type="warning" size="medium" v-on:click="goToOne" style="margin-right:50px;">上一步</el-button>
                                    <el-button type="warning"  :loading="RoomOK" size="medium" v-on:click="ToSubmit('infoForm')">提 交</el-button>
                                </p>
                            </div>
                            <!--无需会议室-->
                            <div v-show="checked" id="noMeetingRoom">
                                <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                                    <el-form-item label="会议日期" required>
                                        <el-col :span="11">
                                            <el-form-item prop="date1">
                                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" :picker-options="pickerOptions1" style="width: 400px;"></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="起始时间" required>
                                        <el-col :span="11">
                                            <el-form-item prop="startTime">
                                                <el-time-select placeholder="起始时间"
                                                                v-model="ruleForm.startTime"
                                                                :picker-options="{
                                                                  start: '00:00',
                                                                  step: '00:30',
                                                                  end: '23:30'
                                                                }">
                                                </el-time-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="结束时间" required>
                                        <el-col :span="11">
                                            <el-form-item prop="endTime">
                                                <el-time-select placeholder="结束时间"
                                                                v-model="ruleForm.endTime"
                                                                :picker-options="{
                                                                  start: '00:00',
                                                                  step: '00:30',
                                                                  end: '23:30',
                                                                  minTime: ruleForm.startTime
                                                                }">
                                                </el-time-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="会议地点" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>

                                    <el-form-item id="">
                                        <el-button type="warning" size="medium" v-on:click="goToOne" style="margin-right:50px;">上一步</el-button>

                                        <el-button type="warning" size="medium" :loading="noRoomOK" v-on:click="submitForm('ruleForm')">提交</el-button>

                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
            <!--会议信息表单-->
                <div class="contentForm" v-show="!ifNext">
                       <el-form :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="会议主题：" prop="name">
                     <el-input v-model="infoForm.name" placeholder="输入会议主题" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="会议类型：" prop="status">
                     <el-select v-model="infoForm.status" placeholder="请选择会议类型" style="width:100%;">
                          <el-option
                            v-for="item in meetingTypeData"
                            :key="item.Id"
                            :label="item.Name"
                           :value="item.Id">
                        </el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item label="会议内容：" prop="content">
                     <el-input type="textarea" v-model="infoForm.content" placeholder="输入会议内容" maxlength="300"></el-input>
                   </el-form-item>
                   <el-form-item label="会议文件：" prop="">
                        <up-load class="upload-demo" ref="upload" action="apix/file/FileUpload" :on-preview="handlePreview" :on-remove="handleRemove"
                              :limit="20" :on-exceed="handleExceed"
                              :before-upload="beforeAvatarUpload" :on-success="handleSuccess"  :file-list="fileList" :show-list-id="true" multiple :show-file-list="true"
                              :auto-upload="true">
                          <el-button type="text" style="margin-top: 8px;color:#f99740;">点击上传</el-button>
                        </up-load>
                   </el-form-item>
                   <el-form-item label="参会人员：" prop="personnel">
                       <span class="textBtn" @click="dialogVisible=true">添加人员</span>
                       <ul class="copyList">
                           <li :id="myId">
                               <img class="img-circle" :src="getLogoFormatUrl(myHeadImg)">
                               <span>{{myName}}</span>
                           </li>
                            <li v-for="(k) in actNodeA_1" :key="k.Name" :id="k.ItemId">
                               <a @click="deleteP(k.ItemId)"></a>
                               <img class="img-circle" :src="getLogoFormatUrl(k.HeadUrl)">
                               <span>{{k.Name}}</span>
                           </li>
                           <li class="copyMore" v-if="moreV" @click="more_v = true">
                               <div></div>
                               <span style="margin-top:8px;">更多</span>
                           </li>
                       </ul>
                   </el-form-item>
                   <el-form-item label="参会人数：" prop=""><span class="textBtn" style="color:#333;">{{adderNum}}</span></el-form-item>
                   <el-form-item label="会议提醒：" prop="remind">
                        <el-select v-model="infoForm.remind" placeholder="请选择会议提醒">
                          <el-option
                            v-for="item in RemindData"
                            :key="item.RemindTime"
                            :label="item.Name"
                           :value="item.RemindTime">
                        </el-option>
                     </el-select>
                   </el-form-item>
                   <el-form-item label="其他说明：" prop="description">
                     <el-input type="textarea" v-model="infoForm.description" placeholder="输入其他说明" maxlength="300"></el-input>
                   </el-form-item>
                  <el-form-item style="text-align: center;">
                     <!--<el-button type="warning" @click="ToSubmit('infoForm')" :loading="RoomOK">提 交</el-button>-->
                     <el-button size="medium" v-on:click="saveDraft" :loading="saveDraftOK">存为草稿</el-button>
                     <el-button size="medium" type="warning" style="margin-left:40px;" v-on:click="nextStep('infoForm')">下一步</el-button>
                  </el-form-item>
              </el-form>

                </div>

         <dep-choise  :visible.sync="dialogVisible" :actlist="TactList" title="选择参会人"  :people="true" :checkbox="true"  v-on:act-node="actNode"></dep-choise>
         <el-dialog title="更多" :visible.sync="more_v">
               <ul class="copyList" style="padding-top:20px;width:750px;">
                           <li :id="myId">
                               <img class="img-circle" :src="getLogoFormatUrl(myHeadImg)">
                               <span>{{myName}}</span>
                           </li>
                            <li v-for="(k) in actNodeA" :key="k.Name" :id="k.ItemId">
                               <a @click="deleteP(k.ItemId)"></a>
                               <img class="img-circle" :src="getLogoFormatUrl(k.HeadUrl)">
                               <span>{{k.Name}}</span>
                           </li>
                       </ul>
         </el-dialog>

        </el-main>
    </el-container>
</template>

<script>
import { globalvariable } from '@/utils/globalvariable'
import * as meeting from '@/api/meeting'
import { getToken } from '@/utils/auth'
import depChoise from '../../components/dialogDep/src/component'
import urlUtil from '@/utils/urlUtil'
import Vue from 'vue'
import upLoad from '../../components/toUpload/'
Vue.use(upLoad)

export default {
  components: {
    depChoise
  },
  data() {
    return {
      ifNext: false,
      otherContent: '', // 其他说明
      adderNum: 1, // 参会人数
      meetingContent: '', // 会议内容
      meetingTitle: '', // 会议主题
      dialogVisible: false,
      Theight: '600',
      checked: false, // 是否需要会议室
      input1: '',
      input2: '',
      todayTime: getNowFormatDate(0),
      toNUm: 0,

      MeetingId: '', // 会议ID
      Adjust: 0, // 编辑分类1:草稿库；2：会议调整
      title_1: '新建',
      replace: false, // 重置按钮

      noMeetingRoomPass: false, // 无会议室 提交状态
      RoomList: [], // 会议室列表

      saveDraftOK: false, // 按钮--保存草稿
      noRoomOK: false, // 按钮--无会议室
      RoomOK: false, // 按钮--会议室

      StartTime: '',
      EndTime: '',

      ruleForm: {
        date1: '',
        name: '',
        endTime: '',
        startTime: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      // 无会议室报错-规则
      rules2: {
        name: [
          { required: true, message: '请输入会议地点', trigger: 'blur' },
          { max: 400, message: '长度在 400个字符以内', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择会议日期', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择会议开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择会议结束时间', trigger: 'change' }
        ]
      },
      MeetingRoomId: '',
      MeetingRoomName: '',

      timeList: {
        getNum: [],
        ID: '', // 当前会议室id
        item: ''
      },
      actIndex: 2, // 选中的index

      fullscreenLoading: true,
      // 新建
      infoForm: {
        name: '',
        status: '',
        content: '',
        remind: 30,
        description: '',
        personnel: '1'
      },
      infoRules: {
        name: [
          { required: true, message: '会议主题不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择会议类型', trigger: 'change' }
        ],
        personnel: [
          { required: true }
        ]
      },
      RemindData: [], // 提醒时间
      meetingTypeData: [], // 会议类型
      // 选择参会人员
      // dialogVisible: false,
      TactList: [], // 选中id数组
      actNodeA: [], // 选中人的基本信息
      myId: '', // 自己的id
      myHeadImg: '', // 自己头像
      myName: '', // 自己名字
      actNodeA_1: [], // 页面显示数组
      moreV: false, // 更多显示
      more_v: false, // 更多弹窗
      fileList: [], // 文件
      fArr: []
      //* ********* */
    }
  },
  mounted() {
    // 链接数据:
    this.MeetingId = this.$route.query.id
    this.Adjust = this.$route.query.Adjust + ''
    if (this.Adjust == '1') {
      this.title_1 = '草稿'
    } else if (this.Adjust == '2') {
      this.title_1 = '会议调整'
    }
    getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
    applyLoading(this)
    GetMeetingRemind(this)
    this.TactList = [sessionStorage.getItem('MyProfileId')]
    this.myId = sessionStorage.getItem('MyProfileId')
    this.myHeadImg = sessionStorage.getItem('MyFaceUrl')
    this.myName = sessionStorage.getItem('Nick')
  },
  methods: {
    // 获取会议详情：
    MeetingDetails() {
      const that = this
      return new Promise((resolve, reject) => {
        meeting.share_meeting(this.MeetingId)
          .then(response => {
            console.log('/6/')
            console.log(response.data)
            if (response.data.successful) {
              var DetailsData = response.data.Data
              // 基本信息
              that.infoForm.name = DetailsData.Meeting.Title
              that.infoForm.status = DetailsData.Meeting.MeetingTypeId
              that.infoForm.content = DetailsData.Meeting.MeetingContent
              that.adderNum = DetailsData.Meeting.NumOfPerson
              that.infoForm.remind = DetailsData.Meeting.RemindTime
              that.infoForm.description = DetailsData.Meeting.Remark
              // 参与人

              for (let i = 0; i < DetailsData.MeetingMemberList.length; i++) {
                that.TactList.push(DetailsData.MeetingMemberList[i].ProfileId)
                var arr = {
                  HeadUrl: DetailsData.MeetingMemberList[i].FaceUrl,
                  ItemId: DetailsData.MeetingMemberList[i].ProfileId,
                  Name: DetailsData.MeetingMemberList[i].Name
                }
                that.actNodeA.push(arr)
                if (!DetailsData.MeetingMemberList[i].IsCreator) {
                  that.actNodeA_1.push(arr)
                }
              }
              console.log(that.actNodeA_1, that.TactList, that.actNodeA)
              // 文件
              var Farr = DetailsData.MeetingDocument.MDAM.Files
              for (let i = 0; i < Farr.length; i++) {
                var arr1 = {
                  name: Farr[i].FileName,
                  url: globalvariable().bigfileurl + Farr[i].URL,
                  id: Farr[i].Id
                }
                this.fileList.push(arr1)
              }
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 文件：
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // console.log(fileList);
      this.fArr = []
      for (var i = 0; i < fileList.length; i++) {
        if (!fileList[i].hasOwnProperty('percentage')) {
          this.fArr.push(fileList[i].id)
        } else {
          this.fArr.push(fileList[i].response.ID)
        }
      }
      console.log(this.fArr)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      //  console.log(response);
      //  console.log(response,file,fileList);
      //  console.log(response,file,fileList);
      //  console.log(fileList1);
      this.fArr = fileList
      console.log(this.fArr)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      return true
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 删除人员
    deleteP(id) {
      console.log(id)
      this.TactList = [this.myId]
      this.actNodeA_1 = []
      var arr = []
      for (var i = 0; i < this.actNodeA.length; i++) {
        if (this.actNodeA[i].ItemId != id && this.actNodeA[i].ItemId != this.myId) {
          this.TactList.push(this.actNodeA[i].ItemId)
          arr.push(this.actNodeA[i])
          if (this.actNodeA_1.length < 9) {
            this.actNodeA_1.push(this.actNodeA[i])
          }
        }
      }
      if (this.TactList.length > 10) {
        this.moreV = true
      } else {
        this.moreV = false
      }
      this.actNodeA = arr
      this.adderNum = this.TactList.length
    },
    actNode(data) { // 渲染人员
      this.actNodeA = []
      this.actNodeA_1 = []
      this.TactList = [this.myId]// 初始化
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].ItemId != this.myId) {
          this.TactList.push(data[i].ItemId)
          this.actNodeA.push(data[i])
          if (this.actNodeA_1.length < 9) {
            this.actNodeA_1.push(data[i])
          }
        }
      }
      if (this.TactList.length > 10) {
        this.moreV = true
      } else {
        this.moreV = false
      }
      this.adderNum = this.TactList.length
      console.log(this.TactList)
      console.log(this.actNodeA)
      console.log(this.actNodeA_1)
    },
    // 头像图片
    getLogoFormatUrl(src) {
      if (src) {
        return urlUtil.formatPicUrl(
          src,
          42,
          42
        )
      } else {
        return ''
      }
    },
    rowClick: function(data) {
      // 编辑页
      console.log(data.Id)
      // if (this.ifEditFun) {
      //  location.href = '/MeetingManagement/EeditorMeetingRoom?id=' + data;
      //  }
    },
    nextStep(infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          this.ifNext = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    backF() {
      this.ifNext = false
    },
    goToOne() {
      this.ifNext = false
      this.checked = false
      setTimeout(function() {
        // $(document).find('.scroll').niceScroll().resize()
        // $(".scroll .contentForm").scrollTop(100);
      }, 500)
    },
    Tochecked() {
      this.checked = !this.checked
    },
    toRight() {
      if (this.toNUm < 7) {
        this.toNUm += 1
        this.todayTime = getNowFormatDate(this.toNUm)
      }
      getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
    },
    toLeft() {
      if (this.toNUm > 0) {
        this.toNUm -= 1
        this.todayTime = getNowFormatDate(this.toNUm)
      }
      getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
    },
    today() {
      this.toNUm = 0
      this.todayTime = getNowFormatDate(0)
      getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
    },
    // 存草稿
    saveDraft() {
      if (this.Adjust == 2) {
        this.MeetingId = ''
      }
      var Data = {
        MeetingId: this.MeetingId,
        Remark: this.infoForm.description, // 其他说明
        NumOfPerson: this.adderNum, // 参会人数
        MeetingContent: this.infoForm.content, // 会议内容
        Title: this.infoForm.name, // 会议主题
        MeetingTypeId: this.infoForm.status, // 会议类型
        RemindTime: this.infoForm.remind,
        ProfileIds: this.TactList,
        FileIDs: (this.fArr).toString()
      }
      if (Data.MeetingContent && Data.Title && Data.MeetingTypeId != '0' && Data.ProfileIds) {
        this.saveDraftOK = true
        console.log(Data)
        const that = this
        return new Promise((resolve, reject) => {
          meeting.CreateDraftMeeting(getToken(), Data)
            .then(response => {
              console.log('///')
              console.log(response.data)
              if (response.data.successful) {
                that.$message({
                  message: '提交成功',
                  type: 'success',
                  onClose: function() {
                    that.saveDraftOK = false
                    that.$router.push({ path: '/meeting/Meeting_DraftLibrary' })
                  }
                })

                resolve()
              } else {
                that.$message({
                  message: '提交失败',
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      } else {
        if (!Data.Title) {
          $('.title_wrong').text('会议主题不能为空')
        } else if (Data.MeetingTypeId == '0') {
          $('.type_wrong').text('会议类型不能为空')
        } else if (!Data.MeetingContent) {
          $('.meetingContent_wrong').text('会议内容不能为空')
        } else if (!Data.ProfileIds) {
          $('.people_wrong').text('参会人数不能为空')
        }
        // this.$message.error('带*的必填项，请务必填写完整！');
      }
    },
    // 筛选
    filtrate() {
      getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
      if (this.input1 && this.input2) {
        this.replace = true
      }
    },
    // 重置
    replacement() {
      this.input1 = ''
      this.input2 = ''
      getMeetingRoomList(this.todayTime, this.input1, this.input2, this)
      this.replace = false
    },
    // 无会议室--提交
    submitForm(formName) {
      Date.prototype.format = function(format) {
        var date = {
          'M+': this.getMonth() + 1,
          'd+': this.getDate(),
          'h+': this.getHours(),
          'm+': this.getMinutes(),
          's+': this.getSeconds(),
          'q+': Math.floor((this.getMonth() + 3) / 3),
          'S+': this.getMilliseconds()
        }
        if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in date) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
              ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
          }
        }
        return format
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.Adjust == 2) {
            this.MeetingId = ''
          }
          var Data = {
            MeetingId: this.MeetingId,
            Remark: this.infoForm.description, // 其他说明
            NumOfPerson: this.adderNum, // 参会人数
            MeetingContent: this.infoForm.content, // 会议内容
            Title: this.infoForm.name, // 会议主题
            MeetingTypeId: this.infoForm.status, // 会议类型
            RemindTime: this.infoForm.remind,
            ProfileIds: this.TactList,
            FileIDs: (this.fArr).toString()
          }

          var data = (this.ruleForm.date1).format('yyyy-MM-dd')
          Data.StartTime = data + ' ' + this.ruleForm.startTime + ':00'
          Data.EndTime = data + ' ' + this.ruleForm.endTime + ':00'
          Data.MeetingAddress = this.ruleForm.name

          console.log(Data)
          this.noRoomOK = true
          const that = this
          return new Promise((resolve, reject) => {
            meeting.CreateMeeting(getToken(), Data)
              .then(response => {
                console.log('///')
                console.log(response.data)
                if (response.data.successful) {
                  that.$message({
                    message: '提交成功',
                    type: 'success',
                    onClose: function() {
                      that.noRoomOK = false
                      that.$router.push({ path: '/meeting/MyMeeting' })
                    }
                  })

                  resolve()
                } else {
                  that.$message({
                    message: '提交失败',
                    type: 'error'
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新建有会议室
    ToSubmit(infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          if (this.Adjust == 2) {
            this.MeetingId = ''
          }
          var Data = {
            MeetingId: this.MeetingId,
            Remark: this.infoForm.description, // 其他说明
            NumOfPerson: this.adderNum, // 参会人数
            MeetingContent: this.infoForm.content, // 会议内容
            Title: this.infoForm.name, // 会议主题
            MeetingTypeId: this.infoForm.status, // 会议类型
            RemindTime: this.infoForm.remind,
            ProfileIds: this.TactList,
            FileIDs: (this.fArr).toString()
          }
          var data = this.todayTime

          this.timeList.getNum = this.timeList.getNum.sort(this.sortNumber)

          Data.StartTime = data + ' ' + getTiime(this.timeList.getNum[0]) + ':00'

          Data.EndTime = (data + ' ' + getTiime((this.timeList.getNum[1] || this.timeList.getNum[0]) + 0.5)) + ':00'

          Data.MeetingRoomId = this.timeList.ID

          Data.MeetingAddress = this.MeetingAddress
          //* *********************************************** */
          console.log(this.infoForm)
          console.log(Data)
          this.RoomOK = true

          const that = this
          return new Promise((resolve, reject) => {
            meeting.CreateMeeting(getToken(), Data)
              .then(response => {
                console.log('///')
                console.log(response.data)
                if (response.data.successful) {
                  that.$message({
                    message: '提交成功',
                    type: 'success',
                    onClose: function() {
                      that.RoomOK = false
                      that.$router.push({ path: '/meeting/MyMeeting' })
                    }
                  })

                  resolve()
                } else {
                  that.$message({
                    message: '提交失败',
                    type: 'error'
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sortNumber: function(a, b) {
      return a - b
    },
    getTimes(name, id, item, n, m) {
      this.MeetingAddress = name
      console.log(name)
      var time1 = (parseInt(item) + '').length > 1 ? (parseInt(item) + '') : '0' + (parseInt(item) + '')

      var theTime = ''
      if (n == 2) {
        theTime = time1 + ':30'
      } else {
        theTime = time1 + ':00'
      }
      var times = (this.RoomList)[m]
      var isTimes = (this.RoomList[m].Time.Times).indexOf(theTime)
      if (isTimes >= 0) {
        return 'canNotGet'
      } else {
        if (this.timeList.getNum.length >= 2 || id != this.timeList.ID) {
          this.timeList.getNum = []

          this.timeList.getNum.push(item)
        } else {
          this.timeList.getNum.push(item)
        }
        this.timeList.ID = id
      }
      if (this.timeList.getNum.length == 2) {
        if (item > this.timeList.getNum[0]) {
          for (let i = this.timeList.getNum[0] * 10; i <= item * 10; i += 5) {
            // console.log(i / 10)

            if ((this.RoomList[m].Time.Times).indexOf(getTiime(i / 10)) >= 0) {
              this.timeList.getNum = []
              app.$message({
                message: '当前时间段内有不能选择的！',
                type: 'warning'
              })
            } else {
              // this.timeList.getNum.push(item)
            }
          }
        } else {
          for (let i = item * 10; i <= this.timeList.getNum[0] * 10; i += 5) {
            // console.log(i / 10)

            if ((this.RoomList[m].Time.Times).indexOf(getTiime(i / 10)) >= 0) {
              this.timeList.getNum = []
              app.$message({
                message: '当前时间段内有不能选择的！',
                type: 'warning'
              })
            } else {
              // this.timeList.getNum.push(item)
            }
          }
        }
      }

      // this.timeList.key = k;
      // console.info(this.timeList.getNum)
    },
    setClass(item, n, id, m) {
      // console.log(item, n, id, m)
      if (this.timeList.ID == id) {
        if (this.timeList.getNum.length == 2) {
          if (this.timeList.getNum[0] <= item && item <= this.timeList.getNum[1]) {
            return 'getIt'
          } else if (this.timeList.getNum[1] <= item && item <= this.timeList.getNum[0]) {
            return 'getIt'
          }
        } else {
          if (this.timeList.getNum[0] == item) {
            return 'getIt'
          }
        }
      }

      var time1 = (parseInt(item) + '').length > 1 ? (parseInt(item) + '') : '0' + (parseInt(item) + '')

      var theTime = ''
      if (n == 2) {
        theTime = time1 + ':30'
      } else {
        theTime = time1 + ':00'
      }
      var times = (this.RoomList)[m]
      var isTimes = (this.RoomList[m].Time.Times).indexOf(theTime)
      if (isTimes >= 0) {
        return 'canNotGet'
      }
    }

  }
}

function getMeetingRoomList(theDate, mixsize, maxsize, that) {
  that.RoomList = []
  that.fullscreenLoading = true
  mixsize = mixsize || -1
  maxsize = maxsize || -1
  return new Promise((resolve, reject) => {
    meeting.used_times_list(getToken(), theDate, mixsize, maxsize)
      .then(response => {
        console.log('///')
        console.log(response.data)
        if (response.data.Successful) {
          that.fullscreenLoading = false
          that.RoomList = response.data.Data
          console.log(that.RoomList)
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

function applyLoading(that) {
  // 会议类型：
  return new Promise((resolve, reject) => {
    meeting.GetMeetingType(getToken(), 2)
      .then(response => {
        console.log('///')
        console.log(response.data)
        if (response.data.successful) {
          that.meetingTypeData = response.data.Data
          if (that.MeetingId) { // 会议详情
            that.MeetingDetails()
          }
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })

  //* *****************
}
function GetMeetingRemind(that) {
  // 会议提醒
  return new Promise((resolve, reject) => {
    meeting.GetMeetingRemind(getToken())
      .then(response => {
        console.log('/5/')
        console.log(response.data)
        if (response.data.successful) {
          that.RemindData = response.data.Data
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
function getTiime(datas) {
  var tdata = datas + ''
  var tdata1 = tdata.split('.')[0].length > 1 ? tdata.split('.')[0] : '0' + tdata.split('.')[0]
  if (tdata.split('.')[1]) {
    const tdata2 = '30'
  } else {
    const tdata2 = '00'
  }
  return tdata1 + ':' + tdata2
}

function getNowFormatDate(n) {
  var curDate = new Date()
  var date = new Date(curDate.getTime() + n * 24 * 60 * 60 * 1000)
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

function getMeetingRoomInfo() {
  var Data = {
    Remark: app.otherContent, // 其他说明
    // NumOfPerson: $('#attend-number').val(),//参会人数
    MeetingContent: app.meetingContent, // 会议内容
    Title: app.meetingTitle // 会议主题
  }
  if ($('#selectmenu').next().find('.ui-selectmenu-text').html() == '选择会议类型') {
    Data.MeetingTypeId = ''
  } else {
    Data.MeetingTypeId = $('#selectmenu').val()
  }

  Data.RemindTime = $('#select-time').val()

  // 参会人员：
  Data.ProfileIds
  if ($('.cope-popup ul li').length == 0) {
    Data.ProfileIds = null
  } else {
    Data.ProfileIds = []
    for (var j = 0; j < $('.cope-popup ul li').length; j++) {
      Data.ProfileIds.push($('.cope-popup ul li')[j].id)
    }
  }
  Data.NumOfPerson = $('.cope-popup ul li').length
  // 已有文件：
  var fileIdA = []
  for (let d = 0; d < $('#existFiles .fileId').length; d++) {
    fileIdA.push($('#existFiles .fileId')[d].id)
  }
  var imgIdA = []
  for (let d = 0; d < $('#existFiles .imgId').length; d++) {
    imgIdA.push($('#existFiles .imgId')[d].id)
  }
  var videoIdA = []
  for (let d = 0; d < $('#existFiles .videoId').length; d++) {
    videoIdA.push($('#existFiles .videoId')[d].id)
  }
  Data.FileIDs = (fileIdA.concat(fileArr)).toString()
  // Data.photoIDs = (imgIdA.concat(photoArr)).toString();
  // Data.videoIDs = videoIdA.toString();

  return Data
}
</script>

<style lang="scss" scoped>
.temlateMain {
    .el-header span{
        font-size: 16px;
        color:#333;
        font-weight: bold;
        i{
            font-weight: normal;
        }
    }
  .el-main{
      height: 100%;
      padding: 0;

  }

}
.contentForm{
    width:1010px;
    margin: 0 auto;
    padding-top: 35px;
}
.textBtn{
    color:#f99740;
    cursor: pointer;
    display: inline-block;
    height:48px;
    line-height: 48px;
}
</style>
<style lang="scss">
/*addMeeting*/
#NewMeeting{
    .copyList {
    width: 900px;
    list-style: none;
    padding-left: 0;
    margin: 0;
}

    .copyList li {
        width: 80px;
        height: 90px;
        float: left;
        text-align: center;
        color: #323232;
        position: relative;
    }

    .copyList img {
        width: 50px;
        height: 50px;
        border-radius:50%;
    }

    .copyList span {
        display: inline-block;
        width: 65px;
        height:24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .copyList a {
        width: 15px;
        height: 15px;
        position: absolute;
        z-index: 1;
        top: 5px;
        right: 12px;
        cursor: pointer;
        background: url("/images/sprite.png") no-repeat -128px -335px;
    }

.copyList .copyMore div {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    margin-top: 5px;
    cursor: pointer;
    background: url("/images/apply_more.png") no-repeat;
}
 .el-form-item.is-required .el-form-item__label:before{
    color:#f99740;
}

    .el-input--medium .el-input__inner{
        height:48px;
        line-height: 48px;
    }
   .getTime_nav {
    height: 74px;
    line-height: 74px;
    padding: 0 20px;
    font-size: 18px;
}

    .getTime_nav span.state {
        color: #333;
        width: 110px;
        display: inline-block;
    }

    .getTime_nav .getIt {
        height: 14px;
        width: 14px;
        display: block;
        background: #f99740;
        float: left;
        border-radius: 50%;
        margin: 30px 10px 0 0
    }

    .getTime_nav .noGet {
        height: 14px;
        width: 14px;
        display: block;
        float: left;
        border-radius: 50%;
        background: #dedede;
        margin: 30px 10px 0 0
    }

    .getTime_nav .number input {
        height: 26px;
        width: 60px;
        border-radius: 2px;
        border: 1px solid #dedede;
        padding-left: 5px;
        font-size: 12px;
    }

    .getTime_nav .number button {
        height: 28px;
        width: 60px;
        font-size: 16px;
        margin-left: 5px;
        line-height: 8px;
    }

    .getTime_nav .el-checkbox {
        margin-left: 40px;
    }

        .getTime_nav .el-checkbox.el-checkbox__label {
            font-size: 18px;
        }

    .getTime_nav .ToGetTime {
        width: 265px;
        float: right;
    }

    .getTime_nav .today {
        width: 30px;
        height: 30px;
        display: inline-block;
        float: right;
        margin-top: 20px;
        /*margin-right: 20px;*/
        cursor: pointer;
        background: url(/images/meetingToday.png)no-repeat center;
    }

.toLeft, .toRight {
    cursor: pointer;
}

.ifHasRoom {
    width: 80px;
    margin-left: 10px;
}

    .ifHasRoom b {
        width: 16px;
        height: 16px;
        display: inline-block;
        cursor: pointer;
        margin-right: 4px;
        margin-top: 5px;
    }

        .ifHasRoom b.checked {
            background: url(/images/room_tick.png)no-repeat center;
        }

        .ifHasRoom b.noCheck {
            background: url(/images/room_choose.png)no-repeat center;
        }

.getTime {
    position: relative;
    height: 100%;
}
#noMeetingRoom {
    width: 500px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

    #noMeetingRoom input {
        width: 400px;
        height: 48px;
    }
.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;

    line-height: 48px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #8a8a8a;
    font-family: "微软雅黑";
    font-weight: normal;
}
    #noMeetingRoom .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 400px;
    }

    #noMeetingRoom button {
        margin-left: 30px;
        margin-top: 60px;
    }

#hasMeetingRoom {
    margin: 0 auto;
}

    #hasMeetingRoom .timeCol {
        height: 60px;
        width: 30px;
        /*float: left;*/
        cursor: pointer;
    }

    #hasMeetingRoom .am {
        width:30px;
        border-right: 1px dashed #8a8a8a;
        float: left;
    }
    #hasMeetingRoom .pm {
        float: right;
    }

    #hasMeetingRoom .el-table td, .el-table th {
        padding: 0;
        margin: 0;
        height: 60px;
    }

    #hasMeetingRoom .el-table .cell {
        padding: 0;
        margin: 0;

    }
    #hasMeetingRoom .el-table tbody .cell {
        width: 60px;
    }
    #hasMeetingRoom .el-table .el-table_1_column_1 .cell {
        width: 150px;
    }

#hasMeetingRoom .el-table td, .el-table th.is-leaf {
    border-left: 1px solid #8a8a8a;
    border-right: 1px solid #8a8a8a;
    border-bottom: 1px solid #8a8a8a;
    text-align: center;
}

    #hasMeetingRoom .thead .el-table td, .el-table th.is-leaf {
        border-top: 1px solid #8a8a8a;
        text-align: center;
        background: #eee;
        /*border-bottom-color: #fff;*/
    }

.gutter {
    width: 17px;
}

.getIt {
    background: #f99740;
}

.canNotGet {
    background: #dedede;
    cursor: default;
}

#hasMeetingRoom .hover-row .el-table_1_column_1:hover {
    background: #eee;
    color: #f99740;
    cursor: pointer;
}

.el-table__row:hover {
    /*background:#ccc;*/
}

#hasMeetingRoom .hover-row td {
    background: #fff;
}

#theMeetingName {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

    #theMeetingName b {
        background: #fff;
        width: 10px;
        height: 60px;
        float: left;
        display: block;
    }

    #theMeetingName.theTimeAct {
        color: #F99740;
    }

        #theMeetingName.theTimeAct b {
            background: #F99740;
        }

.listConten tbody tr {
    cursor: pointer;
}

#addMeeting .el-dialog {
    height: 70%;
    overflow-y:hidden;
}

.el-table--border .has-gutter td:nth-last-of-type(2), .el-table--border .has-gutter th:nth-last-of-type(2) {
     border-right: 1px solid #8a8a8a;
}
  #hasMeetingRoom tbody td ,#hasMeetingRoom tbody .cell{
    padding: 0;
  }
  #hasMeetingRoom .cell{
      text-align: center;
  }
}

</style>

