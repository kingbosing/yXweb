<template>
    <el-menu-item-group :title="title">
        <button @click="newGroup(profileId)">新建群</button>
        <el-menu-item :index="item.conversationType + '_'+item.targetId" v-for="item in list"
        @click="show(item)"
        :key="item.targetId">
            <div class="im-conversation-user">
                <div class="im-conversation-avatar im-avatar" :style="{'background-image': 'url(' + item._target.avatar + ')'}"></div>
            </div>
            <span class="im-conversation-title" v-if="item._target">{{item._target.name}}</span>
            <span class="im-conversation-message" v-if="item.latestMessage">
                <em class="im-conversation-content" v-if="item.latestMessage._sender">{{item.latestMessage._sender.name}}{{item.latestMessage._content}}</em>
            </span>
            <div class="im-conversation-senttime">{{item._sentTime}}</div>
            <button @click="diss(item.targetId)">解散</button>
            <button @click="exit(item.targetId)">退出</button>
        </el-menu-item>
    </el-menu-item-group>
</template>
<script>
import request from '@/utils/request'
export default {
  props: {
    list: { type: Array },
    title: { type: String }
  },
  computed: {
    profileId() {
      return this.$store.state.user.profileId
    }
  },
  methods: {
    show: function(c) {
      this.$emit('show', c)
    },
    diss: function(groupId) {
      request.get('/apix/v2/Chat/DisMissChatGroup?groupId=' + groupId).then(c => {
        console.log('diss return ', c.data)
      })
    },
    exit: (groupId) => {
      request.get('/apix/v2/Chat/ExitChatGroup?groupId=' + groupId).then(c => {
        console.log('exit return ', c.data)
      })
    },
    newGroup(profileId) {
      request.post('/apix/v2/Chat/CreateNewChatGroup?groupName=新建群', [profileId]).then(c => {
        console.log('new return ', c.data)
      })
    }
  }
}
</script>

