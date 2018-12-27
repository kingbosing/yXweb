<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>合同<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="120px" ref="formName01">
                <el-form-item label="合同类别：" prop="Category" :rules="[{ required: true, message: '请填写结算方式', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.Category"></el-input>
                </el-form-item>
                <el-form-item label="合同编号："  prop="Number" :rules="[{ required: true, message: '请填写结算方式', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.Number"></el-input>
                </el-form-item>
            </el-form>

            <el-form style="background:#fcfcfc" :model="k" label-width="120px" :ref="'formName'+v" v-for="(k,v) in applyInfoList" :key="v">
                <div>
                     <el-row>
                        <el-col :span="8">
                            <el-form-item label="签订方:" prop="SubContractors" :rules="[{ required: true, message: '请填写结算方式', trigger: ['blur', 'change']  }]">
                                <el-select v-model="k.SubContractors" placeholder="请选择签订方">
                                    <el-option value="甲方" label='甲方'></el-option>
                                    <el-option value="乙方" label='乙方'></el-option>
                                    <el-option value="丙方" label='丙方'></el-option>
                                    <el-option value="丁方" label='丁方'></el-option>
                                    <el-option value="戊方" label='戊方'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14"></el-col>
                        <el-col :span="2"> <span class="delete" v-show="v>0" @click="deleteIt(v)">删除</span></el-col>
                    </el-row>

                    <el-form-item label="单位名称：" prop="Organization" :rules="[{ required: true, message: '请填写往来单位名称', trigger: ['blur', 'change']  }]">
                        <el-input type="text" v-model="k.Organization"></el-input>
                    </el-form-item>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="经办部门：" prop="Department" :rules="[{ required: true, message: '请填写经办部门', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Department"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经办人：" prop="Managers" :rules="[{ required: true, message: '请填写经办人', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Managers"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="电话：" >
                                <el-input type="number" v-model="k.Phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                           <el-form-item label="邮件：" >
                                <el-input type="email" v-model="k.Email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="传真：" >
                        <el-input type="text" v-model="k.Fax"></el-input>
                    </el-form-item>
                </div>
            </el-form>

                <div class="add">
                   <el-row>
                       <el-col :span="20">
                           <hr>
                       </el-col>
                       <el-col :span="4">
                           <span @click="addIt"><new-icon class-name="add_col_icon"  icon-name="#icon-tianjia" />添加签订方</span>
                       </el-col>

                   </el-row>
                </div>
            <el-form  label-width="100px" :model="applyInfo">

                <el-form-item label="合同内容：" >
                    <el-input type="textarea" v-model="applyInfo.Content"></el-input>
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
      setTotalAmount(amount)
      return amount
    },
    TotalBudget: function() {
      let Budget = 0
      this.applyInfoList.forEach(item => {
        Budget += parseFloat(item.Budget)
      })
      setTotalBudget(Budget)

      return Budget
    }
  },
  methods: {
    setTotalBudget(data) {
      this.applyInfo.TotalBudget = data
    },
    setTotalAmount(data) {
      this.applyInfo.TotalAmount = data
    },

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
    deleteIt(v) {
      this.applyInfoList.splice(v, 1)
    },
    addIt() {
    //   const num = this.applyInfo.length
      this.applyInfoList.push({
        SubContractors: '',
        Organization: '',
        Department: '',
        Managers: '',
        Phone: '',
        Email: '',
        Fax: ''
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
            background: url(/images/newApply-48.png) no-repeat -167px 0;
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
