<template>
    <el-container id="NewMeetingRoom" class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
          <el-header height="50px">
             <!-- <router-link :to="{ path: 'MeetingRoomManagement' }">会议室管理</router-link> > <span>{{textL}}</span>  -->
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/meeting/MeetingRoomManagement' }">会议室管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{textL}}</el-breadcrumb-item>
            </el-breadcrumb>

        </el-header>
        <el-main>
           <div class="mainBody">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                  <el-form-item label="会议室名称：" prop="name">
                     <el-input v-model="ruleForm.name" placeholder="输入会议室名称" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="上限人数：" prop="size">
                     <el-input v-model="ruleForm.size" placeholder="输入上限人数" :maxlength="40" v-on:keyup.native="DelE()"></el-input>
                  </el-form-item>
                  <el-form-item label="使用时间：">
                    <el-col :span="11">
                        <el-form-item prop="start">
                          <el-time-select placeholder="起始时间" v-model="ruleForm.start" :picker-options="{ start: '00:00', step: '00:30', end: '23:30'}" style="width:100%;"></el-time-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style=" text-align: center;">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="end">
                         <el-time-select placeholder="结束时间" v-model="ruleForm.end" :picker-options="{start: '00:00',step: '00:30',end: '23:30',minTime: ruleForm.start}" style="width:100%;"></el-time-select>
                        </el-form-item>
                    </el-col>
                   </el-form-item>
                   <el-form-item label="上传图片：" prop="">
                         <up-load class="upload-demo" ref="upload" action="apix/file/FileUpload" :on-preview="handlePreview" :on-remove="handleRemove"
                              :limit="5" :on-exceed="handleExceed"
                              :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :file-list="fileList" :show-list-id="true" multiple :show-file-list="true"
                              :auto-upload="true">
                          <el-button type="text" style="color:#f99740;">点击上传</el-button>
                        </up-load>
                   </el-form-item>
                   <el-form-item label="其他说明：" prop="description">
                     <el-input type="textarea" v-model="ruleForm.description" placeholder="设备使用完毕后，请将设备放回原处"></el-input>
                   </el-form-item>
                   <el-form-item label="使用状态：" prop="status">
                     <el-radio-group v-model="ruleForm.status">
                         <el-radio label="1">启用</el-radio>
                         <el-radio label="2">禁用</el-radio>
                     </el-radio-group>
                   </el-form-item>
                    <el-form-item label="是否有安装电子锁：" prop="lock">
                     <el-radio-group v-model="ruleForm.lock">
                         <el-radio label="true">是</el-radio>
                         <el-radio label="false">否</el-radio>
                     </el-radio-group>
                   </el-form-item>
                  <el-form-item style="text-align: center;">
                     <el-button type="warning" @click="submitForm('ruleForm')">提 交</el-button>
                     <el-button @click="deleteRoom()" style="margin-left:100px;" v-if="isDel">删 除</el-button>
                  </el-form-item>
              </el-form>
           </div>

        </el-main>
    </el-container>
</template>

