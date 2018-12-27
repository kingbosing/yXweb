import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import ECharts from 'vue-echarts'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// import 'echarts-gl'
Vue.component('v-chart', ECharts)

import App from './App'
import router from './router'
import store from './store'
import AMap from 'vue-amap'
import getDepeople from './components/dialogDep'
Vue.use(getDepeople)

Vue.use(AMap)
AMap.initAMapApiLoader({
  // 高德key
  key: '4cab0e2b48ad2698a62278953f01f989',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data
import './font-awesome'

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
