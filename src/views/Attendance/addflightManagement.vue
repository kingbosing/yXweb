<template>
<el-container class="temlateMain">
        <el-header height="50px">
            <span style="cursor: pointer;" @click="back">班次管理</span>
            <span>>新建班次</span>
        </el-header>
        <el-main>
            <el-form ref="form" :model="ruleForm" :rules="rules" label-width="100px">
                <div class="content">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="班次名称：" prop="RuleName">
                               <el-input  v-model="ruleForm.RuleName "></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="null-box"></div>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="考勤方式：">
                                <el-radio v-model="ruleForm.SignTimes" label="1">两次</el-radio>
                                <el-radio v-model="ruleForm.SignTimes" label="2">四次</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="签到时间：">
                                <el-time-select
                                    placeholder="起始时间"
                                    v-model="ruleForm.FstSign"
                                    :clearable="false"
                                    @change="settime"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:15',
                                    end: '23:30',
                                    maxTime: ruleForm.FstOut
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="签退时间：">
                                <el-time-select
                                    placeholder="结束时间"
                                    v-model="ruleForm.FstOut"
                                    :clearable="false"
                                    @change="settime"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:15',
                                    end: '23:30',
                                    minTime: ruleForm.FstSign,
                                    maxTime: ruleForm.LstSign
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="ruleForm.SignTimes == 2">
                             <el-form-item label="签到时间：">
                                <el-time-select
                                    placeholder="起始时间"
                                    v-model="ruleForm.LstSign"
                                    :clearable="false"
                                    @change="settime"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:15',
                                    end: '23:30',
                                    minTime: ruleForm.FstOut,
                                    maxTime: ruleForm.LstOut
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12"  v-if="ruleForm.SignTimes == 2">
                             <el-form-item label="签退时间：">
                                <el-time-select
                                    placeholder="结束时间"
                                    v-model="ruleForm.LstOut"
                                    :clearable="false"
                                    @change="settime"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:15',
                                    end: '23:30',
                                    minTime: ruleForm.LstSign
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                             <el-form-item label="">
                                <span>{{'总工时' + hour + '小时' + min + '分钟'}}</span>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="ruleForm.SignTimes == 1">
                              <el-form-item label="休息时间：">
                                    <el-switch
                                    v-model="ruleForm.IsRest"
                                    @change="switchbut"
                                    active-color="#e6a23c"
                                    inactive-color="#ccc">
                                    </el-switch>
                              </el-form-item>
                        </el-col>
                         <el-col :span="12" v-if="ruleForm.SignTimes == 1">
                             <el-form-item label="开始时间：">
                                <el-time-select
                                    placeholder="起始时间"
                                    v-model="ruleForm.RestBegin"
                                    :disabled="open"
                                    :clearable="false"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:05',
                                    end: '23:30',
                                    maxTime: ruleForm.FstOut,
                                    minTime:ruleForm.FstSign
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="ruleForm.SignTimes == 1">
                             <el-form-item label="结束时间：">
                                <el-time-select
                                    placeholder="结束时间"
                                    v-model="ruleForm.RestEnd"
                                    :disabled="open"
                                    :clearable="false"
                                    :picker-options="{
                                    start: '07:30',
                                    step: '00:05',
                                    end: '23:30',
                                    minTime: ruleForm.RestBegin,
                                    maxTime: ruleForm.FstOut
                                    }">
                                </el-time-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                              <el-form-item label="设定颜色：">
                                    <div class="color-box">
                                        <div v-for="(item, key) in colorarr" :key="key" :style="item" :class="{'yes':ruleForm.Colour - 1 == key}" @click="ruleForm.Colour = key + 1"></div>
                                    </div>
                              </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex"  justify="center">
                        <el-col :span="4">
                              <el-button type="warning" round @click="add">提交</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/flightManagement'