<script>
import { globalvariable } from '@/utils/globalvariable'
import * as meeting from '@/api/meeting'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import upLoad from '../../components/toUpload/'
Vue.use(upLoad)
export default {
  data() {
    return {
      textL: '新建会议室', // 标题
      isDel: false,
      listData: [], // 数据
      fullscreenLoading: true, // 加载效果状态值
      ruleForm: {
        name: '',
        size: '',
        start: '08:00',
        end: '20:00',
        status: '1',
        lock: 'true',
        description: '',
        photosId: ''
      },
      rules: {
        name: [
          { required: true, message: '会议室名称不能为空', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '上限人数不能为空', trigger: 'blur' }
        ]

      },
      fileList: [], // 文件
      fArr: []
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.GetDetails()
      this.textL = '编辑会议室'
      this.isDel = true
    } else {
      this.fullscreenLoading = false
    }
  },
  methods: {
    rowClick: function(data) {
      // 编辑页
      console.log(data.Id)
      // if (this.ifEditFun) {
      //  location.href = '/MeetingManagement/EeditorMeetingRoom?id=' + data;
      //  }
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
      this.fArr = fileList
      console.log(this.fArr)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      return true
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    GetDetails() { // 获得详情（编辑页）
      const that = this
      that.listData = []
      that.fullscreenLoading = true
      return new Promise((resolve, reject) => {
        meeting.MeetingRoomDetails(getToken(), this.$route.query.id)
          .then(response => {
            console.log('///')
            console.log(response.data.Data)
            if (response.data.successful) {
              that.fullscreenLoading = false
              that.ruleForm.name = response.data.Data.Name
              that.ruleForm.size = response.data.Data.Size
              that.ruleForm.start = response.data.Data.BeginTime
              that.ruleForm.end = response.data.Data.EndTime
              that.ruleForm.status = response.data.Data.Status + ''
              that.ruleForm.lock = response.data.Data.IsLock + ''
              that.ruleForm.description = response.data.Data.Description
              // 图片:
              var Farr = response.data.Data.RoomPhoto
              for (var i = 0; i < Farr.length; i++) {
                var arr1 = {
                  name: Farr[i].Name,
                  url: globalvariable().imgapiurl + Farr[i].Name,
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
    deleteRoom() {
      const that = this
      return new Promise((resolve, reject) => {
        meeting.DeleteMeetingRoom(getToken(), this.$route.query.id)
          .then(response => {
            console.log('/7/')
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/meeting/MeetingRoomManagement' })
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          if (this.$route.query.id) {
            var data = {
              'MeetingRoomId': this.$route.query.id,
              'Name': this.ruleForm.name,
              'Size': this.ruleForm.size,
              'Description': this.ruleForm.description,
              'Start': this.ruleForm.start,
              'End': this.ruleForm.end,
              'PhotosId': this.fArr.toString(),
              'Status': this.ruleForm.status,
              'IsAddLock': this.ruleForm.lock
            }
            this.editorRoom(data)
          } else {
            const data = {
              'Name': this.ruleForm.name,
              'Size': this.ruleForm.size,
              'Description': this.ruleForm.description,
              'Start': this.ruleForm.start,
              'End': this.ruleForm.end,
              'PhotosId': this.fArr.toString(),
              'Status': this.ruleForm.status,
              'IsAddLock': this.ruleForm.lock
            }
            this.newRoom(data)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    DelE: function() {
      this.ruleForm.size = (this.ruleForm.size).replace(/[^0-9]/ig, '')
    },
    newRoom(fData) { // 新建会议室
      console.log(fData)
      const that = this
      return new Promise((resolve, reject) => {
        meeting.CreateMeetingRoom(getToken(), fData)
          .then(response => {
            console.log('/新建/')
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '新建成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/meeting/MeetingRoomManagement' })
                }
              })
              resolve()
            } else {
              that.$message({
                message: '新建失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editorRoom(fData) { // 编辑会议室
      console.log(fData)
      const that = this
      return new Promise((resolve, reject) => {
        meeting.ModifyMeetingRoom(getToken(), fData)
          .then(response => {
            console.log('/编辑/')
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '编辑成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/meeting/MeetingRoomManagement' })
                }
              })
              resolve()
            } else {
              that.$message({
                message: '编辑失败',
                type: 'error'
              })
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
  .el-main{
      height: 100%;
      padding-top: 50px;
      .mainBody{
          width:1010px;
          margin: 0 auto;
      }
  }

}

</style>
<style>
#NewMeetingRoom label{
    font-weight: normal;
}
#NewMeetingRoom .el-form-item.is-required .el-form-item__label:before{
    color:#f99740;
}
#NewMeetingRoom .el-radio__input.is-checked .el-radio__inner{
border-color: #f99740;
    background: #f99740;
}
#NewMeetingRoom .el-radio__input.is-checked+.el-radio__label{
    color:#606266;
}
</style>

