<template>
<el-container class="temlateMain" id="NewAttendance" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span style="cursor: pointer;" @click="back">排班管理</span>
            <span>>新建排班</span>
        </el-header>
        <el-main>
            <el-form ref="form" :model="data" :rules="rules" label-width="130px">
                <div class="content">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="考勤班组名称：" prop="GroupName">
                                <el-input v-model="data.GroupName" placeholder="请输入班组名称，如：技术组"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="签到方式：" class="sign-box" >
                                <el-select v-model="data.SignType"  placeholder="请选择">
                                    <el-option
                                    v-for="item in signin"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                             <el-form-item label="" prop="AtdRuleIdList">
                                 <label class="fontstyle" for=""><span style="color: #f99740">*&thinsp;</span>班&emsp;&emsp;次：</label>
                                 <el-button @click="selectclasses">选择班次</el-button>
                                 <span style="color: #f99740; margin-left: 20px">*&thinsp;</span>
                                 <span style="color: #bfbfbf">添加班次 签到组仅能使用已添加的班次进行排班</span>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                             <el-form-item >
                                 <el-tag
                                v-for="(tag, key) in classestags"
                                :key="key"
                                @close="classesDelete(key,tag.id)"
                                closable>
                                {{tag.name}}
                                </el-tag>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                             <el-form-item label="选择部门：" prop="DeptList">
                                 <el-button @click="MangeShow_1=true">添加部门</el-button>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                             <el-form-item>
                                 <el-tag
                                v-for="(tag, key) in branch"
                                :key="key"
                                closable
                                @close="branchDelete(key)">
                                {{tag}}
                                </el-tag>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                             <el-form-item label="选择WIFI：" :prop="WiFiListrule">
                                 <el-button @click="WIFIshow = true">添加WIFI</el-button>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                             <el-form-item>
                                 <el-tag
                                v-for="(tag, key) in WIFItag"
                                :key="key"
                                @close="WIFIDelete(key)"
                                closable>
                                {{tag}}
                                </el-tag>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="">
                                <div @click="data.IsAllowView = !data.IsAllowView" class="labelbut" :class="{'chickedclasses': data.IsAllowView}" ></div>
                                <span style="padding-left: 30px;">允许部门主管查看自己部门的员工签到情况</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="">
                                <el-switch
                                v-model="data.IsOutSide"
                                active-color="#e6a23c"
                                inactive-color="#ccc">
                                </el-switch>
                                <span>是否开启外勤打卡</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="map-box" >
                             <el-form-item label="签到地点：" :prop="Gpsrule">
                                 <div  id="mapPart" >
                                    <el-amap-search-box class="search-box"  :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                                    <el-amap vid="amapDemo" :center="mapCenter" :zoom="14" class="amap-demo" :scrollWheel="false" :zoomEnable="false"  :doubleClickZoom="false">
                                        <el-amap-marker v-for="(marker,v) in markers" :position="marker" :key="v" ></el-amap-marker>
                                    </el-amap>
                                    <div class="select-box" v-if="selectshow" v-for="(item, key) in data.GpsDatas" :key="key">
                                        <span style="margin-right: 15px">{{'设置' + item.Adress + '为签到点'}}</span>
                                        <el-select  style="margin-right: 15px" v-model="item.Range" placeholder="请选择">
                                            <el-option
                                            v-for="item in error"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-button @click="deleteselect">清除</el-button>
                                    </div>
                                </div>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="人性化考勤">
                                <div>
                                    <el-switch
                                    v-model="data.IsHumanized"
                                    active-color="#e6a23c"
                                    inactive-color="#ccc">
                                    </el-switch>
                                    <span style="color: #bfbfbf; margin-left: 20px">开启后，可支持弹性考勤规则</span>
                                </div>

                                <div class="label-box" v-if="data.IsHumanized">
                                    <el-radio v-model="data.IsLastAndEarly" :label="true">宽松迟到早退</el-radio>
                                    <div>
                                        <div class="label-box-time">
                                            <span>上班时间后</span>
                                            <el-select v-model="data.LateMinute" placeholder="请选择">
                                                <el-option
                                                v-for="item in min"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>分钟</span>
                                        </div>
                                        <div class="label-box-time" style="position: relative;">
                                            <span>下班时间前</span>
                                            <el-select v-model="data.EarlyMinute" :disabled="forbidden" placeholder="请选择">
                                                <el-option
                                                v-for="item in min"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>分钟</span>
                                            <div @click="data.IsRepairTime = !data.IsRepairTime; forbidden = !forbidden" style="right: 65px" class="labelbut" :class="{'chickedclasses': data.IsRepairTime}" ></div>
                                            <span style="padding-left: 50px;">补足时间</span>
                                        </div>
                                    </div>
                                </div>
                                <div  class="label-box" v-if="data.IsHumanized">
                                    <el-radio v-model="data.IsLastAndEarly" :label="false">晚到晚走</el-radio>
                                    <div>
                                        <div class="label-box-time">
                                            <span>当日下班晚走</span>
                                            <el-select v-model="hourstar" @change="hourstarchange" placeholder="请选择">
                                                <el-option
                                                v-for="item in hourlist"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>小时</span>
                                            <el-select v-model="minstar" @change="hourstarchange" placeholder="请选择">
                                                <el-option
                                                v-for="item in min"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>分钟</span>
                                        </div>
                                        <div class="label-box-time">
                                            <span>次日上班可以晚来</span>
                                            <el-select v-model="hourend" @change="hourendchange" placeholder="请选择">
                                                <el-option
                                                v-for="item in hourlist"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>小时</span>
                                            <el-select v-model="minend" @change="hourendchange" placeholder="请选择">
                                                <el-option
                                                v-for="item in min"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <span>分钟</span>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                             <el-form-item label="加班">
                                 <div>
                                    <el-switch
                                    v-model="data.IsOverTime"
                                    active-color="#e6a23c"
                                    inactive-color="#ccc">
                                    </el-switch>
                                    <span style="color: #bfbfbf; margin-left: 20px">开启后，可支持弹性考勤规则</span>
                                </div>
                                <ul class="overtime" v-if="data.IsOverTime">
                                    <li>
                                        <span>加班计时开始</span>
                                        <span style="width: 120px">下班后</span>
                                        <el-select v-model="FromOffMinutehour" @change="FromOffMinutechange" placeholder="请选择">
                                            <el-option
                                            v-for="item in hourlist"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>小时</span>
                                        <el-select v-model="FromOffMinutemin" @change="FromOffMinutechange" placeholder="请选择">
                                            <el-option
                                            v-for="item in min"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>分钟</span>
                                    </li>
                                    <li>
                                        <span>有效加班时长</span>
                                        <span style="width: 120px">最小</span>
                                        <el-select v-model="OverTimeMinhour" @change="OverTimeMinchange" placeholder="请选择">
                                            <el-option
                                            v-for="item in hourlist"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>小时</span>
                                        <el-select v-model="OverTimeMinmin" @change="OverTimeMinchange" placeholder="请选择">
                                            <el-option
                                            v-for="item in min"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>分钟</span>
                                    </li>
                                    <li>
                                        <span></span>
                                        <span style="width: 120px">最大</span>
                                        <el-select v-model="OverTimeMaxhour" @change="OverTimeMaxchange" placeholder="请选择">
                                            <el-option
                                            v-for="item in hourlist"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>小时</span>
                                        <el-select v-model="OverTimeMaxmin" @change="OverTimeMaxchange" placeholder="请选择">
                                            <el-option
                                            v-for="item in min"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span>分钟</span>
                                    </li>
                                </ul>
                             </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="data.IsOverTime">
                             <el-form-item>
                                 <div @click="data.IsBreakOff = !data.IsBreakOff" class="labelbut" :class="{'chickedclasses': data.IsBreakOff}" ></div>
                                 <span style="padding-left: 25px">计入调休</span>
                             </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex"  justify="center" style="margin-bottom: 100px">
                        <el-col :span="2">
                              <el-button type="warning" @click="next" round >下一步</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </el-main>
        <div class="cup-box"  v-if="classesshow">
             <div class="classes">
                 <p>选择班次</p>
                 <ul>
                     <li v-for="(item, key) in classeslist" :key="key">
                         <span class="classesname">{{item.RuleName}}</span>
                         <span style="color: #e6a23c;">{{item.RuleTimeStr}}</span>
                         <div style="margin-left: 30px;" :class="{'chickedclasses': chickedclasses[key]}" @click="classesbut(item.RuleId,key)"></div>
                     </li>
                 </ul>
                 <footer>
                     <el-button type="warning" @click="classesaffirm">确定</el-button>
                     <el-button @click="classesCancel">取消</el-button>
                 </footer>
             </div>
        </div>
        <div class="department">
            <get-depeople :visible.sync="MangeShow_1" :actlist="DeptList" title="选择部门" :people="false" :checkbox="true" v-on:act-node="MangeActNode_1"></get-depeople>
        </div>
        <div class="cup-box" v-if="WIFIshow">
            <div class="classes" style="width: 760px;">
                 <p>添加WIFI</p>
                 <table>
                     <tr>
                        <td>序号</td>
                        <td>WIFi名称</td>
                        <td>MAC地址</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td><input v-model="WifiName" type="text"></td>
                        <td><input v-model="WifiMac" type="text"></td>
                     </tr>
                 </table>
                 <footer>
                     <el-button type="warning" @click="addwifi">确定</el-button>
                     <el-button @click="WIFIshow = false">取消</el-button>
                 </footer>
             </div>

        </div>
    </el-container>
