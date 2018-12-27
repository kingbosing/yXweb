<template>
  <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
    v-cloak>
    <el-header height="50px">
      <span :class="{tab_btn:true,active:TaskAct==1}" v-on:click="ToCheckTaskAct(1)">基本员工信息</span>
      <span :class="{tab_btn:true,active:TaskAct==2}" v-on:click="ToCheckTaskAct(2)">新同事</span>
      <span :class="{tab_btn:true,active:TaskAct==3}" v-on:click="ToCheckTaskAct(3)">职位管理</span>
      <div class="header-right">
        <el-button type="" size=""  v-if="TaskAct==1" @click="centerDialogVisible_1 = true">身份查询</el-button>
        <div class="tools_search">
            <el-input placeholder="姓名/部门/员工" v-if="TaskAct==1" suffix-icon="el-icon-search" v-model="input" @keyup.enter.native="searchFor"></el-input>
            <el-input placeholder="搜索职位名称" v-if="TaskAct==3" suffix-icon="el-icon-search" v-model="job_searchText" @keyup.enter.native="searchForJob"></el-input>
        </div>
        <div class="tools_search" v-if="TaskAct==2">
           <el-popover id="searchStaff" placement="bottom" width="300" trigger="manual" v-model="visible">
               <div>
                 <div class="headImg">
                    <p>{{searchStaffData.Nick}}</p>
                    <p>{{!searchStaffData.Singer?'(空)':searchStaffData.Singer}}</p>
                    <img :src="showImg(searchStaffData.FaceUrl)">
                 </div>
                 <div class="bodyText">
                   <p>个人信息</p>
                   <p><b>小赢号：</b>{{searchStaffData.XiaoYingCode}}</p>
                   <p><b>地&emsp;区：</b>{{!searchStaffData.Region?'(空)':searchStaffData.Region}}</p>
                 </div>
                 <p style="text-align: center;"><el-button type="primary" plain @click="InvitenewColleague(searchStaffData.XiaoYingCode)">邀请加入公司</el-button></p>
               </div>
               <el-input slot="reference" placeholder="添加新同事--小赢号" suffix-icon="el-icon-search" v-model="inputStaff" @keyup.enter.native="searchStaff"></el-input>
           </el-popover>
        </div>
      </div>
    </el-header>
    <el-main>
      <employee-information v-if="TaskAct==1"></employee-information>
      <new-colleague v-else-if="TaskAct==2"></new-colleague>
      <el-container v-else>
        <el-main>
            <position-manage></position-manage>
        </el-main>
      </el-container>
    </el-main>
    <!--弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_1" width="40%" center>
                  <div class="iconTitle"><img :src="shenfenchaxun">身份查询<b>-此次操作需要1元手续费</b></div>
                  <el-form id="avatarImg" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="身份证号" prop="ID_number">
                        <el-input v-model="ruleForm.ID_number" v-on:keyup.native="DelE()" :maxlength="18"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone_number">
                        <el-input v-model="ruleForm.phone_number" v-on:keyup.native="DelP()" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="照  片" prop="">
                           <up-load class="avatar-uploader"  ref="upload" action="apix/file/FileUpload"
                              :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"  :show-file-list="false">
                            <img v-if="headImageUrl" :src="headImageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </up-load>
                           <span style="font-size:12px;color:#8a8a8a;">请上传真实有效证件照,上传图片请以jpg或png格式并且最大尺寸为500KB</span>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="consultFun('ruleForm')" style="margin-right:100px">咨 询</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
    <!--****************************-->
  </el-container>
