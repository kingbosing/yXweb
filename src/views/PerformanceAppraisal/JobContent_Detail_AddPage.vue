<template>
    <el-container class="temlateMain">
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/PerformanceAppraisal/SetDifficultyPage' }">工作内容管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/PerformanceAppraisal/JobContent_DetailPage', query: { id: jobid } }">{{jobname}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{titleStr}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="warning"  v-on:click="submitForm('form')">保存</el-button>
            </div>
        </el-header>
        <el-main>
                 <div class="FormCenter">
                        <el-form ref="form" :rules="rules" :model="form" label-width="110px">
                            <el-row :span="20">
                                <el-form-item label="工作内容:" prop="WorkContentName">
                                    <el-input v-model="form.WorkContentName" :maxlength="40" placeholder="请输入工作内容"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row :span="20">
                                <el-form-item label="工作内容描述:" prop="Desc">
                                    <el-input v-model="form.Desc" placeholder="请输入工作内容描述" :maxlength="15"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="职位工作类别:" prop="JobWorkTypeId">
                                    <el-select v-model="form.JobWorkTypeId" size="160" placeholder="请选择职位工作类别" filterable no-data-text="暂无数据请添加" style="width:100%;">
                                        <template v-if="GetJobWorkTypeslistData!=null" v-for="(value, key)  in GetJobWorkTypeslistData">
                                            <el-option :label="value" :value="key" :key="value+''"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="工作项类别:" prop="WorkItemTypeId">
                                    <el-select v-model="form.WorkItemTypeId" size="160" placeholder="请选择工作项类别" filterable no-data-text="暂无数据请添加" style="width:100%;">
                                        <template v-if="GetWorkItemTypeslistData!=null" v-for="(value, key)  in  GetWorkItemTypeslistData">
                                            <el-option :label="value" :value="key" :key="value+''"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="完成分值:" prop="CompleteScore">
                                        <el-input v-model="form.CompleteScore" placeholder="数字精确到正一位小数，不超过四位数"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="难易度:" prop="FacilityId">
                                        <el-select v-model="form.FacilityId" size="100" placeholder="请选择难易度" filterable no-data-text="暂无数据请添加" style="width:100%;">
                                            <template v-if="GetFacilitieslistData!=null" v-for="(value, key)  in GetFacilitieslistData">
                                                <el-option :label="value" :value="key" :key="value+''"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="产值分值:" prop="OutputScore">
                                        <el-input v-model="form.OutputScore" placeholder="数字精确到正一位小数，不超过四位数"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="月产值上限:" prop="OutputScoreMax">
                                        <el-input v-model="form.OutputScoreMax" placeholder="数字精确到正一位小数，不超过四位数"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>

                     <div>
                        <div style="height: 40px; font-size: 16px; font-weight: bolder;padding-left: 30px"><span>工作内容扣减项</span></div>
                        <div class="contentBox">
                            <div class="apl_content_list">
                                <el-row style="background: #f8f8f8;border:none;">
                                    <el-col :span="5">
                                        <div class="grid-content bg-purple">工作失误/损失标准<b>*</b>
                                        </div></el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">分类<b>*</b>
                                        </div></el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">扣分分值</div></el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">严重程度</div></el-col>
                                    <el-col :span="5">
                                        <div class="grid-content bg-purple">最后修改时间</div></el-col>
                                    <el-col :span="3">
                                        <div class="grid-content bg-purple">操作</div></el-col>
                                </el-row>
                                <el-row class="col" v-if="GetErrorListData.length>0" v-for="k in GetErrorListData" :key="k.Name">
                                    <div>
                                        <el-col :span="5">
                                            <div class="grid-content bg-purple">{{k.Name}}</div></el-col>
                                        <el-col :span="3">
                                            <div class="grid-content bg-purple">{{classification(k.Type)}}</div></el-col>
                                        <el-col :span="3">
                                            <div class="grid-content bg-purple">{{k.Score}}</div></el-col>
                                        <el-col :span="3">
                                            <div class="grid-content bg-purple">{{severity(k.MissDegree)}}</div></el-col>
                                        <el-col :span="5">
                                            <div class="grid-content bg-purple">2018-01-01 15:23:23</div></el-col>

                                        <el-col :span="3">
                                            <div class="grid-content bg-purple"><el-button size="mini" type="warning" v-on:click="toOpen(k)">修改</el-button>
                                            </div></el-col>
                                    </div>
                                </el-row>
                            </div>
                            <div style="text-align: center;padding: 60px">
                                <el-button type="warning" class="btn btn-warning" size="small"  v-on:click="toOpen('')">新增</el-button>
                            </div>
                        </div>
                    </div>
        </el-main>
        <!--弹窗-->
          <el-dialog :title="title_s" :visible.sync="dialogFormVisible" class="hardAndEasy" width="760px">
                <el-form :model="ErrorForm" :rules="ErrorRules" ref="ruleErrorForm" label-width="150px" label-position="demo-ruleForm">
                    <el-form-item label="工作失误/损失标准" prop="Name">
                        <el-input v-model="ErrorForm.Name" :maxlength="40"  placeholder="请输入工作失误/损失标准"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="Type">
                        <el-select v-model="ErrorForm.Type" placeholder="请选择分类">
                            <el-option label="失误" value="0"></el-option>
                            <el-option label="损失" value="1"></el-option>
                            <el-option label="其他" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="扣分分值" prop="Score">
                        <el-input v-model="ErrorForm.Score" :maxlength="30"  placeholder="请输入扣分分值"></el-input>
                    </el-form-item>
                    <el-form-item label="严重程度" prop="MissDegree">
                        <el-select v-model="ErrorForm.MissDegree" placeholder="请选择严重程度">
                            <el-option label="一般" value="0"></el-option>
                            <el-option label="次要" value="1"></el-option>
                            <el-option label="严重" value="2"></el-option>
                            <el-option label="非常严重" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button type="" style="margin-right:60px;" v-on:click="resetForm('ruleErrorForm')" @click="dialogFormVisible=false">取 消</el-button>
                    <el-button type="warning" v-on:click="submitErrorForm('ruleErrorForm')">保存</el-button>
                </div>
            </el-dialog>
        <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as performanceAppraisal from '@/api/performanceAppraisal'

