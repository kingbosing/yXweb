<template>
<el-container class="temlateMain" id="batchscheduling" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span>排班设置</span>
            <div style="float: right">
              <el-button @click="cycleshow = true">周期排班</el-button>
              <el-button @click="wisdombut">智能排班</el-button>
            </div>
        </el-header>
        <el-main>
            <div class="head">
            <el-button-group>
              <el-button type="warning" >批量排班</el-button>
              <el-button @click="topersonalscheduling">个人排班<i class=" el-icon--right"></i></el-button>
            </el-button-group>
          </div>
          <div class="content">
               <div class="big-calendar">
                 <div class="titletop">
                    <div class="grouplist">
                        <ul class="group">
                          <li v-for="(item, key) in classlist" :key="key" @click="selectedteam(key,item)" :class="{'setcolor': colorlabel == key,
                          'yellow': item.Colour == 1,
                          'blue': item.Colour == 2,
                          'pink': item.Colour == 3,
                          'green': item.Colour == 4}" >
                            <i></i>
                            <span class="groupname">{{item.RuleName}}</span>
                            <span class="grouptime">{{settimestring(item.RuleTimeStr)}}</span>
                          </li>
                        </ul>
                    </div>
                    <div class="calendartitle">
                      <p>{{(months + 1) + '月'}}</p>
                      <p>{{getenglish(months)}}</p>
                      <p>{{years}}</p>
                    </div>
                 </div>
                  <fullcalendar :events="thisfcEvents"  @changeMonth="changeMonth" @eventClick="eventClick"  lang='zh'>
                  </fullcalendar>
                </div>
                <div class="calendarlist">
                   <div class="calenderall" v-for="(item, key) in fcEvents" :key="key" >
                     <fullcalendar :events="item.fcEvent" :month="key"  lang='zh'>
                        <template slot="fc-header-right" >
                        <p>{{(key + 1 ) + '月'}}</p>
                        <p>{{getenglish(key)}}</p>
                        <p>{{years}}</p>
                        </template>
                     </fullcalendar>
                     <div @click="inswitching(key)" class="cup"></div>
                   </div>
                </div>
          </div>
          <footer class="footer">
            <el-button type="warning" @click="save">保存</el-button>
          </footer>
        </el-main>
        <div class="cup-box" v-if="wisdomshow">
            <div class="classes">
                 <p>智能排班</p>
                 <div>
                   <div class="headlabel">
                     <span @click="double" :class="{'headlabelon':wisdom.RestType == 1}">双休</span>
                     <span @click="one" :class="{'headlabelon':wisdom.RestType == 2}">单休</span>
                     <span @click="firstsd" :class="{'headlabelon':wisdom.RestType == 3}">单双休</span>
                   </div>
                   <ul>
                     <li v-for="(item, key) in classlist" :key="key" class="classlist">
                       <el-radio v-model="wisdom.RuleId" :label="item.RuleId"><span class="classlist-name">{{item.RuleName}}</span><span class="classlist-time">{{settimestring(item.RuleTimeStr)}}</span></el-radio>
                     </li>
                     <li v-if="wisdom.RestType == 2 || wisdom.RestType == 3" style="margin-top: 30px">
                       <el-radio v-model="Rest" @click="wisdom.IsSaturdayRest = false; wisdom.IsSundayRest = true" label="1">周日休</el-radio>
                       <el-radio v-model="Rest" @click="wisdom.IsSaturdayRest = true; wisdom.IsSundayRest = false" label="2">周六休</el-radio>
                     </li>
                     <li v-if="wisdom.RestType == 3" style="margin-top: 30px">
                       <el-radio v-model="wisdom.BeginDoubleRest"  :label="false">本周单休</el-radio>
                       <el-radio v-model="wisdom.BeginDoubleRest"  :label="true">本周双休</el-radio>
                     </li>
                   </ul>
                 </div>
                 <footer>
                     <el-button type="warning" @click="wisdomconfirm">确定</el-button>
                     <el-button @click="wisdomshow = false">取消</el-button>
                 </footer>
             </div>

        </div>
        <div class="cup-box" v-if="cycleshow">
            <div class="cycle">
                 <p>排班周期设置</p>
                 <div>
                    <el-form ref="form"  label-width="90px">
                      <el-form-item label="周期天数：" >
                         <el-input-number v-model="num"  :min="1" :max="7" @change="numform" label="描述文字"></el-input-number>
                      </el-form-item>
                      <el-form-item :label="'第' + (key + 1) + '天：'" v-for="(item, key) in numberofdays" :key="key">
                          <el-select v-model="value[key]" @change="onclassse(value[key], key)" style="width: 100%" placeholder="请选择">
                            <el-option
                              v-for="(item, index) in options"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-form>
                 </div>
                 <footer>
                     <el-button type="warning" @click="cycle">确定</el-button>
                     <el-button @click="cycleshow = false">取消</el-button>
                 </footer>
             </div>
        </div>
        <div class="hintcup" v-if="hint">
           <div class="hint">
              <p>提示</p>
              <i class="el-icon-circle-close-outline" @click="hint = false"></i>
              <span>是否保存当前操作?</span>
              <div>
                <el-button type="warning" @click="hintsave">保存</el-button>
                <el-button @click="empty">不保存</el-button>
              </div>
           </div>
      </div>
    </el-container>