export default {
  data() {
    return {
      ruleForm: {
        RuleName: '',
        FstSign: '',
        FstOut: '',
        LstSign: '',
        LstOut: '',
        SignTimes: '1',
        IsRest: true,
        RestBegin: '',
        RestEnd: '',
        Colour: 1,
        TotalWorkTime: ''
      },
      rules: {
        RuleName: [
          { required: true, message: '请输入班次名称', trigger: 'blur' }
        ]
      },
      colorarr: [
        'background-color: #fea000',
        'background-color: #6eb7ff',
        'background-color: #ff616b',
        'background-color: #5fcf9c'
      ],
      hour: 0,
      min: 0,
      open: false
    }
  },
  watch: {
    ruleForm: {
      handler(val, oldVal) {
        if (val.SignTimes == '1') {
          this.ruleForm.LstSign = ''
          this.ruleForm.LstOut = ''
        } else {
          this.ruleForm.RestBegin = ''
          this.ruleForm.RestEnd = ''
        }
        this.settime()
      },
      deep: true

    }
  },
  computed: {
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      if (this.$route.query.RuleId) {
        const id = this.$route.query.RuleId
        API.GetAtdRuleDetail(id).then(res => {
          console.log(res)
          if (res.data.Successful) {
            const data = res.data.Data
            data.FstSign = this.perfecttime(data.FstSign)
            data.FstOut = this.perfecttime(data.FstOut)
            data.LstSign = this.perfecttime(data.LstSign)
            data.LstOut = this.perfecttime(data.LstOut)
            data.RestBegin = this.perfecttime(data.RestBegin)
            data.RestEnd = this.perfecttime(data.RestEnd)
            this.ruleForm = res.data.Data
            console.log(this.ruleForm)
            this.ruleForm.RuleName = res.data.Data.Name
            if (res.data.Data.SignTimes == 1) {
              this.ruleForm.SignTimes = '1'
            } else {
              this.ruleForm.SignTimes = '2'
            }
            if (res.data.Data.IsRest) {
              this.open = false
            } else {
              this.open = true
            }
            this.settime()
          }
        })
      }
    },
    settime() {
      if (this.ruleForm.FstSign !== '' && this.ruleForm.FstOut !== '') {
        if (this.ruleForm.RestBegin == '' || this.ruleForm.RestEnd == '') {
          const time = new Date('1994-4-15 ' + this.ruleForm.FstOut).getTime() - new Date('1994-4-15 ' + this.ruleForm.FstSign).getTime()
          this.hour = parseInt(time / 3600000)
          this.min = parseInt((time - (this.hour * 3600000)) / 60000)
        } else {
          const time = new Date('1994-4-15 ' + this.ruleForm.FstOut).getTime() - new Date('1994-4-15 ' + this.ruleForm.FstSign).getTime()
          const resttime = new Date('1994-4-15 ' + this.ruleForm.RestEnd).getTime() - new Date('1994-4-15 ' + this.ruleForm.RestBegin).getTime()
          this.hour = parseInt((time - resttime) / 3600000)
          this.min = parseInt(((time - resttime) - (this.hour * 3600000)) / 60000)
        }
      }
      if (this.ruleForm.LstSign !== '' && this.ruleForm.LstOut !== '') {
        const time = new Date('1994-4-15 ' + this.ruleForm.LstOut).getTime() - new Date('1994-4-15 ' + this.ruleForm.LstSign).getTime()
        const newhour = parseInt(time / 3600000)
        this.hour += parseInt(time / 3600000)
        this.min += parseInt((time - (newhour * 3600000)) / 60000)
        if (this.min >= 60) {
          this.min = this.min - 60
          this.hour += 1
        }
      }
    },
    switchbut(e) {
      this.open = !e
      console.log(this.open)
      this.ruleForm.RestBegin = ''
      this.ruleForm.RestEnd = ''
    },
    add() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$route.query.RuleId) {
            this.ruleForm.RuleId = this.$route.query.RuleId
          }
          this.ruleForm.TotalWorkTime = (this.hour * 60) + this.min
          const data = this.ruleForm
          API.CreateAtdRule(data).then(res => {
            console.log(res)
            if (res.data.Successful) {
              this.$router.push({
                path: '/Attendance/flightManagement',
                query: {
                }
              })
            }
          })
        }
      })
    },
    back() {
      this.$router.push({
        path: '/Attendance/flightManagement',
        query: {
        }
      })
    },
    perfecttime(date) {
      if (date == '' || date == null) {
        return ''
      } else {
        return date.slice(0, 5)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.temlateMain {
    .el-header {
        .header-right {
        float: right;
        .tools_search {
            width: 310px;
            float: left;
            margin-right: 15px;
            }
        }
   }
   .el-main{
        height: 100%;
        margin: 0;
        padding: 0;
       .el-container{
          height: 100%;
          .el-header{
             border-bottom: none;
             font-weight: normal;
             font-size: 16px;
             span{
               margin-right: 10px;
               cursor: pointer;
             }
            .active{
                color: #e6a23c
            }
          }

       }
   }
   table {
       width: 100%;
       tr {
           line-height: 60px;
       }
       td:last-child {
           width: 360px;
           span {
               float: left;
               width: 70px;
               margin-left: 38px;
               line-height: 30px;
               border-radius: 4px;
               color: #fff;
               background: #e6a23c;
               text-align: center;
               cursor: pointer;
           }
       }
   }
}
.content {
    width: 966px;
    margin: auto;
    padding-top: 60px;
}
.null-box {
    width: 10px;
    height: 50px;
}
.color-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 180px;
    height: 36px;
    div {
        width: 30px;
        height: 18px;
        cursor: pointer;

    }
}
.yes {
    background: url(../../assets/meeting/yes.png) no-repeat 6px -1px/65%;
}
</style>