export default {
  components: {

  },
  data() {
    return {
      jobid: '',
      contentid: '',
      jobname: '',
      titleStr: '新建工作内容',
      title_s: '',
      GetJobWorkTypeslistData: '', // 职位工作类别选项表
      GetFacilitieslistData: '', // 工作难度选项表
      GetWorkItemTypeslistData: '', // 工作项类别选项表
      GetErrorListData: [],

      listData: '', // 列表数据
      fullscreenLoading: false, // 加载效果状态值
      // 弹窗表
      dialogFormVisible: false,
      operation: false,
      formLabelWidth: '100',
      form: {
        Id: '',
        JobId: '',
        WorkContentName: '',
        Desc: '',
        CompleteScore: '',
        OutputScore: '',
        OutputScoreMax: '',
        JobWorkTypeId: '',
        WorkItemTypeId: '',
        FacilityId: '',
        MissIds: []
      },
      ErrorForm: {
        MissId: '',
        Name: '',
        Type: '',
        Score: '',
        MissDegree: ''
      },
      rules: {
        WorkContentName: [
          { required: true, message: '请输入工作内容', trigger: 'blur' }
        ],
        CompleteScore: [
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]\d{0,3}(?:\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('请输入精确到正2位小数，且不超过四位数的数字'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入完成分值', trigger: 'blur' }
        ],
        JobWorkTypeId: [
          { required: true, message: '请选择职位工作类别', trigger: 'change' }
        ],
        OutputScore: [
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]\d{0,3}(?:\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('请输入精确到正2位小数，且不超过四位数的数字'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入月产值分值', trigger: 'blur' }
        ],
        WorkItemTypeId: [
          { required: true, message: '请选择工作项类别', trigger: 'change' }
        ],
        FacilityId: [
          { required: true, message: '请选择难易度', trigger: 'change' }
        ],
        OutputScoreMax: [
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]\d{0,3}(?:\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('请输入精确到正2位小数，且不超过四位数的数字'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      ErrorRules: {
        Name: [
          { required: true, message: '请输入工作失误/损失标准', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        Score: [
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]\d{0,3}(?:\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('请输入精确到正2位小数，且不超过四位数的数字'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入扣分分值', trigger: 'blur' }
        ],
        MissDegree: [
          { required: true, message: '请输入严重程度', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (/^[^\s]$/.test(value) == false) {
                callback(new Error('请输入严重程度'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      ifPut: false
    }
  },
  mounted() {
    this.GetJobWorkTypes()
    this.GetWorkItemTypes()
    this.GetFacilities()
    this.form.JobId = this.$route.query.jobid
    this.form.Id = this.$route.query.contentid
    this.jobid = this.$route.query.jobid
    this.contentid = this.$route.query.contentid
    this.jobname = decodeURIComponent(this.$route.query.jobname)
    if (this.contentid == '') {
      this.titleStr = '新建工作内容'
    } else {
      this.titleStr = '编辑工作内容'
      this.GetWorkContentDetail(this.contentid)
    }
  },
  watch: {

  },
  methods: {
    // 打开弹窗
    toOpen(data) {
      console.log(data)
      if (data != '') {
        this.title_s = '修改工作内容扣减项'
        this.ErrorForm.MissId = data.MissId
        this.ErrorForm.Name = data.Name
        this.ErrorForm.Type = data.Type + ''
        this.ErrorForm.Score = data.Score + ''
        this.ErrorForm.MissDegree = data.MissDegree + ''
      } else {
        this.title_s = '新增工作内容扣减项'
        this.ErrorForm.MissId = ''
        this.ErrorForm.Name = ''
        this.ErrorForm.Type = ''
        this.ErrorForm.Score = ''
        this.ErrorForm.MissDegree = ''
      }
      // this.ErrorForm.MissId = data ???????
      this.dialogFormVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 工作内容保存
    submitForm(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          const that = this
          performanceAppraisal.AddOrUpdateWorkContent(getToken(), that.form).then(res => {
            console.log(res.data)
            if (res.data.Successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                  // that.getList(that.JobId, 1, 25)
                  that.$router.push({ path: '/PerformanceAppraisal/JobContent_DetailPage', query: { id: that.jobid }})
                }
              })
            } else {
              that.$message({
                message: res.data.Message,
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 工作内容减分项设置
    submitErrorForm(formName) { // 提交
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ErrorForm)
          const Arr = []
          Arr.push(this.ErrorForm)
          const that = this
          performanceAppraisal.AddOrUpdateMissItem(getToken(), Arr).then(res => {
            console.log(res.data)
            if (res.data.Successful) {
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function() {
                  if (that.ErrorForm.MissId != '') { // 编辑
                    for (let i = 0; i < that.GetErrorListData.length; i++) {
                      if (that.GetErrorListData[i].MissId == res.data.Data[0].MissId) {
                        that.GetErrorListData[i].Name = res.data.Data[0].Name
                        that.GetErrorListData[i].Type = res.data.Data[0].Type
                        that.GetErrorListData[i].Score = res.data.Data[0].Score
                        that.GetErrorListData[i].MissDegree = res.data.Data[0].MissDegree
                      }
                    }
                  } else {
                    that.GetErrorListData.push(res.data.Data[0])
                    that.form.MissIds.push(res.data.Data[0].MissId)
                  }
                  that.dialogFormVisible = false
                }
              })
            } else {
              that.$message({
                message: res.data.Message,
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 分类
    classification(type) {
      if (type == 0) {
        return '失误'
      } else if (type == 1) {
        return '损失'
      } else if (type == 2) {
        return '其它'
      }
    },
    // 严重程度
    severity(type) {
      if (type == 0) {
        return '一般'
      } else if (type == 1) {
        return '次要'
      } else if (type == 2) {
        return '严重'
      } else if (type == 3) {
        return '非常严重'
      }
    },
    // 职位工作类别
    GetJobWorkTypes() {
      const that = this
      performanceAppraisal.GetJobWorkTypes(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.GetJobWorkTypeslistData = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 工作项类别
    GetWorkItemTypes() {
      const that = this
      performanceAppraisal.GetWorkItemTypes(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.GetWorkItemTypeslistData = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 难易度
    GetFacilities() {
      const that = this
      performanceAppraisal.GetFacilities(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.GetFacilitieslistData = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 获取详情
    GetWorkContentDetail(ID) {
      this.listData = []
      const that = this
      performanceAppraisal.GetWorkContentDetail(getToken(), ID).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.form.Id = res.data.Data.Id
          that.form.WorkContentName = res.data.Data.WorkContentName
          that.form.Desc = res.data.Data.Desc
          that.form.CompleteScore = res.data.Data.CompleteScore + ''
          that.form.OutputScore = res.data.Data.OutputScore + ''
          that.form.OutputScoreMax = res.data.Data.OutputScoreMax
          that.form.JobWorkTypeId = res.data.Data.JobWorkTypeId
          that.form.WorkItemTypeId = res.data.Data.WorkItemTypeId
          that.form.FacilityId = res.data.Data.FacilityId
          that.GetErrorListData = res.data.Data.KPIMissItems
          if (that.GetErrorListData.length > 0) {
            for (let i = 0; i < that.GetErrorListData.length; i++) {
              that.form.MissIds.push(that.GetErrorListData[i].MissId)
            }
          }
          console.log(that.form)
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
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
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0 0 20px 0;
     .contentBox{
         .el-row{
              height: 60px;
              border-bottom: 1px solid #dedede;
              .grid-content.bg-purple{
                height: 60px;
               line-height: 60px;
               text-align: center;
               b{
                 color: #f99740;
                 margin-left: 5px;
               }
              }
            }
     }
     .FormCenter{
         margin: 60px auto;
         width:970px;
     }
  }

}

</style>
