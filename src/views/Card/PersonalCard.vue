<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            <a style="color: #f99740;" >个人名片</a>
            <span> | </span>
            <a @click="BusinessCard">企业名片</a>
            <div class="share-box">
                <span>分享到：&emsp;</span>
                <i @click="qq" class="qq"></i>
                <i @click="space" class="space"></i>
                <i @click="microblog" class="microblog"></i>
            </div>
        </el-header>
        <el-main>
            <div id='leftNav'> </div>
            <div id='content'>
                <div id='mainContent'>
                    <div id="EnterpriseInformationManage" class="panel" style="height:100%;">
                        <div class="panel-body scroll">
                            <div class="left-side">
                                <div class="img-view" >
                                    <img :src="CompanyInformation.ProfileFaceUrl" alt="图片" style="border-radius: 50%; margin-bottom: 40px;" />
                                    <span>{{CompanyInformation.Code}}</span>
                                </div>
                                <div class="img-view" >
                                    <img :src="logourl" alt="图片" />
                                    <span>{{CompanyInformation.Code}}</span>
                                </div>
                                <div class="qrcode">
                                    <vue-qr  :text="config.value" :size="140" :margin="8" ></vue-qr>
                                </div>
                            </div>
                            <div class="rightSide">
                                <table class="table-list">
                                    <tbody>
                                        <tr>
                                            <td class="td-title" style="width:75px!important;">姓&emsp;&emsp;名：</td>
                                            <td >{{CompanyInformation.Name}}</td>

                                        </tr>
                                        <tr>
                                            <td class="td-title">公&emsp;&emsp;司：</td>
                                            <td >{{CompanyInformation.CompanyName  !== null ? CompanyInformation.CompanyName:"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title">职&emsp;&emsp;务：</td>
                                            <td style="width:35%!important;">{{CompanyInformation.JobName !== null ? CompanyInformation.JobName:"(空)"}}</td>

                                        </tr>
                                        <tr>
                                            <td class="td-title">手&emsp;&emsp;机：</td>
                                            <td style="">{{CompanyInformation.Mobile  !== null ? CompanyInformation.Mobile :"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title">个人传真：</td>
                                            <td>{{CompanyInformation.Fax  !== null ? CompanyInformation.Fax:"(空)"}}</td>
                                            <td class="td-title">个人邮箱：</td>
                                            <td>{{CompanyInformation.Email !== '' ? CompanyInformation.Email:"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title" >联系地址：</td>
                                            <td>{{CompanyInformation.Address  !== null ? CompanyInformation.Address:"(空)"}}</td>
                                            <td class="td-title">网&emsp;&emsp;址：</td>
                                            <td>{{CompanyInformation.Url  !== null ? CompanyInformation.Url:"(空)"}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                 <div class="idcard">
                                     <span>名&emsp;&emsp;片：</span>
                                     <div>
                                         <input type="file" @change="getFront" id="front">
                                         <label for="front" class="front"></label>
                                         <img v-if="front !== ''" class="frontimg cardimg" :src="front" alt="">
                                         <div class="headhover">
                                             <img class="close" @click="deletefront" src="../../assets/finance/failurelcon.png" alt="">
                                             <img class="iconfont" @click="bigfront" src="../../assets/finance/bigimg.png" >
                                         </div>
                                     </div>
                                     <div>

                                         <input type="file" @change="getBack" id="contrary">
                                         <label for="contrary" class="contrary "></label>
                                         <img v-if="contrary !== ''" :src="contrary" alt="" class="frontimg cardimg">
                                         <div class="headhover">
                                             <img class="close" @click="deletecontrary" src="../../assets/finance/failurelcon.png" alt="">
                                             <img class="iconfont" @click="bigcontrary" src="../../assets/finance/bigimg.png" >
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            <!-- 名片放大弹出框 -->
                            <div class=" fade " v-show="bigimgshow">
                                <img  src="../../assets/finance/failurelcon.png" class="failurelcon" @click="shut">
                                <img :src="bigimgurl" class="bigimg" style="max-height:520px;max-width:1000px;">
                            </div>
                            <!-- *******************-->
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/Card'
import { globalvariable } from '@/utils/globalvariable'
import logo_url from '@/assets/finance/personalCard-logo.png'
import { getStringFormat } from '@/utils/StringFormat'
import { FileUpload } from '@/api/CompanyInformationEdit'
import VueQr from 'vue-qr'
export default {
  data() {
    return {
      CompanyInformation: {},
      companyCode: '',
      profileid: '',
      logourl: '',
      urlhead: '',
      shareurl: '',
      sharetitle: '',
      sharepic: '',
      sharesummary: '',
      contrary: '',
      front: '',
      bigimgshow: false,
      bigimgurl: '',
      config: {
        value: ''
      }

    }
  },
  components: {
    VueQr
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      const that = this
      this.urlhead = globalvariable().imgapiurl
      this.shareurl = globalvariable().onlineurl + '%23' + location.href.split('#')[1]
      this.companyCode = this.$route.query.companyCode
      this.profileid = this.$route.query.profileid
      API.GetPersonalInfo(this.companyCode, this.profileid).then(res => {
        console.log(res)
        const obj = { XiaoYingCode: res.data.Data.xiaoYingHao }
        that.config.value = JSON.stringify(obj)
        console.log(that.config.value)
        that.CompanyInformation = res.data.Data
        that.sharetitle = res.data.Data.Name + '的个人名片,请惠存'
        that.sharesummary = '公司名称：' + res.data.Data.Name + ',职务：' + res.data.Data.Jobs[0].JobName
        that.CompanyInformation.JobName = res.data.Data.Jobs[0].JobName
        that.CompanyInformation.ProfileFaceUrl = getStringFormat(that.urlhead + that.CompanyInformation.ProfileFaceUrl, [200, 200, 'm'])
        if (res.data.Data.CardFrontUrl == '' || res.data.Data.CardFrontUrl == null) {
          that.front = ''
        } else {
          that.front = that.urlhead + that.CompanyInformation.CardFrontUrl
        }
        if (res.data.Data.CardBackUrl == '' || res.data.Data.CardBackUrl == null) {
          that.contrary = ''
        } else {
          that.contrary = that.urlhead + that.CompanyInformation.CardBackUrl
        }
        if (that.CompanyInformation.LOGFormatUrl == null || that.CompanyInformation.LOGFormatUrl == '') {
          that.logourl = logo_url
          console.log(logo_url)
        } else {
          that.logourl = getStringFormat(that.urlhead + that.CompanyInformation.LOGFormatUrl, [200, 200, 'm'])
        }
        that.sharepic = that.CompanyInformation.ProfileFaceUrl
      })
    },
    microblog() {
      window.open('http://service.weibo.com/share/share.php?url=' + this.shareurl + '&title=' + this.sharetitle + '&pic=' + this.sharepic)
    },
    space() {
      window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.shareurl + '&title=' + this.sharetitle + '&pics=' + this.sharepic + '&summary=' + this.sharesummary)
    },
    qq() {
      window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + this.shareurl + '&title=' + this.sharetitle + '&pics=' + this.sharepic + '&summary=' + this.sharesummary)
    },
    BusinessCard() {
      this.$router.push({
        path: '/home/BusinessCard',
        query: {
          companyCode: this.companyCode
        }
      })
    },
    bigcontrary() { // 放大背面
      this.bigimgshow = true
      this.bigimgurl = this.contrary
    },
    bigfront() { // 放大正面
      this.bigimgshow = true
      this.bigimgurl = this.front
    },
    shut() { // 关闭放大
      this.bigimgshow = false
    },
    deletecontrary() {
      this.contrary = ''
      const data = { cardurl: '' }
      API.SetCardBackUrl(data).then(res => {
        console.log(res)
      })
    },
    deletefront() {
      this.front = ''
      const data = { cardurl: '' }
      API.SetCardFrontUrl(data).then(res => {
        console.log(res)
      })
    },
    getFront(e) { // 上传背面
      const _this = this
      const files = e.target.files[0]
      const Category = 'IMAGE'
      if (!e || !window.FileReader) return // 看支持不支持FileReader
      const reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.front = this.result
        const str = this.result
        const Data = str.substring(str.indexOf(',') + 1)
        FileUpload(Data, files.name, Category, files.size).then(res => {
          console.log(res)
          if (res.data.successful) {
            const data = { cardurl: res.data.Data.RowUrl }
            API.SetCardFrontUrl(data).then(res => {
              console.log(res)
            })
          }
        })
      }
      e.target.value = '' // 防止重复上传同一个图片不触发onloadend  这里是为了删除后可重新添加同一张  上传判断时不能用value是否存在了
    },
    getBack(e) { // 上传背面
      const _this = this
      const files = e.target.files[0]
      const Category = 'IMAGE'
      if (!e || !window.FileReader) return // 看支持不支持FileReader
      const reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.contrary = this.result
        const str = this.result
        const Data = str.substring(str.indexOf(',') + 1)
        FileUpload(Data, files.name, Category, files.size).then(res => {
          console.log(res)
          if (res.data.successful) {
            const data = { cardurl: res.data.Data.RowUrl }
            API.SetCardBackUrl(data).then(res => {
              console.log(res)
            })
          }
        })
      }
      e.target.value = '' // 防止重复上传同一个图片不触发onloadend  这里是为了删除后可重新添加同一张  上传判断时不能用value是否存在了
    }
  }
}
</script>

<style lang="scss" scoped>
    .temlateMain {
        .el-header span{
            font-size: 16px;
            color:#333;
            font-weight: bold;
            i{
                font-weight: normal;
            }
        }
    .el-main{
        height: 100%;
        padding: 0;
       }
    }
    .left-side {
        width: 210px;
        float: left;
        padding-top: 30px;
    }
    .img-view {
        width: 120px;
        text-align: center;
        margin-left: 40px;
    }
    .img-view img {
        width: 128px;
        height: 128px;
        border-radius: 4px;
    }
    .img-view span {
        display: block;
        color: #8a8a8a;
        margin-top: 5px;
    }
    .rightSide {
        /* width: 100%; */
        margin-left: 250px;
        height: 100%;
        padding-top: 30px;
    }
    .title {
        display: block;
        color: #323232;
        font-size: 16px;
        margin-bottom: 24px;
    }
    .rightSide table {
        width: 100%;
    }
    .rightSide .td-title {
        color: #8a8a8a;
        width: 74px;
    }
    .table-list td {
        height: 45px;
        line-height: 30px;
    }
    td, th {
        padding: 0;
    }
    .rightSide span.td-title {
    float: left;
}
.rightSide .td-title {
    color: #8a8a8a;
    width: 74px;
}
.rightSide .put-img {
    margin-left: 74px;
    width: 678px;
}
.share-box {
    float: right;
    font-size: 0;
    span {
        font-size: 14px !important;
        vertical-align: middle;
        font-weight: 400 !important;
        color: #ccc !important;
    }
}
.qq {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    vertical-align: middle;
    background: url(../../assets/meeting/qq.png) no-repeat 0 50%/90%;
    cursor: pointer;
}
.microblog {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    vertical-align: middle;
    background: url(../../assets/meeting/microblog.png) no-repeat 0 0/100%;
    cursor: pointer;
}
.space {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    vertical-align: middle;
    background: url(../../assets/meeting/space.png) no-repeat 0 0/100%;
    cursor: pointer;
}
.qq:hover {
    background: url(../../assets/meeting/qq1.png) no-repeat 0 50%/90%;
}
.space:hover {
    background: url(../../assets/meeting/space1.png) no-repeat 0 0/100%;
}
.microblog:hover {
    background: url(../../assets/meeting/microblog1.png) no-repeat 0 0/100%;
}
.idcard {
    padding-top: 15px;
    &>div {
        position: relative;
        float: left;
        margin-left: 30px;
    }
    label {
        display: block;
        width: 260px;
        height: 156px;
    }
    span{
        float: left;
        color: #8a8a8a;
        padding-left: 2px;
    }
    .front {
        background: url(../../assets/meeting/add_img-personalCard.png) no-repeat 0 0/100%;
    }
    .contrary {
        background: url(../../assets/meeting/add_img-reverse.png) no-repeat 0 0/100%;
    }
    .cardimg {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
}
#front {
    display: none;
}
#contrary {
    display: none;
}

    .frontimg:hover+.headhover{
        height: 30px;
        transition: all .5s;
        -moz-transition: all .5s; /* Firefox 4 */
        -webkit-transition: all .5s; /* Safari 和 Chrome */
        -o-transition: all .5s; /* Opera */
    }
    .headhover:hover {
        height: 30px;
        transition: all .5s;
        -moz-transition: all .5s; /* Firefox 4 */
        -webkit-transition: all .5s; /* Safari 和 Chrome */
        -o-transition: all .5s; /* Opera */
    }
    .headhover {
        position: absolute;
        top: 0;
        width: 100%;
        height: 0;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
        img {
            float: right;
            margin-right: 6px;
            cursor: pointer;
        }
        .close {
            width: 22px;
            height: 22px;
            margin-top: 4px;
        }
        .iconfont {
            width: 19px;
            height: 19px;
            margin-top: 5px;
        }
    }
    .fade {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    text-align: center;
}
.failurelcon {
    float: right;
    width: 60px;
    margin: 80px 80px 0 0;
}
.bigimg{
    margin-top: 120px;
}
.qrcode {
    text-align: center;
    margin-top: 40px;
}
</style>
