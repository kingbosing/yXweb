<template>
    <el-menu-item :index="getPath()" :class="{'menu-top':!isNest}"
        @mouseenter.native="mouseEnter"
        @mouseout.native="mouseExit"
        @mouseover.native="mouseEnter"
    >
        <a v-if="model.page"  :href="model.page" :key="model.name">
            <!-- <svg-icon v-if="showIcon(model)" :icon-class="model.meta.icon"></svg-icon> -->
            <b v-if="showIcon(model)" :class="'menu-icon menu-icon-'+model.meta.icon"></b>
            <span v-if="model.meta&&model.meta.title" :class="{'no-icon':!showIcon(model)}">{{model.meta.title}}</span>
        </a>
        <template v-else>

        <!-- <router-link :to="getPath()" :key="model.name" slot="title"> -->
          <a @click="goThisRouter(model.path)">
            <b v-if="showIcon(model)" :class="'menu-icon menu-icon-'+model.meta.icon"></b>
            <span v-if="model.meta&&model.meta.title" :class="{'no-icon':!showIcon(model)}">{{model.meta.title}}</span>
          </a>
        <!-- </router-link> -->
      </template>
    </el-menu-item>
</template>
<script>
import KeyImportConfig from '../../../../router/keyimport.js'

export default {
  props: {
    model: {
      type: Object
    },
    path: {
      type: String
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showIcon(model) {
      return !this.isNest && model.meta && model.meta.icon
    },
    getPath() {
      // console.log(this.model.path)
      return this.model.path
    },
    goThisRouter(path) {
      this.$router.push({ path })
    },
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
a {
  display: block;
  padding-left: 20px;
}
li {
  padding: 0 !important;
}
</style>