</template>
<script>
// import TreeGrid from './components/treegrid'
import { getToken } from '@/utils/auth'
import EmployeeInformation from './components/employeeInformation'
import PositionManage from './components/positionManage'
import NewColleague from './components/newColleague'
import * as API from '@/api/finance_setting'
import shenfenchaxun from '@/assets/shenfenchaxun.png'
import touxiang from '@/assets/personalCard-touxiang.png'
import Vue from 'vue'
import upLoad from '../../components/toUpload/'
Vue.use(upLoad)
import * as personnelManagement from '@/api/personnelManagement'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
export default {
  data() {
    return {
      TaskAct: 1,
      fullscreenLoading: false,
      input: '',
      centerDialogVisible_1: false,
      shenfenchaxun: shenfenchaxun,
      touxiang: touxiang,
      ruleForm: {
        ID_number: '',
        phone_number: ''
      },
      rules: {
        ID_number: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确的身份证号码格式', trigger: 'blur' }
        ],
        phone_number: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号码格式', trigger: 'blur' }
        ]
      },
      headImageUrl: '',
      inputStaff: '',
      visible: false,
      searchStaffData: [],
      fileList: [], // 文件
      fArr: [],
      IsSearchJob: false,
      job_searchText: ''
    }
  },
  components: {
    EmployeeInformation,
    PositionManage,
    NewColleague
  },
  created() {

  },
  mounted() {
  },
  methods: {
    // 邀请加入公司
    InvitenewColleague(code) {
      console.log(code)
      const that = this
      that.visible = false
      return new Promise((resolve, reject) => {
        personnelManagement.InvitenewColleague(getToken(), code)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: response.data.Data,
                type: 'success',
                onClose: function() {
                  that.ToNewColleague(1, 5)
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
    // 查找新同事
    FindnewColleague(code) {
      console.log(code)
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.FindnewColleague(getToken(), code)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              if (response.data.Data == null) {
                that.$message({
                  message: '搜索无结果',
                  type: 'warning'
                })
              } else {
                that.searchStaffData = response.data.Data
                that.visible = true
              }
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
    // 搜索新员工
    searchStaff() {
      console.log(this.inputStaff)
      if (this.inputStaff) {
        this.FindnewColleague(this.inputStaff)
      } else {
        this.visible = false
      }
    },
    // 图片显示
    showImg(url) {
      if (url == '' || url == null) {
        return touxiang
      } else {
        return this.faceUrl(url, 60, 60)
      }
    },
    // 图片处理
    faceUrl(url, width, height) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          height
        )
      }
    },
    // 身份咨询
    consultFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.centerDialogVisible_1 = false
          this.$router.push({ path: '/PersonnelManagement/SearchResult' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 基本员工信息搜索
    searchFor() {
      console.log(this.input)
      if (this.input) {
        const searchValue = this.input
        this.$router.push({ path: '/PersonnelManagement/SearchemployeePage', query: { searchValue: searchValue }})
      }
    },
    // 图片：
    handleAvatarSuccess(res, file) {
      this.headImageUrl = URL.createObjectURL(file.raw)
    },
    searchForJob() {
      if (this.job_searchText) {
        this.$router.push({ path: '/PersonnelManagement/SearchJobPage', query: { searchText: this.job_searchText }})
      }
    },
    // 文件：
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // console.log(fileList);
      console.log(this.fArr)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    DelE: function() {
      this.ruleForm.ID_number = (this.ruleForm.ID_number).replace(/[^0-9]/ig, '')
    },
    DelP: function() {
      this.ruleForm.phone_number = (this.ruleForm.phone_number).replace(/[^0-9]/ig, '')
    },
    ToCheckTaskAct: function(flag) {
      // 切换tab页时分类设置为资产
      this.TaskAct = flag
    //   this.tabletype_text = '资产'
    //   this.tabletype_change(this.tabletype_text)
    }
  }
}
</script>
<style>
.el-radio-button,
.el-radio-button__inner:hover {
  color: #f99740;
}
</style>

<style lang="scss" scoped>
.headImg{
   height: 90px;
   padding: 26px 10px 0 10px;
   position: relative;
   border-bottom: 1px solid #dedede;
  img{
    height: 60px;
    width:60px;
       float: right;
       position: absolute;
       top:15px;
       right: 10px;
       border-radius: 50%;
  }
  p{
    margin-top: 0;
    margin-bottom: 8px;
    display: inline-block;
    width: 150px;
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  }
}
.bodyText{
    padding: 15px;
   p{
        color:#323232;
        width: 100%;
        b{
           font-weight: normal;
           color:#8a8a8a;
        }
   }
   }
.iconTitle{
  height:30px;
  line-height: 30px;
text-align: center;
 font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
  b{
    font-weight: normal;
    color:#8a8a8a;
    font-size: 12px;
  }
img{
  height:30px;
  margin-right: 10px;
  position: relative;
  top:10px;
}
}
.demo-ruleForm{
.el-select {
  display: block;
}}
.temlateMain {
  .noData,
  .noData div {
    height: 100%;
  }

  .listB {
    background: url(/images/apply_empty.png) center no-repeat;
  }

  .searchB {
    background: url(/images/Task/pic_noresults.png) center no-repeat;
  }

  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }

    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }

    .header-right {
      float: right;

      .tools_search {
        width: 310px;
       float: right;
        margin-left: 15px;
      }
    }
  }

  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;

    .el-container {
      height: 100%;

      .el-header {
        border-bottom: none;
        padding: 20px;
      }

      .el-main {
        padding: 0px;
        .monthbox {
          height: 48px;
          .MonthTitle {
            font-size: 16px;
            padding: 10px 14px 20px 4px;
            display: block;
            float: left;
          }
        }
      }
    }
  }
  .el-radio-group{
    float: left;
  }
 .infoBox{
          display: inline-block;
    background-color: #ffbf51;
    height: 48px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    line-height: 48px;
    padding-left: 15px;
    -webkit-box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    margin-left: 30px;
    padding-right: 15px;
    position: relative;
    top: -8px;
       #triangle-left {
        display:inline-block;
        width:0;
        height:0;
        border-width:10px 10px 10px 0;
        border-style:solid;
        border-color:transparent #ffbf51 transparent transparent;/*透明 黄 透明 透明 */
        position: absolute;
        left:-10px;
        top:14px;
}}
.step3 {
  float: right;
  .infoBox{
    display: inline-block;
    background-color: #ffbf51;
    height: 48px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    line-height: 48px;
    padding-left: 15px;
    -webkit-box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    margin-left: 30px;
    padding-right: 15px;
    position: relative;
    top: -8px;
    right: 65px;
       #triangle-top {
       display: inline-block;
    width: 0;
    height: 0;
    border-width: 10px 10px 10px;
    border-color: transparent transparent #ffbf51 transparent;
    position: absolute;
    right: 20px;
    top: -20px;
    border-style: solid;
}}
}
  .failLogo {
    width: 51px;
    height: 51px;
    background: url(/img/sprite.8b0a4f58.png) -60px -308px no-repeat;
    display: block;
    margin: 0 auto 40px;
  }

  .successLogo {
    width: 51px;
    height: 51px;
    background: url(/img/sprite.8b0a4f58.png) 0px -308px no-repeat;
    display: block;
    margin: 0 auto 40px;
  }

  .balanceContent {
    margin: 10px 0;
  }

  .successText {
    color: #5cb85c;
  }

  .failText {
    color: #e93a29;
  }

  .ClasseeNum {
    font-size: 14px;
    margin-bottom: 20px;
    display: block;
    &::before {
      content: "";
      width: 4px;
      height: 16px;
      background: #f99740;
      display: block;
      float: left;
      margin-right: 10px;
      margin-top: 1px;
    }
  }
  .SubjectSetting {
    .el-input,
    .el-input-number,
    .el-select {
      width: 100px;
    }

    .numadded {
      margin: 10px;
      &::before {
        content: "-";
      }
    }

  }
}
#avatarImg {
  .el-icon-plus.avatar-uploader-icon{
    border: 1px dashed #d9d9d9!important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

