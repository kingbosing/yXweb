<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>补卡<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName">

                <el-form-item label="补漏时间" required>
                    <el-col :span="24">
                    <el-form-item prop="date1" :rules="[{ required: true, message: '请选择开始时间', trigger: ['blur', 'change']  }]">
                        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="开始时间" v-model="applyInfo.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>

                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="applyInfo.checkList">
                        <el-checkbox  :label="'1-'+toHourMinute(RuleDayList.FstSign)" v-if='RuleDayList.FstSign'>签到补漏({{toHourMinute(RuleDayList.FstSign)}})</el-checkbox>
                        <el-checkbox  :label="'2-'+toHourMinute(RuleDayList.FstOut)" v-if='RuleDayList.FstOut'>签退补漏({{toHourMinute(RuleDayList.FstOut)}})</el-checkbox>
                        <el-checkbox  :label="'3-'+toHourMinute(RuleDayList.LstSign)" v-if='RuleDayList.LstSign'>签到补漏({{toHourMinute(RuleDayList.LstSign)}})</el-checkbox>
                        <el-checkbox  :label="'4-'+toHourMinute(RuleDayList.LstOut)" v-if='RuleDayList.LstOut'>签退补漏({{toHourMinute(RuleDayList.LstOut)}})</el-checkbox>
                    </el-checkbox-group>
                    <p class="text-center">{{Message}}</p>
                    <!-- {{applyInfo.checkList}} -->
                </el-form-item>

                <el-form-item label="补卡事由" prop="desc" :rules="[{ required: true, message: '请填写补卡事由', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.desc"></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>

import { get_rule_day } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'

export default {
  props: ['applyInfo'],
  data() {
    return {
      RuleDayList: {},
      Message: '',
      date: ''
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    getDate: function() {
      return this.applyInfo.date1
    }
  },
  watch: {
    getDate(d1) {
      console.log(d1)
      this.applyInfo.checkList = []
      getRuleDay(this, d1)
    }
  },
  methods: {
    init() {
      getRuleDay(this, this.applyInfo.date1)
    },
    toCheck() {
      var app = this
      this.$refs['formName'].validate((valid) => {
        if (valid) {
        //   app.ruleFormCheck = true
          this.$emit('ruleFormCheck', true)
        } else {
          this.$emit('ruleFormCheck', false)
        }
      })
    },
    toHourMinute(minutes) {
      if ((minutes % 3600) / 60 == 0) {
        return (Math.floor(minutes / 3600) + ':' + (minutes % 3600) / 60) + '0'
      } else {
        return (Math.floor(minutes / 3600) + ':' + (minutes % 3600) / 60)
      }
    }
  }
}

var getRuleDay = (app, date) => {
  get_rule_day(getToken(), date).then(res => {
    var data = res.data
    console.log(data)
    if (data.Successful) {
      app.RuleDayList = data.Data
    } else {
      app.Message = data.Message
    }
  })
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
            background: url(/images/newApply-48.png) no-repeat -450px 0;
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
