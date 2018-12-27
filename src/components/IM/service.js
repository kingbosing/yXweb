import request from '@/utils/request'
import store from '@/store'
import urlUtil from '@/utils/urlUtil'

export default (function() {
  var IMLib = null,
    IMClient = null,
    imInstance = null

  var utils = {
    isFunction: function(func) {
      return typeof func === 'function'
    },
    isArray: function(arrs) {
      return Object.prototype.toString.call(arrs) == '[object Array]'
    },
    noop: function() {},
    forEach: function(arrs, callback) {
      for (var i = 0, len = arrs.length; i < len; i++) {
        var item = arrs[i]
        callback(item, i)
      }
    },
    copy: function(target, source) {
      for (var key in source) {
        target[key] = source[key]
      }
    }
  }

  var Logger = {
    warn: console.warn,
    log: console.log
  }

  var Emitter = (function() {
    var events = {}
    var fire = function(name, args) {
      if (name in events) {
        for (var i = 0, len = events[name].length; i < len; i++) {
          events[name][i](args)
        }
      }
    }

    var on = function(name, event) {
      var isFunc = utils.isFunction(event)
      if (!isFunc) {
        return
      }
      events[name] = events[name] || []
      events[name].push(event)
    }

    return {
      fire: fire,
      on: on
    }
  })()

  function Watcher() {
    var checkIndexOutBound = function(index, bound) {
      return index > -1 && index < bound
    }

    this.watcherList = []

    this.add = function(observer, force) {
      if (force) {
        this.watcherList.length = 0
      }
      this.watcherList.push(observer)
    }

    this.get = function(index) {
      if (checkIndexOutBound(index, this.watcherList.length)) {
        return this.watcherList[index]
      }
    }

    this.count = function() {
      return this.watcherList.length
    }

    this.removeAt = function(index) {
      checkIndexOutBound(index, this.watcherList.length) &&
        this.watcherList.splice(index, 1)
    }

    this.remove = function(observer) {
      if (!observer) {
        this.watcherList.length = 0
        return
      }
      var isFunction =
        Object.prototype.toString.call(observer) === '[object Function]'
      var watcherList = isFunction ? [observer] : observer
      for (var i = 0, len = this.watcherList.length; i < len; i++) {
        for (var j = 0; j < watcherList.length; j++) {
          if (this.watcherList[i] === watcherList[j]) {
            this.removeAt(i)
            break
          }
        }
      }
    }

    this.notify = function(val) {
      for (var i = 0, len = this.watcherList.length; i < len; i++) {
        this.watcherList[i](val)
      }
    }

    this.indexOf = function(observer, startIndex) {
      var i = startIndex || 0,
        len = this.watcherList.length
      while (i < len) {
        if (this.watcherList[i] === observer) {
          return i
        }
        i++
      }
      return -1
    }
  }

  var Chats = {
    _Cache: {}
  }

  function ConversationInit() {
    request.get('/apix/v2/Chat/GetChatGroupLists').then(res => {
      var data = res.data.Data
      data.forEach(c => {
        var key = '3_' + c.GroupId
        if (!Chats._Cache[key]) {
          Chats._Cache[key] = {
            type: 3,
            id: c.GroupId,
            avatar: 'http://192.168.10.47:9081//u/images/8a82954d2ced18f1457a805188f0291798772b42x42c.jpg',
            name: c.GroupName,
            managerId: c.ManagerId
          }
        }
      })
    })

    var user = store.state.user
    Chats._Cache['1_' + user.profileId] = {
      type: 1,
      id: user.profileId,
      avatar: urlUtil.formatPicUrl(user.avatar, 42, 42),
      name: user.name
    }
  }
  /*
      此处只为演示，实际应用需请求应用服务器获取用户信息
    */
  Chats.get = function(chat) {
    var key = chat.type + '_' + chat.id
    return Chats._Cache[key] || Object.assign(chat, {
      avatar: 'http://192.168.10.47:9081//u/images/8a82954d2ced18f1457a805188f0291798772b42x42c.jpg',
      name: '未知' + (chat.type == 1 ? '用户' : '群组')
    })
  }

  var formatSentTime = function(time) {
    var date = new Date(time)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
  }

  var getMessageContent = function(message) {
    var content = '[暂未解析此类型消息]'
    var messageMap = {
      TextMessage: message.content.content,
      FileMessage: '[文件]',
      ImageMessage: '[图片]'
    }
    var messageType = message.messageType
    return messageMap[messageType] || content
  }

  var formartMessage = function(message) {
    var sender = Chats.get({
      id: message.senderUserId,
      type: message.conversationType
    })
    var sentTime = message.sentTime
    sentTime = formatSentTime(sentTime)

    var direction = message.messageDirection == 1 ? 'sender' : 'receiver'

    var content = getMessageContent(message)

    utils.copy(message, {
      _sender: sender,
      _sentTime: sentTime,
      _direction: direction,
      _content: content
    })
  }

  var conversationWatcher = new Watcher()

  var Conversation = {}

  Conversation.get = function(successCallback, errorCallback) {
    successCallback = successCallback || utils.noop
    // 过滤会话类型，null 为不过滤，获取全部会话类型, conversationTypes = null | [1, 3]
    var conversationTypes = null
    imInstance.getConversationList(
      {
        onSuccess: function(conversationList) {
          // 线上获取
          conversationList = conversationList.filter(function(conversation) {
            // var isPrivate =
            //  conversation.conversationType == IMLib.ConversationType.PRIVATE
            return true// isPrivate
          })

          conversationList.forEach(function(conversation) {
            var target = Chats.get({
              id: conversation.targetId,
              type: conversation.conversationType
            })
            conversation.workType = 1
            var sentTime = conversation.sentTime
            sentTime = formatSentTime(sentTime)

            var message = conversation.latestMessage
            var content = getMessageContent(message)
            var sender = Chats.get({
              id: message.senderUserId,
              type: message.conversationType
            })

            utils.copy(message, {
              _content: content
            })
            utils.copy(conversation, {
              _target: target,
              _sentTime: sentTime,
              _sender: sender
            })
          })
          for (var key in Chats._Cache) {
            var item = Chats._Cache[key]
            if (!item) continue
            if (item.type != 3) continue
            if (conversationList.filter(c => c.conversationType == 3 && c.targetId == item.id).length == 0) {
              conversationList.push({
                workType: 1,
                targetId: item.id,
                conversationType: item.type,
                _target: item
              })
            }
          }
          successCallback(conversationList)
        },
        onError: function(error) {
          Logger.log('Conversation.get Error: %s', error)
          errorCallback(error)
        }
      },
      conversationTypes
    )
  }

  Conversation.watch = function(watcher) {
    conversationWatcher.add(watcher)
  }

  Emitter.on('onconversation', function(conversation) {
    Conversation.get(function(conversationList) {
      conversationWatcher.notify(conversationList)
    })
  })

  var Message = {}
  var messageWatcher = new Watcher()

  Message.get = function(conversation, callback) {
    var type = conversation.type
    var targetId = conversation.targetId
    var count = 20
    // 获取历史消息起始时间，0 表示从最近的一条消息开始向前获取 20 条, 详细说明：http://www.rongcloud.cn/docs/web_api_demo.html#message_history
    var timestrap = 0
    imInstance.getHistoryMessages(type, targetId, timestrap, count, {
      onSuccess: function(messageList) {
        var error = null

        utils.forEach(messageList, function(message) {
          formartMessage(message)
        })

        callback(error, messageList)
      },
      onError: function(error) {
        Logger.log('Message.get Error: %s', error)
        callback(error)
      }
    })
  }

  Message.sendTxt = function(message, onSuccess, onError) {
    onSuccess = onSuccess || utils.noop

    var msg = new IMLib.TextMessage({
      content: message.content,
      user: message.sender
    })

    var conversationType = message.type
    var targetId = message.targetId
    console.log('conversationType', { conversationType, targetId, msg })
    imInstance.sendMessage(conversationType, targetId, msg, {
      onSuccess: function(message) {
        formartMessage(message)
        onSuccess(message)

        Emitter.fire('onconversation')
      },
      onError: onError
    })
  }

  Message.watch = function(watcher) {
    messageWatcher.add(watcher)
  }

  Emitter.on('onmessage', function(message) {
    messageWatcher.notify(message)
  })

  var setListener = function() {
    IMClient.setConnectionStatusListener({
      onChanged: function(status) {
        // Status 说明可参考 http://www.rongcloud.cn/docs/web_api_demo.html#init_listener
        Logger.warn('WebSDK Status Changed: %d', status)
      }
    })
    IMClient.setOnReceiveMessageListener({
      onReceived: function(message) {
        formartMessage(message)
        Emitter.fire('onmessage', message)
        Emitter.fire('onconversation')
      }
    })
    console.log('imInstance', RongIMLib.Bridge)
    RongIMLib.Bridge.prototype.setListener({ onChanged: function(x) {
      console.log('setListener', x)
    } })
  }

  var services = {
    Conversation: Conversation,
    Message: Message
  }

  var connect = function(token, callback) {
    callback = callback || utils.noop
    IMClient.connect(
      token,
      {
        onSuccess: function(id) {
          var currentUser = {
            id: id
          }
          callback(services, currentUser)
        },
        onTokenIncorrect: function() {
          Logger.log('token 无效, 请参考: http://support.rongcloud.cn/kb/NDQ1')
        },
        onError: function(code) {
          Logger.log(code)
        },
        onChanged: function(x) {
          console.log(x)
        }
      }
    )
  }

  /*
      var options = {
        appKey: '',
        sdk: {
          navi: '',
          protobuf: ''
        }
      };

      var callback = function(services, currentUser){

      };
      var modules = {
        RongIMLib: RongIMLib,
        protobuf: protobuf
      };
    */
  var init = function(options, callback, modules) {
    ConversationInit()
    IMLib = modules.RongIMLib
    IMClient = IMLib.RongIMClient

    // Channel = IMLib.Channel
    var appKey = options.appKey
    var sdk = options.sdk
    IMClient.init(appKey, null, sdk)
    imInstance = IMClient.getInstance()

    setListener()

    var token = options.token
    connect(
      token,
      callback
    )
  }

  return {
    init: init
  }
})()
