<template>
<div class="sidebar-container" :class="{hideSidebar:isCollapse}"
v-on:mouseenter="mouseEnter"
v-on:mouseout="mouseExit"
v-on:mouseover="mouseEnter">
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="50"
      :default-active="$route.path"
      :collapse="true"
      class="el-menu-vertical"
    >
      <sidebar-item :routes="permission_routers" :headMenuType="headMenuType" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    headMenuType() {
      return this.$store.getters.headMenuType
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    mouseEnter() {
      this.$store.dispatch('openSideBar')
    },
    mouseExit() {
      this.$store.dispatch('closeSideBar')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-container {
  line-height: 20px;
  height: 20px;
  padding: 0 10px;
  background: #333;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px !important;
  height: 400px;
}
</style>
