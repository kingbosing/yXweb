 <template id="discussCell">
        <div class="cell">

            <div class="title">
                <img v-bind:src="faceUrl(Tkey.ImageUrl,50)" alt="Alternate Text" v-if="Tkey.ImageUrl" />
                <img src="/images/personalCard-touxiang.png" alt="Alternate Text" v-else />

                <span class="name">{{Tkey.PrincipalName}}</span>
                <span class="time">{{(Tkey.CheckInTime)}}</span>

                <el-popover placement="bottom-end"
                            width="72px"
                            height="60"
                            trigger="hover" id="delOrEdit">
                    <p v-on:click="FollowE(Tkey,(Tkey.CheckInTime))">编辑</p>
                    <p v-on:click="deleteE(Tkey.VisitId)">删除</p>

                    <b class="el-icon-arrow-down" slot="reference"></b>
                </el-popover>
            </div>
            <div class="Follow_content">
                <p class="Follow_content_c">{{Tkey.Content}}</p>

                <div class="video" v-if="Tkey.Voices">
                    <p>语音：</p>

                    <div class="video_col" v-for="(k,v) in Tkey.Voices" :id="k.Id" :key="v">
                        <audio class="audio" v-bind:src="k.URL|videoUrl" hidden>
                            您的浏览器不支持 audio 标签。
                        </audio>
                        <div class="bg" v-on:click="toPlay(k.Id)"><div class="wifi"></div></div>

                        <div class="Time">{{k.Duration}}'</div>

                    </div>

                </div>
                <div class="file" v-if="Tkey.Files||Tkey.Images">
                    <p>文件：</p>
                    <template>
                        <div class="file_col" v-for="(k,v) in Tkey.Files"  :key="v">

                            <!-- <b class="fileType " v-html="fileType(k.FileName)"></b> -->
                             <new-icon class-name="file_col_icon"  :icon-name="FileIcon(k.FileName)" />

                            <span class="fileName">{{k.FileName}}</span>
                            <span class="size">{{k.Size|fileSize}}</span>

                            <i class="handle toDownLoad" v-on:click="download(k.SaveUrl,k.FileName)"></i>
                        </div>
                        <div class="file_col" v-for="(k,v) in Tkey.Images" :key="v">

                            <img class="fileType" v-bind:src="faceUrl(k.URL,40)" />
                            <span class="fileName">{{k.FileName}}</span>
                            <span class="size">{{k.Size|fileSize}}</span>

                            <i class="handle toBig" v-on:click="getBig(k.Path)"></i>
                        </div>
                    </template>
                </div>

                <p class="Follow_content_d">
                    <el-button size="mini" round>{{IsStatus(Tkey.Status)}}</el-button>
                    <el-badge :value="Tkey.VisitComment.length" class="item " :max="99" style="float:right">
                        <el-button size="small" v-on:click="discussShow=!discussShow">评论</el-button>
                    </el-badge>
                </p>
                <div class="discuss" v-show="discussShow">
                  <div>
                    <div class="jiao"></div>
                    <div class="after"></div>

                    <div class="inputYou">
                        <img v-bind:src="faceUrl(MyFaceUrl,40)" alt="Alternate Text" />
                        <el-input v-model="youIdeas" placeholder="请输入内容"></el-input>

                        <el-button type="warning" size="small" v-on:click="toDiscuss(Tkey.VisitId)">评论</el-button>
                    </div>
                    <div style="color:#dedede;font-size:16px;margin:50px " v-if="Tkey.VisitComment==''||Tkey.VisitComment==null">还没有评论</div>
                    <div class="discussCell" v-for="(k,v) in Tkey.VisitComment" :key="v">

                        <p>
                            <img v-bind:src="faceUrl(k.photoUrl,40)" alt="Alternate Text" />
                            <span class="color-f99740">{{k.CommentatorName}}</span>
                            <span class="time">{{k.CommentTime}}</span>
                        </p>
                        <p class="CommentContent">{{k.CommentContent}}</p>

                        <hr v-if="v<(Tkey.VisitComment).length-1" />
                        <div v-else style="height:25px; "></div>

                    </div>
                  </div>
                </div>
            </div>
            <!-- <hr /> -->
        </div>
    </template>

