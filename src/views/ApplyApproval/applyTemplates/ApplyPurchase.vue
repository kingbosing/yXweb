<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>采购<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="120px" ref="formName01">
                <el-row>
                    <el-col :span="11">
                         <el-form-item label="采购类型:" prop="PurchaseType" :rules="[{ required: true, message: '请选采购类型', trigger: ['blur', 'change']  }]">
                            <el-select v-model="applyInfo.PurchaseType" placeholder="请选采购类型">
                                <el-option value="3" label='原材料'></el-option>
                                <el-option value="2" label='半成品'></el-option>
                                <el-option value="1" label='成品'></el-option>
                                <el-option value="4" label='办公室用品'></el-option>
                                <el-option value="5" label='固定资产'></el-option>
                                <el-option value="9" label='其他'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item label="期望交付日期：" prop="date1" :rules="[{ required: false, message: '请选择开始时间', trigger: ['blur', 'change']  }]">
                        <el-date-picker
                            v-model="applyInfo.date1" style="width: 100%;"
                            type="date"
                            align="center"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm" >
                        </el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="采购事由：" >
                    <el-input type="textarea" v-model="applyInfo.Reason"></el-input>
                </el-form-item>
            </el-form>

            <el-form style="background:#fcfcfc" :model="k" label-width="120px" :ref="'formName'+v" v-for="(k,v) in applyInfoList" :key="v">
                <div>
                    <p>采购明细({{v+1}}) <span class="delete" v-show="v>0" @click="deleteIt(v)">删除</span></p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="货品名称：" prop="Name" :rules="[{ required: true, message: '请填写往来单位名称', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="数量：" prop="Count" :rules="[{ required: true, message: '请填写往来单位名称', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Count"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="型号：" prop="Version" >
                                <el-input type="number" v-model="k.Version"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="规格：" >
                                <el-input type="text" v-model="k.Norm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="采购预算：" >
                                <el-input type="number" v-model="k.Budget"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="说明：" >
                        <el-input type="textarea" v-model="k.Directions"></el-input>
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
            <el-form  label-width="100px" :model="applyInfo">
                <el-form-item label="总数量：" >
                    <b class="color-8a">{{TotalAmount||'--'}}</b>
                </el-form-item>
                <el-form-item label="总预算：" >
                    <b class="color-8a">{{TotalBudget||'--'}}</b>
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
  props: ['applyInfo', 'applyInfoList'],
  data() {
    return {

    }
  },
  computed: {
    TotalAmount: function() {
      let amount = 0
      this.applyInfoList.forEach(item => {
        amount += parseFloat(item.Count)
      })
      //   this.applyInfo.TotalAmount = amount
      this.setTotalAmount(amount)
      return amount
    },
    TotalBudget: function() {
      let Budget = 0
      this.applyInfoList.forEach(item => {
        Budget += parseFloat(item.Budget)
      })
      //   this.applyInfo.TotalBudget = Budget
      this.setTotalBudget(Budget)
      return Budget
    }
  },
  methods: {
    toCheck() {
      var app = this

      for (let i = 0; i < (this.applyInfoList).length; i++) {
        const index = 'formName' + i

        this.$refs[index][0].validate((valid) => {
          if (valid) {
            this.$emit('ruleFormCheck', true)
          } else {
            this.$emit('ruleFormCheck', false)
          }
        })
      }
      this.$refs['formName01'].validate((valid) => {
        if (valid) {
          this.$emit('ruleFormCheck', true)
        } else {
          this.$emit('ruleFormCheck', false)
        }
      })
    },
    getPaymentDetails() {
      return this.applyInfo.PaymentDetails
    },
    setTotalBudget(data) {
      this.applyInfo.TotalBudget = data
    },
    setTotalAmount(data) {
      this.applyInfo.TotalAmount = data
    },
    deleteIt(v) {
      this.applyInfoList.splice(v, 1)
    },
    addIt() {
    //   const num = this.applyInfo.length
      this.applyInfoList.push({
        Name: '',
        Count: '',
        Version: '',
        Norm: '',
        Budget: '',
        Directions: ''
      })
    },
    getTotal() {
      const num = 0
      // this.applyInfo.PaymentDetails.forEach(item => {
      //     num+=parseFloat(item.PayAmount)||0
      // })
      // this.applyInfo.TotalPay=num.toFixed(2)
      // return num.toFixed(2)
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
            background: url(/images/newApply-48.png) no-repeat -503px 0;
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
