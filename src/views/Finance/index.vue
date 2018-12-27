<template>
    <el-container class="temlateMain">
         <el-header height="50px">
            <span :class="{'active' : getPage==1,'tab_btn':true}" @click="getPage=1">会计凭证</span>
            <span :class="{'active' : getPage==2,'tab_btn':true}" @click="getPage=2">凭证列表</span>
            <!--<div class="header-right" v-if="getPage==1">
              <el-button type="" size="small">更多凭证 >></el-button>
            </div>-->
            <div class="header-right" v-if="getPage==2">
              <el-button type="warning" size="small" v-if="IsAuthority" @click="AuditCertificateCheck(2)">通过</el-button>
              <el-button type="warning" size="small" v-if="IsAuthority" @click="AuditCertificateCheck(3)">不通过</el-button>
              <el-button type="warning" size="small" v-if="IsAuthority" @click="AuditCertificateCheck(1)">反审核</el-button>
              <el-button type="warning" size="small" v-on:click="DeleteCertificateCheck">批量删除</el-button>
              <el-popover placement="bottom" width="560" trigger="click" v-model="visible_1" style="margin:0 10px;">
                  <div class="popover_content">
                  <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="会计期间：">
                             <el-form-item prop="date1">
                                <el-date-picker  type="month" format="yyyy年MM期" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                      </el-form-item>
                      <el-form-item label="排序：">
                          <el-radio-group v-model="form.resource">
                          <el-radio label="1">按凭证号</el-radio>
                          <el-radio label="2">按凭证日期</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <p class="button" style="text-align:center">
                        <el-button @click="visible_1=false" style="margin-right:100px;">取 消</el-button>
                        <el-button type="warning" @click="ArrangeBrokenNumber">确 认</el-button>
                      </p>
                  </el-form>
                  </div>
                   <el-button type="warning" size="small" slot="reference">整理断号</el-button>
              </el-popover>
              <el-button type="warning" size="small" @click="exportBtn">导 &nbsp; &nbsp;出</el-button>
              <el-button type="success" size="small"  @click="getPage=1">新增凭证</el-button>
            </div>
        </el-header>
        <el-main class="">
             <new-voucher v-if="getPage===1"></new-voucher>
             <documents-list v-if="getPage===2" v-model='checkedId' ref="transEvent"></documents-list>
        </el-main>
        <!--弹窗-->
              <el-dialog title="提示" :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span v-if="AuditCertificateCheck_S==2">您勾选的凭证中可{{AuditCertificateCheck_text}}：<span style="color:#5cb85c;">{{CorrectCount}}条</span>确认是否{{AuditCertificateCheck_text}}？</span>
                  <span v-if="AuditCertificateCheck_S==1">您勾选的凭证中可{{AuditCertificateCheck_text}}：<span style="color:#5cb85c;">{{CorrectCount}}条</span>,不可{{AuditCertificateCheck_text}}：<span style="color:#f54634;">{{WrongCount}}条</span>,确认是否{{AuditCertificateCheck_text}}？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="AuditMultiCertificate">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog title="提示" :visible.sync="centerDialogVisible_4" width="30%" center>
                  <span>您确认是否删除此凭证？</span>
                  <span>删除后将不可恢复，并产生断号。</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_4 = false" style="margin-right:100px" v-on:click="batchDelete">确 定</el-button>
                     <el-button @click="centerDialogVisible_4 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <!--****************************-->
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import documentsList from './component/documentsList'
import newVoucher from './components/newVoucher'
import * as finance from '@/api/finance'

