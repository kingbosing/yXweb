<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>付款<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" >
                <el-form-item label="结算时间" prop="applyInfo.date1" :rules="[{ required: false, message: '请选择开始时间', trigger: ['blur', 'change']  }]">
                    <el-date-picker
                        v-model="applyInfo.date1" style="width: 100%;"
                        type="datetimerange"
                        align="center"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['09:00:00', '18:00:00']">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-form :model="k" label-width="120px" :ref="'formName'+v" v-for="(k,v) in getPaymentDetails()" :key="v">
                <div>
                    <p>报销明细({{v+1}}) <span class="delete" v-show="v>0" @click="deleteIt(v)">删除</span></p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="往来单位名称:" prop="FirmName" :rules="[{ required: true, message: '请填写往来单位名称', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.FirmName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结算方式:" prop="PayType" :rules="[{ required: true, message: '请填写结算方式', trigger: ['blur', 'change']  }]">
                                <el-select v-model="k.PayType" placeholder="请选择活动区域">
                                    <el-option value="银行付款" label='银行付款'></el-option>
                                    <el-option value="现金" label='现金'></el-option>
                                    <el-option value="汇款" label='汇款'></el-option>
                                    <el-option value="支票" label='支票'></el-option>
                                    <el-option value="网上支付" label='网上支付'></el-option>
                                </el-select>
                </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款金额：" prop="PayAmount" :rules="[{ required: true, message: '请填写付款金额', trigger: ['blur', 'change']  }]">
                                <el-input type="number" v-model="k.PayAmount"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开户行：" >
                                <el-input type="text" v-model="k.Bank"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="账号名称：" >
                                <el-input type="number" v-model="k.BankAccount"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开户地：" >
                                <el-input type="text" v-model="k.BankAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="说明：" >
                        <el-input type="textarea" v-model="k.Remark"></el-input>
                    </el-form-item>
                </div>
            </el-form>

                <div class="add">
                   <el-row>
                       <el-col :span="20">
                           <hr>
                       </el-col>
                       <el-col :span="4">
                           <span @click="addIt"><new-icon class-name="add_col_icon"  icon-name="#icon-tianjia" />添加付款明细</span>
                       </el-col>

                   </el-row>
                </div>
            <el-form :model="applyInfo" label-width="100px" >
                <el-form-item label="总付款金额：" >
                    <b class="color-8a">{{getTotal()||'--'}}</b>
                </el-form-item>
                <el-form-item label="备注：" >
                    <el-input type="textarea" v-model="applyInfo.Remark"></el-input>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  props: ['applyInfo'],
  data() {
    return {

    }
  },
  methods: {
    toCheck() {
      var app = this

      for (let i = 0; i < (this.applyInfo.PaymentDetails).length; i++) {
        const index = 'formName' + i

        this.$refs[index][0].validate((valid) => {
          if (valid) {
            this.$emit('ruleFormCheck', true)
          } else {
            this.$emit('ruleFormCheck', false)
          }
        })
      }
    },
    getPaymentDetails() {
      return this.applyInfo.PaymentDetails
    },
    deleteIt(v) {
      this.applyInfo.PaymentDetails.splice(v, 1)
    },
    addIt() {
    //   const num = this.applyInfo.length
      this.applyInfo.PaymentDetails.push({
        FirmName: '',
        PayType: '',
        PayAmount: '',
        BankAccount: '',
        Bank: '',
        BankAddress: '',
        Remark: ''
      })
    },
    getTotal() {
      let num = 0
      this.applyInfo.PaymentDetails.forEach(item => {
        num += parseFloat(item.PayAmount) || 0
      })
      this.applyInfo.TotalPay = num.toFixed(2)
      return num.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.leave{
    .header{
        overflow: hidden;
        margin-bottom: 30px;
        .imgHead{
            height: 50px;
            width: 50px;
            display: block;
            margin-right: 10px;
            margin-left: 275px;
            float: left;
            background: url(/images/newApply-48.png) no-repeat -560px 0;
        }
        >span{
            float: left;
            font-size: 18px;
            color: #323232;
            display: block;
            height: 48px;
            line-height: 48px;
            b{
                font-weight: normal;
                color: #8a8a8a;
                font-size: 14px;
            }
        }
    }
    .content{
        overflow: hidden;
        .line{
            text-align: center;
        }
        .el-col{
            height: 40px;
        }
        .delete{
            color: #f99740;
            cursor: pointer;
            font-size: 16px;
            float: right;
        }
        .add{
            .el-col-4{
                float: right;
                padding-left: 10px;
                color: #f99740;
                cursor: pointer;
                font-size: 16px;
                .add_col_icon{
                    margin-right: 10px;
                     color: #f99740;
                }
            }
            .el-col-20{
                hr{
                    border:1px solid #dedede;
                }
            }
        }
    }
}
.el-row{
    margin-bottom:20px;
}
.add_col_icon{
    font-size: 16px;
}
</style>
