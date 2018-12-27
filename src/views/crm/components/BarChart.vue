<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          subtext: '7日客户新增',
          x: 'left'
        },

        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['9月1日', '9月2日', '9月3日', '9月4日', '9月5日', '9月6日', '9月7日'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '公海',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [2, 4, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: '意向',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [1, 0, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: '约谈',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [1, 2, 200, 334, 390, 330, 220],
          animationDuration
        }]
      })
    }
  }
}
</script>
