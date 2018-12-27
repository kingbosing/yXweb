<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right" v-if="stateNum">
                <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">基本员工信息</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
             </el-breadcrumb>
             <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!stateNum">
                <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">新员工</el-breadcrumb-item>
                <el-breadcrumb-item>添加员工信息</el-breadcrumb-item>
             </el-breadcrumb>
            <div class="header-right">
                <el-button type="" size="" @click="submitForm('ruleForm')">完 成</el-button>
                <el-popover placement="bottom" width="120" trigger="click" v-if="stateNum">
                    <span class="dimission_span" @click="centerDialogVisible_1 = true">办理离职</span>
                   <el-button type="text" slot="reference"><new-icon class-name="file_col_icon"  :icon-name="'#icon-caidan'" /></el-button>
                </el-popover>
            </div>
        </el-header>
        <el-main>
            <div class="mainBody" id="SearchResult">
                <el-container>
                  <el-aside width="180px">
                      <div class="imgBox">
                          <up-load class="avatar-uploader"  ref="upload" action="apix/file/FileUpload"
                              :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"  :show-file-list="false">
                            <img v-if="headImageUrl" :src="headImageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </up-load>
                      </div>
                      <p style="color:#8a8a8a;text-align: center;">小赢号：{{XiaoYingCode}}</p>
                  </el-aside>
                  <el-main>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                         <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名" prop="Name">
                                   <el-input v-model="ruleForm.Name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别" prop="Gender">
                                   <el-select v-model="ruleForm.Gender" placeholder="请选择员工性别">
                                       <el-option label="男" value="1"></el-option>
                                       <el-option label="女" value="2"></el-option>
                                   </el-select>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号" prop="LicenseNumber">
                                   <el-input v-model="ruleForm.LicenseNumber" placeholder="输入18位身份证号" v-on:keyup.native="DelE()" :maxlength="18"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="出生日期" prop="Birthday">
                                   <el-date-picker v-model="ruleForm.Birthday" type="date" placeholder="选择出生日期" :picker-options="pickerOptions1" style="width:100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="12">
                                <el-form-item label="工号" prop="EmployeeNo">
                                   <el-input v-model="ruleForm.EmployeeNo" placeholder="输入员工工号" :maxlength="12"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="手机号码" prop="Mobile">
                                   <el-input v-model="ruleForm.Mobile" placeholder="输入11位手机号" v-on:keyup.native="DelP()" :maxlength="11"></el-input>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="12">
                                <el-form-item label="部门" prop="DepartmentName">
                                   <div @click="MangeShow_1=true"><el-input v-model="ruleForm.DepartmentName" placeholder="请选择员工部门" suffix-icon="el-icon-arrow-right" readonly></el-input></div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职位" prop="CompanyJobName">
                                   <div @click="selectJopFun"><el-input v-model="ruleForm.CompanyJobName" placeholder="请选择员工职位" suffix-icon="el-icon-arrow-right" readonly></el-input></div>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row v-if="stateNum">
                            <el-col :span="12">
                                <el-form-item label="直属领导" prop="DirectLeaderName">
                                   <div  @click="MangeShow=true"><el-input v-model="ruleForm.DirectLeaderName" placeholder="请选择员工直属领导" suffix-icon="el-icon-arrow-right" readonly></el-input></div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12"></el-col>
                         </el-row>
                         <el-row v-if="stateNum">
                            <el-col :span="24">
                                <el-form-item label="兼任部门">
                                   <el-input v-model="partTimeStr" placeholder="无" readonly></el-input>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="24">
                                <el-form-item label="联系地址" prop="Address">
                                   <el-input v-model="ruleForm.Address" placeholder="请选择员工联系地址" :maxlength="30"></el-input>
                                </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="12">
                              <el-form-item label="身份证正面" prop="">
                                <up-load class="avatar-uploader"  ref="upload" action="apix/file/FileUpload"
                                     :before-upload="beforeAvatarUpload" :on-success="licenseCarFrontSuccess"  :show-file-list="false">
                                    <img v-if="licenseCarFrontUrl" :src="licenseCarFrontUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </up-load>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="身份证反面" prop="">
                                <up-load class="avatar-uploader"  ref="upload" action="apix/file/FileUpload"
                                     :before-upload="beforeAvatarUpload" :on-success="licenseCarBackSuccess"  :show-file-list="false">
                                    <img v-if="licenseCarBackUrl" :src="licenseCarBackUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </up-load>
                              </el-form-item>
                            </el-col>
                         </el-row>
                         <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注" prop="Memo">
                                   <el-input type="textarea" autosize v-model="ruleForm.Memo" placeholder="请输入备注" :maxlength="300"></el-input>
                                </el-form-item>
                            </el-col>
                         </el-row>
                      </el-form>
                      <!--*************************************************-->
                  </el-main>
                </el-container>
            </div>
        </el-main>
        <!--弹窗-->
        <!--是否离职-->
        <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定离职该员工？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="SetEmployeeLeaved">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
        </el-dialog>
        <!--选部门弹窗-->
        <get-depeople :visible.sync="MangeShow_1" :actlist="MangeAct_List_1" title="选择领导人" :people="false" :checkbox="false" v-on:act-node="MangeActNode_1"></get-depeople>
        <!--选职位弹窗-->
        <select-jop  @watchChild="partTimeNameFun" ref="transEvent"></select-jop>
        <!--选领导人弹窗-->
        <get-depeople :visible.sync="MangeShow" :actlist="MangeAct_List" title="选择领导人" :people="true" :checkbox="false" v-on:act-node="MangeActNode"></get-depeople>
        <!--***************************************************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as personnelManagement from '@/api/personnelManagement'
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'
import getDepeople from '../../components/dialogDep/src/component'
import selectJop from './components/selectJop'
import Vue from 'vue'
import upLoad from '../../components/toUpload/'
Vue.use(upLoad)
export default {
  components: {
    getDepeople,
    selectJop
  },
  data() {
    return {
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      CompanyName: '', // 公司名称
      centerDialogVisible_1: false, // 是否离职弹窗
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      ruleForm: {
        FaceUrl: '',
        Name: '',
        Gender: '1',
        LicenseNumber: '',
        Birthday: '',
        EmployeeNo: '',
        Mobile: '',
        DepartmentId: '',
        DepartmentName: '',
        CompanyJobIds: '',
        CompanyJobName: '',
        DirectLeaderId: '',
        DirectLeaderName: '',
        Address: '',
        LicenseCarFrontUrl: '',
        LicenseCarBackUrl: '',
        Memo: ''
      },
      rules: {
        Name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        Gender: [
          { required: true, message: '请选择员工性别', trigger: 'change' }
        ],
        LicenseNumber: [
          { min: 18, max: 18, message: '身份证格式不正确，请重新输入', trigger: 'blur' }
        ],
        Mobile: [
          { min: 11, max: 11, message: '手机号格式不正确，请重新输入', trigger: 'blur' }
        ],
        DepartmentName: [
          { required: true, message: '请选择员工部门', trigger: 'change' }
        ],
        CompanyJobName: [
          { required: true, message: '请选择员工职位', trigger: 'change' }
        ]
      },
      partTimeStr: '', // 兼任部门字符
      /** ********选领导人******** */
      MangeShow: false,
      MangeAct_List: [], // 默认选中id集合
      /** **********选部门************ */
      MangeShow_1: false,
      MangeAct_List_1: [],
      /** **************头像*********** */
      headImageUrl: '',
      /** ****************身份证*************** */
      licenseCarFrontUrl: '',
      licenseCarBackUrl: '',
      stateNum: 0, // 0新建员工1修改员工
      XiaoYingCode: ''
    }
  },
  mounted() {
    this.initial()
  },
  watch: {

  },
  methods: {
    // 设置员工为离职状态
    SetEmployeeLeaved() {
      console.log(this.$route.query.id)
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.SetEmployeeLeaved(getToken(), that.$route.query.id)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '离职成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/PersonnelManagement/index' })
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
    // 新建
    AddStaff() {
      const model = {
        'JoinId': this.$route.query.queueid,
        'LicenseNumber': this.ruleForm.LicenseNumber,
        'LicenseCarFrontUrl': this.ruleForm.LicenseCarFrontUrl,
        'LicenseCarBackUrl': this.ruleForm.LicenseCarBackUrl,
        'FaceUrl': this.ruleForm.FaceUrl,
        'Name': this.ruleForm.Name,
        'Gender': this.ruleForm.Gender,
        'Mobile': this.ruleForm.Mobile,
        'Birthday': this.ruleForm.Birthday,
        'Address': this.ruleForm.Address,
        'Memo': this.ruleForm.Memo,
        'EmployeeNo': this.ruleForm.EmployeeNo,
        'DepartmentId': this.ruleForm.DepartmentId,
        'CompanyJobId': this.ruleForm.CompanyJobIds,
        'FunctionModuleIds': [],
        'FunctionPermissionIds': []
      }
      console.log(model)
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.Add(getToken(), model)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/PersonnelManagement/index' })
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
    // 修改
    modifyStaff() {
      const model = {
        'ProfileId': this.$route.query.id,
        'LicenseNumber': this.ruleForm.LicenseNumber,
        'LicenseCarFrontUrl': this.ruleForm.LicenseCarFrontUrl,
        'LicenseCarBackUrl': this.ruleForm.LicenseCarBackUrl,
        'FaceUrl': this.ruleForm.FaceUrl,
        'Name': this.ruleForm.Name,
        'Gender': this.ruleForm.Gender,
        'Mobile': this.ruleForm.Mobile,
        'Birthday': this.ruleForm.Birthday,
        'Address': this.ruleForm.Address,
        'Memo': this.ruleForm.Memo,
        'EmployeeNo': this.ruleForm.EmployeeNo,
        'DepartmentId': this.ruleForm.DepartmentId,
        'CompanyJobIds': [
          this.ruleForm.CompanyJobIds
        ],
        'DirectLeaderId': this.ruleForm.DirectLeaderId
      }
      console.log(model)
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.Modify(getToken(), model)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '修改成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/PersonnelManagement/index' })
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
    // 提交前检测
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          if (this.stateNum == 0) { // 新建
            this.AddStaff()
          } else { // 编辑
            this.modifyStaff()
          }
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 身份证正面
    licenseCarFrontSuccess(res, file) {
      this.licenseCarFrontUrl = URL.createObjectURL(file.raw)
      this.ruleForm.LicenseCarFrontUrl = file.response.FormatUrl
      console.log(file)
    },
    // 身份证反面
    licenseCarBackSuccess(res, file) {
      this.licenseCarBackUrl = URL.createObjectURL(file.raw)
      this.ruleForm.LicenseCarBackUrl = file.response.FormatUrl
      console.log(file)
    },
    // 头像：
    handleAvatarSuccess(res, file) {
      this.headImageUrl = URL.createObjectURL(file.raw)
      this.ruleForm.FaceUrl = file.response.FormatUrl
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
    // 选部门
    MangeActNode_1(data) {
      console.log(data)
      this.ruleForm.DepartmentId = data[0].ItemId
      this.ruleForm.DepartmentName = data[0].Name
    },
    // 显示职位数据
    partTimeNameFun(data) {
      console.log(data)
      this.ruleForm.CompanyJobIds = data.ID
      this.ruleForm.CompanyJobName = data.JobName
    },
    // 触发选职位弹窗
    selectJopFun() {
      this.$refs.transEvent.dialogFun()
    },
    // 选领导人
    MangeActNode(data) {
      console.log(data)
      this.ruleForm.DirectLeaderId = data[0].ItemId
      this.ruleForm.DirectLeaderName = data[0].Name
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
    faceUrl(url, width, height) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          height
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
              // 左侧
              that.headImageUrl = that.faceUrl(that.listData.EmployeeFaceUrl, 90, 90)
              that.ruleForm.FaceUrl = that.listData.EmployeeFaceUrl
              that.XiaoYingCode = response.data.Data.xiaoYingHao
              // 右侧
              that.ruleForm.Name = that.listData.Name
              that.ruleForm.Gender = that.listData.Gender + ''
              that.ruleForm.LicenseNumber = that.listData.LicenseNumber
              that.ruleForm.Birthday = that.listData.Birthday
              that.ruleForm.EmployeeNo = that.listData.EmployeeNo
              that.ruleForm.Mobile = that.listData.Mobile
              that.ruleForm.DepartmentId = that.listData.DepartmentId
              if (that.listData.DepartmentId == '') {
                that.ruleForm.DepartmentName = that.CompanyName
              } else {
                that.ruleForm.DepartmentName = that.listData.DepartmentName
              }
              // that.ruleForm.DepartmentName = that.listData.DepartmentId == '' ? that.CompanyName : that.listData.DepartmentName
              let partTimeStr_1 = ''
              for (let i = 0; i < that.listData.Jobs.length; i++) {
                if (that.listData.Jobs[i].IsMastJob) {
                  that.ruleForm.CompanyJobIds = that.listData.Jobs[i].CompanyJobId
                  that.ruleForm.CompanyJobName = that.listData.Jobs[i].JobName
                } else {
                  partTimeStr_1 += that.listData.Jobs[i].DepartmentName + '-' + that.listData.Jobs[i].JobName + ' '
                }
              }
              that.partTimeStr = partTimeStr_1
              that.ruleForm.DirectLeaderId = that.listData.DirectLeaderItem.Pid
              that.ruleForm.DirectLeaderName = that.listData.DirectLeaderItem.Name
              that.ruleForm.Address = that.listData.Address
              // 身份证图
              that.licenseCarFrontUrl = that.faceUrl(that.listData.LicenseCarFrontUrl, 338, 178)
              that.ruleForm.LicenseCarFrontUrl = that.listData.LicenseCarFrontUrl
              that.licenseCarBackUrl = that.faceUrl(that.listData.LicenseCarBackUrl, 338, 178)
              that.ruleForm.LicenseCarBackUrl = that.listData.LicenseCarBackUrl
              that.ruleForm.Memo = that.listData.Memo
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
          this.CompanyName = JSON.parse(this.$store.state.user.departmentData)[0].Name
          console.log(this.CompanyName)
          if (this.$route.query.id != undefined) {
            this.GetEmployeeDetail(this.$route.query.id)
            this.stateNum = 1
          }
          if (this.$route.query.queueid != undefined) {
            this.stateNum = 0
            this.XiaoYingCode = this.$route.query.XiaoYingCode
          }
          this.fullscreenLoading = false
        }
      }, 1000)
    },
    DelE: function() {
      this.ruleForm.LicenseNumber = (this.ruleForm.LicenseNumber).replace(/[^0-9]/ig, '')
    },
    DelP: function() {
      this.ruleForm.Mobile = (this.ruleForm.Mobile).replace(/[^0-9]/ig, '')
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
  .el-header {

    .header-right {
      float: right;
      .file_col_icon{
          font-size: 20px;
          color:#8a8a8a;
      }
      .el-button{
          margin-right: 15px;
      }
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
         }
         .el-main{
         }

    }
  }

}
.dimission_span{
          display: inline-block;
          width: 120px;
          text-align: center;
          cursor: pointer;
      }
      .dimission_span:hover{
          color:#f99740;
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
                margin: 0 auto;
            }
             .mainBody .el-main{
                padding-top: 60px;
            }
    .el-select{
        width:100%;
    }
    .el-form .el-form-item .textarea{
      height:150px;
    }
</style>
<style lang="scss">
#SearchResult .el-form .el-form-item textarea{
      height:100px!important;
    }
#SearchResult {
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #f99740;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 338px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 338px;
    height: 178px;
    display: block;
  }
  .el-aside .avatar-uploader .el-upload {
    border-radius:50%;
  }
  .el-aside{
    .avatar{
      width: 90px;
    height: 90px;
    }
    .avatar-uploader-icon{
      width: 90px;
    height: 90px;
    line-height: 90px;
    }
  }
}
</style>

