<template>
      <el-container class="temlateMain"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item><span>客户管理</span></el-breadcrumb-item>
            </el-breadcrumb>

            <div class="header-right">
                <div class="tools_search">
                    <el-input
                    placeholder="请输入客户名字/电话"
                    v-model="input"
                    @blur="toSearch">
                      <b slot="append" class="el-icon-search" @click="toSearch"></b>
                    </el-input>
                </div>

                 <el-button size="small" type="warning"><router-link to="/CustomerManagement/newPage">新建客户</router-link></el-button>
                 <el-button size="small" type="warning" @click="upExcel">导入</el-button>
                 <el-button size="small" @click="batchDelete()">删除</el-button>
            </div>
        </el-header>
        <el-main>
            <el-container>
                <el-header  height="60px">
                    <el-popover placement="bottom-start"
                            v-model="visible2"
                            trigger="click">
                        <div class="tagsChoise_content">
                            <div v-for="(k,v) in tagList" :key="v">
                                <h5 :id="k.ParentTagId">{{k.ParentTagName}}</h5>
                                <el-radio-group v-model="radio3[v]" size="medium">
                                    <el-radio-button :label="item.ChildTagId" :key="j" v-for="(item,j) in k.CustomerChildTag">{{item.ChildTagName}}</el-radio-button>
                                </el-radio-group>

                            </div>

                            <div class="button">
                                <el-button size="medium" type="warning" v-on:click="putOnTagsChoise">确定</el-button>
                                <el-button size="medium" v-on:click="rePutOnTags">重置</el-button>
                            </div>

                        </div>
                        <a class="toChoise" slot="reference">标签筛选<b></b></a>
                    </el-popover>
                </el-header>
                <el-main height="100%" >
                   <el-popover placement="bottom-start"
                            v-model="visible3"
                            trigger="click">
                        <div class="getTabs_content">
                           <el-checkbox-group v-model="checkList">
                              <el-checkbox label="客户名称" disabled></el-checkbox>
                              <el-checkbox :label="k.value" v-for="(k,v) in filters" :key="v"></el-checkbox>
                          </el-checkbox-group>
                          <span slot="footer" class="dialog-footer" style="background:#dedede;">
                              <!-- <el-button v-on:click="visible3 = false">取 消</el-button> -->
                              <el-button type="warning" size="medium" v-on:click="getCheckList">确 定</el-button>
                          </span>
                        </div>
                        <a class="getTabs" slot="reference"><b></b></a>
                    </el-popover>
                  <template >
                    <el-table id="customerListData" ref="multipleTable"
                              :data="listData"
                              border
                              :height="tableHeight"
                              v-on:header-click="headerClick"
                              tooltip-effect="dark"
                              v-on:row-click="rowClick"
                              v-on:selection-change="handleSelectionChange">
                        <el-table-column type="index" width="80" label=" " fixed>
                        </el-table-column>
                        <el-table-column type="selection" width="80" fixed>
                        </el-table-column>
                        <el-table-column label="客户名称" prop="CustomerName" width="138" fixed></el-table-column>
                        <template v-if="ifInIt('备注名')">
                            <el-table-column label="备注名" prop="RemarkName" width="222">
                                <template slot-scope="scope">
                                    {{scope.row.RemarkName||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('职位')">
                            <el-table-column label="职位" prop="Position" width="146">
                                <template slot-scope="scope">
                                    {{scope.row.Position||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('电话')">
                            <el-table-column label="电话" prop="Phone" width="188">
                                <template slot-scope="scope">
                                    {{scope.row.Phone||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('标签')">
                            <el-table-column label="标签" prop="TagName" width="264">
                                <template slot-scope="scope">
                                    {{scope.row.TagName||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('公司')">
                            <el-table-column label="公司" prop="Company" width="340">
                                <template slot-scope="scope">
                                    {{scope.row.Company||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('地址')">
                            <el-table-column label="地址" prop="Address" width="346">
                                <template slot-scope="scope">
                                    {{scope.row.Address||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('负责人')">
                            <el-table-column label="负责人" prop="PrincipalName" width="128">
                                <template slot-scope="scope">
                                    {{scope.row.PrincipalName||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('可见范围')">
                            <el-table-column label="可见范围" prop="VisiableIdList" width="288">
                                <template slot-scope="scope">
                                    {{scope.row.VisiableIdList||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('描述')">
                            <el-table-column label="描述" prop="Description" width="430">
                                <template slot-scope="scope">
                                    {{scope.row.Description||'-'}}
                                </template>
                            </el-table-column>
                        </template>
                        <template v-if="ifInIt('最后跟进时间')">
                            <el-table-column label="最后跟进时间" prop="FollowTime" width="288">
                                <template slot-scope="scope">
                                    {{scope.row.FollowTime}}
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>

                  </template>
                </el-main>
                <el-footer  height="50px">
                     <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[20,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
                    </el-pagination>
                </el-footer>
            </el-container>
        </el-main>

        <el-dialog id="theShade" :visible.sync="approvalShow" top="0px">
            <transition name="fade">
                <div class="TheApproval" id="TheApproval" v-if="approvalShow">
                    <el-container class="informationBox" v-if="approvalShowState==1">

                        <el-header class="titleN" height="140px">
                            <h2><img src="/images/CustomerManagement/kehu.png" /><span>{{customerInfo.CustomerName}}</span><i v-on:click="close()" class="el-icon-close"></i></h2>
                            <p><span style="margin-right: 36px;">{{customerInfo.Position}}</span><span>{{customerInfo.Phone}}</span><span style="float: right;">最后跟进时间：{{customerInfo.FollowTime}}</span></p>
                        </el-header>
                        <el-main class="inforBox"  style="height: 100%;">
                          <el-container>
                            <el-aside width='160px'>
                              <div :class="MTab==1?'act':''" @click="MTab=1">客户详情</div>
                              <div :class="MTab==2?'act':''"  @click="MTab=2">跟进记录</div>
                            </el-aside>
                            <el-main>
                              <el-container class="inforBox" v-if="MTab==1">
                                <el-header height="60px">
                                  <h4>
                                    <b></b>
                                  客户信息
                                  <el-button type="warning" size="medium" plain style="margin-left: 20px;" v-on:click="singleDelete" v-show="deleteEnable">删 除</el-button>
                                  <el-button type="warning" size="medium" plain v-on:click="toEdit">编 辑</el-button>
                                  </h4>
                                </el-header>
                                <el-main>
                                    <div class="baseInfo cellInfo">
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple"><span class="span_8a">姓名</span> {{customerInfo.CustomerName}}</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light"><span class="span_8a">备注名</span> {{customerInfo.RemarkName}}</div></el-col>

                                            <el-col :span="12"><div class="grid-content bg-purple"><span class="span_8a">电话</span> {{customerInfo.Phone}}</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light"><span class="span_8a">公&nbsp; 司</span> {{customerInfo.Company}}</div></el-col>

                                            <el-col :span="24"><div class="grid-content bg-purple"><span class="span_8a">地址</span> {{customerInfo.Address}}</div></el-col>
                                            <el-col :span="24"><div class="grid-content bg-purple-light"><span class="span_8a">位置</span> {{customerInfo.Location}}</div></el-col>
                                            <el-col :span="24"><div class="grid-content bg-purple-light"><span class="span_8a">描述</span> {{customerInfo.Description}}</div></el-col>
                                            <el-col :span="24"><div class="grid-content bg-purple-light"><span class="span_8a">标签</span>  <el-button type="warning" size="small" v-for="(k,v) in customerInfo.TagName" :key='v'>{{k.Value}}</el-button></div></el-col>
                                        </el-row>
                                    </div>
                                    <div class="thePeople cellInfo">
                                        <h4><b></b>负责人 </h4>
                                        <div class="cellInfo_people" v-for="(k,v) in customerInfo.VisiableIdList" v-if="k.IsPrincipal==0" :key='v'>
                                            <h5>{{customerInfo.PrincipalDep}}</h5>

                                            <img class="face" v-bind:src="faceUrl(k.VisibleFace,50)" />
                                            <h5>{{k.VisibleName}}</h5>
                                        </div>
                                    </div>
                                    <div class=" Visiable cellInfo">
                                        <h4><b></b>可见范围 </h4>
                                        <div class="cellInfo_people" v-for="(k,v) in customerInfo.VisiableIdList" :key='v'>

                                            <img class="face" v-bind:src="faceUrl(k.VisibleFace,50)" />

                                            <h5>{{k.VisibleName}}</h5>
                                        </div>
                                    </div>
                                </el-main>
                              </el-container>
                              <el-container class="inforBox" v-else>
                                 <el-header height="60px">
                                  <h4>  <el-button size="medium" type="warning" plain v-on:click="adder_genjin"><span class="el-icon-plus"></span> 新增跟进</el-button></h4>
                                </el-header>
                                <el-main>
                                     <discuss-cell v-for="(k,v) in FollowList" :key='v' v-bind:Tkey="k" v-on:doinit="doinit" v-on:dofollow="FollowE"></discuss-cell>
                                </el-main>
                              </el-container>
                            </el-main>
                          </el-container>
                        </el-main>
                    </el-container>

                    <div v-if="approvalShowState==3" class="edit_genji">

                        <img src="/images/CustomerManagement/new_genjin.png" alt="Alternate Text" v-if="isNewOne" />
                        <img src="/images/CustomerManagement/edit_genji.png" alt="Alternate Text" v-else />

                        <el-form ref="ruleForm" :model="ruleForm" label-width="95px" :rules="rules">
                            <el-form-item label="客    户：" class="letterSpacing_20">
                                <span>{{customerInfo.CustomerName}}</span>
                            </el-form-item>
                            <el-form-item label="跟进类型：" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
                                    <el-option label="会话沟通" :value="3"></el-option>
                                    <el-option label="网上沟通" :value="4"></el-option>
                                    <el-option label="其他" :value="5"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="跟进时间：" prop="date">
                                <el-col :span="24">
                                    <el-date-picker type="datetime" :disabled="!isNewOne" format="yyyy-MM-dd HH:mm" placeholder="请选择跟进时间" v-model="ruleForm.date" :clearable="false" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="沟通记录：" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc" :rows="8" :maxlength="500" placeholder="请输入沟通记录(限500字)"></el-input>
                            </el-form-item>
                            <el-form-item label="语 音：" class="letterSpacing_20">
                                <span>此功能暂不支持网页版，可在APP端录入</span>
                            </el-form-item>

                            <!-- <div class="file" v-if="(thisActData.Files||thisActData.Images)&&!isNewOne">
                                <p>已有文件：</p>
                                <template>
                                    <div class="file_col" v-for="(k,v) in thisActData.Files" :key='v'>

                                        <b class="fileType " v-html="fileType(k.FileName)"></b>

                                        <span class="fileName">{{k.FileName}}</span>
                                        <span class="size">{{k.Size|fileSize}}</span>

                                        <i class="handle el-icon-close" v-on:click="removeFile(k.FileIDs)"></i>
                                    </div>
                                    <div class="file_col" v-for="(k,v) in thisActData.Images" :key='v'>

                                        <img class="fileType" v-bind:src="k.URL|faceUrl(40)" />
                                        <span class="fileName">{{k.FileName}}</span>
                                        <span class="size">{{k.Size|fileSize}}</span>

                                        <i class="handle el-icon-close" v-on:click="removeImg(k.Id)"></i>
                                    </div>
                                </template>
                            </div> -->
                            <el-form-item label="上传文件：">
                                <up-load
                                    class="upload-demo"
                                    ref="upload"
                                    action=""
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :file-list="fileList"
                                    :show-list-id="false"
                                    multiple
                                    :show-file-list="true"
                                    :auto-upload="true">
                                    <el-button size="small" type="text">选择文件</el-button>
                                </up-load>
                                <span class="wrong" style="height:16px;display:inline-block;"></span>
                            </el-form-item>
                            <el-form-item class="btn_content">

                                <el-button size="medium" v-on:click="resetForm('ruleForm')">取消</el-button>
                                <el-button size="medium" type="warning" v-on:click="editSure('ruleForm')" v-if="isNewOne">确定</el-button>
                                <el-button size="medium" type="warning" v-on:click="ToEditSure('ruleForm')" v-else>确定</el-button>
                            </el-form-item>
                        </el-form>

                    </div>

                </div>
            </transition>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="promptBox" class="hardAndEasy" width="480px" top="15%">
          <el-row :gutter="24" class="paddingbottom6">
              <el-col :span="24"><div class="grid-content" style="text-align: center;">确认删除已选中客户及相关跟进记录信息？</div></el-col>
          </el-row>
          <el-row slot="footer" class="dialog-footer" style="text-align: center">
              <el-button class="" v-on:click="promptBox=false" style="margin-right:60px;">取  消</el-button>
              <el-button class="" type="warning" v-on:click="confirmDelete">确 定</el-button>
          </el-row>
      </el-dialog>
        <el-form  ref="form"  label-width="90px">
        <div class="tagcup" v-if="tagcup">
            <div>
                <h2>导入文件</h2>
                <el-form-item label="第一步"  prop="name" >
                    <span>请根据导入模板的格式整理需要导入数据</span>
                    <p @click="download">下载《客户信息导入模板》</p>
                </el-form-item>
                <el-form-item label="第一步"  prop="name" >
                    <span>请上传需要导入的文件</span>
                    <div>
                      <input class="excel"  @change="getFile" type="file" id="excel" accept=".xlsx">
                      <label for="excel" >{{filemsg}}</label>
                      <i v-if="filemsg !== '选择文件'" @click="deletefile"></i>
                    </div>

                </el-form-item>
                <div class="button-box">
                  <el-button @click="excelstart">开始导入</el-button>
                  <el-button @click="tagcup = false">取消</el-button>
                </div>
            </div>
          </div>
        </el-form>
    </el-container>
</template>

<script>
import {
  GetAllTag,
  DeleteTag,
  AddTag,
  EditTag,
  customerSearchList,
  customerDetail,
  addVisit,
  editvisit,
  followList,
  DelteCustomer,
  uploadExcel
} from '@/api/customer.js'
import { getToken } from '@/utils/auth'
import urlUtil from '@/utils/urlUtil'
import { getFileType } from '@/utils/fileType'
import { parseTime } from '@/utils/index'

import discussCell from './components/discussCell'

export default {
  components: {
    discussCell
  },
  data() {
    return {
      filemsg: '选择文件',
      excelobj: {
        Data: '',
        FileName: '',
        Category: ''
      },
      tagcup: false,
      visible3: false,
      ifAll: true,
      MTab: 1, // 客户详情:1;跟进记录：2
      ruleForm: {
        type: '',
        date: '',
        desc: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        type: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写活动形式',
          trigger: 'blur'
        }]
      },
      thisActData: {}, // 编辑跟进 数据
      FileIDs: [], // 编辑跟进 文件ids
      imgIDs: [], // 编辑跟进 图片ids

      CustomerId: '', // 客户id
      customerInfo: {}, // 客户详情
      dialogVisible: false,
      radio3: [],
      tableHeight: '100%',
      visible2: false,
      fullscreenLoading: false,
      listData: [], // 列表数据
      input: '', // 搜索数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 20, // 每页数
      searchText: '', // 搜索内容
      meetingFile: '', // 会议纪要
      basisNum: 0,
      approvalShow: false, // 弹窗状态
      approvalShowState: 0, // 0-隐藏，1-审批意见，2-同意并通过，3-同意并转交，4-拒绝
      filteredValue: [],
      activeName: '', // 客户详情Or跟踪记录
      filters: [
        {
          text: '备注名',
          value: '备注名'
        },
        {
          text: '职位',
          value: '职位'
        },
        {
          text: '电话',
          value: '电话'
        },
        {
          text: '标签',
          value: '标签'
        },
        {
          text: '公司',
          value: '公司'
        },
        {
          text: '地址',
          value: '地址'
        },
        {
          text: '负责人',
          value: '负责人'
        },
        {
          text: '可见范围',
          value: '可见范围'
        },
        {
          text: '描述',
          value: '描述'
        },
        {
          text: '最后跟进时间',
          value: '最后跟进时间'
        }
      ],
      checkList: ['职位', '电话', '标签', '公司', '负责人', '最后跟进时间'],
      checkLists: ['职位', '电话', '标签', '公司', '负责人', '最后跟进时间'],

      //* **********
      FollowList: [], // 跟踪列表
      multipleSelection: [],
      tagList: [], // 标签列表
      discussShow: false, // 评论框
      isNewOne: true, // 新建跟进true？编辑跟进false
      //* ***********
      dialogFormVisible: false,
      promptBox: false,
      ifPut: false,
      IsExcelFileSelect: false,
      ExcelFileName: '',
      isShowbtn: false,
      deleteString: '',
      deleteEnable: true, // 是否显示删除按钮
      importEnable: true, // 是否显示导入按钮
      tableList: [
        { label: '备注名', prop: 'RemarkName', width: '222' },
        { label: '职位', prop: 'Position', width: '146' },
        { label: '电话', prop: 'Phone', width: '188' },
        { label: '标签', prop: 'TagName', width: '264' },
        { label: '公司', prop: 'Company', width: '340' },
        { label: '地址', prop: 'Address', width: '346' },
        { label: '负责人', prop: 'PrincipalName', width: '128' },
        { label: '可见范围', prop: 'VisiableIdList', width: '288' },
        { label: '描述', prop: 'Description', width: '430' },
        { label: '最后跟进时间', prop: 'FollowTime', width: '288' }
      ],
      TcheckListsL: [],
      TabsValue: '2',
      // 新增跟进  文件上传及
      fileList: [],
      newAddInfo: [] // 新增跟进 上传文件
    }
  },
  mounted() {
    // this.imFile = document.getElementById('imFile')
    // this.$refs.multipleTable.doLayout() // 選中第二個

    this.init()
  },
  watch: {
    checkLists: function(data, data1) {

    },
    dialogVisible: function(v1, v2) {
      if (v1) {
        // $('thead tr').find('th:first').css('background', '#f7f7f7 url(../../images/CustomerManagement/settings_on.png)no-repeat center')
      } else {
        // $('thead tr').find('th:first').css('background', '#f7f7f7 url(../../images/CustomerManagement/settings.png)no-repeat center')
      }
    }
  },
  methods: {
    deletefile() {
      this.excelobj = {}
      this.filemsg = '选择文件'
    },
    // 上传xlsx
    upExcel() {
      this.tagcup = true
    },
    download() {
      window.location.href = 'http://192.168.10.47/' + 'bf/f/客户导入模板.xlsx'
    },
    excelstart() {
      var data = this.excelobj
      uploadExcel(data).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.init()
          this.tagcup = false
          this.excelobj = {}
        } else {
          this.$message({
            message: '请添加正确模板文件'
          })
        }
      })
    },
    getFile(e) {
      const _this = this
      var files = e.target.files[0]
      _this.excelobj.FileName = files.name
      _this.filemsg = files.name
      const reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        const str = this.result
        _this.excelobj.Data = str.substring(str.indexOf(',') + 1)
      }
      e.target.value = ''
    },
    init() {
      toGetAllTag(this)

      getList(this, this.size, this.index, '')
    },
    doinit() {
      getInfo(this, this.CustomerId)
    },

    doLayout() {

    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    },
    getFilesOrImg(type) {
      const fileList = []
      const imgList = []

      if (this.newAddInfo.length) {

      } else {
        this.newAddInfo = this.fileList
      }

      this.newAddInfo.forEach(item => {
        if (getFileType(item.name) == 'img') {
          if (item.ID == null || item.ID == '') {
            imgList.push(item.response.ID)
          } else {
            imgList.push(item.ID)
          }
        } else if (getFileType(item.name) != 'img') {
          if (item.ID == null || item.ID == '') {
            fileList.push(item.response.ID)
          } else {
            fileList.push(item.ID)
          }
        }
      })
      return (type == 'img' ? imgList : fileList).toString()
    },
    handleSuccess(response, file, fileList) {
      this.newAddInfo = fileList
    },
    handleRemove(file, fileList) {
      this.newAddInfo = fileList
    },
    removeFile(data) {
      for (var i = 0; i < this.thisActData.Files.length; i++) {
        if (data == this.thisActData.Files[i].FileIDs) {
          this.thisActData.Files.splice(i, 1)
        }
      }
    },
    removeImg(data) {
      for (var i = 0; i < this.thisActData.Images.length; i++) {
        if (data == this.thisActData.Images[i].Id) {
          this.thisActData.Images.splice(i, 1)
        }
      }
    },
    toEdit() {
      this.$router.push({
        path: '/CustomerManagement/edit',
        query: {
          code: this.CustomerId
        }
      })
    },

    showChildToParentMsg(data) {

    },
    adder_genjin() {
      this.isNewOne = true
      this.approvalShowState = 3
      this.ruleForm = {
        type: '',
        date: '',
        desc: ''
      }
    },
    editSure(formName) {
      // 新增跟踪记录
      var that = this

      var fileIDs = this.getFilesOrImg('file')
      var photoIDs = this.getFilesOrImg('img')
      var videoIDs = ''
      var customerId = this.CustomerId
      var Time = this.ruleForm.date // parseTime(this.ruleForm.date, '{y}-{m}-{d} {h}:{m}')

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var Data = {
            PhotoIds: photoIDs,
            VoiceIds: videoIDs,
            FileIds: fileIDs,
            Content: this.ruleForm.desc,
            FollowTime: Time,
            Status: this.ruleForm.type,
            CustomerId: customerId,
            Longitude: '',
            Latitude: '',
            Location: ''
          }
          console.log(Data)
          addVisit(Data).then(res => {
            const data = res.data
            // console.log(data)
            if (data.Successful) {
              that.$message({
                message: '新增跟进成功',
                type: 'success'
              })
              getInfo(that, that.CustomerId)
              that.approvalShowState = 1
              that.TabsValue = '2'

              // getList(that.size, that.index, that.radio3)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ToEditSure(formName) {
      // 编辑跟踪记录
      var file = [],
        photo = []
      var fileIDs = this.getFilesOrImg('file')
      var photoIDs = this.getFilesOrImg('img')
      var videoIDs = ''
      // if (this.thisActData.Files) {
      //   for (let i = 0; i < this.thisActData.Files.length; i++) {
      //     file.push(this.thisActData.Files[i].FileIDs)
      //   }
      // }
      // if (this.thisActData.Images) {
      //   for (let i = 0; i < this.thisActData.Images.length; i++) {
      //     photo.push(this.thisActData.Images[i].Id)
      //   }
      // }
      var VisitId = this.thisActData.VisitId
      var that = this

      var customerId = this.CustomerId
      var Time = this.ruleForm.date

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var Data = {
            PhotoIds: photoIDs,
            VoiceIds: videoIDs,
            FileIds: fileIDs,
            Content: this.ruleForm.desc,
            FollowTime: Time,
            Status: this.ruleForm.type,
            CustomerId: customerId,
            Longitude: '',
            Latitude: '',
            Location: ''
          }
          console.log(VisitId, Data)
          editvisit(VisitId, Data).then(res => {
            const data = res.data
            console.log(data)
            if (data.Successful || data.successful) {
              getInfo(that, that.CustomerId)
              that.approvalShowState = 1
              that.TabsValue = '2'
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // deleteCustomer(CustomerId) {
    //   var that = this
    //   this.$confirm('确认删除选中客户？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     confirmButtonClass: 'el-button btn btn-warning el-button--warning el-button--smallWarning',
    //     cancelButtonClass: '',
    //     customClass: 'deleteEbtn'
    //   }).then(() => {
    //     that.confirmDelete()
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.approvalShowState = 1
      // this.activeName ='跟踪记录'
    },
    ifInIt(data) {
      if (this.checkList.indexOf(data) >= 0) {
        return true
      } else {
        return false
      }
    },
    refresh() {
      getList(this.size, this.index, this.radio3)
    },
    putOnTagsChoise() {
      // getList(this.size, this.index, this.radio3)
      this.visible2 = false
    },
    rePutOnTags() {
      this.radio3 = []
      // getList(this.size, this.index, this.radio3)
    },
    getCheckList() {
      this.visible3 = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //* *********批量删除
    batchDelete() {
      var customerArr = this.multipleSelection
      if (customerArr.length > 0) {
        // console.log(customerArr);
        this.promptBox = true
        var customerArrId = []
        for (var i = 0; i < customerArr.length; i++) {
          customerArrId.push(customerArr[i].CustomerId)
        }
        this.deleteString = customerArrId.toString()
      }
    },
    //* *********单个删除
    singleDelete() {
      //  console.log(this.CustomerId);
      this.promptBox = true
      this.deleteString = this.CustomerId
    },
    //* *******删除
    confirmDelete() {
      // console.log(this.deleteString)
      var app = this
      var deleteIds = this.deleteString
      console.log(deleteIds)
      DelteCustomer(deleteIds).then(res => {
        const data = res.data
        console.log(data)
        if (data.Successful || data.successful) {
          app.promptBox = false
          app.$message({
            message: '提交成功',
            type: 'success',
            onClose: function() {
              // 页面跳转：
              app.init()
            }
          })
        } else {
          app.promptBox = false
          app.$message.error(data.Message)
        }
      })
      // $.ajax({
      //   url: '../apix/v2/customerManage/DelteCustomer?customerid=' + deleteIds,
      //   type: 'POST',
      //   beforeSend: function(request) {
      //     request.setRequestHeader('ClientType', 1)
      //   },
      //   contenttype: 'application/json',
      //   success: function(data) {
      //     console.log(data)

      //     if (data.Successful) {
      //       app.promptBox = false
      //       app.$message({
      //         message: '提交成功',
      //         type: 'success',
      //         onClose: function() {
      //           // 页面跳转：
      //           window.location.href = '/CustomerManagement/Index'
      //           window.location.target = 'mainframe'
      //         }
      //       })
      //     } else {
      //       app.promptBox = false
      //       app.$message.error(data.Message)
      //     }
      //   }
      // })
    },
    //* **************
    toContent: function(val) {

    },
    rowClick(row, event, column) {
      // 客户详情
      // console.info(row, event, column)
      // console.log(column.label=='客户名称')
      if (column.type == 'selection') {

      } else {
        // if (column.label == '客户名称') {
        this.CustomerId = row.CustomerId

        getInfo(this, row.CustomerId)

        this.approvalShowState = 1
        this.approvalShow = !this.approvalShow
        // }
      }
    },
    headerClick(column, event) {
      if (column.id == 'el-table_1_column_1') {
        // this.checkList = []
        // for (var i = 0; i < this.checkLists.length; i++) {
        //    this.checkList.push(this.checkLists[i])
        // }
        this.dialogVisible = true
      }
    },
    GetTime: function(inTime) {
      if (inTime) {
        var Time = parseInt(inTime.split('(')[1].split(')')[0])

        if (new Date(Time).getHours() < 10) {
          var hours = '0' + new Date(Time).getHours()
        } else {
          hours = new Date(Time).getHours()
        }
        if (new Date(Time).getMinutes() < 10) {
          var minutes = '0' + new Date(Time).getMinutes()
        } else {
          minutes = new Date(Time).getMinutes()
        }
        if (new Date(Time).getSeconds() < 10) {
          var seconds = '0' + new Date(Time).getSeconds()
        } else {
          seconds = new Date(Time).getSeconds()
        }
        var theMonth = parseInt(new Date(Time).getMonth()) + 1
        var theDate = new Date(Time).getDate()
        if (theMonth < 10) {
          theMonth = '0' + theMonth
        }
        if (theDate < 10) {
          theDate = '0' + theDate
        }
        var FTime = new Date(Time).getFullYear() + '-' + theMonth + '-' + theDate + ' ' + hours + ':' + minutes
      }
      return FTime
    },

    close: function() {
      this.approvalShow = false
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1

      getList(this.size, this.index, this.radio3)
    },
    handleCurrentChange(val) {
      // /翻页
      this.index = val
      getList(this, this.size, this.index, this.radio3)
    },
    toSearch: function() {
      // 搜索
      this.searchText = this.input
      if (this.searchText !== '') {
        getList(this, this.size, this.index, this.radio3, this.searchText)
      } else {
        getList(this, this.size, this.index, this.radio3, '')
      }
    },
    FollowE(data, date) {
      // console.log(data, date)
      this.approvalShowState = 3
      this.isNewOne = false

      this.ruleForm = {
        type: data.Status,
        date: new Date(date),
        desc: data.Content
      }
      this.FileIDs = []
      this.imgIDs = []
      if (data.Files) {
        for (let i = 0; i < data.Files.length; i++) {
          this.FileIDs.push(data.Files[i].FileIDs)
        }
      }
      if (data.Images) {
        for (let i = 0; i < data.Images.length; i++) {
          this.imgIDs.push(data.Images[i].Id)
        }
      }

      this.thisActData = data
    },

    toOpen: function() {
      // 点击导入按钮
      this.dialogFormVisible = true
    },
    importFile: function() {
      // 导入excel
      this.ifPut = true
      this.fullscreenLoading = true
      const obj = this.imFile
      if (!obj.files) {
        this.fullscreenLoading = false
        return
      }
      var f = obj.files[0]
      var reader = new FileReader()
      const $t = this
      reader.onload = function(e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        const json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        // console.log(typeof json)

        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    analyzeData: function(data) {
      // 此处可以解析导入数据
      return data
    },
    dealFile: function(data) {
      // 处理导入的数据
      const $t = this
      // console.log(data)
      $t.imFile.value = ''
      $t.fullscreenLoading = false
      if (data.length <= 0) {
        $t.$message({
          message: '请导入正确信息',
          type: 'warning',
          onClose: function() {
            $t.isShowbtn = false
            $t.ifPut = false
          }
        })
        // this.errorDialog = true;
        // this.errorMsg = "请导入正确信息";
      } else {
        // this.datalist = data
        // console.log(data);
        $t.tosubmit(data)
      }
    },
    downloadTemplet() {
      window.location.href = apiurl + 'bf/f/客户导入模板.xlsx'
    },

    selectFile: function() { // 选择文件
      const selectfile = this.imFile

      selectfile.click()
      selectfile.addEventListener('change', function(e) {
        // console.log(e);
        app.isShowbtn = true
        app.IsExcelFileSelect = true
        app.ExcelFileName = e.target.files[0].name
      })
    },
    unselectFile: function() {
      this.IsExcelFileSelect = false
      app.isShowbtn = false
    },

    tosubmit: function(data) {
      const $t = this

      const arr = $t.split_array(data, 100)
      arr.forEach(v => {
        // console.log(v)
        $.ajax({
          url: '/CustomerManagement/importcus',
          data: { model: v },
          beforeSend: function(request) {
            request.setRequestHeader('ClientType', 1)
          },
          type: 'Post',
          success: function(data) {
            // console.log(data)
            if (data.successful) {
              $t.isShowbtn = false
              $t.ifPut = false
              $t.dialogFormVisible = false
            } else {
              $t.$message({
                message: data.Message,
                type: 'warning',
                onClose: function() {
                  $t.isShowbtn = false
                  $t.ifPut = false
                }
              })
            }
          },
          error: function() {
            $t.$message({
              message: '请导入正确信息',
              type: 'warning',
              onClose: function() {
                $t.isShowbtn = false
                $t.ifPut = false
              }
            })
          }
        }).then(function() {
          getList(25, 1, '')
        })
      })
    },

    split_array(arr, len) {
      const a_len = arr.length
      const result = []
      for (var i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  }

}

const getInfo = (app, id) => {
  customerDetail(id).then(res => {
    const data = res.data
    // console.log(data)
    app.customerInfo = data.Data
  })

  followList(id).then(res => {
    const data = res.data
    console.log('跟蹤列表data')
    console.log(data)

    app.FollowList = data.Data.Records
  })
}

// 客户列表
const getList = (app, size, index, tags, text) => {
  app.listData = []
  var Ttags = tags.toString()
  app.fullscreenLoading = true
  var keyWord
  if (text) {
    keyWord = text
  } else {
    keyWord = ''
  }
  return new Promise(function(resolve, reject) {
    customerSearchList(keyWord, Ttags, index, size).then(res => {
      const data = res.data
      console.log(data)
      if (data.Successful) {
        app.fullscreenLoading = false
        app.listData = data.Data.Records
        app.totalCount = data.Data.TotalCount || 0
        resolve(true)
      }
    })
  })
}

// 获取所有标签列表：
const toGetAllTag = (app) => {
  return new Promise(function(resolve, reject) {
    GetAllTag().then(res => {
      const data = res.data
      app.tagList = data.Data
      resolve(true)
    })
  })
}

</script>

<style lang="scss" scoped>
.temlateMain{
    .el-header{
        .header-right{
            float: right;
            .tools_search{
                width: 310px;
                height: 30px;
                float: left;
            }
            .el-button{
                margin-left: 20px;
            }
        }
    }
    .el-main{
        height: 100%;
        padding: 0;
        .el-container{
            height: 100%;
            .el-header{
                border-bottom: none;
                .toChoise{
                  font-size: 16px;
                    b{
                        display:inline-block;
                        width: 18px;
                        height: 14px;
                        margin: -1px 10px;
                        background: url(/images/CustomerManagement/shaixuan_unselected.png)no-repeat center
                    }
                    &:hover{
                        color: #f99740;
                        b{
                        background: url(/images/CustomerManagement/shaixuan_selected.png)no-repeat center
                        }
                    }
                }

            }
            .el-main{
              position: relative;
              .getTabs{
                height: 60px;
                width: 80px;
                display: block;
                background:url(/images/CustomerManagement/settings.png) center center no-repeat rgb(247, 247, 247);
                position: absolute;
                top: 0;
                z-index: 20
              }
              #theShade{
                .el-dialog__header{
                  display: none;
                }
              }

            }
        }
    }
}
.tagsChoise_content{
  .button{
    margin: 20px 0 10px;
    text-align: center;
    button{
      margin:0 20px ;
    }
  }
}
.getTabs_content{
  .el-checkbox{
    display: block;
    margin: 20px;
  }
}

.tagcup {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2000;
    &>div {
        width: 500px;
        margin: 18vh auto;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        font-size: 16px;
    }
    h2 {
      padding-left: 20px;
      margin: 0 0 20px;
      line-height: 53px;
      background: #EFEFEF;
    }
    p {
      cursor: pointer;
      color: #f99740;
    }
    i {
      display: inline-block;
      vertical-align: text-top;
      margin-left: 10px;
      width: 20px;
      height: 20px;
      background: no-repeat url(../../assets/meeting/sprite.png) 0 0/100%;
      cursor: pointer;
    }
    label {
      color: #f99740;
    }
    .button-box {
        display: flex;
        justify-content: space-around;
        padding: 20px;
    }
}
.excel {
  display: none;
}
</style>

