<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <strong v-if="param">{{param.name}}</strong>
          <div>
            <span></span>
            <span><font-awesome-icon :icon="['far', 'star']"/></span>
            <span><font-awesome-icon icon="user" /> 6,366</span>

            <span><font-awesome-icon icon="thumbtack" /> 1</span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-button icon="el-icon-info" type="text"></el-button>
          <el-button icon="el-icon-setting" type="text"></el-button>
          <el-input style="width:200px"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            >
          </el-input>
          <el-button type="text">@</el-button>
          <el-button icon="el-icon-star-off" type="text"></el-button>
          <el-button icon="el-icon-more" type="text"></el-button>
        </el-col>
      </el-row>
    </el-header>
     <el-main>
        <div class="im-message-list">
            <div v-for="message in messageList" :class="['im-message im-message-' + message._direction ]" :key="message.messageId">
                <div :class="['im-avatar im-message-' + message._direction + '-avatar']" :style="{'background-image': 'url(' + message._sender.avatar + ')'}"></div>
                <div class="im-message-content">{{message._content}}</div>
                <div class="im-message-senttime">
                    <em>{{message._sentTime}}</em>
                </div>
                <div class="im-clearfix"></div>
            </div>
        </div>
     </el-main>
    <el-footer>
      <el-input placeholder="请输入消息内容"  class="input-with-select" v-model="content" @keyup.enter.native="send">
        <el-dropdown  slot="prepend" placement="top">
          <el-button type="primary"><i class="el-icon-plus el-icon"></i></el-button>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>新建</el-dropdown-item>
              <el-dropdown-item divided>任务</el-dropdown-item>
              <el-dropdown-item>文档片断</el-dropdown-item>
              <el-dropdown-item disabled>发送</el-dropdown-item>
              <el-dropdown-item divided>文件</el-dropdown-item>
              <el-dropdown-item>视频</el-dropdown-item>
              <el-dropdown-item>图片</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button slot="append">@</el-button>
        <el-button slot="append">@</el-button>
      </el-input>
      <div>tips</div>
    </el-footer>
  </el-container>
</template>
<script>
var getConversation = function(ctx) {
  if (!ctx.param || !ctx.param.type) return {}
  var type = +ctx.param.type
  var id = ctx.param.id
  return {
    type: type,
    id: id
  }
}

var isActive = function(message, ctx) {
  var conversation = getConversation(ctx)
  var type = conversation.type
  var id = conversation.id
  return (message.conversationType == type && message.targetId == id)
}
function mounted(ctx) {
  var Message = ctx.RongIM.Message
  Message.watch(function(message) {
    if (isActive(message, ctx)) {
      console.log('watch', message)
      ctx.messageList.push(message)
    }
  })
};

function sendMessage(ctx) {
  var Message = ctx.RongIM.Message
  var content = ctx.content
  var conversation = getConversation(ctx)
  var context = {
    content: content,
    type: conversation.type,
    targetId: conversation.id
  }
  Message.sendTxt(context, function(message) {
    if (message) {
      console.log('sendtext', message)
      ctx.messageList.push(message)
      ctx.content = ''
    }
  }, e => {
    console.log('error send message', e)
  })
}

function getHistoryMessages(ctx) {
  var conversation = getConversation(ctx)

  ctx.RongIM.Message.get({
    type: conversation.type,
    targetId: conversation.id
  },
  function(error, messageList) {
    if (error) {
      console.error('Conversation.get Error: %s', error)
      return
    }
    console.log(' ctx.RongIM.Message.get', messageList)
    ctx.messageList = messageList
  })
}

export default {
  components: {
  },
  props: {
    RongIM: {
      type: Object
    },
    param: { type: Object }
  },
  data: function() {
    return {
      content: '',
      messageList: []
    }
  },
  created: function() {
    if (this.param) {
      getHistoryMessages(this)
    }
  },
  mounted: function() {
    if (this.param) {
      console.log('mounted')
      mounted(this)
    }
  },
  methods: {
    send: function() {
      if (this.content) {
        sendMessage(this)
      }
    }
  },
  watch: {
    param: function(val) {
      console.log('watch param', val)
      getHistoryMessages(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container{
     position: absolute;
     height: 100%;
     left:0px;
     padding-left:300px;
     width:100%;
     padding-top:50px;
     margin-top:-50px;
    // width:calc(100%-350px);
}
.el-header{
  border-bottom: 1px solid #afafaf
}
</style>
