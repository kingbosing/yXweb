<template>
  <el-container>
    <el-aside>
      <el-container>
        <el-header>
          <el-button size="small" v-on:click="boxShow('type','add','')">添加职位类别</el-button>
        </el-header>
        <el-main>
          <el-row>
            <el-col v-for="type in typedata" :key="type.ID" :class="type.typeselected?'typebox active':'typebox'" @click.native="ToSelectType(type.ID)">
              <span>{{type.CategroyName}}</span>
              <div class="iconbox">
                <new-icon class="icon" :icon-name="'#icon-zhongmingming16px'" v-on:click.native="boxShow('type','edit',type)" />
                <new-icon class="icon" :icon-name="'#icon-shanchu1'" @click.native="ToDeleteType(type.ID)"/>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-aside>
    <el-main>
      <el-container>
        <el-header>
          <el-button size="small" v-show="typeselected" @click="boxShow('job','add','')">添加职位</el-button>
        </el-header>
        <el-main>
          <el-row>
            <el-col :xs="12" :sm="7" :md="4" :lg="7" :xl="5" class="positionbox" v-for="job in Jobs" :key="job.ID">
              <el-container>
                <el-header>{{job.JobName}}</el-header>
                <el-main class="contentbox" v-if="job.JobDescription!=''">{{job.JobDescription}}</el-main>
                 <el-main class="noneOfcontent" v-else>未设置岗位需求</el-main>
                 <el-footer>
                     <div class="iconbox">
                         <new-icon class="icon" :icon-name="'#icon-zhongmingming16px'" @click.native="boxShow('job','edit',job)"/>
                <new-icon class="icon" :icon-name="'#icon-shanchu1'" @click.native="ToDeleteJob(job.ID)"/>
                <new-icon class="icon right" :icon-name="'#icon-chakanxiangqing'" @click.native="ToShowDuty(job)"/>
              </div>

                 </el-footer>
              </el-container>
            </el-col>

          </el-row>
        </el-main>
      </el-container>
    </el-main>
<el-dialog :title="isEditOrAdd?'编辑职位类别':'添加职位类别'" :visible.sync="Type_dialogFormVisible">
  <el-form :model="type_form" label-position="left" label-width="120px" :rules="typerule" ref="type_form">
    <el-form-item label="类别名称" prop="name">
      <el-input v-model="type_form.name" placeholder="输入职位类别" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Type_dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="ToAddType('type_form')" v-if="!isEditOrAdd">确 定</el-button>
    <el-button type="primary" @click="ToEditType('type_form')" v-else>确 定</el-button>
  </div>
</el-dialog>
<el-dialog  :title="isEditOrAdd?'编辑职位':'添加职位'" :visible.sync="Job_dialogFormVisible">
  <el-form :model="job_form" label-position="left" label-width="120px" :rules="jobrule" ref="job_form">
    <el-form-item label="职位名称" prop="name">
      <el-input v-model="job_form.name" placeholder="请输入职位名称" ></el-input>
    </el-form-item>
        <el-form-item label="岗位职责" prop="duty">
           <el-input type="textarea" v-model="job_form.duty" placeholder="请输入岗位职责描述"></el-input>

    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Job_dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="ToAddJob('job_form')" v-if="!isEditOrAdd">确 定</el-button>
      <el-button type="primary" @click="ToEditJob('job_form')" v-else>确 定</el-button>
  </div>
</el-dialog>
<el-dialog class="dutybox"
  :title="job_form.name"
  :visible.sync="duty_dialogVisible"
  width="30%">
  <span>{{job_form.duty}}</span>
</el-dialog>

  </el-container>
