<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>人员需求<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName"  :rules="Rules">

                <el-form-item label="需求部门：" prop="dept" :rules="[{ required: true, message: '请填写需求部门', trigger: ['blur', 'change']  }]">
                    <el-input type="text" v-model="applyInfo.dept"></el-input>
                </el-form-item>

                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="需求岗位：" prop="job" :rules="[{ required: true, message: '请填写需求岗位', trigger: ['blur', 'change']  }]">
                            <el-input type="text" v-model="applyInfo.job"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="需求人数：" prop="amount" :rules="[{ required: true, message: '请填写需求人数', trigger: ['blur', 'change']  }]">
                            <el-input type="number" v-model="applyInfo.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="申请原因：" prop="reason" >
                    <el-radio-group v-model="applyInfo.reason">
                        <el-radio label="离职补缺">离职补缺</el-radio>
                        <el-radio label="新增岗位">新增岗位</el-radio>
                        <el-radio label="岗位调动">岗位调动</el-radio>
                        <el-radio label="替换人员">替换人员</el-radio>
                    </el-radio-group>
                </el-form-item>

                 <el-form-item label="到岗日期" prop="date1" :rules="[{ required: true, message: '请选择开始时间', trigger: ['blur', 'change']  }]">
                    <el-col :span="12">
                    <el-form-item >
                        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="到岗日期" v-model="applyInfo.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>

                 <el-form-item label="岗位描述：" prop="jobDescription" >
                    <el-input type="textarea" v-model="applyInfo.jobDescription"></el-input>
                </el-form-item>
                <el-form-item label="任职要求：" prop="require" >
                    <el-input type="textarea" v-model="applyInfo.require"></el-input>
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
