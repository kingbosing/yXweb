<template>
  <div class="menu-wrapper">
    <template v-for="item in getCurrentRouters(routes)" v-if="ifExists(item)">
      <sidebar-item-text v-if="hasOnlyShowTop(item)"
      :model="item" :path="item.path"  :key="item.name"></sidebar-item-text>
      <el-submenu v-else :index="item.name||item.path" :key="item.name" :class="{'menu-top':!isNest}">
        <!-- 此处有可以显示的子菜单 -->
        <a slot="title" href="javascript:void(0)" @click="goPath(item.infoPath)">
          <b v-if="item.meta&&item.meta.icon" :class="'menu-icon menu-icon-'+item.meta.icon"></b>
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </a>

        <template v-for="child in item.children" v-if="hasChildShown(child)"  class="mtssss">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <sidebar-item-text  :path="item.path" :model="child" :key="child.name" :is-nest="true"></sidebar-item-text>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItemText from './SidebarItemText'

export default {
  name: 'SidebarItem',
  components: { SidebarItemText },
  computed: {
    ...mapGetters(['permissions'])
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    },
    headMenuType: {
      type: String
    },
    isCollapse: {
      type: Boolean
    }
  },
  methods: {
    hasChildShown(item) {
      return (
        !item.hidden &&
        (!item.id ||
          (this.permissions[item.id] && this.permissions[item.id].Enable))
      )
    },
    ifExists(item) {
      var headMenuType = this.headMenuType || 'User'
      if (item.type) {
        if (item.type instanceof Array && item.type.indexOf(headMenuType) < 0) {
          return false
        }
        if (typeof item.type === 'string' && item.type !== headMenuType) {
          return false
        }
      }
      return this.hasChildShown(item)
    },
    hasOnlyShowTop(item) {
      const hasChild = (item.children || []).filter(c => {
        return !c.hidden
      })
      return hasChild.length === 0 && !item.hidden
    },
    getCurrentRouters(routers) {
      for (var i = 0; i < routers.length; i++) {
        var item = routers[i]
        if (item && item.type && item.type === this.headMenuType) {
          return item.children
        }
      }
    },
    goPath(Path) {
      if (Path) {
        this.$router.push({ path: Path })
      }
    }
  }
}
</script>
