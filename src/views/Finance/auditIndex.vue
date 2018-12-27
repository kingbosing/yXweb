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
        <el-main>
               <el-container id="auditBox">
                <i v-bind:class="{auditIcon:true,auditIcon_no:voucherData.Status==3,auditIcon_yes:voucherData.Status==2}"></i>
                <el-header height="70px">
                 <span>凭证字：<b>{{voucherData.Word}}</b></span>
                 <span>第 <b>{{voucherData.Number}}</b> 号</span>
                 <span>日期：<b>{{voucherData.RecordDate}}</b> </span>
                 <span v-if="voucherData.ApprovalName!=''">关联审批：<b>{{voucherData.ApprovalName}}</b> </span>
                 <div class="header-right">
                   附单据：<b>{{voucherData.AttachedBill}}</b> 张
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
                                <div class="grid-content bg-purple" style="border-left:1px solid #dedede; padding: 0 20px;">
                                   {{k.Remark||'-'}}
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple" style=" padding: 0 20px;">
                                    {{k.BusarSubjectName||'-'}}
                                </div>
                            </el-col>
                            <el-col :span="6" style="border-right:2px solid #dedede;">
                                <div class="grid-content bg-purple" style="border-right:none;">
                                   <ul :class="{ redS: redFun(k.DebitMoney) }">
                                      <li style="width:10%;">{{amount_1(k.DebitMoney)}}</li>
                                      <li>{{amount_2(k.DebitMoney)}}</li>
                                      <li class="colorB">{{amount_3(k.DebitMoney)}}</li>
                                      <li>{{amount_4(k.DebitMoney)}}</li>
                                      <li>{{amount_5(k.DebitMoney)}}</li>
                                      <li class="colorB">{{amount_6(k.DebitMoney)}}</li>
                                      <li>{{amount_7(k.DebitMoney)}}</li>
                                      <li>{{amount_8(k.DebitMoney)}}</li>
                                      <li class="colorR">{{amount_9(k.DebitMoney)}}</li>
                                      <li>{{amount_10(k.DebitMoney)}}</li>
                                      <li style="border-right:none;">{{amount_11(k.DebitMoney)}}</li>
                                  </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                 <ul :class="{ redS: redFun(k.CreditMoney) }">
                                      <li style="width:10%;">{{amount_1(k.CreditMoney)}}</li>
                                      <li>{{amount_2(k.CreditMoney)}}</li>
                                      <li class="colorB">{{amount_3(k.CreditMoney)}}</li>
                                      <li>{{amount_4(k.CreditMoney)}}</li>
                                      <li>{{amount_5(k.CreditMoney)}}</li>
                                      <li class="colorB">{{amount_6(k.CreditMoney)}}</li>
                                      <li>{{amount_7(k.CreditMoney)}}</li>
                                      <li>{{amount_8(k.CreditMoney)}}</li>
                                      <li class="colorR">{{amount_9(k.CreditMoney)}}</li>
                                      <li>{{amount_10(k.CreditMoney)}}</li>
                                      <li style="border-right:none;">{{amount_11(k.CreditMoney)}}</li>
                                  </ul>
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
                                  <ul :class="{ redS: redFun(voucherData.TotalDebitMoney) }">
                                      <li style="width:10%;">{{amount_1(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_2(voucherData.TotalDebitMoney)}}</li>
                                      <li class="colorB">{{amount_3(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_4(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_5(voucherData.TotalDebitMoney)}}</li>
                                      <li class="colorB">{{amount_6(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_7(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_8(voucherData.TotalDebitMoney)}}</li>
                                      <li class="colorR">{{amount_9(voucherData.TotalDebitMoney)}}</li>
                                      <li>{{amount_10(voucherData.TotalDebitMoney)}}</li>
                                      <li style="border-right:none;">{{amount_11(voucherData.TotalDebitMoney)}}</li>
                                  </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                  <ul :class="{ redS: redFun(voucherData.TotalCreditMoney) }">
                                      <li style="width:10%;">{{amount_1(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_2(voucherData.TotalCreditMoney)}}</li>
                                      <li class="colorB">{{amount_3(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_4(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_5(voucherData.TotalCreditMoney)}}</li>
                                      <li class="colorB">{{amount_6(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_7(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_8(voucherData.TotalCreditMoney)}}</li>
                                      <li class="colorR">{{amount_9(voucherData.TotalCreditMoney)}}</li>
                                      <li>{{amount_10(voucherData.TotalCreditMoney)}}</li>
                                      <li style="border-right:none;">{{amount_11(voucherData.TotalCreditMoney)}}</li>
                                  </ul>
                                </div>
                            </el-col>
                         </el-row>
                        <!--底部信息-->
                        <b class="staffInfo">制单人：<span>{{voucherData.CreatorName}}</span></b>
                        <b class="staffInfo" v-if="voucherData.AuditorName!=''">审核人：<span>{{voucherData.AuditorName}}</span></b>
                        <div class="staff_btn" v-if="IsAuthority">
                             <el-button type="warning" @click="centerDialogVisible_3 = true" v-if="voucherData.Status==2">反审核</el-button>
                             <el-button type="warning" @click="centerDialogVisible_1 = true" v-if="voucherData.Status==1">不通过</el-button>
                             <el-button type="success" @click="centerDialogVisible_2 = true" v-if="voucherData.Status==1">通 过</el-button>
                        </div>
                        <div class="staff_btn" v-else>
                             <el-button type="warning" v-if="voucherData.Status==1" v-on:click="DeleteSingleCertificate()">删 除</el-button>
                             <el-button type="warning" v-if="voucherData.Status!=3" v-on:click="jumpIndex(1)">复 制</el-button>
                             <el-button type="success" v-if="voucherData.Status!=3" v-on:click="jumpIndex(3)">新 增</el-button>
                             <el-button type="warning" v-if="voucherData.Status==3" v-on:click="jumpIndex(2)">继续编辑</el-button>
                        </div>
                       </el-main>
                    </el-container>
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
              <!--****************************-->
              </el-container>
        </el-main>
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as finance from '@/api/finance'
export default {
  components: {

  },
  data() {
    return {
      // 权限
      IsAuthority: true,
      // 凭证ID
      voucherId: '',
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
      // 详情
      voucherData: [],
      centerDialogVisible_1: false, // 不通过
      centerDialogVisible_2: false, // 通过
      centerDialogVisible_3: false// 反审核
    }
  },
  mounted() {
    this.voucherId = this.$route.query.ID
    this.GetCertificateDetail()
  },
  watch: {

  },
  methods: {
    // 颜色
    redFun(num) {
      if (num.length > 1 && num[0] == '-') {
        return true
      } else {
        return false
      }
    },
    // 获取详情
    GetCertificateDetail() {
      const voucherId = this.voucherId
      const that = this
      return new Promise((resolve, reject) => {
        finance.GetCertificateDetail(getToken(), voucherId)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.voucherData = response.data.Data
              that.formArr = response.data.Data.RecordList
              resolve()
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
      const voucherId = this.voucherId
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
                  that.GetCertificateDetail()
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
    // 删除
    DeleteSingleCertificate() {
      const voucherId = this.voucherId
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
                  that.$router.push({ path: '/finance/FinanceTally' })
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
    // 跳转1:复 制 3:新增 2:继续编辑或编辑
    jumpIndex(type) {
      console.log(type)
      if (type == 1) {
        this.$router.push({ path: '/finance/editorIndex', query: { Type: type, ID: this.voucherId }})
      } else if (type == 2) {
        this.$router.push({ path: '/finance/editorIndex', query: { Type: type, ID: this.voucherId }})
      } else if (type == 3) {
        this.$router.push({ path: '/finance/FinanceTally' })
      }
    },
    // 金额显示
    amount_1(num) {
      if (num[num.length - 12] != '-') {
        return num[num.length - 12]
      }
    }, amount_2(num) {
      if (num[num.length - 11] != '-') {
        return num[num.length - 11]
      }
    }, amount_3(num) {
      if (num[num.length - 10] != '-') {
        return num[num.length - 10]
      }
    }, amount_4(num) {
      if (num[num.length - 9] != '-') {
        return num[num.length - 9]
      }
    }, amount_5(num) {
      if (num[num.length - 8] != '-') {
        return num[num.length - 8]
      }
    }, amount_6(num) {
      if (num[num.length - 7] != '-') {
        return num[num.length - 7]
      }
    }, amount_7(num) {
      if (num[num.length - 6] != '-') {
        return num[num.length - 6]
      }
    }, amount_8(num) {
      if (num[num.length - 5] != '-') {
        return num[num.length - 5]
      }
    }, amount_9(num) {
      if (num[num.length - 4] != '-') {
        return num[num.length - 4]
      }
    }, amount_10(num) {
      if (num[num.length - 2] != '-') {
        return num[num.length - 2]
      }
    }, amount_11(num) {
      if (num[num.length - 1] != '-') {
        return num[num.length - 1]
      }
    },
    // 跳转列表页
    MoreList() {
      this.$router.push({ path: '/finance/FinanceTally', query: { getPage: 2 }})
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
            }
             b{
                     font-weight: normal;
                     color:#8a8a8a;
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
#auditBox{
    position: relative;
    .auditIcon{
        display: inline-block;
        width: 117px;
        height: 90px;
        position: absolute;
        z-index: 100;
        right: 30px;
        top:55px;
    }
    .auditIcon_no{//审核不通过
         background: url("../../assets/finance/sprite.png") no-repeat 0 -443px;
    }
    .auditIcon_yes{//审核通过
         background: url("../../assets/finance/sprite.png") no-repeat -122px -443px;
    }
}
.el-main.formTable::-webkit-scrollbar{

width:0;

}
</style>
<style>
#auditBox .el-dialog__body{
   text-align: center;
}
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

