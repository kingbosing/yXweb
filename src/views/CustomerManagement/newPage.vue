<template>
      <el-container class="temlateMain"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item><router-link to="/CustomerManagement/index"><span>客户管理</span></router-link></el-breadcrumb-item>
                <el-breadcrumb-item><span>新建客户</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-container>
                <el-header class="formTetle">
                    <div class="imgHead"></div>
                    <span>新建客户</span>
                </el-header>
                <el-main>
                    <el-form :model="updata" :rules="rulesTomain" ref="ruleFormMain" label-width="100px" class="ruleForm">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名：" prop="CustomerName">
                                    <el-input v-model="updata.CustomerName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="备注名：" prop="RemarkName">
                                    <el-input v-model="updata.RemarkName"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="12">
                                <el-form-item label="电话：" prop="Phone">
                                    <el-input v-model="updata.Phone"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="公司：" prop="Company">
                                    <el-input v-model="updata.Company"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="12">
                                <el-form-item label="职位：" prop="Position">
                                    <el-input v-model="updata.Position"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="地址：" prop="Cddress">
                                    <el-input v-model="updata.Address"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="12">
                                <el-form-item label="位置：" prop="Address">
                                    <el-input v-model="updata.Location" @focus="mapSite=true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="描述：" prop="Description">
                            <el-input v-model="updata.Description"></el-input>
                        </el-form-item>
                        <el-form-item label="标签：">
                            <ul class="tag-box">
                                <li v-for="(item,key) in alltag" :key="key">
                                  <span>{{item.ParentTagName}}</span>
                                  <span v-for="(tag,index) in item.CustomerChildTag" :key="index" class="tagbutton" :class="resultList[key] === index ? 'pitchon' : 'nopitchon'"  @click="tagname(key,index,tag.ChildTagId)">{{tag.ChildTagName}}</span>
                                  <el-button type="text" class="operate" @click="addtagbutton(item.ParentTagId,item.ParentTagName,item.CustomerChildTag)">编辑</el-button>
                                  <el-button type="text" class="operate" @click="deletetag(item.ParentTagId,key)">删除</el-button>
                                </li>
                            </ul>
                            <span class="addtagbutton" @click="addtagbutton">+新增标签</span>
                        </el-form-item>
                         <el-form-item label="负责人：" >
                              <div class="principal" @click="choicebox(1)">
                                <span>{{principalobj.DeptName}}</span>
                                <img :src="principalobj.FaceURL" alt="图片">
                                <span class="principalname">{{principalobj.Name}}</span>
                              </div>
                        </el-form-item>
                         <el-form-item label="可见范围：" >
                              <div class="principal" @click="choicebox(2)">
                                  <span class="principalhead">选取可见范围</span>
                                  <img :src="boss.FaceURL" alt="图片">
                                  <span class="principalname">{{boss.Name}}</span>
                              </div>
                              <div class="principal visible" v-for="(item,key) in visiblepeoples" :key="key">
                                   <i @click="deletevisible(key)"></i>
                                  <img :src="item.FaceURL" alt="图片">
                                  <span class="principalname">{{item.Name}}</span>
                              </div>
                        </el-form-item>
                        <p style="text-align: center;"><el-button type="warning" class="btn btn-warning" size="small" v-on:click="submit()" :loading="ifSum">保 存</el-button></p>

                    </el-form>
                </el-main>
            </el-container>
        </el-main>

        <el-dialog title="添加位置" :visible.sync="mapSite" class="hardAndEasy" width="480px" top="15%">
            <div  id="mapPart" style="height: 500px;">
                <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
                    <el-amap-marker v-for="(marker,v) in markers" :position="marker" :key="v" ></el-amap-marker>
                </el-amap>
            </div>
          <el-row slot="footer" class="dialog-footer" style="text-align: center">
              <el-button class="" v-on:click="mapSite=false" style="margin-right:60px;">取  消</el-button>
              <el-button class="" type="warning" @click="addplace" >确 定</el-button>
          </el-row>
        </el-dialog>
        <el-form  ref="form" :model="data1" :rules="tagrules"  label-width="90px">
          <div class="tagcup" v-if="tagcup">
            <div>
                <h2>新增标签</h2>
                <div class="addtag-box">
                  <el-form-item label="标签名称:"  prop="name" >
                      <el-input v-model="data1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="选项名称:" >
                      <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else   class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    <span class="hint" v-if="hint" >请正确添加标签</span>
                    <p>提示：至少需要添加1个选项，最多不超过18个选项</p>
                  </el-form-item>
                </div>
                <div class="cupfooter">
                  <el-button @click="tagcup = false">取消</el-button>
                  <el-button @click="savetag">保存</el-button>
                </div>
            </div>
          </div>
        </el-form>
        <div class="choice-box" v-if="choicecup">
           <div>
               <p>{{principalmsg}}</p>
              <div class="choice">
                 <div>
                   <h3>可选部门</h3>
                   <div class="people" >
                     <el-tree  :highlight-current="true" :default-expand-all="true" :data="branch" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false"></el-tree>
                   </div>
                 </div>
                 <div>
                   <h3>可选人员</h3>
                   <div>
                      <el-tree  v-if="singular == 1"
                       ref="tree"
                       :highlight-current="true"
                       :data="people"
                       :props="peopledefaultProps"
                       @node-click="peoplehandleNodeClick"
                       :empty-text= "''"
                       node-key="ProfileId"
                       :check-on-click-node="true">
                       </el-tree>
                       <el-tree  v-if="singular == 2"
                       ref="tree"
                       :highlight-current="true"
                       :data="people"
                       :props="peopledefaultProps"
                       @node-click="checkhandleNodeClick"
                       :empty-text= "''"
                       node-key="ProfileId"
                       show-checkbox
                       :default-checked-keys="keylist"
                       :check-on-click-node="true">
                       </el-tree>
                   </div>
                 </div>
                 <div>
                   <h3>已选择</h3>
                   <div>
                     <ul>
                        <li v-if="singular == 1">{{principal.listName}}</li>
                        <li v-else v-for="(item,key) in peoples" :key="key">
                          <span>{{item.Name}}</span>
                          <img src="../../assets/meeting/sprite.png" alt="删除" @click="deletepeoples(key)">
                        </li>
                     </ul>
                   </div>
                 </div>
              </div>
              <el-button @click="addpeople">确定</el-button>
              <el-button @click="canceladd">取消</el-button>
           </div>
        </div>
    </el-container>
