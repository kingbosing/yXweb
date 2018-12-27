<template>
  <el-container>
    <el-container  :is="message" :RongIM="RongIM" :param="param">
    </el-container>
    <el-aside width="300px"
     :is="list"
     v-on:changeMessage="changeMessage"
     :RongIM="RongIM">
    </el-aside>
  </el-container>
</template>
<style lang="scss" scoped>
.el-container{background-color: #fff}
.app-main{
  height:auto!important
}
</style>

<script>
// import RongIMLib from 'rongcloud-web-sdk-v2'
// https://github.com/rongcloud/websdk-demo/tree/master/vue/im
import RongIMLib from './RongIMLib.js'
import RongIM from './config'
import RongService from './service'
import ConversationList from './ConversationList'
import MessageList from './MessageList'
import request from '@/utils/request'
import urlUtil from '@/utils/urlUtil'

export default {
  name: 'IMView',
  components: {
    ConversationList,
    MessageList
  },
  data() {
    return {
      RongIM: RongIM,
      list: null,
      message: null,
      param: null
    }
  },
  props: {
  },
  created() {
    var ctx = this
    var config = RongIM.config
    var modules = {
      RongIMLib: window.RongIMLib
    }
    function init() {
      // 这里才开始渲染两个List
      ctx.list = 'ConversationList'
      ctx.message = 'MessageList'
    }
    // var user = this.$store.state.user
    // var headUrl = urlUtil.formatPicUrl(
    //     this.$store.state.user.avatar,
    //     42,
    //     42
    //   )
    // request.get('apix/v2/Chat/SetUserInfo?targetPId='+user.profileId+'&name='+user.name+'&headUrl='+headUrl)

    request.get('apix/im').then(res => {
      var token = res.data.Data.RongCloudToken
      if (!config.token) { config.token = token }
      RongService.init(
        config,
        function(services, currentUser) {
          var Conversation = services.Conversation
          var Message = services.Message

          RongIM.Conversation = Conversation
          RongIM.Message = Message

          init()
        },
        modules
      )
    })
  },
  methods: {
    changeMessage(msg) {
      this.param = msg
    }
  }
}
</script>