</template>

<script>
import fullcalendar from '@/components/Calendar/FullCalendar.vue'
import * as API from '@/api/workforcemanagement'
export default {
  components: {
    fullcalendar
  },
  data() {
    return {
      hint: false,
      colorlabel: 0,
      num: 1,
      thisfcEvents: [],
      fcEvents: [],
      classlist: [],
      primaryitem: {}, // 预选项
      numberofdays: 1, // 周期排班数组
      wisdom: {
        RuleId: '',
        IsSaturdayRest: false,
        IsSundayRest: true,
        RestType: 1,
        BeginDoubleRest: false
      },
      Rest: '1',
      months: new Date().getMonth(),
      years: '2018',
      wisdomshow: false,
      options: [], // 设置周期下拉列表里内容
      value: [], // 下拉列表选中的值
      DaysList: [],
      cycleshow: false,
      AtdSchedulingId: '',
      WorkDays: [], // 日历上点击更改的数组
      n: 0, // 循环出的相同项下标
      fullscreenLoading: false
    }
  },
  created() {
    this.change()
  },
  methods: {
    changeMonth(start, end, current) {
      console.log('changeMonth', start, end, current)
    },
    change() {
      this.AtdSchedulingId = this.$route.query.id
      if (this.$route.query.id) {
        this.schedulinglist()
      }
    },
    schedulinglist() {
      const id = this.AtdSchedulingId
      this.fullscreenLoading = true
      API.GetDeptWorkDays(id).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.classlist = res.data.Data.AtdRuleIdList
          this.primaryitem.Colour = this.classlist[0].Colour
          this.primaryitem.RuleId = this.classlist[0].RuleId
          this.primaryitem.RuleName = this.classlist[0].RuleName
          this.primaryitem.WorkStatus = 0
          this.colorlabel = 0
          this.years = new Date().getFullYear()
          for (let i = 0; i < this.classlist.length; i++) {
            this.options.push({
              label: this.setnamestring(this.classlist[i].RuleName) + ' ' + this.settimestring(this.classlist[i].RuleTimeStr),
              value: i
            })
          }
          this.options.push({
            label: '休息',
            value: ''
          })
          for (let i = 0; i < 7; i++) {
            this.DaysList.push({})
          }
          if (res.data.Data.workDays.length > 1) {
            const days = new Date(res.data.Data.workDays[0].Date)
            const today = this.formatDate(days) // 获取当前年月
            const data = res.data.Data.workDays
            for (let i = 0; i < 12; i++) {
              this.fcEvents.push({ fcEvent: [] })
              const length = (new Date(days.getFullYear(), parseInt(i + 1), 0)).getDate() // 获取这个月多少天
              for (let j = 0; j < length; j++) {
                const time = new Date(days.getFullYear() + '-' + this.formatTen(i + 1) + '-' + (j + 1))
                if (time.getTime() < days.getTime() || data.length < 1) {
                  this.fcEvents[i].fcEvent.push({
                    title: '-',
                    start: days.getFullYear() + '-' + this.formatTen(i + 1) + '-' + this.formatTen(j + 1),
                    end: '',
                    cssClass: 'none',
                    YOUR_DATA: {
                      day: j,
                      month: i
                    }
                  })
                } else {
                  this.fcEvents[i].fcEvent.push({
                    title: data[this.n].WorkStatus == 1 ? '休' : data[this.n].RuleName.slice(0, 1),
                    start: days.getFullYear() + '-' + this.formatTen(i + 1) + '-' + this.formatTen(j + 1),
                    end: '',
                    cssClass: data[this.n].WorkStatus == 1 ? 'rest' : this.colorclass(data[this.n].Colour),
                    YOUR_DATA: {
                      day: j,
                      month: i,
                      id: data[this.n].RuleId
                    }
                  })
                  this.n += 1
                }
              }
            }
            this.thisfcEvents = this.fcEvents[new Date().getMonth()].fcEvent
          }
          this.fullscreenLoading = false
        }
      })
    },
    eventClick(data) { // 选中日历某一天改变排班
      if (new Date(data.start) > Date.now()) { // 判断大于当天才可以操作
        if (data.YOUR_DATA.id == this.primaryitem.RuleId && data.title !== '休') { // 判断是否和当前预选班次一样 一样就变为休息
          this.fcEvents[data.YOUR_DATA.month].fcEvent.splice(data.YOUR_DATA.day, 1, {
            title: '休',
            start: data.start,
            end: data.end,
            cssClass: 'rest',
            YOUR_DATA: {
              day: data.YOUR_DATA.day,
              month: data.YOUR_DATA.month,
              id: ''
            }
          })
          const obj = {
            WorkStatus: 1,
            Date: data.start,
            RuleId: '',
            RuleName: '休',
            Colour: 1
          }
          if (this.WorkDays.length < 1) {
            this.WorkDays.push(obj)
          } else {
            let n = null
            for (let i = 0; i < this.WorkDays.length; i++) {
              if (this.WorkDays[i].Date == data.start) {
                n = i
              }
            }
            if (n !== null) {
              this.WorkDays.splice(n, 1, obj)
            } else {
              this.WorkDays.push(obj)
            }
          }
        } else {
          this.fcEvents[data.YOUR_DATA.month].fcEvent.splice(data.YOUR_DATA.day, 1, {
            title: this.primaryitem.RuleName.slice(0, 1),
            start: data.start,
            end: data.end,
            cssClass: this.colorclass(this.primaryitem.Colour),
            YOUR_DATA: {
              day: data.YOUR_DATA.day,
              month: data.YOUR_DATA.month,
              id: this.primaryitem.RuleId
            }
          })
          const obj = {
            WorkStatus: this.primaryitem.WorkStatus,
            Date: data.start,
            RuleId: this.primaryitem.RuleId,
            RuleName: this.primaryitem.RuleName,
            Colour: this.primaryitem.Colour
          }
          this.primaryitem.WorkStatus = 0
          if (this.WorkDays.length < 1) {
            this.WorkDays.push(obj)
          } else {
            let n = null
            for (let i = 0; i < this.WorkDays.length; i++) {
              if (this.WorkDays[i].Date == data.start) {
                n = i
              }
            }
            if (n !== null) {
              this.WorkDays.splice(n, 1, obj)
            } else {
              this.WorkDays.push(obj)
            }
          }
        }
        console.log(this.WorkDays)
      } else {
        this.$message({
          type: 'warning',
          message: '请修改今天之后的日期'
        })
      }
    },
    wisdomconfirm() { // 设置智慧排班
      const data = this.wisdom
      data.AtdSchedulingId = this.AtdSchedulingId
      API.WisdomScheduling(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          const data = {}
          data.WorkDays = res.data.Data
          data.AtdSchedulingId = this.AtdSchedulingId
          API.SaveDeptWorkDays(data).then(Response => {
            if (res.data.Successful) {
              this.n = 0
              this.fcEvents = []
              this.schedulinglist()
              this.wisdomshow = false
            }
          })
        }
      })
      this.WorkDays = []
    },
    cycle() { // 设置 周期排班
      const cycledata = {}
      cycledata.AtdSchedulingId = this.AtdSchedulingId
      cycledata.CycleNum = this.num
      cycledata.DaysList = this.DaysList.slice(0, this.num)
      console.log(cycledata)
      API.CycleScheduling(cycledata).then(res => {
        console.log(res)
        if (res.data.Successful) {
          const data = {}
          data.WorkDays = res.data.Data
          data.AtdSchedulingId = this.AtdSchedulingId
          API.SaveDeptWorkDays(data).then(Response => {
            if (res.data.Successful) {
              this.n = 0
              this.fcEvents = []
              this.schedulinglist()
              this.cycleshow = false
            }
          })
        }
      })
      this.WorkDays = []
    },
    inswitching(key) { // 切换月份
      this.thisfcEvents = this.fcEvents[key].fcEvent
      this.months = key
    },
    save() { // 保存
      const data = {}
      data.AtdSchedulingId = this.AtdSchedulingId
      for (let i = 0; i < this.WorkDays.length; i++) {
        this.WorkDays[i].Date = this.WorkDays[i].Date + ' 00:00:00'
      }
      data.WorkDays = this.WorkDays
      API.SaveDeptWorkDays(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.WorkDays = []
          this.hint = false
          this.$message({
            type: 'success',
            message: '更改成功'
          })
        }
      })
    },
    hintsave() { // 提示弹窗保存
      const data = {}
      data.AtdSchedulingId = this.AtdSchedulingId
      for (let i = 0; i < this.WorkDays.length; i++) {
        this.WorkDays[i].Date = this.WorkDays[i].Date + ' 00:00:00'
      }
      data.WorkDays = this.WorkDays
      API.SaveDeptWorkDays(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.WorkDays = []
          this.hint = false
          this.$message({
            type: 'success',
            message: '更改成功'
          })
          this.$router.push({
            path: '/Attendance/personalscheduling',
            query: {
              id: this.AtdSchedulingId
            }
          })
        }
      })
    },
    empty() { // 提示弹窗不保存
      this.$router.push({
        path: '/Attendance/personalscheduling',
        query: {
          id: this.AtdSchedulingId
        }
      })
    },
    double() { // 智慧 双休
      this.wisdom.RestType = 1
      this.wisdom.IsSaturdayRest = null
      this.wisdom.IsSundayRest = null
      this.wisdom.BeginDoubleRest = null
    },
    one() { // 智慧单休
      this.wisdom.RestType = 2
      this.wisdom.IsSaturdayRest = false
      this.wisdom.IsSundayRest = true
      this.wisdom.BeginDoubleRest = null
    },
    firstsd() { // 智慧单双休
      this.wisdom.RestType = 3
      this.wisdom.IsSaturdayRest = false
      this.wisdom.IsSundayRest = true
      this.wisdom.BeginDoubleRest = false
    },
    formatTen(num) {
      return num > 9 ? (num + '') : ('0' + num)
    },
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return year + '-' + this.formatTen(month)
    },
    setfortime(i) {
      const a = i + 1
      a > 9 ? (a + '') : ('0' + a)
      return '-' + a
    },
    getNowFormatDate() { // 获取当前年月日格式
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    getenglish(key) {
      const n = key + 1
      n > 9 ? (n + '') : ('0' + n)
      var date = new Date('2018/' + n + '/01')
      return date.toDateString().split(' ')[1]
    },
    wisdombut() { // 呼出智慧排班窗口
      if (this.wisdom.RuleId == '') {
        this.wisdom.RuleId = this.classlist[0].RuleId
      }
      this.wisdomshow = true
    },
    numform(e) { // 计数器变更
      this.numberofdays = e
    },
    settimestring(str) {
      return str.slice(0, 5) + '-' + str.slice(9, 14)
    },
    setnamestring(str) {
      if (str.length > 16) {
        return str.slice(0, 16) + '...'
      } else {
        return str
      }
    },
    onclassse(index, key) { // 周期排班下拉列表先选中班次
      console.log(index, key)
      this.DaysList[key].TheDay = key + 1
      if (index !== '') {
        this.DaysList[key].RuleId = this.classlist[index].RuleId
        this.DaysList[key].Remark = this.classlist[index].RuleName
      } else {
        this.DaysList[key].RuleId = ''
        this.DaysList[key].Remark = '休息'
      }

      console.log(this.DaysList)
    },
    selectedteam(key, data) { // 班次选中
      this.colorlabel = key
      this.primaryitem.Colour = data.Colour
      this.primaryitem.RuleId = data.RuleId
      this.primaryitem.RuleName = data.RuleName
      console.log(this.primaryitem)
    },
    topersonalscheduling() {
      if (this.WorkDays.length > 0) {
        this.hint = true
      } else {
        this.$router.push({
          path: '/Attendance/personalscheduling',
          query: {
            id: this.AtdSchedulingId
          }
        })
      }
    },
    colorclass(n) {
      switch (n) {
        case 1: return 'workyellow'
        case 2: return 'workblue'
        case 3: return 'workpink'
        case 4: return 'workgreen'
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
        padding: 20px;
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

}
.group {
  overflow: hidden;
  width: 450px;
  padding-top: 30px;
  li {
    float: left;
    line-height: 30px;
    margin-bottom: 10px !important;
    font-size: 0;
    cursor: pointer;
  }
  li:hover {
    color: #e6a23c;
  }
  i {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: #e6a23c 1px solid;
    border-radius: 50%;
    vertical-align: middle;
  }
  span {
    font-size: 14px;
    vertical-align: middle;
  }
}
.content {
    display: flex;
    justify-content: space-between;
    .big-calendar {
      min-width: 900px;
    }
    .calendarlist {
      min-width: 850px;
      margin-left: 50px;
      div:first-child {
         text-align: right;
      }
    }
}
.footer {
    text-align: center;
    margin-top: 40px;
    min-width: 1750px;
    }
.calenderall {
  position: relative;
  float: left;
  width: 33.3%;
}
.titletop {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  ul,li {
    margin: 0;
    padding-left: 15px;
    list-style: none;
  }
  .grouplist {
    display: flex;
  }
  .calendartitle {
    text-align: right;
    p {
      margin: 10px 0;
      font-size: 40px;
    }
    p:nth-child(1) {
      color: #f99740;
    }
    p:nth-child(2) {
      color: #8a8a8a;
      font-size: 85px;
    }
    p:nth-child(3) {
      color: #ccc;
    }
  }
}
.cup-box {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    ul,li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      padding: 20px;
    }
    li {
      line-height: 28px;
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: space-around;
    }
}
.classes {
    position: relative;
    width: 500px;
    min-height: 500px;
    margin: auto;
    margin-top: 200px;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    p {
      margin: 0;
      line-height: 40px;
      padding-left: 20px;
      background: #ddd;
      font-size: 16px;
      font-weight: 700;
    }
    .headlabel {
      display: flex;
      span {
        flex: 1;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
}
.cup {
  position: absolute;
  top: 0;
    width: 100%;
    bottom: 0;
    z-index: 1;
    cursor: pointer;
}
.cycle {
    position: relative;
    width: 500px;
    min-height: 500px;
    margin: auto;
    margin-top: 200px;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  p {
      margin: 0;
      line-height: 40px;
      padding-left: 20px;
      background: #ddd;
      font-size: 16px;
      font-weight: 700;
    }
    &>div {
      padding: 20px 20px 60px;
    }
 }
.headlabelon {
  color: #f99740;
  border-bottom: solid 1px #f99740;
}
.groupname {
    display: inline-block;
    width: 80px;
    padding-left: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.yellow {
  i {
    border: solid #fea000 1px ;
  }
}
.blue {
  i {
    border: solid #6eb7ff 1px;
  }
}
.pink {
  i {
    border: solid 1px #ff616b;
  }
}
.green {
  i {
    border: solid #5fcf9c 1px;
  }
}
.setcolor {
  i {
    border-width: 5px;
  }
}
.classlist {
   .classlist-name {
      display: inline-block;
      width: 200px;
      vertical-align: middle;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
   }
   .classlist-time {
      display: inline-block;
      vertical-align: middle;
      color: #fea000;
   }

}
.hintcup {
  position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    .hint {
      position: relative;
      width: 500px;
      margin: auto;
      margin-top: 200px;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      text-align: center;
      i {
        position: absolute;
        font-size: 30px;
        top: 5px;
        right: 10px;
      }
      p {
        font-size: 18px;
        background: #ddd;
        margin: 0;
        padding: 10px 0;
      }
      span {
        display: inline-block;
        font-size: 16px;
        padding: 50px 0;
      }
      &>div {
        display: flex;
        justify-content: space-around;
        margin-bottom: 40px;
      }
    }
}
</style>

<style lang="scss">
.big-calendar {
  margin-top: 50px;
  .none {
    display: none;
  }

.workyellow {
    background-color: #fea000 !important;
    color: #fff !important;
}
.workblue {
    background-color: #6eb7ff !important;
    color: #fff !important;
}
.workpink {
    background-color: #ff616b !important;
    color: #fff !important;
}
.workgreen {
    background-color: #5fcf9c !important;
    color: #fff !important;
}
  .rest {
  color: #ccc !important;
  background: #fff !important;
}
    .full-calendar-body .dates .dates-events .events-week .events-day {
      cursor: auto;
    }
    .full-calendar-header {
      display: none;
    }
    .full-calendar-body .weeks {
        border: none;
        border-bottom: 1px solid #e0e0e0;
    }
    .full-calendar-body .weeks .week {
        border: none;
        margin: 0 0 20px;
    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {
        width: 36px;
    height: 36px;
    margin: auto;
    margin-top: 10px;
    line-height: 36px;
    text-align: center;
    padding: 0;
    border-radius: 50%;
    }
    .full-calendar-body .dates .dates-events .events-week .events-day {
      min-height: 100px;
    }
}

.calendarlist {
  .workyellow {
    background-color: #fea000 !important;
    color: #fff !important;
}
.workblue {
    background-color: #6eb7ff !important;
    color: #fff !important;
}
.workpink {
    background-color: #ff616b !important;
    color: #fff !important;
}
.workgreen {
    background-color: #5fcf9c !important;
    color: #fff !important;
}
  .rest {
  color: #ccc !important;
  background: #fff !important;
}
.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {
  background-color: #fff;
  color: #ddd;
}
  .full-calendar-body .dates .week-row .day-cell {
    min-height: 1px;
  }
  .full-calendar-body .dates .dates-events .events-week .events-day {
    min-height: 1px;
  }
  .full-calendar-header .header-center {
    visibility: hidden;
  }
  .full-calendar-body .weeks {
    border: none;
  }
  .full-calendar-body .weeks .week {
    border: none;
    font-size: 12px;
    color: #ccc;
    margin-bottom: 20px;
  }
  .full-calendar-body .dates .week-row {
    border: none;
  }
  .full-calendar-body .dates .week-row .day-cell {
    border: none;
  }
  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {
    padding: 0;
    width: 22px;
    height: 22px;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    margin: 0 auto;
    border-radius: 50%;
  }
  .full-calendar-body .dates .dates-events .events-week .events-day .day-number {
    display: none;

  }
  .event-box {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 4px;
  }
  .header-right {
    text-align: right;
    p {
      font-size: 12px;
    }
    p:nth-child(1) {
      color: #f99740;
    }
    p:nth-child(2) {
      color: #8a8a8a;
      font-size: 20px;
    }
    p:nth-child(3) {
      color: #ccc;
    }
  }
}
#batchscheduling {
  .el-form .el-form-item .el-input__inner {
    height: 36px;
  }
  .el-form-item__label::after {
    content: "";
    display: inline-block;
    width: 100%;

  }
  .el-form-item__label {
    height: 36px;
    text-align: justify
  }
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
}
.el-select-dropdown {
    z-index: 11111 !important;
  }
</style>
