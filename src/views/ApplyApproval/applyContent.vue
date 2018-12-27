<template>
     <el-container class="temlateMain applyContent" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/ApplyApproval/apply' }">我的申请</el-breadcrumb-item>
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

                                <el-button size="small"  v-popover:popover5>抄送人</el-button>

                                <el-button size="small"  v-on:click="ToCopy(listData)" v-show="listData.StatusValue==1||listData.StatusValue==3||listData.StatusValue==4||listData.StatusValue==5">复 &nbsp;&nbsp;制</el-button>
                                <el-button size="small"  v-on:click="ToAgain(listData)" v-show="listData.StatusValue==2||listData.StatusValue==6">重 &nbsp;&nbsp;发</el-button>

                                <el-button size="small"  v-on:click="ToStop" v-show="listData.StatusValue==1&&selectedData.length<=1&&selectedData[0].Status==1">撤 &nbsp;&nbsp;销</el-button>

                                <el-button size="small" v-on:click="ToBypass" v-show="listData.StatusValue==2&&selectedData[0].Status==2">越级审批</el-button>
                            </div>
                         </el-footer>

                           <transition name="fade">
                            <div class="TheApproval" v-show="approvalShow">
                                <div>
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
                            </div>
                           </transition>
                     </el-container>
                 </el-aside>
             </el-container>

        </el-main>
     </el-container>
</template>

<script>
import contentBaseinfo from './components/contentBaseinfo'
import contentFileinfo from './components/contentFileinfo'
import flowCell from './components/flowCell'

import './components/ApplyApproval_vue.js'

import { GetDetail, revoke, Skip } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  components: {
    contentBaseinfo,
    contentFileinfo,
    flowCell
  },
  data() {
    return {
      fullscreenLoading: false,
      applyrequestid: '',
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
      approval_Images: '',
      approval_FileIDs: '',
      approval_Voices: '',

      // 抄送人列表
      getCopys: '',
      getCopyDatas: '',
      visibleCopy: false,
      MorevisibleCopy: false,

      //

      lockScroll: false,
      appendToBody: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.applyrequestid = this.$route.query.id
      //   console.log(this.applyrequestid)
      toGetDetail(this)
    },
    getMoreCopyer: function() { // //////更多抄送人
      this.MorevisibleCopy = true
      this.visibleCopy = false
    },
    ToStop() {
      var that = this
      this.$confirm('是否确定撤销此申请？', '', {
        confirmButtonClass: 'btn-new btn-sure',
        cancelButtonClass: 'btn-new btn-cancel',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        center: true

      }).then(() => {
        revoke(getToken(), that.applyrequestid).then((res) => {
          var data = res.data
          //   console.log(data)
          if (data.successful) {
            that.$message({
              type: 'success',
              duration: 1500,
              message: '撤销成功!'
            })
            that.init()
          } else {
            that.$message({
              type: 'warning',
              duration: 1500,
              message: '已被审批，不能取消!'
            })
            that.init()
          }
        })
      })
    },
    ToBypass() {
      var that = this
      var DepartmentLeaderName = this.selectedDataOver.DepartmentLeaderName

      var DepartmentLeaderId = this.selectedDataOver.DepartmentLeaderId
      var DepartmentLeaderDepId = this.selectedDataOver.DepartmentLeaderDepId
      var BranchId = this.selectedDataOver.BranchId
      //   console.log('确定')
      var Data = {
        applyrequestid: id,
        ApplyRequestId: id,
        LeaderId: DepartmentLeaderId,
        LeaderDepartmentId: DepartmentLeaderDepId,
        BranchId: BranchId
      }

      this.$confirm('是否越级给' + DepartmentLeaderName + '审批？', '', {
        confirmButtonClass: 'btn-new btn-sure',

        cancelButtonClass: 'btn-new btn-cancel',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        center: true

      }).then(() => {
        Skip(getToken(), this.applyrequestid, DepartmentLeaderId, DepartmentLeaderDepId, BranchId).then((res) => {
          var data = res.data
          if (data.successful) {
            that.$message({
              type: 'success',
              duration: 1500,
              message: '越级申请成功!'
            })
            that.init()
          } else {
            that.$message({
              type: 'warning',
              duration: 1500,
              message: '越级申请失败!'
            })
            that.init()
          }
        })
      })
    },
    ToCopy(data) {
      // 复制
      this.$router.push({ path: '/ApplyApproval/toApply', query: { name: this.listData.TypeName, id: this.listData.TypeId, type: '复制', DataId: this.applyrequestid }})
    },
    ToAgain(data) {
      // 重发
      this.$router.push({ path: '/ApplyApproval/toApply', query: { name: this.listData.TypeName, id: this.listData.TypeId, type: '重发', DataId: this.applyrequestid }})
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
  GetDetail(getToken(), app.applyrequestid, 1).then((res) => {
    const data = res.data
    // console.log(data)
    app.fullscreenLoading = false
    // console.log(data)
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
    // console.log(app.selectedData)
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

.fade-enter-active, .fade-leave-active {
    transition: right 1s;
}
</style>

