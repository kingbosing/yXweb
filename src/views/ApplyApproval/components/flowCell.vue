<template>
    <div class="onlyY flowCell" id="flowCell">
        <div class="flow-string">
            <i :class="item.Status==1?'flow-string-bgyellow':'flow-string-bggry'"></i>
            <b :class="item.Status==1?'flow-string-bgyellow':'flow-string-bggry'"></b>
        </div>

        <p class="flow-time">{{item.SubmitTime}}</p>

        <div class="flow-more">
            <img class="face " v-bind:src="faceUrl(item.CommenterFaceFormatUrl,50)" alt="Alternate Text" />

            <div class="flow-name">{{item.CommneterName}}-{{item.CommenterJobName}}</div>
            <div class="flow-state" v-html="setApprovalStatus(item.Status)"></div>
            <div class="flow-approval " v-show="item.Status>1&& (item.Comment||item.Photos.length>0||item.FileIDs.length>0||item.Voices.length>0)"><a class="color-32" v-on:click="toApproval(index)">审批意见<span class="el-icon-caret-right"></span></a></div>
            <div class="flow-useTime color-8a">用时：{{item.TimeSpan|TimeLength}}</div>
        </div>

    </div>
</template>

<script>
import './ApplyApproval_vue.js'
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'

export default {
  data() {
    return {
      CompanyName: ''
    }
  },

  props: [
    'item',
    'index'
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
    },
    toApproval(data) {
      this.$emit('thisIndex', data)
    }
  }
}
</script>

<style lang="scss" scoped>
#flowCell{
    font-weight: normal;
    .flow-string {
        height: 78px;
        width: 8px;
        margin: 0 auto;
        color: #f99740;
    }

    .flow-string i {
    display: block;
    height: 70px;
    width: 2px;
    margin: 0 auto;
    }

    .flow-string b {
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    }

    .flow-string-bgyellow {
    background: #f99740;
    }

    .flow-string-bggry {
    background: #8a8a8a;
    }

    .flow-more {
    height: 100px;
    width: 400px;
    border: 1px solid #dedede;
    box-shadow: 1px 1px #ccc;
    margin: 0 auto;
    position: relative;
    font-size: 13px;
    }

    .flow-time {
    text-align: center;
    margin: 8px 0;
    }

    .flow-more .face {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px solid #ccc;
    float: left;
    display: block;
    margin: 25px 10px 0 20px;
    }

    .flow-more .flow-name {
    width: 250px;
    height: 30px;
    position: absolute;
    left: 80px;
    top: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    }

    .flow-more .flow-state {
    width: 100px;
    height: 30px;
    position: absolute;
    left: 80px;
    top: 50px;
    }

    .flow-more .flow-approval {
    /*width: 100px;*/
    height: 20px;
    position: absolute;
    right: 20px;
    top: 30px;
    cursor: pointer;
    }

    .flow-more .flow-useTime {
    /*width: 200px;*/
    height: 20px;
    position: absolute;
    right: 20px;
    top: 55px;
    }
}
</style>

