<template>
    <el-container class="docList">
        <el-header height="40">
            <div  class="nav_left">查看凭证：
              <el-popover placement="bottom" width="560" trigger="click" v-model="visible_1">
                  <div class="popover_content">
                  <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="会计期间：">
                          <el-col :span="11">
                             <el-form-item prop="date1">
                                <el-date-picker  type="month" format="yyyy年MM期" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col class="line" :span="2" style="text-align: center;">至</el-col>
                          <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-date-picker  type="month"  format="yyyy年MM期" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                          </el-col>
                      </el-form-item>
                      <el-form-item label="状态：">
                          <el-select v-model="form.region" placeholder="请选择活动区域">
                          <el-option label="不限" value="0"></el-option>
                          <el-option label="未审核" value="1"></el-option>
                          <el-option label="已通过" value="2"></el-option>
                          <el-option label="未通过" value="3"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="排序：">
                          <el-radio-group v-model="form.resource">
                          <el-radio label="1">按凭证号</el-radio>
                          <el-radio label="2">按凭证日期</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <p class="button">
                        <el-button @click="toResFiltrate">重置</el-button>
                        <el-button type="warning" @click="submitForm('form')">查询</el-button><!--@click="toGetFiltrate"-->
                      </p>
                  </el-form>
                  </div>
                  <el-button slot="reference"><b class="el-icon-date"></b><span>{{setTime(beginDate,'{y}年{m}期')}}</span>-<span>{{setTime(endDate,'{y}年{m}期')}}</span></el-button>
              </el-popover>
            </div>
            <div class="nav_right">
              <el-input
              placeholder="可输入凭证号/摘要/科目"
              suffix-icon="el-icon-search"
              v-model="input"
              @keyup.enter.native="searchFor">
              </el-input>
            </div>
        </el-header>
        <el-main>
          <div class="header">
           <el-row  class="out">
              <el-col :span="2"><div class="grid-choise"><el-checkbox :indeterminate="isIndeterminate" v-model="allC" @change="allGet">全选</el-checkbox></div></el-col>
              <el-col :span="22">
                <el-col :span="8"><div class="grid-content bg-purple-light text_center">摘要</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple text_center">科目</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light text_center">借方金额</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple text_center">贷方金额</div></el-col>
              </el-col>
            </el-row>
          </div>
          <div class="body" v-for="(k,v) in listData" :key="v">
            <el-row class="out" type="flex">
              <el-col :span="2"><div class="grid-choise"><el-checkbox v-model="checked[v]"  @change="allIt"></el-checkbox></div></el-col>
              <el-col :span="22">
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-light">
                    <span class="cell"><span>日期：</span>{{k.RecordDate}}</span>
                    <span class="cell"><span>凭证字号：</span>{{k.WordNumber}}</span>
                    <span class="cell" v-if="k.ApprovalName!=''"><span>关联审批编号：</span><span class="yellowA" v-on:click="ApprovalFun(k.ApprovalRequestId)">{{k.ApprovalName}}</span></span>
                    <span class="cell"><span>制表人：</span>{{k.CreatorName}}</span>
                    <span class="cell" v-if="k.AuditorName!=''"><span>审核人：</span>{{k.AuditorName}}</span>
                    <span class="cell"><span>状态：</span><span v-bind:class="{statusColor_1:k.Status==1,statusColor_2:k.Status==2,statusColor_3:k.Status==3}">{{statusFun(k.Status)}}</span></span>

                    <div class="handle_btns" v-if="getHandlebtns()">
                      <span class="cell" v-on:click="viewFun(k.ID)"><b></b>查看</span>
                      <span class="cell" v-on:click="copyAndEditor(k.ID,1)"><b></b>复制</span>
                      <span class="cell" v-on:click="copyAndEditor(k.ID,2)" v-if="k.Status!=2"><b></b>编辑</span>
                      <span class="cell" v-if="k.Status!=2" v-on:click="getId(k.ID,4)"><b></b>删除</span>
                      <!--<span class="cell" v-if="k.Status==1&&IsAuthority==true" v-on:click="getId(k.ID,1)"><b></b>不通过</span>
                      <span class="cell" v-if="k.Status==1&&IsAuthority==true" v-on:click="getId(k.ID,2)"><b></b>通过</span>
                      <span class="cell" v-if="k.Status==3&&IsAuthority==true" v-on:click="getId(k.ID,3)"><b></b>反审核</span>-->
                    </div>
                    <div v-else class="handle_btns">
                      <!-- //icon_more -->
                      <el-popover
                        placement="left"
                        width="80"
                        trigger="click"
                        popper-class="toShowMore"
                        >
                        <div class="handle_btns">
                          <span class="cell" v-on:click="viewFun(k.ID)"><b></b>查看</span>
                          <span class="cell" v-on:click="copyAndEditor(k.ID,1)"><b></b>复制</span>
                          <span class="cell" v-on:click="copyAndEditor(k.ID,2)" v-if="k.Status!=2"><b></b>编辑</span>
                          <span class="cell" v-if="k.Status!=2" v-on:click="getId(k.ID,4)"><b></b>删除</span>
                          <!--<span class="cell" v-if="k.Status==1&&IsAuthority==true"><b></b>不通过</span>
                          <span class="cell" v-if="k.Status==1&&IsAuthority==true"><b></b>通过</span>
                          <span class="cell" v-if="k.Status==3&&IsAuthority==true"><b></b>反审核</span>-->
                        </div>
                        <b slot="reference" class="toShowMoreHan"></b>
                      </el-popover>
                    </div>
                  </div></el-col>
                </el-row>
                <el-row v-for="(j,d) in k.RecordList" :key="d" class="list">
                  <el-col :span="8"><div class="grid-content bg-purple-light text_left">{{j.Remark}}</div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple text_left">{{j.BusarSubjectName}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light text_center">{{j.DebitMoney}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple text_center">{{j.CreditMoney}}</div></el-col>
                </el-row>
                <el-row class="list" style="font-weight: bold;">
                  <el-col :span="16"><div class="grid-content bg-purple text_left">合计</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light text_center">{{k.TotalDebitMoney}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple text_center">{{k.TotalCreditMoney}}</div></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-main>
  <!--弹窗-->
              <el-dialog title="提示" :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span>确认是否审核该凭证？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="auditBtn(3)">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog title="提示" :visible.sync="centerDialogVisible_2" width="30%" center>
                  <span>确认是否审核该凭证？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_2 = false" style="margin-right:100px" v-on:click="auditBtn(2)">确 定</el-button>
                     <el-button @click="centerDialogVisible_2 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog title="提示" :visible.sync="centerDialogVisible_3" width="30%" center>
                  <span>确认是否反审核该凭证？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_3 = false" style="margin-right:100px" v-on:click="auditBtn(1)">确 定</el-button>
                     <el-button @click="centerDialogVisible_3 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog title="提示" :visible.sync="centerDialogVisible_4" width="30%" center>
                  <span>您确认是否删除此凭证？</span>
                  <span>删除后将不可恢复，并产生断号。</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_4 = false" style="margin-right:100px" v-on:click="DeleteSingleCertificate">确 定</el-button>
                     <el-button @click="centerDialogVisible_4 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <!--****************************-->
  </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import * as finance from '@/api/finance'
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'

export default {
  model: {
    prop: 'value',
    event: 'cc'
  },
  props: {
    value: ''
  },
  data() {
    return {
      input: '',
      form: {
        date1: '',
        date2: '',
        region: '0',
        resource: '1'
      },
      visible_1: false,
      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      endDate: new Date(),
      beginDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      // 列表数据
      listData: [],
      isIndeterminate: false,
      checkedId: [], // 已选id
      allC: false,
      centerDialogVisible_1: false, // 不通过
      centerDialogVisible_2: false, // 通过
      centerDialogVisible_3: false, // 反审核
      centerDialogVisible_4: false, // 删除
      // 操作ID
      operationId: '',
      /** ******************************************** */
      tableHeader: [
        {
          date: '2018-10-10',
          dcs: '4444',
          name: 'king',
          value1: 888,
          value2: 8888
        }
      ],
      checked: []
    }
  },
  mounted() {
    this.GetCertificateList()
  },
  methods: {
    // 导出凭证列表
    ExportCertificateList() {
      const model = {
        'StartYear': this.beginDate.getFullYear(),
        'StartMonth': this.beginDate.getMonth() + 1,
        'EndYear': this.endDate.getFullYear(),
        'EndMonth': this.endDate.getMonth() + 1,
        'Status': this.form.region,
        'Sort': this.form.resource,
        'SearchText': this.input
      }
      console.log(model)
      window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportCertificateList?Token=' + getToken() + '&export=' + true +
      '&startyear=' + this.beginDate.getFullYear() + '&startmonth=' + this.beginDate.getMonth() + 1 + '&endyear=' + this.endDate.getFullYear() +
      '&endmonth=' + this.endDate.getMonth() + 1 + '&status=' + this.form.region + '&sort=' + this.form.resource +
       '&searchtext=' + this.input)
    },
    // 获取凭证列表
    GetCertificateList() {
      const startyear = this.beginDate.getFullYear()
      const startmonth = this.beginDate.getMonth() + 1
      const endyear = this.endDate.getFullYear()
      const endmonth = this.endDate.getMonth() + 1
      const status = this.form.region
      const sort = this.form.resource
      const searchtext = this.input
      console.log(startyear, startmonth, endyear, endmonth, status, sort, searchtext)
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetCertificateList(getToken(), startyear, startmonth, endyear, endmonth, status, sort, false, searchtext)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.listData = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 筛选确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ((this.form.date2).getTime() > (this.form.date1).getTime()) { // 真确
            this.visible_1 = false
            this.endDate = this.form.date2
            this.beginDate = this.form.date1
            this.GetCertificateList()
          } else { // 错
            this.$message({
              message: '时间选择错误',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 查看
    viewFun(id) {
      console.log(id)
      this.$router.push({ path: '/finance/auditIndex', query: { ID: id }})
    },
    // 复制编辑
    copyAndEditor(id, type) {
      if (type == 1) {
        this.$router.push({ path: '/finance/editorIndex', query: { Type: type, ID: id }})
      } else if (type == 2) {
        this.$router.push({ path: '/finance/editorIndex', query: { Type: type, ID: id }})
      }
    },
    // 获取ID
    getId(id, type) {
      console.log(id, type)
      this.operationId = id
      if (type == 1) {
        this.centerDialogVisible_1 = true
      } else if (type == 2) {
        this.centerDialogVisible_2 = true
      } else if (type == 3) {
        this.centerDialogVisible_3 = true
      } else if (type == 4) {
        this.centerDialogVisible_4 = true
      }
    },
    // 删除
    DeleteSingleCertificate() {
      const voucherId = this.operationId
      const that = this
      return new Promise((resolve, reject) => {
        finance.DeleteSingleCertificate(getToken(), voucherId)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.GetCertificateList()
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
    // 审核 1-反审核 2-审核通过 3-审核不通过
    auditBtn(type) {
      console.log(type)
      const voucherId = this.operationId
      console.log(voucherId)
      const that = this
      return new Promise((resolve, reject) => {
        finance.AuditSingleCertificate(getToken(), voucherId, type)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '审核成功',
                type: 'success',
                onClose: function() {
                  that.GetCertificateList()
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
    // 状态判断
    statusFun(status) {
      if (status == 1) {
        return '未审核'
      } else if (status == 2) {
        return '已通过'
      } else if (status == 3) {
        return '未通过'
      }
    },
    // 跳转申请审批页
    ApprovalFun(id) {
      console.log(id)
      this.$router.push({ path: '/ApplyApproval/ApplicationContent', query: { ApplyID: id }})
    },
    // 全选
    allGet(data) {
      console.log(data)
      this.checked = []
      this.checkedId = []
      if (data) {
        for (let i = 0; i < this.listData.length; i++) {
          this.checked.push(true)
          this.checkedId.push(this.listData[i].ID)
        }
      } else {
        for (let i = 0; i < this.listData.length; i++) {
          this.checked.push(false)
        }
      }
      // 传父级
      this.$emit('cc', this.checkedId)
      console.log(this.checked, this.checkedId)
    },
    // 单选
    allIt(data, data1) {
      console.log(data, data1)
      this.checkedId = []
      var idNum = 0
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i]) {
          this.checkedId.push(this.listData[i].ID)
          idNum = idNum + 1
        }
      }
      if (!data) {
        this.allC = false
      }
      if (idNum == this.listData.length) {
        this.allC = true
      }
      // 传父级
      this.$emit('cc', this.checkedId)
      console.log(this.checked, this.checkedId)
    },

    handleSelectionChange() {},
    searchFor() {
      this.GetCertificateList()
    },
    setTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    toGetFiltrate() {
      this.endDate = this.form.date2
      this.beginDate = this.form.date1
    },
    toResFiltrate() { // 重置
      this.endDate = new Date()
      this.beginDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
      this.visible_1 = false
      this.form = {
        date1: '',
        date2: '',
        region: '0',
        resource: '1'
      }
    },
    getHandlebtns() {
      // console.log(this.$store.state.financeReport.handlebtns)
      return this.$store.state.financeReport.handlebtns
    }
  }
}
</script>
<style>
.docList .el-dialog__body{
  text-align: center;
}
</style>

<style lang="scss" scoped>
.docList {
  height: 100%;
  > .el-header {
    font-weight: normal;
    border-bottom: none;
    line-height: 20px;
    padding: 20px;
    margin: 0;
    .nav_left {
      float: left;
      width: 580px;
      .el-button {
        width: 300px;
        span {
          margin: 0 28px 0 25px;
        }
      }
    }
    .nav_right {
      width: 280px;
      float: right;
    }
  }
  > .el-main {
    height: 100%;
    padding: 0px 20px 0;
    .el-header {
      padding: 0 17px 0 0;
    }
    .header {
      border: 1px solid #dedede;
      border-bottom: none;
      background: #f8f8f8;
      .grid-choise {
        text-align: center;
        line-height: 48px;
      }
    }
    .el-container,
    .el-main {
      padding: 0;
      height: 100%;
    }
    .body {
      margin-bottom: 20px;
      border: 1px solid #dedede;
      cursor: pointer;
      &.act {
        border-color: #f99740;
      }
      .el-col-2 {
        position: relative;
        .grid-choise {
          height: 20px;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
        }
        .checkBox {
          height: 16px;
          width: 16px;
          display: inline-block;
          background: url(../../../assets/finance/sprite.png) 0 -104px;
          &.act {
            background-position-x: -22px;
          }
        }
      }
      .el-col-22 {
        .el-row.list {
          border-top: 1px solid #dedede;
        }
      }
      .el-col-24 {
        .cell {
          margin-right: 20px;
          span {
            margin-right: 0px;
          }
        }
        .handle_btns {
          float: right;
          display: block;
          .cell {
            color: #ccc;
            height: 20px;
            width: 60px;
            display: inline-block;
            margin: 14px 0;
            line-height: 20px;
            margin-left: 20px;
            b {
              height: 16px;
              width: 16px;
              display: block;
              margin: 3px 10px 0 0;
              float: left;
            }
            &:nth-child(1) b {
              background: url(../../../assets/finance/sprite.png)-107px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
            &:nth-child(2) b {
              background: url(../../../assets/finance/sprite.png)-52px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
            &:nth-child(3) b {
              background: url(../../../assets/finance/sprite.png) 0 0;
              &:hover {
                background-position-y: -26px;
              }
            }
            &:nth-child(4) b {
              background: url(../../../assets/finance/sprite.png)-79px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
              &:nth-child(5) b {
              background: url(../../../assets/finance/sprite.png) 0 0;
              &:hover {
                background-position-y: -26px;
              }
            }
              &:nth-child(6) b {
              background: url(../../../assets/finance/sprite.png) -26px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
             &:nth-child(7) b {
              background: url(../../../assets/finance/sprite.png) -131px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
            &:hover {
              color: #f99740;
              b {
                background-position-y: -26px;
              }
            }
          }
          .toShowMoreHan {
            width: 16px;
            height: 16px;
            display: block;
            background: url(../../../assets/finance/icon_more.png) no-repeat
              center;
            margin: 15px 20px 0 0;
          }
        }
      }
      &:hover {
        border-color: #f99740;
        .yellowA{
          color: #f99740;
          text-decoration:underline;
        }
        .el-col-24 .handle_btns {
          display: block;
        }
      }
    }

    .grid-content {
      height: 48px;
      padding: 0 12px;
      line-height: 48px;
      border-left: 1px solid #dedede;
    }
  }
}

.toShowMore {
  min-width: 80px;
  padding:0;
.handle_btns {
  // float: right;
  display: block;
  .cell {
    color: #ccc;
    height: 50px;
    width: 100px;
    display: block;
    margin: 5px 0;
    line-height: 45px;
    border-bottom: 1px solid #dedede;
    padding: 0 10px;
    cursor: pointer;
    // margin-left: 20px;
    b {
      height: 16px;
      width: 16px;
      display: block;
      margin: 15px 10px 0 0;
      float: left;
    }
    &:nth-child(1) b {
      background: url(../../../assets/finance/sprite.png)-107px 0;
      &:hover {
        background-position-y: -26px;
      }
    }
    &:nth-child(2) b {
      background: url(../../../assets/finance/sprite.png)-52px 0;
      &:hover {
        background-position-y: -26px;
      }
    }
    &:nth-child(3) b {
      background: url(../../../assets/finance/sprite.png) 0 0;
      &:hover {
        background-position-y: -26px;
      }
    }
    &:nth-child(4) b {
      background: url(../../../assets/finance/sprite.png)-79px 0;
      &:hover {
        background-position-y: -26px;
      }
    }
       &:nth-child(5) b {
              background: url(../../../assets/finance/sprite.png) 0 0;
              &:hover {
                background-position-y: -26px;
              }
            }
              &:nth-child(6) b {
              background: url(../../../assets/finance/sprite.png) -26px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
             &:nth-child(7) b {
              background: url(../../../assets/finance/sprite.png) -131px 0;
              &:hover {
                background-position-y: -26px;
              }
            }
    &:hover {
      color: #f99740;
      b {
        background-position-y: -26px;
      }
    }
  }
  .toShowMoreHan {
    width: 16px;
    height: 16px;
    display: block;
    background: url(../../../assets/finance/icon_more.png) no-repeat center;
    margin: 15px 20px 0 0;
  }
}
}
.el-popover .popover_content {
  padding: 40px 30px 0;
  .button {
    text-align: center;
    .el-button {
      margin: 0 30px;
    }
  }
}
.statusColor_1{
  color:#f99740;
}
.statusColor_2{
  color:#5cb85c;
}
.statusColor_3{
  color:#f54634;
}
</style>

