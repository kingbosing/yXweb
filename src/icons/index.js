import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

import newIcon from '@/components/SvgIcon/newIndex.vue'// svg组件

import './components/iconfont_typeFile'
import './components/iconfont_home'

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('new-icon', newIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
