<template>
  <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
    v-cloak>
    <el-header height="50px">
      <span :class="{tab_btn:true,active:TaskAct==1}" v-on:click="ToCheckTaskAct(1)">会计科目</span>
      <span :class="{tab_btn:true,active:TaskAct==2}" v-on:click="ToCheckTaskAct(2)">财务期初</span>
      <span :class="{tab_btn:true,active:TaskAct==3}" v-on:click="ToCheckTaskAct(3)">科目参数设置</span>
      <div class="header-right">
        <el-button type="success" size="small"  v-show="columns_1_isEdit" v-if="TaskAct==2" v-on:click="GetCalculateBalance">试算平衡</el-button>
        <el-button type="warning" size="small" v-if="TaskAct!=3" @click="exportBtn">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-container v-if="TaskAct!=3">
        <el-header>
          <el-radio-group v-model="tabletype_text" fill="#f99740" @change="tabletype_change">
            <el-radio-button label="资产"></el-radio-button>
            <el-radio-button label="负债"></el-radio-button>
            <el-radio-button label="权益"></el-radio-button>
            <el-radio-button label="成本"></el-radio-button>
            <el-radio-button label="损益"></el-radio-button>
          </el-radio-group>
          <div class="fooltip">
                <div class="infoBox" v-if="tip.FirstStep"><span id="triangle-left"></span>您可以先完善会计科目，并设置财务期初后进行试算平衡</div>
          </div>
           <div class="fooltip">
                <div class="infoBox" v-if="tip.SecondStep"><span id="triangle-left"></span>您可以先完善会计科目，并设置财务期初后进行试算平衡</div>
          </div>
           <div class="fooltip step3">
                <div class="infoBox" v-if="tip.ThirdStep"><span id="triangle-top"></span>试算平衡后即可开账</div>
          </div>
          <el-row class="header-right" :gutter="20" style="margin-right:50px" v-if="TaskAct==1">
            <el-col :span="20">
              <el-input size="medium"  placeholder="可输入科目编号/科目名称" suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="warning" size="small" v-on:click="dialogVisible=true">新增科目</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <!-- {{TaskAct}} -->
          <el-scroll>
          <template v-if="TaskAct==1">
            <tree-grid :columns="columns" :tree-structure="true" :data-source="BusarSubject" :defaultExpandAll="defaultExpandAll" :defaultMaxLevel="SubjectLevel"
              v-on:Child_MethodDelete="parentMethod" @Child_MethodAdd="ChildToAdd_dialog" @Child_MethodEdit="ChildToEdit_dialog" @Child_MethodChangeStatus="ChildToUseorForbid">
            </tree-grid>
          </template>
          <template v-else>
            <div class="monthbox"><span class="MonthTitle">启用期间：</span><span class="MonthTitle">{{EnableTime}}</span></div>
            <tree-grid :columns="columns_1" :tree-structure="true" :data-source="EarlyList" :defaultExpandAll="defaultExpandAll" @Child_MethodSaveEarly="SaveEarly" :EditorStructure="true" treeType="none"></tree-grid>
          </template>
          </el-scroll>
        </el-main>
      </el-container>
      <el-container v-else>
        <el-main>
          <span class="ClasseeNum">科目参数</span>
          <el-form class="SubjectSetting" v-model="subjextForm" size="small">
            <el-form-item label="科目级数:">
              <el-select placeholder="请选择" v-model="SubjectLevel" size="mini" @change="handleSelect">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码长度:">
              <!-- <el-input size="medium"  disabled></el-input> -->
              <template v-for="k in codeLength">
              <span class="numadded"  v-show="k.isIcon" :key="k.id+ '-icon'"></span>
              <el-input-number v-show="k.isShow" :key="k.id+ '-label'"  :disabled="k.isdisable" v-model="k.value" controls-position="right" size="medium" @change="handleNumberChange(k.key,k.value)" :min="2" :max="4"></el-input-number>
              </template>
            </el-form-item>
             <el-form-item label="编码实列:">
             <template v-for="k in codeLength">
             <span class="numadded"  v-show="k.isIcon" :key="k.id + '-numicon'"></span>
              <span class="numex" v-show="k.isShow" :key="k.id + '-num'"  :style="k.isEdited?'color:#f99740':'color:#333'">{{k.ex}}</span>
              </template>
             </el-form-item>
             <el-form-item>
               <el-button type="warning" size="medium" v-on:click="submitParameterSetting"> 保存</el-button>
             </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-main>
    <el-dialog title="新增科目" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="BusarSubjectForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类别" prop="Type ">
          <el-select v-model="BusarSubjectForm.Type " placeholder="请选择类别" @change="handelSelectType">
            <el-option v-for="(k,index) in tabletype_List" :label="k.name" :value="k.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级科目" prop="ParentId ">
          <el-select v-model="BusarSubjectForm.ParentId" placeholder="请选择上级科目，若不选择上级科目可新增一级科目" @change="handleSelectParent">
            <el-option v-for="k in BusarSubjectDropDown" :key="k.Key" :label="k.Key" :value="k.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="color:#f99740" class="SubjectSetting">
        <span>科目级次：</span>
         <template v-for="k in codeLength">
             <span class="numadded"  v-show="k.isIcon" :key="k.id+ '-numadd'"></span>
              <span class="numex" v-show="k.isShow" :key="k.id+ '-numex'">{{k.value}}</span>
              </template>
             </el-form-item>
        <el-form-item label="科目编码" prop="SubjectCodeEx">
             <el-input type="text" v-model="BusarSubjectForm.SubjectCodeEx" :maxlength="code_maxlength">
                <template slot="prepend" v-if="BusarSubjectForm.ParentId!=''">{{excode}}</template>
             </el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop="SubjectName">
          <el-input type="text" v-model="BusarSubjectForm.SubjectName" maxlength="30" placeholder="请输入科目名称（长度不超过30字）"></el-input>
        </el-form-item>
        <el-form-item label="余额方向" prop="Directiontext">
          <el-radio-group v-model="BusarSubjectForm.Directiontext">
            <el-radio label="借"></el-radio>
            <el-radio label="贷"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="科目状态" prop="Statustest" >
          <el-radio-group v-model="BusarSubjectForm.Statustest">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用" v-if="BusarSubjectForm.ParentId!=''"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button size="small" @click="reserForm">取 消</el-button>
        <el-button type="warning" size="small" @click="AddOrEditSubject">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="试算平衡" :visible.sync="box_dialogVisible" width="490px" :before-close="handleClose">
      <el-row style="padding: 0px 50px;" :gutter="60">
        <el-col>
          <!-- <img :src="spritrpng" class="failLogo"> -->
          <span :class="CalculateBalance.TotalBalance?'successLogo':'failLogo'"></span>
        </el-col>
        <el-col :span="12">
          <el-row class="balanceContent">
            <el-col :span="12">期初金额：</el-col>
            <el-col :span="12" :class="isBalance?'successText':'failText'">{{CalculateBalance.EarlyBalance?'平衡':'不平衡'}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row class="balanceContent">
            <el-col :span="12">累计发生：</el-col>
            <el-col :span="12" :class="isBalance?'successText':'failText'">{{CalculateBalance.AccumulateBalance?'平衡':'不平衡'}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.EarlyBalance">
          <el-row class="balanceContent">
            <el-col :span="12">借方金额：</el-col>
            <el-col :span="12">{{CalculateBalance.AccumulateLenderMoney}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.AccumulateBalance">
          <el-row class="balanceContent">
            <el-col :span="12">借方金额：</el-col>
            <el-col :span="12">{{CalculateBalance.EarlyLenderMoney}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.EarlyBalance">
          <el-row class="balanceContent">
            <el-col :span="12">贷方余额：</el-col>
            <el-col :span="12">{{CalculateBalance.EarlyDebitMoney}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.AccumulateBalance">
          <el-row class="balanceContent">
            <el-col :span="12">贷方余额：</el-col>
            <el-col :span="12">{{CalculateBalance.AccumulateDebitMoney}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.EarlyBalance">
          <el-row class="balanceContent">
            <el-col :span="7">余</el-col>
            <el-col :span="5">额：</el-col>
            <el-col :span="12" :class="isBalance?'successText':'failText'">{{CalculateBalance.EarlySurplus}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="!CalculateBalance.AccumulateBalance">
          <el-row class="balanceContent">
            <el-col :span="7">余</el-col>
            <el-col :span="5">额：</el-col>
            <el-col :span="12" :class="isBalance?'successText':'failText'">{{CalculateBalance.AccumulateSurplus}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog_footer" v-if="isBalance">
        <el-button size="small" @click="box_dialogVisible = false">暂不开账</el-button>
        <el-button size="small" type="warning" @click="OpenAccount">开账</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import TreeGrid from './components/treegrid'
import EditorTable from './components/EditorTable'
import * as API from '@/api/finance_setting'
import { globalvariable } from '@/utils/globalvariable'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      isBalance: false, // 试算是否平衡
      CalculateBalance: '', // 试算平衡返回数据
      columns_1_isEdit: true,
      // FirstStep: true,
      tip: {// 气泡显隐
        FirstStep: false,
        SecondStep: false,
        ThirdStep: false,
        FourStep: false
      },
      dialogVisible: false,
      box_dialogVisible: false,
      TaskAct: 1,
      fullscreenLoading: false,
      defaultExpandAll: true, // 是否折叠树
      tabletype_text: '资产',
      tabletype_List: [
        { name: '资产', value: 1 },
        { name: '负债', value: 2 },
        { name: '权益', value: 3 },
        { name: '成本', value: 4 },
        { name: '损益', value: 5 }
      ],
      tabletype: 1,
      options: [4, 5, 6], // 科目级数范围
      SubjectLevel: 4, // 科目级数，默认为4
      columns: [
        // 会计科目
        {
          text: '科目编号',
          dataIndex: 'SubjectCode'
        },
        {
          text: '科目名称',
          dataIndex: 'SubjectName'
        },
        {
          text: '类别',
          dataIndex: 'Type' // 类别(1-资产 2-负债 3-权益 4-成本 5-损益)
        },
        {
          text: '余额方向',
          dataIndex: 'Direction'
        },
        {
          text: '状态',
          dataIndex: 'Status'
        }
      ],
      columns_1: [
        {
          text: '科目编号',
          dataIndex: 'SubjectCode',
          isEdit: false
        },
        {
          text: '科目名称',
          dataIndex: 'SubjectName',
          isEdit: false
        },
        {
          text: '方向',
          dataIndex: 'Direction',
          isEdit: false
        },
        {
          text: '期初余额',
          dataIndex: 'InitialBalance',
          typevalue: 1,
          isEdit: true
        },
        {
          text: '本年累计借方',
          dataIndex: 'TotalYearDebit',
          typevalue: 2,
          isEdit: true
        },
        {
          text: '本年累计贷方',
          dataIndex: 'TotalYearCredit',
          typevalue: 3,
          isEdit: true
        },
        {
          text: '年初余额',
          dataIndex: 'BeginYearBalance',
          isEdit: false
        }
      ],
      EnableTime: '', // 启用日期
      EarlyList: [], // 财务期初列表
      BusarSubject: [], // 会计科目列表
      BusarSubjectDropDown: [], // 会计科目下拉列表
      BusarSubjectForm: {
        // 新增科目
        Id: '',
        Type: 1,
        ParentId: '',
        ParentLevel: '',
        SubjectCode: '',
        SubjectCodeEx: '',
        SubjectName: '',
        Direction: '',
        Directiontext: '',
        Status: '',
        Statustest: ''
      },
      excode: '',
      rules: {},
      codeLength: [
        {
          id: 1,
          value: 4,
          key: 'FirstCodeLength',
          ex: '0001',
          isEdited: false,
          isShow: true,
          isdisable: true,
          isIcon: false
        },
        {
          id: 2,
          value: 2,
          key: 'SecondCodeLength',
          ex: '01',
          isEdited: false,
          isShow: true,
          isdisable: false,
          isIcon: true
        },
        {
          id: 3,
          value: 2,
          key: 'ThirdCodeLength',
          ex: '01',
          isEdited: false,
          isShow: true,
          isdisable: false,
          isIcon: true
        },
        {
          id: 4,
          value: 2,
          key: 'FourthCodeLength',
          ex: '01',
          isEdited: false,
          isShow: true,
          isdisable: false,
          isIcon: true
        },
        {
          id: 5,
          value: 2,
          key: 'FifthCodeLength',
          ex: '01',
          isEdited: false,
          isShow: false,
          isdisable: false,
          isIcon: false
        },
        {
          id: 6,
          value: 2,
          key: 'SixthCodeLength',
          ex: '01',
          isEdited: false,
          isShow: false,
          isdisable: false,
          isIcon: false
        }
      ],
      subjextForm: '',
      code_maxlength: 4,
      maxheight: 738
    }
  },
  components: {
    TreeGrid,
    EditorTable
  },
  created() {
    console.log(this.TaskAct)
    // this.ToCheckTaskAct(1)
    this.GetBusarSubject()
    setTimeout(() => {
      this.GetParameterSetting()
      this.ToJudgeNeedTip(1, 'FirstStep')
      // this.GetSubjectDropDownList()
    }, 1000)
  },
  mounted() {
    // 页面跳转:
    this.TaskAct = this.$route.query.TaskAct
    this.initial()
    this.AccountIsOpen()
  },
  methods: {
    // 导出
    exportBtn() {
      if (this.TaskAct == 1) { // 会计科目GET /api/v2/BusarManage/ExportSubjectList
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportSubjectList?request.token=' + getToken() + '&export=' + true)
      } else if (this.TaskAct == 2) { // 财务期初GET /api/v2/BusarManage/ExportEarlyList
        window.open(globalvariable().apiurl + 'api/v2/BusarManage/ExportEarlyList?request.token=' + getToken() + '&export=' + true)
      }
    },
    // 气泡显示判断
    ToJudgeNeedTip(type, tipText) {
      const that = this
      // let flag = false
      API.JudgeNeedTip(type).then(res => {
        if (res.data.Successful) {
          that.tip[tipText] = res.data.Data
          console.log(that.tip)
        }
      })
      // return flag
    },
    // 判断是否初始化
    initial() {
      console.log(this.$store.state.user.financialInitial)
      if (!this.$store.state.user.financialInitial.FirstStep) {
        this.$router.push({ path: '/finance/promptIndex' })
      }
    },
    tabletype_change(val) { // 切换分类
      console.log(val)
      this.tabletype_List.forEach(type => {
        if (type.name == val) {
          this.tabletype = type.value
        }
      })
      // this.tabletype = this.tabletype_List[val]
      this.BusarSubjectForm.Type = this.tabletype
      console.log(this.tabletype)
      if (this.TaskAct == 1) {
        this.GetBusarSubject()
        this.ToJudgeNeedTip(1, 'FirstStep')
      } else if (this.TaskAct == 2) {
        this.GetEarlyList()
        this.ToJudgeNeedTip(1, 'FirstStep')
        this.ToJudgeNeedTip(2, 'SecondStep')
        setTimeout(() => {
          if (this.tip.SecondStep == false) {
            this.ToJudgeNeedTip(3, 'ThirdStep')
          }
        }, 400)
      }
      // this.GetSubjectDropDownList()
    },
    ToCheckTaskAct: function(flag) {
      // 切换tab页时分类设置为资产
      this.TaskAct = flag
      this.tabletype_text = '资产'
      this.tabletype_change(this.tabletype_text)
    },
    handleSelect: function(num) {
      // 科目参数设置
      this.codeLength.forEach(item => {
        if (item.id != 1) {
          if (item.id > num) {
            item.isShow = false
            item.isIcon = false
          } else {
            item.isShow = true
            item.isIcon = true
          }
        }
      })
    },
    handelSelectType: function(num) {
      // 新增科目选择类别
      // console.log(num)
      this.BusarSubjectForm.Type = num
      this.GetSubjectDropDownList(num)
    },
    handleSelectParent: function(id) {
      console.log(id)
      const that = this
      this.BusarSubjectDropDown.forEach(sub => {
        if (sub.Value == id) {
          that.BusarSubjectForm.ParentLevel = sub.Level
          that.excode = sub.Key.split(' ')[0]
          that.code_maxlength = sub.LimitSize
        }
      })
    },
    handleClose: function() {
      this.reserForm()
      this.box_dialogVisible = false
    },
    handleNumberChange: function(index, num) {
      this.codeLength.forEach(item => {
        if (item.key == index) {
          item.isEdited = true
          const l = item.ex.length
          if (l < num) {
            for (var i = 0; i < num - l; i++) {
              item.ex = '0' + item.ex
            }
          } else {
            item.ex = item.ex.slice(l - num)
          }
        }
      })
    },
    parentMethod: function(id) { // 会计科目-删除科目
      console.log(id)
      const that = this
      this.$confirm('此操作将永久删除该科目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          API.DeleteSubject(id).then(res => {
            if (res.data.Successful) {
              that.$message({
                type: 'success',
                message: '删除成功!',
                onClose: function() {
                  that.GetBusarSubject()
                }
              })
            }
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    GetBusarSubject(subjectname) {
      // 获取会计科目
      var that = this
      API.GetSubjectList(that.tabletype, subjectname).then(res => {
        console.log(res)
        if (res.data.Successful) {
          that.BusarSubject = that.CheckData(res.data.Data)
        }
      })
    },
    GetSubjectDropDownList(type) {
      // 获取下拉框会计科目
      var that = this
      if (type == null) {
        type = that.tabletype
      }
      API.GetSubjectDropDownList(1, type).then(res => {
        console.log(res)
        if (res.data.Successful) {
          that.BusarSubjectDropDown = res.data.Data
        }
      })
    },
    GetParameterSetting() { // 获取科目参数
      var that = this
      API.GetParameterSetting().then(res => {
        console.log(res)
        if (res.data.Successful) {
          that.SubjectLevel = res.data.Data.SubjectLevel
          that.codeLength.forEach(item => {
            item.value = res.data.Data[item.key]
            if (item.id != 1) {
              if (item.id > that.SubjectLevel) {
                item.isShow = false
                item.isIcon = false
              } else {
                item.isShow = true
                item.isIcon = true
              }
            }
            const l = item.ex.length
            if (l < item.value) {
              for (var i = 0; i < item.value - l; i++) {
                item.ex = '0' + item.ex
              }
            } else {
              item.ex = item.ex.slice(l - item.value)
            }
          })
        }
      })
    },
    submitParameterSetting() { // 设置科目参数
      const BusarParameter = {}
      const that = this
      that.codeLength.forEach(item => {
        BusarParameter[item.key] = item.value
        BusarParameter['SubjectLevel'] = that.SubjectLevel
      })
      API.SaveParameterSetting(BusarParameter).then(res => {
        if (res.data.Successful) {
          that.$message('保存设置成功')
        } else {
          that.$message(res.data.Message)
        }
      })
    },
    ChildToAdd_dialog(pid) { // 新增子科目
      console.log(pid)
      this.dialogVisible = true
      this.GetSubjectDropDownList()
      this.handleSelectParent(pid)
      this.BusarSubjectForm.ParentId = pid
    },
    ChildToUseorForbid(pmodel) {
      const that = this
      API.UseOrForbidSubject(pmodel.pid, pmodel.type).then(res => {
        console.log(res)
        if (res.data.Successful) {
          that.$message({ message: '操作成功', type: 'success' })
          that.GetBusarSubject()
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    handleEditSelectParent(id, code) { // 选择父级（上级科目）
      console.log(id)
      const that = this
      this.BusarSubjectDropDown.forEach(sub => {
        if (sub.Value == id) {
          that.BusarSubjectForm.ParentLevel = sub.Level
          that.excode = sub.Key.split(' ')[0]
          that.BusarSubjectForm.SubjectCodeEx = code.slice(that.excode.length)
          that.code_maxlength = sub.LimitSize
        }
      })
    },
    ChildToEdit_dialog(EditModel) { // 编辑科目
      console.log(EditModel)
      const that = this
      that.GetSubjectDropDownList()
      this.BusarSubjectForm.ParentId = EditModel._parent.Id
      setTimeout(() => {
        that.BusarSubjectForm = {
          // 新增科目
          Id: EditModel.Id,
          Type: that.tabletype,
          ParentId: EditModel._parent.Id,
          ParentLevel: EditModel._parent.Level,
          SubjectCode: EditModel.SubjectCode,
          SubjectCodeEx: '',
          SubjectName: EditModel.SubjectName,
          Direction: EditModel.Direction == '借' ? 1 : 2,
          Directiontext: EditModel.Direction,
          Status: EditModel.Statuskey,
          Statustest: EditModel.Statuskey ? '启用' : '禁用'
        }
        that.handleEditSelectParent(
          EditModel._parent.Id,
          EditModel.SubjectCode
        )
        console.log(that.BusarSubjectForm)
        that.dialogVisible = true
      }, 500)
    },
    AddOrEditSubject() { // 提交科目数据
      const that = this
      // this.dialogVisible = false;
      if (this.BusarSubjectForm.Directiontext == '借') {
        this.BusarSubjectForm.Direction = 1
      } else {
        this.BusarSubjectForm.Direction = 2
      }
      if (this.BusarSubjectForm.Statustest == '启用') {
        this.BusarSubjectForm.Status = true
      } else {
        this.BusarSubjectForm.Status = false
      }
      this.BusarSubjectForm.SubjectCode =
        this.excode + this.BusarSubjectForm.SubjectCodeEx
      console.log(this.BusarSubjectForm)
      API.AddOrEditSubject(this.BusarSubjectForm).then(res => {
        console.log(res)
        if (res.data.Successful) {
          that.dialogVisible = false
          that.GetBusarSubject()
          that.reserForm()
        } else {
          that.$message(res.data.Message)
        }
      })
      // console.log(this.BusarSubjectForm);
    },
    CheckData(data) { // 替换数据显示
      const that = this
      data.forEach(item => {
        if (item.Direction == 1) {
          item.Direction = '借'
        } else {
          item.Direction = '贷'
        }
        item.Statuskey = item.Status
        if (item.Status) {
          item.Status = '正常'
        } else {
          item.Status = '禁用'
        }
        that.tabletype_List.forEach(type => {
          if (type.value == item.Type) {
            item.Type = type.name
          }
        })
        if (item.ChildList.length > 0) {
          that.CheckData(item.ChildList)
        }
      })
      return data
    },
    reserForm() { // form置空
      this.BusarSubjectForm = {
        // 新增科目
        Id: '',
        Type: 1,
        ParentId: '',
        ParentLevel: '',
        SubjectCode: '',
        SubjectCodeEx: '',
        SubjectName: '',
        Direction: '',
        Directiontext: '',
        Status: '',
        Statustest: ''
      }
      this.excode = ''
      this.dialogVisible = false
    },
    GetEarlyList() { // 获取财务期初列表
      const that = this
      API.GetEarlyList(this.tabletype).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          that.EarlyList = res.data.Data.EarlyList
          that.EnableTime = res.data.Data.EnableTime
        }
      })
    },
    SaveEarly(Early) { // 保存期初
      const that = this
      API.SaveEarlyFinancial(Early).then(res => {
        console.log(res.data)
        that.GetEarlyList()
      })
    },
    GetCalculateBalance() { // 试算平衡
      const that = this
      API.CalculateBalance().then(res => {
        console.log(res.data)
        // that.GetEarlyList()
        if (res.data.Successful) {
          that.CalculateBalance = res.data.Data
          that.isBalance = res.data.Data.AccumulateBalance
          if (that.isBalance) {
            that.ToJudgeNeedTip(4, 'FourStep')
          }

          that.box_dialogVisible = true
        }
      })
    },
    OpenAccount() {
      const that = this
      API.OpenAccount().then(res => {
        // console.log(res)
        if (res.data.Successful) {
          that.box_dialogVisible = false
          that.GetEarlyList()
        }
      })
    },
    AccountIsOpen() {
      const that = this
      API.OpenAccount().then(res => {
        // console.log(res)
        if (res.data.Successful) {
          that.columns_1.forEach(item => {
            item.isEdit = false
          })
          that.columns_1_isEdit = false
        }
      })
    }
  }
}
</script>
<style>
.el-radio-button,
.el-radio-button__inner:hover {
  color: #f99740;
}
.dialog_footer{
  display: block;
}
</style>

<style lang="scss" scoped>
.demo-ruleForm{
.el-select {
  display: block;
}}
.temlateMain {
  .noData,
  .noData div {
    height: 100%;
  }

  .listB {
    background: url(/images/apply_empty.png) center no-repeat;
  }

  .searchB {
    background: url(/images/Task/pic_noresults.png) center no-repeat;
  }

  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }

    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }

    .header-right {
      float: right;

      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }

  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;

    .el-container {
      height: 100%;

      .el-header {
        border-bottom: none;
        padding: 20px;
      }

      .el-main {
        padding: 20px;
        .monthbox {
          height: 48px;
          .MonthTitle {
            font-size: 16px;
            padding: 10px 14px 20px 4px;
            display: block;
            float: left;
          }
        }
      }
    }
  }
  .el-radio-group{
    float: left;
  }
 .infoBox{
          display: inline-block;
    background-color: #ffbf51;
    height: 48px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    line-height: 48px;
    padding-left: 15px;
    -webkit-box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    margin-left: 30px;
    padding-right: 15px;
    position: relative;
    top: -8px;
       #triangle-left {
        display:inline-block;
        width:0;
        height:0;
        border-width:10px 10px 10px 0;
        border-style:solid;
        border-color:transparent #ffbf51 transparent transparent;/*透明 黄 透明 透明 */
        position: absolute;
        left:-10px;
        top:14px;
}}
.step3 {
  float: right;
  .infoBox{
    display: inline-block;
    background-color: #ffbf51;
    height: 48px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    line-height: 48px;
    padding-left: 15px;
    -webkit-box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    box-shadow: 0 5px 12px 0 rgba(255, 196, 96, 0.4);
    margin-left: 30px;
    padding-right: 15px;
    position: relative;
    top: -8px;
    right: 65px;
       #triangle-top {
       display: inline-block;
    width: 0;
    height: 0;
    border-width: 10px 10px 10px;
    border-color: transparent transparent #ffbf51 transparent;
    position: absolute;
    right: 20px;
    top: -20px;
    border-style: solid;
}}
}
  .failLogo {
    width: 51px;
    height: 51px;
    background: url(/img/sprite.8b0a4f58.png) -60px -308px no-repeat;
    display: block;
    margin: 0 auto 40px;
  }

  .successLogo {
    width: 51px;
    height: 51px;
    background: url(/img/sprite.8b0a4f58.png) 0px -308px no-repeat;
    display: block;
    margin: 0 auto 40px;
  }

  .balanceContent {
    margin: 10px 0;
  }

  .successText {
    color: #5cb85c;
  }

  .failText {
    color: #e93a29;
  }

  .ClasseeNum {
    font-size: 14px;
    margin-bottom: 20px;
    display: block;
    &::before {
      content: "";
      width: 4px;
      height: 16px;
      background: #f99740;
      display: block;
      float: left;
      margin-right: 10px;
      margin-top: 1px;
    }
  }
  .SubjectSetting {
    .el-input,
    .el-input-number,
    .el-select {
      width: 100px;
    }

    .numadded {
      margin: 10px;
      &::before {
        content: "-";
      }
    }

    // .numex {
    //   &::before {
    //     content: "-";
    //     margin: 5px;
    //     color: #333;
    //   }
    // }
  }
}
</style>
