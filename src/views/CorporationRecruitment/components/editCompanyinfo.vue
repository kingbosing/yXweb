<template>
    <el-container  class="temlateMain" v-cloak v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/RecruitmEntenterprise',query:{actId:'1'} }">企业信息</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
           <div class="main">
            <el-row>
                <el-col :span="4">
                  <div class="mainImg">
                    <img :src="getImgUrl()" alt="">
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="mainInfo">
                    <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="企业名称:" prop="Name" required>
                        <el-input v-model="ruleForm.Name"></el-input>
                      </el-form-item>
                      <!-- <el-col :span="12"> -->
                          <el-form-item label="企业规模：" required>
                          <el-select v-model="ruleForm.Scale" placeholder="请选择活动区域">
                            <el-option :label="k" :value="v" v-for="(k,v) in EnumFirmScale" :key="v"></el-option>
                          </el-select>
                          </el-form-item>
                      <!-- </el-col> -->
                      <!-- <el-col :span="12"> -->
                        <el-form-item label="企业性质：" required >
                          <el-select v-model="ruleForm.Property" placeholder="请选择活动区域">
                            <el-option :label="k" :value="v" v-for="(k,v) in EnumFirmProperty" :key="v"></el-option>
                          </el-select>
                          </el-form-item>
                      <!-- </el-col> -->
                      <el-form-item label="行业类型:" prop="IndustryType" required>
                        <!-- <el-input v-model="ruleForm.IndustryType" @blur="getIndustryType"></el-input> -->
                        <el-popover
                          placement="bottom"
                          title=""
                          width="700"
                          height="450"
                          v-model="visibleType"
                          trigger="click">
                          <div class="getType" style="height:450px;overflow: auto;">
                            <div class="title">
                              <span>{{getType.length}}/3</span>
                              <el-button type="warning" size='small' @click="doSureType">确认</el-button>
                            </div>
                            <div v-for="(k,v) in companyTypeList" :key="v" class="cell">
                              <el-row>
                                <el-col :span="8">{{k.Title}}</el-col>
                                <el-col :span="16">
                                    <el-row>
                                      <el-col :class="ifHas(i.Id)?'act':''" :span="12"  v-for="(i,j) in k.ChildList" :key="j" :id='i.Id'><span @click="getIt(i.Id,i.Title)">{{i.Title}}</span></el-col>
                                    </el-row>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <el-input slot="reference" v-model="ruleForm.IndustryType" ></el-input>

                        </el-popover>
                      </el-form-item>
                      <el-form-item label="企业地址:" prop="Address" required>
                        <el-input v-model="ruleForm.Address"></el-input>
                      </el-form-item>
                      <el-form-item label="企业介绍:" prop="FirmProfile" required>
                        <el-input type="textarea" :rows="4"  v-model="ruleForm.FirmProfile"></el-input>
                      </el-form-item>
                      <el-form-item label="" prop="FirmProfileList" >
                        <!-- 上传图片 -->
                        <upload-recruit
                            class="upload-demo"
                            ref="upload"
                            action="apix/file/FileUpload"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :show-list-id="true"
                            multiple
                            :limit="15"
                            :file-list="fileList"
                            list-type="picture-card">
                            <el-button size="small" type="text">上传文件</el-button>
                        </upload-recruit>
                      </el-form-item>
                      <el-form-item label="产品介绍:" prop="ProductProfile" required>
                        <el-input  type="textarea" :rows="4" v-model="ruleForm.ProductProfile"></el-input>
                      </el-form-item>
                       <el-form-item label="" prop="ProductProfileList" >
                        <upload-recruit
                            class="upload-demo"
                            ref="upload"
                            action="apix/file/FileUpload"
                            :on-remove="handleRemove_pro"
                            :on-success="handleSuccess_pro"
                            :show-list-id="true"
                            multiple
                            :limit="15"
                            :file-list="fileList2"
                            list-type="picture-card"
                            :show-file-list="true"
                            :auto-upload="true">
                            <el-button size="small" type="text">上传文件</el-button>
                        </upload-recruit>
                      </el-form-item>
                      <el-form-item label="公司福利:" prop="tag" >
                        <span :key="v" v-for="(tag,v) in tagList" @click="checkTag(tag)" style="margin:0 5px;">
                          <el-tag
                            :closable="!tag.IsDefault"
                            @close="handleClose(tag)"
                            :type="tag.IsChecked?'danger':'info'">
                            {{tag.Title}}
                          </el-tag>
                        </span>

                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="mini"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm">

                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添 加</el-button>

                      </el-form-item>

                      <h2 class="text-center">
                        <el-button type="warning" @click="submitForm('ruleForm')" :loading="submiting">保 存</el-button>
                      </h2>
                    </el-form>
                  </div>
                </el-col>
            </el-row>

           </div>
        </el-main>

    </el-container>