</template>
<script>
import * as API from '@/api/PersonnelMana_Position'
//  import Vue from 'vue'
export default {
  name: 'position-manage',
  props: {},
  data() {
    return {
      typeselected: false,
      isEditOrAdd: false,
      typedata: [], // 职位类别
      Jobs: [], // 职位
      Type_dialogFormVisible: false,
      Job_dialogFormVisible: false,
      duty_dialogVisible: false,
      type_form: {
        id: '',
        name: ''
      },
      typerule: {
        name: [
          { required: true, message: '类别名称不能为空！', trigger: 'blur' }
        ]
      },
      job_form: {
        id: '',
        name: '',
        duty: ''
      },
      jobrule: {
        name: [{ required: true, message: '职位名称不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.ToGetTypeData()
  },
  computed: {
    // 格式化数据源
  },
  methods: {
    ToSelectType: function(id) {
      const that = this
      that.typedata.forEach(element => {
        if (element.ID == id) {
          element.typeselected = true
          that.type_form.id = id
          // that.Jobs = element.Jobs
          that.ToGetjobData()
          that.typeselected = true
        } else {
          element.typeselected = false
        }
      })
      // console.log(that.typedata)
      // this.typeselected = true
    },
    ToGetTypeData: function() {
      const that = this
      API.Getcategory('').then(res => {
        // console.log(res)
        if (res.data.Data.length > 0) {
          res.data.Data.forEach(element => {
            element.typeselected = false
          })
          that.typedata = res.data.Data
          that.Jobs = res.data.Data.Jobs
          // console.log(that.typedata)
        }
      })
    },
    ToGetjobData: function() {
      const that = this
      API.Getjob(that.type_form.id, '').then(res => {
        if (res.data.successful) {
          that.Jobs = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    boxShow: function(name, type, model) {
      if (name == 'type') {
        this.Type_dialogFormVisible = true
        // console.log(model)
        this.type_form.id = model.ID
        this.type_form.name = model.CategroyName
      } else {
        this.Job_dialogFormVisible = true
        this.job_form.id = model.ID
        this.job_form.name = model.JobName
        this.job_form.duty = model.JobDescription
      }

      this.isEditOrAdd = type == 'edit'
    },
    ToAddType: function(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          API.IsExistCategory(that.type_form.name).then(res => {
            // console.log(that.$store.state.company.CompanyCode)
            if (!res.data.Data) {
              API.Addcategory(
                that.type_form.name,
                that.$store.state.company.CompanyCode
              ).then(resp => {
                // console.log(resp)
                if (resp.data.successful) {
                  that.Type_dialogFormVisible = false
                  that.ToGetTypeData()
                  setTimeout(() => {
                    that.ToSelectType(resp.data.Data)
                  }, 100)
                }
              })
            } else {
              that.$message({
                message: '该类别已存在！',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    ToAddJob: function(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          API.Isexistjob(that.job_form.name, '', that.type_form.id).then(
            res => {
              // console.log(that.$store.state.company.CompanyCode)
              if (!res.data.Data) {
                const job = {
                  CategoryId: that.type_form.id,
                  JobName: that.job_form.name,
                  JobDescription: that.job_form.duty,
                  CreatorId: '',
                  CompanyId: that.$store.state.company.CompanyCode
                }
                console.log(job)
                API.Addjob(job).then(resp => {
                  // console.log(resp)
                  if (resp.data.successful) {
                    // console.log(resp)
                    that.ToGetjobData()
                    that.Job_dialogFormVisible = false
                  } else {
                    console.log(resp)
                  }
                })
              } else {
                that.$message({
                  message: '该职位已存在！',
                  type: 'warning'
                })
              }
            }
          )
        }
      })
    },
    ToEditType: function(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          API.IsExistCategory(that.type_form.name).then(res => {
            // console.log(that.$store.state.company.CompanyCode)
            if (!res.data.Data) {
              API.Renamecategory(that.type_form.id, that.type_form.name).then(
                resp => {
                  // console.log(resp)
                  if (resp.data.successful) {
                    that.Type_dialogFormVisible = false
                    that.ToGetTypeData()
                    setTimeout(() => {
                      that.ToSelectType(resp.data.Data)
                    }, 100)
                  }
                }
              )
            } else {
              that.$message({
                message: '该类别已存在！',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    ToEditJob: function(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          API.Isexistjob(
            that.job_form.name,
            that.job_form.id,
            that.type_form.id
          ).then(res => {
            // console.log(that.$store.state.company.CompanyCode)
            if (!res.data.Data) {
              const job = {
                ID: that.job_form.id,
                CategoryId: that.type_form.id,
                JobName: that.job_form.name,
                JobDescription: that.job_form.duty,
                CreatorId: '',
                CompanyId: that.$store.state.company.CompanyCode
              }
              console.log(job)
              API.Editjob(job).then(resp => {
                // console.log(resp)
                if (resp.data.successful) {
                  // console.log(resp)
                  that.ToGetjobData()
                  that.Job_dialogFormVisible = false
                } else {
                  console.log(resp)
                }
              })
            } else {
              that.$message({
                message: '该职位已存在！',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    ToDeleteType: function(id) {
      const that = this
      API.Isexistempolyee_category(id).then(res => {
        if (res.data.successful) {
          if (res.data.Data <= 0) {
            that.$confirm('此操作将删除该职位类别, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              API.Deletecategory(id).then(resp => {
                if (resp.data.successful) {
                  that.$message({
                    type: 'success',
                    message: '删除成功!',
                    onClose: function() {
                      that.ToGetTypeData()
                    }
                  })
                }
              })
            }).catch(() => {
              that.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else {
            that.$confirm('该类别下有员工任职，不能删除!', '提示', {
              confirmButtonText: '我知道了',
              type: 'warning',
              center: true,
              showCancelButton: false
            })
          }
        }
      })
    },
    ToDeleteJob: function(id) {
      const that = this
      API.Isexistempolyee(id).then(res => {
        if (res.data.successful) {
          if (res.data.Data <= 0) {
            that.$confirm('此操作将删除该职位, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              API.Deletejob(id).then(resp => {
                if (resp.data.successful) {
                  that.$message({
                    type: 'success',
                    message: '删除成功!',
                    onClose: function() {
                      that.ToGetjobData()
                    }
                  })
                }
              })
            }).catch(() => {
              that.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else {
            that.$confirm('该职位下有员工任职，不能删除!', '提示', {
              confirmButtonText: '我知道了',
              type: 'warning',
              center: true,
              showCancelButton: false
            })
          }
        }
      })
    },
    ToShowDuty(job) {
      this.duty_dialogVisible = true
      this.job_form.name = job.JobName
      this.job_form.duty = job.JobDescription
      this.job_form.id = job.ID
    }
  }
}
</script>
<style lang="scss">
.el-message-box--center {
  .el-message-box__header{
  background: none;
  padding-top:15px;
}
}
</style>

<style lang="scss" scoped>
.el-aside {
  border-right: 1px solid #dedede;
  .el-main {
    .typebox {
      padding: 20px;
      color: #8a8a8a;
      span {
        float: left;
      }
      .iconbox {
        width: 50px;
        float: right;
        .icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      &:hover {
        background: #efefef;
      }
      &.active {
        background: #fef4ec;
        color: #f99740;
      }
    }
  }
}

.el-main {
  padding: 0;
  .el-container {
    .el-main {
      padding: 0;
      .el-main {
        padding: 0;
        .el-main {
          padding: 20px;
          .el-row {
            margin: 0 !important;
            .positionbox {
              padding: 0 !important;
              border: 1px solid #dedede;
              margin-right: 20px;
              margin-top: 20px;
              .el-main {
                &.contentbox {
                  height: 80px;
                  color: #656161;
                }
                &.noneOfcontent {
                  height: 80px;
                  color: #dedede;
                }
              }
              .el-header,
              .el-footer {
                height: 40px !important;
              }
              .el-header {
                background: #f4f4f4;
                color: #323232;
              }
              .el-footer {
                padding: 10px 10px;
                color: #656161;
                border-top: 1px solid #dedede;
                .iconbox {
                  .icon {
                    margin-left: 10px;
                    color: #656161;
                    cursor: pointer;

                    &.right {
                      font-size: 18px;
                      float: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.dutybox{
  .el-message-box__header{
  background: #f4f4f4;
  padding-top:15px;
}
.el-dialog__body {
    padding: 30px 20px;
}
}
</style>
