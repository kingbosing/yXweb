<template>
  <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
    v-cloak>
    <el-header height="50px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/PersonnelManagement/index' }">基本员工信息</el-breadcrumb-item>
        <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="header-right">
        <div class="tools_search">
          <el-input placeholder="请输入职位名称" suffix-icon="el-icon-search" v-model="input" @keyup.enter.native="searchFor"></el-input>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-table :data="Jobs" height="100%" style="width: 100%" stripe>
        <el-table-column prop="JobName" label="职位名称"></el-table-column>
        <el-table-column prop="CategroyName" label="职位类别">
        </el-table-column>
        <el-table-column prop="" label="岗位职责">
          <template slot-scope="scope">
            {{scope.row.JobDescription=='' || scope.row.JobDescription==null?"(空)":scope.row.JobDescription}}
          </template>
        </el-table-column>
         <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
       <new-icon class="icon" :icon-name="'#icon-zhongmingming16px'" @click.native="boxShow('edit',scope.row)"/>
                <new-icon class="icon" :icon-name="'#icon-shanchu1'" @click.native="ToDeleteJob(scope.row.ID)"/>
                <new-icon class="icon right" :icon-name="'#icon-chakanxiangqing'" @click.native="ToShowDuty(scope.row)"/>
      </template>
    </el-table-column>
      </el-table>
    </el-main>
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
export default {
  components: {},
  data() {
    return {
      fullscreenLoading: false, // 加载效果状态值
      Jobs: [], // 列表数据
      EmployeeData: [], // 员工数据
      funId: '', // 操作ID
      input: '',
      Job_dialogFormVisible: false,
      duty_dialogVisible: false,
      isEditOrAdd: false,
      type_formid: '',
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
    // this.ToGetjobData()
    this.input = decodeURIComponent(this.$route.query.searchText)
    this.ToGetjobData(this.input)
  },
  watch: {},
  methods: {
    searchFor: function() {
      this.ToGetjobData(this.input)
    },
    ToGetjobData: function(key) {
      const that = this
      API.Getjob('', key).then(res => {
        if (res.data.successful) {
          that.Jobs = res.data.Data
          console.log(that.Jobs)
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    boxShow: function(type, model) {
      this.Job_dialogFormVisible = true
      this.job_form.id = model.ID
      this.job_form.name = model.JobName
      this.job_form.duty = model.JobDescription
      this.type_formid = model.CategroyID
      this.isEditOrAdd = type == 'edit'
    },
    ToEditJob: function(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          API.Isexistjob(
            that.job_form.name,
            that.job_form.id,
            that.type_formid
          ).then(res => {
            // console.log(that.$store.state.company.CompanyCode)
            if (!res.data.Data) {
              const job = {
                ID: that.job_form.id,
                CategoryId: that.type_formid,
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
                  that.ToGetjobData(that.input)
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
    ToDeleteJob: function(id) {
      const that = this
      API.Isexistempolyee(id).then(res => {
        if (res.data.successful) {
          if (res.data.Data <= 0) {
            that
              .$confirm('此操作将删除该职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              })
              .then(() => {
                API.Deletejob(id).then(resp => {
                  if (resp.data.successful) {
                    that.$message({
                      type: 'success',
                      message: '删除成功!',
                      onClose: function() {
                        that.ToGetjobData(that.input)
                      }
                    })
                  }
                })
              })
              .catch(() => {
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

  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;

    .el-container {
      height: 100%;

      .el-header {
        border-bottom: none;
        font-weight: normal;
        font-size: 16px;

        span {
          margin-right: 10px;
          cursor: pointer;
        }

        .active {
          color: #f99740;
        }
      }
    }
  }
}

.file_col_icon {
  font-size: 18px;
}
.icon {
  margin-left: 20px;
}

</style>
<style lang="scss">
.dutybox {
  .el-dialog {
    .el-dialog__header {
      background: #f4f4f4;
    }
    .el-dialog__body {
      padding: 30px 20px;
    }
  }
}
</style>
