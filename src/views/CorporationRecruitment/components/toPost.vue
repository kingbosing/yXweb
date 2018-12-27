<template>
    <el-container  class="temlateMain" v-cloak v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/JobPostListting',query:{actId:''} }">发布职位</el-breadcrumb-item>
                <el-breadcrumb-item>去发布</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
           <div class="main">
               <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <h4>职位基本信息</h4>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="发布岗位：" prop="DepName" required>
                            <el-input v-model="ruleForm.DepName" placeholder="请选择部门" @focus="depVisible=true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" prop="JobName">
                           <el-popover
                            placement="bottom"
                            width="390"
                            v-model="visibleJobName"
                            trigger="click">

                            <el-tree :data="JobList" :props="props1" @node-click="handleNodeClick"></el-tree>

                            <el-input  slot="reference" v-model="ruleForm.JobName" placeholder="请选择职位"></el-input>
                           </el-popover>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-form-item label="工作地点：" prop="Address" required>
                       <el-row :gutter="20">
                        <el-col :span="5">
                          <el-select v-model="ruleForm.ProvinceId" placeholder="请选择省" :disabled='ProvinceList.length==0' @change="getProvince">
                            <el-option
                              v-for="item in ProvinceList"
                              :key="item.Id"
                              :label="item.RegionName"
                              :value="item.Id">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="5">
                          <el-select v-model="ruleForm.CityId" placeholder="请选择市" :disabled='CityList.length==0' @change="getCity">
                            <el-option
                              v-for="item in CityList"
                              :key="item.Id"
                              :label="item.RegionName"
                              :value="item.Id">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="5">
                          <el-select v-model="ruleForm.DistrictId" placeholder="请选择区" :disabled='DistrictList.length==0' @change="getDistrict" >
                            <el-option
                              v-for="item in DistrictList"
                              :key="item.Id"
                              :label="item.RegionName"
                              :value="item.Id">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                           <el-input v-model="ruleForm.Address"></el-input>
                        </el-col>
                       </el-row>

                    </el-form-item>

                    <el-form-item label="职位类型：" required prop="PositionType">
                      <el-popover
                        placement="bottom"
                        width="880"
                        v-model="visibleDepType"
                        trigger="click">
                        <div v-if="!moreDepType.length">
                          <el-row>
                            <el-col :span="6" v-for="k in depTypeList" :class="getDepTypeId==k.Id?'color_f99740':''" :key="k.Id"><p class="text-center pointer" @click="getMoreDepType(k.Id)">{{k.Title}}</p></el-col>
                          </el-row>
                        </div>
                        <div v-else>
                          <el-row>
                            <el-col :span="6" v-for="k in moreDepType" :key="k.Id"  :class="moreDepIds.indexOf(k)>=0?'color_f99740':''"><p class="text-center pointer" @click="getDepType(k)">{{k.Title}}</p></el-col>
                          </el-row>
                          <p>
                            <span @click="moreDepType=[]">返回上一步</span>
                            <span style="float:right">
                              <span class="color_f99740" style="margin-right:20px;">{{moreDepIds.length}}/3</span>
                              <el-button type="warning" size="small" @click="sureDepType">确认</el-button>
                            </span>
                          </p>
                        </div>

                        <el-input slot="reference"  v-model="ruleForm.PositionType"></el-input>
                      </el-popover>
                    </el-form-item>

                    <el-form-item label="每月薪资：" prop="Salary" required>
                       <el-select v-model="ruleForm.Salary">
                          <el-option v-if="v>0"
                            v-for="(item,v) in SalaryList"
                            :key="v"
                            :label="item"
                            :value="v">
                          </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="工作经验：" prop="WorkExperience" required>
                        <el-select v-model="ruleForm.WorkExperience">
                          <el-option
                            v-for="(item,v) in WorkExperienceList"
                            :key="v"
                            :label="item"
                            :value="v">
                          </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="学历要求：" prop="Education" required>
                      <el-select v-model="ruleForm.Education">
                          <el-option
                            v-for="(item,v) in EducationList"
                            :key="v"
                            :label="item"
                            :value="v">
                          </el-option>
                        </el-select>
                    </el-form-item>

                     <el-form-item label="截止时间：" prop="EndTime" required>
                        <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="ruleForm.EndTime" style="width: 100%;"></el-date-picker>

                    </el-form-item>

                   <h4>职位要求</h4>

                    <el-form-item label="专业要求：" prop="MajorRequire">
                        <el-input v-model="ruleForm.MajorRequire"></el-input>
                    </el-form-item>

                    <el-form-item label="岗位描述：" prop="JobDescription" required>
                        <el-input type="textarea" v-model="ruleForm.JobDescription"></el-input>
                    </el-form-item>

                    <el-form-item label="岗位要求：" prop="JobRequirements" required>
                        <el-input type="textarea" v-model="ruleForm.JobRequirements"></el-input>
                    </el-form-item>

                     <h4>其他要求</h4>
                     <el-form-item label="备注信息：" prop="Remarks">
                        <el-input type="textarea" v-model="ruleForm.Remarks"></el-input>
                    </el-form-item>

                    <p class="text-center">
                        <el-button @click="submitForm('ruleForm',1)">保存</el-button>
                        <el-button type="warning" @click="submitForm('ruleForm',0)">发布职位</el-button>
                    </p>
                </el-form>
           </div>
        </el-main>

        <get-depeople
        :visible.sync="depVisible"
        :actlist="DepList" title="选择参会人"
        :people="false"
        :checkbox="false"
        v-on:act-node="actDep">
        </get-depeople>

    </el-container>
