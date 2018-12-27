<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/announcement/index' }">公告</el-breadcrumb-item>
                <el-breadcrumb-item>{{titleName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main id="announcement">
            <div class="mainBody">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="公告标题：" prop="Title">
                     <el-input v-model="ruleForm.Title" placeholder="输入公告标题" :maxlength="120"></el-input>
                  </el-form-item>
                  <el-form-item label="公告类型：" prop="Type">
                     <el-select v-model="ruleForm.Type" placeholder="请选择公告类型" style="width:100%" v-on:change="selectGet">
                        <el-option v-for="item in typeData" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item label="公告内容：" prop="Detail">
                     <el-input type="textarea" v-model="ruleForm.Detail" placeholder="请输入公告内容" :maxlength="4000"></el-input>
                  </el-form-item>
                  <el-form-item label="公告附件：" prop="">
                         <up-load class="upload-demo" ref="upload" action="apix/file/FileUpload" :on-preview="handlePreview" :on-remove="handleRemove"
                              :limit="4" :on-exceed="handleExceed"
                              :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :file-list="fileList" :show-list-id="false" multiple :show-file-list="true"
                              :auto-upload="true">
                          <el-button type="text" style="color:#f99740;">点击上传</el-button>
                        </up-load>
                   </el-form-item>
                  <el-form-item style="text-align: center;">
                     <el-button type="" @click="draftBtn()">存为草稿</el-button>
                     <el-button style="margin-left:100px;" type="warning" @click="submitForm('ruleForm')">提 交</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import { getFileType } from '@/utils/fileType'
import * as announcement from '@/api/announcement'
import Vue from 'vue'
import upLoad from '../../components/toUpload/'
Vue.use(upLoad)
export default {
  components: {

  },
  data() {
    return {
      typeData: [],
      fullscreenLoading: true, // 加载效果状态值
      newId: '', // 正常ID
      draftId: '', // 草稿ID
      modelData: [], // 提交数据
      TypeName: '', // 类型名称
      titleName: '新建公告',
      ruleForm: {
        Title: '',
        Type: '',
        Detail: ''
      },
      rules: {
        Title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '公告类型不能为空', trigger: 'change' }
        ],
        Detail: [
          { required: true, message: '公告内容不能为空', trigger: 'blur' }
        ]
      },
      fileList: [], // 文件
      fArr: []
    }
  },
  mounted() {
    console.log(this.$route.query.editorId)
    console.log(this.$route.query.draftId)
    if (this.$route.query.editorId != undefined) { // 公告编辑
      this.newId = this.$route.query.editorId
      this.draftId = ''
      this.Get_detail(this.$route.query.editorId)
      this.titleName = '修改公告'
    }
    if (this.$route.query.draftId != undefined) { // 草稿编辑
      this.newId = this.$route.query.draftId
      this.draftId = this.$route.query.draftId
      this.Get_detail(this.$route.query.draftId)
      this.titleName = '修改公告'
    }
    if (this.$route.query.draftId == undefined && this.$route.query.editorId == undefined) {
      this.fullscreenLoading = false
    }
    this.Get_type()
  },
  watch: {

  },
  methods: {
    // 获取公告详情
    Get_detail(ID) {
      const that = this
      return new Promise((resolve, reject) => {
        announcement.Get_detail(getToken(), ID)
          .then(response => {
            console.log('///')
            console.log(response.data.Data)
            if (response.data.Successful) {
              that.ruleForm.Title = response.data.Data.Title
              that.ruleForm.Type = response.data.Data.TypeId
              that.ruleForm.Detail = response.data.Data.Detail
              that.TypeName = response.data.Data.TypeName
              // 处理文件
              // 文件:
              var Farr = response.data.Data.NoticeFiles
              for (var i = 0; i < Farr.length; i++) {
                var arr1 = {
                  name: Farr[i].FileName,
                  url: Farr[i].SaveUrl,
                  id: Farr[i].DocuId,
                  response: {
                    ID: Farr[i].DocuId
                  }
                }
                this.fileList.push(arr1)
              }
              // 图片
              var ImgArr = response.data.Data.NoticePhotos
              for (var j = 0; j < ImgArr.length; j++) {
                var arr2 = {
                  name: ImgArr[j].FileName,
                  url: ImgArr[j].SaveUrl,
                  id: ImgArr[j].DocuId,
                  response: {
                    ID: ImgArr[j].DocuId
                  }
                }
                this.fileList.push(arr2)
              }
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取类型名称
    selectGet(vId) {
      let obj = {}
      obj = this.typeData.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.Id === vId // 筛选出匹配数据
      })
      console.log(obj.Name)// 我这边的name就是对应label的
      this.TypeName = obj.Name
    },
    // 新建
    Add_update() {
      const that = this
      return new Promise((resolve, reject) => {
        announcement.Add_update(getToken(), that.modelData)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                  if (that.modelData.Status == 1) { // 正常
                    that.$router.push({ path: '/announcement/index' })
                  } else if (that.modelData.Status == 0) { // 草稿
                    that.$router.push({ path: '/announcement/DraftLibrary' })
                  }
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
    // 保存公告
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          const FilesId = [], PhotosId = []
          for (var i = 0; i < this.fArr.length; i++) {
            console.log(getFileType(this.fArr[i].name))
            if (getFileType(this.fArr[i].name) == 'img') {
              PhotosId.push(this.fArr[i].response.ID)
            } else {
              FilesId.push(this.fArr[i].response.ID)
            }
          }
          this.modelData = {
            'NoticeId': this.newId,
            'Title': this.ruleForm.Title,
            'TypeId': this.ruleForm.Type,
            'TypeName': this.TypeName,
            'Detail': this.ruleForm.Detail,
            'Status': 1,
            'FilesId': FilesId.toString(),
            'PhotosId': PhotosId.toString(),
            'DepartList': []
          }
          console.log(this.modelData)
          this.Add_update()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 保存草稿
    draftBtn() {
      const FilesId = [], PhotosId = []
      for (var i = 0; i < this.fArr.length; i++) {
        console.log(getFileType(this.fArr[i].name))
        if (getFileType(this.fArr[i].name) == 'img') {
          PhotosId.push(this.fArr[i].response.ID)
        } else {
          FilesId.push(this.fArr[i].response.ID)
        }
      }
      this.modelData = {
        'NoticeId': this.draftId,
        'Title': this.ruleForm.Title,
        'TypeId': this.ruleForm.Type,
        'TypeName': this.TypeName,
        'Detail': this.ruleForm.Detail,
        'Status': 0,
        'FilesId': FilesId.toString(),
        'PhotosId': PhotosId.toString(),
        'DepartList': []
      }
      console.log(this.modelData)
      this.Add_update()
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
      this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 获取公告类型
    Get_type() {
      const that = this
      return new Promise((resolve, reject) => {
        announcement.Get_type(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.typeData = response.data.Data
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
    .mainBody{
        width:1010px;
        margin: 0 auto;
        padding-top: 35px;
        .el-form .el-form-item .el-textarea__inner{
            height:250px;
        }
    }
  }

}

</style>
<style>
#announcement .mainBody .el-form .el-form-item .el-textarea__inner{
            height:380px;
        }
</style>

