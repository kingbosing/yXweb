<template>
    <el-container  class="temlateMain" v-cloak v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-main>
          <div class="main">
            <el-row>
              <el-col :span="4">
                <div class="mainImg">
                  <img :src="getImgUrl()" alt="">
                </div>
              </el-col>
              <el-col :span="20">
                <div class="mainInfo">
                   <el-row>
                    <el-col :span="24" class="title">公司基本信息</el-col>
                    <el-col :span="24">企业名称：<span>{{companyInfo.Name}}</span></el-col>
                    <el-col :span="12">企业规模：<span>{{EnumFirmScale[companyInfo.Scale]}}</span></el-col>
                    <el-col :span="12">企业性质：<span>{{EnumFirmProperty[companyInfo.Property]}}</span></el-col>
                    <el-col :span="24">行业类型：<span v-for="(k,v) in companyInfo.IndustryType" :key="v">{{k.Name}} <span v-if="v<companyInfo.IndustryType.length-1"> , </span></span></el-col>
                    <el-col :span="24">企业地址：<span>{{companyInfo.Address}}</span></el-col>
                    <el-col :span="24">企业介绍：<span>{{companyInfo.FirmProfile}}</span></el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="20">
                      <img class="img_cell" :src="getImg(k.Path)" alt="" v-for="(k,v) in companyInfo.FirmProfilePhotoIDs" :key="v">
                    </el-col>
                    <el-col :span="24">产品介绍：<span>{{companyInfo.ProductProfile}}</span></el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="20">
                      <img class="img_cell" :src="getImg(k.Path)" alt="" v-for="(k,v) in companyInfo.ProductProfilePhotoIDs" :key="v">
                    </el-col>

                    <el-col :span="24">公司福利：<span>
                        <el-tag type="success" v-for="(k,v) in companyInfo.Welfares" :key="v">{{k}}</el-tag>
                      </span></el-col>

                   </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>

    </el-container>
</template>

<script>

import { getdatefirm } from '@/api/recruitment'

import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'

export default {

  data() {
    return {
      fullscreenLoading: false,
      defaultActive: '1',
      LogoFormatUrl: '',
      companyInfo: '',
      EnumFirmScale: ['不限', '少于15人', '15～50人', '50～150人', '150～500人', '500～2000人', '2000人以上'],
      EnumFirmProperty: ['不限', '国企', '民营', '合资', '上市公司', '外商独贸', '股份制企业', '事业单位', '其他类型']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      doGetdatefirm(this)
      this.LogoFormatUrl = this.$store.state.company.LogoFormatUrl
      // console.log(this.LogoFormatUrl)
    },
    getImgUrl() {
      return globalvariable().imgapiurl + urlUtil.formatUrl(this.LogoFormatUrl, 90, 90)
    },
    getImg(url) {
      return globalvariable().imgapiurl + url
    }

  }
}

const doGetdatefirm = (app) => {
  app.fullscreenLoading = true
  getdatefirm().then(c => {
    app.fullscreenLoading = false
    console.log(c)
    if (c.data.Code === 0) {
      app.companyInfo = c.data.Data
    }
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
  .el-main{
    padding: 20px 0 0;
    .main{
      width: 960px;
      margin: 0 auto;
      .mainImg{
        img{
          border-radius: 4px;
        }
      }
      .mainInfo{
        .el-col{
          line-height: 45px;
          color: #8a8a8a;
          .img_cell{
            border: 1px solid #ccc;
            border-radius: 4px;
            /* min-width: 100px; */
            /* min-height: 120px; */
            height: 120px;
            width: 200px;
            margin-right: 10px;
          }
          &.title{
            color: #1a1a1a;
            font-size: 16px;
          }
          span{
            color: #1a1a1a;
          }

        }
      }
    }
  }
}

</style>