</template>

<script>
import {
  GetAllTag,
  DelteCustomer,
  tag_Add,
  tag_Edit,
  tag_Del,
  employee4PC,
  addCustomer,
  customerDetail,
  editCustomer
} from '@/api/customer.js'
import { getToken } from '@/utils/auth'
import urlUtil from '@/utils/urlUtil'
import { getFileType } from '@/utils/fileType'
import { parseTime } from '@/utils/index'
import { validateTel } from '@/utils/validate'
import { globalvariable } from '@/utils/globalvariable'
import { getStringFormat } from '@/utils/StringFormat'

export default {
  components: {

  },
  data() {
    const getValidateTel = (rule, value, callback) => {
      if (validateTel(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的电话号码！'))
      }
    }
    return {
      judge: null,
      principalmsg: '',
      hint: false,
      vipid: '',
      deletekey: '',
      Locationobj: {
        longitude: '',
        latitude: '',
        location: ''
      },
      visiblepeoples: [], // 显示的可见人数组
      updata: {
        CustomerName: '',
        RemarkName: '',
        Phone: '',
        Company: '',
        Position: '',
        Address: '',
        Location: '',
        Description: '',
        Longitude: '',
        Latitude: '',
        Tags: '',
        PrincipalId: '',
        VisibleIds: '',
        FounderId: ''
      }, // 上传的总参数
      principalobj: {}, // 负责人
      boss: {}, // 默认人
      principalface: '', // 负责人头像
      urlhead: '',
      keylist: [], // 多选已选中的
      peoples: [], // 多选出来的范围可见人
      singular: null,
      choicecup: false,
      principalId: '',
      principal: {}, // 负责人的时候 选出的人
      branch: [], // 部门
      people: [], // 员工
      peopledefaultProps: {
        label: 'Name'
      },
      defaultProps: { // 部门的key
        label: 'Name',
        children: 'Childrens'
      },
      tagrules: {
        name: [
          { required: true, message: '请输入标签名', trigger: 'blur' }
        ]
      },
      tagID: [],
      resultList: [], // class 添加样式的数组  依据判断
      tagid: '', // 选中的TAG  ID
      dynamicTags: [], // ui插件的标签数组
      inputVisible: false,
      inputValue: '',
      data1: {
        name: ''
      }, // form 编辑标签的验证
      tagcup: false, // 编辑标签弹窗
      alltag: [], // 所有标签
      markers: [
        [121.59996, 31.197646]
      ],
      searchOption: {
        city: '杭州',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      rulesTomain: {
        CustomerName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur', validator: getValidateTel }
        ]
      },
      listId: '', // 标签ID
      listData: '', // 列表数据
      fullscreenLoading: false, // 加载效果状态值
      SetDifficultyPage: true,
      WorkCategoryPage: true,
      JobCategoryPage: true,
      JobContentPage: true,
      creator: false, // 创建者
      tagList: '', // 全部标签
      // 搜索地址
      searchSite: '',
      searchlongitude: '',
      searchlatitude: '',
      // 添加标签
      parentTagId: '', // 父标签Id
      parentTagName: '', // 父标签Name
      tagStr: '', // 子标签列表
      tagStrArray: [], // 子标签数组

      ruleForm: {
        customerName: '',
        remarkName: '',
        phone: '',
        company: '',
        position: '',
        address: '',
        location: '',
        description: ''
      },
      // 新建、编辑表单
      cusMId: '',
      customerName: '',
      remarkName: '',
      phone: '',
      company: '',
      position: '',
      address: '',
      longitude: '',

      description: '',
      tags: '',

      visibleIds: '',
      founderId: '',
      //* **********

      // 弹窗表
      dialogFormVisible: false,
      operation: false,
      mapSite: false,
      formLabelWidth: '100',
      form: {
        name: '',
        describe: '',
        optionName: ''
      },
      rules: {
        describe: [
          { required: true, message: '至少添加1个选项名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]

      },
      ifPut: false,
      ifSum: false
    }
  },
  mounted() {
    this.change()
  },
  methods: {

    tagname(key, index, id) {
      // console.log(this.resultList)
      if (this.resultList[key] === null || this.resultList[key] !== index) {
        this.resultList.splice(key, 1, index)
      } else {
        this.resultList.splice(key, 1, null)
      }
    },
    change() {
      this.urlhead = globalvariable().imgapiurl // 图片显示域名
      this.branch = JSON.parse(sessionStorage.getItem('departmentsList'))
      var list = JSON.parse(sessionStorage.getItem('EmployeesList'))
      this.boss.Name = list[0].Childrens[0].Name
      this.boss.ProfileId = list[0].Childrens[0].ItemId
      this.boss.FaceURL = getStringFormat(this.urlhead + list[0].Childrens[0].HeadUrl, [50, 50, 'm'])
      this.boss.DeptName = list[0].Childrens[0].DeptName
      this.updata.FounderId = this.boss.ProfileId
      this.updata.PrincipalId = this.boss.ProfileId
      GetAllTag().then(res => { // 获取所有标签
        // console.log(res)
        if (res.data.Successful) {
          if (res.data.Data.length < 0) {
            this.alltag = ''
          } else {
            this.alltag = res.data.Data
          }
          // console.log(this.alltag)
          if (this.$route.query.code) {
            var code = this.$route.query.code
            customerDetail(code).then(res => {
              // console.log(res)
              if (res.data.Successful) {
                var data = res.data.Data
                var arr = this.alltag
                var tagid = []
                for (let i = 0; i < data.TagName.length; i++) {
                  tagid.push(data.TagName[i].Key)
                }
                // console.log(tagid)
                for (let i = 0; i < arr.length; i++) {
                  for (let j = 0; j < arr[i].CustomerChildTag.length; j++) {
                    for (let k = 0; k < tagid.length; k++) {
                      if (arr[i].CustomerChildTag[j].ChildTagId == tagid[k]) {
                        this.resultList.splice(i, 1, j)
                      }
                    }
                  }
                }
                if (data.ChargeFaceUrl == null) {
                  this.principalobj = Object.assign({}, this.boss)
                } else {
                  this.principalobj.DeptName = data.PrincipalDep
                  this.principalobj.FaceURL = getStringFormat(this.urlhead + data.ChargeFaceUrl, [50, 50, 'm'])
                  this.principalobj.Name = data.PrincipalName
                }
                this.vipid = data.VisiableIdList[0].VisibleId
                data.VisiableIdList.splice(0, 1)
                if (data.VisiableIdList.length > 0) {
                  for (let i = 0; i < data.VisiableIdList.length; i++) {
                    this.visiblepeoples.push({
                      Name: data.VisiableIdList[i].VisibleName,
                      FaceURL: getStringFormat(this.urlhead + data.VisiableIdList[i].VisibleFace, [50, 50, 'm']),
                      ProfileId: data.VisiableIdList[i].VisibleId
                    })
                    this.peoples.push({
                      Name: data.VisiableIdList[i].VisibleName,
                      FaceURL: getStringFormat(this.urlhead + data.VisiableIdList[i].VisibleFace, [50, 50, 'm']),
                      ProfileId: data.VisiableIdList[i].VisibleId
                    })
                    this.keylist.push(data.VisiableIdList[i].VisibleId)
                  }
                }
                this.updata = data
              }
            })
          } else {
            this.principalobj = Object.assign({}, this.boss)
          }
        }
      })
    },
    canceladd() { // 范围人弹窗取消按钮
      if (this.singular == 2) {
        if (this.judge == 1) {
          this.peoples = []
          this.keylist = []
          this.judge = null
        }
      }
      this.choicecup = false
    },
    addpeople() { // 编辑负责人或添加范围人   确认按钮
      if (this.singular == 1) { // 则是负责人
        this.principalobj = this.principal
        this.updata.PrincipalId = this.principal.ProfileId
      } else { // 则是添加可见范围人
        this.visiblepeoples = [].concat(JSON.parse(JSON.stringify(this.peoples)))
      }
      this.choicecup = false
    },
    deletevisible(key) { // 外部删除范围可见人按钮
      this.visiblepeoples.splice(key, 1)
      this.peoples.splice(key, 1)
      this.keylist.splice(key, 1)
    },
    choicebox(e) {
      this.choicecup = true
      this.principal = {}
      this.people = []
      if (this.peoples.length == 0) {
        this.judge = 1
      }
      if (e == 1) { // 则是负责人
        this.principalmsg = '选择负责人'
        this.singular = e
      } else { // 则是可见范围人
        this.principalmsg = '选择可见范围'
        this.singular = e
      }
    },
    handleNodeClick(val) { // 所有部门  获取员工
      const that = this
      var id = val.ItemId
      employee4PC(id).then(res => {
        // console.log(res)
        var data = res.data.Data
        that.people = []
        for (let i = 0; i < data.length; i++) {
          that.people.push({
            listName: data[i].EmployeeName + '-' + data[i].Jobs[0].JobName,
            ProfileId: data[i].ProfileId,
            Name: data[i].EmployeeName,
            FaceURL: getStringFormat(this.urlhead + data[i].FaceURL, [50, 50, 'm']),
            DeptName: data[i].Jobs[0].DepartmentName
          })
          if (that.people[i].DeptName == '') { // 如果是选择默认用户 部门会消失  在这添加上
            that.people[i].DeptName = that.boss.DeptName
          }
          if (data[i].ProfileId == that.boss.ProfileId && that.singular == 2) { // 不能添加默认的总经理
            that.people[i].disabled = true
          }
        }
      })
    },
    deletepeoples(key) { // 内部删除范围人
      this.keylist.splice(key, 1)
      this.peoples.splice(key, 1)
      this.$refs.tree.setCheckedKeys(this.keylist)
    },
    checkhandleNodeClick(item, node, self) { // 弹窗里范围人添加
      if (item.ProfileId == this.boss.ProfileId) { // 判断是否是不可操作的人
        return
      }
      // console.log(item)
      var j = null
      for (let i = 0; i < this.keylist.length; i++) { // 判断是否有重复 重复删除 否则添加
        if (item.ProfileId == this.peoples[i].ProfileId) {
          j = i
        }
      }
      if (j !== null) {
        this.keylist.splice(j, 1)
        this.peoples.splice(j, 1)
      } else {
        this.keylist.push(item.ProfileId)
        this.peoples.push(item)
      }
    },
    peoplehandleNodeClick(item, node, self) { // 部门内所有员工   添加员工   单选负责人
      // console.log(item)
      this.principal = item
    },

    deletetag(id, key) { // 删除标签
      this.$confirm('删除后当前选择标签不会添加', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tag_Del(id).then(res => {
          // console.log(res)
          if (res.data.Successful) {
            this.deletekey = key
            this.getalltags()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getalltags() {
      GetAllTag().then(res => { // 获取所有标签
        // console.log(res)
        if (res.data.Data.length < 0) {
          this.alltag = ''
        } else {
          if (this.resultList.length == []) {
            for (let i = 0; i < res.data.Data.length; i++) {
              this.resultList.push(null)
            }
          } else if (this.resultList.length < res.data.Data.length) {
            this.resultList.push(null)
          } else {
            this.resultList.splice(this.deletekey, 1)
          }
          this.alltag = res.data.Data
        }

        // console.log(this.alltag)
      })
    },
    savetag() { // 保存新增或编辑标签更改
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dynamicTags.length > 0) {
            var dynamicTags = this.dynamicTags.join(',')
            var name = this.data1.name
            this.hint = false
            if (this.tagid == '') {
              tag_Add(name, dynamicTags).then(res => {
                // console.log(res)
                if (res.data.Successful) {
                  this.getalltags()
                  this.tagcup = false
                }
              })
            } else {
              var id = this.tagid
              tag_Edit(id, name, dynamicTags).then(res => {
                // console.log(res)
                if (res.data.Successful) {
                  this.getalltags()
                  this.tagcup = false
                }
              })
            }
          } else {
            this.hint = true
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addplace() {
      this.updata.Longitude = this.Locationobj.longitude
      this.updata.Latitude = this.Locationobj.latitude
      this.updata.Location = this.Locationobj.name
      this.mapSite = false
      // console.log(this.updata)
    },
    addtagbutton(id, name, arr) {
      this.tagcup = true
      this.dynamicTags = []
      this.tagid = ''
      this.data1.name = ''
      if (id && name && arr) {
        this.tagid = id
        this.data1.name = name
        for (let i = 0; i < arr.length; i++) {
          this.dynamicTags.push(arr[i].ChildTagName)
        }
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      if (this.dynamicTags.length == 18) {
        return
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (inputValue == this.dynamicTags[i]) {
            this.$message({
              message: '请不要添加重复标签'
            })
            return
          }
        }
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    addMarker: function() {
      this.markers = []
      const lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      const lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    onSearchResult(pois) {
      this.Locationobj.longitude = pois[0].lng
      this.Locationobj.latitude = pois[0].lat
      this.Locationobj.name = pois[0].name
      // console.log(pois[0])
      this.markers = []
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },

    map() {
    //   const map = new AMap.Map(this.$refs.allmap)
    //   map.centerAndZoom('杭州', 12) // 初始化地图,设置城市和地图级别。
    },
    AddItem: function() { // 添加选项
      if ($('.optionList span').length < 18) {
        if (this.form.optionName != '') {
          $('.optionList').append('<span class="redundant">' + this.form.optionName + '<i></i></span>')
          this.form.describe = this.form.optionName // 方便做判断
          this.form.optionName = ''
        }
      }
    },
    emptyBtn: function() {
      $('.redundant').remove()
      app.tagStrArray = []
      this.form.describe = ''
    },
    toOpen: function(data, listName, tagArr) { // 点击编辑或添加按钮：
      console.log(data, listName, tagArr)
      app.listId = data
      $('.redundant').remove()
      this.dialogFormVisible = true
      if (data != '') { // 编辑
        $('.hardAndEasy .el-dialog__title').html('编辑标签')
        app.form.name = listName
        app.tagStrArray = tagArr
        this.form.describe = tagArr[0].ChildTagName// 方便验证
      } else { // 新建
        app.form.name = ''
        app.tagStrArray = []
        this.form.describe = ''// 方便验证
        $('.hardAndEasy .el-dialog__title').html('新增标签')
      }
    },
    disableFun: function(data) { // 禁用
      this.operation = true
      app.listId = data
    },
    onchange: function() {
      app.ifPut = true
      var Data = {
        parentTagId: app.listId
      }
      $.ajax({
        url: '/CustomerManagement/DeleteTag',
        data: Data,
        type: 'POST',
        beforeSend: function(request) {
          request.setRequestHeader('ClientType', 1)
        },
        success: function(data) {
          if (data.successful) {
            app.$message({
              message: '删除成功',
              type: 'success',
              onClose: function() {
                app.ifPut = false
                app.operation = false
                // 列表：
                GetAllTag()
                $('.addLabel').css('display', 'block')
              }
            })
          } else {
            app.$message.error(data.Message)
            app.ifPut = false
          }
        }

      })
    },
    startUsing: function() {

    },
    addMap: function() { // 地图定位选中
      if ($('#suggestId').val().trim() != '') {
        app.longitude = app.searchlongitude
        app.latitude = app.searchlatitude
        app.location = app.searchSite
      }
    },
    // 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      app.tagStrArray = []
      this.dialogFormVisible = false
    },
    submitForm(formName) { // 添加、编辑标签提交
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.ifPut = true
          // 获取子级
          var TagStrArr = [], tagStr
          for (var i = 0; i < $('.optionList span').length; i++) {
            TagStrArr.push($('.optionList span')[i].innerText)
          }

          tagStr = TagStrArr.toString()
          // console.log(tagStr);
          if (app.listId == '') { // 新建
            var newData = {
              ParentTagName: this.form.name,
              TagStr: tagStr
            }
            // console.log(newData);
            $.ajax({
              url: '/CustomerManagement/AddTag',
              data: newData,
              type: 'POST',
              beforeSend: function(request) {
                request.setRequestHeader('ClientType', 1)
              },
              success: function(data) {
                // console.log(data);
                if (data.successful) {
                  app.$message({
                    message: '提交成功',
                    type: 'success',
                    onClose: function() {
                      that.ifPut = false
                      that.dialogFormVisible = false
                      that.$refs[formName].resetFields()
                      // 列表：
                      GetAllTag()
                      // 清空表单
                      app.tagStrArray = []

                      // 标签不能超过18个
                      if ($('.labelBox li').length == 18) {
                        $('.addLabel').css('display', 'none')
                      }
                    }
                  })
                } else {
                  app.$message.error(data.Message)
                  that.ifPut = false
                }
              }
            })
          } else { // 编辑
            var editorData = {
              ParentTagId: app.listId,
              ParentTagName: this.form.name,
              TagStr: tagStr
            }
            // console.log(editorData)
            $.ajax({
              url: '/CustomerManagement/EditTag',
              data: editorData,
              type: 'POST',
              beforeSend: function(request) {
                request.setRequestHeader('ClientType', 1)
              },
              success: function(data) {
                // console.log(data)
                if (data.successful) {
                  app.$message({
                    message: '编辑成功',
                    type: 'success',
                    onClose: function() {
                      that.ifPut = false
                      that.dialogFormVisible = false
                      that.$refs[formName].resetFields()
                      // 标签列表：
                      GetAllTag()
                      // 清空表单
                      app.tagStrArray = []
                      // $(".optionList").html("");
                    }
                  })
                } else {
                  app.$message.error(data.Message)
                  that.ifPut = false
                }
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit: function() {
      // ruleFormMain
      this.$refs['ruleFormMain'].validate((valid) => {
        if (valid) {
          this.tagID = []
          var arr = this.resultList
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
              this.tagID.push(this.alltag[i].CustomerChildTag[arr[i]].ChildTagId)
            }
          }
          this.updata.Tags = this.tagID.join(',')
          // console.log(this.updata)
          if (!this.$route.query.code) {
            this.keylist = []
            for (let i = 0; i < this.visiblepeoples.length; i++) {
              this.keylist.push(this.visiblepeoples[i].ProfileId)
            }
            this.updata.VisibleIds = [].concat(JSON.parse(JSON.stringify(this.keylist))).join(',')
            var data = this.updata
            addCustomer(data).then(res => {
              // console.log(res)
              if (res.data.Successful) {
                this.$router.push({
                  path: '/CustomerManagement/index'
                })
              }
            })
          } else {
            this.keylist = []
            for (let i = 0; i < this.visiblepeoples.length; i++) {
              this.keylist.push(this.visiblepeoples[i].ProfileId)
            }
            this.keylist.unshift(this.vipid)
            this.updata.VisibleIds = [].concat(JSON.parse(JSON.stringify(this.keylist))).join(',')
            this.updata.CusMId = this.$route.query.code
            const data = this.updata
            editCustomer(data).then(res => {
              // console.log(res)
              if (res.data.Successful) {
                this.$router.push({
                  path: '/CustomerManagement/index'
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    DelK: function() {
      this.form.name = (this.form.name).trim()
    },
    DelE: function() {
      this.form.optionName = (this.form.optionName).trim()
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
    // console.log('跟蹤列表data')
    // console.log(data)

    app.FollowList = data.Data.Records
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
.principal{
   float: left;
   width: 80px;
   text-align: center;
   span {
     display: block;
      width: 80px;
     white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
  img {
    width: 50px;
    height: 50px;
  }
}
.visible {
  position: relative;
  padding-top: 36px;
  i{
    position: absolute;
    right: 0;
    width: 15px;
    height: 15px;
    background: no-repeat url(../../assets/meeting/sprite.png) 0 0/100%;
  }
}
.choice-box {
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    &>div {
      width: 900px;
      margin: 150px auto;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
    }
    p {
      margin: 0;
      padding: 20px 10px;
      background: #efefef;
      font-size: 18px;
    }
    li {
      padding: 5px 20px;
      img {
        float: right;
        width: 16px;
      }
    }
}
.choice {
  display: flex;
  justify-content: space-around;
  &>div {
    width: 280px;
    height: 450px;
    &>div {
      height: 400px;
      border: solid #ccc 1px;
      overflow: auto;
    }
    h3 {
      text-align: center;
    }
  }
}

.principalhead{
   color: orange;
}

.tagcup {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    &>div {
        overflow: hidden;
        width: 760px;
        margin: 18vh auto;
        background: #fff;
    }
    h2 {
      padding-left: 20px;
      margin: 0 0 20px;
      line-height: 53px;
      background: #EFEFEF;
    }
    .cupfooter {
      display: flex;
      justify-content: space-around;
      margin: 40px 0 30px;
    }
    .addtag-box {
      padding-right: 20px;
    }
    p {
      color: #bbb;
    }
    .hint{
      position: absolute;
      left: 0px;
      bottom: 34px;
      color: red;
    }
}

.addtagbutton {
    display: block;
    width: 92px;
    padding: 0;
    line-height: 35px;
    border: solid 1px;
    border-radius: 4px;
    color: #f99740;
    border-color: #f99740;
    background-color: #ffeede;
    text-align: center;
}

.pitchon {
    color: #ffffff;
    background-color: #f99740;

}
.nopitchon {
     color: #333;
     background: #fff;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tag-box {
   li {
     height: 40px;
     margin-bottom: 10px;
   }
   .tagbutton {
     display: inline-block;
     width: 75px;
     line-height: 30px;
     margin-left: 20px;
     border: solid #ccc 1px;
     border-radius: 4px;
     text-align: center
   }
   .operate {
      margin-left: 20px;
      color: #ccc;
   }
   .operate:hover {
     color: #f99740;
   }
}
.temlateMain{
    .el-main{
        .el-container{
            width: 1010px;
            margin:0 auto;
             overflow: hidden;
            .formTetle{
                border-bottom: none;
                height: 57px;
                width: 100%;
                text-align: center;
                margin-bottom: 40px;
                .imgHead{
                    height: 50px;
                    width: 57px;

                    margin-right: 20px;
                    float: left;
                    margin-left: 435px;
                    background: url(/images/CustomerManagement/xinjiankehu.png) no-repeat;
                }
                >span{
                    float: left;
                    font-size: 18px;
                    color: #323232;

                    height: 48px;
                    line-height: 48px;
                    font-weight: normal;
                }
            }
            .ruleForm{
                overflow: hidden;
            }
        }

    }

}

</style>
<style lang="scss">
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .hardAndEasy {
    #amapDemo {
      height: 90% !important;
    }
    input {
      border: #ccc 1px solid !important;
    border-radius: 4px !important;
    height: 35px !important;
    line-height: 35px !important;
    }
  }
  .people{
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
            color: #f99740;
            background: #FEF4EC;
        }
        .el-tree-node__content{
            height: 36px;
        }
  }
  .tagcup {
    .el-form .el-form-item {
      padding-right: 20px;
    }
  }
  .choice-box {
    .el-button {
      float: right;
      margin: 10px 20px;
    }
  }
</style>
