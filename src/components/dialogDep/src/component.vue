<template>
  <transition
    name="dialog-fade"
    @after-leave="afterLeave">
    <div class="el-dialog__wrapper getPeopleOrDep" v-show="visible" @click.self="handleWrapperClick" >
      <div
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span><span>({{checkbox?'多选':'单选'}})</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered">
          <div style="width:390px;" class="body_cell cell-left">
            <p v-if="people">可选人员</p>
            <p v-else>可选部门</p>
            <div   class="body_cell_content">
              <el-tree :data="loadNode1 " :show-checkbox="checkbox" ref="Deptree" :props="props1"  :check-strictly="false" node-key="ItemId" default-expand-all
                :expand-on-click-node="false"
                v-on:check-change="currentChange"
                v-on:node-click="handleNodeClick"
                >
                <span class="custom-tree-node "  slot-scope="{ node, data }">
                  <span class='theCell'>
                    <img v-bind:src="getFace(data.HeadUrl)" alt="" v-if="data.HeadUrl">{{ data.Name }}</span>

                </span>
              </el-tree>
            </div>
      </div>
      <div style="width:300px;margin-left:20px" class="body_cell cell-right">
        <template v-if="people">
          <p>已选人员</p>
          <div   class="body_cell_content">
            <p v-for="k in actDep" v-if="k.HeadUrl" class="theCell" :key="k.ItemId">
              <img v-bind:src="getFace(k.HeadUrl)" alt=""> {{k.Name}}
              <span class="el-icon-close" v-on:click="toDelete(k.ItemId)"></span>
            </p>
          </div>
        </template>
        <template v-else>
          <p>已选部门</p>
          <div class="body_cell_content">
            <p v-for="k in actDep" class="theCell" :key="k.ItemId">
              {{k.Name}}
              <span class="el-icon-close" v-on:click="toDelete(k.ItemId)"></span>
            </p>
          </div>
        </template>
      </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <button v-on:click="handleClose"   class="el-button el-button--default el-button--small">取 &nbsp; 消</button>
        <button  v-on:click="isOk" class="el-button el-button--warning el-button--small">确 &nbsp; 定</button>
      </span>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'
import { globalvariable } from '@/utils/globalvariable'

export default {
  name: 'getDepeople',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },
    people: {
      // true:选人；false:选部门
      type: Boolean
      // default: true
    },
    checkbox: {
      // true:多选；false:单选
      type: Boolean
      // default: true
    },
    actlist: {
      type: Array,
      default: function() {
        return []
      }
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      closed: false,
      loadNode1: [],
      centerDialogVisible: false,
      props1: {
        children: 'Childrens'
        // label: 'Name'
      },
      getCheckedNodes: [],
      // defaultArr: ['UzE1'],
      actDep: []
    }
  },

  watch: {
    visible(val) {
      if (val) {
        if (this.people) {
          this.loadNode1 = JSON.parse(sessionStorage.getItem('EmployeesList'))
        } else {
          this.loadNode1 = JSON.parse(sessionStorage.getItem('departmentsList'))
        }

        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })

        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
        if (!this.checkbox) {
          this.actDep = []
        }
        var that = this
        // this.actDep=[];
        setTimeout(function() {
          that.$refs.Deptree.setCheckedKeys(that.actlist)
        }, 100)
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
      }
    }
  },

  computed: {
    style() {
      const style = {}
      if (this.width) {
        style.width = this.width
      }
      if (!this.fullscreen) {
        style.marginTop = this.top
      }
      return style
    }
  },

  methods: {

    isOk() {
      // this.centerDialogVisible=false;
      this.defaultArr = []
      var depArr = []
      var peopleArr = []
      if (this.actDep.length > 0) {
        for (var k = 0; k < this.actDep.length; k++) {
          this.defaultArr.push(this.actDep[k].ItemId)
          if (!this.actDep[k].HeadUrl) {
            depArr.push(this.actDep[k])
          } else {
            peopleArr.push(this.actDep[k])
          }
        }

        if (this.people) {
          this.$emit('act-node', peopleArr)
        } else {
          this.$emit('act-node', depArr)
        }
      }

      this.$refs.Deptree.setCheckedKeys(this.defaultArr)
      this.hide()
    },

    getFace(data) {
      function format(data, x, y) {
        var s
        if (data) {
          s = data
            .replace('{0}', x)
            .replace('{1}', y)
            .replace('{2}', 'o')
          return s
        }
      }
      return globalvariable().imgapiurl + format(data, 40, 40)
    },
    toDelete(data) {
      var that = this
      var listArr = []
      var listId = []
      for (var i = 0; i < this.actDep.length; i++) {
        if (this.people) {
          if (this.actDep[i].ItemId != data && this.actDep[i].HeadUrl) {
            listArr.push(this.actDep[i])
            listId.push(this.actDep[i].ItemId)
          }
        } else {
          if (this.actDep[i].ItemId != data && !this.actDep[i].HeadUrl) {
            listArr.push(this.actDep[i])
            listId.push(this.actDep[i].ItemId)
          }
        }
      }
      this.actDep = listArr
      this.$refs.Deptree.setCheckedNodes(this.actDep)
    },

    currentChange() {
      this.actDep = this.$refs.Deptree.getCheckedNodes()
    },

    handleNodeClick(data) {
      if (!this.checkbox) {
        this.actDep = []
        if (this.people && data.HeadUrl) {
          this.actDep.push(data)
        } else if (!this.people && !data.HeadUrl) {
          this.actDep.push(data)
        }
      }
    },

    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.'
        }
      }
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterLeave() {
      this.$emit('closed')
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
    } else {
    }
    // if(this.people){
    //     this.loadNode1 = JSON.parse(sessionStorage.getItem("EmployeesList"));
    //   }else{
    //     this.loadNode1 = JSON.parse(sessionStorage.getItem("departmentsList"));
    // }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
// console.log(sessionStorage.getItem("EmployeesList"));
</script>

<style scoped>
.el-dialog{
  width: 750px;
  height: 550px;
}
.el-tree-node__content,
.theCell {
  height: 55px;
  line-height: 55px;
}
.el-dialog__header {
  padding: 10px 20px 10px;
  background: #dedede;
}
.el-dialog__body {
  padding: 0px 20px;
  color: #606266;
  font-size: 14px;
  overflow: hidden;
}
.theCell img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  float: left;
  margin: 10px;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #f99740;
  border-color: #f99740;
}
.el-checkbox__inner:hover {
  border-color: #f99740;
}
.body_cell{
  float: left;
  height:445px;
}
.body_cell >p{
  text-align: center;
  color: #1a1a1a;
  font-weight: bold;
  line-height: 28px;
  padding: 0;
  margin: 0;
}
.body_cell_content{
    border:1px solid #dedede;
    height: 415px;
    overflow: auto;

}
.dialog-footer{
  float: right;
}
.dialog-footer button{
  float: right;
  margin: 10px 20px;
}
.body_cell_content .theCell:hover{
  background-color: #f8f8f8;

}
.body_cell_content .theCell:hover .el-icon-close{
    display: block;
  }
.body_cell_content .theCell{
  color: rgb(138, 138, 138);

  /* padding-left: 0px; */
}
.body_cell_content .theCell .el-icon-close{
    display: none;
    float: right;
    margin: 20px;
    cursor: pointer;

  }
.cell-right .body_cell_content  .theCell{
    padding-left: 20px;
  }

</style>