</template>

<script>
import * as API from '@/api/workforcemanagement'
import getDepeople from '../../components/dialogDep/src/component'
export default {
  data() {
    return {
      fullscreenLoading: false,
      data: {
        SignType: 0,
        GroupName: '',
        DeptList: [],
        AtdRuleIdList: [],
        WiFiList: [],
        GpsDatas: [
          {
            Id: '',
            Longitude: null,
            Latitude: null,
            Range: '允许误差范围（米）',
            Adress: ''
          }
        ],
        IsLastAndEarly: true,
        IsAllowView: true,
        IsOutSide: false,
        IsHumanized: false,
        LateMinute: null,
        EarlyMinute: null,
        IsRepairTime: false,
        LateLeaveMinute: null,
        ArriveLateMinute: null,
        IsOverTime: false,
        FromOffMinute: null,
        OverTimeMin: null,
        OverTimeMax: null,
        IsBreakOff: false
      },
      rules: {
        GroupName: [
          { required: true, message: '请输入考勤班组名称', trigger: 'blur' }
        ],
        AtdRuleIdList: [
          { type: 'array', required: true, message: '请至少选择一个班次', trigger: 'change' }
        ],
        DeptList: [
          { type: 'array', required: true, message: '请至少选择一个部门', trigger: 'change' }
        ],
        WiFiList: [
          { type: 'array', required: true, message: '请至少选择一个WIFI', trigger: 'change' }
        ],
        'GpsDatas[0].Adress': [
          { required: true, message: '请选择签到地址', trigger: 'blur' }
        ]
      },
      WiFiListrule: '',
      Gpsrule: 'GpsDatas[0].Adress',
      DeptList: [],
      AtdRuleIdList: [],
      WiFiList: [],
      signin: [{
        label: 'GPS',
        value: 0
      },
      {
        label: 'WIFI',
        value: 1
      },
      {
        label: 'GPS+WIFI',
        value: 2
      }
      ],
      mapCenter: [121.59996, 31.197646],
      markers: [
        [121.59996, 31.197646]
      ],
      searchOption: {
        city: '杭州',
        citylimit: false
      },
      scheme: '1',
      classeslist: [], // 班次弹窗列表
      chickedclasses: [], // 样式是否添加判断数组
      classesshow: false, // 班次弹窗显示否？
      classestags: [], // 班次标签
      MangeShow_1: false, // 部门弹窗
      branch: [], // 选中部门标签
      WIFIshow: false,
      WifiName: '',
      WifiMac: '',
      WIFItag: [],
      error: [{
        value: 100,
        label: 100
      }, {
        value: 200,
        label: 200
      }, {
        value: 300,
        label: 300
      }, {
        value: 400,
        label: 400
      }, {
        value: 500,
        label: 500
      }, {
        value: 600,
        label: 600
      }],
      selectshow: false, // 签到位置显示
      min: [],
      hourlist: [],
      hourstar: null,
      hourend: null,
      forbidden: false, // 补足时间 下拉列表禁用
      minstar: null,
      minend: null,
      FromOffMinutehour: null,
      FromOffMinutemin: null,
      OverTimeMinhour: null,
      OverTimeMinmin: null,
      OverTimeMaxhour: null,
      OverTimeMaxmin: null
    }
  },
  components: {
    getDepeople
  },
  watch: {
    forbidden(val) {
      if (val) {
        this.data.EarlyMinute = this.data.LateMinute
      }
    },
    data: {
      handler(val, oldval) {
        if (val.SignType == 0) {
          this.WiFiListrule = ''
          this.Gpsrule = 'GpsDatas[0].Adress'
        } else if (val.SignType == 1) {
          this.WiFiListrule = 'WiFiList'
          this.Gpsrule = ''
        } else {
          this.WiFiListrule = 'WiFiList'
          this.Gpsrule = 'GpsDatas[0].Adress'
        }
      },
      deep: true
    }
  },
  computed: {

  },
  mounted() {
    this.change()
  },
  methods: {
    change() {
      for (let i = 0; i < 24; i++) {
        this.min.push({
          value: i * 5,
          label: i * 5
        })
        this.hourlist.push({
          value: i + 1,
          label: i + 1
        })
      }
      API.GetAtdRules().then(res => {
        if (res.data.Successful) {
          this.classeslist = res.data.Data
          for (let i = 0; i < res.data.Data.length; i++) { // 对应班次列表 多选框 样式数组添加     新增全部填false
            this.chickedclasses.push(false)
          }
        }
      })
      if (this.$route.query.id) {
        this.fullscreenLoading = true
        API.GetAtdSchedulingDetail(this.$route.query.id).then(res => {
          console.log(res)
          if (res.data.Successful) {
            this.data = res.data.Data
            const obj = this.data
            for (let i = 0; i < obj.AtdRuleIdList.length; i++) {
              this.classestags.push({ name: obj.AtdRuleIdList[i].RuleName, id: i })
              this.AtdRuleIdList.push(obj.AtdRuleIdList[i].RuleId)
              for (let j = 0; j < this.classeslist.length; j++) {
                if (obj.AtdRuleIdList[i].RuleId == this.classeslist[j].RuleId) {
                  this.chickedclasses.splice(j, 1, true)
                }
              }
            }
            const deptlength = obj.DeptList.length
            for (let i = 0; i < deptlength; i++) {
              this.branch.push(obj.DeptList[i].DeptName)
              this.DeptList.push(obj.DeptList[i].DeptId)
            }
            for (let i = 0; i < obj.WiFiList.length; i++) {
              this.WiFiList.push(obj.WiFiList[i].Id)
              this.WIFItag.push(obj.WiFiList[i].WifiName)
            }
            if (obj.IsRepairTime) {
              this.forbidden = true
            }
            this.hourstar = this.sethour(obj.LateLeaveMinute)
            this.minstar = this.setmin(obj.LateLeaveMinute)
            this.hourend = this.sethour(obj.ArriveLateMinute)
            this.minend = this.setmin(obj.ArriveLateMinute)
            this.FromOffMinutehour = this.sethour(obj.FromOffMinute)
            this.FromOffMinutemin = this.setmin(obj.FromOffMinute)
            this.OverTimeMinhour = this.sethour(obj.OverTimeMin)
            this.OverTimeMinmin = this.setmin(obj.OverTimeMin)
            this.OverTimeMaxhour = this.sethour(obj.OverTimeMax)
            this.OverTimeMaxmin = this.setmin(obj.OverTimeMax)
            if (obj.GpsDatas[0].Adress !== '') {
              this.selectshow = true
              this.mapCenter = [obj.GpsDatas[0].Longitude, obj.GpsDatas[0].Latitude]
              this.markers = [[obj.GpsDatas[0].Longitude, obj.GpsDatas[0].Latitude]]
            }
            this.fullscreenLoading = false
          }
        })
      }
    },
    hourstarchange() { // 当日晚走的时间赋值
      this.data.LateLeaveMinute = this.getmin(this.hourstar, this.minstar)
    },
    hourendchange() { // 第二天晚到的时间赋值
      this.data.ArriveLateMinute = this.getmin(this.hourend, this.minend)
      console.log(this.data)
    },
    deleteselect() { // 删除定位地址
      this.selectshow = false
      this.data.GpsDatas[0].Adress = ''
      this.data.GpsDatas[0].Longitude = 0
      this.data.GpsDatas[0].Latitude = 0
      this.data.GpsDatas[0].Range = '允许误差范围（米）'
    },
    onSearchResult(pois) {
      console.log(pois[0])
      this.selectshow = true
      this.data.GpsDatas[0].Adress = pois[0].address + pois[0].name
      this.data.GpsDatas[0].Longitude = pois[0].lng
      this.data.GpsDatas[0].Latitude = pois[0].lat
      console.log(this.data)
      this.markers = []
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.splice(0, 1, [pois[0].lng, pois[0].lat])
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [pois[0].lng, pois[0].lat]
      }
    },
    switchbut() {

    },
    classesbut(id, key) { // 选择班次选中班次勾选按钮
      if (this.chickedclasses[key]) {
        this.chickedclasses.splice(key, 1, false)
      } else {
        this.chickedclasses.splice(key, 1, true)
      }
    },
    selectclasses() { // 保存label选中状态 如果点取消就不变
      sessionStorage.setItem('chickedclasses', JSON.stringify(this.chickedclasses))
      this.classesshow = true
    },
    classesaffirm() { // 班次弹窗 确定按钮
      this.classesshow = false
      this.classestags = []
      this.AtdRuleIdList = []
      for (let i = 0; i < this.classeslist.length; i++) {
        if (this.chickedclasses[i]) {
          this.classestags.push({ name: this.classeslist[i].RuleName, id: i }) // 标签
          this.AtdRuleIdList.push(this.classeslist[i].RuleId) // 要上传的数组id  班次
        }
      }
    },
    classesCancel() { // 班次弹窗取消按钮
      this.classesshow = false
      this.chickedclasses = JSON.parse(sessionStorage.getItem('chickedclasses'))
    },
    classesDelete(key, e) { // 删除班次标签
      this.classestags.splice(key, 1)
      this.AtdRuleIdList.splice(key, 1)
      this.chickedclasses.splice(e, 1, false)
    },
    MangeActNode_1(item) { // 部门弹窗确定
      this.branch = []
      this.DeptList = []
      for (let i = 0; i < item.length; i++) {
        this.DeptList.push(item[i].ItemId)
        this.branch.push(item[i].Name)
      }
    },
    branchDelete(key) {
      this.DeptList.splice(key, 1)
      this.branch.splice(key, 1)
      console.log(this.DeptList)
    },
    addwifi() { // 添加wifi
      const data = {}
      data.WifiName = this.WifiName
      data.WifiMac = this.WifiMac
      API.CreateWiFi(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.WIFIshow = false
          this.WiFiList.push(res.data.Data)
          this.WIFItag.push(this.WifiName)
        }
      })
    },
    WIFIDelete(key) { // 删除 wifi 标签
      this.WiFiList.splice(key, 1)
      this.WIFItag.splice(key, 1)
      console.log(this.data)
    },
    back() {
      this.$router.push({
        path: '/Attendance/workforcemanagement',
        query: {
        }
      })
    },
    next() {
      this.data.DeptList = this.DeptList
      this.data.AtdRuleIdList = this.AtdRuleIdList
      this.data.WiFiList = this.WiFiList
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            this.data.AtdSchedulingId = this.$route.query.id
          }
          const data = this.data
          API.CreateAtdScheduling(data).then(res => {
            console.log(res)
            if (res.data.Successful) {
              this.$router.push({
                path: '/Attendance/batchscheduling',
                query: {
                  id: res.data.Data
                }
              })
            } else {
              this.$message({
                message: res.data.Message
              })
            }
          })
        }
      })
    },
    getmin(hour, min) {
      return hour * 60 + min
    },
    sethour(date) {
      return parseInt(date / 60)
    },
    setmin(date) {
      return parseInt(date - (parseInt(date / 60) * 60))
    },
    FromOffMinutechange() { // 获取分钟 加班 下班后
      this.data.FromOffMinute = this.getmin(this.FromOffMinutehour, this.FromOffMinutemin)
    },
    OverTimeMinchange() { // 获取分钟 加班 下班多久后
      this.data.OverTimeMin = this.getmin(this.OverTimeMinhour, this.OverTimeMinmin)
    },
    OverTimeMaxchange() { // 获取分钟 加班 加班多大时长
      this.data.OverTimeMax = this.getmin(this.OverTimeMaxhour, this.OverTimeMaxmin)
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

}
.content {
    width: 966px;
    margin: auto;
    padding-top: 60px;
    .overtime {
        padding: 0;
        margin: 15px 0 0;
        li {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0 0 20px;
            span:first-child {
                padding-left: 24px;
                width: 168px;
            }
        }
    }
}
.search-box {
    width: 100%;
    height: 36px;

}
.select-box {
    margin-top: 20px;
}
.fontstyle {
    position: absolute;
    left: -92px;
    color: #8a8a8a;
    font-weight: 400;
}
.cup-box {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
}
.classes {
    width: 500px;
    margin: 200px auto 0;
    background: #fff;
    overflow: hidden;
    border-radius: 4px;
    ul,li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    p {
        line-height: 40px;
        background: #eee;
        padding-left: 20px;
        margin: 0;
        font-weight: 700;
        font-size: 16px;
    }
    ul {
        padding: 30px 40px;
    }
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    div {
        width: 20px;
        height: 20px;
        border: solid 1px #cccccc;
        border-radius: 2px;
    }
    .classesname {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    footer {
        display: flex;
        justify-content: space-around;
        padding-bottom: 30px;
    }
    table {
        width: 100%;
        padding: 40px 40px 40px 0;
        td:first-child {
            width: 100px;
            text-align: center;
        }
        input {
            width: 240px;
            line-height: 28px;
            border-radius: 4px;
            border:#8a8a8a 1px solid;
        }
        tr {
            line-height: 30px;
        }
    }
}
.labelbut {
        position: absolute;
        top: 8px;
        width: 20px;
        height: 20px;
        border: solid 1px #cccccc;
        border-radius: 2px;

}
.chickedclasses {
        background: url(../../assets/meeting/yes.png) no-repeat 1px 1px/98%;
        background-color: #e6a23c;
        border: none !important;
}
.label-box {
    display: flex;
    margin-top: 15px;
    .label-box-time {
        display: flex;
        margin-bottom: 20px;
        span:first-child {
            width: 120px;
        }
    }
}
</style>

<style lang="scss">
   .map-box {
     .el-vue-search-box-container .search-box-wrapper input {
        line-height: 36px;
        height: 36px !important;
        border: solid 1px #ccc;
        border-radius: 4px;
    }
    .el-vue-search-box-container {
        box-shadow: none;
    }
    .el-vue-amap-container, .el-vue-amap-container .el-vue-amap {
        height: 300px;
        margin: 20px 0 0;
    }
   }
   .sign-box {
       .el-select {
           width: 100%;
       }
   }
   .department {
       .getPeopleOrDep .el-tree-node__content, .getPeopleOrDep .theCell {
            line-height: 30px;
            height: 30px;
        }
        .getPeopleOrDep .body_cell_content .theCell:hover .el-icon-close {
            margin: 10 20px;
        }
   }
   .label-box {
       .el-radio {
           width: 168px;
           padding: 11px 0 0;
       }
   }
   #NewAttendance {
       .el-select {
           margin: 0 10px 0 20px;
       }
       .el-input--medium .el-input__inner {
           height: 36px !important;
       }
       .amap-logo {
           display: none !important;
       }
   }
</style>
