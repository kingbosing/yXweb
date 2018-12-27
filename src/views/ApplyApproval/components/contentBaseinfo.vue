<template>
    <el-scrollbar class="onlyY base" id="base">
        <div class="title">
            <img class="face" v-bind:src="faceUrl(Creator.FaceURL,60)"/>
            <p class="name">{{Creator.EmployeeName}}</p>
            <p class="dep">{{listData.DepartmentName||getCompanyName()}}-{{Creator.MastJobName}}</p>
        </div>

        <div class="content">
                <p><span class="color-32">审批编号：</span><span class="color-8a">{{listData.RequestSerialNumber}}</span></p>
                <p><span class="color-32">申请时间：</span><span class="color-8a">{{listData.SendDateTime}}</span></p>
            <div v-html="showContent(ApprovalContent)" class="baseContent"></div>

        </div>

    </el-scrollbar>
</template>

<script>
import './ApplyApproval_vue.js'
import urlUtil from '@/utils/urlUtil'

export default {
  data() {
    return {
      CompanyName: ''
    }
  },

  props: [
    'Creator',
    'listData',
    'ApprovalContent'
  ],
  methods: {
    getCompanyName() {
      return this.$store.state.company.CompanyName
    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#base{
    font-weight: normal;
    p{
        padding:0;
        margin:0;
        line-height: 25px;
    }
    .title {
    height: 80px;
    width: 100%;
    position: absolute;
    padding: 20px;
    background: #fff;
    p{
        line-height: 28px
    }
    /*top:0;*/
    }

    .title .face {
    height: 60px;
    width: 60px;
    display: inline-block;
    background: #ccc;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
    }

    .title .name {
    font-size: 20px;
    color: #323232;
    padding: 7px 0 0 0
    }

    .title .dep {
    font-size: 16px;
    color: #8a8a8a;
    }

    .content {
    height: 100%;
    padding: 95px 0 0 20px;
    margin-bottom: 20px;
    }

    .content p {
    margin-bottom: 5px;
    font-size: 16px;
    padding: 0;
    }
}
</style>

