<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-if="!htmlState" :to="{ path: '/meeting/MyMeeting' }">我的会议</el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path: '/meeting/MeetingManagement' }">会议管理</el-breadcrumb-item>
                <el-breadcrumb-item>会议详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>
            <el-scrollbar>
                <div class="baseInfo">
                    <span class="button">
                        <el-button size="mini" type="warning" v-on:click="toAdjust" v-if="!htmlState&&MyProfileId==listData.CreatorId&&listData.Status==3">调整</el-button>
                        <el-button size="mini" type="warning" v-on:click="overMeeting" v-if="!htmlState&&MyProfileId==listData.CreatorId&&listData.Status==2">结束会议</el-button>
                        <el-button size="mini" type="warning" v-on:click="Cancel" v-if="(MyProfileId==listData.CreatorId||(htmlState&&ifFun))&&listData.Status==3">取消</el-button>
                    </span>
                    <h1 class="title">{{listData.Title}}<b class="icon"></b></h1>
                    <p class="address_time color-32"><span class="address"><b class="icon"></b>{{listData.MeetingRoomName||listData.MeetingAddress}}</span><span class="time"><b class="icon"></b>{{getTime(listData.StartTime,'{y}-{m}-{d} {h}:{i}')}}~{{getTime(listData.EndTime,'{h}:{i}')}}</span></p>
                    <p class="other color-8a"><span>会议类型：{{listData.MeetingTypeName}}</span><span>参会人数：{{listData.NumOfPerson}}人</span><span>提醒时间：提前{{listData.RemindTime}}分钟</span><span>发起人：{{listData.CreatorName}}</span></p>
                    <p class="other color-8a"> <span class="">会议说明：{{listData.Remark}}</span></p>
                </div>
                <div class="otherInfo">
                    <div class="adder">
                         <div class="title">
                            <b>参会人员</b>
                            <span class="button">

                                <el-button size="mini" v-on:click="sendAgain" v-if="!htmlState&&MyProfileId==listData.CreatorId&&(listData.Status==1||listData.Status==3)">再发送</el-button>
                                <template v-if="!htmlState&&(listData.Status==3||listData.Status==2)&&HasLock">
                                    <el-dialog title="解锁密码"
                                                :visible.sync="dialogVisible"
                                                width="500px">
                                            <p style="text-align:center; font-size:18px;"><span>会议主题：{{listData.Title}}</span></p>
                                            <p class="passWord" style="text-align:center;">密码：<span v-if="KeyInfo">{{KeyInfo}}</span><span v-else>生成失败<b class="meetingRoomPassWord" v-on:click="getMeetingRoomPassWord"></b></span></p>
                                            <template v-if="KeyInfo">
                                                <el-button style="margin:20px 185px;" v-if="!IfShareUrl" type="warning" size="medium" v-on:click="IfShareUrl=true">分享</el-button>
                                                <p v-else>复制链接 :<el-input id="inputShare" v-model="shareUrl" placeholder=""></el-input><el-button type="warning" size="medium" v-on:click="CopyIt">复制</el-button> <span v-if="copyIsOK" class="el-icon-check"></span></p>
                                                <textarea id="ShareUrlText" style="position:absolute;opacity:0;top:20px;left:100px;z-index:-9000;"></textarea>
                                            </template>

                                    </el-dialog>
                                    <el-button size="mini" type="warning" v-on:click="openDoor">解锁</el-button>
                                </template>

                            </span>
                        </div>
                        <div class="peopleList">
                            <!-- @*<div class="list addPeople" data-toggle="modal" data-target=".addCopy" v-if="!htmlState&&MyProfileId==listData.CreatorId&&(listData.Status==1||listData.Status==3)">添加人员+</div>*@ -->
                            <ul>

                                <li class="list lists" v-for="(k,v) in listPeople" :key="v"><img class="face" :src="faceUrl(k.FaceUrl,40)"><span :title="k.Name" class="dep_name">{{k.CompanyJob}}-{{k.Name}}</span> <span class="op " v-if="false"  v-on:click="deleteAdder(meetingID,k.ProfileId,k.Name)"></span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="addFiles" style="height:165px;margin-bottom:20px;" v-if="listData.Status==4">
                        <div class="file_Document">
                            <div class="title">
                                <b>会议资料</b>
                                <span class="button" >
                                    <el-button size="mini" type="warning" @click="toUpload(true)" v-show="!htmlState&&MyProfileId==listData.CreatorId&&(1<=listData.Status<=4)">上传</el-button>
                                    <!-- @*<el-button size="mini" type="warning" v-on:click="toUpload" v-show="listFileed.length<=0&&!htmlState&&MyProfileId==listData.CreatorId&&(1<=listData.Status<=4)">上传会议纪要</el-button>*@ -->
                                </span>
                                <!-- <iframe name="testLoad" id="testLoad" src="@Url.Action("MeetingUploadBigFileInfo","MyMeeting")" marginheight="0" scrolling="no" allowtransparency="yes" style="margin-left:82px;display:none;width:900px; height: 30px;border: transparent;"></iframe> -->
                                <!-- <input type="file" name="file" value="99" id="txtUploadFilePathId" style="display:none;" /> -->
                            </div>

                            <div class="file_Document_content content">
                                <el-row class="head">
                                    <el-col :span="4"><div class="grid-content bg-purple">文件类型</div></el-col>
                                    <el-col :span="8"><div class="grid-content bg-purple-light">文件名称</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">上传时间</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple-light">上传者</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                                </el-row>
                                <div class="file_Document_body">

                                    <el-row class="body1" v-for="k in listFileed" :key="k.FileName">
                                        <el-col :span="4"><div class="grid-content bg-purple">会议纪要</div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-purple-light">{{k.FileName}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple">{{getTime(listData.CreatedTime,'{y}-{m}-{d} {h}:{i}')}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple-light">{{listData.CreatorName}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple-light downLoading"  v-if="!htmlState" v-on:click="downLoading(k.SaveUrl,k.FileName)"></div></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="addFiles">
                        <div class="file_Document"  id="TheFiles" :name="meetingID" :state="uploadState">
                            <div class="title">
                                <b>会议资料</b>
                                <span class="button" >
                                    <el-button size="mini" type="warning" @click="toUpload(false)" v-show="listFile.length<=20&&!htmlState&&MyProfileId==listData.CreatorId&&(listData.Status==4||listData.Status==3||listData.Status==2||listData.Status==1)">上传</el-button>

                                </span>
                                <!-- <iframe name="testLoad" id="testLoad" src="@Url.Action("MeetingUploadBigFileInfo","MyMeeting")" marginheight="0" scrolling="no" allowtransparency="yes" style="margin-left:82px;display:none;width:900px; height: 30px;border: transparent;"></iframe> -->
                                <input type="file" name="file" value="99" id="txtUploadFilePathId" style="display:none;" @change="uploadFile($event)"/>

                            </div>

                            <div class="file_Document_content content">
                                <el-row class="head">
                                    <el-col :span="4"><div class="grid-content bg-purple">文件类型</div></el-col>
                                    <el-col :span="8"><div class="grid-content bg-purple-light">文件名称</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">上传时间</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple-light">上传者</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                                </el-row>
                                <div  :class="listData.Status==4?'file_Document_body_1':'file_Document_body'">
                                    <el-row class="body1" v-for="k in listFile" :key="k.FileName">
                                        <el-col :span="4"><div class="grid-content bg-purple">会议资料</div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-purple-light">{{k.FileName}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple">{{getTime(listData.CreatedTime,'{y}-{m}-{d} {h}:{i}')}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple-light">{{listData.CreatorName}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple-light downLoading" v-if="!htmlState" v-on:click="downLoading(k.SaveUrl,k.FileName)"></div></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </el-scrollbar>
        </el-main>

    </el-container>
</template>

<script>
import {
  share_meeting,
  get_roomkey,
  cancel_meeting,
  FileUpload,
  over_meeting,
  PicFileUpload,
  remindagain,
  save_minutes
} from '@/api/meeting'
import { getToken, getMyProfileId } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
      dialogVisible: false,
      listData: '', // 基本数据
      listPeople: '', // 参会人员列表
      listFile: '', // 会议资料
      listFileed: '', // 会议纪要
      HasLock: '', // 是否有密码锁
      RemindTime: '', // 上次提醒时间
      meetingID: '',

      visible2: false,
      MyProfileId: getMyProfileId(), // 我的ID
      sendAgainIf: false,
      theTimeON: '',

      // input: '',//搜索数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: -1, // 总条数
      index: 1, // 当前页
      size: 25, // 每页数
      listType: -1, // 列表or块
      searchText: '', // 搜索内容

      shareUrl: '',
      IfShareUrl: false,

      KeyInfo: '',
      htmlState: false, // 管理员入口
      ifFun: true, // 是否有取消权限

      uploadState: false, // 上传文件：false会议资料；true会议纪要

      copyIsOK: false // 分享链接ok
    }
  },
  mounted() {
    getList(this)
    if (this.$route.query.state) {
      this.htmlState = true
    } else {
      this.htmlState = false
    }
  },
  methods: {

    uploadFile(event) {
      console.log('******************')
      // <input type="file" name="img" multiple="multiple" />
      var fileId = event.target || event.srcElement

      var reader = new FileReader()
      var that = this
      var file = fileId.files[0] // 获取文件流
      console.log(file)
      var fileName = file.name // 获取文件名
      var fileSize = file.size // 获取文件名

      var Category = 'FILES'// file.type; 获取文件名
      const Data = {
        Data: 'string',
        FileName: fileName,
        Size: fileSize,
        Category: Category
      }
      reader.onload = function(e) {
        const Data = this.result.split(',')[1]
        // if()
        if (file.type.indexOf('text') >= 0) {
          new Promise((resolve, reject) => {
            FileUpload(getToken(), Data, fileName, Category, fileSize).then((response) => {
              // console.log('///')
              // console.log(response.data)
              if (response.data.successful) {
                resolve(response.data.Data.ID)
              }
            })
              .catch(error => {
                reject(error)
              })
          }).then(function(fileId) {
            console.log(getToken(), that.$route.query.Id, fileId, that.uploadState)
            save_minutes(getToken(), that.$route.query.Id, fileId, that.uploadState).then((response) => {
              // console.log('///')
              // console.log(response.data)
              if (response.data.successful) {

              }
            })
          })
        } else {
          that.$message({
            type: 'warning',
            message: '只支持上传文本格式文件!'
          })
        }
      }
      reader.readAsDataURL(file)
      fileId.value = ''
    },
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatPicUrl(
          url,
          width,
          width
        )
      } else {
        return noLogo
      }
    },
    toAdjust() {
      var that = this
      const MeetingId = that.$route.query.Id
      const token = getToken()
      this.$confirm('该操作将会取消已预定会议室，是否继续？', '', {
        confirmButtonClass: 'btn-new btn-sure',
        cancelButtonClass: 'btn-new btn-cancel',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        center: true
      }).then(() => {
        return new Promise((resolve, reject) => {
          cancel_meeting(token, MeetingId).then(response => {
            // console.log('///')
            // console.log(response.data)
            if (response.data.Code === 0) {
              that.$message({
                type: 'success',
                message: '会议取消成功!',
                onClose: function() {
                  // location.reload();
                  // getList(that)
                  that.$router.push({ path: '/meeting/Meeting_Add', query: { id: MeetingId, Adjust: 2 }})
                }
              })
              resolve()
            }
          })
            .catch(error => {
              reject(error)
            })
        }).catch(() => {

        })
      })
    },
    sendAgain() {
      // remindagain
      var that = this
      const MeetingId = that.$route.query.Id
      const token = getToken()

      if (this.sendAgainIf) {
        this.$confirm('是否确定再发送会议提醒？', '', {
          confirmButtonClass: 'btn-new btn-sure',
          cancelButtonClass: 'btn-new btn-cancel',
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          return new Promise((resolve, reject) => {
            remindagain(token, MeetingId).then(response => {
              // console.log('///')
              // console.log(response.data)
              if (response.data.successful) {
                that.$message({
                  type: 'success',
                  message: '再次提醒成功!'
                })
                resolve()
              }
            })
              .catch(error => {
                reject(error)
              })
          })
        })
      } else {
        this.$message({
          message: '再发送消息提醒太频繁了，请' + this.theTimeON + '后重试！',
          type: 'warning'
        })
      }
    },
    Cancel() {
      var that = this
      const MeetingId = that.$route.query.Id
      const token = getToken()
      this.$confirm('此操作将取消该会议, 是否继续?', '', {
        confirmButtonClass: 'btn-new btn-sure',
        cancelButtonClass: 'btn-new btn-cancel',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        center: true
      }).then(() => {
        return new Promise((resolve, reject) => {
          cancel_meeting(token, MeetingId).then(response => {
            // console.log('///')
            // console.log(response.data)
            if (response.data.Code === 0) {
              that.$message({
                type: 'success',
                message: '会议取消成功!',
                onClose: function() {
                  // location.reload();
                  getList(that)
                }
              })
              resolve()
            }
          })
            .catch(error => {
              reject(error)
            })
        }).catch(() => {
          // this.$message({
          //    type: 'info',
          //    message: '已取消删除'
          // });
        })
      })
    },
    overMeeting() {
      var that = this
      const MeetingId = that.$route.query.Id
      const token = getToken()
      this.$confirm('此操作将提前结束该会议, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          over_meeting(token, MeetingId).then(response => {
            // console.log('///')
            // console.log(response.data)
            if (response.data.Code === 0) {
              that.$message({
                type: 'success',
                message: '会议结束成功!',
                onClose: function() {
                  // location.reload();
                  getList(that)
                }
              })
              resolve()
            }
          })
            .catch(error => {
              reject(error)
            })
        }).catch(() => {
          // this.$message({
          //    type: 'info',
          //    message: '已取消删除'
          // });
        })
      })
    },
    toUpload(data) {
      this.uploadState = data
      // console.log(this.uploadState)
      var _div = document.getElementById('txtUploadFilePathId')
      // console.log(_div)
      _div.click()
    },
    downLoading(url, name) {
      var Src = globalvariable().bigfileurl + url + encodeURIComponent(name, 'UTF-8')
      window.open(Src)
    }
  }
}

