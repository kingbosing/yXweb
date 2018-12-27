<template>
     <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-main v-if="list.length>0">
            <el-collapse v-model="activeNames" @change="handleChange">

                <el-collapse-item  v-for="(key,v) in list" :key="v">
                    <template slot="title">
                         {{key.Title}}
                         <i class="header-icon el-icon-delete" @click.stop="doDelete(key)"></i>
                         <i class="header-icon el-icon-edit" @click.stop="doEdit(key)"></i>
                    </template>
                    <div class='lisContent_c'><span class="left">面试邀请：</span><span class="right">{{key.TheContent}}</span></div>
                    <div class='lisContent_c'><span class="left">联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><span class="right">{{key.Linkman}}</span></div>
                    <div class='lisContent_c'><span class="left">联系方式：</span><span class="right">{{key.Phone}}</span></div>

                    <div class='lisContent_c' v-if="key.Email"><span class="left">邮箱地址：</span><span class="right">{{key.Email}}</span></div>
                    <div class='lisContent_c' v-else><span class="left">邮箱地址：</span><span class="right">(空)</span></div>

                    <div class='lisContent_c'><span class="left">面试地址：</span><span class="right">{{key.Address}}</span></div>

                    <div class='lisContent_c' v-if="key.BusLine"><span class="left">乘车路线：</span><span class="right">{{key.BusLine}}</span></div>
                    <div class='lisContent_c' v-else><span class="left">乘车路线：</span><span class="right">(空)</span></div>
                </el-collapse-item>

            </el-collapse>

        </el-main>
        <el-main v-else>
            <p style="text-align: center;line-height:60px;">暂无数据记录！</p>
        </el-main>
        <el-dialog :visible.sync="visible">
                <el-form :model="theData" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="模板名称：" prop="Title">
                        <el-input v-model="theData.Title" placeholder="面试邀请模板"></el-input>
                    </el-form-item>
                     <el-form-item label="面试邀请：" prop="TheContent">
                        <el-input v-model="theData.TheContent" type="textarea" :rows="4"></el-input>
                    </el-form-item>
                     <el-form-item label="联 系 人：" prop="Linkman">
                        <el-input v-model="theData.Linkman"></el-input>
                    </el-form-item>
                     <el-form-item label="联系方式：" prop="Phone">
                        <el-input v-model="theData.Phone"></el-input>
                    </el-form-item>
                     <el-form-item label="邮箱地址：" prop="Email">
                        <el-input v-model="theData.Email"></el-input>
                    </el-form-item>
                     <el-form-item label="面试地址：" prop="Address">
                        <el-input v-model="theData.Address"></el-input>
                    </el-form-item>
                    <el-form-item label="乘车路线：" prop="BusLine">
                        <el-input v-model="theData.BusLine"></el-input>
                    </el-form-item>
                    <p style="padding:20px 0 40px;text-align:center">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary"  @click="submitForm('ruleForm')">确 定</el-button>
                    </p>
                </el-form>

            </el-dialog>
     </el-container>
</template>

<script>
import { get_inmsList, del_inm, update_inm, add_inm } from '@/api/recruitment'
import { validateTel } from '@/utils/validate'

export default {
  data() {
    const getValidateTel = (rule, value, callback) => {
      if (validateTel(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的电话号码！'))
      }
    }
    return {
      fullscreenLoading: false,
      list: [],
      activeNames: ['1'],
      form: {
        name: ''
      },
      visible: false,
      theData: {
        Id: '',
        Title: '',
        TheContent: '',
        Phone: '',
        Linkman: '',
        Email: '',
        Address: '',
        BusLine: ''
      },
      rules: {
        Title: [
          { required: false, message: '请输入模板名称', trigger: 'blur' }
        ],
        TheContent: [
          { required: true, message: '请输入面试邀请内容', trigger: 'blur' }
        ],
        Phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur', validator: getValidateTel }
        ],
        Linkman: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        Email: [
          { type: 'email', required: false, message: '请输入正确的联系邮箱', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请输入面试地址', trigger: 'blur' }
        ],
        BusLine: [
          { required: false, message: '请输入乘车路线', trigger: 'blur' }
        ]

      }

    }
  },
  props: ['ifAdd'],
  mounted() {
    this.init()
  },
  watch: {
    getInvite(v) {
      this.visible = v
    },
    visible(v) {
      this.$store.dispatch('addInvite', v).then(() => {
        this.$emit('change')
      })
      if (!v) {
        this.theData = {
          Id: '',
          Title: '',
          TheContent: '',
          Phone: '',
          Linkman: '',
          Email: '',
          Address: '',
          BusLine: ''
        }
      }
    }
  },
  computed: {
    getInvite() {
      return this.$store.state.recruitm.inviteAdd
    }
  },

  methods: {
    init() {
      getList(this)
    },
    handleChange() {

    },
    doDelete(key) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_inm(key.Id).then(c => {
          if (c.data.Code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init(this)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    doEdit(key) {
      this.theData = JSON.parse(JSON.stringify(key))
      this.$store.dispatch('addInvite', true).then(() => {
        this.$emit('change')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.theData.Title) {
            this.theData.Title = '面试邀请模板' + (this.list.length + 1)
          }
          if (this.theData.Id) {
            update_inm(this.theData).then(c => {
              const data = c.data
              if (data.Code == 0) {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                })
                this.visible = false
                this.init(this)
              } else {
                this.$message({
                  type: 'info',
                  message: data.message
                })
              }
            })
          } else {
            add_inm(this.theData).then(c => {
              const data = c.data
              if (data.Code == 0) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.visible = false
                this.init(this)
              } else {
                this.$message({
                  type: 'info',
                  message: data.message
                })
              }
            })
          }
        } else {
          return false
        }
      })
    }

  }
}

const getList = (app) => {
  get_inmsList().then(c => {
    const data = c.data
    console.log(data)
    app.list = data.Data
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main{
        height: 100%;
        margin:0 auto;
        .el-collapse{
            width: 100%;
            .el-collapse-item__header{
                    color: #b3b3b3;
                    font-size: 18px;
                .header-icon{
                    float: right;
                    color: #b3b3b3;
                    float: right;
                    font-size: 16px;
                    margin: 13px;
                }
            }
            .lisContent_c{
                line-height: 36px;
                font-size: 14px;
                padding-left: 20px;
                .left{
                    color: #8a8a8a;
                    margin-right: 15px;
                }
                .right{
                    color: #4d4d4d;
                }
            }

        }
    }
}
</style>

