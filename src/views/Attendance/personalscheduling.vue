<template>
<el-container class="temlateMain" id="personalscheduling" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span>排班设置</span>
        </el-header>
        <el-main>
          <div>
            <el-button-group>
              <el-button  @click="hintjudge(1)">批量排班</el-button>
              <el-button type="warning">个人排班<i class=" el-icon--right"></i></el-button>
            </el-button-group>
            <div class="header-right">
                 <span>选择日期</span>
                 <span @click="hintjudge(2)"><i class="el-icon-arrow-left"></i></span>
                 <el-date-picker @change="hintjudge(3)" v-model="todayTime" type="month"  :clearable="false" value-format="yyyy-MM" placeholder="选择月"></el-date-picker>
                 <span @click="hintjudge(4)"><i class="el-icon-arrow-right"></i></span>
                 <input type="text" v-model="searchStr" class="contentinput">
                 <el-button type="warning" @click="hintjudge(7)">搜索</el-button>
            </div>
          </div>
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

          <div class="datelist">
            <table border="1" cellspacing="0" style="border: #ccc 1px solid;border-collapse: collapse;">
              <tr>
                <td style="width: 100px">姓名</td>
                <td v-for="(item, key) in monthlist" :key="key" :class="{'weekend': item.week == '六' || item.week == '日'}"><span>{{item.week}}</span><span>{{item.num + 1}}</span></td>
              </tr>
              <tr v-for="(item, key) in AtdSchedulingProfile" :key="key">
                <td>{{item.ProfileName}}</td>
                <td v-for="(day, index) in item.WorkDays" :key="index"><span @click="eventClick(key,index,day,item.ProfileId,item.ProfileName)" :class="{
                          'workyellow': day.Colour == 1,
                          'workblue': day.Colour == 2,
                          'workpink': day.Colour == 3,
                          'workgreen': day.Colour == 4,
                          'rest': day.WorkStatus == 1}" class="labelarr">{{day.RuleName?day.RuleName.slice(0,1):''}}</span></td>
              </tr>
            </table>
          </div>
          <footer>
            <el-button type="warning" @click="SavePersonalWorkDays">保存</el-button>
          </footer>
        </el-main>
        <el-footer  height="50px">
          <el-pagination v-on:size-change="handleSizeChange"
                  v-on:current-change="handleCurrentChange"
                  :current-page="pageIndex"
                  :page-sizes="[20,30, 40, 50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
          </el-pagination>
      </el-footer>
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

