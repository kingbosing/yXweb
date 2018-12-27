<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>报销<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="k" label-width="100px" :ref="'formName'+v" v-for="(k,v) in applyInfo" :key="v">
                <div>
                    <p>报销明细({{v+1}}) <span class="delete" v-show="v>0" @click="deleteIt(v)">删除</span></p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="报销金额：" prop="Amount" :rules="[{ required: true, message: '请填写报销金额', trigger: ['blur', 'change']  }]">
                                <el-input type="number" v-model="k.Amount"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="报销类别：" prop="Categories" :rules="[{ required: true, message: '请填写报销类别', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Categories"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="费用明细：" >
                        <el-input type="textarea" v-model="k.Details"></el-input>
                    </el-form-item>
                </div>
            </el-form>

                <div class="add">
                   <el-row>
                       <el-col :span="20">
                           <hr>
                       </el-col>
                       <el-col :span="4">
                           <span @click="addIt"><new-icon class-name="add_col_icon"  icon-name="#icon-tianjia" />添加报销明细</span>
                       </el-col>

                   </el-row>
                </div>
                <p class="color-8a"><b>总报销金额：{{getTotal()||'--'}}</b></p>

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

      for (let i = 0; i < this.applyInfo.length; i++) {
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
    deleteIt(v) {
      this.applyInfo.splice(v, 1)
    },
    addIt() {
      const num = this.applyInfo.length
      this.applyInfo.push({
        Amount: '',
        Categories: '',
        Details: ''
      })
    },
    getTotal() {
      let num = 0
      this.applyInfo.forEach(item => {
        num += parseFloat(item.Amount) || 0
      })
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
            background: url(/images/newApply-48.png) no-repeat -55px 0;
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
