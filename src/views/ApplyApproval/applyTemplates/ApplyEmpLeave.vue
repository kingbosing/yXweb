<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>员工离职<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName"  :rules="Rules">

                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="任职岗位：" prop="job" :rules="[{ required: true, message: '请填写任职岗位', trigger: ['blur', 'change']  }]">
                            <el-input type="text" v-model="applyInfo.job"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item label="工号：" prop="empNo" :rules="[{ required: true, message: '请填写工号', trigger: ['blur', 'change']  }]">
                            <el-input type="number" v-model="applyInfo.empNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;">
                    <el-col :span="12">
                        <el-form-item label="入职日期：" prop="date1">
                            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="入职日期" v-model="applyInfo.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="离职日期：" prop="date2">
                            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="离职日期" v-model="applyInfo.date2" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="离职原因：" prop="reason" >
                    <el-radio-group v-model="applyInfo.reason">
                        <el-radio label="个人原因离职">个人原因离职</el-radio>
                        <el-radio label="劳动合同终止">劳动合同终止</el-radio>
                        <el-radio label="被动离职">被动离职</el-radio>
                        <el-radio label="其他">其他</el-radio>
                    </el-radio-group>
                </el-form-item>

                 <el-form-item label="原因说明：" prop="description" >
                    <el-input type="textarea" v-model="applyInfo.description"></el-input>
                </el-form-item>

                <el-form-item label="物品交接：" prop="goods" >
                    <el-checkbox-group v-model="applyInfo.goods">
                        <el-checkbox label="相关资产">相关资产</el-checkbox>
                        <el-checkbox label="相关钥匙">相关钥匙</el-checkbox>
                        <el-checkbox label="相关资料">相关资料</el-checkbox>
                        <el-checkbox label="办公用品">办公用品</el-checkbox>
                        <el-checkbox label="工作证">工作证</el-checkbox>
                        <el-checkbox label="工作服">工作服</el-checkbox>
                        <el-checkbox label="门禁卡">门禁卡</el-checkbox>
                        <el-checkbox label="账号密码">账号密码</el-checkbox>
                        <el-checkbox label="名片">名片</el-checkbox>
                        <el-checkbox label="其他">其他</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="交接情况：" prop="handOver" >
                    <el-input type="textarea" v-model="applyInfo.handOver"></el-input>
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
            background: url(/images/newApply-48.png) no-repeat -784px 0;
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

.el-checkbox+.el-checkbox {
    display: block;
    float: left;
    margin-right: 114px;
    width: 88px;
}
</style>
