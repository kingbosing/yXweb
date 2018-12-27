<template>
    <el-container class="temlateMain">
         <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/finance/FinanceTally' }">会计凭证</el-breadcrumb-item>
                <el-breadcrumb-item>记账凭证</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="" size="small" v-on:click="MoreList()">更多凭证 >></el-button>
            </div>
        </el-header>
        <el-main class="">
            <el-container>
                <el-header height="70px">
                 <span>凭证字：<b>记</b></span>
                 <span>第 <b>{{voucherNum}}</b> 号</span>
                 <span>日期：<el-date-picker v-model="dataTime" type="date" placeholder="选择日期" v-on:change="changeDate"></el-date-picker></span>
                 <span>关联审批：
                     <el-select v-model="selectValue" filterable placeholder="请选择需要的关联审批" v-on:change="selectGet">
                       <el-option v-for="item in options" :key="item.Value" :label="item.Key" :value="item.Value"></el-option>
                     </el-select>
                 </span>
                 <div class="header-right">
                   附单据：<el-input-number v-model="num" controls-position="right" size='small' :min="0"></el-input-number> 张
                 </div>
                </el-header>
                <el-main>
                    <el-container>
                       <el-header height="96px">
                         <el-row class="titleForm">
                          <el-col :span="6" style="border-right:1px solid #dedede;"><div class="grid-content bg-purple" style="border-left:1px solid #dedede;line-height:94px;">摘 要</div></el-col>
                          <el-col :span="6" style="border-right:1px solid #dedede;"><div class="grid-content bg-purple" style="line-height:94px;">会计项目</div></el-col>
                          <el-col :span="6" style="border-right:2px solid #dedede;">
                              <div class="grid-content bg-purple">借方金额
                                  <ul>
                                      <li style="width:10%;">亿</li>
                                      <li>千</li>
                                      <li>百</li>
                                      <li>十</li>
                                      <li>万</li>
                                      <li>千</li>
                                      <li>百</li>
                                      <li>十</li>
                                      <li>元</li>
                                      <li>角</li>
                                      <li style="border-right:none;">分</li>
                                  </ul>
                              </div>
                           </el-col>
                          <el-col :span="6">
                              <div class="grid-content bg-purple" style="border-right:1px solid #dedede;">贷方金额
                                   <ul>
                                      <li style="width:10%;">亿</li>
                                      <li>千</li>
                                      <li>百</li>
                                      <li>十</li>
                                      <li>万</li>
                                      <li>千</li>
                                      <li>百</li>
                                      <li>十</li>
                                      <li>元</li>
                                      <li>角</li>
                                      <li style="border-right:none;">分</li>
                                  </ul>
                              </div>
                          </el-col>
                         </el-row>
                       </el-header>
                       <el-main class="formTable">
                         <el-row v-for="(k,v) in formArr" :key="v" class="operationBar">
                            <el-col :span="6">
                                <div class="grid-content bg-purple" style="border-left:1px solid #dedede;">
                                    <span class="iconF">
                                        <i class="iconAdd" v-on:click="addBar(k,v)"></i>
                                        <i class="iconDel" v-on:click="deleteBar(k,v)"></i>
                                    </span>
                                    <el-input v-model="k.Remark" maxlength="300"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <el-select v-model="k.BusarSubjectId" filterable style="width:100%;" placeholder="">
                                        <el-option v-for="item in options_a" :key="item.Value" :label="item.Key" :value="item.Value"></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="6" style="border-right:2px solid #dedede;">
                                <div class="grid-content bg-purple" style="border-right:none;">
                                   <input-fun  v-model='k.DebitMoney' @refreshList="totall_1"></input-fun>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                  <input-fun  v-model='k.CreditMoney' @refreshList="totall_1"></input-fun>
                                </div>
                            </el-col>
                         </el-row>
                         <!--总结-->
                         <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple" style="border-left:1px solid #dedede;">
                                   <span class="totall"> 合计：</span>
                                </div>
                            </el-col>
                            <el-col :span="6" style="border-right:2px solid #dedede;">
                                <div class="grid-content bg-purple" style="border-right:none;">
                                  <ul v-bind:class="{ redS: debitTotallS }">
                                      <li style="width:10%;">{{numD_1}}</li>
                                      <li>{{numD_2}}</li>
                                      <li class="colorB">{{numD_3}}</li>
                                      <li>{{numD_4}}</li>
                                      <li>{{numD_5}}</li>
                                      <li class="colorB">{{numD_6}}</li>
                                      <li>{{numD_7}}</li>
                                      <li>{{numD_8}}</li>
                                      <li class="colorR">{{numD_9}}</li>
                                      <li>{{numD_10}}</li>
                                      <li style="border-right:none;">{{numD_11}}</li>
                                  </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                  <ul v-bind:class="{ redS: lenderTotallS }">
                                      <li style="width:10%;">{{numL_1}}</li>
                                      <li>{{numL_2}}</li>
                                      <li class="colorB">{{numL_3}}</li>
                                      <li>{{numL_4}}</li>
                                      <li>{{numL_5}}</li>
                                      <li class="colorB">{{numL_6}}</li>
                                      <li>{{numL_7}}</li>
                                      <li>{{numL_8}}</li>
                                      <li class="colorR">{{numL_9}}</li>
                                      <li>{{numL_10}}</li>
                                      <li style="border-right:none;">{{numL_11}}</li>
                                  </ul>
                                </div>
                            </el-col>
                         </el-row>
                        <!--底部信息-->
                        <b class="staffInfo">制单人：<span>{{voucherData.CreatorName}}</span></b>
                        <div class="staff_btn">
                             <el-button type="warning" v-if="indexType==1" v-on:click="btnSave(1)">保 存</el-button>
                             <el-button type="success" v-if="indexType==1" v-on:click="btnSave(2)">保存并新增</el-button>
                             <el-button type="success" v-if="indexType==2" v-on:click="btnSave(3)">保存并提交</el-button>
                        </div>
                       </el-main>
                    </el-container>
                </el-main>
              </el-container>
        </el-main>
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import inputFun from './components/inputFun'
import * as finance from '@/api/finance'
import * as API from '@/api/finance_setting'
export default {
  components: {
    inputFun
  },
  data() {
    return {
      indexType: 1, // 1复制，2编辑
      // 凭证ID
      voucherId: '',
      voucherData: [], // 详情
      num: 0, // 单据个数
      dataTime: '', // 日期
      options: [], // 获取关联审批数据
      options_a: [], // 获取会计项目数据
      selectValue: '', // 关联审批
      voucherNum: 1, // 凭证编号
      approvalName: '', // 获取关联审批的名称
      // 表格：
      input: '',
      valueF: '',
      // 表单数组：
      formArr: [
        {
          Remark: '',
          BusarSubjectId: '',
          DebitMoney: '', // 借方
          CreditMoney: ''// 贷方
        }, {
          Remark: '',
          BusarSubjectId: '',
          DebitMoney: '', // 借方
          CreditMoney: ''// 贷方
        }, {
          Remark: '',
          BusarSubjectId: '',
          DebitMoney: '', // 借方
          CreditMoney: ''// 贷方
        }, {
          Remark: '',
          BusarSubjectId: '',
          DebitMoney: '', // 借方
          CreditMoney: ''// 贷方
        }
      ],
      // 排版
      numD_1: '',
      numD_2: '',
      numD_3: '',
      numD_4: '',
      numD_5: '',
      numD_6: '',
      numD_7: '',
      numD_8: '',
      numD_9: '',
      numD_10: '',
      numD_11: '',
      numL_1: '',
      numL_2: '',
      numL_3: '',
      numL_4: '',
      numL_5: '',
      numL_6: '',
      numL_7: '',
      numL_8: '',
      numL_9: '',
      numL_10: '',
      numL_11: '',
      debitTotall: '',
      lenderTotall: '',
      debitTotallS: 0,
      lenderTotallS: 0
    }
  },
  mounted() {
    this.voucherId = this.$route.query.ID
    this.indexType = this.$route.query.Type
    this.totall_1()
    this.GetApprovalList()
    this.GetSubjectDropDownList()
    if (this.$route.query.Type == 1) {
      this.GetDefaultRecordDate()
    }
    this.GetCertificateDetail()
  },
  computed: {
    // 借方
    dataRest: function() {
      var obj = []
      for (var i = 0; i < this.formArr.length; i++) obj[i] = this.formArr[i].DebitMoney
      return obj
    },
    // 贷方
    dataRestL: function() {
      var obj = []
      for (var i = 0; i < this.formArr.length; i++) obj[i] = this.formArr[i].CreditMoney
      return obj
    }
  },
  watch: {
    // 借方
    dataRest: {
      handler: function(nowVal, oldVal) {
        if (nowVal.length == oldVal.length) {
          for (var i = 0; i < nowVal.length; i++) {
            if (nowVal[i] != oldVal[i] && nowVal[i] != '') {
              this.formArr[i].CreditMoney = ''
            }
          }
        }
      },
      deep: true
    },
    // 贷方
    dataRestL: {
      handler: function(nowVal, oldVal) {
        if (nowVal.length == oldVal.length) {
          for (var i = 0; i < nowVal.length; i++) {
            if (nowVal[i] != oldVal[i] && nowVal[i] != '') {
              this.formArr[i].DebitMoney = ''
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 保存
    btnSave(numType) {
      if (this.debitTotall == this.lenderTotall) {
        var vId = ''
        if (numType == 3) { // 编辑
          vId = this.voucherId
        } else { // 复制
          vId = ''
        }
        const setDate = {
          'ID': vId,
          'Word': '记',
          'Number': this.voucherNum,
          'RecordDate': this.dataTime,
          'ApprovalRelation': this.selectValue == undefined ? '' : this.selectValue,
          'ApprovalName': this.approvalName,
          'AttachedBill': this.num,
          'TotalDebitMoney': this.debitTotall,
          'TotalCreditMoney': this.lenderTotall,
          'RecordList': this.formArr
        }
        console.log(setDate)
        const that = this
        return new Promise((resolve, reject) => {
          finance.AddOrEditCertificate(getToken(), setDate)
            .then(response => {
              console.log(response.data)
              if (response.data.Successful) {
                that.$message({
                  message: '保存成功',
                  type: 'success',
                  onClose: function() {
                    const id = response.data.Data
                    if (numType == 1) { // 保存
                      that.$router.push({ path: '/finance/auditIndex', query: { ID: id }})
                    } else if (numType == 2) { // 保存新增
                      location.reload()// 刷新
                    } else if (numType == 3) { // 保存提交
                      that.$router.push({ path: '/finance/auditIndex', query: { ID: id }})
                    }
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
      } else {
        this.$message({
          message: '凭证分录借贷不平，请重新调整！',
          type: 'warning'
        })
      }
    },
    // 获取审批名称
    selectGet(vId) {
      let obj = {}
      obj = this.options.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.Value === vId // 筛选出匹配数据
      })
      console.log(obj.Key)// 我这边的name就是对应label的
      this.approvalName = obj.Key
    },
    // 获取详情
    GetCertificateDetail() {
      const voucherId = this.voucherId
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetCertificateDetail(getToken(), voucherId)
          .then(response => {
            console.log('详情')
            console.log(response.data)
            if (response.data.Successful) {
              that.voucherData = response.data.Data
              that.formArr = []
              const RecordList = response.data.Data.RecordList
              for (let i = 0; i < RecordList.length; i++) {
                const arrS = {
                  Remark: RecordList[i].Remark,
                  BusarSubjectId: RecordList[i].BusarSubjectID,
                  DebitMoney: RecordList[i].DebitMoney == '-' ? '' : RecordList[i].DebitMoney,
                  CreditMoney: RecordList[i].CreditMoney == '-' ? '' : RecordList[i].CreditMoney
                }
                that.formArr.push(arrS)
              }
              that.num = response.data.Data.AttachedBill
              if (that.indexType == 2) { // 编辑状态
                that.voucherNum = response.data.Data.Number
                that.dataTime = response.data.Data.RecordDate
              }
              // 关联申请
              that.selectValue = response.data.Data.ApprovalRequestFlowId
              that.approvalName = response.data.Data.ApprovalName
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 跳转列表页
    MoreList() {
      this.$router.push({ path: '/finance/FinanceTally', query: { getPage: 2 }})
    },
    // 获取凭证默认日期
    GetDefaultRecordDate() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetDefaultRecordDate(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.dataTime = response.data.Data
              that.CreateVoucherNumber(that.dataTime.slice(0, 7))
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 生成凭证号
    CreateVoucherNumber(time) {
      console.log(time)
      const that = this
      return new Promise((resolve, reject) => {
        finance.CreateVoucherNumber(getToken(), time)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.voucherNum = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 更改日期
    changeDate() {
      let time = ''
      const year = this.dataTime.getFullYear() // 得到年份
      let month = this.dataTime.getMonth()// 得到月份
      // let date = this.dataTime.getDate()// 得到日期
      month = month + 1
      if (month < 10) month = '0' + month
      // if (date < 10) date = '0' + date
      time = year + '-' + month
      this.CreateVoucherNumber(time)
    },
    // 关联审批
    GetApprovalList() {
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetApprovalList(getToken())
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.options = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 会计项目
    GetSubjectDropDownList() {
      const that = this
      return new Promise((resolve, reject) => {
        API.GetSubjectDropDownList(1, 0)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.options_a = response.data.Data
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 添加行
    addBar(k, v) {
      console.log(k, v)
      var arr = {
        Remark: '',
        BusarSubjectId: '',
        DebitMoney: '',
        CreditMoney: ''
      }
      this.formArr.splice(v + 1, 0, arr)
      console.log(this.formArr)
    },
    // 删除行
    deleteBar(k, v) {
      // console.log(k, v)
      if (this.formArr.length > 4) {
        this.formArr.splice(v, 1)
      } else {
        this.formArr[v].Remark = ''
        this.formArr[v].BusarSubjectId = ''
        this.formArr[v].DebitMoney = ''
        this.formArr[v].CreditMoney = ''
        this.totall_1()
      }
      console.log(this.formArr)
    },
    // 求和
    totall_1() { // debitTotall
      this.debitTotall = 0
      this.lenderTotall = 0
      for (var i = 0; i < this.formArr.length; i++) {
        if (this.formArr[i].DebitMoney == '') {
          this.debitTotall += 0
        } else {
          this.debitTotall += parseFloat(this.formArr[i].DebitMoney)
        }
        if (this.formArr[i].CreditMoney == '') {
          this.lenderTotall += 0
        } else {
          this.lenderTotall += parseFloat(this.formArr[i].CreditMoney)
        }
      }
      // debitTotallS: 0,
      // lenderTotallS: 0
      let debitTotallNum, lenderTotallNum
      if (this.debitTotall < 0) {
        debitTotallNum = -this.debitTotall
        this.debitTotallS = 1
      } else {
        this.debitTotallS = 0
        debitTotallNum = this.debitTotall
      }
      if (this.lenderTotall < 0) {
        lenderTotallNum = -this.lenderTotall
        this.lenderTotallS = 1
      } else {
        this.lenderTotallS = 0
        lenderTotallNum = this.lenderTotall
      }
      var debitTotallArr, lenderTotallArr
      if (debitTotallNum == 0) {
        debitTotallArr = ''
      } else {
        debitTotallArr = (debitTotallNum).toFixed(2)
      }
      this.numD_1 = debitTotallArr[debitTotallArr.length - 12]
      this.numD_2 = debitTotallArr[debitTotallArr.length - 11]
      this.numD_3 = debitTotallArr[debitTotallArr.length - 10]
      this.numD_4 = debitTotallArr[debitTotallArr.length - 9]
      this.numD_5 = debitTotallArr[debitTotallArr.length - 8]
      this.numD_6 = debitTotallArr[debitTotallArr.length - 7]
      this.numD_7 = debitTotallArr[debitTotallArr.length - 6]
      this.numD_8 = debitTotallArr[debitTotallArr.length - 5]
      this.numD_9 = debitTotallArr[debitTotallArr.length - 4]
      this.numD_10 = debitTotallArr[debitTotallArr.length - 2]
      this.numD_11 = debitTotallArr[debitTotallArr.length - 1]
      if (lenderTotallNum == 0) {
        lenderTotallArr = ''
      } else {
        lenderTotallArr = (lenderTotallNum).toFixed(2)
      }
      this.numL_1 = lenderTotallArr[lenderTotallArr.length - 12]
      this.numL_2 = lenderTotallArr[lenderTotallArr.length - 11]
      this.numL_3 = lenderTotallArr[lenderTotallArr.length - 10]
      this.numL_4 = lenderTotallArr[lenderTotallArr.length - 9]
      this.numL_5 = lenderTotallArr[lenderTotallArr.length - 8]
      this.numL_6 = lenderTotallArr[lenderTotallArr.length - 7]
      this.numL_7 = lenderTotallArr[lenderTotallArr.length - 6]
      this.numL_8 = lenderTotallArr[lenderTotallArr.length - 5]
      this.numL_9 = lenderTotallArr[lenderTotallArr.length - 4]
      this.numL_10 = lenderTotallArr[lenderTotallArr.length - 2]
      this.numL_11 = lenderTotallArr[lenderTotallArr.length - 1]
      console.log(this.debitTotall, this.lenderTotall)
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
            padding-top: 15px;
            span{
                margin-right: 60px;
                b{
                     font-weight: normal;
                     color:#8a8a8a;
                }
            }
         }
         .el-main{
             .el-header{
                 padding: 0 20px 0 32px;
             }
             .el-main{
                 padding: 0 20px 20px 0;
             }
         }
    }
  }

}
.titleForm{
    height:100%;
    width:100%;
    border-top:1px solid #dedede;
    border-bottom: 1px solid #dedede;
    background-color: #f5f5f5;
    font-size: 16px ;
    color: #8a8a8a;
    .el-col.el-col-6{
         height: 100%;
    }
   .grid-content.bg-purple{
       height: 100%;
       text-align: center;
       ul{
           width: 100%;
           list-style: none;
           margin: 0;
           padding: 0;
           border-top:1px solid #dedede;
           li{
               width: 9%;
               height:44px;
               line-height: 44px;
               float: left;
               border-right:1px solid #dedede;
               background-color: #ededed;
           }
       }
   }
}
.formTable{
   .el-row{
       position: relative;
       padding-left: 32px;
       height: 48px;
       line-height: 48px;
       cursor: pointer;
       .grid-content.bg-purple{
         border-bottom: 1px solid #dedede;
          border-right: 1px solid #dedede;
           ul{
           width: 100%;
           list-style: none;
           margin: 0;
           padding: 0;
           border-top:1px solid #dedede;
           li{
               width: 9%;
               height:47px;
               line-height: 47px;
               float: left;
               text-align: center;
               border-right:1px solid #dedede;
           }
           li.colorB{
             border-color: #7ecef4;
           }
           li.colorR{
             border-color: #f19ec2;
           }
       }
        .redS{
           color:red;
       }
       .totall{
           color:#8a8a8a;
           padding-left: 14px;
       }
       }
   }
}
.staffInfo{
    font-size: 14px;
    color:#1a1a1a;
    display: inline-block;
    margin-left: 32px;
    margin-top: 20px;
    span{
        font-weight: normal;
    }
}
.staff_btn{
    float: right;
    margin-top: 30px;
    display: inline-block;
}
.iconF{
    display: inline-block;
    position: absolute;
    left:12px;
    width:18px;
    height:48px;
    i{
       display: inline-block;
       width:18px;
       height: 18px;
       float: left;
    }
    .iconAdd{
       background: url("../../assets/finance/btn_add.jpg") no-repeat;
       margin-bottom: 10px;
    }
    .iconDel{
        background: url("../../assets/finance/btn_delete.jpg") no-repeat;
    }
}
.operationBar .iconF{
    display: none;
}
.operationBar:hover .iconF{
    display: inline-block;
}
.el-main.formTable::-webkit-scrollbar{

width:0;

}
</style>
<style>
 .formTable .el-input__inner{
           width: 100%;
           height:100%;
           border:none;
       }
      .formTable  .el-select__caret.el-input__icon.el-icon-arrow-up{
           display: none;
       }
        .formTable  .grid-content.bg-purple{
         height:48px;
       }
</style>