export default {
  components: {
    documentsList,
    newVoucher
  },
  data() {
    return {
      getPage: 1,
      // 权限
      IsAuthority: true,
      checkedId: [],
      visible_1: false,
      form: {
        date1: new Date(),
        resource: '1'
      },
      centerDialogVisible_1: false, // 审核
      centerDialogVisible_4: false, // 删除
      AuditCertificateCheck_text: '审核',
      AuditCertificateCheck_S: 1,
      CorrectCount: 0,
      WrongCount: 0,
      AuditType: 1
    }
  },
  mounted() {
    if (this.$route.query.getPage != undefined) {
      this.getPage = this.$route.query.getPage
    }
    // this.initial()
  },
  watch: {},
  methods: {
    // 批量删除验证
    DeleteCertificateCheck() {
      if (this.checkedId.length == 0) {
        this.$message({
          message: '请选择要删除的凭证！',
          type: 'warning'
        })
      } else {
        const model = {
          'IdList': this.checkedId
        }
        console.log(model)
        const that = this
        return new Promise((resolve, reject) => {
          finance.DeleteCertificateCheck(getToken(), model)
            .then(response => {
              console.log(response.data)
              if (response.data.Successful) {
                if (response.data.Data == true) {
                  that.centerDialogVisible_4 = true
                } else {
                  that.$message({
                    message: '该记账凭证已审核，无法进行删除操作！',
                    type: 'warning'
                  })
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
      }
    },
    // 导出凭证
    exportBtn() {
      this.$refs.transEvent.ExportCertificateList()
    },
    // 批量删除
    batchDelete() {
      const model = {
        'IdList': this.checkedId
      }
      console.log(model)
      const that = this
      return new Promise((resolve, reject) => {
        finance.DeleteMultiCertificate(getToken(), model)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.$refs.transEvent.GetCertificateList()
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
    // 审核验证
    AuditCertificateCheck(num) {
      if (this.checkedId.length == 0) {
        this.$message({
          message: '请至少选择一条记录再进行操作！',
          type: 'warning'
        })
      } else {
        const model = {
          'Type': num,
          'IdList': this.checkedId
        }
        console.log(model)
        const that = this
        return new Promise((resolve, reject) => {
          finance.AuditCertificateCheck(getToken(), model)
            .then(response => {
              console.log(response.data)
              if (response.data.Successful) {
                if (response.data.Data.WrongCount == 0) {
                  that.AuditCertificateCheck_S = 2
                } else {
                  that.AuditCertificateCheck_S = 1
                }
                that.CorrectCount = response.data.Data.CorrectCount
                that.WrongCount = response.data.Data.WrongCount
                if (num == 1) {
                  that.AuditCertificateCheck_text = '反审核'
                } else if (num == 2) {
                  that.AuditCertificateCheck_text = '审核'
                } else if (num == 3) {
                  that.AuditCertificateCheck_text = '审核'
                }
                that.centerDialogVisible_1 = true
                that.AuditType = num
                resolve()
              } else {
                that.$message({
                  message: '您当前勾选的凭证均不可进行审核！',
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    // 审核  1-反审核 2-审核通过 3-审核不通过
    AuditMultiCertificate() {
      const model = {
        'Type': this.AuditType,
        'IdList': this.checkedId
      }
      console.log(model)
      const that = this
      return new Promise((resolve, reject) => {
        finance.AuditMultiCertificate(getToken(), model)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '审核成功',
                type: 'success',
                onClose: function() {
                  that.$refs.transEvent.GetCertificateList()
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
    // 导出
    export() {
      console.log(this.checkedId)
    },
    // 整理断号
    ArrangeBrokenNumber() {
      if (this.form.date1 != null) {
        const model = {
          'ArrangeYear': this.form.date1.getFullYear(),
          'ArrangeMonth': this.form.date1.getMonth() + 1,
          'Sort': this.form.resource
        }
        console.log(model)
        this.visible_1 = false
        const that = this
        return new Promise((resolve, reject) => {
          finance.ArrangeBrokenNumber(getToken(), model)
            .then(response => {
              console.log(response.data)
              if (response.data.Successful) {
                that.$message({
                  message: '整理成功',
                  type: 'success',
                  onClose: function() {
                    that.$refs.transEvent.GetCertificateList()
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
      }
    },
    // 判断是否初始化
    initial() {
      console.log(this.$store.state.user.financialInitial)
      if (!this.$store.state.user.financialInitial.ThirdStep) {
        this.$router.push({ path: '/finance/promptIndex' })
      }
      // 单据变换
    /* handleChange(value) {
      console.log(value)
    },
    getCheckNum() {
      return this.$store.state.financeReport.checkedListNumber > 0
    }*/
    }
  }
}
</script>
<style lang="scss" scoped>
.temlateMain {
  height: 100%;
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
  .el-main {
    height: 100%;
    padding: 0;
  }
}
.titleForm {
  height: 100%;
  width: 100%;
  border: 1px solid #ebeef5;
  background-color: #f5f5f5;
}
</style>

