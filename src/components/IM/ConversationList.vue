<template>
<div class="im-silde">
<el-menu class="el-menu-vertical-demo">
    <ConversationItem title="置顶" :list="starList" v-on:show="show"></ConversationItem>
    <ConversationItem title="群聊" :list="groupList" v-on:show="show"></ConversationItem>
    <ConversationItem title="私聊" :list="chatList" v-on:show="show"></ConversationItem>
</el-menu>
</div>
</template>
<style lang="scss" scoped>
.im-silde{
  padding-top:50px;
  margin-top:-50px;
  position:absolute;
  height: 100%;
  overflow-y: scroll
}
.el-menu{
  width:250px;
  height:100%;

}
</style>

<script>
import request from '@/utils/request'
import ConversationItem from './ConversationItem'
function getConversationList(ctx) {
  var Conversation = ctx.RongIM.Conversation
  Conversation.get(function(conversationList) {
    ctx.starList = conversationList.filter(c => c.star)
    ctx.groupList = conversationList.filter(c => c.conversationType == 3 && !c.star)
    ctx.chatList = conversationList.filter(c => c.conversationType == 1 && !c.star)
    console.log('conversationList', conversationList)
  }, error => {
    if (error) {
      console.error('Conversation.get Error: %s', error)
      return
    }
  })
}
export default {
  name: 'ConversationList',
  components: { ConversationItem
  },
  data() {
    return {
      starList: [],
      groupList: [],
      chatList: []
    }
  },
  props: {
    RongIM: {
      type: Object
    }
  },
  created() {
    getConversationList(this)
    // 获取群聊列表
    request.get('apix/v2/Chat/GetChatGroupLists').then(res => {
      var data = res.data.Data
    })
  },
  mounted() {
    (function(ctx) {
      var Conversation = ctx.RongIM.Conversation
      Conversation.watch(function() {
        getConversationList(ctx)
      })
    })(this)
  },
  methods: {
    show: function(conversation) {
      this.$emit('changeMessage', {
        type: conversation.conversationType,
        id: conversation.targetId,
        name: conversation._target.name
      })
    }
  }
}
</script>