import * as API from '@/api/workforcemanagement'
export default {
  data() {
    return {
      WorkDays: [],
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      todayTime: this.formatDate(new Date()),
      AtdSchedulingProfile: [],
      monthlist: [],
      classlist: [],
      colorlabel: 0,
      primaryitem: {},
      searchStr: '',
      operating: false, // 判断是否操作
      hint: false, // 提示框显示
      hintname: 0,
      fullscreenLoading: false
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      this.fullscreenLoading = true
      const days = new Date(this.todayTime)
      const length = (new Date(days.getFullYear(), parseInt(days.getMonth() + 1), 0)).getDate() // 获取这个月多少天
      for (let i = 0; i < length; i++) {
        const mydate = new Date(this.todayTime + '-' + (i + 1))
        if (mydate.getDay() === 0) {
          this.monthlist.push({
            week: '日',
            num: i
          })
        } else if (mydate.getDay() === 6) {
          this.monthlist.push({
            week: '六',
            num: i
          })
        } else {
          this.monthlist.push({
            week: '',
            num: i
          })
        }
      }
      API.GetProfileWorkDays(this.$route.query.id, this.todayTime, this.pageIndex, this.pageSize, this.searchStr).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.totalCount = res.data.Data.TotalCount
          this.classlist = res.data.Data.RuleList
          this.primaryitem.Colour = this.classlist[this.colorlabel].Colour
          this.primaryitem.RuleId = this.classlist[this.colorlabel].RuleId
          this.primaryitem.RuleName = this.classlist[this.colorlabel].RuleName
          this.primaryitem.WorkStatus = 0
          const daylength = (new Date(days.getFullYear(), parseInt(days.getMonth() + 1), 0)).getDate()
          for (let i = 0; i < res.data.Data.AtdSchedulingProfile.length; i++) {
            this.WorkDays.push({
              WorkDays: []
            })
            if (res.data.Data.AtdSchedulingProfile[i].WorkDays.length == 0) {
              for (let k = 0; k < daylength; k++) {
                res.data.Data.AtdSchedulingProfile[i].WorkDays.push({})
              }
            } else {
              const firstday = new Date(res.data.Data.AtdSchedulingProfile[i].WorkDays[0].Date)
              for (let j = 0; j < firstday.getDate() - 1; j++) {
                res.data.Data.AtdSchedulingProfile[i].WorkDays.unshift({})
              }
            }
            for (let n = 0; n < res.data.Data.AtdSchedulingProfile[i].WorkDays.length; n++) {
              if (res.data.Data.AtdSchedulingProfile[i].WorkDays[n].WorkStatus == 1) {
                res.data.Data.AtdSchedulingProfile[i].WorkDays[n].RuleName = '休'
              }
            }
          }
          this.AtdSchedulingProfile = res.data.Data.AtdSchedulingProfile
          this.fullscreenLoading = false
        }
      })
    },
    eventClick(key, index, day, id, name) {
      if (new Date(day.Date).getTime() > Date.now()) {
        this.operating = true
        if (day.RuleId == this.primaryitem.RuleId && day.RuleName !== '休') { // 判断是否和当前预选班次一样 一样就变为休息
          this.AtdSchedulingProfile[key].WorkDays[index].RuleName = '休'
          this.AtdSchedulingProfile[key].WorkDays[index].WorkStatus = 1
          this.AtdSchedulingProfile[key].WorkDays[index].RuleId = this.primaryitem.RuleId
          const data = {
            WorkStatus: 1,
            Date: day.Date,
            RuleId: '',
            RuleName: '休',
            Colour: 1
          }
          if (this.WorkDays[key].WorkDays.length < 1) {
            this.WorkDays[key].WorkDays.push(data)
          } else {
            let n = null
            for (let i = 0; i < this.WorkDays[key].WorkDays.length; i++) {
              if (this.WorkDays[key].WorkDays[i].Date == day.Date) {
                n = i
              }
            }
            if (n !== null) {
              this.WorkDays[key].WorkDays.splice(n, 1, data)
            } else {
              this.WorkDays[key].WorkDays.push(data)
            }
          }
        } else {
          this.AtdSchedulingProfile[key].WorkDays[index].RuleName = this.primaryitem.RuleName
          this.AtdSchedulingProfile[key].WorkDays[index].WorkStatus = 0
          this.AtdSchedulingProfile[key].WorkDays[index].Colour = this.primaryitem.Colour
          this.AtdSchedulingProfile[key].WorkDays[index].RuleId = this.primaryitem.RuleId
          const data = {
            WorkStatus: 0,
            Date: day.Date,
            RuleId: this.primaryitem.RuleId,
            RuleName: this.primaryitem.RuleName,
            Colour: this.primaryitem.Colour

          }
          if (this.WorkDays[key].WorkDays.length < 1) {
            this.WorkDays[key].WorkDays.push(data)
          } else {
            let n = null
            for (let i = 0; i < this.WorkDays[key].WorkDays.length; i++) {
              if (this.WorkDays[key].WorkDays[i].Date == day.Date) {
                n = i
              }
            }
            if (n !== null) {
              this.WorkDays[key].WorkDays.splice(n, 1, data)
            } else {
              this.WorkDays[key].WorkDays.push(data)
            }
          }
        }
        this.WorkDays[key].ProfileName = name
        this.WorkDays[key].ProfileId = id
        console.log(this.WorkDays)
      } else {
        this.$message({
          type: 'warning',
          message: '请修改今天之后的日期'
        })
      }
    },
    SavePersonalWorkDays() {
      const data = {}
      data.WorkDays = this.WorkDays
      data.AtdSchedulingId = this.$route.query.id
      data.Month = this.todayTime
      console.log(data)
      API.SavePersonalWorkDays(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.monthlist = []
          this.WorkDays = []
          this.operating = false
          this.change()
          this.$message({
            type: 'success',
            message: '更改成功'
          })
        }
      })
    },
    settimestring(str) {
      return str.slice(0, 5) + '-' + str.slice(9, 14)
    },
    selectedteam(key, data) { // 班次选中
      this.colorlabel = key
      this.primaryitem.Colour = data.Colour
      this.primaryitem.RuleId = data.RuleId
      this.primaryitem.RuleName = data.RuleName
      console.log(this.primaryitem)
    },
    hintsave() { // 选择保存
      const data = {}
      data.WorkDays = this.WorkDays
      data.AtdSchedulingId = this.$route.query.id
      data.Month = this.todayTime
      console.log(data)
      API.SavePersonalWorkDays(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.monthlist = []
          this.operating = false
          this.hint = false
          this.WorkDays = []
          this.$message({
            type: 'success',
            message: '更改成功'
          })
          this.empty()
        }
      })
    },
    hintjudge(n) { // 判断是否操作了
      this.hintname = n
      if (this.operating) {
        this.hint = true
      } else {
        switch (n) {
          case 1: return this.tobatchscheduling()
          case 2: return this.toleft()
          case 3: return this.timeselect()
          case 4: return this.toright()
          case 7: return this.search()
        }
      }
    },
    empty() { // 选择不保存
      switch (this.hintname) {
        case 1: return this.tobatchscheduling()
        case 2: return this.toleft()
        case 3: return this.timeselect()
        case 4: return this.toright()
        case 5: return this.handleSizeChange(this.pageSize)
        case 6: return this.handleCurrentChange(this.pageIndex)
        case 7: return this.search()
      }
    },
    tobatchscheduling() {
      this.$router.push({
        path: '/Attendance/batchscheduling',
        query: {
          id: this.$route.query.id
        }
      })
    },
    toleft() {
      const year = new Date(this.todayTime).getFullYear()
      const month = new Date(this.todayTime).getMonth()
      if (month == 0) {
        this.todayTime = (year - 1) + '-' + '12'
      } else {
        this.todayTime = year + '-' + this.formatTen(month)
      }
      this.monthlist = []
      this.change()
    },
    timeselect() {
      this.monthlist = []
      this.change()
    },
    toright() {
      const year = new Date(this.todayTime).getFullYear()
      const month = new Date(this.todayTime).getMonth() + 1
      if (month == 12) {
        this.todayTime = (year + 1) + '-' + '1'
      } else {
        this.todayTime = year + '-' + this.formatTen(month + 1)
      }
      this.monthlist = []
      this.change()
    },
    search() {
      this.monthlist = []
      this.change()
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
    handleSizeChange(val) {
      // /更改显示条数
      this.hintname = 5
      this.pageSize = val
      if (this.operating) {
        this.hint = true
      } else {
        this.pageIndex = 1
        this.monthlist = []
        this.change()
      }
    },
    handleCurrentChange(val) {
      // /翻页
      this.hintname = 6
      this.pageIndex = val
      if (this.operating) {
        this.hint = true
      } else {
        this.monthlist = []
        this.change()
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
.header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
      .today{
        width: 30px;
        height: 30px;
        display: inline-block;
        cursor: pointer;
        background: url(/images/meetingToday.png)no-repeat center;
        margin-left: 10px;
        position: relative;
        top: 7px;
      }
      span{
        font-weight: normal;
        font-size: 14px;
        margin-right: 10px;
      }
    }
    ul,li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .grouplist {
    display: flex;
  }
  .weekend {
    color: #ccc;
    span:first-child {
        display: block;
        padding-right: 22px;
    }
    span:last-child {
        display: block;
        padding-left: 18px;
    }
    &::after {
      position: absolute;
      display: block;
      top: calc(50% - .5px);
      left: calc(50% - 36px);
      content: '';
      width: 72px;
      height: 1px;
      background: #ccc;
      transform: rotate(-42deg);

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
    margin: 0;
    padding-left: 15px;
    list-style: none;
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
.labelarr {
  display: block;
  width: 24px;
  height: 24px;
  margin: auto;
  line-height: 24px;
  border-radius: 50%;
  cursor: pointer;
}
.workyellow {
    background-color: #fea000;
    color: #fff;
}
.workblue {
    background-color: #6eb7ff;
    color: #fff;
}
.workpink {
    background-color: #ff616b;
    color: #fff;
}
.workgreen {
    background-color: #5fcf9c;
    color: #fff;
}
  .rest {
  color: #ccc !important;
  background: #fff !important;
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
.datelist {
  width: 100%;
  overflow:scroll;
  table {
    width: 1800px;
    text-align: center;
    td {
      position: relative;
      width: 53px;
      height: 50px;
    }
  }
}
.contentinput {
    height: 30px;
    padding-left: 5px;
    line-height: 30px;
    border-radius: 4px;
    border: #ccc 1px solid;
    margin: 0 15px;
}
footer {
  text-align: center;
    margin: 55px 0;
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
  #personalscheduling .el-input--medium .el-input__inner{
         border:none;
         text-align: center;
          cursor: pointer;
      }
  #personalscheduling  .el-input__prefix{
        display: none;
      }
  #personalscheduling  .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100px;
      }
   #personalscheduling  .el-input--medium .el-input__inner{
        padding: 0 10px 0 0;
      }
    #personalscheduling {
      .header-right {
          .el-button--medium {
            padding: 7px 20px;
          }
      }
    }
</style>
