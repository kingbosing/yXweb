<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>开票<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName"  :rules="Rules">
                <el-form-item label="发票种类：" prop="Type"  :rules="[{ required: true, message: '请选择发票种类', trigger: ['blur', 'change']}]">
                    <el-select v-model="applyInfo.Type" placeholder="请选择发票种类">
                    <el-option value="增值税普通发票" label='增值税普通发票'></el-option>
                    <el-option value="增值税专用发票" label='增值税专用发票'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票抬头：" prop="billName" :rules="[{ required: true, message: '请填写发票抬头', trigger: ['blur', 'change']  }]">
                    <el-input type="text" v-model="applyInfo.billName"></el-input>
                </el-form-item>
                <el-form-item label="开票金额：" prop="billAmount" :rules="[{ required: true, message: '请填写开票金额', trigger: ['blur', 'change']  }]">
                    <el-input type="number" v-model="applyInfo.billAmount"></el-input>
                </el-form-item>
                <el-form-item >
                   <p class="color-8a">大写金额：{{digitUppercase(applyInfo.billAmount)}}</p>
                </el-form-item>
                 <el-form-item label="发票内容：" prop="billContent" :rules="[{ required: true, message: '请填写发票内容', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.billContent"></el-input>
                </el-form-item>

                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="税  号：" prop="taxNo">
                            <el-input type="text" v-model="applyInfo.taxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地  址：" prop="address">
                            <el-input type="text" v-model="applyInfo.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="开 户 行：" prop="bank">
                            <el-input type="text" v-model="applyInfo.bank"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账    号：" prop="bankAccount">
                            <el-input type="text" v-model="applyInfo.bankAccount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                 <el-form-item label="备  注：" prop="remark" >
                    <el-input type="textarea" v-model="applyInfo.remark"></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
  props: ['applyInfo'],
  data() {
    var validateDays = (rule, value, callback) => {
      const theDays = new Date(this.applyInfo.date1[1]).getTime() - new Date(this.applyInfo.date1[0]).getTime()
      const Days = Math.floor(theDays / (24 * 3600 * 1000)) + 1
      if (value) {
        if (value <= Days) {
          callback()
        } else {
          callback(new Error('出差时长不能超过所选时间'))
        }
      } else {
        callback(new Error('出差时长不能为空'))
      }
    }
    return {
      Rules: {
        days: [{ required: true, trigger: ['blur', 'change'], validator: validateDays }]
      }
    }
  },
  methods: {
    toCheck() {
      var app = this
      this.$refs['formName'].validate((valid) => {
        if (valid) {
        //   app.ruleFormCheck = true
          this.$emit('ruleFormCheck', true)
        } else {
          this.$emit('ruleFormCheck', false)

        //   app.ruleFormCheck = false
        }
      })
    },
    digitUppercase(n) {
      var fraction = ['角', '分']
      var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
      ]
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ]
      if (n) {
        var head = n < 0 ? '欠' : ''
        n = Math.abs(n)
        var s = ''
        for (var i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)
        for (let i = 0; i < unit[0].length && n > 0; i++) {
          var p = ''
          for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      } else {
        return '--'
      }
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
            background: url(/images/newApply-48.png) no-repeat -615px 0;
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
    }
}
</style>
