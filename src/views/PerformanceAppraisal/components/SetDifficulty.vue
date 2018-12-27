<template>
    <el-container v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
       <el-header>
            <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">难易度管理<b>*</b></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">难易度描述</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">创建时间</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">最后修改时间</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">状态<b>*</b></div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
            </el-row>
       </el-header>
       <el-main :class="{'emptyImg':listData.length==0}">
             <el-row class="col"  v-for="k in listData" :key="k.Name">
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.Name}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{!k.Desc?'(空)':k.Desc}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">{{!k.CreateTime?'(空)':k.CreateTime}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">{{!k.UpdateTime?'(空)':k.UpdateTime}}</div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple">{{k.Enable?'可用':'禁用'}}</div></el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                           <el-button size="mini" type="danger" v-if="k.Enable==true" @click="disableFun(k.Id)">禁用</el-button>
                           <el-button size="mini" v-else @click="Enable(k.Id,1)">启用</el-button>
                           <el-button size="mini" type="warning" v-on:click="toOpen(k.Id)">修改</el-button>
                        </div>
                    </el-col>
            </el-row>
       </el-main>
       <el-footer>
            <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
            </el-pagination>
       </el-footer>
       <!--**********弹窗************-->
        <el-dialog :title="titleStr" :visible.sync="dialogFormVisible" class="hardAndEasy" width="760px">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="demo-ruleForm">
                <el-form-item label="难易度名称:" prop="name">
                    <el-input v-model="form.name" :maxlength="15" v-on:keyup.native="DelK()" placeholder="请输入难易度名称"></el-input>
                </el-form-item>
                <el-form-item label="难易度描述:" prop="describe">
                    <el-input v-model="form.describe" :maxlength="30"  v-on:keyup.native="DelE()" placeholder="请输入难易度描述"></el-input>
                </el-form-item>
                <el-form-item label="状态:" prop="state">
                    <el-select v-model="form.state" placeholder="请选择状态">
                        <el-option label="可用" value="true"></el-option>
                        <el-option label="禁用" value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="" style="margin-right:60px;" v-on:click="resetForm('ruleForm')" @click="dialogFormVisible=false">取 消</el-button>
                <el-button type="warning" v-on:click="submitForm('ruleForm')" :loading="ifPut">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="operation" class="hardAndEasy" width="480px">
            <p style="text-align:center; font-size: 16px; margin-bottom: 10px;">当前选项被禁用将不会影响到已有数据，只对后续数据有影响，请确认是否继续操作？</p>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="" style="margin-right:60px;" @click="operation=false">取 消</el-button>
                <el-button type="warning" @click="operation = false" v-on:click="Enable(funId,2)">确 定</el-button>
            </div>
        </el-dialog>
       <!--********************************-->
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
      listData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      // 弹窗表
      dialogFormVisible: false,
      operation: false,
      formLabelWidth: '100',
      form: {
        name: '',
        describe: '',
        state: ''
      },
      rules: {
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写难易度名称', trigger: 'blur' }
        ]

      },
      ifPut: false,
      funId: '',
      titleStr: '新建难易度'
    }
  },
  mounted() {
    this.getList(1, 25)
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 弹窗
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) { // 提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.ifPut = true
          var Data = {
            Id: this.funId,
            Name: this.form.name,
            Desc: this.form.describe,
            Enable: this.form.state
          }
          console.log(Data)
          if (Data.Id == '') { // 新建
            const that = this
            performanceAppraisal.facility_create(getToken(), Data).then(res => {
              console.log(res.data)
              if (res.data.Successful) {
                that.$message({
                  message: '新建成功',
                  type: 'success',
                  onClose: function() {
                    that.ifPut = false
                    that.getList(1, 25)
                    that.dialogFormVisible = false
                  }
                })
              } else {
                that.ifPut = false
                that.$message({
                  message: res.data.Message,
                  type: 'warning'
                })
              }
            })
          } else { // 编辑
            const that = this
            performanceAppraisal.facility_edit(getToken(), Data).then(res => {
              console.log(res.data)
              if (res.data.Successful) {
                that.$message({
                  message: '编辑成功',
                  type: 'success',
                  onClose: function() {
                    that.ifPut = false
                    that.getList(1, 25)
                    that.dialogFormVisible = false
                  }
                })
              } else {
                that.ifPut = false
                that.$message({
                  message: res.data.Message,
                  type: 'warning'
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    DelK: function() {
      this.form.name = (this.form.name).trim()
    },
    DelE: function() {
      this.form.describe = (this.form.describe).trim()
    },
    // 新建打开
    newOpen() {
      this.toOpen('')
    },
    // 编辑打开
    toOpen(ID) {
      console.log(ID)
      if (ID == '') {
        this.titleStr = '新建难易度'
        this.dialogFormVisible = true
        this.funId = ''
        this.resetForm('ruleForm')
      } else {
        this.titleStr = '编辑难易度'
        this.dialogFormVisible = true
        this.funId = ID
        const that = this
        performanceAppraisal.facility_get_info(getToken(), ID).then(res => {
          console.log(res.data)
          if (res.data.Successful) {
            that.form.name = res.data.Data.Name
            that.form.describe = res.data.Data.Desc
            that.form.state = res.data.Data.Enable + ''
          } else {
            that.$message({
              message: res.data.Message,
              type: 'error'
            })
          }
        })
      }
    },
    // 启用禁用
    Enable(id, num) {
      console.log(id, num)
      const that = this
      performanceAppraisal.facility_set_status(getToken(), id, num).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.$message({
            message: '操作成功',
            type: 'success',
            onClose: function() {
              that.getList(1, 25)
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    // 禁用弹窗
    disableFun(id) {
      this.funId = id
      this.operation = true
    },
    // 获取数据列表
    getList(pageIndex, pageSize) {
      this.listData = []
      const that = this
      that.fullscreenLoading = true
      performanceAppraisal.facility_get_list(getToken(), pageIndex, pageSize).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.listData = res.data.Data.Records
          that.totalCount = res.data.Data.TotalCount
          that.fullscreenLoading = false
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      this.getList(1, this.size)
    },

    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.getList(this.index, this.size)
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
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            font-weight: normal;
            font-size: 14px;
            padding: 0;
            background-color: rgb(248, 248, 248);
            .el-row{
              height: 60px;
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
         .el-main{
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
    }
  }

}
.emptyImg{
background: url("/images/apply_empty.png") no-repeat center;
}
</style>

