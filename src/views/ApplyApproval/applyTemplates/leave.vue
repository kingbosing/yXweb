<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>请假<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName" :rules="Rules">

                <el-form-item label="请假类型" prop="Type"  :rules="[{ required: true, message: '请选择请假类型', trigger: ['blur', 'change']}]">
                    <el-select v-model="applyInfo.Type" placeholder="请选择活动区域">
                    <el-option value="3" label='病假'></el-option>
                    <el-option value="2" label='事假'></el-option>
                    <el-option value="1" label='年假'></el-option>
                    <el-option value="4" label='调休'></el-option>
                    <el-option value="5" label='婚假'></el-option>
                    <el-option value="6" label='产假'></el-option>
                    <el-option value="7" label='陪产假'></el-option>
                    <el-option value="8" label='路途假'></el-option>
                    <el-option value="9" label='其他'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" v-if="applyInfo.Type=='4'">
                     <span class="surplusTime"><i>*</i>剩余可调休时间：<b>180小时</b></span>
                </el-form-item>
                <el-form-item label="选择时间" prop="date1" :rules="[{ required: true, message: '请选择开始时间', trigger: ['blur', 'change']  }]">
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
                <el-form-item label="合计时长" prop="days" >
                    <el-input type="number" v-model="applyInfo.days"></el-input>

                </el-form-item>

                <el-form-item label="请假事由" prop="desc" :rules="[{ required: true, message: '请填写请假事由', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.desc"></el-input>
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
          callback(new Error('请假天数不能超过所选时间'))
        }
      } else {
        callback(new Error('请假天数不能为空'))
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
    onPick(maxDate, minDate) {
      console.log(maxDate, minDate)
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
            background: url(/images/newApply-48.png) no-repeat 0 0;
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
.surplusTime{
    color:#8a8a8a;
    i{
        color:#f99740;
        font-style: normal;
        margin-right: 5px;
    }
    b{
        font-weight: normal;
         color:#f99740;
    }
}
</style>