</template>

<script>

import { getdatefirm, welfarelist, addwelfare, delwelfare, updatefirm, getEnums } from '@/api/recruitment'

import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import uploadRecruit from '@/components/toUploadRecruit/src/index'

export default {
  components: {
    uploadRecruit
  },
  data() {
    const validateFirmProfileList = (rule, value, callback) => {
      const theVal = this.ruleForm.FirmProfileList
      console.log(value)
      if (theVal && theVal.length > 0) {
        callback()
      } else {
        callback(new Error('请选择图片'))
      }
    }
    const validateProductcProfileList = (rule, value, callback) => {
      const theVal = this.ruleForm.ProductProfileList
      console.log(theVal)
      if (theVal && theVal.length > 0) {
        callback()
      } else {
        callback(new Error('请选择图片'))
      }
    }
    const validateTag = (rule, value, callback) => {
      const theVal = this.ActTagList
      // console.log('*******')
      // console.log(theVal)
      if (theVal && theVal.length > 0) {
        callback()
      } else {
        callback(new Error('请选择公司福利'))
      }
    }
    return {
      fullscreenLoading: false,
      defaultActive: '1',
      doActive: '1',
      LogoFormatUrl: '',
      ruleForm: {
        Name: '',
        Scale: '0',
        Property: '0',
        IndustryType: '',
        Address: '',
        FirmProfile: '',
        ProductProfile: '',
        FirmProfileList: [],
        ProductProfileList: [],
        tag: []
      },
      rules: {
        Name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        IndustryType: [
          { required: true, message: '请选择行业类型', trigger: 'change' }
        ],
        Address: [
          { required: true, message: '请输入企业地址', trigger: 'blur' }
        ],
        FirmProfile: [
          { required: true, message: '请输入企业介绍', trigger: 'blur' }
        ],
        ProductProfile: [
          { required: true, message: '请输入产品介绍', trigger: 'blur' }
        ],
        FirmProfileList: [
          { required: true, message: '请选择图片', trigger: 'change', validator: validateFirmProfileList }
        ],
        ProductProfileList: [
          { required: true, message: '请选择图片', trigger: 'change', validator: validateProductcProfileList }
        ],
        tag: [
          { required: true, message: '请选择公司福利', trigger: 'change', validator: validateTag }
        ]
      },
      companyTypeList: [], // 公司类型列表
      EnumFirmScale: ['不限', '少于15人', '15～50人', '50～150人', '150～500人', '500～2000人', '2000人以上'],
      EnumFirmProperty: ['不限', '国企', '民营', '合资', '上市公司', '外商独贸', '股份制企业', '事业单位', '其他类型'],
      visibleType: false, // 行业类型列表
      getType: [], // 选择行业类型列表
      sureType: [], // 选中行业类型列表

      inputVisible: false,
      inputValue: '',
      ActTagList: [], // 选中标签列表
      tagList: [], // 标签列表

      submiting: false,
      // FirmProfileList: [], // 企业介绍列表
      fileList: [], // 企业介绍默认列表

      // ProductcProfileList: [], // 产品介绍列表
      fileList2: [] // 产品介绍默认列表
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      doGetdatefirm(this)
      doWelfarelist(this) // 标签
      doGetEnums(this, '').then(c => {
        console.log(c)
        this.companyTypeList = c
      })

      this.LogoFormatUrl = this.$store.state.company.LogoFormatUrl
    },
    getIt(Id, name) {
      if (this.ifHas(Id)) {
        this.getType = this.getType.filter(item => {
          return item.Id != Id
        })
      } else {
        if (this.getType.length < 3) {
          this.getType.push({
            Id, name
          })
        }
      }
    },
    handleRemove(file, fileList) {
      // console.log(this.fileList)
      // console.log(this.fileList2)
      // console.log(file, fileList)
      this.ruleForm.FirmProfileList = fileList
    },
    handleSuccess(file, c, fileList) {
      console.log(file, fileList, c)
      this.ruleForm.FirmProfileList = fileList
    },
    handleRemove_pro(file, fileList) {
      // console.log(file, fileList)
      this.ruleForm.ProductProfileList = fileList
    },
    handleSuccess_pro(file, c, fileList) {
      console.log(file, fileList, c)
      this.ruleForm.ProductProfileList = fileList
    },
    submitForm(formName) {
      // console.log(this.sureType)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submiting = true
          // console.log(this.ruleForm)
          // console.log(this.ActTagList)
          const tagIds = []
          this.ActTagList.forEach(c => {
            tagIds.push(c.Id)
          })
          const sureTypeIDs = []
          this.sureType.forEach(c => {
            if (c.id || c.Id) {
              sureTypeIDs.push(c.id || c.Id)
            }
          })
          const Data = {
            Name: this.ruleForm.Name,
            Scale: this.ruleForm.Scale,
            Property: this.ruleForm.Property,
            IndustryType: sureTypeIDs.toString(),
            Address: this.ruleForm.Address,
            FirmProfile: this.ruleForm.FirmProfile,
            ProductProfile: this.ruleForm.ProductProfile,
            FirmWelfareIDs: tagIds,
            FirmProfilePhotoIDs: this.ruleForm.FirmProfileList,
            ProductProfilePhotoIDs: this.ruleForm.ProductProfileList
          }
          console.log(Data)
          updatefirm(Data).then(c => {
            console.log(c)
            if (c.data.Code == 0) {
              this.submiting = false
              this.$router.push({ path: '/CorporationRecruitment/RecruitmEntenterprise', query: { actId: '1' }})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    doSureType() {
      this.visibleType = false
      const TypeList = JSON.parse(JSON.stringify(this.getType))
      this.sureType = TypeList

      // console.log(this.sureType)
      const list = []
      this.ruleForm.IndustryType = ''
      TypeList.forEach(item => {
        list.push(item.name || item.Name)
      })
      // console.log(list)

      this.ruleForm.IndustryType = [...list].toString()
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    checkTag(tag) {
      // console.log(tag)
      this.tagList.forEach(item => {
        if (item.Id == tag.Id && item.IsChecked) {
          item.IsChecked = false
        } else if (item.Id == tag.Id && !item.IsChecked && this.ActTagList.length < 8) {
          item.IsChecked = true
        }
      })
      const List = JSON.parse(JSON.stringify(this.tagList))

      this.ActTagList = List.filter(c => {
        return c.IsChecked == true
      })
    },
    handleClose(tag) {
      // console.log(tag)
      const app = this

      delwelfare(tag.Id).then(c => {
        // doWelfarelist(app)
        this.tagList = this.tagList.filter(c => {
          return c.Id != tag.Id
        })
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      const app = this
      app.inputVisible = false
      app.inputValue = ''
      if (inputValue) {
        addwelfare(inputValue).then(c => {
          const data = c.data
          this.tagList.push({
            Title: inputValue,
            IsDefault: false,
            IsChecked: false,
            Id: data.Data
          })
        })
      } else {

      }
    },
    ifHas(Id) {
      let get = false
      // console.log(this.getType)
      this.getType.forEach(item => {
        if (item.Id == Id) {
          // console.log(item.id)
          get = true
        }
      })
      return get
    },
    handleSelect(data) {
      console.log(data)
      this.doActive = data
    },
    getImgUrl() {
      return globalvariable().imgapiurl + urlUtil.formatUrl(this.LogoFormatUrl, 90, 90)
    },
    getIndustryType() {
      console.log(88)
    }
  }
}

/**
 * 获取行业类型
 */
const doGetEnums = (app, Id) => {
  return new Promise((resolve, reject) => {
    getEnums(10, Id).then(c => {
      const data = c.data.Data
      if (c.data.Code == 0) {
        console.log(data)
        const companyTypeList = []

        data.forEach(element => {
          var ChildList = new Promise((resolve, reject) => {
            getEnums(10, element.Id).then(d => {
              resolve(d.data.Data)
            })
          })

          ChildList.then(c => {
            companyTypeList.push({
              Enabled: element.Enabled,
              Id: element.Id,
              ParentId: '',
              Type: element.Type,
              Title: element.Title,
              ChildList: c
            })
          })
        })
        resolve(companyTypeList)
      }
    })
  })
}
/**
 * 获取公司信息
 */
const doGetdatefirm = (app) => {
  app.fullscreenLoading = true
  getdatefirm().then(c => {
    app.fullscreenLoading = false
    console.log(c)
    const data = c.data.Data
    const IndustryTypeList = []
    data.IndustryType.forEach(i => {
      IndustryTypeList.push(i.Name)
    })
    app.getType = data.IndustryType
    // console.log(app.getType)
    app.sureTypes = data.IndustryType

    app.ruleForm = {
      Name: data.Name,
      Scale: data.Scale,
      Property: data.Property,
      IndustryType: IndustryTypeList.toString(),
      Address: data.Address,
      FirmProfile: data.FirmProfile,
      ProductProfile: data.ProductProfile
    }
    app.fileList = []
    app.ruleForm.FirmProfileList = []
    data.FirmProfilePhotoIDs.forEach(i => {
      app.ruleForm.FirmProfileList.push(i.Id)
      app.fileList.push({
        name: i.FileName,
        url: globalvariable().imgapiurl + i.Path,
        FileName: i.FileName,
        RawUrl: i.Path,
        Size: i.Size,
        ID: i.Id,
        URL: i.URL
      })
    })

    app.fileList2 = []
    app.ruleForm.ProductProfileList = []
    data.ProductProfilePhotoIDs.forEach(i => {
      app.ruleForm.ProductProfileList.push(i.Id)
      app.fileList2.push({
        name: i.FileName,
        url: globalvariable().imgapiurl + i.Path,
        FileName: i.FileName,
        Path: i.Path,
        Size: i.Size,
        ID: i.Id,
        URL: i.URL
      })
    })
  })
}
/**
 * 福利列表
 */
const doWelfarelist = (app) => {
  welfarelist().then(c => {
    const data = c.data
    if (data.Code == 0) {
      // console.log(data.Data)
      app.tagList = data.Data
      app.ActTagList = data.Data.filter(c => {
        return c.IsChecked == true
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
  .el-main{
    padding: 20px 0 0;
    .main{
      width: 960px;
      margin: 0 auto;
      .mainImg{
        img{
          border-radius: 4px;
        }
      }

    }
  }
}
.el-tag{
  cursor: pointer;
}
.getType{
  .title{
    float: right;
    position: absolute;
    background: #fff;
    z-index: 99;
    width: 650px;
    text-align: right;
    span{
      color: #f99740;
      margin-right: 10px;
    }
  }
  .cell{
    padding: 30px 20px 0;
    .el-col{
      line-height: 30px;
      cursor: pointer;
    }
    .act{
      color: #f99740;
    }
  }
}
</style>