</template>

<script>
import { region_pc, getEnums, getcategory, getjob, addjob, get_jobinfo } from '@/api/recruitment'
import { consoleLog } from '@/utils/globalvariable'

export default {
  data() {
    return {
      Id: '',
      fullscreenLoading: false,
      ruleForm: {
        DepName: '',
        JobName: '',
        Address: '',
        ProvinceId: '',
        CityId: '',
        DistrictId: '',
        PositionType: '',
        PositionTypeIds: '',
        Salary: 1,
        WorkExperience: 0,
        Education: 0,
        EndTime: '',
        MajorRequire: '',
        JobDescription: '',
        JobRequirements: '',
        Remarks: ''
      },
      rules: {
        DepName: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        JobName: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        EndTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        PositionType: [
          { required: true, message: '请输入职位类型', trigger: 'change' }
        ],
        JobDescription: [
          { required: true, message: '请输入岗位描述', trigger: 'blur' }
        ],
        JobRequirements: [
          { required: true, message: '请输入岗位要求', trigger: 'blur' }
        ]
      },

      ProvinceList: [],
      ProvinceId: '',

      CityList: [],
      CityId: '',

      DistrictList: [],
      DistrictId: '',
      EducationList: ['不限', '博士', '	硕士', '本科', '大专', '大专以下'],
      WorkExperienceList: ['不限', '实习生', '	1年以下', '1～3年', '3～5年', '5～10年', '10年以上', '应届生'],
      SalaryList: ['不限', '面议', '1K~2K', '2k~4K', '4K~6k', '6k~8k', '8k~10k', '10k~20k', '20k以上'],

      depVisible: false,
      DepList: [],

      visibleDepType: false,
      depTypeList: [],
      getDepTypeId: '',

      visibleJobName: false,

      moreDepType: [],
      moreDepIds: [],

      props1: {
        label: 'CategroyName',
        children: 'Jobs'
      },
      JobList: [],
      getJobList: []
    }
  },
  watch: {
    visibleDepType(val) {
      // if (!val) {
      this.moreDepType = []
      // }
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to)
    if ((to.path == '/CorporationRecruitment/postSuccess') || (to.path == '/CorporationRecruitment/PostInfomationpreview')) {
      next(true)
    } else {
      this.$confirm('此操作将离开次表单且数据不会保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // console.log()
        next(true)
      }).catch(() => {
        next(false)
      })
    }
  },
  mounted() {
    this.init()
  },
  methods: {

    init() {
      this.Id = this.$route.query.id
      if (this.Id) {
        getJobinfo(this, this.Id).then(c => {
          this.fullscreenLoading = false
          const PositionType = []
          const PositionTypeIds = []
          c.PositionType.forEach(j => {
            PositionType.push(j.Name)
            PositionTypeIds.push(j.Id)
          })
          this.getCityList(c.ProvinceId.Id)
          this.getDistrictList(c.CityId.Id)
          // console.log(c)
          this.ruleForm = {
            DepName: c.DepId.Name,
            JobName: c.PositionId.Name,
            Address: c.WorkAddress,
            ProvinceId: c.ProvinceId.Id,
            CityId: c.CityId.Id,
            DistrictId: c.DistrictId.Id,
            PositionType: PositionType.toString(),
            PositionTypeIds: PositionTypeIds.toString(),
            Salary: c.Salary,
            WorkExperience: c.WorkExperience,
            Education: c.Education,
            EndTime: c.EndTime,
            MajorRequire: c.MajorRequire,
            JobDescription: c.JobDescription,
            JobRequirements: c.JobRequirements,
            Remarks: c.Remarks
          }
        })
      }

      getRegion(this, 1).then(c => {
        this.ProvinceList = c
      })
      toGetEnums(this, '').then(c => {
        this.depTypeList = c
        // consoleLog(c)
      })
      doGetcategory(this, '').then(c => {
        // console.log(c)
        const list = []
        c.forEach(i => {
          const Jobs = []
          i.Jobs.forEach(j => {
            Jobs.push({
              JobName: j.JobName,
              CategroyName: j.JobName,
              ID: j.ID,
              job: true
            })
          })
          list.push({
            CategroyName: i.CategroyName,
            ID: i.ID,
            Jobs
          })
        })
        this.JobList = list
      })
    },
    getCityList(value) {
      getRegion(this, value).then(c => {
        // console.log(c)
        this.CityList = c
      })
    },
    getDistrictList(value) {
      getRegion(this, value).then(c => {
        // console.log(c)
        this.DistrictList = c
      })
    },
    getProvince(value) {
      this.DistrictList = []
      this.CityList = []
      this.ruleForm.CityId = ''
      this.ruleForm.DistrictId = ''
      this.getCityList(value)
    },

    getCity(value) {
      this.DistrictList = []
      this.ruleForm.DistrictId = ''
      this.getDistrictList(value)
    },
    handleNodeClick(row) {
      if (row.job) {
        this.visibleJobName = false
        this.getJobList = row
        this.ruleForm.JobName = row.JobName
      }
    },
    getDistrict(value) {

    },
    actDep(data) {
      // console.log(data)
      this.DepList = data
      this.ruleForm.DepName = data[0].Name
    },
    getMoreDepType(id) {
      this.getDepTypeId = id
      this.moreDepIds = []
      toGetEnums(this, id).then(c => {
        this.moreDepType = c
        // consoleLog(c)
      })
    },
    getDepType(row) {
      const id = row.Id
      if (this.moreDepIds.length < 3 && this.moreDepIds.indexOf(row) < 0) {
        this.moreDepIds.push(row)
      } else if (this.moreDepIds.indexOf(row) >= 0) {
        this.moreDepIds = this.moreDepIds.filter(item => {
          return item.Id != id
        })
      }
    },
    sureDepType() {
      const listType = []
      const listTypeIds = []
      this.moreDepIds.forEach(ele => {
        listType.push(ele.Title)
        listTypeIds.push(ele.Id)
      })
      this.ruleForm.PositionTypeIds = listTypeIds.toString()

      this.ruleForm.PositionType = listType.toString()
      this.visibleDepType = false
    },
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          const Data = {
            DepName: this.ruleForm.DepName,
            PositionName: this.ruleForm.JobName,
            WorkAddress: this.ruleForm.Address,
            PositionType: this.ruleForm.PositionTypeIds,
            Salary: this.ruleForm.Salary,
            WorkExperience: this.ruleForm.WorkExperience,
            Education: this.ruleForm.Education,
            EndTime: this.ruleForm.EndTime,
            MajorRequire: this.ruleForm.MajorRequire,
            JobDescription: this.ruleForm.JobDescription,
            JobRequirements: this.ruleForm.JobRequirements,
            Remarks: this.ruleForm.Remarks,
            ProvinceId: this.ruleForm.ProvinceId,
            CityId: this.ruleForm.CityId,
            DistrictId: this.ruleForm.DistrictId,
            Status: type
          }
          if (this.Id) {
            Data.Id = this.Id
          }
          // consoleLog(Data)
          var app = this
          addjob(Data).then(c => {
            consoleLog(c)

            app.$router.push({ path: '/CorporationRecruitment/postSuccess' })

            if (c.data.Code == 0) {
              consoleLog('Code后:', c)
              if (type) {
                app.$router.push({ path: '/CorporationRecruitment/PostInfomationpreview', query: { id: c.data.Data, ifPost: 1 }})
              } else {
                app.$router.push({ path: '/CorporationRecruitment/postSuccess' })
              }
            } else {
              app.$message.error(c.data.Message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

const getRegion = (app, id) => {
  return new Promise((resolve, reject) => {
    region_pc(id).then(c => {
      resolve(c.data.Data)
    })
  })
}

const toGetEnums = (app, id) => {
  return new Promise((resolve, reject) => {
    getEnums(20, id).then(c => {
      resolve(c.data.Data)
    })
  })
}

const doGetjob = (app, _categoryID, key) => {
  return new Promise((resolve, reject) => {
    getjob(_categoryID, key).then(c => {
      resolve(c.data.Data)
    })
  })
}

const doGetcategory = (app, key) => {
  return new Promise((resolve, reject) => {
    getcategory(key).then(c => {
      resolve(c.data.Data)
    })
  })
}

const getJobinfo = (app, id) => {
  app.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    get_jobinfo(id).then(c => {
      resolve(c.data.Data)
    })
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
  .el-header,.el-main{
    height: 100%;
  }
  .main{
    width: 980px;
    margin: 0 auto;
  }
}
.color_f99740{
  color: #f99740;
}
.pointer{
  cursor: pointer;
}
</style>

