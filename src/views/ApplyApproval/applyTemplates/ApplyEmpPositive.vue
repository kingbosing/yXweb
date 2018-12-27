<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>员工转正<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="120px" ref="formName"  :rules="Rules">

                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="试用期岗位：" prop="job" :rules="[{ required: true, message: '请填写需求岗位', trigger: ['blur', 'change']  }]">
                            <el-input type="text" v-model="applyInfo.job"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号：" prop="empNo" :rules="[{ required: true, message: '请填写需求人数', trigger: ['blur', 'change']  }]">
                            <el-input type="number" v-model="applyInfo.empNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="转正类型：" prop="type" >
                    <el-radio-group v-model="applyInfo.type">
                        <el-radio label="按期转正">按期转正</el-radio>
                        <el-radio label="试用期转正">试用期转正</el-radio>

                    </el-radio-group>
                </el-form-item>

                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="入职日期：" prop="date1" :rules="[{ required: true, message: '请填写需求人数', trigger: ['blur', 'change']  }]">
                            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="到岗日期" v-model="applyInfo.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="试用期月数：" prop="months" :rules="[{ required: true, message: '请填写需求人数', trigger: ['blur', 'change']  }]">
                            <el-input type="number" v-model="applyInfo.months"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="工作总结：" prop="summary" >
                    <el-input type="textarea" v-model="applyInfo.summary"></el-input>
                </el-form-item>
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
            background: url(/images/newApply-48.png) no-repeat -670px 0;
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
