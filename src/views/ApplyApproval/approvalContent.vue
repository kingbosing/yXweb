<template>
     <el-container class="temlateMain applyContent" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/ApplyApproval/approval' }">我的审批</el-breadcrumb-item>
                <el-breadcrumb-item>{{listData.TypeName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>
             <el-container>
                 <el-main>
                     <el-container>
                        <el-header height="60%">
                            <content-baseinfo :Creator='Creator' :listData="listData" :ApprovalContent='ApprovalContent'></content-baseinfo>
                            <div class="approvalState" >
                                <b :class="StatusValue(listData.StatusValue)"></b>
                            </div>
                        </el-header>
                        <el-main>
                            <content-fileinfo :Voices='Voices' :listData='listData' :Img='listData.Images' :File="listData.FileIDs"></content-fileinfo>
                        </el-main>
                    </el-container>
                 </el-main>

                 <el-aside width="502px">
                     <el-container>
                         <el-header height="60px">
                             <div class="title" v-on:mouseleave="dropdown=false">
                                <div class="el-dropdown" v-on:click="toDropdown">{{selected}}<b class="el-icon-caret-bottom"></b></div>
                                <div class="el-dropdown-content" v-show="dropdown">
                                    <div class="el-dropdown-content-col" v-for="(item,v) in Items" :key="v"  v-on:click=" toselected(item.ApplyDepartmentName)">{{item.ApplyDepartmentName}}</div>
                                </div>
                            </div>
                         </el-header>
                         <el-main>
                             <el-scrollbar>
                                <flow-cell v-for="(k,v) in selectedData" :key="v" :item='k' :index='v' @thisIndex="toApproval"></flow-cell>
                             </el-scrollbar>
                         </el-main>
                         <el-footer height="75px">
                             <div class="UesTime color-8a">已用时间：{{listData.TimeSpan|TimeLength}}</div>
                              <div class="btn-want">

                                <el-dialog title="抄送人列表" :visible.sync="MorevisibleCopy" width="850px" :lock-scroll="lockScroll"  custom-class="MoreCopyer" :append-to-body="appendToBody">
                                    <div>
                                        <div class="copyList-content" v-for="(k,v) in getCopyDatas" :key="v" :title="k.ExecutProfileName">
                                            <img class="face" v-bind:src="faceUrl(k.FaceUrl,40)" />
                                            <p class="copyList_name">{{k.ExecutProfileName}}</p>
                                        </div>
                                    </div>
                                </el-dialog>
                                <el-popover ref="popover5" placement="top-end" width="482" height="135" trigger="click" v-model="visibleCopy">

                                    <div class="">
                                        <p class="color-32 copyList-title">抄送人 <span class="color-8a" style="font-size:12px">(审批人全都同意后，将抄送给以下人员）</span><span class="el-icon-close" v-on:click="visibleCopy = false"></span></p>
                                        <div style="text-align: left; margin: 0">
                                            <div class="copyList-content" v-for="(k,v) in toGetList(getCopyDatas,0,6)" :key="v" :title="k.ExecutProfileName">
                                                <img class="face" v-bind:src="faceUrl(k.FaceUrl,40)" />
                                                <p class="copyList_name">{{k.ExecutProfileName}}</p>
                                            </div>

                                            <div class="copyList-content" v-show="getCopyDatas.length>6" title="更多">
                                                <b class="more el-icon-more" v-on:click="getMoreCopyer"></b>

                                            </div>
                                            <div class="copyList-content" v-show="getCopyDatas.length<=0" title="kong" style="height:50px;">

                                            </div>
                                        </div>
                                    </div>

                                </el-popover>

                                <el-button size="small" v-show="listData.StatusValue==5"  v-popover:popover5>抄送人</el-button>

                                <el-button size="small"  v-show="listData.StatusValue==1" v-on:click="AgreeAndOk">同意并通过</el-button>
                                <el-button size="small"  v-show="listData.StatusValue==1" v-on:click="AgreeAndPass">同意并转交</el-button>
                                <el-button size="small"  v-show="listData.StatusValue==1" v-on:click="Repulse">拒绝</el-button>

                            </div>
                         </el-footer>

                           <transition name="fade">
                            <div class="TheApproval" v-if="approvalShow">
                                <div v-show="approvalShowState==1">
                                     <div class="ApprovalTitle">
                                        <p><span>审批意见</span><b class="el-icon-close" v-on:click="approvalShow=false"></b></p>
                                    </div>
                                    <div class="ApprovalFace">
                                        <img class="face " v-bind:src="faceUrl(approvalContents.CommenterFaceFormatUrl,50)" alt="Alternate Text" />
                                        <div class="approvalName">{{approvalContents.CommneterName}}</div>
                                        <div class="approvalType" v-html="setApprovalStatus(approvalContents.Status)"></div>
                                        <div class="approvalTime">{{approvalContents.TimeSpan|TimeLength}}</div>
                                    </div>
                                    <div class="ApprovalIdea">
                                        <p>审批意见：</p>
                                        <p class="content">{{approvalContents.Comment}}</p>
                                    </div>
                                    <div>
                                        <content-fileinfo :Voices='approval_Voices' :Img='approval_Images' :File="approval_FileIDs" :listData='listData'></content-fileinfo>
                                    </div>
                                </div>
                                <div v-show="approvalShowState>1">
                                    <div class="ApprovalTitle">
                                        <p><span v-html="ApprovalStatus(approvalShowState)"></span><b class="el-icon-close" v-on:click="approvalShow=false"></b></p>
                                    </div>
                                    <div class="toApprovalIdea">
                                        <p>审批意见：</p>
                                        <el-input type="textarea"
                                                  :rows="6"
                                                  placeholder="请示如审批意见,300字以内"
                                                  resize="false"
                                                  v-model="Remark"
                                                  :maxlength="300">
                                        </el-input>
                                        <hr />
                                    </div>
                                     <div class="form-barBig toApprovalFile">
                                        <span>上传文件：</span>
                                        <up-load
                                            class="upload-demo"
                                            ref="upload"
                                            action="apix/file/FileUpload"
                                            :on-remove="handleRemove"
                                            :on-success="handleSuccess"
                                            :show-list-id="false"
                                            multiple
                                            :show-file-list="true"
                                            :auto-upload="true">
                                            <el-button size="small" type="text">点击上传</el-button>
                                        </up-load>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="form-barBig CcPeople" style="padding-left:20px;" v-show="approvalShowState==2">
                                        <span>抄&nbsp; 送&nbsp; 人：</span>
                                        <span class="copyFun color-yello" @click="dialogForCcPeople=true">添加抄送</span>
                                         <ul class="copyList">
                                             <li v-for="k in CcPeople_TactLists" :key="k.ItemId">
                                                <a @click="removeIt(k.ItemId)"></a>
                                                <img :src="faceUrl(k.HeadUrl,40)" alt="">
                                                <span>{{k.Name}}</span>
                                             </li>
                                         </ul>
                                    </div>
                                    <div class="form-barBig ReferredPeople" style="padding-left:20px;" v-show="approvalShowState==3">
                                        <span>转&nbsp; 交&nbsp; 人：</span>
                                        <span class="copyFun color-yello" @click="dialogForReferredPeople=true">添加转交人</span>
                                        <ul class="copyList">
                                             <li v-for="k in CcPeople_TactLists" :key="k.ItemId">
                                                <a @click="removeIt(k.ItemId)"></a>
                                                <img :src="faceUrl(k.HeadUrl,40)" alt="">
                                                <span>{{k.Name}}</span>
                                             </li>
                                         </ul>
                                         <ul class="copyList">
                                             <li v-for="k in ReferredPeople_TactLists" :key="k.ItemId">
                                                <a @click="removeIt(k.ItemId)"></a>
                                                <img :src="faceUrl(k.HeadUrl,40)" alt="">
                                                <span>{{k.Name}}</span>
                                             </li>
                                         </ul>
                                    </div>

                                    <p class="button-put">
                                        <el-button size="medium" type="warning" v-on:click="ToSure" :loading="ApprovalSuccess">确 认</el-button>
                                    </p>
                                </div>
                            </div>
                           </transition>
                     </el-container>
                 </el-aside>
             </el-container>

        </el-main>

         <get-depeople :visible.sync="dialogForCcPeople"
            :actlist="CcPeople_TactList"
            title="选择抄送人"
            :people="true"
            :checkbox="true"
            v-on:act-node="CcPeople_actNode">
        </get-depeople>
        <get-depeople :visible.sync="dialogForReferredPeople"
            :actlist="ReferredPeople_TactList"
            title="选择转交人"
            :people="true"
            :checkbox="false"
            v-on:act-node="ReferredPeople_actNode">
        </get-depeople>
     </el-container>

</template>

<script>
import contentBaseinfo from './components/contentBaseinfo'
import contentFileinfo from './components/contentFileinfo'
import flowCell from './components/flowCell'

import './components/ApplyApproval_vue.js'

import { GetDetail, revoke, Skip, ToApproval } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import getDepeople from '../../components/dialogDep/src/component'
import { getFileType } from '@/utils/fileType'

export default {
  components: {
    contentBaseinfo,
    contentFileinfo,
    flowCell,
    getDepeople
  },
  data() {
    return {
      dialogForCcPeople: false, // 添加草送人
      CcPeople_TactList: [], // 抄送人Id列表
      CcPeople_TactLists: [], // 抄送人全列表

      dialogForReferredPeople: false,
      ReferredPeople_TactList: [], // 审批人Id列表
      ReferredPeople_TactLists: [], // 审批人全列表

      fullscreenLoading: false,
      applyrequestid: '', // 申请ID
      ApprovalID: '', // 审批Id
      listData: '', // 列表数据
      Creator: '', // 个人基本信息
      CompanyName: '',
      Voices: '',
      Images: '',
      FileIDs: '',
      ApprovalContent: '',

      Items: '',

      // 所选流程数据
      selectedDataOver: '', // 越级
      selectedData: '',
      // 下拉部门菜单-所选
      dropdown: false,
      // 选中部门
      selected: '',

      // 审批意见
      approvalShow: false, // 状态
      approvalContents: '', // 内容
      approval_fileLists: [], // 审批附件
      approval_Images: '',
      approval_FileIDs: '',
      approval_Voices: '',
      Remark: '',

      // 抄送人列表
      getCopys: '',
      getCopyDatas: '',
      visibleCopy: false,
      MorevisibleCopy: false,

      approvalShowState: 0, // 0-隐藏，1-审批意见，2-同意并通过，3-同意并转交，4-拒绝
      //
      ApprovalSuccess: false, // 审批按钮

      lockScroll: false,
      appendToBody: true
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    CcPeople_TactLists(news, olds) {
      this.CcPeople_TactList = []
      news.forEach((item) => {
        this.CcPeople_TactList.push(item.ItemId)
      })
    },
    approvalShow(news, olds) {
      if (olds) {
        this.ReferredPeople_TactLists = []
        this.ReferredPeople_TactList = []

        this.CcPeople_TactLists = []
        this.CcPeople_TactList = []
        this.Remark = ''
      }
    }
  },
  methods: {
    init() {
      this.applyrequestid = this.$route.query.ApplyID
      this.ApprovalID = this.$route.query.ApprovalID
      this.approvalShow = false
      toGetDetail(this)
    },
    handleRemove(file, fileList) {
    //   console.log(file)
    //   console.log(fileList)
      this.approval_fileLists = fileList
    },
    handleSuccess(response, file, fileList) {
    //   console.log(fileList)
      this.approval_fileLists = fileList
    },
    getFileType(data) {
      return getFileType(data)
    },
    ToSure() { // 审批
      const imgs = []
      const files = []
      this.approval_fileLists.forEach((item) => {
        if (this.getFileType(item.name) == 'img') {
          imgs.push(item.response.ID)
        } else {
          files.push(item.response.ID)
        }
      })
      this.approval_Images = imgs
      this.approval_FileIDs = files

      const applyrequestid = this.applyrequestid
      const ApplyDepartmentId = this.selectedDataOver.ApplyDepartmentId
      const ApprovalDepartmentId = this.selectedData[(this.selectedData).length - 1].ApprovalDepartmentId

      const approvArr = { 'approvalDepartmentId': (this.ReferredPeople_TactLists[0] ? this.ReferredPeople_TactLists[0].DeptId : ''), 'approvalProfileId': (this.ReferredPeople_TactLists[0] ? this.ReferredPeople_TactLists[0].ItemId : '') }
      const Data = {
        'ApplyRequestId': this.applyrequestid,
        'ApprovalDepartmentId': ApprovalDepartmentId,
        'ApplyDepartmentId': ApplyDepartmentId,
        'Remark': this.Remark,
        'FileIDs': this.approval_FileIDs,
        'PhotoIDs': this.approval_Images
      }
      let type

      if (this.approvalShowState == 2) { // 同意并通过
        Data.ExecutProfileId = this.CcPeople_TactList.toString()
        type = 1
      } else if (this.approvalShowState == 4) { // 拒绝
        type = 3
      } else if (this.approvalShowState == 3) { // 同意并转交
        Data.NextApprover = approvArr
        type = 2
      }
      var app = this
      ToApproval(getToken(), type, Data).then((res) => {
        const data = res.data
        if (data.successful) {
          this.init()
        } else {
          if (data.Message == '该申请已撤销') {
            app.$confirm('该申请已撤销!', '', {
              confirmButtonClass: 'btn-new btn-sure',
              cancelButtonClass: 'btn-new btn-cancel',
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              center: true
            }).then(() => {
              window.location.href = '/ApplyApproval/Approval'
              // window.location.target = "mainframe";
            })
          } else {
            app.$confirm(data.Message, '', {
              confirmButtonClass: 'btn-new btn-sure',
              cancelButtonClass: 'btn-new btn-cancel',
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              center: true
            }).then(() => {

            })
          }
        }
      })
    },
    CcPeople_actNode(data) {
    //   console.log(data)
      this.CcPeople_TactLists = data
    },
    ReferredPeople_actNode(data) {
    //   console.log(data)
      this.ReferredPeople_TactLists = data
    //   console.log(this.ReferredPeople_TactLists)
    },
    removeIt(id) {
      this.CcPeople_TactLists = this.CcPeople_TactLists.filter((item) => {
        return item.ItemId != id
      })
    },

    getMoreCopyer: function() { // //////更多抄送人
      this.MorevisibleCopy = true
      this.visibleCopy = false
    },
    AgreeAndOk: function() { // 同意并通过
      this.approvalShowState = 2
      this.approvalShow = !this.approvalShow
    },
    AgreeAndPass: function() { // 同意并转交
      this.approvalShowState = 3
      this.approvalShow = !this.approvalShow
    },
    Repulse: function() { // 拒绝
      this.approvalShowState = 4
      this.approvalShow = !this.approvalShow
    },

    toApproval(data) {
      this.approvalContents = this.selectedData[data]
      this.approval_Images = this.approvalContents.Photos
      this.approval_FileIDs = this.approvalContents.FileIDs
      this.approval_Voices = this.approvalContents.Voices

      this.approvalShowState = 1
      this.approvalShow = !this.approvalShow
    },
    toDropdown: function() {
      this.dropdown = !this.dropdown
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
    toselected: function(data) {
      // 选中部门
      if (this.selected == data) {

      } else {
        this.selected = data
        for (var i = 0; i < this.Items.length; i++) {
          if (this.Items[i].ApplyDepartmentName == data) {
            this.selectedDataOver = this.Items[i]
            this.selectedData = this.Items[i].Flows
          }
        }
      }
      this.dropdown = false
    }
  }
}

var toGetDetail = (app) => {
  app.fullscreenLoading = true
  GetDetail(getToken(), app.applyrequestid, 2, app.ApprovalID).then((res) => {
    const data = res.data
    // console.log(data)

    app.fullscreenLoading = false
    app.listData = data.Data
    app.ApprovalContent = data.Data.ApprovalContent
    app.Creator = data.Data.Creator
    app.Voices = data.Data.Voices
    app.Images = data.Data.Images
    app.FileIDs = data.Data.FileIDs

    app.Items = data.Data.Items
    app.selected = data.Data.Items[0].ApplyDepartmentName
    app.selectedDataOver = data.Data.Items[0]
    app.selectedData = data.Data.Items[0].Flows
    app.getCopyDatas = data.Data.ExecutProfileInfo
  })
}
</script>

<style lang="scss" scoped>
.applyContent{
>.el-main{
    padding:0;
    height: 100%;
    .el-container{
        padding:0;
        height: 100%;
        .el-main{
            padding:0;
            .el-header{
                background: #fff url(/images/applyApprovalBg.png)no-repeat bottom;
                padding: 0;
                position: relative;
                .approvalState {
                    height: 120px;
                    width: 120px;
                    position: absolute;
                    top: 0;
                    /*background:#ccc;*/
                    right: 0;
                    z-index: 99;
                    >b{
                        display: block;
                        width: 120px;
                        height: 120px;
                    }

                }

            }
            .el-main{
                height: 100%;
            }

        }
        .el-aside{
            height: 100%;
            border-left: 1px solid #dedede;
            font-weight: bold;
            position: relative;
            .el-header{
                 padding: 0;
                 font-weight: normal;
                .title {
                    height: 60px;
                    width: 500px;
                    position: absolute;
                    z-index: 5;

                    .el-dropdown {
                        height: 60px;
                        width: 100%;
                        border-bottom: 1px solid #dedede;
                        line-height: 60px;
                        text-align: center;
                        cursor: pointer;
                        background:#fff;
                    }
                    .el-dropdown-content {
                        width: 100%;
                        max-height: 400px;
                        border-bottom: 1px solid #dedede;
                        position: absolute;
                        background: #fff;
                        z-index: 5;
                    }
                    .el-dropdown-content .el-dropdown-content-col {
                        height: 60px;
                        width: 100%;
                        line-height: 60px;
                        text-align: center
                    }
                    .el-dropdown-content .el-dropdown-content-col:hover {
                        color: #f99740;
                        cursor: pointer;
                    }
                }

            }
            .el-main{
                height: 100%;
            }
            .el-footer{
                padding:0;
                border-top: 1px solid #dedede;
                line-height: 70px;
                font-weight: normal;
                .UesTime {
                    width: 175px;
                    float: left;
                    margin-left: 20px;
                    font-size: 16px;
                }

                .btn-want {
                    float: right;
                    margin-right: 20px;
                }
            }
        }
    }
}

}

.copyList-title {
    margin: 5px 0 0 5px;
    color: #323232;
     .el-icon-close {
        float: right;
        cursor: pointer;
    }
}
.copyList-content {
    width: 65px;
    margin-top: 15px;
    float: left;
    .more {
        height: 40px;
        width: 40px;
        margin: 0 auto;
        border-radius: 50%;
        display: block;
        font-size: 40px;
        color: #fff;
        background: #dedede;
        cursor: pointer;
    }
   .face {
        height: 40px;
        width: 40px;
        margin: 0 auto;
        border-radius: 50%;
        display: block;
    }
    .copyList_name {
        text-align: center;
        margin: 5px 0 0;
        font-size: 16px;
        width: 65px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.TheApproval {
    font-weight: normal;
    height: 100%;
    width: 500px;
    box-shadow: -5px 2px 5px #ccc;
    position: absolute;
    z-index: 99;
    top: 0;
    background: #fff;
    right: 0px;
    overflow:auto; padding: 10px 0 5px;
   >div{
        height:100%;
        position:relative;
        // margin-bottom: 75px;
        .ApprovalTitle > p {
            height: 50px;
            line-height: 50px;
            text-align: center;
            padding: 0;
            margin: 0;
             span {
                font-size: 20px;
                height: 50px;
            }
            b.el-icon-close {
                font-size: 20px;
                color: #323232;
                margin: 20px 20px;
                float: right;
                cursor: pointer;
            }
        }
        .ApprovalFace {
            position: relative;
            height: 100px;
            width: 100%;
            padding: 20px 10px;

             .face {
                height: 60px;
                width: 60px;
                border-radius: 50%;
                display: inline-block;
                float: left;
            }

             .approvalName {
                position: absolute;
                top: 25px;
                left: 90px;
                font-size: 18px;
            }

             .approvalType {
                position: absolute;
                top: 52px;
                left: 90px;
                font-size: 14px;
            }

             .approvalTime {
                position: absolute;
                top: 35px;
                right: 30px;
            }
        }
        .ApprovalIdea {
            min-height: 160px;
            padding: 0 20px;
            border-bottom: 1px solid #dedede;
            .content {
                padding: 0 10px;
                color: #8a8a8a;
            }
            margin-top: 20px;
            padding: 0 20px 20px;
            hr{
                border-bottom:#dedede;
            }
            > p {
                margin-bottom: 5px;
            }
        }
   }
   .button-put {
        position: absolute;
        bottom: 0;
        left: 225px
    }
}

.toApprovalIdea{
    padding:0 20px;
    hr{
        margin-top: 20px;
        margin-bottom: 20px;
        border-top: #dedede;
    }
}
.toApprovalFile{
    padding:0 20px;
    overflow: hidden;
    margin-bottom: 30px;
    line-height: 30px;
    >span{
        float: left;
    }
    .upload-demo{
        float: left;
        width: 375px;
        .el-button--text{
            color: #f99740;
            font-size: 14px;
        }
    }
}
.CcPeople,.ReferredPeople{
    .copyFun{
        margin-left: 15px;
    }
    .copyList{
        width: 480px;
        padding-left: 0;
        margin-bottom: 0;
        li{
            height: 75px;
            width: 60px;
            float: left;
            overflow: hidden;
            margin-top: 10px;
            position: relative;
            img{
                border-radius: 50%;
            }
            span{
                line-height: 20px;
            }
        }
    }
}
</style>

