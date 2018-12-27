<template>
<el-container class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
    <el-header height='50px'>
        文档
        <div style="float:right">

         <el-button type="warning"  size="mini" v-if="isShow('新建文件夹')" @click="handelCreateFolder">新建文件夹 </el-button>
         <el-button type="warning"  size="mini" v-if="isShow('上传文件')" @click="handleUploadButton"> 上传</el-button>
         <el-button size="mini" @click="deleteSelection" v-if="handleSelection.length>0 &&isShow('删除文件')">刪除 </el-button>
         <el-button size="mini" v-if="handleSelection.length>0 &&isShow('移动文件')" @click="removePlace"> 移动</el-button>

         <input id="document-file" v-show="false" type="file" @change="handleUpload($event)" />
        </div>

    </el-header>

    <el-container class="docMain">
        <el-aside width="150px">
            <el-menu :defaultActive="rootType" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="0">
                    <!-- <i class="el-icon-menu"></i> -->
                    <span slot="title">全部</span>
                </el-menu-item>
                <el-menu-item index="1">
                    <!-- <i class="el-icon-menu"></i> -->
                    <span slot="title">公司</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <!-- <i class="el-icon-share"></i> -->
                    <span slot="title">共享</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <!-- <i class="el-icon-setting"></i> -->
                    <span slot="title">个人</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-container>
              <el-header height="50px" class="navTab">
                    <span @click="goBack(k,v)" v-for="(k,v) in routerList" :key="v">
                     <span class="name">{{k.Name}}</span>
                      <span class="el-icon-arrow-right" v-if="v<routerList.length-1"></span>
                    </span>
                <!-- <el-input v-model="key" prefix-icon="el-icon-search" placeholder="请输入文件名" @keyup.enter.native="toSearch" class="toSearch_input"> -->
                <!-- </el-input> -->
              </el-header>
              <el-main>
                <el-table ref="multipleTable"  height="100%" :data="filesList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column prop="Name" label="" width="50">
                        <template slot-scope="scope">
                            <file-icon :extension="scope.row.Name | getExt"></file-icon>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Name" label="名称" sortable  min-width="200">
                        <template slot-scope="scope">
                            <el-row>
                                <el-col :md="20">
                                    <div v-if="scope.row.Editable">
                                        <el-input size="small" v-model="scope.row.Name" v-focus @blur='handleEdit(scope.$index, scope.row)' @keyup.enter.native="handleEdit(scope.$index, scope.row)" placeholder="请输入内容"></el-input>
                                        <i class="el-icon-circle-check bg-success" @click="handleEdit(scope.$index, scope.row)"></i>
                                        <i class="el-icon-circle-close bg-danger" @click="handleCancel(scope.$index, scope.row)"></i>
                                    </div>
                                    <div v-else>
                                        <!-- <router-link :to="{ name:'doc-enterprise',query: { catId:   }}" v-if="scope.row.Type==0"> -->
                                          <span v-if="scope.row.Type==0" @click="goNext(scope.row)"> {{scope.row.Name}}</span>
                                        <!-- </router-link> -->
                                        <span v-else>{{scope.row.Name}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                     <el-table-column prop="CreateTime" sortable label="更新时间" min-width="240">
                        <template slot-scope="scope" v-if="scope.row.CreateTime">
                            <!-- <i class="el-icon-time"></i> -->
                            <span style="margin-left: 0px">{{ scope.row.CreateTime }}</span>
                            <span style="margin-left: 5px" v-if="scope.row.HasIr" @click="uploadList=true">更新记录<span class="el-icon-caret-bottom"></span></span>

                        </template>
                    </el-table-column>
                    <el-table-column prop="Size" sortable label="大小" min-width="80">
                        <template slot-scope="scope">
                            <span style="margin-left: 0px" v-if="scope.row.Type!=0">{{ scope.row.Size | storageSize }}</span>
                            <span style="margin-left: 0px" v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="CreatorName" label="上传者" min-width="100">
                    </el-table-column>
                    <el-table-column prop="DownloadTimes" label="下载次数" min-width="50">
                       <template slot-scope="scope">
                            <span style="" v-if="scope.row.Type!=0">{{ scope.row.DownloadTimes}}</span>
                            <span style="" v-else>--</span>
                        </template>
                    </el-table-column>
                      <el-table-column prop="StatusType" label="状态" sortable min-width="80">
                         <template slot-scope="scope">
                           {{changeStatusType(scope.row.StatusType)}}
                           <span @click=" getFileStateVisible(scope.row)"  v-if="handleShow(scope.row,'重命名')" class="el-icon-caret-bottom"></span>
                         </template>
                    </el-table-column>
                    <el-table-column  label=""  min-width="240">
                       <template slot-scope="scope">
                        <el-row class="handle">
                          <el-col :span="4">
                            <div class="handle-icon el-icon-share"></div>
                          </el-col>
                           <el-col :span="4">
                            <div v-if="scope.row.Type!=0" @click="download(scope.row.Url)" class="handle-icon el-icon-download"></div>
                          </el-col>
                           <el-col :span="4">
                            <div @click="handleDelete(scope.row)" v-if="handleShow(scope.row,'删除')" class="handle-icon el-icon-delete"></div>
                          </el-col>
                           <el-col :span="4">
                            <div @click="handleRename(scope.row)"  v-if="handleShow(scope.row,'重命名')" class="handle-icon el-icon-edit"></div>
                          </el-col>
                           <el-col :span="4">
                            <!-- <div v-if="scope.row.Type!=0"   class="handle-icon el-icon-sort"  @click="coverageUploadButton(scope.row)"></div> -->

                          </el-col>

                      </el-row>
                      </template>
                    </el-table-column>
                    <input id="coverage-file" v-show="false" type="file" @change="coverageUpload($event)" />
                </el-table>
              </el-main>
              <el-footer height="50px">
                 <el-pagination v-on:size-change="handleSizeChange"
                       v-on:current-change="handleCurrentChange"
                       :current-page="page"
                       :page-sizes="[25,50, 100, 150]"
                       :page-size="pageSize"
                       layout="sizes, prev, pager, next,jumper,total"
                       :total="totalCount">
                  </el-pagination>
              </el-footer>
            </el-container>
        </el-main>

    </el-container>

    <el-dialog
      title="修改文件状态"
      :visible.sync="fileStateVisible"
      width="560px"
      >
      <div class="StateVisibleContent">
        <div class="cell">
          <span>状态：</span>
          <el-select v-model="actStatusType" placeholder="请选择">
            <el-option label="公司" :value="1"> </el-option>
            <el-option label="共享" :value="2"></el-option>
            <el-option label="个人" :value="3"></el-option>
          </el-select>
        </div>
        <div class="cell" v-show="actStatusType==2">
          <span>共享范围：</span>
          <div class="actDepOrpre">
            <div>
              指定部门：
              <el-button @click="dialogFordep=true" size="mini" type="warning" plain icon="el-icon-plus">添加</el-button>
              <span class="actdepCell" v-for="(k,v) in act_depList" :key="v">{{k.Name||k.Title}}<b class="el-icon-circle-close-outline" @click="toDelete('act_depList',v)"></b></span>

            </div>
            <div>
              指定人员：
              <el-button @click="dialogForPeople=true" size="mini" type="warning" plain icon="el-icon-plus">添加</el-button>
              <span  class="actpreCell" v-for="(k,v) in act_peopleList" :key="v">{{k.Name||k.Fullname}}<b class="el-icon-circle-close-outline" @click="toDelete('act_peopleList',v)"></b></span>
            </div>
          </div>

          <!-- `checked` 为 true 或 false -->
          <p>
            <el-checkbox v-model="actSynergyRange">启用协同办公</el-checkbox>
          </p>
          <template v-if="actSynergyRange">
            <span>协同范围：</span>
            <div class="actDepOrpre">
              <div>
                指定部门：
                <el-button @click="SynergyFordep=true" size="mini" type="warning" plain icon="el-icon-plus">添加</el-button>
                <span class="actdepCell" v-for="(k,v) in act_dep_SynergyList" :key="v">{{k.Name||k.Title}}<b class="el-icon-circle-close-outline" @click="toDelete('act_dep_SynergyList',v)" ></b></span>
              </div>
              <div>
                指定人员：
                <el-button @click="SynergyForPeople=true" size="mini" type="warning" plain icon="el-icon-plus">添加</el-button>
                <span  class="actpreCell" v-for="(k,v) in act_People_SynergyList" :key="v">{{k.Name||k.Fullname}}<b class="el-icon-circle-close-outline" @click="toDelete('act_People_SynergyList',v)"></b></span>
              </div>
            </div>
          </template>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileStateVisible = false">取 消</el-button>
        <el-button type="warning" @click="setfileState">确 定</el-button>
      </span>
      <get-depeople :visible.sync="dialogForPeople"
          :actlist="People_TactList"
          title="指定人员"
          custom-class="peoDep"
          :people="true"
          :checkbox="true"
          :modal='false'
          v-on:act-node="People_actNode">
      </get-depeople>

      <get-depeople :visible.sync="dialogFordep"
          :actlist="dep_TactList"
          title="指定部门"
          :people="false"
          :checkbox="true"
          :modal='false'
          custom-class="peoDep"
          v-on:act-node="dep_actNode">
      </get-depeople>

       <get-depeople :visible.sync="SynergyForPeople"
          :actlist="People_SynergyList"
          title="协同人员"
          custom-class="peoDep"
          :people="true"
          :checkbox="true"
          :modal='false'
          v-on:act-node="People_actSynergy">
      </get-depeople>

      <get-depeople :visible.sync="SynergyFordep"
          :actlist="dep_SynergyList"
          title="协同部门"
          :people="false"
          :checkbox="true"
          :modal='false'
          custom-class="peoDep"
          v-on:act-node="dep_actSynergy">
      </get-depeople>
    </el-dialog>

<el-dialog title="更新记录" :visible.sync="uploadList"  width="560px">
  <!-- <el-table :data="gridData">
     <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="date" label="日期" width="150"></el-table-column>

    <el-table-column property="address" label="地址"></el-table-column>
  </el-table> -->
</el-dialog>

<el-dialog title="上传文件" :visible.sync="docUpload"  width="560px">
  <div class="content"  style="padding-bottom:20px;width: 360px;margin: 0 auto;">
     <upload-doc
          class="upload-demo"
          drag
          :on-success="docHandleSuccess"
          action="apix/file/upload"
          :file-list="fileList"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </upload-doc>
  </div>
   <span slot="footer" class="dialog-footer">
    <el-button @click="docUpload = false">取 消</el-button>
    <el-button type="warning" @click="sureUpload">确 定</el-button>
  </span>

</el-dialog>

<el-dialog title="选择移动位置" :visible.sync="removeTo"  width="560px">
  <div style="padding-bottom:20px">
    <el-tree :data="RootDocTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="removeTo = false">取 消</el-button>
    <el-button type="warning" @click="sureMoveTo">确 定</el-button>
  </span>
</el-dialog>

</el-container>
</template>

<script>
import DropdownMenu from '@/components/Share/dropdownMenu'
import request from '@/utils/request'
import { getStorageSizeString } from '@/utils'
import FileIcon from '@/components/FileIcon'
import wopi from '@/utils/wopi'
import { globalvariable } from '@/utils/globalvariable'

import { getFileToken } from '@/api/public'

import {
  getRootDoc,
  getCatalogs,
  upload,
  reUpload,
  renamefile,
  hasSame,
  addcatalog,
  AddDownloadTimes,
  fileOrFolderDelete,
  setDocStatus,
  setShareRange,
  setSynergyRange,
  GetRootDocTree,
  moveDocs

} from '@/api/document'

export default {
  name: 'document',
  components: {
    DropdownMenu,
    FileIcon
  },
  data() {
    return {
      fullscreenLoading: false,
      filesList: [],
      totalCount: 0,
      page: 1,
      pageSize: 25,
      rootType: '0', // 0-全部；1-公司；2-共享；3-个人

      actRootType: '', // 选中rootType
      orderType: 1, // 排序类型：1 时间，2文件名，3类型, 4大小
      isasc: 1, // 排序类型：1 升序，2 降序
      CatelogId: '', // 目标文件夹
      key: '', // 搜索
      CatelogName: '',
      multipleSelection: [],
      refresh: false,
      docFuncs: [], // 企业文档权限
      handleSelection: [], // 選中列表

      fileStateVisible: false, // 修改文件状态
      actVisible: {},
      oldStatusType: '',
      actStatusType: 1,

      routerList: [], // 目录结构导航

      dialogForPeople: false, // 指定人员
      People_TactList: [], // 默认指定人员
      act_peopleList: [], // 选中指定人员

      dialogFordep: false, // 指定部门
      dep_TactList: [], // 默认指定部门
      act_depList: [], // 选中指定部门

      actSynergyRange: false, // 启用协同办公

      SynergyForPeople: false, // 协同人员
      People_SynergyList: [], // 默认协同人员IdS
      act_People_SynergyList: [], // 选中协同人员

      SynergyFordep: false, // 协同部门
      dep_SynergyList: [], // 默认协同部门IDs
      act_dep_SynergyList: [], // 选中协同部门

      uploadList: false, // 更新记录

      coverageUploadInfo: {}, // 替換源文件
      goBackStatusType: '', // 导航栏返回StatusType

      removeTo: false, // 移动
      RootDocTree: [], // 移动文件夹列表
      defaultProps: {
        children: 'Childrens',
        label: 'Name'
      },
      movetoInfo: [], // 移动到目标文件夹

      docUpload: false, // 上传
      fileList: [], // 默认列表
      toUploadList: [] // 上传文件列表
    }
  },
  mounted() {
    this.init()
  },
  filters: {
    storageSize(size) {
      return getStorageSizeString(size)
    },
    getDownloadUrl(row) {
      return '/apix/bigfile/download?path=' + row.Url
    },
    getExt(url) {
      return wopi.getExt(url)
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.children[0].focus()
      }
    }
  },
  watch: {
    CatelogId(to, from) {
      if (to !== from) {
        // 是否有目录变化
        // this.init()
        // this.getRoot()
      }
    },
    refresh(val) {
      if (val) {
        this.refresh = false
        // this.getRoot()
      }
    },
    rootType() {
      this.init()
    },
    act_peopleList: {
      handler(newName, oldName) {
        this.People_TactList = []// 默认指定人员
        this.act_peopleList.forEach(item => {
          this.People_TactList.push(item.ProfileId)
        })
      },
      // immediate: true,
      deep: true
    },
    act_depList: {
      handler(newName, oldName) {
        this.dep_TactList = []// 默认指定人员
        this.act_depList.forEach(item => {
          this.dep_TactList.push(item.DepartmentId)
        })
        console.log(this.dep_TactList)
      },
      // immediate: true,
      deep: true

    },
    act_People_SynergyList: {
      handler(newName, oldName) {
        this.People_SynergyList = []// 默认协同人员
        this.act_People_SynergyList.forEach(item => {
          this.People_SynergyList.push(item.ProfileId)
        })
      },
      // immediate: true,
      deep: true
    },
    act_dep_SynergyList: {
      handler(newName, oldName) {
        this.dep_SynergyList = []// 默认协同部门
        this.act_dep_SynergyList.forEach(item => {
          this.dep_SynergyList.push(item.DepartmentId)
        })
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {

    doInitOrFolderInfo() {
      if (this.routerList.length == 1) {
        this.init()
      } else {
        this.getFolderInfo()
      }
    },
    init() {
      const getFun = new Promise((resolve, reject) => {
        const Time = setInterval(() => {
          const myFuncs = this.$store.state.user.authorityData
          if (myFuncs.length > 0) {
            clearTimeout(Time)
            resolve(myFuncs)
          }
        }, 500)
      }).then(val => {
        const Ones = val.filter(item => {
          return item.Name == '企业文档' && item.FuncList.length > 0
        })

        this.docFuncs = Ones[0].FuncList

        // console.log(this.docFuncs)
        // console.log(this.isShow('查看'))
        // if (!this.isShow('查看')) {
        //   console.log('您没有查看权限！')
        // }
        dogetRootDoc(this, this.rootType, this.orderType, this.isasc, this.page, this.pageSize)
      })
    },
    toDelete(data, v) {
      console.log(data, v)
      console.log(this.act_peopleList)
      // data = data.splice(v, 1)
      if (data == 'act_depList') {
        this.act_depList.splice(v, 1)
      } else if (data == 'act_peopleList') {
        this.act_peopleList.splice(v, 1)
      } else if (data == 'act_dep_SynergyList') {
        this.act_dep_SynergyList.splice(v, 1)
      } else if (data == 'act_People_SynergyList') {
        this.act_People_SynergyList.splice(v, 1)
      }
      console.log(this.act_peopleList)
    },
    toSearch() {
      if (this.key) {
        this.doInitOrFolderInfo()
      }
    },
    getFileStateVisible(row) {
      console.log(row)
      this.actVisible = JSON.parse(JSON.stringify(row))
      this.fileStateVisible = true
      this.oldStatusType = row.StatusType
      this.actStatusType = this.actVisible.StatusType

      if (row.StatusType == 2) {
        this.act_peopleList = row.ShareRange.users
        this.act_depList = row.ShareRange.departs
        this.act_People_SynergyList = row.SynergyRange.users
        this.act_dep_SynergyList = row.SynergyRange.departs
        if (this.act_People_SynergyList.length > 0 || this.act_dep_SynergyList > 0) {
          this.actSynergyRange = true
        } else {
          this.actSynergyRange = false
        }
      } else {
        this.act_peopleList = []
        this.act_depList = []
        this.act_People_SynergyList = []
        this.act_dep_SynergyList = []
      }
    },
    // 设置共享范围，协作范围，文件移动
    setfileState() {
      var app = this
      if (app.oldStatusType != app.actStatusType && app.actStatusType == 2) {
        doSetDocStatus(app).then(c => {
          if (app.actSynergyRange) {
            Promise.all([doSetSynergyRange(app), doSetShareRange(app)]).then(function(values) {
              console.log(values)
              app.fileStateVisible = false
              app.doInitOrFolderInfo()
            })
          } else {
            doSetShareRange(app).then(c => {
              app.fileStateVisible = false
              app.doInitOrFolderInfo()
            })
          }
        })
      } else if (app.oldStatusType != app.actStatusType && app.actStatusType != 2) {
        doSetDocStatus(app).then(c => {
          app.fileStateVisible = false
          app.doInitOrFolderInfo()
        })
      } else if (app.oldStatusType == app.actStatusType && app.actStatusType == 2) {
        if (app.actSynergyRange) {
          Promise.all([doSetSynergyRange(app), doSetShareRange(app)]).then(function(values) {
            console.log(values)
            app.fileStateVisible = false
            app.doInitOrFolderInfo()
          })
        } else {
          doSetShareRange(app).then(c => {
            app.fileStateVisible = false
            app.doInitOrFolderInfo()
          })
        }
      } else {
        app.fileStateVisible = false
      }
    },
    getFolderInfo() {
      const row = this.routerList.slice(-1)[0]
      // goBackStatusType
      let theStatusType
      if (this.rootType == 0) {
        theStatusType = this.goBackStatusType
      } else {
        theStatusType = this.rootType
      }
      dogetCatalogs(this, row.Id, this.key, theStatusType, this.orderType, this.isasc, this.page, this.pageSize)
    },

    goBack(row, index) {
      this.routerList = this.routerList.filter((k, v) => {
        return v <= index
      })
      this.goBackStatusType = row.StatusType || ''

      this.doInitOrFolderInfo()
    },
    goNext(row) {
      // console.log(row)
      const routerInit = {
        Name: row.Name,
        Id: row.Id,
        CatelogId: row.CatelogId,
        StatusType: row.StatusType
      }
      this.routerList.push(routerInit)
      this.actRootType = row.StatusType

      this.CatelogId = row.Id
      dogetCatalogs(this, row.Id, this.key, this.actRootType, this.orderType, this.isasc, this.page, this.pageSize)
    },
    handleSizeChange(size) {
      this.pageSize = size
      dogetRootDoc(this, this.actRootType, this.orderType, this.isasc, this.page, this.pageSize)
    },
    handleCurrentChange(index) {
      this.page = index
      dogetRootDoc(this, this.actRootType, this.orderType, this.isasc, this.page, this.pageSize)
    },

    handleSelect(index) {
      this.rootType = index
    },
    handleSelectionChange(val) {
      // console.log(val)
      this.handleSelection = val
    },
    deleteSelection() {
      var data = {
        folderIds: [],
        fileIds: []
      }
      const app = this
      this.handleSelection.forEach(item => {
        if (item.Type === 0) {
          data.folderIds.push(item.Id)
        } else {
          data.fileIds.push(item.Id)
        }
      })
      this.$confirm('此操作将永久删除选择的文件及文件夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fileOrFolderDelete(data).then(c => {
          console.log(c.data)
          if (c.data.Code === 0) {
            app.doInitOrFolderInfo()
          } else {
            app.$message.error(c.data.Message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getEditUrl(url) {
      return wopi.getEditUrl(url)
    },
    isCollaboration(filename) {
      return wopi.isCollaboration(filename)
    },
    handleCancel(index, row) {
      if (row.Editable) {
        if (row.Id) {
          // 编辑
          // TODO 文件夹恢复原名
          row.Editable = false
        } else {
          this.filesList.shift()
        }
      }
    },
    handleRename(row) {
      // console.log('rename', row)
      row.Editable = true
    },
    // 刪除
    handleDelete(row) {
      var data = {
        folderIds: [],
        fileIds: []
      }
      const app = this
      if (row.Type === 0) {
        // folder
        data.folderIds.push(row.Id)
      } else {
        data.fileIds.push(row.Id)
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fileOrFolderDelete(data).then(c => {
          console.log(c.data)
          if (c.data.Code === 0) {
            app.doInitOrFolderInfo()
          } else {
            app.$message.error(c.data.Message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 下載
    download(Url) {
      const app = this
      // :href="'/apix/bigfile/download?path='+scope.row.Url"
      const url = globalvariable().bigfileurl + Url
      console.log(url)
      AddDownloadTimes(Url, 1).then(c => {
        console.log(c)
        if (c.data.Code == 0) {
          window.open(url)
          app.doInitOrFolderInfo()
        }
      })
    },

    handleEdit(index, row) {
      row.Editable = false
      var app = this
      if (row.Id) {
        // hasSame()
        renamefile(row.Name, row.Id, row.Type).then(c => {
          console.log(c)
          if (c.data.Code == 0) {
            // app.init()
            app.doInitOrFolderInfo()
          } else {
            app.$message({
              type: 'info',
              message: c.data.Message,
              onClose: () => {
                app.doInitOrFolderInfo()
              }
            })
          }
        })
      } else {
        const data = { 'Name': row.Name, 'ParentId': this.routerList.slice(-1)[0].Id }
        if (data.Name) {
          addcatalog(app.rootType, data).then(c => {
            if (c.data.Code == 0) {
              app.doInitOrFolderInfo()
            } else {
              app.$message({
                type: 'info',
                message: c.data.Message,
                onClose: () => {
                  app.doInitOrFolderInfo()
                }
              })
            }
          })
        } else {
          app.doInitOrFolderInfo()
        }
      }
    },
    handelCreateFolder() {
      this.filesList.unshift({
        Name: '',
        Editable: true,
        Size: 0,
        Type: 0
      })
    },
    handleUploadButton() {
      this.docUpload = true
      this.fileList = []
    },
    docHandleSuccess(response, file, fileList) {
      // console.log(fileList)
      this.toUploadList = fileList
    },
    sureUpload() {
      var root = this
      const Data = []
      this.toUploadList.forEach(item => {
        Data.push({
          'Name': item.name,
          'Type': 3,
          'Url': item.response,
          'FilePath': '',
          'CatalogId': root.CatelogId,
          'Size': item.size,
          'ThumbnailUrl': ''
        })
      })

      upload(root.rootType, Data).then(res => {
        if (res.data.Code == 0) {
          this.toUploadList = []
          this.docUpload = false
          this.fileList = []
          root.doInitOrFolderInfo()
        }
      })
    },
    handleUpload(e) {
      var file = e.target.files[0]
      var filesize = file.size
      var filename = file.name
      var catId = this.$route.query.catId || ''
      var root = this
      // 2,621,440   2M
      // 图片大于2MB
      // if (filesize > 2101440) {
      // }
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        var base64 = e.target.result.split(',')[1]
        // 上传文件
        request
          .post('/apix/file/upload', {
            Data: base64, // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            FileName: filename,
            Category: ''
          })
          .then(c => {
            // 写入上传数据
            var url = c.data.Data
            const Data = [{
              'Name': filename,
              'Type': 3,
              'Url': url,
              'FilePath': '',
              'CatalogId': root.CatelogId,
              'Size': filesize,
              'ThumbnailUrl': ''
            }]
            // console.log(root.rootType)
            // console.log(Data)
            upload(root.rootType, Data).then(res => {
              if (res.data.Code == 0) {
                root.doInitOrFolderInfo()
              }
            })
          })
      }
    },
    coverageUploadButton(row) {
      this.coverageUploadInfo = row
      const fileSelect = document.getElementById('coverage-file')
      fileSelect.click()
    },
    // 上传覆盖文件
    coverageUpload(e) {
      const file = e.target.files[0]
      const filesize = file.size
      const filename = file.name
      const catId = this.$route.query.catId || ''
      const root = this

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        const base64 = e.target.result.split(',')[1]
        new Promise((resolve, reject) => {
          request
            .post('/apix/file/upload', {
              Data: base64, // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
              FileName: filename,
              Category: ''
            }).then(c => {
              resolve(c)
            })
        }).then(d => {
          var url = d.data.Data
          const Data = {
            'Name': root.coverageUploadInfo.Name,
            'Type': 3,
            'Url': url,
            'FilePath': '',
            'CatalogId': root.coverageUploadInfo.CatelogId,
            'Size': filesize,
            'ThumbnailUrl': ''
          }
          console.log(Data)
          reUpload(root.rootType, Data).then(res => {
            console.log(res.data)
            if (res.data.Code == 0) {
              root.doInitOrFolderInfo()
            }
          })
        })
      }
    },
    changeStatusType(data) {
      // 0-全部；1-公司；2-共享；3-个人
      const list = ['全部', '公司', '共享', '个人']
      return list[data]
    },
    // 判断是否是自己上传的文件
    isYouSelf(id) {
      // CreatorId
      return sessionStorage.getItem('MyProfileId') === id
    },
    // 根据操作名字判断权限
    isShow(name) {
      if (this.docFuncs.length > 0) {
        // console.log(name)
        const theAct = this.docFuncs.filter(item => {
          return item.Name == name
        })
        // console.log(theAct)

        if (this.rootType != 0) {
          return theAct[0].Enable
        }
      }
    },
    handleShow(row, name) {
      // console.log(row)
      if (row.StatusType == 3) {
        return true
      } else if (row.StatusType == 2) {
        // return this.isYouSelf(row.CreatorId) && this.isShow(name)
        if (row.Type) {
          return this.isYouSelf(row.CreatorId) && this.isShow(name + '文件')
        } else {
          return this.isYouSelf(row.CreatorId) && this.isShow(name + '文件夹')
        }
      } else if (row.StatusType == 1) {
        return this.isShow
      }
    },
    People_actNode(data) {
      // console.log(data)
      this.act_peopleList = data
    },
    dep_actNode(data) {
      this.act_depList = data
    },
    People_actSynergy(data) {
      this.act_People_SynergyList = data
    },
    dep_actSynergy(data) {
      this.act_dep_SynergyList = data
    },
    removePlace() {
      const app = this
      Promise.all([doGetRootDocTree(1), doGetRootDocTree(2), doGetRootDocTree(3)]).then(c => {
        this.RootDocTree = c
        // console.log(c)
        app.removeTo = true
      })
      // doGetRootDocTree(1)
    },
    handleNodeClick(data) {
      // console.log(data)
      this.movetoInfo = data
    },
    sureMoveTo() {
      // console.log()
      // console.log()
      this.$confirm('此操作将移动选中文件并且清空共享协作范围和覆盖同名文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        doMoveDocs(this, this.handleSelection, this.movetoInfo)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
    }
  }
}

const dogetRootDoc = (app, rootType, ordertype, isasc, pageIndex, pageSize) => {
  app.fullscreenLoading = true
  getRootDoc(rootType, ordertype, isasc, pageIndex, pageSize).then(res => {
    const data = res.data.Data
    // console.log(data)
    app.fullscreenLoading = false
    app.filesList = data.Records.map(c =>
      Object.assign(c, {
        Editable: false
      })
    ).sort(c => c.Type + c.Id)
    app.totalCount = data.TotalCount
    app.CatelogId = data.CatelogId

    app.routerList = []
    const routerInit = {
      Name: app.changeStatusType(rootType),
      Id: data.CatelogId,
      CatelogId: data.CatelogId
    }
    app.routerList.push(routerInit)
  })
}
const dogetCatalogs = (app, catalogId, key, rootType, ordertype, isasc, pageIndex, pageSize) => {
  // console.log({
  //   app, catalogId, key, rootType, ordertype, isasc, pageIndex, pageSize
  // })
  app.fullscreenLoading = true

  getCatalogs(catalogId, key, rootType, ordertype, isasc, pageIndex, pageSize).then(res => {
    const data = res.data.Data
    // console.log(res)
    app.fullscreenLoading = false
    app.filesList = data.Records.map(c =>
      Object.assign(c, {
        Editable: false
      })
    ).sort(c => c.Type + c.Id)

    app.totalCount = data.TotalCount
    app.CatelogId = data.CatelogId
    app.CatelogName = data.pathInfo[0].Name
  })
}

// 文件移动
const doSetDocStatus = (app) => {
  return new Promise((resolve, reject) => {
    setDocStatus(app.actVisible.Type, app.actVisible.Id, app.actStatusType).then(c => {
      console.log(c)
      // this.fileStateVisible = false
      if (c.data.Successful) {
        resolve(1)
      // this.doInitOrFolderInfo()
      } else {
        this.$message({
          type: 'info',
          message: c.data.Message
        })
      }
    })
  })
}
// 设置共享范围
const doSetShareRange = (app) => {
  let thetype
  if (app.actVisible.Type) {
    thetype = 1
  } else {
    thetype = 2
  }
  const UserList = []
  const DeptList = []
  // console.log(app.act_depList)
  // console.log(app.People_TactList)
  app.act_peopleList.forEach(item => {
    UserList.push(item.ItemId || item.ProfileId)
  })
  app.act_depList.forEach(item => {
    DeptList.push(item.ItemId || item.DepartmentId)
  })
  return new Promise((resolve, reject) => {
    setShareRange(thetype, app.actVisible.Id, UserList, DeptList).then(res => {
      if (res.data.Code === 0) {
        resolve(2)
      } else {
        reject()
        app.$message({
          type: 'info',
          message: c.data.Message
        })
      }
    })
  })
}

// 设置协作范围
const doSetSynergyRange = (app) => {
  let thetype
  if (app.actVisible.Type) {
    thetype = 1
  } else {
    thetype = 2
  }
  const UserList = []
  const DeptList = []
  app.act_People_SynergyList.forEach(item => {
    UserList.push(item.ItemId || item.ProfileId)
  })
  app.act_dep_SynergyList.forEach(item => {
    DeptList.push(item.ItemId || item.DepartmentId)
  })
  return new Promise((resolve, reject) => {
    setSynergyRange(thetype, app.actVisible.Id, UserList, DeptList).then(res => {
      if (res.data.Code === 0) {
        resolve(3)
      } else {
        app.$message({
          type: 'info',
          message: c.data.Message
        })
      }
    })
  })
}

var doGetRootDocTree = (rootType) => {
  return new Promise((resolve, reject) => {
    GetRootDocTree(rootType).then(c => {
      if (c.data.Code === 0) {
        resolve(c.data.Data)
      }
    })
  })
}

const doMoveDocs = (app, handleSelection, movetoInfo) => {
  const TargetCatalogId = movetoInfo.DocId
  const req = []
  handleSelection.forEach(item => {
    let Type
    if (item.Type === 0) {
      Type = 2
    } else {
      Type = 1
    }
    req.push({
      'SourceId': item.Id,
      'SourceName': item.Name,
      'TargetCatalogId': TargetCatalogId,
      'Type': Type,
      'IsCover': true,
      'IsClearRange': true
    })
  })
  // console.log(req)
  return new Promise((resolve, reject) => {
    moveDocs(req).then(c => {
      // console.log(c)
      if (c.data.Code === 0) {
        app.removeTo = false

        app.doInitOrFolderInfo()
      } else {
        app.$message({
          type: 'info',
          message: c.data.Message
        })
      }
    // console.log(c)
    })
  })
}

</script>

<style lang="scss" scoped>
.temlateMain {
  padding: 0px !important;
  .el-container,.el-main{
    height: 100%;
  }
  .docMain{
    .el-aside{
      border-right: 1px solid #dedede;
      .el-menu{
        border-right: none;
      }
      .el-menu-item{
        border-bottom: 1px solid #dedede;
      }
      .el-menu-item.is-active {
          color: #f99740;
      }
    }
    .el-main{
      padding: 0;
      .navTab{
        .name{
          cursor: pointer;
        }
        .toSearch_input{
          width: 260px;
          float: right;
        }
      }
      .handle-icon{
        font-size: 16px;
        &:hover{
          color: #f99740;
        }
      }
      .handle{
        .el-col{
          height: 23px;
          >div{
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

}

.StateVisibleContent{
  overflow: hidden;
  .cell{
    margin-bottom: 10px;
    >span{
      width: 100px;
      text-align: right;
      display: block;
      float: left;
      line-height: 36px;
    }
    .actDepOrpre{
      width: 400px;
      float: left;
      border: 1px solid #dedede;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 10px;
      >div{
        margin-bottom: 10px;
        .actpreCell,.actdepCell{
          border-radius: 13px;
          border:1px solid #dedede;
          padding:5px 10px;
          display: inline-block;
          margin:5px;
          cursor: pointer;
          position: relative;
          >b.el-icon-circle-close-outline{
            position: absolute;
            color: #f00;
           top: 0px;
          right: -6px;
          font-size: 25px;

          }
        }

      }

    }
  }
}

</style>