function getKeyInfo() {
  return new Promise((resolve, reject) => {
    get_roomkey(id)
      .then(response => {
        // console.log('///')
        // console.log(response.data)
        if (response.data.successful) {
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

function getList(that) {
  that.listData = []
  that.fullscreenLoading = true
  const id = that.$route.query.Id
  console.log(id)
  return new Promise((resolve, reject) => {
    share_meeting(id)
      .then(response => {
        const data = response.data
        if (response.data.successful) {
          that.fullscreenLoading = false
          that.listData = data.Data.Meeting
          that.listPeople = data.Data.MeetingMemberList
          that.listFile = data.Data.MeetingDocument.MDAM.Files
          that.listFileed = data.Data.MeetingDocument.MSAM.Files
          that.RemindTime = data.Data.RemindTime
          that.HasLock = data.Data.HasLock

          that.KeyInfo = data.Data.KeyInfo.KeyBoardPwd
          if (that.RemindTime) {
            var RemindTime = Date.parse(new Date(that.RemindTime))
          } else {
            var RemindTime = ''
          }

          console.info(RemindTime)
          if (RemindTime == '' || RemindTime == null) {
            that.sendAgainIf = true
            clearInterval(getTheTime)
          }
          var getTheTime = setInterval(function() {
            var newTime = Date.parse(new Date())
            var theTime = (newTime - RemindTime) / 1000
            if (theTime > 1800) {
              that.sendAgainIf = true
              clearInterval(getTheTime)
            }
            that.theTimeON = parseInt((1800 - theTime) / 60) + '分' + (1800 - theTime) % 60 + '秒'
          }, 1000)
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
</script>

<style lang="scss" scoped>
.temlateMain {
  .color-8a {
    color: #8a8a8a;
  }
  .color-32 {
    color: #323232;
  }
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
  .el-main {
    height: 100%;
    .baseInfo {
        height: 225px;
        width: 100%;
        border: 1px solid #dedede;
        padding: 30px 30px 0;
        .title {
            margin: 0;
            padding: 0;
        }
        .button {
            float: right;
        }
        .title > b.icon {
            width: 42px;
            height: 28px;
            background: url(/images/meeting.png)center no-repeat;
            margin: -3px 10px;
            display: inline-block;
        }
        .address_time {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        .address > b.icon {
            width: 20px;
            height: 24px;
            display: inline-block;
            background: url(/images/meeting-place.png)center no-repeat;
            margin: -3px 10px;
        }
        .time > b.icon {
            width: 22px;
            height: 22px;
            display: inline-block;
            background: url(/images/meeting-time.png)center no-repeat;
            margin: 0px 10px -5px 40px;
        }
        .other {
            font-size: 16px;
            margin-top: 15px;
        }
        .other > span {
            margin-right: 100px;
        }

    }
    .otherInfo {
        height: 582px;
        width: 100%;
        margin-top: 30px;
        position: relative;
        padding-left: 445px;
        border: #0f0;
        .title {
            height: 42px;
            line-height: 42px;
            font-size: 18px;
            padding: 0 20px 0 24px;
            border-bottom: 1px solid #dedede;
        }
        .adder {
            height: 100%;
            width: 414px;
            position: absolute;
            top: 0;
            left: 0;
            margin-right: 30px;
            border: 1px solid #dedede;

            .title {
                height: 42px;
                line-height: 42px;
                font-size: 18px;
                padding: 0 20px 0 24px;
                border-bottom: 1px solid #dedede;
                .button{
                    float: right;
                    margin: -4px 0;
                }
            }
            .peopleList {
                max-height: 540px;
                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                .list{
                    height: 60px;
                    line-height: 60px;
                    padding-left: 24px;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover {
                        background: #fef4eb;
                        color: #f99740;
                        .op {
                            /*border: 1px solid #dedede;*/
                            background: url(/images/jurisclose.png)no-repeat center;
                        }
                    }
                }
                .addPeople {
                    position: absolute;
                    top: 43px;
                    background: #fff;
                    width: 400px;
                    color: #8a8a8a;
                    &:hover {
                        color: #f99740;
                    }
                }
                .lists .face {
                    height: 40px;
                    width: 40px;
                    display: block;
                    background: #ccc;
                    float: left;
                    margin: 10px 10px 0 0;
                    border-radius: 50%;
                }
                .lists .op {
                    height: 20px;
                    width: 20px;
                    display: block;
                    float: right;
                    margin: 20px 60px 0 0;
                    border-radius: 50%;
                }

            }
        }
        .addFiles {
            /*height: 100%;*/
            width: 100%;
            /*margin-right: 695px;*/
            float: left;
            border: 1px solid #dedede;
            .button{
                float: right;
                margin: -4px 0;
            }
            .file_Document_content div.el-row {
                text-align: center;
                height: 60px;
                line-height: 60px;
                font-size: 16px;
            }
            .file_Document_body {
                height: 480px;
                width: 100%;
                overflow: auto;
            }
            .file_Document_body_1 {
                height: 300px;
                width: 100%;
                overflow: auto;
            }
            .content .head {
                color: #8a8a8a;
                /*position: absolute;*/
                /*width: 610px;*/
                background: #fff;
                z-index: 99;
            }
            .content .head {
                color: #8a8a8a;
                background-color: #F7F7F7;
            }
            .body1:hover {
                background: #fef4eb;
                color: #f99740;
                .downLoading {
                    height: 60px;
                    width: 50px;
                    // display: inline-block;
                    background: url(/images/meetingDownload.png)center no-repeat;
                    cursor: pointer;
                }
            }
        }

    }
  }
}
</style>

