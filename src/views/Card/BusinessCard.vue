<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            <a @click="PersonalCard">个人名片</a>
            <span> | </span>
            <a style="color: #f99740">企业名片</a>
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
                                <div class="img-view">
                                    <img :src="logourl" alt="图片" />
                                    <span>{{CompanyInformation.Code}}</span>
                                </div>
                                <div class="qrcode">
                                    <vue-qr  :text="config.value" :size="140" :margin="8" ></vue-qr>
                                </div>
                            </div>
                            <div class="rightSide">
                                <span class="title">公司基本信息</span>
                                <table class="table-list">
                                    <tbody>
                                        <tr>
                                            <td class="td-title" style="width:75px!important;">公司名称：</td>
                                            <td >{{CompanyInformation.Name}}</td>
                                            <td class="td-title">公司传真：</td>
                                            <td >{{CompanyInformation.Fax  !== null ? CompanyInformation.Fax:"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title">电&emsp;&emsp;话：</td>
                                            <td style="width:35%!important;">{{CompanyInformation.MastPhones !== null ? CompanyInformation.MastPhones:"(空)"}}</td>
                                            <td class="td-title">备用电话：</td>
                                            <td style="">{{CompanyInformation.ReservePhones !== null ? CompanyInformation.ReservePhones:"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title">公司地址：</td>
                                            <td>{{CompanyInformation.Address !== null ? CompanyInformation.Address:"(空)"}}</td>
                                            <td class="td-title">法人代表：</td>
                                            <td>{{CompanyInformation.LawAgent !== null ? CompanyInformation.LawAgent:"(空)"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title" >公司邮箱：</td>
                                            <td>{{CompanyInformation.Email !== null ? CompanyInformation.Email:"(空)"}}</td>
                                            <td class="td-title">股&emsp;&emsp;东：</td>
                                            <td>{{CompanyInformation.Stockholders !== null ? CompanyInformation.Stockholders:"(空)"}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style="overflow:hidden ;margin-bottom:20px;margin-top:8px;">
                                    <span class="td-title" style="margin-bottom:20px;">资历证书：</span>
                                    <div class="put-img">
                                        <div class="img-box" v-if="Certificatespictures !== []" v-for="(item , key) in Certificatespictures" :key="key">
                                            <div class="img-hover"><img src="../../assets/finance/bigimg.png" class="iconfont" @click="bigimg(item.RawUrl)"></div>
                                            <img :src="urlhead + item.RawUrl" alt="图片" style="max-height:101px;max-width:161px;" />
                                        </div>
                                        <span v-if="Certificatespictures == [] || Certificatespictures.length == 0" >(空)</span>
                                    </div>
                                </div>
                                <span class="title">公司介绍</span>
                                <table class="table-introduce">
                                    <tbody>
                                        <tr>
                                            <td class="td-title"  style="width:62px!important;">公司简介：</td>
                                            <td class="td-content" id="company_des">{{companyprofile}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title"  style="width:62px!important;">管理团队：</td>
                                            <td class="td-content" id="company_des">{{team}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-title"  style="width:62px!important;">业务介绍：</td>
                                            <td class="td-content" id="company_des">{{business}}</td>
                                        </tr>
                                        <tr v-if="newDescriptions !== [] || newDescriptions.length !== 0 && newDescriptions !== []" v-for="(item ,key) in newDescriptions" :key="key">
                                            <td class="td-title"  style="width:62px!important;">{{item.Title + ':'}}</td>
                                            <td class="td-content" id="company_des">{{item.DescContent}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="description_val" style="display: none">@Html.Raw(Json.Encode(Model.Descriptions))</div>
                            </div>
                            <!-- 名片放大弹出框 -->
                            <div class=" fade " v-show="bigimgshow">
                                <img  src="../../assets/finance/failurelcon.png" class="failurelcon" @click="shut">
                                <img :src="urlhead + bigimgurl" class="bigimg" style="max-height:520px;max-width:1000px;">
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
import VueQr from 'vue-qr'
export default {
  data() {
    return {
      CompanyInformation: {},
      logourl: '',
      Certificatespictures: [],
      urlhead: '',
      bigimgshow: false,
      bigimgurl: '',
      Descriptions: [],
      newDescriptions: [],
      companyprofile: '(空)',
      team: '(空)',
      business: '(空)',
      code: '',
      MyCompany: '',
      MyProfileId: '',
      shareurl: '',
      sharetitle: '',
      sharepic: '',
      sharesummary: '',
      config: {
        value: ''
      }
    }
  },
  components: {
    VueQr
  },
  methods: {
    change() {
      const that = this
      this.MyProfileId = sessionStorage.getItem('MyProfileId')
      this.urlhead = globalvariable().imgapiurl
      console.log(this.$route.path)
      this.shareurl = globalvariable().onlineurl + '%23' + location.href.split('#')[1]
      this.MyCompany = this.$route.query.companyCode

      API.company(this.MyCompany).then(res => {
        console.log(res)
        if (res.data.successful) {
          const obj = { CompanyCode: that.MyCompany }
          that.config.value = JSON.stringify(obj)
          that.CompanyInformation = res.data.Data
          that.sharetitle = res.data.Data.Name + '的企业名片,请惠存'
          that.sharesummary = '公司名称：' + res.data.Data.Name + ',地址：' + res.data.Data.Address
          if (that.CompanyInformation.LogoFormatUrl == null || that.CompanyInformation.LogoFormatUrl == '') {
            that.logourl = logo_url
            console.log(logo_url)
          } else {
            that.logourl = getStringFormat(that.urlhead + that.CompanyInformation.LogoFormatUrl, [200, 200, 'm'])
          }
          that.sharepic = that.logourl
          if (that.CompanyInformation.Certificates) {
            that.Certificatespictures = that.CompanyInformation.Certificates
          }
          var data = that.CompanyInformation.Descriptions
          if (data.length !== 0) {
            var arr = []
            for (let i = 0; i < data.length; i++) {
              if (data[i].Title == '公司简介') {
                if (data[i].DescContent !== '') {
                  that.companyprofile = data[i].DescContent
                }
              } else if (data[i].Title == '管理团队') {
                if (data[i].DescContent !== '') {
                  that.team = data[i].DescContent
                }
              } else if (data[i].Title == '业务介绍') {
                if (data[i].DescContent !== '') {
                  that.business = data[i].DescContent
                }
              } else {
                arr.push(data[i])
                that.newDescriptions = arr
              }
            }
          }
        }
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
    PersonalCard() {
      this.$router.push({
        path: '/home/PersonalCard',
        query: {
          companyCode: this.MyCompany,
          profileid: this.MyProfileId
        }
      })
    },
    bigimg(url) { // 放大图片按钮
      this.bigimgshow = true
      this.bigimgurl = url
    },
    shut() { // 放大图片关闭
      this.bigimgshow = false
    },
    getCompanyCode() {
      return this.$store.state.company.CompanyCode
    },
    edit() { // 编辑
      this.$router.push({
        path: '/CompanyInformationEdit',
        query: {
          code: this.code
        }
      })
    }

  },
  mounted() {
    this.change()
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
        border: 1px solid #dedede;
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
.img-box {
    width: 150px;
    height: 100px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
}
.img-box .img-hover {
    margin: 0;
    left: 0px;
    right: 0px;
    position: absolute;
    top: 0px;
    height: 0px;
    padding: 0px;
    margin: 0;
    opacity: 0.8;
    color: #fff;
    background: none repeat scroll 0 0 #000000;
    overflow: hidden;
}
.img-box .img-hover i {
    float: right;
    margin-right: 10px;
}
.put-img img {
    width: 150px;
    height: 100px;
}
.iconfont {
    width: 18px !important;
    height: 18px !important;
    margin: 1px 6px 0 0;
    float: right;
}
.table-introduce {
    table-layout: fixed;
}
table {
    border-spacing: 0;
    border-collapse: collapse;
}
.table-introduce tr {
    height: 45px;
}
.table-introduce .td-title {
    vertical-align: top;
    word-wrap: break-word;
    word-break: normal;
}
.table-introduce td {
    padding: 5px 0;
}
.table-introduce .td-content {
    width: 678px;
    vertical-align: top;
    word-wrap: break-word;
    word-break: normal;
    padding-right: 78px;
    padding-left: 10px;
}
.editbut {
    float: right;
    line-height: 20px;
    margin: 9px;
    font-weight: normal !important;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 12px;
    font-size: 14px !important;
    cursor: pointer;
}
.editbut:hover {
    color: #f99740 !important;
    border: 1px solid#f99740 !important;
}
#EnterpriseInformationManage .img-box .img-hover {
    margin: 0;
    left: 0px;
    right: 0px;
    position: absolute;
    top: 0px;
    height: 0px;
    padding: 0px;
    margin: 0;
    opacity: 0.8;
    color: #fff;
    background: none repeat scroll 0 0 #000000;
    overflow: hidden;
}
#EnterpriseInformationManage .img-box:hover .img-hover {
    height: 20px;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
}

#EnterpriseInformationManage .img-box .img-hover i {
    float: right;
    margin-right: 10px;
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
    width: 80px;
    margin: 80px 80px 0 0;
}
.bigimg{
    margin-top: 120px;
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
.qrcode {
    text-align: center;
    margin-top: 40px;
}
</style>