<script>
import urlUtil from '@/utils/urlUtil'
import { getFileIcon } from '@/utils/fileType'
import { globalvariable } from '@/utils/globalvariable'

import {
  addVisitComtent,
  delVisit
} from '@/api/customer.js'

export default {
  props: ['Tkey'],
  data() {
    return {
      show: true,
      discussShow: false, // 评论框
      youIdeas: '', // 评论
      MyFaceUrl: sessionStorage.getItem('MyFaceUrl')
    }
  },

  methods: {
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    },
    toPlay: function(data, e) {
      // 语音播放！
      var Wifi = $('#' + data).find('.wifi')
      var thisAudio = $('#' + data).find('audio')[0]

      if (thisAudio.paused) {
        for (var i = 0; i < $('.audio').length; i++) {
          $('.audio')[i].pause()
          $('.audio')[i].currentTime = 0
          $('.wifi').removeClass('actAudio')
          $(document).find('.wifi').css('backgroundPositionX', '-45px')
        }
        thisAudio.play()
        window.clearInterval(Time)

        Wifi.addClass('actAudio')
        var k = 1
        var Time = window.setInterval(function() {
          if (k % 3 == 1) {
            $(document).find('.actAudio').css('backgroundPositionX', '0')
          } else if (k % 3 == 2) {
            $('.actAudio').css('backgroundPositionX', '-22px')
          } else if (k % 3 == 0) {
            $(document).find('.actAudio').css('backgroundPositionX', '-45px')
          }
          k++
          if (thisAudio.ended) {
            thisAudio.pause()
            clearInterval(Time)
            $(document).find('.actAudio').css('backgroundPositionX', '-45px')
            Wifi.removeClass('actAudio')
          }
        }, 500)
      } else {
        thisAudio.pause()
        thisAudio.currentTime = 0
        $(document).find('.actAudio').css('backgroundPositionX', '-45px')
        Wifi.removeClass('actAudio')
      }
    },
    getBig: function(data) {
      // 放大
      var imgUrl = globalvariable().imgapiurl + data

      this.$alert('<img class="bigImg" src="' + imgUrl + '" />', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        customClass: 'bigImgBox'
      })
    },
    download: function(data, name) {
      // 下载

      var Src = globalvariable().bigfileurl + data

      window.open(Src)
    },
    toDiscuss(data) { // 添加评论
      var that = this
      if (that.youIdeas) {
        addVisitComtent(data, that.youIdeas).then(res => {
          const data = res.data
          console.log(data)
          if (data.Successful) {
            that.$message({
              message: '恭喜你，成功添加一条评论！',
              type: 'success'
            })
            // getInfo(app.CustomerId)
            this.$emit('doinit')
            that.youIdeas = ''
          }
        })
      }
    },
    deleteE(data) { // 删除记录
      var that = this
      this.$confirm('确认删除该拜访记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button btn btn-warning el-button--warning el-button--smallWarning',
        cancelButtonClass: '',
        customClass: 'deleteEbtn'
      }).then(() => {
        delVisit(data).then(res => {
          const data = res.data
          if (data.successful || data.Successful) {
            that.$message({
              message: '恭喜你，删除成功！',
              type: 'success'
            })
            this.$emit('doinit')
            // getInfo(app.CustomerId)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    FollowE(data, date) {
      this.$emit('dofollow', data, date)
      // console.log(data, date)
      // this.approvalShowState = 3
      // this.isNewOne = false

      // this.ruleForm = {
      //   type: data.Status,
      //   date: new Date(date),
      //   desc: data.Content
      // }
      // this.FileIDs = []
      // this.imgIDs = []
      // if (data.Files) {
      //   for (let i = 0; i < data.Files.length; i++) {
      //     this.FileIDs.push(data.Files[i].FileIDs)
      //   }
      // }
      // if (data.Images) {
      //   for (let i = 0; i < data.Images.length; i++) {
      //     this.imgIDs.push(data.Images[i].Id)
      //   }
      // }

      // this.thisActData = data
    },
    IsStatus(data) {
      if (data == '3') {
        return '会话沟通'
      } else if (data == '4') {
        return '网上沟通'
      } else if (data == '6') {
        return '外勤拜访'
      } else {
        return '其他'
      }
    },
    FileIcon(name) {
      console.log(name)
      return getFileIcon(name)
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
    }
  }
}
</script>

<style lang="scss" scoped>

  .cell{
    padding:10px 25px;
    overflow: hidden;
    .title{
      height: 50px;
      position: relative;
      img{
        display: block;
        float: left;
        height: 50px;
        width: 50px;
        border-radius: 50px;
      }
      .name {
          font-size: 18px;
          color: #333;
          margin: 0 10px;
      }
      .time {
          font-size: 16px;
          color: #8a8a8a;
          position: absolute;
          top: 27px;
          left: 60px;
      }
      #delOrEdit{
        >b{
          float: right;
          font-size: 20px;
        }
      }
    }

    .Follow_content{
      // height: 100px;
      margin-left: 62px;
      border-bottom: 1px solid #dedede;
      .file_col {
          position: relative;
          padding: 5px 5px 5px 0;
          height: 60px;
          img{
            margin-top: 10px;
          }
          & .fileName {
            position: absolute;
            top: 10px;
            left: 50px;
          }
          & .size {
              position: absolute;
              top: 35px;
              left: 50px;
              color: #dedede;
          }
           .handle {
              height: 20px;
              width: 20px;
              display:block;
              float: right;
              margin-top: 15px;
              cursor: pointer;
          }
          .toBig {
              background: url(/images/applyAndapproval_icon.png)0 -667px;
          }
          .toBig:hover {
              background: url(/images/applyAndapproval_icon.png)0 -613px;
          }
          .toDownLoad:hover {
              background: url(/images/applyAndapproval_icon.png)0 -503px;
          }
          .toDownLoad {
              background: url(/images/applyAndapproval_icon.png)0 -560px;
          }
      }
      .discuss{
        >div{
          padding: 20px;
          background: #f7f7f7;
          border-radius: 4px;
          border: 1px solid #dedede;
        }
        overflow: hidden;
        // background: #f7f7f7;
        // border-radius: 4px;
        // border: 1px solid #dedede;
        padding-top: 25px;
        position: relative;
        .jiao {
          height: 0px;
          width: 0px;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-top: 13px solid transparent;
          border-bottom: 13px solid #dedede;
          top: -4px;
          right: 17px;
          position: absolute;
          }
        .after {
          height: 0px;
          width: 0px;
          position: absolute;
          top: -2px;
          right: 18px;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 12px solid transparent;
          border-bottom: 12px solid #f7f7f7;
          }
        .inputYou{
          >img{
            float: left;
            margin: 10px 10px 0;
            border-radius: 50%;
          }
          .el-input{
            width: 245px;
            float: left;
            margin: 10px 0;
          }
          button{
            float: left;
            margin: 16px 10px;

          }
        }
        .discussCell{
          padding: 30px 30px 0px 50px;
          font-size: 16px;
          overflow: hidden;
          p{
            padding: 0;
            margin: 0;
            &.CommentContent {
                margin-left: 56px;
                line-height: 56px;
            }
            img{
              border-radius: 50%;
              margin-right: 10px;
              float: left;
            }
            .color-f99740 {
                color: #f99740;
            }
            .time {
                float: right;
                color: #8a8a8a;
            }
            hr{
              border: 0;
              border-top: 1px solid #eee;
            }
          }
        }
      }
    }

  }

</style>

